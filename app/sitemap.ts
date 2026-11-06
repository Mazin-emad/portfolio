import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { navItems, site } from "@/lib/site";
import { projectSlugs } from "@/content/projects";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...navItems.map((n) => (n.href === "/" ? "" : n.href)),
    ...projectSlugs.map((s) => `/work/${s}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/work/") ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    })),
  );
}
