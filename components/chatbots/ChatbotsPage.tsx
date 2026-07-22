'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';
import { useT } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import LangToggle from '@/components/ui/LangToggle';
import Logo from '@/components/ui/Logo';

const AssistantOrb = dynamic(() => import('./AssistantOrb'), { ssr: false });
const ChatDemo = dynamic(() => import('./ChatDemo'), { ssr: false });

const MAIL_BASE = 'mailto:hello@avenum.studio?subject=';
const MAIL_SUBJECT = { en: 'AI chatbot for my business', sq: 'AI chatbot për biznesin tim' };

const BACK_LINK = { en: '← Back to the experience', sq: '← Kthehu te eksperienca' };
const COPYRIGHT = {
  en: '© 2026 Avenum — All rights reserved',
  sq: '© 2026 Avenum — Të gjitha të drejtat e rezervuara',
};

const HERO_HEADING = { en: 'Chatbots that never miss a booking.', sq: 'Chatbot që nuk humbasin asnjë rezervim.' };
const HERO_SUB = {
  en: 'We design and train AI assistants for restaurants and gyms — they answer guests, reserve tables and sign up members around the clock, in any language.',
  sq: 'Ne dizajnojmë dhe trajnojmë asistentë AI për restorante dhe palestra — u përgjigjen mysafirëve, rezervojnë tavolina dhe regjistrojnë anëtarë gjatë gjithë kohës, në çdo gjuhë.',
};
const CTA_PRIMARY = { en: 'Get your chatbot', sq: 'Merr chatbot-in tënd' };
const CTA_SECONDARY = { en: 'See it in action', sq: 'Shiko si funksionon' };

const DEMO_EYEBROW = { en: 'The demo', sq: 'Demoja' };
const DEMO_HEADING = { en: 'Talk to one.', sq: 'Bisedo me një.' };
const DEMO_SUB = {
  en: "Tap a message and watch Nova handle it — exactly like it would on your website, WhatsApp or Instagram.",
  sq: 'Prek një mesazh dhe shiko si e trajton Nova — pikërisht si do të bënte në faqen tënde, WhatsApp apo Instagram.',
};

const HOW_EYEBROW = { en: 'How it works', sq: 'Si funksionon' };
const HOW_HEADING = {
  en: 'From message to booked table in seconds.',
  sq: 'Nga mesazhi te tavolina e rezervuar në sekonda.',
};
const STEP_LABEL = { en: 'Step', sq: 'Hapi' };

const BUILD_EYEBROW = { en: 'The process', sq: 'Procesi' };
const BUILD_HEADING = { en: 'How we build it.', sq: 'Si e ndërtojmë.' };
const BUILD_SUB = {
  en: 'A working demo of your own bot within a week, live in your business within a month.',
  sq: 'Një demo funksionale e bot-it tënd brenda një jave, online në biznesin tënd brenda një muaji.',
};

const CTA_HEADING = { en: 'Your front desk, automated.', sq: 'Recepsioni yt, i automatizuar.' };
const CTA_SUB = {
  en: "Tell us about your restaurant or gym — we'll reply with a plan and a working demo of your own assistant.",
  sq: 'Na trego për restorantin apo palestrën tënde — do të përgjigjemi me një plan dhe një demo funksionale të asistentit tënd.',
};
const CTA_FINAL = { en: 'Start your chatbot', sq: 'Nis chatbot-in tënd' };

/* ---- small stroke icons for the 2D "how it works" graphics ---- */

function IconChat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M21 12a8 8 0 0 1-8 8H4l2.4-2.4A8 8 0 1 1 21 12Z" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="13.5" x2="13" y2="13.5" />
    </svg>
  );
}

function IconBrain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" />
      <path d="M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19" />
    </svg>
  );
}

function IconPlug({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="3" y="5" width="18" height="15" rx="2.5" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="2.5" x2="8" y2="5" />
      <line x1="16" y1="2.5" x2="16" y2="5" />
      <path d="m11 13.5 2.5 2L11 17.5" />
    </svg>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
    </svg>
  );
}

