import { getTranslations } from "next-intl/server";
import { JsonLd } from "./JsonLd";
import { pageGraph, type Crumb } from "@/lib/schema";

type PageKey = "home" | "about" | "journey" | "services" | "work" | "blog" | "contact";

/**
 * JSON-LD for a top-level page: typed WebPage + breadcrumb (+ optional extra entities).
 * Name and description come from the same `seo` messages as the <title> and meta description,
 * so structured data can never drift from what the page declares.
 */
export async function PageSchema({
  locale,
  path,
  page,
  type,
  crumbs,
  extra,
}: {
  locale: string;
  path: string;
  page: PageKey;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";
  crumbs?: Crumb[];
  extra?: Record<string, unknown>[];
}) {
  const t = await getTranslations({ locale, namespace: "seo" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const trail = crumbs ?? (page === "home" ? [] : [{ name: tn(page), path }]);
  return (
    <JsonLd
      data={pageGraph({
        locale,
        path,
        name: t(`${page}.title`),
        description: t(`${page}.description`),
        type,
        crumbs: trail,
        extra,
      })}
    />
  );
}
