'use client';

import dynamic from 'next/dynamic';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';
import { useT } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ScrollRevealText from '@/components/ui/ScrollRevealText';
import ArrowRight from '@/components/ui/ArrowRight';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import { whatsappHref } from '@/lib/contact';

const AssistantOrb = dynamic(() => import('./AssistantOrb'), { ssr: false });
const ChatDemo = dynamic(() => import('./ChatDemo'), { ssr: false });

const MAIL_SUBJECT = { en: 'AI chatbot for my restaurant', sq: 'AI chatbot për restorantin tim' };


const HERO_HEADING = { en: 'A chatbot that never misses a table.', sq: 'Një chatbot që nuk humbet asnjë rezervim.' };
const HERO_SUB = {
  en: 'We build AI assistants for restaurants — they answer guests and reserve tables around the clock, in any language.',
  sq: 'Ne ndërtojmë asistentë AI për restorante — u përgjigjen mysafirëve dhe rezervojnë tavolina gjatë gjithë kohës, në çdo gjuhë.',
};
const CTA_PRIMARY = { en: 'Get your chatbot', sq: 'Merr chatbot-in tënd' };
const CTA_SECONDARY = { en: 'See it in action', sq: 'Shiko si funksionon' };

const DEMO_HEADING = { en: 'Talk to one.', sq: 'Bisedo me një.' };
const DEMO_SUB = {
  en: "Tap a message and watch Nova handle it — exactly like it would on your website, WhatsApp or Instagram.",
  sq: 'Prek një mesazh dhe shiko si e trajton Nova — pikërisht si do të bënte në faqen tënde, WhatsApp apo Instagram.',
};

const HOW_HEADING = {
  en: 'From message to booked table in seconds.',
  sq: 'Nga mesazhi te tavolina e rezervuar në sekonda.',
};

