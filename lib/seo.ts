import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { site } from "./site";

/** Builds per-page metadata with canonical + hreflang alternates. */
export async function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: string;
  path: string; // e.g. "/work" (no locale prefix)
  title: string;
  description?: string;
  image?: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const desc = description ?? t("description");
  const clean = path === "/" ? "" : path;
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/${locale}${clean}`,
      languages: { en: `/en${clean}`, ar: `/ar${clean}`, "x-default": `/en${clean}` },
    },
    openGraph: {
      title,
      description: desc,
      url: `${site.url}/${locale}${clean}`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}
