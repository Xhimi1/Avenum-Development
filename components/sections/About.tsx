'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import FadeIn from '@/components/ui/FadeIn';
import ArrowRight from '@/components/ui/ArrowRight';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { prefersReducedMotion } from '@/lib/utils';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

const MANIFESTO = {
  en: 'We build beautiful, fast, unique websites — the kind that make your business stand out from the competition and bring in more customers.',
  sq: 'Ne ndërtojmë faqe web të bukura, të shpejta dhe unike — që e dallojnë biznesin tënd nga konkurrenca dhe sjellin më shumë klientë.',
};

const CONTACT_LABEL = { en: 'Contact us', sq: 'Na kontakto' };

const STATS: Array<[string, { en: string; sq: string }]> = [
  ['3+', { en: 'Years of experience', sq: 'Vite përvojë' }],
  ['20+', { en: 'Projects delivered', sq: 'Projekte të realizuara' }],
  ['100%', { en: 'Client satisfaction', sq: 'Klientë të kënaqur' }],
];

/** Count-up reveal: the numeric part ticks up from 0 to its target, suffix stays static. */
function CountUpValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = String(target);
      return;
    }

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.val));
        },
      });
    }, el);
    return () => ctx.revert();
  }, [target]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      <span>{suffix}</span>
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useStore((s) => s.locale);
  const t = useT();
  const manifesto = t(MANIFESTO);

  // Manifesto words light up one by one, scrubbed across the pinned
  // section's scroll range. Re-runs on locale change since the word count
  // (and DOM nodes) differs.
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
      className="relative h-[250vh] bg-[#6367FF]"
    >
      <div className="sticky top-0 flex h-screen items-center pt-24 md:pt-20">
        <div className="mx-auto w-full max-w-5xl px-6 text-center md:px-12">
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

          <FadeIn delay={0.2} className="mt-8 flex justify-center md:mt-10">
            <a
              href={whatsappHref(WA_MESSAGE)}
              data-cursor
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-display text-base font-medium tracking-normal text-[#6367FF] transition-colors duration-300 hover:bg-gray-100"
            >
              {t(CONTACT_LABEL)}
              <ArrowRight className="h-4 w-4" />
            </a>
          </FadeIn>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-6 md:mt-12 md:gap-8">
            {STATS.map(([value, label], i) => (
              <FadeIn key={value} delay={i * 0.08}>
                <p className="font-display text-4xl font-semibold text-white md:text-5xl">
                  <CountUpValue value={value} />
                </p>
                <p className="subtext mt-2 text-xs tracking-normal">
                  {t(label)}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
