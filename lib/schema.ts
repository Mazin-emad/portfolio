import { site } from "./site";
import { urlFor } from "./seo";

/** Stable @ids so every page's graph points at the same Person and WebSite entities. */
export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
};

export const portraitUrl = `${site.url}/portrait/mazin-cutout.webp`;
const arabicName = "مازن عماد";

const knowsAbout = [
  "Laravel",
  "PHP",
  "Next.js",
  "React",
  "Angular",
  "TypeScript",
  "Arabic RTL interfaces",
  "Full-stack web development",
];

/** Site-wide entities: the WebSite and the Person it belongs to (rendered in the root layout). */
export function siteGraph(locale: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: site.url,
        name: site.name,
        alternateName: [arabicName, "Mazin Emad Portfolio"],
        inLanguage: ["en", "ar"],
        publisher: { "@id": ids.person },
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.name,
        alternateName: arabicName,
        url: urlFor(locale),
        mainEntityOfPage: site.url,
        image: { "@type": "ImageObject", url: portraitUrl, width: 640, height: 800 },
        jobTitle: locale === "ar" ? "مهندس برمجيات" : "Software Engineer",
        description:
          locale === "ar"
            ? "مهندس برمجيات مصري يبني منصات ويب متكاملة تبدأ بالعربية بـ Laravel وNext.js وAngular."
            : "Egyptian software engineer building Arabic-first full-stack web platforms with Laravel, Next.js and Angular.",
        email: `mailto:${site.email}`,
        nationality: { "@type": "Country", name: "Egypt" },
        homeLocation: { "@type": "Country", name: "Egypt" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Egyptian E-Learning University (EELU)" },
        knowsLanguage: ["ar", "en"],
        knowsAbout,
        sameAs: [site.github, site.linkedin, site.twitter],
      },
    ],
  };
}

export type Crumb = { name: string; path: string };

/**
 * A page's own graph: the WebPage (typed), its breadcrumb trail, and any extra entities.
 * `locale` decides the URL and `inLanguage`; the Person and WebSite are referenced by @id.
 */
export function pageGraph({
  locale,
  path,
  name,
  description,
  type = "WebPage",
  crumbs = [],
  image,
  datePublished,
  extra = [],
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";
  crumbs?: Crumb[];
  image?: string;
  datePublished?: string;
  extra?: Record<string, unknown>[];
}) {
  const url = urlFor(locale, path);
  const trail = [{ name: locale === "ar" ? "الرئيسية" : "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: locale,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.person },
        ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : null),
        ...(datePublished ? { datePublished } : null),
        ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : null),
        ...(type === "ProfilePage" ? { mainEntity: { "@id": ids.person } } : null),
      },
      ...(path !== "/"
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: trail.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.name,
                item: urlFor(locale, c.path),
              })),
            },
          ]
        : []),
      ...extra,
    ],
  };
}
