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
    <section id="contact" data-scene-section className="relative min-h-[65vh] bg-black md:min-h-[80vh]">
      <div className="flex min-h-[65vh] p-3 md:min-h-[80vh] md:p-6">
        <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col items-center justify-center overflow-hidden rounded-[20px] bg-white/[0.04] px-6 py-16 text-center md:max-w-6xl md:px-12">
          {/* Darker wedge below a diagonal, matching the services grid's
              stat card. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(115deg, transparent 62%, rgba(255,255,255,0.03) 62%, rgba(255,255,255,0.03) 100%)',
            }}
          />

          {/* Dot pattern, kept off the dark wedge: two mask layers
              intersected — the original bottom-to-top fade, and a diagonal
              that clips the dots at the same 62% line as the wedge above. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1.5px)',
              backgroundSize: '16px 16px',
              maskImage:
                'linear-gradient(to top, black, rgba(0,0,0,0.15)), linear-gradient(115deg, black 62%, transparent 62%)',
              WebkitMaskImage:
                'linear-gradient(to top, black, rgba(0,0,0,0.15)), linear-gradient(115deg, black 62%, transparent 62%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />

          <div className="relative">
            <SplitText
              as="h2"
              className="heading-lg"
            >
              {t(HEADING)}
            </SplitText>

            <FadeIn delay={0.15}>
              <p className="subtext mx-auto mt-5 max-w-xl">{t(SUBHEADING)}</p>
            </FadeIn>

            <FadeIn delay={0.3} className="mt-12 flex justify-center">
              <a
                href={whatsappHref(WA_MESSAGE)}
                data-cursor
                className="pointer-events-auto btn-primary"
              >
                {t(CTA_LABEL)}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
