'use client';

import WorkGallery from '@/components/sections/WorkGallery';
import WorkServices from '@/components/sections/WorkServices';
import FadeIn from '@/components/ui/FadeIn';
import MagneticButton from '@/components/ui/MagneticButton';
import ArrowRight from '@/components/ui/ArrowRight';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';

const VIEW_ALL_LABEL: Bi = { en: 'View all portfolio', sq: 'Shiko gjithë portofolin' };
const PORTFOLIO_WASH = { accent: '#6367FF', bg: '#0b0a16' };

export default function Work() {
  const t = useT();
  const pageNavigate = useStore((s) => s.pageNavigate);

  return (
    <section id="work" data-scene-section className="relative bg-white pb-24 text-black md:pb-32">
      <div
        className="bg-[#E4E5FF] pb-24 pt-24 md:pb-32 md:pt-32"
        style={{
          clipPath:
            'polygon(0 5px, 20% 12px, 45% 2px, 70% 10px, 100% 0, 100% calc(100% - 10px), 0 100%)',
        }}
      >
        <WorkGallery />

        <FadeIn className="mx-auto mt-14 flex w-full max-w-6xl justify-center px-4 md:mt-20 md:px-12">
          <MagneticButton
            href="/portfolio"
            onClick={(e) => {
              e.preventDefault();
              pageNavigate('/portfolio', PORTFOLIO_WASH);
            }}
            aria-label={t(VIEW_ALL_LABEL)}
            className="rounded-full bg-[#6367FF] px-12 py-6 text-base font-medium tracking-normal text-white transition-colors duration-300 hover:bg-[#4f52e0]"
          >
            <span className="inline-flex items-center gap-3">
              {t(VIEW_ALL_LABEL)}
              <ArrowRight className="h-5 w-5" />
            </span>
          </MagneticButton>
        </FadeIn>
      </div>

      <WorkServices />
    </section>
  );
}
