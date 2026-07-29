'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';
import { useT, type Bi } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ScrollRevealText from '@/components/ui/ScrollRevealText';
import RevealImage from '@/components/ui/RevealImage';
import ArrowRight from '@/components/ui/ArrowRight';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import { whatsappHref } from '@/lib/contact';

/* ---- copy ---- */

const EYEBROW: Bi = { en: 'About', sq: 'Rreth Nesh' };

const HEADING: Bi = {
  en: "Wherever you are, we're here to help.",
  sq: 'Kudo që jeni, ju vijmë në ndihmë.',
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
];

const MISSION_TEXT: Bi = {
  en: 'We are a web agency fully focused on strategy for growing your business — by making your business unique and by killing every competition.',
  sq: 'Ne jemi një agjenci web e fokusuar tërësisht në strategjinë për rritjen e biznesit tuaj — duke e bërë biznesin tuaj unik dhe duke eliminuar çdo konkurrencë.',
};

const VALUES_EYEBROW: Bi = { en: 'How we work', sq: 'Si punojmë' };
const VALUES_HEADING: Bi = {
  en: 'What you can expect.',
  sq: 'Çfarë të presësh.',
};

interface Value {
  title: Bi;
  body: Bi;
}

const VALUES: Value[] = [
  {
    title: { en: 'Custom, not templates', sq: 'Personalizuar, jo shabllon' },
    body: {
      en: 'No templates. Every site is designed just for you.',
      sq: 'Pa shabllone. Çdo faqe dizajnohet posaçërisht për ty.',
    },
  },
  {
    title: { en: 'Fast, on every phone', sq: 'E shpejtë, në çdo telefon' },
    body: {
      en: 'Fast on every device, especially mobile.',
      sq: 'E shpejtë në çdo pajisje, sidomos në celular.',
    },
  },
  {
    title: { en: 'Bilingual by default', sq: 'Dygjuhëshe si standard' },
    body: {
      en: 'Every site works in Albanian and English.',
      sq: 'Çdo faqe funksionon në shqip dhe anglisht.',
    },
  },
  {
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

/** Count-up reveal: the numeric part ticks up from 0 to its target, suffix stays static. */
function CountUpValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = String(target);
      return;
    }

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.val));
        },
      });
    }, el);
    return () => ctx.revert();
  }, [target]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      <span>{suffix}</span>
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
    <div className="isolate min-h-screen overflow-x-clip bg-[#0F0824] text-[#f2f4ff]">
      <Nav />

      <main>
        {/* deep-teal hero + stats backdrop, same treatment as Pricing's hero */}
        <div className="relative">
          <div ref={bgRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0" style={{ background: '#0F0824' }} />
          </div>

          {/* hero — content left, site mockup right on desktop, stacked on mobile */}
          <section className="relative px-6 pt-24 md:px-12 md:pt-28">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-10 text-center md:grid-cols-2 md:gap-16 md:text-left">
              <div>
                <FadeIn className="mb-5 flex justify-center md:justify-start">
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
                  className="font-display text-[clamp(1.6rem,4vw,2.8rem)] font-semibold leading-[1.05]"
                >
                  {t(HEADING)}
                </SplitText>
                <FadeIn delay={0.4}>
                  <p className="subtext mx-auto mt-6 max-w-xl text-sm font-normal md:mx-0 md:text-base">
                    {t(SUBHEADING)}
                  </p>
                </FadeIn>
                <FadeIn delay={0.55} className="mt-8 flex justify-center md:justify-start">
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

              <div className="relative max-md:-mx-6">
                <RevealImage>
                  <div className="relative overflow-hidden max-md:aspect-[4/5] max-md:[clip-path:polygon(0_28%,100%_0,100%_72%,0_100%)] md:rounded-none md:[clip-path:polygon(0_0,100%_8%,100%_100%,0_92%)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/AVENUM-MOCKUP%20(1).webp"
                      alt="Avenum website mockup"
                      className="w-full max-md:h-full max-md:object-cover"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, transparent 40%, #0F0824 100%)' }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ background: 'linear-gradient(-45deg, transparent 55%, #0F0824 100%)' }}
                    />
                  </div>
                </RevealImage>

                {/* stats, moved onto the image for mobile — sit outside the clipped/scaled
                    image box so the curved top/bottom cuts and zoom never touch them */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 md:hidden"
                  style={{ background: 'linear-gradient(to top, rgba(15,8,36,0.85), transparent)' }}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-3 gap-3 p-5 md:hidden">
                  {STATS.map(([value, label]) => (
                    <div key={value}>
                      <p className="font-display text-4xl font-semibold text-white">
                        <CountUpValue value={value} />
                      </p>
                      <p className="subtext mt-1 text-[10px] leading-tight tracking-normal">{t(label)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* stats — count-up counters, desktop only (moved onto the image on mobile) */}
          <section className="relative hidden px-6 py-16 md:block md:px-12 md:py-24">
            <div className="mx-auto w-full max-w-4xl">
              <div className="glass-soft rounded-3xl p-6 md:p-10">
                <div className="grid grid-cols-3 gap-8">
                  {STATS.map(([value, label], i) => (
                    <FadeIn key={value} delay={i * 0.08}>
                      <p className="font-display text-4xl font-semibold text-white md:text-5xl">
                        <CountUpValue value={value} />
                      </p>
                      <p className="subtext mt-2 text-xs tracking-normal">{t(label)}</p>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* mission — scroll-linked reveal statement + project photography */}
        <section className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
            <ScrollRevealText
              as="p"
              className="font-display text-3xl font-medium leading-tight text-white md:text-4xl md:leading-tight"
            >
              {t(MISSION_TEXT)}
            </ScrollRevealText>

            <RevealImage className="max-md:-mx-6 rounded-2xl max-md:rounded-none md:rounded-lg md:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/chalet-booking-mockup.webp" alt="" className="w-full" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#6439FF]/[0.05]" />
              </div>
            </RevealImage>
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
                  <div className="h-full p-6">
                    <span className="subtext font-display text-lg font-semibold tracking-normal">
                      ({String(i + 1).padStart(2, '0')})
                    </span>
                    <h3 className="font-display mt-2 text-lg font-semibold text-white">{t(v.title)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/80">{t(v.body)}</p>
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

      <Footer theme="dark" bgClassName="bg-[#0F0824]" />

      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
