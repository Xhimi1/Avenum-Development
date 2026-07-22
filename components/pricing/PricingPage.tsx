'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';
import { useT, type Bi } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import LangToggle from '@/components/ui/LangToggle';
import Logo from '@/components/ui/Logo';

const MAIL_BASE = 'mailto:hello@avenum.studio?subject=';

const BACK_LINK = { en: '← Back to the experience', sq: '← Kthehu te eksperienca' };
const COPYRIGHT = {
  en: '© 2026 Avenum — All rights reserved',
  sq: '© 2026 Avenum — Të gjitha të drejtat e rezervuara',
};

/* ---- tiny inline icons ---- */

function IconCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9" opacity={0.35} />
      <path d="m8.5 12.2 2.4 2.4 4.6-5" />
    </svg>
  );
}

function IconMinus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden className={className}>
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function IconLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

/** 4-point spark inside each plan's icon circle. */
function IconSpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z" />
    </svg>
  );
}

/* ---- data ---- */

interface Tier {
  id: string;
  name: string;
  desc: Bi;
  price: Bi;
  originalPrice?: Bi;
  discountLabel?: Bi;
  per?: Bi;
  cta: Bi;
  mailSubject: Bi;
  featured?: boolean;
  meta: Array<{ icon: (p: { className?: string }) => JSX.Element; label: Bi }>;
  features: Bi[];
}

const TIERS: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    desc: {
      en: 'A custom website, live in two weeks.',
      sq: 'Një website i personalizuar, online brenda dy javësh.',
    },
    price: { en: '€120', sq: '€120' },
    originalPrice: { en: '€490', sq: '€490' },
    discountLabel: { en: '76% OFF', sq: '76% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Choose this plan', sq: 'Zgjidh këtë plan' },
    mailSubject: { en: 'Starter plan', sq: 'Plani Starter' },
    meta: [
      { icon: IconLayers, label: { en: 'Up to 3 pages', sq: 'Deri në 3 faqe' } },
    ],
    features: [
      { en: 'Custom design — no templates', sq: 'Dizajn i personalizuar — pa shabllone' },
      { en: 'Mobile-first & lightning fast', sq: 'Mobile-first & shpejtësi maksimale' },
      { en: 'Contact & WhatsApp integration', sq: 'Integrim kontakti & WhatsApp' },
      { en: 'SEO essentials & analytics', sq: 'Bazat e SEO & analitika' },
      { en: '1 month of free support', sq: '1 muaj mbështetje falas' },
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    desc: {
      en: 'Custom design, motion and a memorable site.',
      sq: 'Dizajn i personalizuar, animacione dhe një faqe e paharrueshme.',
    },
    price: { en: '€300', sq: '€300' },
    originalPrice: { en: '€1,490', sq: '€1,490' },
    discountLabel: { en: '80% OFF', sq: '80% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Choose this plan', sq: 'Zgjidh këtë plan' },
    mailSubject: { en: 'Signature plan', sq: 'Plani Signature' },
    featured: true,
    meta: [
      { icon: IconLayers, label: { en: 'Up to 10 pages', sq: 'Deri në 10 faqe' } },
    ],
    features: [
      { en: 'Advanced motion & animations', sq: 'Animacione & lëvizje të avancuara' },
      { en: '3D / WebGL on request', sq: '3D / WebGL sipas kërkesës' },
      { en: 'CMS — edit content yourself', sq: 'CMS — modifiko përmbajtjen vetë' },
      { en: 'Multilingual (AL · EN · IT)', sq: 'Shumëgjuhësh (AL · EN · IT)' },
      { en: 'Booking & payment integrations', sq: 'Integrime rezervimesh & pagesash' },
      { en: '3 months of free support', sq: '3 muaj mbështetje falas' },
    ],
  },
  {
    id: 'partner',
    name: 'Partner',
    desc: {
      en: 'Web apps, e-commerce and AI chatbots.',
      sq: 'Aplikacione web, e-commerce dhe AI chatbots.',
    },
    price: { en: 'Custom', sq: 'Sipas kërkesës' },
    cta: { en: 'Contact us', sq: 'Na kontakto' },
    mailSubject: { en: 'Partner plan', sq: 'Plani Partner' },
    meta: [
      { icon: IconClock, label: { en: 'Dedicated team', sq: 'Ekip i dedikuar' } },
      { icon: IconLayers, label: { en: 'Unlimited scope', sq: 'Fushëveprim i pakufizuar' } },
    ],
    features: [
      { en: 'Web apps & e-commerce', sq: 'Aplikacione web & e-commerce' },
      { en: 'AI chatbot for bookings', sq: 'AI chatbot për rezervime' },
      { en: 'Monthly retainer or per-project', sq: 'Pagesë mujore ose për projekt' },
      { en: 'Priority support & SLAs', sq: 'Mbështetje prioritare & SLA' },
      { en: 'Strategy, analytics & growth', sq: 'Strategji, analitika & rritje' },
    ],
  },
];

