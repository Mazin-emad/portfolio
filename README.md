# Mazin Emad — Portfolio (v3)

Bilingual (English / Arabic, RTL-first) portfolio built with **Next.js 16**, **React 19**, **TypeScript**,
**Tailwind CSS 4**, **next-intl**, **motion** and a lazy-loaded **three.js** hero.

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (flat config, eslint-config-next)
npm run typecheck  # tsc --noEmit
```

## Environment

Copy `.env.example` to `.env.local`:

| Variable                 | Purpose                                            |
| ------------------------ | -------------------------------------------------- |
| `WEB3FORMS_ACCESS_KEY`   | Contact form (server action → Web3Forms). Required |
| `NEXT_PUBLIC_SITE_URL`   | Canonical URL for metadata, sitemap and OG         |

## Structure

```
app/[locale]/          routes: home, work, work/[slug], about, journey, services, blog, contact
components/            layout, home, work, three (WebGL), ui, contact, seo
content/projects/      one typed file per case study (EN + AR side by side)
content/archive.ts     smaller / older projects
content/blog/          MDX posts (<slug>.en.mdx + <slug>.ar.mdx) and the post index
messages/{en,ar}.json  UI strings
i18n/                  routing, request config, navigation helpers
proxy.ts               locale routing (Next.js 16 "proxy", formerly middleware)
public/projects/       compressed WebP screenshots (desktop 1440w, mobile 780w)
docs/                  research notes and validation checklist for case-study numbers
```

## Adding a project

1. Create `content/projects/<slug>.ts` (copy an existing one) with `en` and `ar` copy.
2. Add the screenshots to `public/`.
3. Register it in `content/projects/index.ts`. The work index, case-study page, command palette,
   sitemap and journey timeline pick it up automatically.

## Notes

- 3D hero: particle field + floating laptop/phone. Falls back to CSS mockups for
  `prefers-reduced-motion` or no WebGL, particles only on narrow screens, and pauses off screen.
- Figures in `content/projects/elkhalily.ts` are flagged `TODO(owner)` until validated.
- TypeScript is pinned to 6.x because `typescript-eslint` does not yet support 7.x.
