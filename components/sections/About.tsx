'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import FadeIn from '@/components/ui/FadeIn';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { prefersReducedMotion } from '@/lib/utils';

const MANIFESTO = {
  en: 'We build beautiful, fast, unique websites — the kind that make your business stand out from the competition and bring in more customers.',
  sq: 'Ne ndërtojmë faqe interneti të bukura, të shpejta dhe unike — që e dallojnë biznesin tënd nga konkurrenca dhe sjellin më shumë klientë.',
};

const STATS: Array<[string, { en: string; sq: string }]> = [
  ['3+', { en: 'Years of experience', sq: 'Vite përvojë' }],
  ['20+', { en: 'Projects delivered', sq: 'Projekte të realizuara' }],
  ['100%', { en: 'Client satisfaction', sq: 'Klientë të kënaqur' }],
  ['2', { en: 'Languages, always', sq: 'Gjuhë, gjithmonë' }],
];

/** Mechanical-odometer digit reveal: each digit is a 0–9 reel that spins to
 * land on its value; non-digit characters (+, %) just sit in place. */
function OdometerValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reels = el.querySelectorAll<HTMLElement>('[data-reel]');

    if (prefersReducedMotion()) {
      reels.forEach((reel) => {
        gsap.set(reel, { yPercent: -Number(reel.dataset.digit) * 10 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      reels.forEach((reel, i) => {
        gsap.fromTo(
          reel,
          { yPercent: 0 },
          {
            yPercent: -Number(reel.dataset.digit) * 10,
            duration: 1.1,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref} className="inline-flex">
      {value.split('').map((char, i) =>
        /[0-9]/.test(char) ? (
          <span key={i} className="inline-block h-[1em] overflow-hidden align-top leading-[1em]">
            <span data-reel data-digit={char} className="block">
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d} className="block h-[1em] leading-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i}>{char}</span>
        )
      )}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useStore((s) => s.locale);
  const t = useT();
  const manifesto = t(MANIFESTO);

  // Manifesto words light up one by one, scrubbed across the pinned section.
  // Re-runs on locale change since the word count (and DOM nodes) differs.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-about-word]', { opacity: 1 });
        return;
      }
      gsap.to('[data-about-word]', {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '85% bottom',
          scrub: 0.4,
        },
      });
    }, section);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-scene-section
      className="relative h-[250vh]"
    >
      <div className="sticky top-0 flex h-screen items-center pt-24 md:pt-20">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
          {/* barely-there glass keeps the manifesto readable while the orbit stays visible */}
          <div className="glass-soft -translate-y-10 rounded-3xl p-5 md:translate-y-0 md:p-10">
            <p
              aria-label={manifesto}
              className="text-shadow-soft font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.2]"
            >
              {manifesto.split(' ').map((word, i) => (
                <span key={i} aria-hidden data-about-word className="opacity-20">
                  {word}{' '}
                </span>
              ))}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 md:mt-12 md:grid-cols-4 md:gap-8">
              {STATS.map(([value, label], i) => (
                <FadeIn key={value} delay={i * 0.08}>
                  <p className="font-display text-4xl font-semibold text-white md:text-5xl">
                    <OdometerValue value={value} />
                  </p>
                  <p className="subtext mt-2 text-xs tracking-normal">
                    {t(label)}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
