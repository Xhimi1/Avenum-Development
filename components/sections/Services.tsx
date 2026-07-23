'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { prefersReducedMotion } from '@/lib/utils';

const LEARN_MORE: Bi = { en: 'Learn more', sq: 'Mëso më shumë' };

const HEADING: Bi = {
  en: "We don't just build — we unfold passion with clear strategy.",
  sq: 'Ne nuk ndërtojmë — shpalosim pasion me strategji të qartë.',
};

const PARAGRAPH: Bi = {
  en: "Avenum is a web agency based in Tirana. For 3 years we've been building professional, fast, unique websites — mainly for restaurants — giving your business the premium look it deserves, without the premium price.",
  sq: 'Avenum është një agjenci web me bazë në Tiranë. Prej 3 vitesh ndërtojmë faqe interneti profesionale, të shpejta dhe unike — kryesisht për restorante — që i japin biznesit tënd pamjen premium që meriton, pa e bërë të shtrenjtë.',
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useStore((s) => s.locale);
  const navigate = useStore((s) => s.navigate);
  const t = useT();
  const paragraph = t(PARAGRAPH);

  // The paragraph's words rise and fade in together, once, as it scrolls
  // into view.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-whoweare-word]', { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        '[data-whoweare-word]',
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-scene-section
      className="relative flex min-h-screen flex-col justify-between gap-10 py-24 md:min-h-0 md:justify-start md:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <div className="max-w-2xl">
          <SplitText
            as="h2"
            className="text-shadow-soft font-display text-[clamp(2.1rem,5.5vw,4.6rem)] font-semibold leading-[0.95]"
          >
            {t(HEADING)}
          </SplitText>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <div className="max-w-md">
          <p aria-label={paragraph} className="text-sm leading-relaxed text-white md:text-base">
            {paragraph.split(' ').map((word, i) => (
              <span
                key={i}
                aria-hidden
                data-whoweare-word
                className="mr-[0.28em] inline-block opacity-0 last:mr-0"
              >
                {word}
              </span>
            ))}
          </p>

          <button
            type="button"
            data-cursor
            onClick={() => navigate(3)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-medium tracking-normal text-black transition-colors duration-300 hover:text-[var(--accent)]"
          >
            {t(LEARN_MORE)}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
