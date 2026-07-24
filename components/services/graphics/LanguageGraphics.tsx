/* Detailed flat 2D graphics for the Multi-Language Websites page. */
import { soft, tint, deep, ELEV_LG, ELEV_MD, ELEV_SM, GLOSS, chip, HAIRLINE } from './depth';

export function LanguageHero() {
  return (
    <div aria-hidden className="relative h-72 w-72 md:h-[22rem] md:w-[22rem]">
      <div className="absolute inset-x-10 bottom-3 h-10 rounded-full bg-black/25 blur-2xl" />

      {/* globe sphere */}
      <div
        className="svc-float absolute inset-6 flex items-center justify-center rounded-full"
        style={{ background: 'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.95), color-mix(in srgb, var(--svc-accent) 12%, white) 70%, color-mix(in srgb, var(--svc-accent) 22%, white))', border: `1px solid rgba(255,255,255,0.6)`, boxShadow: `${ELEV_LG}, inset 0 6px 16px rgba(255,255,255,0.6), inset 0 -14px 30px rgba(0,0,0,0.08)` }}
      >
        <svg viewBox="0 0 24 24" className="h-44 w-44" fill="none" stroke="var(--svc-accent)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.7 2.4 2.7 15.6 0 18M12 3c-2.7 2.4-2.7 15.6 0 18" />
          <path d="M4.5 7.5c4.6 2.4 10.4 2.4 15 0M4.5 16.5c4.6-2.4 10.4-2.4 15 0" />
        </svg>
        {/* location pins */}
        <span className="absolute left-[30%] top-[34%] h-2.5 w-2.5 rounded-full ring-4 ring-white/60" style={{ background: 'var(--svc-accent)' }} />
        <span className="absolute right-[32%] top-[52%] h-2 w-2 rounded-full ring-4 ring-white/60" style={{ background: deep(15) }} />
      </div>

      {/* floating language chips */}
      <div className="svc-sway absolute -left-2 top-9 rounded-xl bg-white px-4 py-2.5 font-display text-sm font-semibold" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, color: 'var(--svc-accent)', ['--svc-rot' as string]: '-5deg' }}>
        Shqip
      </div>
      <div className="svc-float absolute -right-1 bottom-12 rounded-xl bg-white px-4 py-2.5 font-display text-sm font-semibold" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, animationDelay: '-3s' }}>
        English
      </div>
      <div className="svc-sway absolute right-9 top-2 rounded-lg px-3 py-2 font-display text-xs font-semibold text-white" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)'), ['--svc-rot' as string]: '4deg' }}>
        Italiano
      </div>
      <div className="svc-float absolute -bottom-1 left-10 rounded-lg bg-white px-3 py-2 font-display text-xs font-semibold" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_SM, color: deep(15), animationDelay: '-1.5s' }}>
        Deutsch
      </div>
    </div>
  );
}

export function TileToggle() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-1 rounded-full bg-white p-1.5" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD }}>
        <span className="rounded-full px-4 py-2.5 text-sm font-bold text-white" style={{ background: 'var(--svc-accent)', boxShadow: chip('var(--svc-accent)') }}>SQ</span>
        <span className="rounded-full px-4 py-2.5 text-sm font-semibold text-black/45">EN</span>
        <span className="rounded-full px-4 py-2.5 text-sm font-semibold text-black/45">IT</span>
      </div>
    </div>
  );
}

export function TileMirror() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center gap-3">
      {[
        { label: 'Mirë se vini', pct: 24 },
        { label: 'Welcome', pct: 12 },
      ].map((c, i) => (
        <div key={i} className="svc-float w-28 overflow-hidden rounded-xl bg-white p-3" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD, animationDelay: `${i * 0.5}s` }}>
          <div className="relative mb-2 h-12 overflow-hidden rounded-md" style={{ background: `linear-gradient(135deg,${soft(c.pct + 12)},${soft(c.pct - 4 < 0 ? 4 : c.pct - 4)})`, boxShadow: GLOSS }}>
            <div className="svc-sheen absolute -inset-y-2 left-0 w-6 bg-white/40 blur-md" />
          </div>
          <div className="text-[0.72rem] font-semibold text-[var(--svc-accent)]">{c.label}</div>
          <div className="mt-1 h-1 w-2/3 rounded-full bg-black/10" />
        </div>
      ))}
    </div>
  );
}

export function TileReach() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_MD + ', ' + GLOSS }}>
        <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="var(--svc-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.6 2.4 2.6 15.6 0 18M12 3c-2.6 2.4-2.6 15.6 0 18" />
        </svg>
        <span className="mt-1.5 font-display text-base font-semibold text-[var(--svc-accent)]">4+ gjuhë</span>
      </div>
    </div>
  );
}
