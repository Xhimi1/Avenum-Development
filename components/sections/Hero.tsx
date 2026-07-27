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

const HEADING_LINE_1 = { en: 'Give your business', sq: 'Jepi biznesit tënd' };
const HEADING_LINE_2 = { en: 'superpowers', sq: 'Superfuqi' };
const SUBTEXT = {
  en: "We at Avenum believe a website isn't a business card — it's your best salesperson.",
  sq: 'Ne, Avenum, besojmë se një faqe web nuk është kartëvizitë — është shitësi yt më i mirë.',
};
const CTA_LABEL = { en: 'See our work', sq: 'Shiko punën' };
const QUOTE = {
  en: 'Your satisfaction is our priority.',
  sq: 'Kënaqësia juaj është prioriteti jonë.',
};

export default function Hero() {
  const navigate = useStore((s) => s.navigate);
  const locale = useStore((s) => s.locale);
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);
  const quote = t(QUOTE);

  // The globe peeks under the button, then recedes into full view as this
  // pinned range scrolls (see Globe.tsx's REVEAL_START/END). The intro copy
  // rides straight up out of the viewport at exactly scroll speed — the
  // section is 220vh over a 100vh sticky pane, so the scrubbed timeline maps
  // 120vh of scroll onto its 3 units, i.e. 40vh per unit; travelling one
  // viewport height over 2.5 units keeps it 1:1 and reads as normal scroll
  // rather than a fade. A quote then slides in once the globe has fully
  // revealed, and fades out again just before hero unpins.
  // This timeline only ever touches quoteTextRef's *position* (a single
  // stable ref) and never its word count, so it never needs to rebuild on a
  // language switch — which would otherwise reset the whole scrubbed scroll
  // mapping mid-scroll and visibly jolt the already-departed intro content.
  // The per-word opacity reveal is a separate, locale-scoped effect below.
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
            // the content's travel is derived from viewport height, so it has
            // to be recomputed whenever ScrollTrigger refreshes (e.g. resize)
            invalidateOnRefresh: true,
          },
        })
        .to(
          contentRef.current,
          { y: () => -window.innerHeight, duration: 2.5, ease: 'none' },
          0
        )
        .fromTo(
          quoteTextRef.current,
          { yPercent: 40 },
          { yPercent: 0, duration: 0.6, ease: 'none' },
          1.3
        )
        .to(quoteRef.current, { opacity: 0, duration: 0.4, ease: 'none' }, 2.6);
    }, section);
    return () => ctx.revert();
  }, []);

  // Per-word GSAP reveal for the quote, scrubbed against the same section/
  // range as the timeline above so it stays in sync with the quote's slide-
  // in. Split out into its own effect (keyed on locale) since word count —
  // and therefore the DOM nodes this targets — changes with the language;
  // rebuilding just this small piece on a language switch is a much smaller
  // risk than rebuilding the whole hero timeline above.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-quote-word]', { opacity: 1 });
        return;
      }
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        })
        .fromTo(
          '[data-quote-word]',
          { opacity: 0 },
          { opacity: 1, stagger: 0.04, duration: 0.5, ease: 'none' },
          1.3
        )
        // zero-duration marker at the same total time as the timeline above,
        // so this scrub maps to the identical scroll fraction as the slide-in
        .to({}, { duration: 0 }, 3);
    }, section);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section ref={sectionRef} id="hero" data-scene-section className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start px-6 pt-28 text-center md:justify-center md:pt-0">
        <div ref={contentRef} className="will-change-transform">
          <Kinetic factor={1.2}>
            <h1 className="text-balance font-display text-[clamp(3.4rem,10.5vw,7.5rem)] font-semibold leading-[0.95] md:text-[clamp(3rem,7vw,5.5rem)]">
              <SplitText as="span" delay={1.75} animate className="block">
                {t(HEADING_LINE_1)}
              </SplitText>
              <SplitText as="span" delay={1.9} animate className="block">
                {t(HEADING_LINE_2)}
              </SplitText>
            </h1>
          </Kinetic>

          <SplitText
            as="p"
            type="words"
            delay={2.15}
            animate
            className="subtext text-shadow-soft text-balance mx-auto mt-8 max-w-xl text-center text-sm font-normal md:text-lg"
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
            aria-label={quote}
            className="text-shadow-soft mx-auto max-w-2xl text-balance font-display text-[clamp(1.4rem,3.4vw,2.6rem)] font-medium leading-snug will-change-transform"
          >
            {quote.split(' ').map((word, i) => (
              <span key={i} aria-hidden data-quote-word className="mr-[0.28em] inline-block opacity-0 last:mr-0">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
