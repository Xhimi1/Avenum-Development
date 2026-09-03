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
      className="relative flex min-h-[70svh] flex-col items-center overflow-hidden bg-white px-6 pt-40 text-center md:min-h-[100svh] md:pt-32"
    >
      <SplitText
        as="h1"
        className="font-display relative z-10 mx-auto max-w-[14ch] text-[clamp(3.4rem,14.5vw,5.8rem)] font-bold leading-[0.92] text-[#091413] md:max-w-[13ch] md:text-balance md:text-[clamp(4.2rem,7.5vw,7rem)]"
      >
        {t(HEADING)}
      </SplitText>

      <p className="relative z-10 mx-auto mt-6 max-w-xl text-base leading-relaxed text-black md:mt-7 md:text-lg">
        {t(SUBHEADING)}
      </p>

      {/* data-hero-cta: <Nav> measures this row to decide when to reveal its
          own "Call Us" label — once the visitor has scrolled past these. */}
      <div data-hero-cta className="relative z-10 mt-7 mb-2 flex items-center justify-center gap-3 md:mt-8 md:mb-12">
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
          className="pointer-events-auto inline-flex items-center justify-center gap-0.5 rounded-full bg-[#EEF0FF] px-6 py-2.5 font-display text-base font-medium tracking-normal text-[#6367FF] transition-colors duration-300 hover:bg-[#e2e4ff]"
        >
          {t(SECONDARY_LABEL)}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Product shots close the hero: pushed to the bottom of the column and
          deliberately cropped by the section's bottom edge, so the fold reads
          as "there's more below" instead of a hard stop. */}
      <div className="relative z-10 mx-[calc(50%-50vw)] w-screen px-6 pt-8 md:mt-auto md:pt-12">
        {/* The brand panel starts partway down the shots rather than behind
            all of them, so their tops sit against the white above it. Its
            top edge is cut on a diagonal — the clip-path leaves the left
            corner low and rises to the right. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-20 bg-[#D6D0FF]/80 md:top-32"
          style={{ clipPath: 'polygon(0 5rem, 100% 0, 100% 100%, 0 100%)' }}
        />
        <PhotoCardStack className="relative -mb-[10%] justify-center md:-mb-[5%]" />
      </div>
    </section>
  );
}
