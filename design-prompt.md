# Portfolio redesign — visual brief for OpenDesign

## Who this is for
My personal developer portfolio. Redesign the existing v2 (a Next.js app in this repo). **Deliver as HTML** — a full-page design prototype. Read the actual codebase (colors, typography, structure, content from the data files) before you design so the direction matches the content, not an abstraction of it.

## What the design must feel like
Calm, modern, premium, editorial — with an **artifact layer**: a few tasteful 3D objects as the signature, not decoration. The overall mood is "quiet gallery": generous breathing room, silence first, then a single elegant accent of life. Think the restraint of Apple / Linear combined with the physical, tactile object-sculptures you'd find in a studio or a small museum.

## Direction

**Theme — DARK FIRST with a light toggle.**
- Both variants must be first-class, but **dark is the hero** (default, what loads first) and light is the paired alternative via a toggle. They must feel like siblings — same type, same spacing skeleton, same accent — just reversed luminance, not two different sites.
- Dark: deep warm near-black base (not pure #000, not cold blue-black) — think ink, charcoal, espresso-toned dark. Ample contrast for body text.
- Light: warm bone / off-white base inherited from the current design's spirit.

**Palette — one restrained accent from EITHER:**
- **warm terracotta / amber** (burnt-orange, clay), or
- **deep teal** (jade / pine).
- Pick ONE, use it sparingly and deliberately: section labels, one underline, active nav, the artifact tint, small highlights. Everything else sits in the neutral scale of the chosen theme. Avoid a second loud color. No default web-purple, no generic gradient.

**Type — editorial pairing.**
- A display face with real character for headings — e.g. a serif with contrast or a characterful high-contrast sans (think Fraunces / Newsreader / Space Grotesk family). Don't settle for default system sans everywhere.
- A clean body face (Inter / Manrope-class) for reading.
- Small, letter-spaced eyebrow labels — the kind that make a site feel art-directed, like "01 — ABOUT" / "02 — WORK".

**The signature artifact — pick ONE, your call:**
Choose the single 3D/sculptural element that best fits the directed mood and place it with restraint (off to the side, behind hero text, or as a small focal point — the words stay the star). Good candidates:
- a slowly rotating torus knot in glass/matte material,
- a soft wobbling blob (distorted sphere) tinted with the accent,
- a floating tilted sheet/card that shifts with subtle scroll parallax or pointer drift.
- Add gentle scroll-reactive motion so the object drifts/rotates as the page moves. Keep it quiet and slow — calm motion, eased, no jerky spin.

**Detail & polish.**
- Subtle grain / paper texture so it doesn't feel flat-digital (there's already one in the codebase — keep its restraint).
- Fine hairline borders, soft diffuse shadows (dark theme: soft ambient glows).
- Smooth, slow, staggered scroll reveals; magnetic nav links.
- Respect reduced-motion.

## Sections to design (keep content, redesign treatment)
Header/Nav | Hero | About | Services | Portfolio/Projects grid (with a project-detail modal) | Contact | Footer. Keep the same content and order as the current site — I'm reskinning, not rewriting the story.

## Constraints
- Fully responsive (mobile-first) and keyboard-accessible.
- Dark theme is first; light follows the same system.
- Primary deliverable is the **designed HTML** — a real, tasteful, different-from-v2 direction I can react to and hand to an implementer.
- Performance-minded: the 3D element must never slow first paint; degrade gracefully on small screens.

## What "different from v2" means (make it obvious at a glance)
- No generic navy gradient hero, no default gray gradient.
- No lime-green as the only accent (that's the current brand crutch — kill it).
- A real sculptural 3D signature (v2's "hero" is just a static gradient div and a decorative circle).
- Editorial typography instead of flat sans throughout.
- A calm, slow motion language instead of quick fades.

## One thing about me (for tone in the copy)
Software Engineer & Frontend Developer from Egypt, ~4 years in, growing toward Full-Stack, AI/LLM apps, and Agentic AI. Direct, human, not AI-sounding copy.

## Your deliverable
One designed HTML prototype of the full page (dark default + working light toggle + the chosen artifact working). Note the exact choices you made — palette pick, type pairing, artifact selection — and why, so I can approve or steer quickly.