'use client';

import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import WorkGallery from '@/components/sections/WorkGallery';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { whatsappHref } from '@/lib/contact';

const EYEBROW: Bi = { en: 'Portfolio', sq: 'Portofoli' };
const HEADING: Bi = { en: 'Everything we’ve built.', sq: 'Gjithçka që kemi ndërtuar.' };
const SUBHEADING: Bi = {
  en: 'A web design studio with 3+ years of experience and 20+ websites built for businesses across Albania.',
  sq: 'Një studio dizajni web me 3+ vite përvojë dhe 20+ faqe interneti të ndërtuara për biznese në Shqipëri.',
};
const CTA_LABEL: Bi = { en: 'Start your project', sq: 'Nis projektin tënd' };
const WA_MESSAGE: Bi = { en: 'Hi! I want to start a project.', sq: 'Përshëndetje! Dua të nis një projekt.' };

export default function PortfolioPage() {
  const t = useT();
  const waLink = whatsappHref(t(WA_MESSAGE));

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />

      <main className="px-6 pb-24 pt-24 md:px-14 md:pb-32 md:pt-28">
        {/* hero — dark inset card, boxed off from the screen edges, echoing
            the service pages' hero text/CTA treatment. Wrapper padding
            (w-full md:px-12) matches WorkGallery's grid wrapper below so
            the card's outer edges line up with the gallery's; the content
            inside stays centered at its original max-w-5xl width/position. */}
        <div className="w-full md:px-12">
          <section
            className="relative overflow-hidden rounded-lg bg-[#1A1A1D] px-6 py-16 text-white md:px-12 md:py-24"
            style={{
              backgroundImage:
                'radial-gradient(120% 120% at 15% 12%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 42%), #1A1A1D',
            }}
          >
            <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-2 md:gap-8">
              <div className="max-w-md">
                <FadeIn delay={0.05} className="-mt-3 md:mt-0">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-normal text-white">
                    {t(EYEBROW)}
                  </span>
                </FadeIn>
                <SplitText
                  as="h1"
                  delay={0.15}
                  className="mt-3 font-display text-4xl md:text-[clamp(1.5rem,3.4vw,2.4rem)] font-medium leading-[1.05] tracking-normal [text-wrap:balance]"
                >
                  {t(HEADING)}
                </SplitText>
                <FadeIn delay={0.35}>
                  <p className="mt-3 max-w-md text-[0.7rem] tracking-normal text-white md:text-xs">
                    {t(SUBHEADING)}
                  </p>
                </FadeIn>

                <div className="mt-6">
                  <a
                    href={waLink}
                    data-cursor
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium tracking-normal text-black shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {t(CTA_LABEL)}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              <FadeIn delay={0.3} className="flex justify-center md:justify-end">
                <div className="relative w-full max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jimsestate-laptop-mockup.webp"
                  alt=""
                  className="w-full rounded-lg"
                />

                {/* chip: projects delivered */}
                <div
                  className="absolute -top-4 right-4 z-10 flex items-center gap-1.5 rounded border border-white/30 px-2.5 py-1.5 backdrop-blur-md md:gap-2.5 md:px-4 md:py-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', boxShadow: '0 14px 28px -12px rgba(0,0,0,0.45)' }}
                >
                  <span className="font-display text-base font-bold text-black md:text-2xl">20+</span>
                  <span className="text-[0.6rem] font-medium tracking-wide text-black/70 md:text-xs">
                    {t({ en: 'Projects delivered', sq: 'Projekte të realizuara' })}
                  </span>
                </div>

                {/* chip: years of experience */}
                <div
                  className="absolute -bottom-4 left-4 z-10 flex items-center gap-1.5 rounded border border-white/30 px-2.5 py-1.5 backdrop-blur-md md:gap-2.5 md:px-4 md:py-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', boxShadow: '0 14px 28px -12px rgba(0,0,0,0.45)' }}
                >
                  <span className="font-display text-base font-bold text-black md:text-2xl">3+</span>
                  <span className="text-[0.6rem] font-medium tracking-wide text-black/70 md:text-xs">
                    {t({ en: 'Years of experience', sq: 'Vite përvojë' })}
                  </span>
                </div>
              </div>
            </FadeIn>
            </div>
          </section>
        </div>

        <div className="mt-16 md:mt-20">
          <WorkGallery grid />
        </div>
      </main>

      <Footer theme="light" />
    </div>
  );
}
