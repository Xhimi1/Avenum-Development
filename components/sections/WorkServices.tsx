'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';
import SplitText from '@/components/ui/SplitText';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';

const EYEBROW: Bi = { en: 'What we do', sq: 'Çfarë ofrojmë' };
const HEADING: Bi = { en: 'Everything your business needs online.', sq: 'Gjithçka që i duhet biznesit tënd online.' };

interface Service {
  id: string;
  title: Bi;
  desc: Bi;
}

/** Same 3D-tilted photo stack as the hero's <PhotoCardStack> (rotateY
 *  per card, overlapping, front card largest) — Jim Estate, Kroni and
 *  Riva mockups from the Work section, just scaled down for a card. */
function MiniPhotoStack() {
  const cards = [
    { src: '/images/atom-mockup.webp', rotateY: -25, h: 'h-full', ml: '' },
    { src: '/images/kroni-mockup.webp', rotateY: -52, h: 'h-[82%]', ml: '-ml-4 md:-ml-6' },
    { src: '/images/riva-restaurant-card.webp', rotateY: -65, h: 'h-[66%]', ml: '-ml-4 md:-ml-6' },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center [perspective:280px] md:[perspective:400px]">
      {cards.map((c, i) => (
        <img
          key={c.src}
          src={c.src}
          alt=""
          className={`aspect-[2/3] rounded-[6px] object-cover object-top ${c.h} ${c.ml}`}
          style={{ transform: `rotateY(${c.rotateY}deg)`, zIndex: cards.length - i }}
        />
      ))}
    </div>
  );
}

/** Google-style ranking list for the "SEO & Growth" card — your result on
 *  top (bigger, full white), two faded competitor rows underneath. The top
 *  row slides up into place from below once it scrolls into view. */
