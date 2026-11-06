import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPost, posts } from "@/content/blog";
import type { Locale } from "@/content/types";
import { pageMetadata } from "@/lib/seo";

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
    title: post.title[locale as Locale],
    description: post.summary[locale as Locale],
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();
  const l = locale as Locale;
  const tc = await getTranslations("common");
  const { default: Content } = await import(`@/content/blog/${slug}.${l}.mdx`);
  const fmt = new Intl.DateTimeFormat(l === "ar" ? "ar-EG" : "en-GB", { dateStyle: "long" });

  return (
    <article className="container-x pt-36">
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
