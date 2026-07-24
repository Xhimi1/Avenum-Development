/* Detailed flat 2D graphics for the Maintenance & Support page. */
import { soft, tint, deep, ELEV_LG, ELEV_MD, ELEV_SM, GLOSS, chip, HAIRLINE } from './depth';

export function MaintenanceHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
      <div className="absolute inset-x-10 bottom-3 h-10 rounded-full bg-black/25 blur-2xl" />

      {/* shield */}
      <div className="svc-float absolute inset-x-10 inset-y-1 flex items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-center">
          <svg viewBox="0 0 24 26" className="h-full w-full" fill="none" style={{ filter: 'drop-shadow(0 24px 34px rgba(0,0,0,0.28))' }}>
            <defs>
              <linearGradient id="svc-shield" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="color-mix(in srgb, var(--svc-accent) 12%, white)" />
              </linearGradient>
            </defs>
            <path d="M12 1 3.5 4.5v7.5c0 6 4 10.5 8.5 12.5 4.5-2 8.5-6.5 8.5-12.5V4.5L12 1Z" fill="url(#svc-shield)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
            <path d="M12 1 3.5 4.5v7.5c0 6 4 10.5 8.5 12.5" fill="rgba(255,255,255,0.35)" />
            <path d="M8 12.5l2.7 2.7L16 10" stroke="var(--svc-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 3px color-mix(in srgb, var(--svc-accent) 40%, transparent))' }} />
          </svg>
        </div>
      </div>

      {/* uptime chip */}
      <div className="svc-sway absolute -left-3 top-6 rounded-xl bg-white px-4 py-3" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, ['--svc-rot' as string]: '-4deg' }}>
        <div className="font-display text-lg font-semibold text-[var(--svc-accent)]">99.9%</div>
        <div className="mt-1 flex items-end gap-0.5">
          {[6, 9, 7, 11, 8, 12].map((h, i) => (
            <span key={i} className="w-1 rounded-sm" style={{ height: h, background: soft(20 + (i % 3) * 12) }} />
          ))}
        </div>
      </div>

      {/* gear chip */}
      <div className="svc-float absolute -bottom-2 -right-2 flex h-16 w-16 items-center justify-center rounded-xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD + ', ' + GLOSS, animationDelay: '-3s' }}>
        <svg viewBox="0 0 24 24" className="svc-spin h-9 w-9" fill="none" stroke="var(--svc-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
        </svg>
      </div>

      {/* live status pill */}
      <div className="svc-float absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM, animationDelay: '-1.5s' }}>
        <span className="svc-blink h-2 w-2 rounded-full" style={{ background: '#28c840' }} />
        <span className="text-[0.6rem] font-semibold text-black/50">Aktiv</span>
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
      <div className="svc-float flex h-28 w-28 items-center justify-center rounded-2xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD + ', ' + GLOSS }}>
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
