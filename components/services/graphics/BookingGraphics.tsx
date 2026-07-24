/* Flat 2D graphics for the Booking & Reservations page. */

const soft = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, white)`;
const tint = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, transparent)`;

export function BookingHero() {
  const days = Array.from({ length: 21 });
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-80 md:w-80">
      {/* calendar */}
      <div className="svc-float absolute inset-0 rounded-3xl border border-black/10 bg-white p-5 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.35)]">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-3 w-20 rounded-full bg-black/15" />
          <div className="h-6 w-6 rounded-lg" style={{ background: tint(60) }} />
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-md"
              style={{ background: i === 11 ? 'var(--svc-accent)' : soft(i % 3 === 0 ? 14 : 6) }}
            />
          ))}
        </div>
      </div>

      {/* floating "confirmed" reservation chip */}
      <div
        className="svc-float absolute -bottom-5 -left-4 flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.4)]"
        style={{ animationDelay: '-2.5s' }}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: tint(85) }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l4 4 10-10" />
          </svg>
        </span>
        <div>
          <div className="h-2 w-16 rounded-full bg-black/15" />
          <div className="mt-1.5 h-2 w-10 rounded-full bg-black/[0.08]" />
        </div>
      </div>
    </div>
  );
}

export function TileSlots() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="grid grid-cols-2 gap-2.5">
        {['19:00', '19:30', '20:00', '20:30'].map((s, i) => (
          <div
            key={s}
            className="flex h-11 w-20 items-center justify-center rounded-xl border text-xs font-medium shadow-[0_10px_22px_-14px_rgba(0,0,0,0.3)]"
            style={
              i === 2
                ? { background: 'var(--svc-accent)', color: 'white', borderColor: 'transparent' }
                : { background: 'white', color: 'rgba(0,0,0,0.6)', borderColor: 'rgba(0,0,0,0.1)' }
            }
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TileGuests() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex -space-x-3">
        {[24, 34, 18, 44].map((pct, i) => (
          <span
            key={i}
            className="svc-float flex h-14 w-14 items-center justify-center rounded-full border-2 border-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.4)]"
            style={{ background: soft(pct), animationDelay: `${i * 0.4}s` }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="var(--svc-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TileReminder() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="svc-float relative flex h-24 w-24 items-center justify-center rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
        <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="var(--svc-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        <span className="absolute right-3 top-3 h-3.5 w-3.5 rounded-full border-2 border-white" style={{ background: 'var(--svc-accent)' }} />
      </div>
    </div>
  );
}
