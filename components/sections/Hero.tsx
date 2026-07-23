'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SplitText from '@/components/ui/SplitText';
import FadeIn from '@/components/ui/FadeIn';
import Kinetic from '@/components/ui/Kinetic';
import MagneticButton from '@/components/ui/MagneticButton';
import ArrowRight from '@/components/ui/ArrowRight';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { prefersReducedMotion } from '@/lib/utils';

const HEADING_LINE_1 = { en: 'Websites for', sq: 'Faqe interneti' };
const HEADING_LINE_2 = { en: 'restaurants', sq: 'për restorante' };
const SUBTEXT = {
  en: 'We build beautiful, fast websites — mainly for restaurants — designed to stand out from the competition and bring in more customers.',
  sq: 'Ndërtojmë faqe interneti të bukura dhe të shpejta — kryesisht për restorante — që dallohen nga konkurrenca dhe sjellin më shumë klientë.',
};
const CTA_LABEL = { en: 'See our work', sq: 'Shiko punën' };
const QUOTE = {
  en: 'Based in Tirana, building for every city.',
  sq: 'Me bazë në Tiranë, ndërtojmë për çdo qytet.',
};
const SUBQUOTE = {
  en: 'Wherever your business is, we can work together.',
  sq: 'Kudo që të jetë biznesi yt, mund të punojmë bashkë.',
};

export default function Hero() {
  const navigate = useStore((s) => s.navigate);
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);
  const quote = t(QUOTE);

  // The globe peeks under the button, then recedes into full view as this
  // pinned range scrolls (see Globe.tsx's REVEAL_START/END). The intro copy
  // fades out early to clear the stage, and a quote fades in once the globe
  // has fully revealed, then fades out again just before hero unpins.
  // The quote animates as a single block (not per-word) so this timeline
  // never needs to rebuild when the text changes — e.g. on a language
  // switch, which would otherwise reset the whole scrubbed scroll mapping
  // mid-scroll and visibly jolt the already-faded-out intro content.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        })
        .to(contentRef.current, { opacity: 0, y: -40, duration: 0.6, ease: 'none' }, 0)
        .fromTo(
          quoteTextRef.current,
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, ease: 'none' },
          1.3
        )
        .fromTo(
          quoteRef.current?.querySelector('[data-quote-sub]') ?? null,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'none' },
          2.05
        )
        .to(quoteRef.current, { opacity: 0, duration: 0.4, ease: 'none' }, 2.6);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" data-scene-section className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start px-6 pt-28 text-center md:justify-center md:pt-0">
        <div ref={contentRef}>
          <Kinetic factor={1.2}>
            <h1 className="text-balance font-display text-[clamp(3.4rem,10.5vw,7.5rem)] font-semibold leading-[0.95]">
              <SplitText as="span" delay={1.75} className="block">
                {t(HEADING_LINE_1)}
              </SplitText>
              <SplitText as="span" delay={1.9} className="block">
                {t(HEADING_LINE_2)}
              </SplitText>
            </h1>
          </Kinetic>

          <SplitText
            as="p"
            type="words"
            delay={2.15}
            className="subtext text-shadow-soft text-balance mx-auto mt-8 max-w-xl text-center text-sm font-light md:text-lg"
          >
            {t(SUBTEXT)}
          </SplitText>

          <FadeIn delay={2.35} className="mt-10">
            <MagneticButton
              onClick={() => navigate(2)}
              className="rounded-full bg-white px-8 py-4 text-xs font-medium tracking-normal text-black transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="inline-flex items-center gap-2">
                {t(CTA_LABEL)}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </MagneticButton>
          </FadeIn>
        </div>

        <div
          ref={quoteRef}
          className="pointer-events-none absolute inset-x-0 bottom-[16%] px-6 md:bottom-[7%]"
        >
          <p
            ref={quoteTextRef}
            className="text-shadow-soft mx-auto max-w-2xl text-balance font-display text-[clamp(1.4rem,3.4vw,2.6rem)] font-medium leading-snug will-change-transform"
          >
            {quote}
          </p>
          <p data-quote-sub className="subtext mt-3 text-xs tracking-normal">
            {t(SUBQUOTE)}
          </p>
        </div>
      </div>
    </section>
  );
}
