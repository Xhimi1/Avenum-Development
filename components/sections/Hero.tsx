'use client';

import PhotoCardStack from '@/components/ui/PhotoCardStack';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { HOME_SECTIONS } from '@/lib/palette';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

const HEADING: Bi = {
  en: "Don't get tired. We will.",
  sq: 'Mos u lodh, lodhemi ne.',
};

const SUBHEADING: Bi = {
  en: 'Premium web agency for helping Albanian businesses digitalize.',
  sq: 'Agjenci web premium që ndihmon bizneset shqiptare të digjitalizohen.',
};

const PRIMARY_LABEL: Bi = { en: 'Contact', sq: 'Kontakto' };
const SECONDARY_LABEL: Bi = { en: 'Projects', sq: 'Projektet' };

const WORK_INDEX = HOME_SECTIONS.findIndex((s) => s.id === 'work');

/** Clients shown as social proof under the CTAs. Paths are percent-encoded
 *  because the files' own names carry spaces and parentheses. */
const CLIENTS = [
  { name: 'Riva', src: '/images/logo%201.webp' },
  { name: 'Platinum', src: '/images/Group%203%20(1).avif' },
  { name: 'Kroni', src: '/images/Group%201%20(9).svg' },
];

/** The hero's U-shaped brand wash. `sideHeight` is the vertical radius of
 *  the two corner glows — the taller it is, the higher the purple climbs
 *  the left and right edges. `scale` multiplies every layer's alpha; the
 *  grain overlay reuses the shape at full strength as its mask, so the
 *  texture only lands where the purple does and fades out with it. */
const wash = (sideHeight: string, scale = 1) => {
  const a = (base: number) => Math.min(1, base * scale).toFixed(3);
  return [
    `radial-gradient(ellipse 30% ${sideHeight} at 0% 100%, rgba(99,103,255,${a(0.26)}) 0%, rgba(99,103,255,0) 80%)`,
    `radial-gradient(ellipse 30% ${sideHeight} at 100% 100%, rgba(99,103,255,${a(0.26)}) 0%, rgba(99,103,255,0) 80%)`,
    `linear-gradient(to top, rgba(99,103,255,${a(0.24)}) 0%, rgba(99,103,255,${a(0.2)}) 18%, rgba(99,103,255,0) 46%)`,
  ].join(', ');
};

/** Brings the wash's peak alpha (0.26) up to a fully opaque mask. */
const MASK_SCALE = 1 / 0.26;

/** Coarser, higher-contrast noise than the site-wide `.grain` overlay —
 *  the extra octave and the alpha ramp (slope/intercept) push the speckle
 *  toward pure black and white instead of a soft gray mush. Kept local to
 *  the hero so the shared `.grain` texture stays as subtle as it is
 *  everywhere else. */
const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='2.6' intercept='-0.55'/></feComponentTransfer></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>\")";

/** One wash layer, with film grain masked to the wash's own shape. */
function Wash({ sideHeight, className }: { sideHeight: string; className: string }) {
  const mask = wash(sideHeight, MASK_SCALE);
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ backgroundImage: wash(sideHeight) }}
    >
      <div
        className="absolute inset-0 opacity-[0.6] mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundSize: '220px 220px',
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  );
}

/** Static hero — no 3D, no scroll-driven animation. A flat white panel laid
 *  out as a single vertical column, the way most SaaS landing pages open:
 *  heading, subheading, two CTAs, then the product shots anchored at the
 *  bottom and bleeding off the fold. Still marks a `data-scene-section` so
 *  the shared camera path's scroll-to-position mapping keeps working for
 *  every section after it, even though nothing 3D is visible here anymore. */
