import { projects } from "@/content/projects";
import { posts } from "@/content/blog";
import { site } from "@/lib/site";
import { urlFor } from "@/lib/seo";

export const dynamic = "force-static";

/** llms.txt — a plain-text map of the site for AI assistants and answer engines. */
export function GET() {
  const work = projects
    .map(
      (p) =>
        `- [${p.title.en}](${urlFor("en", `/work/${p.slug}`)}): ${p.tagline.en} ([العربية](${urlFor("ar", `/work/${p.slug}`)}))`,
    )
    .join("\n");
  const notes = posts
    .map((p) => `- [${p.title.en}](${urlFor("en", `/blog/${p.slug}`)}): ${p.summary.en}`)
    .join("\n");

  const body = `# ${site.name}

> ${site.name} (مازن عماد) is a software engineer from Egypt who builds fast, Arabic-first full-stack products with Laravel, Next.js and Angular. This site is his portfolio, available in English and Arabic (RTL).

## Pages
- [Home](${urlFor("en")}): overview, selected work and approach ([العربية](${urlFor("ar")}))
- [About](${urlFor("en", "/about")}): background and how he works
- [Journey](${urlFor("en", "/journey")}): timeline from first portfolio to production platforms
- [Services](${urlFor("en", "/services")}): web apps, full-stack platforms, admin panels, Arabic/RTL interfaces, performance and SEO, offline-first apps
- [Contact](${urlFor("en", "/contact")}): how to start a project (${site.email})

## Case studies
${work}

## Notes
${notes}

## Links
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
- Sitemap: ${site.url}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
