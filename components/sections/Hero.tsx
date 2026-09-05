'use client';

import WorkHeroMarquee from '@/components/ui/WorkHeroMarquee';
import PhotoCardStack from '@/components/ui/PhotoCardStack';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { HOME_SECTIONS } from '@/lib/palette';
import { PROJECTS } from '@/lib/projects';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

const WORK_HERO_IMAGES = PROJECTS.map((p) => p.heroImage).filter((src): src is string => Boolean(src));

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

/** Static hero — no 3D, no scroll-driven animation. Heading, subheading and
 *  two CTAs in a left-aligned column. Mobile closes with a horizontal
 *  infinite marquee of every project's hero shot in a bordered box; desktop
 *  instead keeps the original three tilted product shots bleeding off the
 *  bottom of the fold. Still marks a `data-scene-section` so the shared
 *  camera path's scroll-to-position mapping keeps working for every section
 *  after it, even though nothing 3D is visible here anymore. */
export default function Hero() {
  const t = useT();
  const navigate = useStore((s) => s.navigate);

  return (
    <section
      id="hero"
      data-scene-section
      className="relative flex min-h-[70svh] flex-col items-start overflow-hidden bg-black px-6 pt-32 text-left md:min-h-[100svh] md:pt-24"
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

      {/* Mobile only: a fixed-size box aligned with the heading/CTA above it
          (same px-6 inset — no full-bleed), sized like a single hero shot
          (aspect-video). overflow-hidden clips the horizontal infinite
          marquee of every project's hero shot scrolling inside it. */}
      {/* -webkit-mask-image forces Safari/WebKit to actually respect this
          box's overflow-hidden + rounded-xl clip — without it, WebKit has a
          long-standing bug where an animated/transformed descendant (the
          marquee track) gets promoted to its own compositing layer and
          visibly spills past the rounded corners despite overflow-hidden. */}
      <div
        className="relative z-10 mt-8 aspect-video w-full overflow-hidden rounded-xl border-[2.5px] border-white/50 bg-black md:hidden"
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
      >
        <WorkHeroMarquee
          images={WORK_HERO_IMAGES}
          duration={18}
          className="h-full w-full"
        />
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* Desktop only: back to the original three tilted product shots,
          pushed to the bottom of the column and cropped by the section's
          bottom edge. */}
      <div className="relative z-10 mx-[calc(50%-50vw)] hidden w-screen px-6 md:mt-auto md:block md:pt-12">
        {/* The brand panel starts partway down the shots rather than behind
            all of them, so their tops sit against the white above it. Its
            top edge is cut on a diagonal — the clip-path leaves the left
            corner low and rises to the right. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-32 bg-white/[0.04]"
          style={{ clipPath: 'polygon(0 5rem, 100% 0, 100% 100%, 0 100%)' }}
        />
        <PhotoCardStack className="relative -mb-[5%] justify-center" />
      </div>
    </section>
  );
}
