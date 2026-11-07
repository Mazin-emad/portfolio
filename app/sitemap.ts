import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { navItems, site } from "@/lib/site";
import { projects } from "@/content/projects";
import { posts } from "@/content/blog";

type Entry = { path: string; lastModified: string; images?: string[]; priority: number };

/**
 * One entry per locale per page, each carrying hreflang alternates (the sitemap form of
 * <link rel="alternate">). `lastModified` is a real date, not the build time, so crawlers
 * can trust it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    ...navItems.map((n) => ({
      path: n.href === "/" ? "" : n.href,
      lastModified: site.updated,
      priority: n.href === "/" ? 1 : n.href === "/work" ? 0.9 : 0.7,
    })),
    ...projects.map((p) => ({
      path: `/work/${p.slug}`,
      lastModified: site.updated,
      images: [`${site.url}${p.cover}`],
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      lastModified: p.date,
      priority: 0.6,
    })),
  ];

  return entries.flatMap(({ path, lastModified, images, priority }) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified,
      priority,
      ...(images ? { images } : null),
      alternates: {
        languages: {
          ...Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}`])),
          "x-default": `${site.url}/${routing.defaultLocale}${path}`,
        },
      },
    })),
  );
}
