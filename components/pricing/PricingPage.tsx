'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useT, type Bi } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import LangToggle from '@/components/ui/LangToggle';
import Logo from '@/components/ui/Logo';
import PricingCountdown from '@/components/pricing/PricingCountdown';

const MAIL_BASE = 'mailto:hello@avenum.studio?subject=';

const BACK_LINK = { en: '← Back to the experience', sq: '← Kthehu te eksperienca' };
const OFFER_ENDS_LABEL = { en: 'Offer ends in', sq: 'Oferta përfundon në' };
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

/** 4-point spark inside each plan's gradient orb. */
function IconSpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z" />
    </svg>
  );
}

/** Big chevron watermark ghosted into each card's corner. */
function CardGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M14 6l20 18-20 18" />
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
  includes?: Bi;
  features: Bi[];
  orb: string;
  nebula: string;
}

const TIERS: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    desc: {
      en: 'A sharp, fast online presence for your business — designed, built and live in two weeks.',
      sq: 'Një prani online e shpejtë dhe e spikatur për biznesin tënd — e dizajnuar, ndërtuar dhe online brenda dy javësh.',
    },
    price: { en: '€120', sq: '€120' },
    originalPrice: { en: '€490', sq: '€490' },
    discountLabel: { en: '76% OFF', sq: '76% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Choose this plan', sq: 'Zgjidh këtë plan' },
    mailSubject: { en: 'Starter plan', sq: 'Plani Starter' },
    meta: [
      { icon: IconClock, label: { en: '2 week delivery', sq: 'Dorëzim në 2 javë' } },
      { icon: IconLayers, label: { en: 'Up to 3 pages', sq: 'Deri në 3 faqe' } },
    ],
    features: [
      { en: 'Custom design — no templates', sq: 'Dizajn i personalizuar — pa shabllone' },
      { en: 'Mobile-first & lightning fast', sq: 'Mobile-first & shpejtësi maksimale' },
      { en: 'Contact & WhatsApp integration', sq: 'Integrim kontakti & WhatsApp' },
      { en: 'SEO essentials & analytics', sq: 'Bazat e SEO & analitika' },
      { en: '1 month of free support', sq: '1 muaj mbështetje falas' },
    ],
    orb: 'linear-gradient(135deg, #5c8dff, #3fe0ff)',
    nebula:
      'linear-gradient(115deg, rgba(92,141,255,0.5), rgba(63,224,255,0.22) 45%, transparent 72%)',
  },
  {
    id: 'signature',
    name: 'Signature',
    desc: {
      en: 'The full Avenum treatment — custom design, motion and a site people actually remember.',
      sq: 'Trajtimi i plotë Avenum — dizajn i personalizuar, animacione dhe një faqe që njerëzit e mbajnë vërtet mend.',
    },
    price: { en: '€300', sq: '€300' },
    originalPrice: { en: '€1,490', sq: '€1,490' },
    discountLabel: { en: '80% OFF', sq: '80% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Choose this plan', sq: 'Zgjidh këtë plan' },
    mailSubject: { en: 'Signature plan', sq: 'Plani Signature' },
    featured: true,
    meta: [
      { icon: IconClock, label: { en: '4–6 week delivery', sq: 'Dorëzim në 4–6 javë' } },
      { icon: IconLayers, label: { en: 'Up to 10 pages', sq: 'Deri në 10 faqe' } },
    ],
    includes: { en: 'EVERYTHING IN STARTER +', sq: 'GJITHÇKA NË STARTER +' },
    features: [
      { en: 'Advanced motion & animations', sq: 'Animacione & lëvizje të avancuara' },
      { en: '3D / WebGL on request', sq: '3D / WebGL sipas kërkesës' },
      { en: 'CMS — edit content yourself', sq: 'CMS — modifiko përmbajtjen vetë' },
      { en: 'Multilingual (AL · EN · IT)', sq: 'Shumëgjuhësh (AL · EN · IT)' },
      { en: 'Booking & payment integrations', sq: 'Integrime rezervimesh & pagesash' },
      { en: '3 months of free support', sq: '3 muaj mbështetje falas' },
    ],
    orb: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
    nebula:
      'linear-gradient(115deg, rgba(139,92,246,0.55), rgba(217,70,239,0.22) 50%, transparent 75%)',
  },
  {
    id: 'partner',
    name: 'Partner',
    desc: {
      en: 'Web apps, e-commerce, AI chatbots — and a team that stays on your side after launch.',
      sq: 'Aplikacione web, e-commerce, AI chatbots — dhe një ekip që qëndron pranë teje edhe pas lançimit.',
    },
    price: { en: 'Custom', sq: 'Sipas kërkesës' },
    cta: { en: 'Contact us', sq: 'Na kontakto' },
    mailSubject: { en: 'Partner plan', sq: 'Plani Partner' },
    meta: [
      { icon: IconClock, label: { en: 'Dedicated team', sq: 'Ekip i dedikuar' } },
      { icon: IconLayers, label: { en: 'Unlimited scope', sq: 'Fushëveprim i pakufizuar' } },
    ],
    includes: { en: 'EVERYTHING IN SIGNATURE +', sq: 'GJITHÇKA NË SIGNATURE +' },
    features: [
      { en: 'Web apps & e-commerce', sq: 'Aplikacione web & e-commerce' },
      { en: 'AI chatbot for bookings', sq: 'AI chatbot për rezervime' },
      { en: 'Monthly retainer or per-project', sq: 'Pagesë mujore ose për projekt' },
      { en: 'Priority support & SLAs', sq: 'Mbështetje prioritare & SLA' },
      { en: 'Strategy, analytics & growth', sq: 'Strategji, analitika & rritje' },
    ],
    orb: 'linear-gradient(135deg, #9ca3af, #f3f4f6)',
    nebula: 'linear-gradient(115deg, rgba(255,255,255,0.16), transparent 60%)',
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
  return (
    <div className="min-h-screen overflow-x-clip bg-[#07070c] text-[#f2f4ff]">
      {/* drifting color washes + faint stars behind everything */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="svc-drift-a absolute -top-48 left-1/4 h-[36rem] w-[36rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.22), transparent 70%)' }}
        />
        <div
          className="svc-drift-b absolute -right-48 top-1/3 h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(77,107,255,0.16), transparent 70%)' }}
        />
        <div
          className="svc-drift-c absolute -bottom-48 left-10 h-[30rem] w-[30rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255,90,110,0.1), transparent 70%)' }}
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
        <Logo className="text-sm md:text-base" />
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
                      <div
                        className={cn(
                          'glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 md:p-7',
                          tier.featured ? 'bg-[#130e26]/90' : 'bg-white/[0.03]'
                        )}
                      >
                        {/* colored nebula in the card's top region */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 top-0 h-44 blur-2xl"
                          style={{ background: tier.nebula }}
                        />
                        {/* ghosted chevron watermark */}
                        <CardGlyph className="pointer-events-none absolute -right-8 -top-4 h-44 w-44 rotate-12 text-white opacity-[0.05]" />

                        {/* sharp gradient ring on the featured card */}
                        {tier.featured && (
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-3xl p-px"
                            style={{
                              background: 'linear-gradient(135deg, #a78bfa, #7c3aed 45%, #3b1d78)',
                              WebkitMask:
                                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                              WebkitMaskComposite: 'xor',
                              maskComposite: 'exclude',
                            }}
                          />
                        )}

                        <div className="relative">
                          <div className="flex items-start justify-between">
                            <span
                              className="flex h-11 w-11 items-center justify-center rounded-full text-white/90 shadow-lg"
                              style={{ background: tier.orb }}
                            >
                              <IconSpark className="h-5 w-5" />
                            </span>
                            {tier.featured && (
                              <span className="glass rounded-full px-3 py-1 text-[10px] tracking-normal text-white/85">
                                {t({ en: 'Most popular', sq: 'Më i popullarizuar' })}
                              </span>
                            )}
                          </div>

                          <h2 className="mt-5 font-display text-xl font-semibold md:text-2xl">
                            {tier.name}
                          </h2>
                          <p className="mt-2 min-h-[3.75rem] text-sm leading-relaxed text-white/60">
                            {t(tier.desc)}
                          </p>

                          <div className="mt-5">
                            {tier.originalPrice && (
                              <div className="flex items-center gap-2">
                                <span className="text-xl text-white/60 line-through">
                                  {t(tier.originalPrice)}
                                </span>
                                {tier.discountLabel && (
                                  <span className="rounded-full bg-[#f59e0b]/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#fbbf24]">
                                    {t(tier.discountLabel)}
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="font-display text-4xl font-semibold md:text-[2.6rem]">
                              {t(tier.price)}
                              {tier.per && (
                                <span className="ml-1.5 text-sm font-normal text-white/50">
                                  {t(tier.per)}
                                </span>
                              )}
                            </p>
                            {tier.originalPrice && (
                              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#fbbf24]">
                                <IconClock className="h-3.5 w-3.5" />
                                {t(OFFER_ENDS_LABEL)}
                                <PricingCountdown className="font-mono tabular-nums" />
                              </div>
                            )}
                          </div>

                          <a
                            href={`${MAIL_BASE}${encodeURIComponent(t(tier.mailSubject))}`}
                            data-cursor
                            className={cn(
                              'mt-6 block rounded-xl py-3.5 text-center text-sm font-medium tracking-normal',
                              tier.featured
                                ? 'bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#6d28d9] text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.55)]'
                                : 'border border-white/15 text-white transition-colors duration-300 hover:bg-white/10'
                            )}
                          >
                            {t(tier.cta)}
                          </a>

                          <ul className="mt-6 space-y-3">
                            {tier.meta.map((m, mi) => (
                              <li key={mi} className="flex items-center gap-3 text-sm text-white/80">
                                <m.icon className="h-[18px] w-[18px] text-white/50" />
                                {t(m.label)}
                              </li>
                            ))}
                          </ul>

                          {tier.includes ? (
                            <div className="my-5 flex items-center gap-3 text-[10px] tracking-[0.18em] text-white/35">
                              <span className="h-px flex-1 bg-white/10" />
                              {t(tier.includes)}
                              <span className="h-px flex-1 bg-white/10" />
                            </div>
                          ) : (
                            <div aria-hidden className="my-5 h-px bg-white/10" />
                          )}

                          <ul className="space-y-3">
                            {tier.features.map((f, fi) => (
                              <li key={fi} className="flex items-start gap-3 text-sm text-white/70">
                                <IconCheck
                                  className={cn(
                                    'mt-0.5 h-[18px] w-[18px] flex-shrink-0',
                                    tier.featured ? 'text-[#a78bfa]' : 'text-white/45'
                                  )}
                                />
                                {t(f)}
                              </li>
                            ))}
                          </ul>
                        </div>
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