const HOW_IT_WORKS = [
  {
    icon: IconChat,
    title: { en: 'Guests write like they always do', sq: 'Mysafirët shkruajnë si gjithmonë' },
    desc: {
      en: 'On your website widget, WhatsApp, Instagram DMs or Messenger — no app to install.',
      sq: 'Në widget-in e faqes tënde, WhatsApp, mesazhet e Instagramit apo Messenger — pa nevojë për instalim aplikacioni.',
    },
  },
  {
    icon: IconBrain,
    title: { en: 'The AI understands intent', sq: 'AI kupton qëllimin' },
    desc: {
      en: 'Trained on your menu, class schedule, prices, policies and tone of voice.',
      sq: 'I trajnuar me menunë tënde, orarin e klasave, çmimet, rregullat dhe tonin e zërit.',
    },
  },
  {
    icon: IconPlug,
    title: { en: 'It connects to your tools', sq: 'Lidhet me mjetet e tua' },
    desc: {
      en: 'Reservation systems, class calendars, CRMs and payments — wired in securely.',
      sq: 'Sisteme rezervimesh, kalendarë klasash, CRM dhe pagesa — të lidhura në mënyrë të sigurt.',
    },
  },
  {
    icon: IconBolt,
    title: { en: 'It answers & takes action', sq: 'Përgjigjet & vepron' },
    desc: {
      en: 'Replies in seconds, books the table or the trial, upsells — and hands tricky cases to a human.',
      sq: 'Përgjigjet në sekonda, rezervon tavolinën apo seancën provë, ofron shtesa — dhe ia kalon rastet e vështira një njeriu.',
    },
  },
];

const BUILD_STEPS = [
  {
    phase: '01',
    title: { en: 'We map your front desk', sq: 'Hartëzojmë recepsionin tënd' },
    desc: {
      en: 'One workshop: your most common questions, booking flows, edge cases and the systems you already use.',
      sq: 'Një workshop i vetëm: pyetjet më të zakonshme, rrjedhat e rezervimit, rastet ekstreme dhe sistemet që përdor tashmë.',
    },
  },
  {
    phase: '02',
    title: { en: 'The bot learns your business', sq: 'Bot-i mëson biznesin tënd' },
    desc: {
      en: 'Menu, schedules, prices, house rules and brand voice go in. It answers like your best employee — not a generic robot.',
      sq: 'Menuja, oraret, çmimet, rregullat e shtëpisë dhe zëri i markës futen brenda. Përgjigjet si punonjësi yt më i mirë — jo si një robot gjenerik.',
    },
  },
  {
    phase: '03',
    title: { en: 'Wired into your tools', sq: 'I lidhur me mjetet e tua' },
    desc: {
      en: 'Reservations, class calendars, CRM, payments. Every action the bot takes lands in the systems you already trust.',
      sq: 'Rezervime, kalendarë klasash, CRM, pagesa. Çdo veprim i bot-it përfundon në sistemet që tashmë u beson.',
    },
  },
  {
    phase: '04',
    title: { en: 'Live in weeks, sharper every week', sq: 'Online brenda javësh, më i mprehtë çdo javë' },
    desc: {
      en: 'We monitor real conversations, patch gaps and expand what it can do. You get a monthly report in plain language.',
      sq: 'Ndjekim bisedat reale, mbyllim boshllëqet dhe zgjerojmë aftësitë e tij. Merr një raport mujor në gjuhë të thjeshtë.',
    },
  },
];

const STATS: Array<[string, { en: string; sq: string }]> = [
  ['<10s', { en: 'Median reply time', sq: 'Koha mesatare e përgjigjes' }],
  ['24/7', { en: 'Never off shift', sq: 'Kurrë jashtë orarit' }],
  ['30+', { en: 'Languages spoken', sq: 'Gjuhë të folura' }],
];

// Background gradient's purple family — change BG_ACCENT to retint the whole page.
// Same family as the Pricing page's background, darkened a notch.
const BG_ACCENT = '#22124D';
const BG_ACCENT_MID = '#160C31';
const BG_ACCENT_DEEP = '#100826';
const BG_GLOW = 'rgba(112, 88, 204, 0.28)';

const STARS: Array<{ top: string; left: string; size: number; delay: string }> = [
  { top: '12%', left: '8%', size: 2, delay: '0s' },
  { top: '22%', left: '85%', size: 3, delay: '0.6s' },
  { top: '35%', left: '72%', size: 2, delay: '1.2s' },
  { top: '48%', left: '12%', size: 2, delay: '0.9s' },
  { top: '62%', left: '92%', size: 2, delay: '0.3s' },
  { top: '75%', left: '20%', size: 3, delay: '1.5s' },
  { top: '85%', left: '65%', size: 2, delay: '0.7s' },
  { top: '8%', left: '45%', size: 2, delay: '1.1s' },
];

