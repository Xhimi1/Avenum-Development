'use client';

import SplitText from '@/components/ui/SplitText';
import FadeIn from '@/components/ui/FadeIn';
import MagneticButton from '@/components/ui/MagneticButton';
import ArrowRight from '@/components/ui/ArrowRight';
import { useT } from '@/lib/i18n';

const SOCIALS = ['X', 'Instagram', 'LinkedIn', 'GitHub'];

const HEADING = { en: 'Ready for an experience?', sq: 'Gati për një përvojë?' };
const CTA_LABEL = { en: 'Start your project', sq: 'Nis projektin tënd' };
const COPYRIGHT = {
  en: '© 2026 Avenum — All rights reserved',
  sq: '© 2026 Avenum — Të gjitha të drejtat e rezervuara',
};
const LOCATION_LINE = { en: 'Tirana · Berlin · Remote', sq: 'Tiranë · Berlin · Në distancë' };

export default function Contact() {
  const t = useT();
  return (
    <section id="contact" data-scene-section className="relative min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] flex-col justify-between px-6 pb-10 pt-32 md:px-12">
        <div>
          <SplitText
            as="h2"
            className="text-shadow-soft font-display text-[clamp(3.2rem,10vw,8.5rem)] font-semibold leading-[0.95]"
          >
            {t(HEADING)}
          </SplitText>

          <FadeIn delay={0.2} className="mt-12">
            <MagneticButton
              href="mailto:hello@avenum.studio"
              className="pointer-events-auto inline-block rounded-full bg-white px-12 py-6 text-base font-medium tracking-normal text-black transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="inline-flex items-center gap-3">
                {t(CTA_LABEL)}
                <ArrowRight className="h-5 w-5" />
              </span>
            </MagneticButton>
          </FadeIn>
        </div>

        <footer className="subtext mt-20 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>{t(COPYRIGHT)}</p>
          <p>{t(LOCATION_LINE)}</p>
          <ul className="pointer-events-auto flex gap-5">
            {SOCIALS.map((s) => (
              <li key={s}>
                <a
                  href="#"
                  data-cursor
                  className="transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
