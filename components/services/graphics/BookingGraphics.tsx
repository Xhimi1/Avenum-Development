/* Detailed flat 2D graphics for the Booking & Reservations page. */
import { soft, tint, deep, ELEV_LG, ELEV_MD, ELEV_SM, GLOSS, chip, HAIRLINE } from './depth';

export function BookingHero() {
  const days = Array.from({ length: 28 });
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
      <div className="absolute inset-x-8 bottom-2 h-10 rounded-full bg-black/20 blur-2xl" />

      {/* calendar card */}
      <div className="svc-float absolute inset-x-0 top-2 rounded-2xl bg-white p-5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_LG }}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="h-3 w-24 rounded-full" style={{ background: 'var(--svc-accent)' }} />
            <span className="h-1.5 w-14 rounded-full bg-black/12" />
          </div>
          <div className="flex gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM }}>
              <svg viewBox="0 0 24 24" className="h-3 w-3 rotate-180" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }}>
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
            </span>
          </div>
        </div>
        <div className="mb-2 grid grid-cols-7 gap-1.5">
          {['H', 'M', 'M', 'E', 'P', 'S', 'D'].map((d, i) => (
            <span key={i} className="text-center text-[0.5rem] font-semibold text-black/30">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((_, i) => {
            const active = i === 15;
            const dotted = [9, 18, 22].includes(i);
            return (
              <div
                key={i}
                className="relative flex aspect-square items-center justify-center rounded-md text-[0.5rem] font-medium"
                style={
                  active
                    ? { background: 'var(--svc-accent)', color: 'white', boxShadow: chip('var(--svc-accent)') }
                    : { background: soft(i % 4 === 0 ? 12 : 5), color: 'rgba(0,0,0,0.35)' }
                }
              >
                {i + 1}
                {dotted && <span className="absolute bottom-0.5 h-1 w-1 rounded-full" style={{ background: 'var(--svc-accent)' }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* floating confirmed reservation */}
      <div className="svc-sway absolute -bottom-3 -left-4 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, ['--svc-rot' as string]: '-3deg' }}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4 10-10" /></svg>
        </span>
        <div>
          <div className="text-[0.6rem] font-semibold" style={{ color: deep(20) }}>Rezervim i konfirmuar</div>
          <div className="mt-1 h-1.5 w-14 rounded-full bg-black/[0.1]" />
        </div>
      </div>

      {/* floating time chip */}
      <div className="svc-float absolute -right-2 top-6 flex items-center gap-1.5 rounded-xl bg-white px-3 py-2" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, animationDelay: '-2s' }}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="var(--svc-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
        <span className="text-[0.65rem] font-semibold" style={{ color: deep(15) }}>20:00</span>
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
            className="flex h-12 w-24 items-center justify-center rounded-xl text-sm font-semibold"
            style={
              i === 2
                ? { background: 'var(--svc-accent)', color: 'white', boxShadow: chip('var(--svc-accent)') }
                : { background: 'white', color: 'rgba(0,0,0,0.55)', border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM }
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
      <div className="flex -space-x-3.5">
        {[26, 38, 18, 46].map((pct, i) => (
          <span
            key={i}
            className="svc-float flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white"
            style={{ background: `linear-gradient(150deg,${soft(pct + 12)},${soft(pct - 4 < 0 ? 4 : pct - 4)})`, boxShadow: ELEV_SM, animationDelay: `${i * 0.4}s`, zIndex: 4 - i }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </span>
        ))}
        <span className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white bg-white text-xs font-bold text-[var(--svc-accent)]" style={{ boxShadow: ELEV_SM }}>+9</span>
      </div>
    </div>
  );
}

export function TileReminder() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="svc-float relative flex h-28 w-28 items-center justify-center rounded-[1.6rem] bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD + ', ' + GLOSS }}>
        <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="var(--svc-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        <span className="svc-blink absolute right-4 top-4 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white text-[0.5rem] font-bold text-white" style={{ background: '#ff5f57' }}>3</span>
      </div>
    </div>
  );
}