export default function Hero() {
  const t = useT();
  const navigate = useStore((s) => s.navigate);

  return (
    <section
      id="hero"
      data-scene-section
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden bg-white px-6 pt-40 text-center md:pt-32"
    >
      {/* U-shaped brand wash framing the content: a band across the bottom
          plus two tall glows climbing the left and right edges, leaving the
          middle column clear. Rendered twice — inline styles can't carry a
          media query, and the side glows sit lower on mobile, where the
          column is narrower and they'd otherwise crowd the heading. */}
      <Wash sideHeight="88%" className="md:hidden" />
      <Wash sideHeight="125%" className="max-md:hidden" />

      <SplitText
        as="h1"
        className="font-display relative z-10 mx-auto max-w-[14ch] text-[clamp(3.4rem,14.5vw,5.8rem)] font-bold leading-[0.92] text-[#061E29] md:max-w-[13ch] md:text-balance md:text-[clamp(4.2rem,7.5vw,7rem)]"
      >
        {t(HEADING)}
      </SplitText>

      <p className="relative z-10 mx-auto mt-6 max-w-xl text-base leading-relaxed text-black md:mt-7 md:text-lg">
        {t(SUBHEADING)}
      </p>

      {/* data-hero-cta: <Nav> measures this row to decide when to reveal its
          own "Call Us" label — once the visitor has scrolled past these. */}
      <div data-hero-cta className="relative z-10 mt-7 mb-10 flex items-center justify-center gap-3 md:mt-8 md:mb-12">
        <a
          href={whatsappHref(WA_MESSAGE)}
          data-cursor
          className="pointer-events-auto inline-flex items-center justify-center gap-0.5 rounded-full bg-[#6367FF] px-6 py-2.5 font-display text-base font-medium tracking-normal text-white transition-colors duration-300 hover:bg-[#4f52e0]"
        >
          {t(PRIMARY_LABEL)}
          <ArrowRight className="h-4 w-4" />
        </a>

        <button
          type="button"
          data-cursor
          onClick={() => navigate(WORK_INDEX)}
          className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E8E8] bg-[#F0F0F0] px-6 py-2.5 font-display text-base font-medium tracking-normal text-black transition-colors duration-300 hover:bg-[#e2e2e2]"
        >
          {t(SECONDARY_LABEL)}
        </button>
      </div>

      {/* Social proof under the CTAs — deliberately low-contrast (muted and
          desaturated) so it reads as supporting evidence rather than
          competing with the heading or the buttons above it. The centre copy
          carries the real client logos; on mobile it's flanked by blurred
          repeats that stand in as plain dark circles and fade out under the
          edge mask, so the strip reads as continuing past the viewport.
          Desktop has room for the real three on their own, so both the
          repeats and the mask drop away there. The repeats are decorative
          only — hidden from assistive tech so the list still announces
          exactly three. */}
      <div className="relative z-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] md:[mask-image:none] md:[-webkit-mask-image:none]">
        <ul className="flex items-center justify-center gap-x-5 md:gap-x-9">
          {[0, 1, 2].map((copy) =>
            CLIENTS.map((client) => (
              <li
                key={`${copy}-${client.name}`}
                aria-hidden={copy !== 1}
                className={`flex flex-shrink-0 items-center gap-1 ${
                  copy === 1 ? 'opacity-60 grayscale' : 'opacity-55 blur-[1px] md:hidden'
                }`}
              >
                {copy === 1 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={client.src} alt="" className="h-5 w-auto object-contain md:h-6" />
                ) : (
                  <span className="h-5 w-5 flex-shrink-0 rounded-full bg-[#061E29] md:h-6 md:w-6" />
                )}
                <span className="font-display text-xs font-medium tracking-normal text-[#061E29] md:text-sm">
                  {client.name}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Product shots close the hero: pushed to the bottom of the column and
          deliberately cropped by the section's bottom edge, so the fold reads
          as "there's more below" instead of a hard stop. */}
      <div className="relative z-10 mx-[calc(50%-50vw)] mt-auto w-screen px-6 pt-10 md:pt-12">
        <PhotoCardStack className="-mb-[10%] justify-center md:-mb-[5%]" />
      </div>
    </section>
  );
}