type CompareValue = boolean | Bi;

const COMPARE_ROWS: Array<[Bi, CompareValue, CompareValue, CompareValue]> = [
  [{ en: 'Custom design', sq: 'Dizajn i personalizuar' }, true, true, true],
  [
    { en: 'Pages', sq: 'Faqe' },
    { en: 'Up to 3', sq: 'Deri në 3' },
    { en: 'Up to 10', sq: 'Deri në 10' },
    { en: 'Unlimited', sq: 'Pa limit' },
  ],
  [
    { en: 'Motion & animations', sq: 'Animacione & lëvizje' },
    { en: 'Essentials', sq: 'Bazë' },
    { en: 'Advanced', sq: 'Të avancuara' },
    { en: 'Bespoke', sq: 'Të personalizuara' },
  ],
  [
    { en: '3D / WebGL', sq: '3D / WebGL' },
    false,
    { en: 'On request', sq: 'Sipas kërkesës' },
    true,
  ],
  [{ en: 'CMS — edit it yourself', sq: 'CMS — modifiko vetë' }, false, true, true],
  [
    { en: 'E-commerce', sq: 'E-commerce' },
    false,
    { en: 'On request', sq: 'Sipas kërkesës' },
    true,
  ],
  [{ en: 'AI chatbot', sq: 'AI chatbot' }, false, false, true],
  [
    { en: 'Languages', sq: 'Gjuhë' },
    { en: '1', sq: '1' },
    { en: 'AL · EN · IT', sq: 'AL · EN · IT' },
    { en: 'Unlimited', sq: 'Pa limit' },
  ],
  [{ en: 'SEO & analytics', sq: 'SEO & analitika' }, true, true, true],
  [
    { en: 'Support after launch', sq: 'Mbështetje pas lançimit' },
    { en: '1 month', sq: '1 muaj' },
    { en: '3 months', sq: '3 muaj' },
    { en: 'Ongoing', sq: 'Vazhdueshme' },
  ],
];

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

/** Meta list + divider + feature checklist — shared by every tier card, always black-on-white. */
function TierMetaFeatures({ tier, t }: { tier: Tier; t: (bi: Bi) => string }) {
  return (
    <>
      <ul className="space-y-3">
        {tier.meta.map((m, mi) => (
          <li key={mi} className="flex items-center gap-3 text-sm text-black">
            <m.icon className="h-[18px] w-[18px] text-black/40" />
            {t(m.label)}
          </li>
        ))}
      </ul>

      <ul className="mt-5 space-y-3">
        {tier.features.map((f, fi) => (
          <li key={fi} className="flex items-start gap-3 text-sm text-black">
            <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-black">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="h-3 w-3"
              >
                <path d="m6 12.5 3.5 3.5L18 7" />
              </svg>
            </span>
            {t(f)}
          </li>
        ))}
      </ul>
    </>
  );
}

function CompareCell({
  value,
  featured,
  t,
}: {
  value: CompareValue;
  featured?: boolean;
  t: (bi: Bi) => string;
}) {
  if (value === true) {
    return <IconCheck className={cn('mx-auto h-5 w-5', featured ? 'text-[#a78bfa]' : 'text-white/70')} />;
  }
  if (value === false) {
    return <IconMinus className="mx-auto h-5 w-5 text-white/20" />;
  }
  return <span className={cn('text-xs', featured ? 'text-white' : 'text-white/70')}>{t(value)}</span>;
}

