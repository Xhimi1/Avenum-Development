/* Detailed flat 2D graphics for the WhatsApp Automation page. */
import { soft, tint, deep, ELEV_LG, ELEV_MD, ELEV_SM, GLOSS, chip, HAIRLINE } from './depth';

export function WhatsappHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
      <div className="absolute inset-x-10 bottom-2 h-10 rounded-full bg-black/20 blur-2xl" />

      {/* phone */}
      <div className="svc-float absolute inset-x-16 inset-y-1 overflow-hidden rounded-[1.6rem] bg-white p-2.5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_LG }}>
        {/* status bar / header */}
        <div className="mb-2.5 flex items-center gap-2 rounded-t-xl px-2 pb-2.5 pt-1" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="white" stroke="none"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" /></svg>
          </span>
          <div>
            <div className="h-2 w-16 rounded-full bg-black/15" />
            <div className="mt-1 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--svc-accent)' }} />
              <span className="h-1.5 w-8 rounded-full bg-black/[0.08]" />
            </div>
          </div>
        </div>
        {/* incoming */}
        <div className="mb-2 max-w-[72%] rounded-xl rounded-tl-sm bg-black/[0.05] px-3 py-2" style={{ boxShadow: ELEV_SM }}>
          <div className="h-1.5 w-20 rounded-full bg-black/15" />
          <div className="mt-1.5 h-1.5 w-12 rounded-full bg-black/[0.08]" />
        </div>
        {/* outgoing auto-reply */}
        <div className="mb-2 ml-auto max-w-[74%] rounded-xl rounded-tr-sm px-3 py-2" style={{ background: `linear-gradient(150deg, ${soft(30)}, ${soft(14)})`, boxShadow: ELEV_SM }}>
          <div className="h-1.5 w-24 rounded-full" style={{ background: tint(65) }} />
          <div className="mt-1.5 h-1.5 w-16 rounded-full" style={{ background: tint(45) }} />
        </div>
        {/* typing bubble */}
        <div className="ml-auto flex max-w-[40%] items-center gap-1 rounded-xl rounded-tr-sm px-3 py-2.5" style={{ background: `linear-gradient(150deg, ${soft(30)}, ${soft(14)})`, boxShadow: ELEV_SM }}>
          <span className="svc-dot h-1.5 w-1.5 rounded-full" style={{ background: tint(70) }} />
          <span className="svc-dot h-1.5 w-1.5 rounded-full" style={{ background: tint(70), animationDelay: '0.2s' }} />
          <span className="svc-dot h-1.5 w-1.5 rounded-full" style={{ background: tint(70), animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* auto-reply bolt badge */}
      <div className="svc-sway absolute right-3 top-8 flex h-14 w-14 items-center justify-center rounded-xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD + ', ' + GLOSS, ['--svc-rot' as string]: '5deg' }}>
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="var(--svc-accent)" stroke="none" style={{ filter: 'drop-shadow(0 2px 3px color-mix(in srgb, var(--svc-accent) 45%, transparent))' }}><path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" /></svg>
      </div>

      {/* floating +1 delivered */}
      <div className="svc-float absolute -left-1 top-24 flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, animationDelay: '-2s' }}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="var(--svc-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12l4 4 8-8" /><path d="M10 16l8-8" /></svg>
        <span className="text-[0.6rem] font-semibold" style={{ color: deep(15) }}>Dërguar</span>
      </div>
    </div>
  );
}

export function TileAutoReply() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="w-44 space-y-2.5">
        <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-white px-3 py-2" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM }}>
          <div className="h-1.5 w-24 rounded-full bg-black/12" />
        </div>
        <div className="ml-auto flex max-w-[80%] items-center gap-2 rounded-xl rounded-tr-sm px-3 py-2" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="white" stroke="none"><path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" /></svg>
          <div className="flex-1">
            <div className="h-1.5 w-full rounded-full bg-white/80" />
            <div className="mt-1 h-1.5 w-2/3 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TileBroadcast() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute h-28 w-28 rounded-full border" style={{ borderColor: tint(22) }} />
        <span className="svc-pulse absolute h-20 w-20 rounded-full border" style={{ borderColor: tint(45) }} />
        <span className="svc-pulse absolute h-12 w-12 rounded-full" style={{ background: tint(14), animationDelay: '0.4s' }} />
        <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-7-7 18-2.5-7.5L3 11z" /></svg>
        </span>
      </div>
    </div>
  );
}

export function TileAlways() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD + ', ' + GLOSS }}>
        <span className="font-display text-2xl font-semibold text-[var(--svc-accent)]">24/7</span>
        <div className="mt-2 flex items-center gap-1">
          <span className="svc-blink h-1.5 w-1.5 rounded-full" style={{ background: 'var(--svc-accent)' }} />
          <span className="text-[0.55rem] font-medium tracking-wide text-black/40">ONLINE</span>
        </div>
      </div>
    </div>
  );
}
