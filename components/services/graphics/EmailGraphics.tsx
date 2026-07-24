/* Flat 2D graphics for the Email Automation page. */

const soft = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, white)`;
const tint = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, transparent)`;

export function EmailHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-80 md:w-80">
      {/* back envelopes, fanned for depth */}
      <div className="absolute inset-x-6 top-10 h-40 rounded-2xl border border-black/10 bg-white shadow-[0_20px_40px_-24px_rgba(0,0,0,0.3)]" style={{ transform: 'rotate(-6deg)' }} />
      <div className="absolute inset-x-4 top-6 h-44 rounded-2xl border border-black/10 bg-white shadow-[0_24px_50px_-26px_rgba(0,0,0,0.32)]" style={{ transform: 'rotate(3deg)' }} />

      {/* front envelope */}
      <div className="svc-float absolute inset-x-2 top-2 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.4)]">
        <div className="mb-4 flex h-24 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${soft(20)}, ${soft(6)})` }}>
          <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="var(--svc-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="M3.5 7.5 12 13l8.5-5.5" />
          </svg>
        </div>
        <div className="mb-2 h-2.5 w-1/2 rounded-full bg-black/12" />
        <div className="mb-1.5 h-2 w-full rounded-full bg-black/[0.07]" />
        <div className="h-2 w-4/5 rounded-full bg-black/[0.07]" />
      </div>

      {/* automation node chip */}
      <div className="svc-float absolute -bottom-4 right-0 flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 shadow-[0_22px_44px_-20px_rgba(0,0,0,0.4)]" style={{ animationDelay: '-2s' }}>
        <span className="h-6 w-6 rounded-full" style={{ background: 'var(--svc-accent)' }} />
        <span className="h-2 w-10 rounded-full bg-black/12" />
        <span className="h-6 w-6 rounded-full" style={{ background: tint(45) }} />
      </div>
    </div>
  );
}

export function TileFlow() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="svc-pulse flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-[0_10px_22px_-12px_rgba(0,0,0,0.35)]"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <span className="h-5 w-5 rounded-md" style={{ background: soft(30 + i * 10) }} />
            </div>
            {i < 2 && <span className="h-0.5 w-5 rounded-full" style={{ background: tint(40) }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TileInbox() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="w-44 rounded-2xl border border-black/10 bg-white p-3 shadow-[0_16px_36px_-20px_rgba(0,0,0,0.35)]">
        {[70, 55, 40].map((w, i) => (
          <div key={i} className="mb-2 flex items-center gap-2 last:mb-0">
            <span className="h-7 w-7 shrink-0 rounded-full" style={{ background: soft(18 + i * 8) }} />
            <span className="h-2 rounded-full bg-black/10" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TileOpen() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
        <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="9" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="var(--svc-accent)" strokeWidth="9" strokeLinecap="round" strokeDasharray="239" strokeDashoffset="72" />
        </svg>
        <span className="absolute font-display text-xl font-semibold text-[var(--svc-accent)]">70%</span>
      </div>
    </div>
  );
}