function SeoRankingGraphic() {
  const rows = [
    { big: true, label: 'https://yourwebsite.com', labelClass: 'text-black' },
    { big: false, label: 'Competitor site', labelClass: 'text-gray-400' },
    { big: false, label: 'Competitor site', labelClass: 'text-gray-400' },
  ];

  const rootRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    const topRow = topRowRef.current;
    if (!el || !topRow) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();

        if (prefersReducedMotion()) {
          gsap.set(topRow, { y: 0, opacity: 1 });
          return;
        }

        gsap.fromTo(
          topRow,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6, ease: 'power3.out' }
        );
      },
      { threshold: 1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="flex h-full w-full flex-col justify-center gap-3">
      {rows.map((r, i) => (
        <div
          key={i}
          ref={r.big ? (el) => { topRowRef.current = el; } : undefined}
          className={`flex items-center gap-3 rounded-xl bg-white ${r.big ? 'w-full p-3.5' : 'w-[85%] self-center p-2.5 opacity-60'}`}
        >
          <span className={`shrink-0 rounded-full bg-gray-300 ${r.big ? 'h-9 w-9' : 'h-7 w-7'}`} />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className={`truncate font-body text-xs font-medium ${r.labelClass}`}>{r.label}</span>
            <span className={`rounded-full bg-gray-200 ${r.big ? 'h-2 w-full' : 'h-1.5 w-4/5'}`} />
            {r.big && <span className="h-1.5 w-3/5 rounded-full bg-gray-200" />}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Small floating score badge (same ring design as <PerformanceBadge>, just
 *  smaller and single) — sits absolutely in a corner, on top of everything else. */
function SeoScoreBadge() {
  const size = 96;
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const value = 100;

  const rootRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();

        const circle = circleRef.current;
        const numberEl = numberRef.current;
        if (!circle || !numberEl) return;

        if (prefersReducedMotion()) {
          circle.style.strokeDashoffset = '0';
          numberEl.textContent = String(value);
          return;
        }

        gsap.fromTo(
          circle,
          { strokeDashoffset: circumference },
          { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out' }
        );

        const counter = { val: 0 };
        gsap.to(counter, {
          val: value,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            numberEl.textContent = String(Math.round(counter.val));
          },
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [circumference]);

  return (
    <div ref={rootRef} className="flex flex-col items-center gap-2">
      <div className="relative flex aspect-square h-20 w-auto items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E4E4E7" strokeWidth={stroke} />
          <circle
            ref={(el) => { circleRef.current = el; }}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#22C55E"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>
        <span ref={(el) => { numberRef.current = el; }} className="absolute font-body text-2xl font-normal tracking-normal text-black">
          0
        </span>
      </div>
      <span className="font-body text-sm font-normal tracking-normal text-black">SEO</span>
    </div>
  );
}

const SCORES = [
  { value: 99, label: 'Performance' },
  { value: 100, label: 'Accessibility' },
];

/** Blue line/area chart in a white stat card for the "Analytics & Client
 *  Relationships" card — the line draws in and the gradient fill fades in
 *  once the card scrolls into view. */
function AnalyticsChart() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    const line = lineRef.current;
    const area = areaRef.current;
    if (!el || !line || !area) return;

    const length = line.getTotalLength();
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(area, { opacity: 0 });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();

        if (prefersReducedMotion()) {
          gsap.set(line, { strokeDashoffset: 0 });
          gsap.set(area, { opacity: 1 });
          return;
        }

        gsap.to(line, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out' });
        gsap.to(area, { opacity: 1, duration: 1, delay: 0.5, ease: 'power1.out' });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="-mr-8 flex h-full w-full items-start justify-end">
      <div className="w-full max-w-[170px] rounded-2xl bg-white p-3.5 shadow-sm">
        <p className="font-body text-[0.65rem] text-gray-500">Total viewers this month</p>
        <p className="mt-1 font-body text-base font-semibold text-black">24,800</p>
        <svg viewBox="0 0 200 70" className="mt-2.5 h-12 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="analyticsSalesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B6BFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3B6BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            ref={areaRef}
            d="M0,55 C35,65 55,20 90,25 C125,30 145,8 200,2 L200,70 L0,70 Z"
            fill="url(#analyticsSalesGradient)"
          />
          <path
            ref={lineRef}
            d="M0,55 C35,65 55,20 90,25 C125,30 145,8 200,2"
            fill="none"
            stroke="#3B6BFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/** Small listing-style card (photo, name, CTA) for the "Booking systems" card. */
function BookingCard() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-[190px] rounded-lg bg-white p-2 shadow-sm">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/luxury-room-sea-view.webp"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="pt-3">
          <h3 className="font-body text-sm font-semibold leading-snug text-black">Apartament për tre persona</h3>
          <span className="mt-2 block w-full rounded-md bg-[#6B93FF] py-1.5 text-center font-body text-xs font-medium text-white">
            Book now
          </span>
        </div>
      </div>
    </div>
  );
}

/** A plain circle with a constantly-rotating, multi-hued blurred halo behind
 *  it for the "AI Chatbot" card — pulls from the site's own accent palette
 *  (amber, orange, green, teal, pink, blue) instead of the usual purple/pink
 *  "AI gradient" cliché. */
function AiOrb() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-52 w-52 items-center justify-center md:h-44 md:w-44">
        <div className="absolute inset-[-6%] animate-[spin_8s_linear_infinite] rounded-full motion-reduce:animate-none">
          <div
            className="h-full w-full rounded-full opacity-90 blur-md"
            style={{
              background:
                'conic-gradient(from 0deg, #FFC24D, #FFA366, #F79AC0, #8FACFF, #5FE0B0, #7EDDA0, #FFC24D)',
            }}
          />
        </div>
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-0 rounded-full bg-[#F2F2F3] px-6 text-center">
          <span className="font-body text-lg font-medium leading-relaxed text-black">Hi Dea</span>
          <span
            className="font-body text-lg font-medium leading-relaxed"
            style={{
              background: 'linear-gradient(135deg, #FFC24D, #FFA366, #F79AC0, #8FACFF, #5FE0B0, #7EDDA0)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            How can I help
          </span>
        </div>
      </div>
    </div>
  );
}

/** Circular progress rings (green stroke, no fill) for the "Web development"
 *  card — the ring draws in and the number counts up from zero once the
 *  card scrolls into view. */
function PerformanceBadge() {
  const size = 160;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const rootRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const played = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();

        SCORES.forEach((s, i) => {
          const circle = circleRefs.current[i];
          const numberEl = numberRefs.current[i];
          if (!circle || !numberEl) return;
          const rawOffset = circumference * (1 - s.value / 100);
          // round line caps eat into a small gap — enforce a minimum so a
          // near-100 score still visibly isn't a closed ring.
          const offset = s.value >= 100 ? 0 : Math.max(rawOffset, stroke * 1.5);

          if (prefersReducedMotion()) {
            circle.style.strokeDashoffset = String(offset);
            numberEl.textContent = String(s.value);
            return;
          }

          gsap.fromTo(
            circle,
            { strokeDashoffset: circumference },
            { strokeDashoffset: offset, duration: 1.4, ease: 'power2.out' }
          );

          const counter = { val: 0 };
          gsap.to(counter, {
            val: s.value,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              numberEl.textContent = String(Math.round(counter.val));
            },
          });
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [circumference]);

  return (
    <div ref={rootRef} className="flex h-full w-full items-center justify-center gap-10">
      {SCORES.map((s, i) => (
        <div key={s.label} className="flex flex-col items-center gap-2">
          <div className="relative flex aspect-square h-24 w-auto items-center justify-center md:h-28">
            <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
              <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E4E4E7" strokeWidth={stroke} />
              <circle
                ref={(el) => { circleRefs.current[i] = el; }}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#22C55E"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
              />
            </svg>
            <span
              ref={(el) => { numberRefs.current[i] = el; }}
              className="absolute font-body text-4xl font-normal tracking-normal text-black"
            >
              0
            </span>
          </div>
          <span className="font-body text-lg font-normal tracking-normal text-black">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

const SERVICES: Service[] = [
  {
    id: 'design',
    title: { en: 'Stunning web design', sq: 'Dizajn web mahnitës' },
    desc: { en: 'Interfaces that look and feel premium, tailored to your brand.', sq: 'Ndërfaqe që duken premium, të përshtatura për markën tënde.' },
  },
  {
    id: 'development',
    title: { en: 'Web development', sq: 'Zhvillim web' },
    desc: { en: 'Fast, reliable builds that scale with your business.', sq: 'Ndërtime të shpejta e të qëndrueshme që rriten me biznesin tënd.' },
  },
  {
    id: 'seo',
    title: { en: 'SEO & Growth', sq: 'SEO & Rritje' },
    desc: { en: 'Get found on Google and turn visits into customers.', sq: 'Gjendu në Google dhe kthe vizitorët në klientë.' },
  },
  {
    id: 'chatbot',
    title: { en: 'AI Chatbot', sq: 'AI Chatbot' },
    desc: { en: 'Answers guests and books tables 24/7, in any language.', sq: 'U përgjigjet mysafirëve dhe rezervon tavolina 24/7, në çdo gjuhë.' },
  },
  {
    id: 'analytics',
    title: { en: 'Analytics & Client Relationships', sq: 'Analitika & Marrëdhënie me Klientët' },
    desc: { en: 'Track performance and stay close to every customer.', sq: 'Ndiq performancën dhe qëndro afër çdo klienti.' },
  },
  {
    id: 'booking',
    title: { en: 'Booking systems', sq: 'Sisteme Rezervimi' },
    desc: { en: 'Let customers book and reserve straight from your site.', sq: 'Klientët rezervojnë drejtpërdrejt nga faqja jote.' },
  },
];

export default function WorkServices() {
  const t = useT();

  return (
    <div className="mt-28 md:mt-36">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-12">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:max-w-none md:text-left">
          <span className="inline-block rounded-full bg-[#EEF0FF] px-3 py-1 text-[0.8rem] font-medium text-[#6367FF]">
            {t(EYEBROW)}
          </span>
          <SplitText
            as="h2"
            className="mt-3 font-display text-[clamp(2.8rem,6vw,4.6rem)] font-semibold leading-[0.95] text-[#333D6D] [text-wrap:balance] md:[text-wrap:normal]"
          >
            {t(HEADING)}
          </SplitText>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:gap-x-8 md:gap-y-10 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.id} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#F2F2F3] p-8">
                {i === 4 && (
                  <div
                    className="absolute bottom-0 left-12 right-0 top-12 rounded-tl-2xl bg-cover bg-top"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 100%), url('/images/jim-estate-hero.webp')",
                    }}
                  />
                )}
                {i === 0 && <MiniPhotoStack />}
                {i === 1 && <PerformanceBadge />}
                {i === 2 && (
                  <>
                    <SeoRankingGraphic />
                    <div className="absolute bottom-3 right-3 z-10">
                      <SeoScoreBadge />
                    </div>
                  </>
                )}
                {i === 3 && <AiOrb />}
                {i === 4 && (
                  <div className="relative z-10 h-full w-full">
                    <AnalyticsChart />
                  </div>
                )}
                {i === 5 && <BookingCard />}
              </div>
              <h3 className="mt-4 font-body text-xl leading-tight">
                <span className="font-normal text-black">{t(s.title)} </span>
                <span className="font-normal text-gray-400">{t(s.desc)}</span>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
