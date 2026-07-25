/* Detailed flat 2D graphics for the Maintenance & Support page. */
import { soft, tint, ELEV_MD, ELEV_SM, GLOSS, HAIRLINE } from './depth';

const GLASS_SHADOW = '0 14px 28px -12px rgba(0,0,0,0.45)';

/** A real analytics-dashboard screenshot in a frosted-glass frame, ringed by
    small "ops" chips (analytics, uptime, auto-updates, security) — the hero
    graphic for the Maintenance & Support page. */
export function MaintenanceHeroShowcase() {
  return (
    <div aria-hidden className="relative w-80 md:w-[28rem]">
      {/* soft ground shadow */}
      <div className="absolute inset-x-10 -bottom-3 h-10 rounded-full bg-black/25 blur-2xl" />

      {/* glass-framed screenshot */}
      <div
        className="relative rounded-2xl border border-white/40 bg-white/10 p-2 backdrop-blur-xl"
        style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)' }}
      >
        <div className="overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/platinum-analytics.webp"
            alt="Site analytics dashboard monitored by Avenum"
            draggable={false}
            className="w-full select-none"
          />
        </div>
      </div>

      {/* chip: analytics */}
      <div
        className="absolute -top-5 -left-5 z-10 flex items-center gap-2 rounded-xl border border-white/40 bg-white/15 px-3 py-2 backdrop-blur-md"
        style={{ boxShadow: GLASS_SHADOW }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20V10M12 20V4M20 20v-7" />
          <path d="M4 20h16" />
        </svg>
        <span className="text-[0.65rem] font-medium tracking-wide text-white/90">Analytics</span>
      </div>

      {/* chip: uptime */}
      <div
        className="absolute -right-5 bottom-20 z-10 flex items-center gap-2 rounded-xl border border-white/40 bg-white/15 px-3 py-2.5 backdrop-blur-md md:-bottom-6"
        style={{ boxShadow: GLASS_SHADOW }}
      >
        <span className="font-display text-sm font-bold text-white">99.9%</span>
        <div className="flex items-end gap-0.5">
          {[5, 8, 6, 10, 7, 11].map((h, i) => (
            <span key={i} className="w-1 rounded-sm bg-white/70" style={{ height: h }} />
          ))}
        </div>
      </div>

      {/* chip: auto updates */}
      <div
        className="absolute -bottom-5 left-8 z-10 flex items-center gap-2 rounded-xl border border-white/40 bg-white/15 px-3 py-2 backdrop-blur-md"
        style={{ boxShadow: GLASS_SHADOW }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
          <path d="M18 3v4h-4M6 21v-4h4" />
        </svg>
        <span className="text-[0.65rem] font-medium tracking-wide text-white/90">Auto Updates</span>
      </div>

      {/* chip: security */}
      <div
        className="absolute -top-4 right-8 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/15 backdrop-blur-md"
        style={{ boxShadow: GLASS_SHADOW }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 5 6v5.5c0 4.2 3 7.4 7 9.5 4-2.1 7-5.3 7-9.5V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
    </div>
  );
}

export function TileUptime() {
  return (
    <div aria-hidden className="flex h-full w-full items-end justify-center gap-2">
      {[42, 64, 52, 80, 68, 90, 74].map((h, i) => (
        <span
          key={i}
          className="svc-pulse w-5 rounded-md"
          style={{ height: `${h}%`, background: `linear-gradient(180deg, ${soft(30 + (i % 3) * 10)}, ${soft(12)})`, border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM, animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function TileSecure() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD + ', ' + GLOSS }}>
        <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="var(--svc-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="9" rx="1.2" fill={soft(14)} />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15.5" r="1.4" fill="var(--svc-accent)" stroke="none" />
        </svg>
      </div>
    </div>
  );
}

export function TileSupport() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <span className="svc-spin absolute inset-2.5 rounded-full border-[3px] border-dashed" style={{ borderColor: tint(35) }} />
        <span className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: `linear-gradient(150deg,${soft(22)},${soft(8)})`, boxShadow: GLOSS }}>
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="var(--svc-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-2v-6h4M4 12v5a2 2 0 0 0 2 2h2v-6H4" />
          </svg>
        </span>
      </div>
    </div>
  );
}
