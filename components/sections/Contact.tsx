'use client';

import SplitText from '@/components/ui/SplitText';
import FadeIn from '@/components/ui/FadeIn';
import MagneticButton from '@/components/ui/MagneticButton';
import ArrowRight from '@/components/ui/ArrowRight';
import { useT } from '@/lib/i18n';
import { whatsappHref } from '@/lib/contact';

const HEADING = { en: 'Ready to start your website?', sq: 'Gati të fillojmë faqen tënde?' };
const CTA_LABEL = { en: 'Start your project', sq: 'Nis projektin tënd' };
const WA_MESSAGE = { en: 'Hi! I want to start a website project.', sq: 'Përshëndetje! Dua të nis një projekt faqe web.' };

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
              href={whatsappHref(t(WA_MESSAGE))}
              className="pointer-events-auto inline-block rounded-full bg-white px-12 py-6 text-base font-medium tracking-normal text-black transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="inline-flex items-center gap-3">
                {t(CTA_LABEL)}
                <ArrowRight className="h-5 w-5" />
              </span>
            </MagneticButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