const CHATBOT_TEXT = {
  en: 'AI is changing how businesses operate. We build chatbots that automate bookings, answers and support — so your business runs on modern technology, not manual work.',
  sq: 'AI po ndryshon mënyrën si funksionojnë bizneset. Ne ndërtojmë chatbot që automatizojnë rezervimet, përgjigjet dhe mbështetjen — që biznesi yt të funksionojë me teknologji moderne, jo me punë manuale.',
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
    title: { en: 'The AI understands intent', sq: 'AI kupton qëllimin' },
    desc: {
      en: 'Trained on your menu, hours, prices, policies and tone of voice.',
      sq: 'I trajnuar me menunë tënde, orarin, çmimet, rregullat dhe tonin e zërit.',
    },
  },
  {
    title: { en: 'It connects to your tools', sq: 'Lidhet me mjetet e tua' },
    desc: {
      en: 'Reservation systems, CRMs and payments — wired in securely.',
      sq: 'Sisteme rezervimesh, CRM dhe pagesa — të lidhura në mënyrë të sigurt.',
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

// Background gradient's purple family — change BG_ACCENT to retint the whole page.
// Same family as the Pricing page's background, darkened a notch.
const BG_ACCENT = '#22124D';
const BG_ACCENT_MID = '#160C31';
const BG_ACCENT_DEEP = '#0F0824';
const BG_GLOW = 'rgba(112, 88, 204, 0.28)';

const STARS: Array<{ top: string; left: string; size: number; delay: string; bright?: boolean }> = [
  { top: '12%', left: '8%', size: 2, delay: '0s' },
  { top: '22%', left: '85%', size: 3, delay: '0.6s', bright: true },
  { top: '35%', left: '72%', size: 2, delay: '1.2s' },
  { top: '48%', left: '12%', size: 2, delay: '0.9s' },
  { top: '62%', left: '92%', size: 2, delay: '0.3s' },
  { top: '75%', left: '20%', size: 3, delay: '1.5s', bright: true },
  { top: '85%', left: '65%', size: 2, delay: '0.7s' },
  { top: '8%', left: '45%', size: 2, delay: '1.1s' },
  { top: '5%', left: '65%', size: 2, delay: '0.4s' },
  { top: '15%', left: '28%', size: 3, delay: '1.7s' },
  { top: '28%', left: '5%', size: 2, delay: '0.2s' },
  { top: '30%', left: '95%', size: 2, delay: '1.4s' },
  { top: '40%', left: '38%', size: 2, delay: '0.8s' },
  { top: '42%', left: '58%', size: 3, delay: '1.9s' },
  { top: '55%', left: '25%', size: 2, delay: '0.5s' },
  { top: '68%', left: '48%', size: 3, delay: '0.1s', bright: true },
  { top: '80%', left: '88%', size: 2, delay: '0.9s' },
  { top: '90%', left: '35%', size: 2, delay: '1.3s' },
  { top: '92%', left: '55%', size: 3, delay: '0.6s' },
  { top: '18%', left: '55%', size: 2, delay: '1.1s' },
  { top: '3%', left: '18%', size: 2, delay: '1.8s' },
  { top: '25%', left: '38%', size: 4, delay: '0.9s', bright: true },
  { top: '32%', left: '20%', size: 2, delay: '1.3s' },
  { top: '45%', left: '65%', size: 4, delay: '0.4s', bright: true },
  { top: '50%', left: '5%', size: 2, delay: '1.0s' },
  { top: '60%', left: '58%', size: 2, delay: '0.6s' },
  { top: '65%', left: '15%', size: 4, delay: '1.9s', bright: true },
  { top: '78%', left: '42%', size: 2, delay: '0.3s' },
  { top: '88%', left: '12%', size: 2, delay: '1.1s' },
  { top: '95%', left: '68%', size: 2, delay: '0.5s' },
];

/** Corner markers for a bordered box — same border color as the box, filled
 *  with the page background so they read as a notch, not a highlight. */
function CornerSquares() {
  return (
    <>
      <span aria-hidden className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 border border-white/10 bg-[#0F0824]" />
      <span aria-hidden className="absolute right-0 top-0 h-3 w-3 translate-x-1/2 -translate-y-1/2 border border-white/10 bg-[#0F0824]" />
      <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 -translate-x-1/2 translate-y-1/2 border border-white/10 bg-[#0F0824]" />
      <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 translate-x-1/2 translate-y-1/2 border border-white/10 bg-[#0F0824]" />
    </>
  );
}

export default function ChatbotsPage() {
  const bgRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const waLink = whatsappHref(t(MAIL_SUBJECT));

  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Web fonts finishing late can reflow the hero (heading/button included)
  // after ScrollTrigger already measured it, leaving above-the-fold reveals
  // stuck at opacity 0 until the next scroll forces a recalculation. Refresh
  // once fonts settle so they show immediately on load instead.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  }, []);

  // On load the heading/subheading reveal first (SplitText/FadeIn), then the
  // decorative background — gradient, light stripes, glow — fades in over the
  // flat base color a beat later.
  useLayoutEffect(() => {
    const bg = bgRef.current;
    if (!bg || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { opacity: 0 },
        { opacity: 1, duration: 2.6, ease: 'power2.out', delay: 0.7 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="isolate min-h-screen overflow-x-clip bg-[#0F0824] text-[#f2f4ff]">
      <Nav />

      <main>
        {/* hero */}
        <section className="relative flex min-h-dvh items-start overflow-hidden pt-[6.5rem] md:h-auto md:items-center md:pt-28">
          {/* deep-purple base, diagonal light stripes and a soft center glow —
              scoped to the hero only; the rest of the page is plain black.
              A black fade at the bottom blends the two smoothly. */}
          <div ref={bgRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {/* base purple gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, ${BG_ACCENT} 0%, ${BG_ACCENT_MID} 45%, ${BG_ACCENT_DEEP} 100%)`,
              }}
            />
            {/* diagonal white light stripes */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'repeating-linear-gradient(125deg, transparent 0px, transparent 130px, rgba(255,255,255,0.04) 175px, rgba(255,255,255,0.10) 210px, rgba(255,255,255,0.04) 245px, transparent 300px, transparent 430px)',
              }}
            />
            {/* soft radial glow toward the top */}
            <div
              className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${BG_GLOW}, transparent 70%)` }}
            />
            {STARS.map((s, i) => (
              <span
                key={i}
                className={cn('svc-pulse absolute rounded-full', s.bright ? 'bg-white' : 'bg-white/60')}
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  animationDelay: s.delay,
                  boxShadow: s.bright ? '0 0 8px 2px rgba(255,255,255,0.8)' : undefined,
                }}
              />
            ))}
            {/* fade into the black body below */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#0F0824]" />
          </div>

          <AssistantOrb />
          <div className="relative mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <div className="max-w-2xl">
              <SplitText
                as="h1"
                delay={0.2}
                animate
                className="text-shadow-soft font-display text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[0.98]"
              >
                {t(HERO_HEADING)}
              </SplitText>
              <SplitText
                as="p"
                type="words"
                delay={0.5}
                className="subtext text-shadow-soft mt-6 max-w-xl text-sm font-normal md:text-lg"
              >
                {t(HERO_SUB)}
              </SplitText>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={waLink}
                  data-cursor
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-medium tracking-normal text-black"
                >
                  {t(CTA_PRIMARY)}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#demo"
                  data-cursor
                  onClick={scrollToDemo}
                  className="hidden rounded-full border border-white/25 px-8 py-4 text-xs font-medium tracking-normal transition-colors duration-300 hover:border-[#ff3d6e] hover:text-[#ff3d6e] md:inline-block"
                >
                  {t(CTA_SECONDARY)}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* interactive demo */}
        <section id="demo" className="relative py-24 md:py-36">
          <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <div className="mb-12 text-center md:mb-16">
              <SplitText
                as="h2"
                className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.98]"
              >
                {t(DEMO_HEADING)}
              </SplitText>
              <FadeIn delay={0.15}>
                <p className="subtext mx-auto mt-4 max-w-md text-sm md:text-base">
                  {t(DEMO_SUB)}
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <ChatDemo />
            </FadeIn>
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

            <div className="relative grid grid-cols-1 border border-white/10 md:grid-cols-4">
              <CornerSquares />
              {HOW_IT_WORKS.map((step, i) => (
                <FadeIn
                  key={i}
                  delay={i * 0.12}
                  className={cn(
                    'relative p-8',
                    i < HOW_IT_WORKS.length - 1 && 'border-b border-white/10 md:border-b-0 md:border-r'
                  )}
                >
                  <CornerSquares />
                  <p className="mb-2 font-display text-lg font-semibold text-white">
                    ({String(i + 1).padStart(2, '0')})
                  </p>
                  <h3 className="font-display text-xl font-semibold md:text-2xl">{t(step.title)}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/70">{t(step.desc)}</p>
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
              className="font-display text-3xl font-medium leading-tight text-white md:text-4xl md:leading-tight"
            >
              {t(CHATBOT_TEXT)}
            </ScrollRevealText>
          </div>
        </section>

        {/* CTA — same purple radial wash as the About/Pricing pages' closing banner */}
        <section
          className="relative py-28 md:py-44"
          style={{
            backgroundImage:
              'radial-gradient(140% 90% at 50% 100%, color-mix(in srgb, #6367FF 78%, transparent) 0%, transparent 75%)',
          }}
        >
          <div className="mx-auto w-full max-w-[90rem] px-6 text-center md:px-12">
            <SplitText
              as="h2"
              className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.98]"
            >
              {t(CTA_HEADING)}
            </SplitText>
            <FadeIn delay={0.15}>
              <p className="subtext mx-auto mt-5 max-w-md text-sm md:text-base">
                {t(CTA_SUB)}
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="mt-10">
              <a
                href={waLink}
                data-cursor
                className="inline-flex items-center gap-3 rounded-full bg-white px-12 py-6 text-base font-medium tracking-normal text-black"
              >
                {t(CTA_FINAL)}
                <ArrowRight className="h-5 w-5" />
              </a>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer theme="dark" bgClassName="bg-[#0F0824]" />

      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay"
      />
    </div>
  );
}
