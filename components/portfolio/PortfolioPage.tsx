'use client';

import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import WorkGallery from '@/components/sections/WorkGallery';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

const HEADING: Bi = {
  en: 'What separates us from other agencies is that we drive growth to Albanian businesses.',
  sq: 'Ajo që na dallon nga agjencitë e tjera është se ne sjellim rritje për bizneset shqiptare.',
};
const CTA_LABEL: Bi = { en: 'Start your project', sq: 'Nis projektin tënd' };

export default function PortfolioPage() {
  const t = useT();
  const waLink = whatsappHref(WA_MESSAGE);

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main>
        {/* hero — no image, just a big centered statement and one CTA. */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
          <SplitText
            as="h1"
            className="relative z-10 max-w-6xl text-balance font-display text-[clamp(3rem,9vw,6rem)] font-medium leading-[1.05] text-white"
          >
            {t(HEADING)}
          </SplitText>

          <div className="relative z-10 mt-10 flex items-center justify-center gap-3">
            <a
              href={waLink}
              data-cursor
              className="pointer-events-auto btn-primary"
            >
              {t(CTA_LABEL)}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        <div className="px-6 pb-24 pt-8 md:px-14 md:pb-32 md:pt-10">
          <WorkGallery grid />
        </div>
      </main>

      <Footer theme="light" />
    </div>
  );
}
