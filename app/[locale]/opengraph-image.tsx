import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Mazin Emad — Software Engineer";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return renderOg({
    locale,
    eyebrow: t("ogTagline"),
    title: t("ogHeadline1"),
    accent: t("ogHeadline2"),
    tagline: "Laravel · Next.js · Angular",
    visual: { type: "portrait" },
  });
}
