'use client';

import localFont from 'next/font/local';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';
import { useT, type Bi } from '@/lib/i18n';
import Footer from '@/components/ui/Footer';
import HospitalityNav from './HospitalityNav';
import Heading from './Heading';
import ServicesSlider from './ServicesSlider';
import ReserveCTA from './ReserveCTA';
import { whatsappHref } from '@/lib/contact';

// General Sans (Fontshare, free for commercial use) — self-hosted like
// every other font on the site, instead of loading from Fontshare's CDN.
const generalSans = localFont({
  src: [
    { path: './fonts/GeneralSans-Extralight.woff2', weight: '200', style: 'normal' },
    { path: './fonts/GeneralSans-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-general-sans',
  display: 'swap',
});

const WA_MESSAGE_HOSPITALITY =
  'Përshëndetje. Kam një restorant/hotel dhe dua një faqe web. Mund të flasim?';

const HERO_HEADING: Bi = {
  en: 'Your restaurant looks better than your website.',
  sq: 'Restoranti yt duket më mirë se faqja jote web.',
};
const HERO_SUB: Bi = {
  en: 'We build websites and apps only for restaurants and hotels.',
  sq: 'Ndërtojmë faqe web dhe aplikacione vetëm për restorante e hotele.',
};
const HERO_CTA: Bi = { en: 'Talk to us', sq: 'Na shkruaj' };

const MENU_HEADING: Bi = { en: 'Menus people can actually read.', sq: 'Menu që lexohen me të vërtetë.' };
const MENU_BODY: Bi = {
  en: 'And a booking button that works without a phone call.',
  sq: 'Dhe një buton rezervimi që funksionon pa telefonatë.',
};

const HOTEL_CAPTION: Bi = { en: 'Same for hotels.', sq: 'E njëjta gjë për hotelet.' };

const GALLERY_HEADING: Bi = { en: 'A few places we’ve built for.', sq: 'Disa vende për të cilat kemi ndërtuar.' };

const PROOF_HEADING: Bi = { en: 'Real restaurants. Real results.', sq: 'Restorante reale. Rezultate reale.' };

const CTA_HEADING: Bi = { en: 'Let’s talk.', sq: 'Le të flasim.' };
const CTA_BODY: Bi = {
  en: 'Tell us about your place. We reply the same day.',
  sq: 'Na trego për vendin tënd. Përgjigjemi po atë ditë.',
};
const CTA_BUTTON: Bi = { en: 'Start now', sq: 'Fillo tani' };

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

export default function HospitalityPage() {
  const t = useT();
  const waLink = whatsappHref(WA_MESSAGE_HOSPITALITY);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  }, []);

  // Hero entrance: the photo starts as a small rectangle at dead center and
  // expands outward on all four sides at once to fill its box — driven by a
  // single numeric inset (not GSAP's clip-path string parsing, which was
  // producing an off-center/bottom-anchored result) so top/right/bottom/left
  // shrink at exactly the same rate. Heading/subtext/button fade up after.
  useLayoutEffect(() => {
    const img = heroImgRef.current;
    const sub = heroSubRef.current;
    const btn = heroBtnRef.current;
    if (!img || !sub || !btn) return;

    if (prefersReducedMotion()) {
      img.style.clipPath = 'none';
      gsap.set([sub, btn], { opacity: 1, y: 0 });
      return;
    }

    const state = { inset: 40 };
    const applyClip = () => {
      img.style.clipPath = `inset(${state.inset}% round 2.5rem)`;
    };
    applyClip();
    gsap.set(img, { opacity: 0 });

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        // content first — heading (via its own delay below) then sub/button
        .fromTo(sub, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.3)
        .fromTo(btn, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.45)
        // image fades in quickly (so the fade doesn't mask the expand's fast
        // start) and expands to full size in one continuous move, eased in
        // and out (cubic)
        .to(img, { opacity: 1, duration: 0.3, ease: 'power2.inOut' }, 0.9)
        .to(state, {
          inset: 0,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: applyClip,
          onComplete: () => {
            img.style.clipPath = 'none';
          },
        }, 0.9);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={`${generalSans.variable} relative min-h-screen bg-black text-white`}>
      <HospitalityNav />

      <main>
        {/* hero — image top/right, content bottom/left: horizontal split on
            desktop, stacked (image first, rounded) on mobile */}
        <section className="relative flex flex-col md:min-h-[80vh] md:flex-row md:items-stretch">
          <div className="order-1 overflow-hidden px-3 pt-24 md:order-2 md:w-1/2 md:px-0 md:pt-0">
            <img
              ref={heroImgRef}
              src="/images/hospitality-hero.webp"
              alt=""
              className="h-[40vh] w-full rounded-[2.75rem] object-cover md:h-full md:rounded-none md:rounded-l-[3.5rem]"
            />
          </div>

          <div className="order-2 flex flex-col items-center justify-center px-6 py-12 text-center md:order-1 md:w-1/2 md:items-start md:px-12 md:py-24 md:text-left">
            <Heading as="h1" delay={0.15} className="max-w-xl text-[clamp(2rem,4.5vw,3.4rem)] text-white">
              {t(HERO_HEADING)}
            </Heading>
            <p ref={heroSubRef} className="mx-auto mt-6 max-w-md text-sm font-light text-white md:mx-0 md:text-base">
              {t(HERO_SUB)}
            </p>
            <a
              ref={heroBtnRef}
              href={waLink}
              data-cursor
              className="mt-10 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#12544F] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#12544F]/85"
            >
              {t(HERO_CTA)}
              <Chevron />
            </a>
          </div>
        </section>

        {/* services — draggable slider of image placeholders, titles beneath */}
        <ServicesSlider />

        {/* full-bleed image break — no text, pure visual pause */}
        <div className="w-full">
          <img
            src="/images/luxury-room-sea-view.webp"
            alt=""
            loading="lazy"
            className="h-[70vh] w-full object-cover md:h-screen"
          />
        </div>

        {/* what we build — menus & booking, two-up image grid */}
        <section id="menu" className="px-6 py-32 md:px-12 md:py-48">
          <div className="mx-auto w-full max-w-6xl">
            <Heading className="max-w-2xl text-[clamp(1.8rem,4.5vw,3.2rem)] text-white">
              {t(MENU_HEADING)}
            </Heading>
            <p className="mt-6 max-w-md text-sm font-light text-white md:text-base">{t(MENU_BODY)}</p>

            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <img
                src="/images/riva-restaurant-overview-1.webp"
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <img
                src="/images/riva-restaurant-overview-2.webp"
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full rounded-lg object-cover md:mt-16"
              />
            </div>
          </div>
        </section>

        {/* full-bleed image break — hotels, one short caption */}
        <div id="hotels" className="relative w-full">
          <img
            src="/images/chalet-booking-mockup.webp"
            alt=""
            loading="lazy"
            className="h-[70vh] w-full object-cover md:h-screen"
          />
          <p className="absolute bottom-10 left-6 text-sm font-light text-white md:bottom-16 md:left-12 md:text-base">
            {t(HOTEL_CAPTION)}
          </p>
        </div>

        {/* gallery strip — three real places, minimal framing */}
        <section id="work" className="px-6 py-32 md:px-12 md:py-48">
          <div className="mx-auto w-full max-w-6xl">
            <Heading className="text-[clamp(1.8rem,4.5vw,3.2rem)] text-white">
              {t(GALLERY_HEADING)}
            </Heading>

            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              <img
                src="/images/kroni-mockup.webp"
                alt=""
                loading="lazy"
                className="aspect-[3/4] w-full rounded-lg object-cover"
              />
              <img
                src="/images/riva-restaurant-card.webp"
                alt=""
                loading="lazy"
                className="aspect-[3/4] w-full rounded-lg object-cover md:mt-10"
              />
              <img
                src="/images/kroni-restaurant-overview-2.webp"
                alt=""
                loading="lazy"
                className="aspect-[3/4] w-full rounded-lg object-cover md:mt-20"
              />
            </div>
          </div>
        </section>

        {/* full-bleed closing image with an overlaid statement */}
        <section className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden md:h-screen">
          <img
            src="/images/kroni-restaurant-hero.webp"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <Heading className="relative px-6 text-center text-[clamp(2rem,6vw,4.2rem)] text-white">
            {t(PROOF_HEADING)}
          </Heading>
        </section>

        {/* final CTA — text only */}
        <section id="contact" className="px-6 py-32 text-center md:px-12 md:py-48">
          <div className="mx-auto w-full max-w-2xl">
            <Heading className="text-[clamp(2.2rem,6vw,4.4rem)] text-white">{t(CTA_HEADING)}</Heading>
            <p className="mx-auto mt-6 max-w-sm text-sm font-light text-white md:text-base">{t(CTA_BODY)}</p>
            <a
              href={waLink}
              data-cursor
              className="mt-10 inline-flex items-center gap-1.5 rounded-full bg-[#12544F] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#12544F]/85"
            >
              {t(CTA_BUTTON)}
              <Chevron />
            </a>
          </div>
        </section>
      </main>

      <Footer theme="light" />
      <ReserveCTA />
    </div>
  );
}
