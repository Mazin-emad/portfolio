import { site } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Software Engineer",
    email: `mailto:${site.email}`,
    nationality: "Egyptian",
    alumniOf: "Egyptian E-Learning University (EELU)",
    knowsAbout: ["Laravel", "PHP", "Next.js", "React", "Angular", "TypeScript", "Arabic RTL interfaces"],
    sameAs: [site.github, site.linkedin, site.twitter],
  };
}
