'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';
import { useT, type Bi } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import { whatsappHref } from '@/lib/contact';

/* ---- copy ---- */

const EYEBROW: Bi = { en: 'About', sq: 'Rreth Nesh' };

const HEADING: Bi = {
  en: 'A small studio, big on results.',
  sq: 'Një studio e vogël, me rezultate të mëdha.',
};

const SUBHEADING: Bi = {
  en: 'Custom design, fast builds and real support — for businesses ready to grow.',
  sq: 'Dizajn i personalizuar, ndërtim i shpejtë dhe mbështetje reale — për biznese gati të rriten.',
};

const HERO_CTA: Bi = { en: 'See our work', sq: 'Shiko punën' };

const STATS: Array<[string, Bi]> = [
  ['3+', { en: 'Years of experience', sq: 'Vite përvojë' }],
  ['20+', { en: 'Projects delivered', sq: 'Projekte të realizuara' }],
  ['100%', { en: 'Client satisfaction', sq: 'Klientë të kënaqur' }],
  ['2', { en: 'Languages, always', sq: 'Gjuhë, gjithmonë' }],
];

const MANIFESTO: Bi = {
  en: 'Good design. Fast websites. Real results.',
  sq: 'Dizajn i mirë. Faqe të shpejta. Rezultate reale.',
};

const MISSION_EYEBROW: Bi = { en: 'Who we are', sq: 'Kush jemi ne' };

const MISSION_BODY: Bi = {
  en: "We're a small team based in Tirana, building for restaurants, gyms and small businesses across Albania.",
  sq: 'Jemi një ekip i vogël me bazë në Tiranë, që ndërton për restorante, palestra dhe biznese të vogla në të gjithë Shqipërinë.',
};

const MISSION_QUOTE: Bi = {
  en: 'One team, start to finish.',
  sq: 'Një ekip, nga fillimi në fund.',
};

const MISSION_SUBQUOTE: Bi = {
  en: 'Design, build and support — all in one place.',
  sq: 'Dizajn, ndërtim dhe mbështetje — në një vend të vetëm.',
};

const VALUES_EYEBROW: Bi = { en: 'How we work', sq: 'Si punojmë' };
const VALUES_HEADING: Bi = {
  en: 'What you can expect.',
  sq: 'Çfarë të presësh.',
};

interface Value {
  icon: (p: { className?: string }) => JSX.Element;
  title: Bi;
  body: Bi;
}

function IconSpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z" />
    </svg>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.5 4 5.7 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.7-4-9s1.4-6.5 4-9Z" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8 1.7 4.5 5 3.6c2-.5 4 .3 5.2 2 .3.4.9.4 1.2 0 1.2-1.7 3.2-2.5 5.2-2 3.3.9 4.6 4.4 3 7.6-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  );
}

const VALUES: Value[] = [
  {
    icon: IconSpark,
    title: { en: 'Custom, not templates', sq: 'Personalizuar, jo shabllon' },
    body: {
      en: 'No templates. Every site is designed just for you.',
      sq: 'Pa shabllone. Çdo faqe dizajnohet posaçërisht për ty.',
    },
  },
  {
    icon: IconBolt,
    title: { en: 'Fast, on every phone', sq: 'E shpejtë, në çdo telefon' },
    body: {
      en: 'Fast on every device, especially mobile.',
      sq: 'E shpejtë në çdo pajisje, sidomos në celular.',
    },
  },
  {
    icon: IconGlobe,
    title: { en: 'Bilingual by default', sq: 'Dygjuhëshe si standard' },
    body: {
      en: 'Every site works in Albanian and English.',
      sq: 'Çdo faqe funksionon në shqip dhe anglisht.',
    },
  },
  {
    icon: IconHeart,
    title: { en: 'Honest pricing', sq: 'Çmime të sinqerta' },
    body: {
      en: 'Clear prices. No hidden costs.',
      sq: 'Çmime të qarta. Pa kosto të fshehura.',
    },
  },
];

