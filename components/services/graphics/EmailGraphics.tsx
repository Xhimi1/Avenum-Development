/* Detailed flat 2D graphics for the Email Automation page. */
import { soft, tint, deep, ELEV_LG, ELEV_MD, ELEV_SM, GLOSS, chip, HAIRLINE } from './depth';
import { TileIconBadge, IconHierarchy, IconTarget, IconInboxOpen } from './StreamlineIcons';

export function EmailHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
      <div className="absolute inset-x-8 bottom-2 h-10 rounded-full bg-black/20 blur-2xl" />

      {/* fanned stack behind for depth */}
      <div className="absolute inset-x-8 top-14 h-40 rounded-xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM, transform: 'rotate(-7deg)' }} />
      <div className="absolute inset-x-6 top-10 h-44 rounded-xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, transform: 'rotate(4deg)' }} />

      {/* front email card */}
      <div className="absolute inset-x-3 top-4 rounded-xl bg-white p-4" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_LG }}>
        <div className="relative mb-3 flex h-24 items-center justify-center overflow-hidden rounded-lg" style={{ background: `linear-gradient(135deg, ${soft(26)}, ${soft(8)})`, boxShadow: GLOSS }}>
          <div className="svc-sheen absolute -inset-y-2 left-0 w-10 bg-white/40 blur-md" />
          <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'white', boxShadow: ELEV_SM }}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="var(--svc-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 7.5 12 13l8.5-5.5" /></svg>
          </span>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full" style={{ background: soft(24) }} />
          <div className="flex-1">
            <div className="h-2 w-1/2 rounded-full bg-black/15" />
            <div className="mt-1 h-1.5 w-1/3 rounded-full bg-black/[0.08]" />
          </div>
        </div>
        <div className="mb-1.5 h-2 w-full rounded-full bg-black/[0.07]" />
        <div className="h-2 w-4/5 rounded-full bg-black/[0.07]" />
      </div>

      {/* automation flow chip */}
      <div className="absolute -bottom-2 right-1 flex items-center gap-2 rounded-full bg-white px-3 py-2" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <span className="h-6 w-6 rounded-full" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }} />
        <span className="h-0.5 w-4 rounded-full" style={{ background: tint(45) }} />
        <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: soft(30) }}>
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="var(--svc-accent)" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12l4 4 10-10" /></svg>
        </span>
      </div>

      {/* floating "sent" pill */}
      <div className="absolute -left-3 top-12 rounded-lg bg-white px-3 py-2 text-[0.6rem] font-semibold" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, color: deep(15) }}>
        ✓ Dërguar
      </div>
    </div>
  );
}

export function TileFlow() {
  return (
    <TileIconBadge>
      <IconHierarchy />
    </TileIconBadge>
  );
}

export function TileInbox() {
  return (
    <TileIconBadge>
      <IconTarget />
    </TileIconBadge>
  );
}

export function TileOpen() {
  return (
    <TileIconBadge>
      <IconInboxOpen />
    </TileIconBadge>
  );
}
