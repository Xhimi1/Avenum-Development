'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { SERVICES } from '@/lib/services';
import { prefersReducedMotion } from '@/lib/utils';

const HEADING: Bi = {
  en: 'Everything a product needs to feel alive.',
  sq: "Gjithçka që i duhet një produkti për t'u ndjerë i gjallë.",
};

const CARD_CLASSES =
  'glass group pointer-events-auto flex h-full flex-col items-start justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3.5 text-white backdrop-blur-2xl transition-colors duration-300 hover:bg-white/20 md:px-5 md:py-5';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const t = useT();

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-service-row]');
    const amount = (card?.offsetWidth ?? 260) + 16;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  // Service rows all reveal together as soon as the section enters view —
  // not staggered, not tied to continued scroll position.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-service-row]',
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-scene-section
      className="relative h-[140vh]"
    >
      <div className="sticky top-0 h-screen">
        <div className="mx-auto flex h-full w-full max-w-[90rem] flex-col justify-between px-6 pt-24 pb-10 md:px-12 md:pb-8 md:pt-20">
          <div className="max-w-2xl">
            <SplitText
              as="h2"
              className="text-shadow-soft font-display text-[clamp(2.1rem,5.5vw,4.6rem)] font-semibold leading-[0.95]"
            >
              {t(HEADING)}
            </SplitText>
          </div>

          <div className="mt-6 md:mt-0">
            <div className="mb-3 flex justify-end gap-2">
              <button
                type="button"
                data-cursor
                aria-label="Previous"
                onClick={() => scrollByCards(-1)}
                className="glass pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-2xl md:h-10 md:w-10"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                data-cursor
                aria-label="Next"
                onClick={() => scrollByCards(1)}
                className="glass pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-2xl md:h-10 md:w-10"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <ul
              ref={scrollerRef}
              data-lenis-prevent
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden"
            >
              {SERVICES.map((s) => {
                const inner = (
                  <>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-semibold md:text-xl">
                          {t(s.title)}
                        </h3>
                        {s.tag && (
                          <span className="rounded-full bg-gradient-to-r from-[#1c3fae] via-[#00d9a3] to-[#ffb84d] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            {t(s.tag)}
                          </span>
                        )}
                      </div>
                      <p className="subtext mt-1 max-w-md text-xs md:mt-2">
                        {t(s.desc)}
                      </p>
                    </div>
                    {s.href && (
                      <span
                        aria-hidden
                        className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center text-white"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </>
                );
                const card = s.href ? (
                  <Link href={s.href} data-cursor className={CARD_CLASSES}>
                    {inner}
                  </Link>
                ) : (
                  <div data-cursor className={CARD_CLASSES}>
                    {inner}
                  </div>
                );
                return (
                  <li
                    key={s.title.en}
                    data-service-row
                    className="relative h-44 w-72 flex-shrink-0 snap-start md:h-40 md:w-72"
                  >
                    {card}
                    {s.tag && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl p-[1.5px]"
                        style={{
                          background:
                            'linear-gradient(to bottom right, #1c3fae, #00d9a3, #ffb84d)',
                          WebkitMask:
                            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
