'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import ClipRevealImage from '@/components/ui/ClipRevealImage';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';
import { cn, prefersReducedMotion } from '@/lib/utils';

const LEARN_MORE: Bi = { en: 'Learn more', sq: 'Mëso më shumë' };
const aboutSection = SECTIONS.find((s) => s.id === 'about')!;

const HEADING: Bi = {
  en: 'Everything we learned from 3 years, yours by default.',
  sq: 'Gjithçka që kemi mësuar gjatë 3 viteve, tashmë e jotja.',
};

const PARAGRAPH: Bi = {
  en: "Avenum is a web agency in Tirana. For the past 3 years we've built fast, professional websites for local businesses — mostly restaurants — that turn visitors into paying customers.",
  sq: 'Avenum është një agjenci që synon krijimin e strategjive digjitale që ndihmojnë bizneset shqiptare (restorante, hotele, real estate) të arrijnë të rrisin numrin e klientëve dhe të ardhurat e tyre, si dhe automatizimin e punëve manuale dhe të kushtueshme.',
};

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useStore((s) => s.locale);
  const pageNavigate = useStore((s) => s.pageNavigate);
  const t = useT();
  const paragraph = t(PARAGRAPH);
  const [imageRevealed, setImageRevealed] = useState(false);

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
      className="relative bg-white py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12">
          <div className="flex flex-col gap-10">
            <div className="max-w-2xl">
              <SplitText
                as="h2"
                className="font-display text-[clamp(2.8rem,7.2vw,6.4rem)] font-semibold leading-[0.95] text-[#333D6D] md:text-[clamp(2.8rem,4.5vw,4.4rem)]"
              >
                {t(HEADING)}
              </SplitText>
            </div>

            <div className="max-w-md">
              <p aria-label={paragraph} className="text-base leading-relaxed text-[#333D6D]">
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
                onClick={() => pageNavigate('/about', { accent: aboutSection.accent, bg: aboutSection.bg })}
                className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#6367FF] px-8 py-4 font-display text-base font-medium tracking-normal text-white transition-colors duration-300 hover:bg-[#4f52e0]"
              >
                {t(LEARN_MORE)}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="relative mt-10 md:mt-0">
            <ClipRevealImage
              src="/images/dropdown-image.webp"
              className="aspect-[4/3] w-full rounded-3xl"
              onRevealed={() => setImageRevealed(true)}
            />

            {/* Slowly spinning brand badge — sits outside ClipRevealImage
                (which clips via overflow-hidden for its swipe reveal) so it
                can overhang the image's bottom-right corner. Stays hidden
                until the image's own reveal animation finishes. */}
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute -bottom-6 -right-3 h-20 w-20 transition-opacity duration-500 motion-safe:animate-[spin_18s_linear_infinite] md:h-24 md:w-24',
                imageRevealed ? 'opacity-100' : 'opacity-0'
              )}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path id="whoweare-badge-circle" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
                </defs>
                <text fill="#6367FF" fontSize="17" fontWeight={600} letterSpacing="1" className="font-display uppercase">
                  <textPath href="#whoweare-badge-circle" startOffset="0%">
                    &bull; Avenum &bull; Avenum &bull; Avenum &bull;
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
