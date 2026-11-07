import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { posts } from "@/content/blog";
import type { Locale } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageSchema } from "@/components/seo/PageSchema";
import { staticPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return staticPageMetadata(locale, "/blog", "blog");
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const tc = await getTranslations("common");
  const l = (await getLocale()) as Locale;
  const fmt = new Intl.DateTimeFormat(l === "ar" ? "ar-EG" : "en-GB", { dateStyle: "long" });

  return (
    <div className="container-x pt-36">
      <PageSchema locale={locale} path="/blog" page="blog" type="CollectionPage" />
      <SectionHeading as="h1" kicker={t("kicker")} title={t("title")} sub={t("sub")} />
      <ul className="border-line mt-16 border-t">
        {posts.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.05} className="border-line border-b">
            <Link
              href={`/blog/${p.slug}`}
              className="group hover:bg-surface flex items-start justify-between gap-6 px-2 py-8 transition-colors sm:px-4"
            >
              <div>
                <p className="label mb-3">
                  {fmt.format(new Date(p.date))} · {p.minutes} {tc("minRead")}
                </p>
                <h2 className="text-2xl font-semibold sm:text-3xl">{p.title[l]}</h2>
                <p className="text-muted mt-2 max-w-2xl">{p.summary[l]}</p>
              </div>
              <ArrowUpRight
                className="text-muted group-hover:text-accent-text flip-rtl mt-2 shrink-0 transition-colors"
                aria-hidden
              />
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
