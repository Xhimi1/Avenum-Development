'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';
import { useT, type Bi } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ScrollRevealText from '@/components/ui/ScrollRevealText';
import ClipRevealImage from '@/components/ui/ClipRevealImage';
import ArrowRight from '@/components/ui/ArrowRight';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

/* ---- copy ---- */

const HEADING: Bi = {
  en: "Wherever you are, we're here to help.",
  sq: 'Kudo që jeni, ju vijmë në ndihmë.',
};

const SUBHEADING: Bi = {
  en: 'Custom design, fast websites and real support — for businesses ready to grow.',
  sq: 'Dizajn i personalizuar, faqe të shpejta dhe mbështetje reale — për biznese gati të rriten.',
};

const HERO_CTA: Bi = { en: 'See our work', sq: 'Shiko punën' };

const STATS: Array<[string, Bi]> = [
  ['3+', { en: 'Years of experience', sq: 'Vite përvojë' }],
  ['20+', { en: 'Projects delivered', sq: 'Projekte të realizuara' }],
  ['100%', { en: 'Client satisfaction', sq: 'Klientë të kënaqur' }],
];

const MISSION_TEXT: Bi = {
  en: "We're a web agency focused on one thing: growing your business — by making it stand out from every competitor.",
  sq: 'Ne jemi një agjenci web e fokusuar në një gjë: rritjen e biznesit tënd — duke e bërë atë të dallohet nga çdo konkurrent.',
};

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

const PARTNERS_HEADING: Bi = { en: 'Our partners', sq: 'Partnerët tanë' };
const VIEW_SITE_LABEL: Bi = { en: 'View site', sq: 'Shiko faqen' };

interface Partner {
  name: string;
  logo: string;
  /** Kroni's mark is solid black in its source file, so it needs a hard
   *  brightness+invert to read as white on this card's black panel.
   *  Platinum's source already has two-tone (black/white) detail, so it
   *  gets a plain invert to swap those tones and keep the contrast.
   *  Riva just goes grayscale and keeps its own tonal detail. */
  logoFilter: string;
  category: Bi;
  liveUrl: string;
}

/** Real, live client sites — social proof. Paths are percent-encoded
 *  because the logo files' own names carry spaces and parentheses. */
const PARTNERS: Partner[] = [
  {
    name: 'Kroni',
    logo: '/images/Group%201%20(9).svg',
    logoFilter: '[filter:brightness(0)_invert(1)]',
    category: { en: 'Restaurant in Velipoje', sq: 'Restorant në Velipojë' },
    liveUrl: 'https://kroni-restaurant.com',
  },
  {
    name: 'Riva',
    logo: '/images/Gemini_Generated_Image_75g7bv75g7bv75g7.webp',
    logoFilter: 'grayscale',
    category: { en: 'Restaurant in Durres', sq: 'Restorant në Durrës' },
    liveUrl: 'https://riva-restaurant.al',
  },
  {
    name: 'Platinum',
    logo: '/images/Mask%20group%20(5).png',
    logoFilter: 'invert',
    category: { en: 'Gym in Tirana', sq: 'Palestër në Tiranë' },
    liveUrl: 'https://www.platinumfitness.site',
  },
];

