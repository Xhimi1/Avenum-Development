'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ScrollRevealText from '@/components/ui/ScrollRevealText';
import ArrowRight from '@/components/ui/ArrowRight';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

const ChatDemo = dynamic(() => import('./ChatDemo'), { ssr: false });


const HERO_HEADING = { en: 'A chatbot that never misses a table.', sq: 'Një chatbot që nuk humbet asnjë rezervim.' };
const HERO_SUB = {
  en: 'We build AI assistants for restaurants — they answer guests and reserve tables around the clock, in any language.',
  sq: 'Ne ndërtojmë asistentë AI për restorante — u përgjigjen mysafirëve dhe rezervojnë tavolina gjatë gjithë kohës, në çdo gjuhë.',
};
const CTA_PRIMARY = { en: 'Get your chatbot', sq: 'Merr chatbot-in tënd' };

const HOW_HEADING = {
  en: 'From message to booked table in seconds.',
  sq: 'Nga mesazhi te tavolina e rezervuar në sekonda.',
};

const CHATBOT_TEXT = {
  en: 'AI is changing how small businesses handle bookings and support. We build chatbots that answer guests and take bookings for you — so you spend less time on the phone and more time running your business.',
  sq: 'AI po ndryshon mënyrën si bizneset e vogla trajtojnë rezervimet dhe mbështetjen. Ne ndërtojmë chatbot që u përgjigjen mysafirëve dhe marrin rezervime për ty — që të kalosh më pak kohë në telefon dhe më shumë kohë duke drejtuar biznesin tënd.',
};

const CTA_HEADING = { en: 'Your front desk, automated.', sq: 'Recepsioni yt, i automatizuar.' };
const CTA_SUB = {
  en: "Tell us about your restaurant — we'll reply with a plan and a working demo of your own assistant.",
  sq: 'Na trego për restorantin tënd — do të përgjigjemi me një plan dhe një demo funksionale të asistentit tënd.',
};
const CTA_FINAL = { en: 'Start your chatbot', sq: 'Nis chatbot-in tënd' };

const HOW_IT_WORKS = [
  {
    title: { en: 'Guests write like they always do', sq: 'Mysafirët shkruajnë si gjithmonë' },
    desc: {
      en: 'On your website widget, WhatsApp, Instagram DMs or Messenger — no app to install.',
      sq: 'Në widget-in e faqes tënde, WhatsApp, mesazhet e Instagramit apo Messenger — pa nevojë për instalim aplikacioni.',
    },
  },
  {
    title: { en: 'The AI understands what they need', sq: 'AI kupton çfarë duan' },
    desc: {
      en: 'It learns your menu, hours, prices, and how you talk to customers.',
      sq: 'Mëson menunë tënde, orarin, çmimet, dhe si u flet klientëve.',
    },
  },
  {
    title: { en: 'It connects to your booking system', sq: 'Lidhet me sistemin tënd të rezervimeve' },
    desc: {
      en: 'Your reservations, customer list and payments — all connected safely.',
      sq: 'Rezervimet, lista e klientëve dhe pagesat — të gjitha të lidhura në mënyrë të sigurt.',
    },
  },
  {
    title: { en: 'It answers & takes action', sq: 'Përgjigjet & vepron' },
    desc: {
      en: 'Replies in seconds, books the table, upsells — and hands tricky cases to a human.',
      sq: 'Përgjigjet në sekonda, rezervon tavolinën, ofron shtesa — dhe ia kalon rastet e vështira një njeriu.',
    },
  },
];

export default function ChatbotsPage() {
  const t = useT();
  const waLink = whatsappHref(WA_MESSAGE);

  // Web fonts finishing late can reflow the hero (heading/button included)
  // after ScrollTrigger already measured it, leaving above-the-fold reveals
  // stuck at opacity 0 until the next scroll forces a recalculation. Refresh
  // once fonts settle so they show immediately on load instead.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  }, []);

  return (
    <div className="isolate min-h-screen overflow-x-clip bg-white text-[#061E29]">
      <Nav />

      <main>
        {/* hero — pitch on the left, the live demo standing in for the old
            3D orb on the right; stacks with the demo below on mobile. */}
        <section className="relative overflow-hidden pt-32 md:pt-28">
          <div className="relative mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <div className="grid items-center justify-items-center gap-12 text-center">
              <div className="flex flex-col items-center">
                <SplitText
                  as="h1"
                  delay={0.2}
                  animate
                  className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[0.98]"
                >
                  {t(HERO_HEADING)}
                </SplitText>
                <SplitText
                  as="p"
                  type="words"
                  delay={0.5}
                  className="mx-auto mt-6 max-w-xl text-sm font-normal text-black md:text-lg"
                >
                  {t(HERO_SUB)}
                </SplitText>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={waLink}
                    data-cursor
                    className="inline-flex items-center gap-0.5 rounded-full bg-[#6367FF] px-6 py-2.5 font-display text-base font-medium tracking-normal text-white transition-colors duration-300 hover:bg-[#4f52e0]"
                  >
                    {t(CTA_PRIMARY)}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <FadeIn delay={0.3}>
                <ChatDemo />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* how it works — 2D flow */}
        <section className="relative py-24 md:py-36">
          <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <div className="mb-12 md:mb-20">
              <SplitText
                as="h2"
                className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.98]"
              >
                {t(HOW_HEADING)}
              </SplitText>
            </div>

            <div className="relative grid grid-cols-1 border border-black/10 md:grid-cols-4">
              {HOW_IT_WORKS.map((step, i) => (
                <FadeIn
                  key={i}
                  delay={i * 0.12}
                  className={cn(
                    'relative bg-[#F3F4F4] p-8',
                    i < HOW_IT_WORKS.length - 1 && 'border-b border-black/10 md:border-b-0 md:border-r'
                  )}
                >
                  <p className="mb-2 font-display text-lg font-semibold text-[#6367FF]">
                    ({String(i + 1).padStart(2, '0')})
                  </p>
                  <h3 className="font-display text-xl font-semibold text-black md:text-2xl">{t(step.title)}</h3>
                  <p className="mt-4 text-base leading-relaxed text-black/60">{t(step.desc)}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* chatbot manifesto — scroll-linked reveal statement */}
        <section className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-4xl">
            <ScrollRevealText
              as="p"
              className="font-display text-3xl font-medium leading-tight text-black md:text-4xl md:leading-tight"
            >
              {t(CHATBOT_TEXT)}
            </ScrollRevealText>
          </div>
        </section>

        {/* CTA — identical to the homepage's Contact banner */}
        <section className="relative min-h-[65vh] md:min-h-[80vh]">
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
                  className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.95] text-white md:text-[clamp(2.4rem,4vw,3.8rem)]"
                >
                  {t(CTA_HEADING)}
                </SplitText>

                <FadeIn delay={0.15}>
                  <p className="subtext mx-auto mt-5 max-w-xl text-base leading-relaxed">{t(CTA_SUB)}</p>
                </FadeIn>

                <FadeIn delay={0.3} className="mt-12 flex justify-center">
                  <a
                    href={waLink}
                    data-cursor
                    className="pointer-events-auto inline-flex items-center gap-0.5 rounded-full bg-white px-6 py-2.5 font-display text-base font-medium tracking-normal text-[#6367FF] transition-colors duration-300 hover:bg-gray-100"
                  >
                    {t(CTA_FINAL)}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay"
      />
    </div>
  );
}
