/* Detailed flat 2D graphics for the Business Websites page. Light from the
   top, stacked shadows + hairline borders so the shapes feel layered / 3D.
   Everything recolors from --svc-accent. No WebGL. */
import { soft, ELEV_MD, ELEV_SM, GLOSS, HAIRLINE } from './depth';

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
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="10" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="var(--svc-accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray="239" strokeDashoffset="30" style={{ filter: 'drop-shadow(0 3px 5px color-mix(in srgb, var(--svc-accent) 45%, transparent))' }} />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-2xl font-semibold text-[var(--svc-accent)]">98</span>
          <span className="text-[0.55rem] font-medium tracking-wide text-black/40">SCORE</span>
        </div>
      </div>
    </div>
  );
}

export function TileResponsive() {
  return (
    <div aria-hidden className="flex h-full w-full items-end justify-center gap-3">
      <div className="w-36 rounded-lg bg-white p-2" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <div className="mb-1.5 h-16 rounded" style={{ background: `linear-gradient(135deg,${soft(20)},${soft(6)})`, boxShadow: GLOSS }} />
        <div className="mb-1 h-1.5 w-2/3 rounded-full bg-black/12" />
        <div className="h-1.5 w-1/2 rounded-full bg-black/[0.07]" />
      </div>
      <div className="w-12 rounded-md bg-white p-1.5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM }}>
        <div className="h-14 rounded-sm" style={{ background: `linear-gradient(135deg,${soft(28)},${soft(10)})` }} />
      </div>
    </div>
  );
}

export function TileDesign() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="grid grid-cols-2 gap-3">
        {[30, 16, 20, 40].map((pct, i) => (
          <div
            key={i}
            className="svc-pulse flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ background: `linear-gradient(150deg, ${soft(pct + 14)}, ${soft(pct - 6 < 0 ? 4 : pct - 6)})`, border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM + ', ' + GLOSS, animationDelay: `${i * 0.3}s` }}
          >
            <span className="h-4 w-4 rounded" style={{ background: 'var(--svc-accent)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