export default function ChatbotsPage() {
  const buildSectionRef = useRef<HTMLElement>(null);
  const buildLineRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const mailto = `${MAIL_BASE}${encodeURIComponent(t(MAIL_SUBJECT))}`;

  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

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

  // The build-steps line draws itself in as the timeline scrolls into view.
  useLayoutEffect(() => {
    const section = buildSectionRef.current;
    const line = buildLineRef.current;
    if (!section || !line || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.5,
          },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <div className="isolate min-h-screen overflow-x-clip bg-black text-[#f2f4ff]">
      {/* deep-purple base, diagonal light stripes and a soft center glow */}
      <div ref={bgRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
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
            className="svc-pulse absolute rounded-full bg-white/60"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
          />
        ))}
      </div>

      {/* minimal header — this page lives outside the main 3D experience */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Logo className="text-3xl md:text-4xl" />
        <div className="flex items-center gap-4">
          <Link
            href="/"
            data-cursor
            className="text-xs text-white/60 transition-colors duration-300 hover:text-white"
          >
            {t(BACK_LINK)}
          </Link>
          <LangToggle />
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="relative flex h-dvh items-start overflow-hidden pt-[6.5rem] md:h-auto md:min-h-dvh md:items-center md:pt-28">
          <AssistantOrb />
          <div className="relative mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <div className="max-w-2xl">
              <SplitText
                as="h1"
                delay={0.2}
                className="text-shadow-soft font-display text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[0.98]"
              >
                {t(HERO_HEADING)}
              </SplitText>
              <SplitText
                as="p"
                type="words"
                delay={0.5}
                className="subtext text-shadow-soft mt-6 max-w-xl text-sm font-light md:text-lg"
              >
                {t(HERO_SUB)}
              </SplitText>

              <FadeIn delay={0.7} className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={mailto}
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
              </FadeIn>
            </div>
          </div>
        </section>

        {/* interactive demo */}
        <section id="demo" className="relative py-24 md:py-36">
          <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <FadeIn className="mb-20 flex justify-center gap-10 md:mb-28 md:gap-14">
              {STATS.map(([value, label]) => (
                <div key={value} className="text-center">
                  <p className="font-display text-2xl font-semibold text-white md:text-4xl">
                    {value}
                  </p>
                  <p className="subtext mt-1 text-xs tracking-normal">{t(label)}</p>
                </div>
              ))}
            </FadeIn>

            <div className="mb-12 text-center md:mb-16">
              <FadeIn>
                <p className="mb-4 text-xs tracking-normal text-[#ff3d6e]">{t(DEMO_EYEBROW)}</p>
              </FadeIn>
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
              <FadeIn>
                <p className="mb-4 text-xs tracking-normal text-[#ff3d6e]">{t(HOW_EYEBROW)}</p>
              </FadeIn>
              <SplitText
                as="h2"
                className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.98]"
              >
                {t(HOW_HEADING)}
              </SplitText>
            </div>

            <div className="relative grid gap-10 md:grid-cols-4 md:gap-8">
              {HOW_IT_WORKS.map((step, i) => (
                <FadeIn key={i} delay={i * 0.12} className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-[#07070c] text-[#ff3d6e]">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <p className="mb-2 text-xs text-white/40">{t(STEP_LABEL)} {i + 1}</p>
                  <h3 className="font-display text-lg font-semibold md:text-xl">{t(step.title)}</h3>
                  <p className="subtext mt-2 text-sm leading-relaxed">{t(step.desc)}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* how we build it */}
        <section ref={buildSectionRef} className="relative py-24 md:py-36">
          <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
              <div>
                <FadeIn>
                  <p className="mb-4 text-xs tracking-normal text-[#ff3d6e]">{t(BUILD_EYEBROW)}</p>
                </FadeIn>
                <SplitText
                  as="h2"
                  className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.98]"
                >
                  {t(BUILD_HEADING)}
                </SplitText>
                <FadeIn delay={0.15}>
                  <p className="subtext mt-4 max-w-sm text-sm md:text-base">
                    {t(BUILD_SUB)}
                  </p>
                </FadeIn>
              </div>

              <div className="relative">
                <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-white/10" />
                <div
                  ref={buildLineRef}
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px origin-top bg-[#ff3d6e]"
                  style={{ transform: 'scaleY(0)' }}
                />
                <ol className="space-y-12 pl-8">
                  {BUILD_STEPS.map((step, i) => (
                    <FadeIn key={step.phase} delay={i * 0.1}>
                      <li className="relative">
                        <span
                          aria-hidden
                          className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#ff3d6e]"
                        />
                        <p className="text-xs tracking-normal text-[#ff3d6e]">{step.phase}</p>
                        <h3 className="mt-2 font-display text-xl font-semibold md:text-2xl">
                          {t(step.title)}
                        </h3>
                        <p className="subtext mt-2 max-w-lg text-sm leading-relaxed">{t(step.desc)}</p>
                      </li>
                    </FadeIn>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 md:py-44">
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
                href={mailto}
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

      <footer className="border-t border-white/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-3 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>{t(COPYRIGHT)}</p>
          <Link href="/" data-cursor className="w-fit text-white/50 transition-colors duration-300 hover:text-white">
            avenum.studio
          </Link>
        </div>
      </footer>

      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay"
      />
    </div>
  );
}
