'use client';

import SplitText from '@/components/ui/SplitText';
import FadeIn from '@/components/ui/FadeIn';
import ArrowRight from '@/components/ui/ArrowRight';
import { useT } from '@/lib/i18n';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

const HEADING = { en: "Let's build your website.", sq: 'Le ta ndërtojmë faqen tënde.' };
const SUBHEADING = {
  en: 'Start your project and completely transform your business, and the way it operates.',
  sq: 'Nis projektin tënd dhe transformo totalisht biznesin tënd, si dhe mënyrën se si funksionon ai.',
};
const CTA_LABEL = { en: 'Start your project', sq: 'Nis projektin tënd' };

export default function Contact() {
  const t = useT();
  return (
    <section id="contact" data-scene-section className="relative min-h-[65vh] bg-white md:min-h-[80vh]">
      <div className="flex min-h-[65vh] p-3 md:min-h-[80vh] md:p-6">
        <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col items-center justify-center overflow-hidden rounded-[20px] bg-[#6367FF] px-6 py-16 text-center md:max-w-6xl md:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1.5px)',
              backgroundSize: '16px 16px',
              maskImage: 'linear-gradient(to top, black, rgba(0,0,0,0.15))',
              WebkitMaskImage: 'linear-gradient(to top, black, rgba(0,0,0,0.15))',
            }}
          />

          <div className="relative">
            <SplitText
              as="h2"
              className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.95] md:text-[clamp(2.4rem,4vw,3.8rem)]"
            >
              {t(HEADING)}
            </SplitText>

            <FadeIn delay={0.15}>
              <p className="subtext mx-auto mt-5 max-w-xl text-base leading-relaxed">{t(SUBHEADING)}</p>
            </FadeIn>

            <FadeIn delay={0.3} className="mt-12 flex justify-center">
              <a
                href={whatsappHref(WA_MESSAGE)}
                data-cursor
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-display text-base font-medium tracking-normal text-[#6367FF] transition-colors duration-300 hover:bg-gray-100"
              >
                {t(CTA_LABEL)}
                <ArrowRight className="h-4 w-4" />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
