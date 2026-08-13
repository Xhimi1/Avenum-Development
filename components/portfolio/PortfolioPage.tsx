'use client';

import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import WorkGallery from '@/components/sections/WorkGallery';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

const HEADING: Bi = { en: 'Everything we’ve built.', sq: 'Gjithçka që kemi ndërtuar.' };
const CTA_LABEL: Bi = { en: 'Start your project', sq: 'Nis projektin tënd' };

export default function PortfolioPage() {
  const t = useT();
  const waLink = whatsappHref(WA_MESSAGE);

  return (
    <div className="min-h-screen bg-[#6367FF] text-black">
      <Nav />

      <main className="px-6 pb-24 pt-24 md:px-14 md:pb-32 md:pt-28">
        {/* hero — dark inset card, boxed off from the screen edges, echoing
            the service pages' hero text/CTA treatment. */}
        <div className="mx-[calc(50%-50vw)] w-screen px-2 md:mx-0 md:w-full md:px-4">
          <section
            className="relative overflow-hidden rounded-[28px] bg-[#1A1A1D] px-6 pb-6 pt-16 text-white md:px-12 md:py-24"
            style={{
              backgroundImage:
                'radial-gradient(120% 120% at 15% 12%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 42%), #1A1A1D',
            }}
          >
            <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-8 md:max-w-4xl md:grid-cols-2 md:gap-8">
              <div className="max-w-md text-center md:text-left">
                <SplitText
                  as="h1"
                  delay={0.15}
                  className="font-display text-[clamp(2.8rem,7.2vw,6.4rem)] font-semibold leading-[0.95] tracking-normal [text-wrap:balance] md:text-[clamp(2.8rem,4.5vw,4.4rem)]"
                >
                  {t(HEADING)}
                </SplitText>

                <div className="mt-6">
                  <a
                    href={waLink}
                    data-cursor
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-display text-base font-medium tracking-normal text-black transition-colors duration-300 hover:bg-gray-100"
                  >
                    {t(CTA_LABEL)}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <FadeIn delay={0.3} className="flex justify-center md:justify-end">
                <div className="relative w-full max-w-sm md:max-w-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jimsestate-laptop-mockup.webp"
                  alt=""
                  className="w-full rounded-xl"
                />
              </div>
            </FadeIn>
            </div>
          </section>
        </div>

        <div className="mx-[calc(50%-50vw)] mt-8 w-screen px-2 md:mx-0 md:mt-10 md:w-full md:px-4">
          <WorkGallery grid />
        </div>
      </main>

      <Footer theme="light" />
    </div>
  );
}
