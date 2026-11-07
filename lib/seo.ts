import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "./site";

const ogLocale = (l: string) => (l === "ar" ? "ar_EG" : "en_US");

/** Absolute URL for a locale + path (path has no locale prefix, "/" = home). */
export const urlFor = (locale: string, path = "/") =>
  `${site.url}/${locale}${path === "/" ? "" : path}`;

/** Canonical + hreflang for a path, using absolute URLs. */
export function alternatesFor(locale: string, path = "/") {
  const clean = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${clean}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${clean}`])),
      "x-default": `/${routing.defaultLocale}${clean}`,
    },
  };
}

/** Trims copy to a search-snippet length, preferring a sentence boundary, else a word boundary. */
export function snippet(text: string, max = 155) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("؟ "), cut.lastIndexOf("۔ "));
  if (sentence >= 90) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,،:;\-–—\s]+$/, "")}…`;
}

/** The generic branded share image, used by pages that don't have their own. */
export const defaultOgImage = (locale: string) => urlFor(locale, "/opengraph-image");

/**
 * Per-page metadata. Titles are written in full (`absolute`) so each page controls its own SERP
 * snippet. Open Graph is rebuilt completely here because Next replaces, not merges, nested
 * `openGraph` objects. The share image comes from the route's `opengraph-image` file.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  publishedTime,
  image,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** Only needed to override the route's generated share image. */
  image?: string;
}): Metadata {
  const other = routing.locales.filter((l) => l !== locale);
  description = snippet(description);
  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type,
      siteName: site.name,
      locale: ogLocale(locale),
      alternateLocale: other.map(ogLocale),
      url: urlFor(locale, path),
      title,
      description,
      ...(type === "article" && publishedTime ? { publishedTime, authors: [site.name] } : null),
      ...(image ? { images: [{ url: image }] } : null),
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitterHandle,
      creator: site.twitterHandle,
      title,
      description,
      ...(image ? { images: [image] } : null),
    },
  };
}

/** Title + description for a static page, from the `seo` message namespace. */
export async function staticPageMetadata(
  locale: string,
  path: string,
  key: "home" | "about" | "journey" | "services" | "work" | "blog" | "contact",
) {
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMetadata({
    locale,
    path,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    image: defaultOgImage(locale),
  });
}