const CTA_HEADING: Bi = { en: "Let's build something together.", sq: 'Le të ndërtojmë diçka bashkë.' };
const CTA_BODY: Bi = {
  en: "Tell us about your business — we'll get back to you fast.",
  sq: 'Na trego për biznesin tënd — do të të përgjigjemi shpejt.',
};
const CTA_LABEL: Bi = { en: 'Start your project', sq: 'Nis projektin tënd' };

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

  return (
    <div className="isolate min-h-screen overflow-x-clip bg-black text-white">
      <Nav />

      <main>
        <div className="relative">
          {/* hero — same layout as the homepage Hero: left-aligned heading,
              subheading, CTA, then the page's own image full-bleed below
              with the same diagonal-clip white wash panel behind it. */}
          <section className="relative flex min-h-[70svh] flex-col items-start overflow-hidden bg-black px-6 pt-40 text-left md:min-h-[100svh] md:pt-32">
            <SplitText
              as="h1"
              delay={0.15}
              animate
              className="heading-hero relative z-10 max-w-[14ch] text-balance md:max-w-[22ch]"
            >
              {t(HEADING)}
            </SplitText>

            <p className="subheading-hero relative z-10 mt-6 max-w-xs text-left md:mt-7">
              {t(SUBHEADING)}
            </p>

            <div className="relative z-10 mt-7 mb-8 flex items-center justify-start gap-3 md:mt-8 md:mb-16">
              <a
                href="/portfolio"
                data-cursor
                className="pointer-events-auto btn-primary"
              >
                {t(HERO_CTA)}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="relative z-10 mx-[calc(50%-50vw)] w-screen px-6 pt-8 md:mt-auto md:pt-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 top-20 bg-white/[0.04] md:top-32"
                style={{ clipPath: 'polygon(0 5rem, 100% 0, 100% 100%, 0 100%)' }}
              />
              <div className="relative mx-auto flex max-w-3xl justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/AVENUM-MOCKUP%20(1).webp"
                  alt="Avenum website mockup"
                  className="w-full rounded-t-2xl object-cover"
                />
              </div>
            </div>
          </section>

          {/* stats — count-up counters */}
          <section className="relative px-6 py-16 md:px-12 md:py-24">
            <div className="mx-auto w-full max-w-4xl">
              <div className="rounded-3xl border-2 border-white/20 bg-white/[0.04] p-6 shadow-[6px_6px_0_0_rgba(255,255,255,0.14)] md:p-10">
                <div className="grid grid-cols-3 gap-8">
                  {STATS.map(([value, label], i) => (
                    <FadeIn key={value} delay={i * 0.08}>
                      <p className="font-display text-4xl font-extralight text-white md:text-5xl">
                        <CountUpValue value={value} />
                      </p>
                      <p className="mt-2 text-xs tracking-normal text-white/60">{t(label)}</p>
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

            <ClipRevealImage
              src="/images/chalet-booking-mockup.webp"
              className="max-md:-mx-6 rounded-2xl max-md:rounded-none md:rounded-lg md:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#6439FF]/[0.05]" />
            </ClipRevealImage>
          </div>
        </section>

        {/* values */}
        <section className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-10 max-w-2xl md:mb-14">
              <SplitText
                as="h2"
                className="heading-lg"
              >
                {t(VALUES_HEADING)}
              </SplitText>
            </div>

            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {VALUES.map((v, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="h-full rounded-3xl border-2 border-white/20 bg-white/[0.04] p-6">
                    <span className="font-display text-lg font-extralight tracking-normal text-[#6367FF]">
                      ({String(i + 1).padStart(2, '0')})
                    </span>
                    <h3 className="heading-sm mt-2">{t(v.title)}</h3>
                    <p className="subtext mt-1.5">{t(v.body)}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* our partners — real, live client sites */}
        <section className="relative bg-[#DEDFE1] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-10 text-center md:mb-14">
              <SplitText
                as="h2"
                className="heading-lg"
              >
                {t(PARTNERS_HEADING)}
              </SplitText>
            </div>

            <ul className="grid items-stretch gap-6 md:grid-cols-3">
              {PARTNERS.map((partner) => (
                <li key={partner.name} className="min-w-0">
                  <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white/[0.04]">
                    <div className="p-4">
                      <div className="flex items-center justify-center gap-4 rounded-2xl bg-black px-6 py-12">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={partner.logo}
                          alt=""
                          className={cn('h-14 w-auto object-contain', partner.logoFilter)}
                        />
                        <p className="font-display text-4xl font-extralight text-white">{partner.name}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
                      <p className="font-display text-lg font-medium text-white/70">{t(partner.category)}</p>
                      <a
                        href={partner.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="inline-flex items-center gap-1.5 font-display text-base font-medium tracking-normal text-white underline underline-offset-4 transition-colors duration-300 hover:text-white/70"
                      >
                        {t(VIEW_SITE_LABEL)}
                        <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA — identical to the homepage's Contact banner */}
        <section className="relative min-h-[65vh] md:min-h-[80vh]">
          <div className="flex min-h-[65vh] p-3 md:min-h-[80vh] md:p-6">
            <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col items-center justify-center overflow-hidden rounded-[20px] bg-white/[0.04] px-6 py-16 text-center md:max-w-6xl md:px-12">
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
                  className="heading-lg"
                >
                  {t(CTA_HEADING)}
                </SplitText>

                <FadeIn delay={0.15}>
                  <p className="subtext mx-auto mt-5 max-w-xl">{t(CTA_BODY)}</p>
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
      </main>

      <Footer />

      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
