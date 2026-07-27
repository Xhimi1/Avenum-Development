/* Detailed flat 2D graphics for the Maintenance & Support page. */
import { TileIconBadge, IconDatabaseCheck, IconSupport } from './StreamlineIcons';

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
    <TileIconBadge>
      <IconDatabaseCheck />
    </TileIconBadge>
  );
}

export function TileSecure() {
  return (
    <TileIconBadge>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/secure-svgrepo-com.svg" alt="" draggable={false} className="h-full w-full select-none" />
    </TileIconBadge>
  );
}

export function TileSupport() {
  return (
    <TileIconBadge>
      <IconSupport />
    </TileIconBadge>
  );
}
