'use client';

import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import WorkGallery from '@/components/sections/WorkGallery';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';

const EYEBROW: Bi = { en: 'Portfolio', sq: 'Portofoli' };
const HEADING: Bi = { en: 'Everything we’ve built.', sq: 'Gjithçka që kemi ndërtuar.' };
const SUBHEADING: Bi = {
  en: 'Every project we’ve shipped — designed, built and launched to make an impression.',
  sq: 'Çdo projekt që kemi lançuar — i dizajnuar, ndërtuar dhe publikuar për të lënë përshtypje.',
};

export default function PortfolioPage() {
  const t = useT();
  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />

      <main className="pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto w-full max-w-6xl px-4 text-center md:px-12">
          <FadeIn className="flex justify-center">
            <span className="inline-block rounded-full bg-[#EEF0FF] px-3 py-1 text-[0.8rem] font-medium text-[#6367FF]">
              {t(EYEBROW)}
            </span>
          </FadeIn>
          <SplitText
            as="h1"
            delay={0.1}
            className="mx-auto mt-3 max-w-3xl font-display text-[clamp(2.4rem,6.5vw,4.8rem)] font-semibold leading-[0.98]"
          >
            {t(HEADING)}
          </SplitText>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-sm text-black md:text-base">{t(SUBHEADING)}</p>
          </FadeIn>
        </div>

        <div className="mt-16 md:mt-20">
          <WorkGallery mobileSlider />
        </div>
      </main>

      <Footer theme="light" />
    </div>
  );
}
