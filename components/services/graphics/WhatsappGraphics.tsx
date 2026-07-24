/* Flat 2D graphics for the WhatsApp Automation page. */

const soft = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, white)`;
const tint = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, transparent)`;

export function WhatsappHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-80 md:w-80">
      {/* phone frame */}
      <div className="svc-float absolute inset-x-14 inset-y-0 rounded-[2rem] border border-black/10 bg-white p-3 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.4)]">
        <div className="mb-3 flex items-center gap-2 border-b border-black/[0.06] pb-2.5">
          <span className="h-8 w-8 rounded-full" style={{ background: tint(70) }} />
          <span className="h-2.5 w-16 rounded-full bg-black/12" />
        </div>
        {/* incoming */}
        <div className="mb-2 max-w-[70%] rounded-2xl rounded-tl-sm bg-black/[0.05] px-3 py-2">
          <div className="h-1.5 w-16 rounded-full bg-black/12" />
          <div className="mt-1 h-1.5 w-10 rounded-full bg-black/[0.08]" />
        </div>
        {/* outgoing (auto-reply) */}
        <div className="mb-2 ml-auto max-w-[72%] rounded-2xl rounded-tr-sm px-3 py-2" style={{ background: soft(24) }}>
          <div className="h-1.5 w-20 rounded-full" style={{ background: tint(60) }} />
          <div className="mt-1 h-1.5 w-14 rounded-full" style={{ background: tint(40) }} />
        </div>
        <div className="ml-auto max-w-[55%] rounded-2xl rounded-tr-sm px-3 py-2" style={{ background: soft(24) }}>
          <div className="h-1.5 w-12 rounded-full" style={{ background: tint(60) }} />
        </div>
      </div>

      {/* auto-reply bolt badge */}
      <div className="svc-float absolute -right-2 top-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-[0_22px_44px_-20px_rgba(0,0,0,0.4)]" style={{ animationDelay: '-2.5s' }}>
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="var(--svc-accent)" stroke="none">
          <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
        </svg>
      </div>
    </div>
  );
}

export function TileAutoReply() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="space-y-2">
        <div className="max-w-[9rem] rounded-2xl rounded-tl-sm border border-black/10 bg-white px-3 py-2 shadow-[0_10px_22px_-14px_rgba(0,0,0,0.3)]">
          <div className="h-1.5 w-20 rounded-full bg-black/12" />
        </div>
        <div className="ml-auto flex max-w-[9rem] items-center gap-2 rounded-2xl rounded-tr-sm px-3 py-2 shadow-[0_10px_22px_-14px_rgba(0,0,0,0.3)]" style={{ background: 'var(--svc-accent)' }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="white" stroke="none"><path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" /></svg>
          <div className="h-1.5 w-16 rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}

export function TileBroadcast() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute h-24 w-24 rounded-full border" style={{ borderColor: tint(30) }} />
        <span className="svc-pulse absolute h-16 w-16 rounded-full border" style={{ borderColor: tint(50) }} />
        <span className="flex h-12 w-12 items-center justify-center rounded-full shadow-[0_12px_26px_-12px_rgba(0,0,0,0.4)]" style={{ background: 'var(--svc-accent)' }}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l18-7-7 18-2.5-7.5L3 11z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function TileAlways() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex h-24 w-24 flex-col items-center justify-center rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
        <span className="font-display text-2xl font-semibold text-[var(--svc-accent)]">24/7</span>
        <svg viewBox="0 0 24 24" className="mt-1 h-6 w-6" fill="none" stroke="var(--svc-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      </div>
    </div>
  );
}
