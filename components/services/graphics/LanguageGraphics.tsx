/* Flat 2D graphics for the Multi-Language Websites page. */

const soft = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, white)`;
const tint = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, transparent)`;

export function LanguageHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-80 md:w-80">
      {/* globe */}
      <div className="svc-float absolute inset-4 flex items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_35px_80px_-30px_rgba(0,0,0,0.35)]" style={{ background: `radial-gradient(circle at 35% 30%, ${soft(10)}, white)` }}>
        <svg viewBox="0 0 24 24" className="h-40 w-40" fill="none" stroke="var(--svc-accent)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.6 2.4 2.6 15.6 0 18M12 3c-2.6 2.4-2.6 15.6 0 18" />
          <path d="M4.5 7.5c4.5 2.4 10.5 2.4 15 0M4.5 16.5c4.5-2.4 10.5-2.4 15 0" />
        </svg>
      </div>

      {/* language toggle chips floating around */}
      <div className="svc-float absolute -left-2 top-8 rounded-2xl border border-black/10 bg-white px-4 py-2.5 font-display text-sm font-semibold shadow-[0_22px_44px_-20px_rgba(0,0,0,0.4)]" style={{ animationDelay: '-1.5s', color: 'var(--svc-accent)' }}>
        Shqip
      </div>
      <div className="svc-float absolute -right-1 bottom-10 rounded-2xl border border-black/10 bg-white px-4 py-2.5 font-display text-sm font-semibold shadow-[0_22px_44px_-20px_rgba(0,0,0,0.4)]" style={{ animationDelay: '-3s' }}>
        English
      </div>
      <div className="svc-float absolute right-8 top-2 rounded-xl border border-black/10 bg-white px-3 py-2 font-display text-xs font-semibold shadow-[0_18px_36px_-18px_rgba(0,0,0,0.4)]" style={{ animationDelay: '-2.2s', background: tint(85), color: 'white', borderColor: 'transparent' }}>
        Italiano
      </div>
    </div>
  );
}

export function TileToggle() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white p-1.5 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.35)]">
        <span className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: 'var(--svc-accent)' }}>SQ</span>
        <span className="rounded-full px-4 py-2 text-sm font-semibold text-black/50">EN</span>
        <span className="rounded-full px-4 py-2 text-sm font-semibold text-black/50">IT</span>
      </div>
    </div>
  );
}

export function TileMirror() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center gap-3">
      {[
        { label: 'Mirë se vini', pct: 20 },
        { label: 'Welcome', pct: 10 },
      ].map((c, i) => (
        <div key={i} className="svc-float w-28 rounded-2xl border border-black/10 bg-white p-3 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.35)]" style={{ animationDelay: `${i * 0.5}s` }}>
          <div className="mb-2 h-10 rounded-lg" style={{ background: soft(c.pct + 14) }} />
          <div className="text-[0.7rem] font-semibold text-[var(--svc-accent)]">{c.label}</div>
        </div>
      ))}
    </div>
  );
}

export function TileReach() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex h-24 w-24 flex-col items-center justify-center rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="var(--svc-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8h14M5 8a13 13 0 0 0 7 11 13 13 0 0 0 7-11M9 8V5a3 3 0 0 1 6 0v3" />
        </svg>
        <span className="mt-1.5 font-display text-sm font-semibold text-[var(--svc-accent)]">3+</span>
      </div>
    </div>
  );
}
