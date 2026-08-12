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

const CHART_BARS = [35, 55, 45, 70, 60, 90];

/** Blue bar chart for the "Analytics & Client Relationships" card — bars
 *  grow from zero once the card scrolls into view. */
function AnalyticsChart() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const played = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();

        const bars = barRefs.current.filter((b): b is HTMLDivElement => !!b);

        if (prefersReducedMotion()) {
          bars.forEach((b, i) => {
            b.style.height = `${CHART_BARS[i]}%`;
          });
          return;
        }

        gsap.fromTo(
          bars,
          { height: '0%' },
          {
            height: (i: number) => `${CHART_BARS[i]}%`,
            duration: 0.9,
            ease: 'power2.out',
            stagger: 0.08,
          }
        );
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative flex h-full w-full items-end justify-center gap-2.5">
      <span className="absolute left-0 top-10 z-10 whitespace-nowrap rounded-full bg-[#3B6BFF] px-3 py-2.5 text-[0.65rem] font-medium text-white">
        12.4K Visitors
      </span>
      {CHART_BARS.map((_, i) => (
        <div key={i} className="flex h-full w-6 items-end overflow-hidden rounded-t-md bg-[#3B6BFF]/10">
          <div
            ref={(el) => { barRefs.current[i] = el; }}
            className="w-full rounded-t-md bg-[#3B6BFF]"
            style={{ height: '0%' }}
          />
        </div>
      ))}
    </div>
  );
}

/** A plain circle with a constantly-rotating, multi-hued blurred halo behind
 *  it for the "AI Chatbot" card — pulls from the site's own accent palette
 *  (amber, orange, green, teal, pink, blue) instead of the usual purple/pink
 *  "AI gradient" cliché. */
const AI_CHIPS = ['24/7 replies', 'Instant answers', 'Multilingual', 'Zero missed chats', 'Human handoff', 'Smart replies'];

function AiOrb() {
  const circleRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    const halo = haloRef.current;
    const chip = chipRef.current;
    if (!circle || !halo || !chip || prefersReducedMotion()) return;

    const scaleEls = [circle, halo];
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    AI_CHIPS.forEach((label, i) => {
      // each pulse pops the next chip in at the circle's centre, in exact
      // sync with the circle/halo dipping (both tweens pinned to the same
      // label) — holds 4s, then a matching dip syncs the fade-out too
      const inLabel = `chip${i}-in`;
      const outLabel = `chip${i}-out`;

      tl.addLabel(inLabel)
        .call(() => { chip.textContent = label; }, undefined, inLabel)
        .to(scaleEls, { scale: 0.94, duration: 0.3, ease: 'power1.out' }, inLabel)
        .to(chip, { scale: 1, opacity: 1, duration: 0.3, ease: 'power1.out' }, inLabel)
        .to(scaleEls, { scale: 1, duration: 0.35, ease: 'power1.inOut' })
        .to({}, { duration: 4 })
        .addLabel(outLabel)
        .to(scaleEls, { scale: 0.94, duration: 0.3, ease: 'power1.out' }, outLabel)
        .to(chip, { scale: 0.6, opacity: 0, duration: 0.3, ease: 'power1.inOut' }, outLabel)
        .to(scaleEls, { scale: 1, duration: 0.3, ease: 'power1.inOut' });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-40 w-40 items-center justify-center md:h-48 md:w-48">
        {/* rotation (CSS animation) lives on this wrapper; the gradient
            layer inside it only handles the gsap scale pulse — keeping the
            two transforms off the same element so neither overrides the other */}
        <div className="absolute inset-[-6%] animate-[spin_8s_linear_infinite] rounded-full motion-reduce:animate-none">
          <div
            ref={haloRef}
            className="h-full w-full rounded-full opacity-90 blur-md"
            style={{
              background:
                'conic-gradient(from 0deg, #FFC24D, #FFA366, #F79AC0, #8FACFF, #5FE0B0, #7EDDA0, #FFC24D)',
            }}
          />
        </div>
        <div ref={circleRef} className="relative z-10 h-full w-full rounded-full bg-[#F2F2F3]" />
        <span
          ref={chipRef}
          className="absolute z-20 scale-[0.6] whitespace-nowrap rounded-full px-3 py-1 text-[0.65rem] font-medium text-white opacity-0 shadow-md"
          style={{ background: 'linear-gradient(135deg, #FFC24D, #FFA366, #F79AC0, #8FACFF, #5FE0B0, #7EDDA0)' }}
        />
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
                {i === 4 && <AnalyticsChart />}
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
