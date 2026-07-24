/* Detailed flat 2D graphics for the Email Automation page. */
import { soft, tint, deep, ELEV_LG, ELEV_MD, ELEV_SM, GLOSS, chip, HAIRLINE } from './depth';

export function EmailHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
      <div className="absolute inset-x-8 bottom-2 h-10 rounded-full bg-black/20 blur-2xl" />

      {/* fanned stack behind for depth */}
      <div className="absolute inset-x-8 top-14 h-40 rounded-xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM, transform: 'rotate(-7deg)' }} />
      <div className="absolute inset-x-6 top-10 h-44 rounded-xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, transform: 'rotate(4deg)' }} />

      {/* front email card */}
      <div className="svc-float absolute inset-x-3 top-4 rounded-xl bg-white p-4" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_LG }}>
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
      <div className="svc-sway absolute -bottom-2 right-1 flex items-center gap-2 rounded-full bg-white px-3 py-2" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, ['--svc-rot' as string]: '3deg' }}>
        <span className="h-6 w-6 rounded-full" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }} />
        <span className="h-0.5 w-4 rounded-full" style={{ background: tint(45) }} />
        <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: soft(30) }}>
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="var(--svc-accent)" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12l4 4 10-10" /></svg>
        </span>
      </div>

      {/* floating "sent" pill */}
      <div className="svc-float absolute -left-3 top-12 rounded-lg bg-white px-3 py-2 text-[0.6rem] font-semibold" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, color: deep(15), animationDelay: '-2.4s' }}>
        ✓ Dërguar
      </div>
    </div>
  );
}

export function TileFlow() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex items-center">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center">
            <div
              className="svc-pulse flex h-14 w-14 items-center justify-center rounded-xl bg-white"
              style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM + ', ' + GLOSS, animationDelay: `${i * 0.35}s` }}
            >
              <span className="h-6 w-6 rounded-md" style={{ background: `linear-gradient(150deg,${soft(34 + i * 8)},${soft(16 + i * 6)})`, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
            </div>
            {i < 2 && (
              <span className="mx-1 h-0.5 w-6 rounded-full" style={{ background: `linear-gradient(90deg, ${tint(50)}, ${tint(20)})` }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TileInbox() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="w-48 rounded-xl bg-white p-3" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        {[70, 55, 42].map((w, i) => (
          <div key={i} className="mb-2 flex items-center gap-2.5 rounded-md p-1.5 last:mb-0" style={i === 0 ? { background: soft(8) } : undefined}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `linear-gradient(150deg,${soft(24 + i * 8)},${soft(10 + i * 6)})`, boxShadow: ELEV_SM }}>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="white" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M4 7l8 5 8-5" /></svg>
            </span>
            <div className="flex-1">
              <span className="block h-1.5 rounded-full bg-black/12" style={{ width: `${w}%` }} />
              <span className="mt-1 block h-1.5 w-1/3 rounded-full bg-black/[0.06]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TileOpen() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="10" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="var(--svc-accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray="239" strokeDashoffset="72" style={{ filter: 'drop-shadow(0 3px 5px color-mix(in srgb, var(--svc-accent) 45%, transparent))' }} />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-xl font-semibold text-[var(--svc-accent)]">70%</span>
          <span className="text-[0.55rem] font-medium tracking-wide text-black/40">OPEN</span>
        </div>
      </div>
    </div>
  );
}
