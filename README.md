# Avenum — web agency site

A Next.js marketing site for Avenum, a web-development agency: a smooth-scrolling
homepage plus standalone pages for pricing, portfolio, AI chatbots, and legal.

## Stack

- **Next.js 14 (App Router) + TypeScript**
- **GSAP + ScrollTrigger** — reveals, scrubbed timelines, tickers
- **Lenis** — smooth scroll, synced to the GSAP ticker
- **Tailwind CSS** — styling
- **Zustand** — small reactive store (active section, quality tier, ready flag)

## Run it

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## How it works

### The scroll pipeline

- `SmoothScroll` measures every `[data-scene-section]` element into
  **anchors** (`top`, `pinEnd`) and mirrors Lenis scroll/velocity into
  `lib/scroll.ts` (`scrollState`) — a plain mutable object, read by GSAP
  tickers without triggering React re-renders. It also derives the active
  section index from scroll position for the store.
- `lib/palette.ts` defines `SECTIONS` (full section metadata, used for
  id-based lookups like page-transition colors) and `HOME_SECTIONS` (the
  subset that actually renders on the homepage scroll flow, in order —
  index-based logic like the active-section accent and nav "jump to
  section" must use this one, not `SECTIONS`, or indices drift out of sync
  with the real `[data-scene-section]` elements).
- `ColorWash` / `PageWash` — full-screen two-layer color sweep on nav jumps
  and route changes, using each section's/page's accent + bg colors.

### Homepage sections

Hero → Who we are → Work (gallery + services) → Contact. "About" and
"Work"(portfolio) are standalone pages, linked from nav but not part of the
homepage scroll flow.

### Motion systems

- `SplitText` — masked char/word staggered reveals on scroll
- `FadeIn` — simple scroll-triggered fade/rise reveals
- `ColorWash` — full-screen two-layer color sweep on nav jumps
- Pinned sections use CSS `position: sticky` (Lenis-compatible), with
  GSAP-scrubbed timelines inside (e.g. the About manifesto reveal)

### Performance & fallbacks

- Quality tier (`lib/utils.ts#computeQuality`).
- `prefers-reduced-motion`: native scroll (no Lenis), no loader, no split
  reveals.

## Structure

```
app/            layout (fonts/metadata), page, globals
components/
  Home.tsx      homepage client orchestrator
  providers/    SmoothScroll (Lenis + ScrollTrigger + anchor measurement)
  sections/     Hero, WhoWeAre, Work, Contact (homepage sections)
  about/, pricing/, chatbots/, portfolio/, pay/, legal/
                standalone page components
  ui/           SplitText, FadeIn, MagneticButton, Cursor, Nav, Loader,
                ColorWash, Footer, CookieConsent, LaunchPopup
lib/            palette (section colors), scroll (anchors + scrollState),
                store, projects, i18n, gsap, utils
```
