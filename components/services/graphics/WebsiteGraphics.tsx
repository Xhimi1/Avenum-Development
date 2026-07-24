/* Detailed flat 2D graphics for the Business Websites page. Light from the
   top, stacked shadows + hairline borders so the shapes feel layered / 3D.
   Everything recolors from --svc-accent. No WebGL. */
import { soft, tint, deep, ELEV_LG, ELEV_MD, ELEV_SM, GLOSS, chip, HAIRLINE } from './depth';

export function WebsiteHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
      {/* soft ground shadow */}
      <div className="absolute inset-x-8 bottom-2 h-10 rounded-full bg-black/20 blur-2xl" />

      {/* main browser window */}
      <div
        className="svc-float absolute inset-x-0 top-2 overflow-hidden rounded-2xl bg-white"
        style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_LG }}
      >
        {/* chrome bar */}
        <div className="flex items-center gap-2 border-b px-3 py-2.5" style={{ borderColor: HAIRLINE, background: 'linear-gradient(#fafafc,#f2f3f7)' }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ff5f57', boxShadow: '0 1px 1px rgba(0,0,0,0.15)' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#febc2e', boxShadow: '0 1px 1px rgba(0,0,0,0.15)' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#28c840', boxShadow: '0 1px 1px rgba(0,0,0,0.15)' }} />
          <span className="ml-2 flex h-5 flex-1 items-center gap-1.5 rounded-md bg-white px-2" style={{ border: `1px solid ${HAIRLINE}` }}>
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="var(--svc-accent)" strokeWidth="2.5"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            <span className="h-1.5 w-20 rounded-full bg-black/10" />
          </span>
        </div>

        {/* page body */}
        <div className="p-3.5">
          {/* nav row */}
          <div className="mb-3 flex items-center justify-between">
            <span className="h-2.5 w-10 rounded-full" style={{ background: 'var(--svc-accent)' }} />
            <div className="flex gap-1.5">
              <span className="h-1.5 w-6 rounded-full bg-black/12" />
              <span className="h-1.5 w-6 rounded-full bg-black/10" />
              <span className="h-1.5 w-6 rounded-full bg-black/[0.07]" />
            </div>
          </div>
          {/* hero band with sheen */}
          <div className="relative mb-3 h-20 overflow-hidden rounded-xl" style={{ background: `linear-gradient(135deg, ${soft(30)}, ${soft(8)})`, boxShadow: GLOSS }}>
            <div className="svc-sheen absolute -inset-y-2 left-0 w-10 bg-white/40 blur-md" />
            <div className="absolute left-3 top-4 h-2 w-24 rounded-full bg-white/70" />
            <div className="absolute left-3 top-8 h-1.5 w-16 rounded-full bg-white/50" />
            <div className="absolute left-3 top-12 h-5 w-14 rounded-md" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }} />
          </div>
          {/* content cards */}
          <div className="grid grid-cols-3 gap-2">
            {[26, 16, 22].map((p, i) => (
              <div key={i} className="rounded-lg bg-white p-1.5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM }}>
                <div className="mb-1.5 h-6 rounded" style={{ background: `linear-gradient(135deg, ${soft(p + 12)}, ${soft(p - 8 < 0 ? 4 : p - 8)})` }} />
                <div className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: soft(p + 20) }} />
                  <span className="h-1 flex-1 rounded-full bg-black/12" />
                </div>
                <div className="mt-1 h-1 w-2/3 rounded-full bg-black/[0.06]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating phone, responsive hint */}
      <div
        className="svc-float absolute -bottom-3 -right-3 w-[4.5rem] overflow-hidden rounded-[1.1rem] bg-white p-1.5"
        style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, animationDelay: '-3s' }}
      >
        <div className="mb-1 h-11 rounded-lg" style={{ background: `linear-gradient(135deg, ${soft(34)}, ${soft(12)})` }} />
        <div className="mb-1 h-1.5 w-full rounded-full bg-black/12" />
        <div className="h-1.5 w-2/3 rounded-full bg-black/[0.07]" />
      </div>

      {/* floating "cursor + tooltip" */}
      <div className="svc-sway absolute -left-3 top-10 flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, ['--svc-rot' as string]: '-4deg' }}>
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--svc-accent)' }} />
        <span className="text-[0.6rem] font-semibold" style={{ color: deep(20) }}>Live</span>
      </div>
    </div>
  );
}

export function TileSpeed() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="10" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="var(--svc-accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray="239" strokeDashoffset="30" style={{ filter: 'drop-shadow(0 3px 5px color-mix(in srgb, var(--svc-accent) 45%, transparent))' }} />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-2xl font-semibold text-[var(--svc-accent)]">98</span>
          <span className="text-[0.55rem] font-medium tracking-wide text-black/40">SCORE</span>
        </div>
      </div>
    </div>
  );
}

export function TileResponsive() {
  return (
    <div aria-hidden className="flex h-full w-full items-end justify-center gap-3">
      <div className="w-36 rounded-xl bg-white p-2" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <div className="mb-1.5 h-16 rounded-md" style={{ background: `linear-gradient(135deg,${soft(20)},${soft(6)})`, boxShadow: GLOSS }} />
        <div className="mb-1 h-1.5 w-2/3 rounded-full bg-black/12" />
        <div className="h-1.5 w-1/2 rounded-full bg-black/[0.07]" />
      </div>
      <div className="svc-float w-12 rounded-lg bg-white p-1.5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM }}>
        <div className="h-14 rounded" style={{ background: `linear-gradient(135deg,${soft(28)},${soft(10)})` }} />
      </div>
    </div>
  );
}

export function TileDesign() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="grid grid-cols-2 gap-3">
        {[30, 16, 20, 40].map((pct, i) => (
          <div
            key={i}
            className="svc-pulse flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: `linear-gradient(150deg, ${soft(pct + 14)}, ${soft(pct - 6 < 0 ? 4 : pct - 6)})`, border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM + ', ' + GLOSS, animationDelay: `${i * 0.3}s` }}
          >
            <span className="h-4 w-4 rounded-md" style={{ background: 'var(--svc-accent)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