const CTA_HEADING: Bi = { en: "Let's build something together.", sq: 'Le të ndërtojmë diçka bashkë.' };
const CTA_BODY: Bi = {
  en: "Tell us about your business — we'll get back to you fast.",
  sq: 'Na trego për biznesin tënd — do të të përgjigjemi shpejt.',
};
const CTA_LABEL: Bi = { en: 'Start your project', sq: 'Nis projektin tënd' };
const CTA_WA_MESSAGE: Bi = { en: "Hi! I'd like to know more about Avenum.", sq: 'Përshëndetje! Do të doja të mësoja më shumë rreth Avenum.' };

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
  { top: '58%', left: '78%', size: 2, delay: '1.0s' },
  { top: '68%', left: '48%', size: 3, delay: '0.1s', bright: true },
  { top: '72%', left: '5%', size: 2, delay: '1.6s' },
  { top: '80%', left: '88%', size: 2, delay: '0.9s' },
  { top: '90%', left: '35%', size: 2, delay: '1.3s' },
];

/** Mechanical-odometer digit reveal, same as the homepage About section —
 * each digit is a 0–9 reel that spins to land on its value. */
function OdometerValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reels = el.querySelectorAll<HTMLElement>('[data-reel]');

    if (prefersReducedMotion()) {
      reels.forEach((reel) => {
        gsap.set(reel, { yPercent: -Number(reel.dataset.digit) * 10 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      reels.forEach((reel, i) => {
        gsap.fromTo(
          reel,
          { yPercent: 0 },
          {
            yPercent: -Number(reel.dataset.digit) * 10,
            duration: 1.1,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref} className="inline-flex">
      {value.split('').map((char, i) =>
        /[0-9]/.test(char) ? (
          <span key={i} className="inline-block h-[1em] overflow-hidden align-top leading-[1em]">
            <span data-reel data-digit={char} className="block">
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d} className="block h-[1em] leading-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i}>{char}</span>
        )
      )}
    </span>
  );
}

export default function AboutPage() {
  const t = useT();
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bg = bgRef.current;
    if (!bg || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 2.6, ease: 'power2.out', delay: 0.7 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="isolate min-h-screen overflow-x-clip bg-black text-[#f2f4ff]">
      <Nav />

      <main>
        {/* deep-teal hero + stats backdrop, same treatment as Pricing's hero */}
        <div className="relative">
          <div ref={bgRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, #2d5f59 0%, #17433F 45%, #0d2622 100%)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'repeating-linear-gradient(125deg, transparent 0px, transparent 130px, rgba(255,255,255,0.04) 175px, rgba(255,255,255,0.10) 210px, rgba(255,255,255,0.04) 245px, transparent 300px, transparent 430px)',
              }}
            />
            <div
              className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(60,181,158,0.28), transparent 70%)' }}
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
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black" />
          </div>

          {/* hero */}
          <section className="relative px-6 pt-24 text-center md:px-12 md:pt-28">
            <div className="mx-auto max-w-3xl">
              <FadeIn className="mb-5 flex justify-center">
                <span
                  className="rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
                  style={{ backgroundColor: 'rgba(255,255,255,0.14)', color: '#ffffff' }}
                >
                  {t(EYEBROW)}
                </span>
              </FadeIn>
              <SplitText
                as="h1"
                delay={0.15}
                animate
                className="font-display text-[clamp(2rem,5.5vw,3.8rem)] font-semibold leading-[1.05]"
              >
                {t(HEADING)}
              </SplitText>
              <FadeIn delay={0.4}>
                <p className="subtext mx-auto mt-6 max-w-xl text-sm font-normal md:text-base">
                  {t(SUBHEADING)}
                </p>
              </FadeIn>
              <FadeIn delay={0.55} className="mt-8 flex justify-center">
                <a
                  href="/portfolio"
                  data-cursor
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium tracking-normal text-black shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {t(HERO_CTA)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </FadeIn>
            </div>
          </section>

          {/* stats — same odometer counters as the homepage About section */}
          <section className="relative px-6 py-16 md:px-12 md:py-24">
            <div className="mx-auto w-full max-w-5xl">
              <div className="glass-soft rounded-3xl p-6 md:p-10">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                  {STATS.map(([value, label], i) => (
                    <FadeIn key={value} delay={i * 0.08}>
                      <p className="font-display text-4xl font-semibold text-white md:text-5xl">
                        <OdometerValue value={value} />
                      </p>
                      <p className="subtext mt-2 text-xs tracking-normal">{t(label)}</p>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* mission — manifesto + real project photography */}
        <section className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <FadeIn className="mb-4 flex">
                <span
                  className="rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
                  style={{ backgroundColor: 'rgba(255,255,255,0.14)', color: '#ffffff' }}
                >
                  {t(MISSION_EYEBROW)}
                </span>
              </FadeIn>
              <SplitText
                as="h2"
                className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.1]"
              >
                {t(MANIFESTO)}
              </SplitText>
              <FadeIn delay={0.15}>
                <p className="subtext mt-5 max-w-md text-sm leading-relaxed md:text-base">{t(MISSION_BODY)}</p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-6 border-l-2 border-[#8b5cf6]/50 pl-4">
                  <p className="text-sm font-medium text-white">{t(MISSION_QUOTE)}</p>
                  <p className="subtext mt-1 text-xs">{t(MISSION_SUBQUOTE)}</p>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl" style={{ boxShadow: '0 30px 70px -30px rgba(0,0,0,0.6)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/kroni-restaurant-hero.webp" alt="" className="w-full" />
                </div>
                <div
                  className="absolute -bottom-6 -left-6 hidden w-40 overflow-hidden rounded-xl border-4 border-black md:block"
                  style={{ boxShadow: '0 20px 40px -18px rgba(0,0,0,0.65)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/riva-restaurant-hero.webp" alt="" className="w-full" />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* values */}
        <section className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-10 max-w-2xl md:mb-14">
              <FadeIn className="mb-4 flex">
                <span
                  className="rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
                  style={{ backgroundColor: 'rgba(255,255,255,0.14)', color: '#ffffff' }}
                >
                  {t(VALUES_EYEBROW)}
                </span>
              </FadeIn>
              <SplitText
                as="h2"
                className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-semibold leading-[1.05]"
              >
                {t(VALUES_HEADING)}
              </SplitText>
            </div>

            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {VALUES.map((v, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="flex h-full gap-4 rounded-2xl bg-white p-6 text-[#0A2947] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)]">
                    <span
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'color-mix(in srgb, #6439FF 15%, white)' }}
                    >
                      <v.icon className="h-5 w-5 text-[#6439FF]" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{t(v.title)}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#0A2947]/80">{t(v.body)}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — same purple radial wash as Pricing's closing banner */}
        <section
          className="relative px-6 py-24 text-center md:px-12 md:py-36"
          style={{
            backgroundImage:
              'radial-gradient(140% 90% at 50% 100%, color-mix(in srgb, #6367FF 78%, transparent) 0%, transparent 75%)',
          }}
        >
          <SplitText
            as="h2"
            className="font-display text-[clamp(2.2rem,6.5vw,5rem)] font-semibold leading-[0.98]"
          >
            {t(CTA_HEADING)}
          </SplitText>
          <FadeIn delay={0.15}>
            <p className="subtext mx-auto mt-5 max-w-md text-sm md:text-base">{t(CTA_BODY)}</p>
          </FadeIn>
          <FadeIn delay={0.3} className="mt-10">
            <a
              href={whatsappHref(t(CTA_WA_MESSAGE))}
              data-cursor
              className="inline-flex items-center gap-3 rounded-full bg-white px-12 py-6 text-base font-medium tracking-normal text-black"
            >
              {t(CTA_LABEL)}
              <ArrowRight className="h-5 w-5" />
            </a>
          </FadeIn>
        </section>
      </main>

      <Footer theme="dark" />

      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
