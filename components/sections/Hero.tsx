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
  en: 'We make sure your business never gets ignored.',
  sq: 'Ne bëjmë që biznesi juaj të mos injorohet kurrë.',
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
      className="relative flex min-h-[70svh] flex-col items-start overflow-hidden bg-black px-6 pt-40 text-left md:min-h-[100svh] md:pt-32"
    >
      <SplitText
        as="h1"
        className="relative z-10 max-w-[14ch] text-balance font-display text-[clamp(2.6rem,11vw,4rem)] font-normal leading-[1.05] text-white md:max-w-[22ch] md:text-[clamp(2.6rem,4.4vw,4rem)]"
      >
        {t(HEADING)}
      </SplitText>

      <p className="subheading-hero relative z-10 mt-6 max-w-xs text-left md:mt-7">
        {t(SUBHEADING)}
      </p>

      {/* data-hero-cta: <Nav> measures this row to decide when to reveal its
          own "Call Us" label — once the visitor has scrolled past these. */}
      <div data-hero-cta className="relative z-10 mt-7 mb-8 flex items-center justify-start gap-3 md:mt-8 md:mb-16">
        <a
          href={whatsappHref(WA_MESSAGE)}
          data-cursor
          className="pointer-events-auto btn-primary"
        >
          {t(PRIMARY_LABEL)}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>

        <button
          type="button"
          data-cursor
          onClick={() => navigate(WORK_INDEX)}
          className="pointer-events-auto btn-secondary"
        >
          {t(SECONDARY_LABEL)}
          <ArrowRight className="h-3.5 w-3.5" />
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
          className="pointer-events-none absolute inset-x-0 bottom-0 top-20 bg-white/[0.04] md:top-32"
          style={{ clipPath: 'polygon(0 5rem, 100% 0, 100% 100%, 0 100%)' }}
        />
        <PhotoCardStack className="relative -mb-[10%] justify-center md:-mb-[5%]" />
      </div>
    </section>
  );
}
