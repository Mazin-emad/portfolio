import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPost, posts } from "@/content/blog";
import type { Locale } from "@/content/types";
import { pageMetadata, urlFor } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { ids, pageGraph } from "@/lib/schema";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: `${post.title[locale as Locale]} | ${site.name}`,
    description: post.summary[locale as Locale],
    type: "article",
    publishedTime: post.date,
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();
  const l = locale as Locale;
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const { default: Content } = await import(`@/content/blog/${slug}.${l}.mdx`);
  const fmt = new Intl.DateTimeFormat(l === "ar" ? "ar-EG" : "en-GB", { dateStyle: "long" });

  return (
    <article className="container-x pt-36">
      <JsonLd
        data={pageGraph({
          locale,
          path: `/blog/${slug}`,
          name: post.title[l],
          description: post.summary[l],
          crumbs: [
            { name: tn("blog"), path: "/blog" },
            { name: post.title[l], path: `/blog/${slug}` },
          ],
          datePublished: post.date,
          extra: [
            {
              "@type": "BlogPosting",
              "@id": `${urlFor(locale, `/blog/${slug}`)}#post`,
              headline: post.title[l],
              description: post.summary[l],
              url: urlFor(locale, `/blog/${slug}`),
              mainEntityOfPage: { "@id": `${urlFor(locale, `/blog/${slug}`)}#webpage` },
              datePublished: post.date,
              dateModified: post.date,
              inLanguage: locale,
              image: `${urlFor(locale, `/blog/${slug}`)}/opengraph-image`,
              author: { "@id": ids.person },
              publisher: { "@id": ids.person },
              isPartOf: {
                "@type": "Blog",
                "@id": `${urlFor(locale, "/blog")}#blog`,
                name: tn("blog"),
                url: urlFor(locale, "/blog"),
              },
            },
          ],
        })}
      />
      <Link
        href="/blog"
        className="text-muted hover:text-fg inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft size={16} className="flip-rtl" aria-hidden />
        {tc("back")}
      </Link>
      <header className="mt-10 max-w-3xl">
        <p className="label">
          {fmt.format(new Date(post.date))} · {post.minutes} {tc("minRead")}
        </p>
        <h1 className="mt-4 text-[clamp(2.25rem,6vw,4.5rem)] font-semibold">{post.title[l]}</h1>
      </header>
      <div className="mt-10 max-w-3xl">
        <Content />
      </div>
    </article>
  );
}
