/* Detailed flat 2D graphics for the Booking & Reservations page. */
import { soft, tint, deep, ELEV_LG, ELEV_MD, ELEV_SM, GLOSS, chip, HAIRLINE } from './depth';
import { TileIconBadge, IconClock, IconUserGroup, IconBell } from './StreamlineIcons';

export function BookingHero() {
  const days = Array.from({ length: 28 });
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
      <div className="absolute inset-x-8 bottom-2 h-10 rounded-full bg-black/20 blur-2xl" />

      {/* calendar card */}
      <div className="absolute inset-x-0 top-2 rounded-xl bg-white p-5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_LG }}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="h-3 w-24 rounded-full" style={{ background: 'var(--svc-accent)' }} />
            <span className="h-1.5 w-14 rounded-full bg-black/12" />
          </div>
          <div className="flex gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM }}>
              <svg viewBox="0 0 24 24" className="h-3 w-3 rotate-180" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }}>
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
                className="relative flex aspect-square items-center justify-center rounded text-[0.5rem] font-medium"
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
      <div className="absolute -bottom-3 -left-4 flex items-center gap-2.5 rounded-xl bg-white px-4 py-3" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4 10-10" /></svg>
        </span>
        <div>
          <div className="text-[0.6rem] font-semibold" style={{ color: deep(20) }}>Rezervim i konfirmuar</div>
          <div className="mt-1 h-1.5 w-14 rounded-full bg-black/[0.1]" />
        </div>
      </div>

      {/* floating time chip */}
      <div className="absolute -right-2 top-6 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="var(--svc-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
        <span className="text-[0.65rem] font-semibold" style={{ color: deep(15) }}>20:00</span>
      </div>
    </div>
  );
}

export function TileSlots() {
  return (
    <TileIconBadge>
      <IconClock />
    </TileIconBadge>
  );
}

export function TileGuests() {
  return (
    <TileIconBadge>
      <IconUserGroup />
    </TileIconBadge>
  );
}

export function TileReminder() {
  return (
    <TileIconBadge>
      <IconBell />
    </TileIconBadge>
  );
}
