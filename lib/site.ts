export const site = {
  name: "Mazin Emad",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mazin-emad.vercel.app",
  email: "mazin0emd@gmail.com",
  twitter: "https://x.com/MazinEmad685945",
  twitterHandle: "@MazinEmad685945",
  linkedin: "https://www.linkedin.com/in/mazin0emd",
  github: "https://github.com/Mazin-emad",
  /** Bump when page content meaningfully changes; feeds the sitemap `lastmod` (never "now"). */
  updated: "2026-11-07",
  googleVerification: "Ht_PV4uQDF-9RdOpNAAbA-G1oEHBLScA2GODowZsPss",
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "journey", href: "/journey" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export const stackList = [
  "Next.js",
  "React",
  "Angular",
  "TypeScript",
  "Laravel",
  "PHP",
  "Node.js",
  "Tailwind CSS",
  "SQL",
  "MongoDB",
  "RxJS",
  "Docker",
  "Figma",
  "Git",
] as const;
