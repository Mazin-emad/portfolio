import { routing } from "@/i18n/routing";
import { posts } from "@/content/blog";
import { site } from "@/lib/site";
import { urlFor } from "@/lib/seo";
import type { Locale } from "@/content/types";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of the notes, one per language. */
export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (locale === "ar" ? "ar" : "en") as Locale;
  const title = l === "ar" ? "مازن عماد — ملاحظات" : "Mazin Emad — Notes";
  const desc =
    l === "ar"
      ? "ملاحظات هندسية عن بناء منتجات ويب تبدأ بالعربية."
      : "Engineering notes on building Arabic-first web products.";
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const items = sorted
    .map((p) => {
      const url = urlFor(l, `/blog/${p.slug}`);
      return `<item><title>${esc(p.title[l])}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.summary[l])}</description></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(title)}</title><link>${urlFor(l, "/blog")}</link><description>${esc(desc)}</description><language>${l}</language><lastBuildDate>${new Date(sorted[0]?.date ?? site.updated).toUTCString()}</lastBuildDate><atom:link href="${urlFor(l, "/blog")}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
