import { getTranslations } from "next-intl/server";
import { getProject, projectSlugs } from "@/content/projects";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug)!;
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  return renderOg({
    locale,
    eyebrow: t("ogCase"),
    title: project.title[l],
    subtitle: project.kind[l],
    tagline: project.year[l],
    visual: { type: "cover", slug },
  });
}
