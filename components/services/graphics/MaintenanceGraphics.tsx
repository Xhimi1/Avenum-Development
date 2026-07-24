/* Flat 2D graphics for the Maintenance & Support page. */

const soft = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, white)`;
const tint = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, transparent)`;

export function MaintenanceHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-80 md:w-80">
      {/* shield */}
      <div className="svc-float absolute inset-x-8 inset-y-2 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.2)]" fill="none">
          <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth="0.6" />
          <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" fill={tint(12)} />
          <path d="M8.5 12l2.5 2.5 5-5" stroke="var(--svc-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* uptime chip */}
      <div className="svc-float absolute -left-3 top-6 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-[0_22px_44px_-20px_rgba(0,0,0,0.4)]" style={{ animationDelay: '-1.8s' }}>
        <div className="font-display text-lg font-semibold text-[var(--svc-accent)]">99.9%</div>
        <div className="mt-0.5 h-1.5 w-12 rounded-full bg-black/[0.08]" />
      </div>

      {/* gear chip */}
      <div className="svc-float absolute -bottom-2 -right-2 flex h-16 w-16 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-[0_22px_44px_-20px_rgba(0,0,0,0.4)]" style={{ animationDelay: '-3s' }}>
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="var(--svc-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </svg>
      </div>
    </div>
  );
}

export function TileUptime() {
  return (
    <div aria-hidden className="flex h-full w-full items-end justify-center gap-1.5">
      {[40, 62, 50, 78, 66, 88, 72].map((h, i) => (
        <span
          key={i}
          className="svc-pulse w-4 rounded-md"
          style={{ height: `${h}%`, background: soft(18 + (i % 3) * 12), animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function TileSecure() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="svc-float flex h-24 w-24 items-center justify-center rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
        <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="var(--svc-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15.5" r="1.3" fill="var(--svc-accent)" stroke="none" />
        </svg>
      </div>
    </div>
  );
}

export function TileSupport() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
        <span className="absolute inset-2 rounded-full border-[3px] border-dashed" style={{ borderColor: tint(35) }} />
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="var(--svc-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-2v-6h4M4 12v5a2 2 0 0 0 2 2h2v-6H4" />
        </svg>
      </div>
    </div>
  );
}