export default function PricingPage() {
  const t = useT();
  const bgRef = useRef<HTMLDivElement>(null);

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
    <div className="isolate min-h-screen overflow-x-clip bg-black text-[#f2f4ff]">
      {/* deep-purple base, diagonal light stripes and a soft center glow */}
      <div ref={bgRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* base purple gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #2a1660 0%, #1b0f3d 45%, #140a30 100%)',
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
          style={{ background: 'radial-gradient(circle, rgba(140,110,255,0.28), transparent 70%)' }}
        />
        {STARS.map((s, i) => (
          <span
            key={i}
            className="svc-pulse absolute rounded-full bg-white/60"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
          />
        ))}
      </div>

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
        <section className="relative px-6 pt-24 text-center md:px-12 md:pt-28">
          <div className="mx-auto max-w-3xl">
            <FadeIn className="mb-5 flex justify-center">
              <span
                className="rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
                style={{
                  backgroundColor: 'color-mix(in srgb, #a78bfa 18%, transparent)',
                  color: '#a78bfa',
                }}
              >
                {t({ en: 'Pricing', sq: 'Çmimet' })}
              </span>
            </FadeIn>
            <SplitText
              as="h1"
              delay={0.15}
              className="font-display text-[clamp(2.4rem,6.5vw,4.8rem)] font-semibold leading-[0.98]"
            >
              {t({ en: 'Plans built for Albanian businesses.', sq: 'Plane të ndërtuara për bizneset shqiptare.' })}
            </SplitText>
            <FadeIn delay={0.4}>
              <p className="subtext mx-auto mt-6 max-w-xl text-sm font-light md:text-base">
                {t({
                  en: 'World-class web experiences at prices that make sense in Tirana — clear packages, honest scope, no hidden costs.',
                  sq: 'Eksperienca web të nivelit botëror me çmime që kanë kuptim në Tiranë — paketa të qarta, fushëveprim i sinqertë, pa kosto të fshehura.',
                })}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* plan cards */}
        <section className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <ul className="grid gap-6 md:grid-cols-3 md:items-stretch">
              {TIERS.map((tier) => (
                <li
                  key={tier.id}
                  className={cn('min-w-0', tier.featured && 'md:-my-5')}
                >
                  <div className="h-full">
                    <div className="h-full">
                      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_-20px_rgba(0,0,0,0.55)]">
                        {tier.id === 'starter' ? (
                          <div className="flex flex-1 flex-col p-6 md:p-7">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6367FF] text-white shadow-lg">
                              <IconSpark className="h-5 w-5" />
                            </span>

                            <h2 className="mt-5 font-display text-xl font-semibold text-black md:text-2xl">
                              {tier.name}
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-black">
                              {t(tier.desc)}
                            </p>

                            <a
                              href={`${MAIL_BASE}${encodeURIComponent(t(tier.mailSubject))}`}
                              data-cursor
                              className="mt-6 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-t from-[#4f52e0] to-[#6367FF] py-3.5 text-center text-sm font-medium tracking-normal text-white transition-opacity duration-300 hover:opacity-90"
                            >
                              {t(tier.cta)}
                              <ArrowRight className="h-4 w-4 -rotate-45" />
                            </a>

                            <div className="mt-6">
                              <TierMetaFeatures tier={tier} t={t} />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="relative mx-2 mt-2 rounded-2xl bg-gradient-to-t from-[#4f52e0] to-[#6367FF] p-6 md:mx-3 md:mt-3 md:p-7">
                              <div className="flex items-start justify-between">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#6367FF]">
                                  <IconSpark className="h-5 w-5" />
                                </span>
                                {tier.featured && (
                                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] tracking-normal text-white">
                                    {t({ en: 'Most popular', sq: 'Më i popullarizuar' })}
                                  </span>
                                )}
                              </div>

                              <h2 className="mt-5 font-display text-xl font-semibold text-white md:text-2xl">
                                {tier.name}
                              </h2>
                              <p className="mt-2 text-sm leading-relaxed text-white/90">
                                {t(tier.desc)}
                              </p>

                              <a
                                href={`${MAIL_BASE}${encodeURIComponent(t(tier.mailSubject))}`}
                                data-cursor
                                className="mt-6 flex items-center justify-center gap-1.5 rounded-xl bg-white py-3.5 text-center text-sm font-medium tracking-normal text-black transition-colors duration-300 hover:bg-white/90"
                              >
                                {t(tier.cta)}
                                <ArrowRight className="h-4 w-4 -rotate-45" />
                              </a>
                            </div>

                            <div className="flex flex-1 flex-col p-6 md:p-7">
                              <TierMetaFeatures tier={tier} t={t} />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <FadeIn delay={0.2}>
              <p className="mt-10 text-center text-xs text-white/40">
                {t({
                  en: 'Prices in EUR for the Albanian market · pay in euro or lekë · installments available · VAT not included',
                  sq: 'Çmimet në EUR për tregun shqiptar · paguaj në euro ose lekë · me këste · TVSH-ja nuk përfshihet',
                })}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* comparison */}
        <section className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-10 text-center md:mb-14">
              <SplitText
                as="h2"
                className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[0.98]"
              >
                {t({ en: 'Compare the plans.', sq: 'Krahaso planet.' })}
              </SplitText>
              <FadeIn delay={0.15}>
                <p className="subtext mx-auto mt-4 max-w-md text-sm">
                  {t({
                    en: 'Everything each package includes, side by side.',
                    sq: 'Gjithçka që përfshin çdo paketë, krah për krah.',
                  })}
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="glass overflow-hidden rounded-3xl bg-white/[0.02]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="px-5 py-5 text-xs font-normal tracking-normal text-white/40 md:px-7">
                          {t({ en: 'What you get', sq: 'Çfarë përfshin' })}
                        </th>
                        {TIERS.map((tier) => (
                          <th
                            key={tier.id}
                            className={cn(
                              'px-4 py-5 text-center font-display text-sm font-semibold md:text-base',
                              tier.featured && 'bg-[#8b5cf6]/[0.08] text-[#c4b5fd]'
                            )}
                          >
                            {tier.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE_ROWS.map(([label, ...values], ri) => (
                        <tr key={ri} className="border-b border-white/5 last:border-0">
                          <td className="px-5 py-4 text-sm text-white/75 md:px-7">{t(label)}</td>
                          {values.map((v, i) => (
                            <td
                              key={i}
                              className={cn(
                                'px-4 py-4 text-center',
                                TIERS[i].featured && 'bg-[#8b5cf6]/[0.08]'
                              )}
                            >
                              <CompareCell value={v} featured={TIERS[i].featured} t={t} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 py-24 text-center md:px-12 md:py-36">
          <SplitText
            as="h2"
            className="font-display text-[clamp(2.2rem,6.5vw,5rem)] font-semibold leading-[0.98]"
          >
            {t({ en: 'Still deciding?', sq: 'Ende në mëdyshje?' })}
          </SplitText>
          <FadeIn delay={0.15}>
            <p className="subtext mx-auto mt-5 max-w-md text-sm md:text-base">
              {t({
                en: "Tell us what you're building — we'll tell you exactly what it costs and how long it takes, for free.",
                sq: 'Na trego çfarë po ndërton — do të të themi saktësisht sa kushton dhe sa kohë merr, falas.',
              })}
            </p>
          </FadeIn>
          <FadeIn delay={0.3} className="mt-10">
            <a
              href={`${MAIL_BASE}${encodeURIComponent(t({ en: 'Quote request', sq: 'Kërkesë oferte' }))}`}
              data-cursor
              className="inline-flex items-center gap-3 rounded-full bg-white px-12 py-6 text-base font-medium tracking-normal text-black"
            >
              {t({ en: 'Get a free quote', sq: 'Merr një ofertë falas' })}
              <ArrowRight className="h-5 w-5" />
            </a>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-3 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>{t(COPYRIGHT)}</p>
          <Link
            href="/"
            data-cursor
            className="w-fit text-white/50 transition-colors duration-300 hover:text-white"
          >
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
