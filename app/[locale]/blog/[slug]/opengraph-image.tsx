import { getTranslations } from "next-intl/server";
import { getPost, posts } from "@/content/blog";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug)!;
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  return renderOg({
    locale,
    eyebrow: t("ogNote"),
    title: post.title[l],
    tagline: new Intl.DateTimeFormat(l === "ar" ? "ar-EG" : "en-GB", { dateStyle: "long" }).format(
      new Date(post.date),
    ),
  });
}
