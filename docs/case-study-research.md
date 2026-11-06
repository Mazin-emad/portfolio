# Case-study research (captured 2026-11-06 from the live test domains)

Visitors must never be told these are test domains; the real .com domains replace them soon.
Screenshots live in `public/projects/{elkhalily,alruaa}/` (webp; `-desktop` 1440w, `-mobile` 780w).

## Elkhalily Tools (الخليلي للمعدات) - FRONTEND focus
Live (test): https://elkhalily.vercel.app | real: elkhalily.com. Finished Nov 2026.
- Arabic-first RTL e-commerce store for tools, Egypt. Authorized distributor of 28 brands (Bosch, Total, Ingco, Ronix, Crown, HiKOKI...).
- Next.js App Router (RSC prefetch, Turbopack build), on Vercel. Talks to a REST backend proxied at `/backend/api/*`
  (Categories/navigation, Products/search with brand/price/stock/sort/paging, Products/{id}/availability, Reviews/product/{id}(+summary), contact, settings/social-links, auth/external/providers).
- Pages: home, shop (24/page, price slider, in-stock filter, brand filter with counts, sort), product detail, category, brand, promotions, top-rated, new-arrivals, cart, checkout, wishlist, compare (up to 4), login/register (+Google, Facebook), order tracking, warranty registration, shipping & returns, privacy, contact (3 branches with live open/closed status, map, directions, WhatsApp, Messenger, Telegram, form).
- Home: hero slider, "why us", deals row, category rail (~26), latest/featured carousels, promo banner (bundle -10%), profession picker (electrician, plumber, carpenter, mechanic, builder, AC tech), brand strip, reviews, contact strip.
- Product detail: gallery (thumbs + counter), SKU/brand/category chips, price with discount %, stock state, qty + live total, buy now / add to cart / wishlist / compare, share, tabs (description / additional info / reviews), "buy together" bundle upsell, related products.
- Mobile: bottom tab bar (home / categories / offers / wishlist / account), search, floating WhatsApp. Light/dark toggle.
- Contact: 6 phone lines, WhatsApp, info@elkhalily.com, 10:00-22:00 daily.
- Data caveat: the test store still has placeholder products ("test55", "Smoke Bundle", Bosch drill with "Short desc here"); use real products (Total THKTHP21476 etc.) in shots.

## Dar Al-Ruya Training (دار الرؤى للتدريب) - FULL-STACK focus (still in progress)
Live (test): https://examinations-department-h-production.up.railway.app (Railway) | real: alruaa.com.
- Saudi (Riyadh) training center: courses, professional-certification mock exams, psychometric assessments. Arabic RTL.
- Public site: home with 8-segment Life Wheel, perception styles, 7PK pentagon, "quick challenge" pattern puzzle, services, accreditations (National E-Learning Center, TVTC, Paul Scheele Institute, IBTA, PECB, Certiport), ~13 testimonials, partners (stc, Aramco, Al Rajhi, ANB, ministries, HRDF).
- Courses page: 20+ courses, search, cards with date/time/duration/hours, accreditation number, online badge, free/paid, register CTA (e.g. PMP 35h, CBP 25h).
- Assessments: Life Wheel (8 aspects, instant results), Perception Styles (30 questions: visual/auditory/kinesthetic + combinations + balanced), Seven Personality Keys (7PK: insight, drive, resilience, connection, decision, influence, horizon; personalised report). Tests require login; reports are tied to the account.
- Auth: register (Arabic full name, email, +966 mobile, national/iqama ID entered twice, password twice), login with remember-me, forgot password, `?next=` redirect back to the requested test.
- Admin: wheel control panel "for administrators" (rotation, 360 auto-spin, colour breathing, centre image).
- Hosted on Railway. No third-party analytics seen.
- NOT visible from outside (must ask the owner): backend language/framework, DB, scoring engine, report/PDF generation, admin dashboard scope, roles, security, deployment pipeline.

## Owner-supplied facts (2026-11-06)
- Dar Al-Ruya: Laravel (owner wrote "Laravel 20"; version unconfirmed, do not publish a version), PHP, SQL, Artisan. PDF generation. Admin panel controls everything incl. a CMS. ~12,000-16,000 active users. Built: landing page, course management, auth, PDF generation.
- Elkhalily: owner says performance improved a lot (numbers to be validated), full RTL, SEO improved ~60% vs the old site, still improving over 2 months.
- Missing images -> use placeholders.

## Lighthouse lab measurements (2026-11-06, Chrome headless, default throttling) - OWNER MUST VALIDATE
| Page | Device | Perf | SEO | A11y | Best Prac | FCP | LCP | TBT | CLS | Requests | Weight |
|---|---|---|---|---|---|---|---|---|---|---|---|
| OLD elkhalily.com home | mobile | 76 | 100 | 85 | 69 | 3.0s | 4.9s | 110ms | 0.002 | 271 | 1.7MB |
| NEW home | mobile | 50-55 | 100 | 93 | 96 | 1.5s | 29s | 590ms | 0 | 53 | 6.0MB |
| NEW shop | mobile | 72 | 100 | 95 | 100 | 1.4s | 3.2s | 860ms | 0 | 80 | 1.0MB |
| OLD home | desktop | 88 | 100 | 87 | 73 | 1.3s | 1.7s | 0 | 0.011 | 392 | 2.3MB |
| NEW home | desktop | 68 | 100 | 93 | 96 | 1.1s | 5.5s | 20ms | 0.004 | 56 | 6.2MB |
| NEW shop | desktop | 96 | 100 | 91 | 77 | 0.4s | 0.7s | 90ms | 0.06 | 120 | 1.2MB |
Defensible wins: ~80% fewer requests (271 -> 53), FCP 2x faster on mobile, a11y +8, best-practices +27, shop desktop LCP 0.7s.
Regression found: home LCP is dominated by `/bannerOnload.gif` (4.7 MB) + a hotlinked slashgear.com image (276 KB). Fixing these should flip the home page. Do NOT claim "performance improved a lot" on the home page until re-measured after the fix. SEO Lighthouse score was already 100 on the old site; the "+60%" must come from Search Console data (ask owner for impressions/clicks/indexed pages).
