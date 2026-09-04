'use client';

import ArrowRight from '@/components/ui/ArrowRight';
import ClipRevealImage from '@/components/ui/ClipRevealImage';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';

const LEARN_MORE: Bi = { en: 'Learn more', sq: 'Mëso më shumë' };
const aboutSection = SECTIONS.find((s) => s.id === 'about')!;

const PARAGRAPH: Bi = {
  en: "Avenum is a web agency in Tirana. For the past 3 years we've built fast, professional websites for local businesses — mostly restaurants — that turn visitors into paying customers.",
  sq: 'Avenum është një agjenci që synon krijimin e strategjive digjitale që ndihmojnë bizneset shqiptare (restorante, hotele, real estate) të arrijnë të rrisin numrin e klientëve dhe të ardhurat e tyre, si dhe automatizimin e punëve manuale dhe të kushtueshme.',
};

export default function WhoWeAre() {
  const pageNavigate = useStore((s) => s.pageNavigate);
  const t = useT();
  const paragraph = t(PARAGRAPH);

  return (
    <section id="services" data-scene-section className="relative bg-black py-24 md:py-32">
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <div className="flex flex-col gap-10">
          <div className="max-w-md self-end">
            <p className="subheading-hero text-right">{paragraph}</p>

            <button
              type="button"
              data-cursor
              onClick={() => pageNavigate('/about', { accent: aboutSection.accent, bg: aboutSection.bg })}
              className="pointer-events-auto btn-primary mt-6"
            >
              {t(LEARN_MORE)}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <ClipRevealImage
            src="/images/dropdown-image.webp"
            className="aspect-[4/3] w-full"
          />
        </div>
      </div>
    </section>
  );
}
