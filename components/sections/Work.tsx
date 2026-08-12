'use client';

import WorkGallery from '@/components/sections/WorkGallery';
import WorkServices from '@/components/sections/WorkServices';
import FadeIn from '@/components/ui/FadeIn';
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
      <div className="rounded-b-[20px] bg-[#6367FF] px-2 pb-24 pt-24 md:px-6 md:pb-32 md:pt-32">
        <WorkGallery />

        <FadeIn className="mx-auto mt-14 flex w-full max-w-6xl justify-center px-4 md:mt-20 md:px-12">
          <a
            href="/portfolio"
            data-cursor
            onClick={(e) => {
              e.preventDefault();
              pageNavigate('/portfolio', PORTFOLIO_WASH);
            }}
            aria-label={t(VIEW_ALL_LABEL)}
            className="pointer-events-auto rounded-full bg-white px-8 py-4 font-display text-base font-medium tracking-normal text-black transition-colors duration-300 hover:bg-gray-100"
          >
            <span className="inline-flex items-center gap-3">
              {t(VIEW_ALL_LABEL)}
              <ArrowRight className="h-5 w-5" />
            </span>
          </a>
        </FadeIn>
      </div>

      <WorkServices />
    </section>
  );
}
