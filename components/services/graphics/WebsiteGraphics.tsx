/* Detailed flat 2D graphics for the Business Websites page. Light from the
   top, stacked shadows + hairline borders so the shapes feel layered / 3D.
   Everything recolors from --svc-accent. No WebGL. */
import { TileIconBadge, IconFlash, IconScreen, IconPalette } from './StreamlineIcons';

const GLASS_SHADOW = '0 14px 28px -12px rgba(0,0,0,0.45)';

/** A real project screenshot in a frosted-glass frame, ringed by floating
    "design system" chips (typography, palette, CTA, components) — the
    hero graphic for the Business Websites page. */
export function WebsiteHeroShowcase() {
  return (
    <div aria-hidden className="relative w-64 md:w-80">
      {/* soft ground shadow */}
      <div className="absolute inset-x-8 -bottom-3 h-10 rounded-full bg-black/25 blur-2xl" />

      {/* glass-framed screenshot */}
      <div
        className="relative rounded-[1.75rem] border border-white/40 bg-white/10 p-2 backdrop-blur-xl"
        style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)' }}
      >
        <div className="overflow-hidden rounded-[1.25rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/jimsestate-mockup.webp"
            alt="Property listing page built by Avenum"
            draggable={false}
            className="w-full select-none"
          />
        </div>
      </div>

      {/* chip: typography */}
      <div
        className="absolute -bottom-5 -left-6 z-10 flex items-center gap-2 rounded-xl border border-white/40 bg-white/15 px-3 py-2 backdrop-blur-md"
        style={{ boxShadow: GLASS_SHADOW }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20 font-display text-xs font-bold text-white">
          Aa
        </span>
        <span className="text-[0.65rem] font-medium tracking-wide text-white/90">Site Typography</span>
      </div>

      {/* chip: color palette */}
      <div
        className="absolute -right-6 bottom-16 z-10 flex items-center gap-1.5 rounded-xl border border-white/40 bg-white/15 px-3 py-2.5 backdrop-blur-md"
        style={{ boxShadow: GLASS_SHADOW }}
      >
        <span className="h-4 w-4 rounded-full border border-white/50" style={{ background: 'var(--svc-accent)' }} />
        <span className="h-4 w-4 rounded-full border border-white/50" style={{ background: 'var(--svc-accent2)' }} />
        <span className="h-4 w-4 rounded-full border border-white/50 bg-white" />
        <span className="h-4 w-4 rounded-full border border-white/50 bg-black/80" />
      </div>

      {/* chip: CTA icons */}
      <div
        className="absolute -top-5 right-4 z-10 flex items-center gap-2 rounded-xl border border-white/40 bg-white/15 px-3 py-2 backdrop-blur-md"
        style={{ boxShadow: GLASS_SHADOW }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
        </svg>
        <span className="text-[0.65rem] font-medium tracking-wide text-white/90">CTA Icons</span>
      </div>

      {/* chip: components */}
      <div
        className="absolute -left-7 top-10 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/15 backdrop-blur-md"
        style={{ boxShadow: GLASS_SHADOW }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      </div>
    </div>
  );
}

export function TileSpeed() {
  return (
    <TileIconBadge>
      <IconFlash />
    </TileIconBadge>
  );
}

export function TileResponsive() {
  return (
    <TileIconBadge>
      <IconScreen />
    </TileIconBadge>
  );
}

export function TileDesign() {
  return (
    <TileIconBadge>
      <IconPalette />
    </TileIconBadge>
  );
}
