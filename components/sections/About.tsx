'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import FadeIn from '@/components/ui/FadeIn';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { prefersReducedMotion } from '@/lib/utils';

const MANIFESTO = {
  en: 'The web is not a page. It is a place. We design worlds, engineer feelings and ship experiences people remember with their hands — pixel by pixel, on every screen.',
  sq: 'Interneti nuk është faqe. Është vend. Ne dizajnojmë botë, krijojmë ndjenja dhe ofrojmë përvoja që njerëzit i mbajnë mend me duart e tyre — piksel pas pikseli, në çdo ekran.',
};

const STATS: Array<[string, { en: string; sq: string }]> = [
  ['120+', { en: 'Projects shipped', sq: 'Projekte të përfunduara' }],
  ['31', { en: 'International awards', sq: 'Çmime ndërkombëtare' }],
  ['9', { en: 'Countries', sq: 'Vende' }],
  ['60fps', { en: 'Non-negotiable', sq: "S'diskutohet" }],
];

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
                    {value}
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
