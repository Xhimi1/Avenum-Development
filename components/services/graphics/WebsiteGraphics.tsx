/* Flat 2D graphics for the Business Websites page. Everything recolors from
   --svc-accent / --svc-accent2, and leans on borders + layered shadows to
   feel a touch 3D. No WebGL. */

const soft = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, white)`;
const tint = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, transparent)`;

export function WebsiteHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-80 md:w-80">
      {/* main browser window */}
      <div className="svc-float absolute inset-0 rounded-3xl border border-black/10 bg-white p-4 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.35)]">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="ml-2 h-4 flex-1 rounded-full bg-black/[0.05]" />
        </div>
        <div
          className="mb-3 h-24 rounded-xl"
          style={{ background: `linear-gradient(135deg, ${soft(22)}, ${soft(8)})` }}
        />
        <div className="mb-2 h-3 w-2/3 rounded-full bg-black/10" />
        <div className="mb-4 h-3 w-1/2 rounded-full bg-black/[0.07]" />
        <div className="flex gap-2">
          <div className="h-8 flex-1 rounded-lg" style={{ background: tint(70) }} />
          <div className="h-8 w-16 rounded-lg bg-black/[0.06]" />
        </div>
      </div>

      {/* floating phone, overlapping bottom-right for a responsive hint */}
      <div
        className="svc-float absolute -bottom-6 -right-5 w-24 rounded-2xl border border-black/10 bg-white p-2 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.4)]"
        style={{ animationDelay: '-3s' }}
      >
        <div
          className="mb-1.5 h-14 rounded-lg"
          style={{ background: `linear-gradient(135deg, ${soft(26)}, ${soft(10)})` }}
        />
        <div className="mb-1 h-1.5 w-full rounded-full bg-black/10" />
        <div className="h-1.5 w-2/3 rounded-full bg-black/[0.07]" />
      </div>
    </div>
  );
}

export function TileSpeed() {
  return (
    <div aria-hidden className="relative flex h-full w-full items-center justify-center">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
        <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="9" />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="var(--svc-accent)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray="239"
            strokeDashoffset="34"
          />
        </svg>
        <span className="absolute font-display text-2xl font-semibold text-[var(--svc-accent)]">98</span>
      </div>
    </div>
  );
}

export function TileResponsive() {
  return (
    <div aria-hidden className="relative flex h-full w-full items-end justify-center gap-3">
      <div className="w-32 rounded-xl border border-black/10 bg-white p-2 shadow-[0_16px_36px_-20px_rgba(0,0,0,0.35)]">
        <div className="h-16 rounded-md" style={{ background: soft(16) }} />
        <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-black/10" />
      </div>
      <div className="svc-float w-12 rounded-lg border border-black/10 bg-white p-1.5 shadow-[0_16px_30px_-16px_rgba(0,0,0,0.4)]">
        <div className="h-14 rounded" style={{ background: soft(22) }} />
      </div>
    </div>
  );
}

export function TileDesign() {
  return (
    <div aria-hidden className="relative flex h-full w-full items-center justify-center">
      <div className="grid grid-cols-2 gap-2.5">
        {[28, 16, 20, 34].map((pct, i) => (
          <div
            key={i}
            className="svc-pulse h-12 w-12 rounded-xl border border-black/10 shadow-[0_10px_22px_-12px_rgba(0,0,0,0.35)]"
            style={{ background: soft(pct), animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
}
