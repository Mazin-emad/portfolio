import type { L } from "../types";

export interface PostMeta {
  slug: string;
  date: string; // ISO
  minutes: number;
  title: L<string>;
  summary: L<string>;
}

/** Each post needs `<slug>.en.mdx` and `<slug>.ar.mdx` in this folder. */
export const posts: PostMeta[] = [
  {
    slug: "how-this-site-is-built",
    date: "2026-11-06",
    minutes: 3,
    title: {
      en: "How this portfolio is built",
      ar: "كيف بُني هذا الموقع",
    },
    summary: {
      en: "A bilingual, RTL-first portfolio on Next.js, with a WebGL hero that falls back gracefully.",
      ar: "موقع شخصي ثنائي اللغة يبدأ بالعربية على Next.js، مع واجهة WebGL تتراجع بسلاسة عند الحاجة.",
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
