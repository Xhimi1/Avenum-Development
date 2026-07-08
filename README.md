# Avenum — an immersive 3D experience site

A web-development-agency site built as a single 3D world you travel through.
Scrolling doesn't move a page — it flies a camera along a curve through five
"locations" (hero → services → work → about → contact), each with its own
color identity, objects and lighting.

## Stack

- **Next.js 14 (App Router) + TypeScript**
- **React Three Fiber + drei** — the WebGL world
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

### The scroll → camera pipeline

1. `SmoothScroll` measures every `[data-scene-section]` element into
   **anchors** (`top`, `pinEnd`) and mirrors Lenis scroll/velocity into
   `lib/scroll.ts` (`scrollState`) — a plain mutable object, so the canvas
   reads it at 60fps without React re-renders.
2. `cameraT()` maps scroll to a path parameter **t ∈ [0, 4]**: the camera
   rests at waypoint *i* while section *i*'s sticky content is pinned, and
   travels (smoothstepped) to waypoint *i+1* in the gap between sections.
3. `CameraRig` damps `t`, samples a Catmull-Rom curve through the five
   waypoints (`lib/path.ts`), and adds pointer parallax, velocity roll and a
   velocity FOV kick.
4. `Atmosphere` lerps scene background + fog through the section palette
   (`lib/palette.ts`); each location's objects scale in/out by `presence(i)`.

### The 3D locations

| Section | Objects | Color |
| --- | --- | --- |
| Hero | Distorted blob (cursor tilt, hover swell, velocity distort) + satellites | electric blue |
| Services | Four hoverable floating shapes (scale/glow/spin on hover) | magenta |
| Work | Gradient-shader panel carousel, rotated by pinned scroll, hover warp | amber |
| About | Distorted core + orbiting rings and electrons, hover speed-up | deep violet |
| Contact | Pulsing beacon with expanding signal rings | cyan/blue |

Plus a 1000-point additive particle field and ~140 instanced shards scattered
along the whole camera path, both with mouse parallax. The gradient panels and
particles use custom GLSL shaders.

### Motion systems

- `SplitText` — masked char/word staggered reveals on scroll
- `Kinetic` / `Marquee` — skew + speed react to scroll velocity
- `ColorWash` — full-screen two-layer color sweep on nav jumps
- `MagneticButton`, custom `Cursor` — tactile pointer feedback
- Pinned sections use CSS `position: sticky` (Lenis-compatible), with
  GSAP-scrubbed timelines inside (services rows, about manifesto)

### Performance & fallbacks

- Quality tier (`lib/utils.ts#computeQuality`): coarse pointers / small
  screens get fewer particles/shards, lower geometry detail, capped DPR.
- `PerformanceMonitor` drops DPR if the frame rate declines.
- Invisible low-poly raycast proxy on the hero blob keeps pointermove cheap.
- `prefers-reduced-motion`: native scroll (no Lenis), no loader, no split
  reveals, no parallax/roll/FOV kick, manifesto fully visible.
- No external 3D/texture assets — everything is procedural, so first load is
  just code + fonts.

## Structure

```
app/            layout (fonts/metadata), page, globals
components/
  Home.tsx      client orchestrator (canvas + overlay + providers)
  providers/    SmoothScroll (Lenis + ScrollTrigger + anchor measurement)
  canvas/       Scene, CameraRig, Atmosphere, per-section objects,
                Particles, Shards, materials/GradientMaterial (GLSL)
  sections/     Hero, Services, Work, About, Contact (DOM overlay)
  ui/           SplitText, FadeIn, Kinetic, Marquee, MagneticButton,
                Cursor, Nav, Loader, ColorWash
lib/            palette, path (waypoints), scroll (anchors + cameraT),
                store, projects, gsap, utils
```
