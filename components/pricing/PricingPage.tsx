'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useT, type Bi } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ClipRevealImage from '@/components/ui/ClipRevealImage';
import ArrowRight from '@/components/ui/ArrowRight';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';


/* ---- tiny inline icons ---- */

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
  featured?: boolean;
  meta: Array<{ icon: (p: { className?: string }) => JSX.Element; label: Bi }>;
  features: Bi[];
  /** Simple (add-on) cards only: an inline "Learn more" link after the
   *  description, pointing to that service's own standalone page. */
  learnMoreHref?: string;
}

const TIERS: Tier[] = [
  {
    id: 'starter',
    name: 'Avenum Basic',
    desc: {
      en: 'A custom website, live in two weeks.',
      sq: 'Një website i personalizuar, online brenda dy javësh.',
    },
    price: { en: '€200', sq: '€200' },
    originalPrice: { en: '€500', sq: '€500' },
    discountLabel: { en: '60% OFF', sq: '60% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Choose this plan', sq: 'Zgjidh këtë plan' },
    meta: [
      { icon: IconLayers, label: { en: 'Up to 3 pages', sq: 'Deri në 3 faqe' } },
    ],
    features: [
      { en: 'Custom design, not a template', sq: 'Dizajn i personalizuar, jo shabllon' },
      { en: 'Looks great on every phone & is fast', sq: 'Duket shkëlqyeshëm në telefon & është e shpejtë' },
      { en: 'Direct WhatsApp button for orders', sq: 'Buton direkt në WhatsApp për porosi' },
      { en: 'Photos & menu presented professionally', sq: 'Foto & menu të vendosura në mënyrë profesionale' },
      { en: 'Ready for Google (basic SEO)', sq: 'E gatshme për Google (SEO bazë)' },
      { en: '1 month of free support', sq: '1 muaj mbështetje falas' },
    ],
  },
  {
    id: 'signature',
    name: 'Avenum Pro',
    desc: {
      en: 'Custom design, animations and a memorable site.',
      sq: 'Dizajn i personalizuar, animacione dhe një faqe e paharrueshme.',
    },
    price: { en: '€400', sq: '€400' },
    originalPrice: { en: '€1,000', sq: '€1,000' },
    discountLabel: { en: '60% OFF', sq: '60% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Choose this plan', sq: 'Zgjidh këtë plan' },
    featured: true,
    meta: [
      { icon: IconLayers, label: { en: 'Up to 10 pages', sq: 'Deri në 10 faqe' } },
    ],
    features: [
      { en: 'Custom design plus modern animations', sq: 'Dizajn i personalizuar plus animacione moderne' },
      { en: 'Edit your own text & photos, no code needed', sq: 'Modifiko vetë tekstin & foton, pa kod' },
      { en: 'Multilingual (Albanian · English · Italian)', sq: 'Shumëgjuhësh (Shqip · Anglisht · Italisht)' },
      { en: 'Online reservations & payments', sq: 'Rezervime & pagesa online' },
      { en: 'Advanced SEO — get found on Google', sq: 'SEO i avancuar — të gjejnë klientët në Google' },
      { en: '3 months of free support', sq: '3 muaj mbështetje falas' },
    ],
  },
  {
    id: 'partner',
    name: 'Avenum Ultra',
    desc: {
      en: 'Web apps, e-commerce and AI chatbots.',
      sq: 'Aplikacione web, e-commerce dhe AI chatbots.',
    },
    price: { en: '€800', sq: '€800' },
    originalPrice: { en: '€2,000', sq: '€2,000' },
    discountLabel: { en: '60% OFF', sq: '60% ZBRITJE' },
    cta: { en: 'Contact us', sq: 'Na kontakto' },
    meta: [
      { icon: IconClock, label: { en: 'Dedicated team', sq: 'Ekip i dedikuar' } },
      { icon: IconLayers, label: { en: 'Unlimited scope', sq: 'Fushëveprim i pakufizuar' } },
    ],
    features: [
      { en: 'Web apps & online store (e-commerce)', sq: 'Aplikacione web & dyqan online (e-commerce)' },
      { en: 'AI chatbot that takes reservations for you', sq: 'AI Chatbot që merr rezervimet për ty' },
      { en: 'Monthly payment or per-project, your choice', sq: 'Pagesë mujore ose për projekt, si të duash' },
      { en: 'Priority support, always available', sq: 'Mbështetje prioritare, gjithmonë e disponueshme' },
      { en: 'We look at your site and tell you what will bring more customers', sq: 'Shohim faqen tënde dhe të themi çfarë do të sjellë më shumë klientë' },
      { en: 'We plan first, so nothing is wasted', sq: 'Planifikojmë para se të ndërtojmë, pa asgjë të humbur' },
    ],
  },
];

interface AgencyComparisonCard {
  title: Bi;
  body: Bi;
}

const AGENCY_COMPARISON: AgencyComparisonCard[] = [
  {
    title: { en: '100% custom design, not templates', sq: 'Dizajn 100% i personalizuar, jo shabllon' },
    body: {
      en: "Other agencies in Albania reuse the same templates for every client. We design every site from scratch, built around your brand.",
      sq: 'Agjenci të tjera në Shqipëri riciklojnë të njëjtat shabllone për çdo klient. Ne dizajnojmë çdo faqe nga e para, ndërtuar rreth markës tënde.',
    },
  },
  {
    title: { en: 'One clear price. No surprises.', sq: 'Një çmim i qartë. Pa surpriza.' },
    body: {
      en: "No vague quotes, no hidden fees that show up after you've paid. You know the full cost before we start.",
      sq: 'Pa oferta të paqarta, pa kosto të fshehura që dalin pasi ke paguar. E di koston e plotë para se të fillojmë.',
    },
  },
  {
    title: { en: 'Live in as little as two weeks', sq: 'Online brenda vetëm dy javësh' },
    body: {
      en: 'No months of delays or radio silence. Your dedicated team moves fast and keeps you updated the whole way.',
      sq: 'Pa muaj vonesa apo heshtje. Ekipi yt i dedikuar lëviz shpejt dhe të mban të informuar gjatë gjithë kohës.',
    },
  },
  {
    title: { en: 'Real support after launch', sq: 'Marrëdhënie afatgjatë' },
    body: {
      en: 'Most agencies disappear the moment you pay. We stay reachable — real people, real answers, whenever you need us.',
      sq: 'Shumica e agjencive zhduken sapo paguan. Ne mbetemi të gatshëm — njerëz realë, përgjigje reale, kurdo që na duhesh.',
    },
  },
];

const SERVICES_HEADING: Bi = {
  en: 'Want to make your business even stronger?',
  sq: 'Dëshiron ta bësh biznesin edhe më të fuqishëm?',
};

/** Standalone add-ons, sold on top of any plan above — same `Tier` shape
 *  (and the same card design) as the three main plans, just without the
 *  "most popular" raised treatment. */
const OTHER_SERVICES: Tier[] = [
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    desc: {
      en: 'Answers guests and books tables 24/7, in any language.',
      sq: 'U përgjigjet mysafirëve dhe rezervon tavolina 24/7, në çdo gjuhë.',
    },
    learnMoreHref: '/ai-chatbots',
    price: { en: '€150', sq: '€150' },
    originalPrice: { en: '€375', sq: '€375' },
    discountLabel: { en: '60% OFF', sq: '60% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Add to my site', sq: 'Shtoje në faqe' },
    meta: [{ icon: IconClock, label: { en: 'Live in a few days', sq: 'Gati brenda pak ditësh' } }],
    features: [
      { en: 'Trained on your menu, prices and hours', sq: 'I trajnuar me menunë, çmimet dhe orarin tënd' },
      { en: 'Books tables and takes orders on its own', sq: 'Rezervon tavolina dhe merr porosi vetë' },
      { en: 'Speaks Albanian, English and Italian', sq: 'Flet shqip, anglisht dhe italisht' },
      { en: 'Works on WhatsApp and your website', sq: 'Punon në WhatsApp dhe në faqen tënde' },
    ],
  },
  {
    id: 'seo',
    name: 'SEO Boost',
    desc: {
      en: 'Get found on Google and turn visits into customers.',
      sq: 'Gjendu në Google dhe kthe vizitorët në klientë.',
    },
    price: { en: '€120', sq: '€120' },
    originalPrice: { en: '€300', sq: '€300' },
    discountLabel: { en: '60% OFF', sq: '60% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Add to my site', sq: 'Shtoje në faqe' },
    meta: [{ icon: IconLayers, label: { en: 'Full-site optimization', sq: 'Optimizim i gjithë faqes' } }],
    features: [
      { en: 'Keyword research for your city and niche', sq: 'Kërkim fjalësh kyçe për qytetin dhe fushën tënde' },
      { en: 'Google Business profile set up properly', sq: 'Profili Google Business i konfiguruar si duhet' },
      { en: 'Faster load times, better rankings', sq: 'Ngarkim më i shpejtë, renditje më e mirë' },
      { en: 'Monthly report on where you rank', sq: 'Raport mujor mbi renditjen tënde' },
    ],
  },
  {
    id: 'booking',
    name: 'Booking System',
    desc: {
      en: 'Let customers book straight from your site.',
      sq: 'Klientët rezervojnë drejtpërdrejt nga faqja jote.',
    },
    price: { en: '€100', sq: '€100' },
    originalPrice: { en: '€250', sq: '€250' },
    discountLabel: { en: '60% OFF', sq: '60% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Add to my site', sq: 'Shtoje në faqe' },
    meta: [{ icon: IconClock, label: { en: 'Real-time availability', sq: 'Disponueshmëri në kohë reale' } }],
    features: [
      { en: 'Customers pick a date and time themselves', sq: 'Klientët zgjedhin vetë datën dhe orën' },
      { en: 'Automatic confirmation by SMS or WhatsApp', sq: 'Konfirmim automatik me SMS ose WhatsApp' },
      { en: 'No more double-bookings', sq: 'Pa më dy rezervime njëkohësisht' },
      { en: 'Synced to your own calendar', sq: 'Sinkronizuar me kalendarin tënd' },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics & CRM',
    desc: {
      en: "See what's working and stay close to every customer.",
      sq: 'Shiko çfarë funksionon dhe qëndro afër çdo klienti.',
    },
    price: { en: '€90', sq: '€90' },
    originalPrice: { en: '€225', sq: '€225' },
    discountLabel: { en: '60% OFF', sq: '60% ZBRITJE' },
    per: { en: '/ project', sq: '/ projekt' },
    cta: { en: 'Add to my site', sq: 'Shtoje në faqe' },
    meta: [{ icon: IconLayers, label: { en: 'One dashboard for everything', sq: 'Një panel për gjithçka' } }],
    features: [
      { en: 'See exactly where visitors come from', sq: 'Shiko saktësisht nga vijnë vizitorët' },
      { en: 'Every customer saved in one place', sq: 'Çdo klient i ruajtur në një vend' },
      { en: 'Follow-up reminders so no lead is lost', sq: 'Kujtesa ndjekjeje që asnjë klient të mos humbasë' },
      { en: 'Simple reports, no spreadsheets needed', sq: 'Raporte të thjeshta, pa nevojë për excel' },
    ],
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

/** Real, live client sites — social proof, not another pricing tier, so
 *  each card links straight out to the site itself. Paths are
 *  percent-encoded because the logo files' own names carry spaces and
 *  parentheses. */
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

/** Meta list + divider + feature checklist — shared by every tier card, always black-on-white.
 *  The Starter tier's checkmarks are dark gray instead of the brand purple used elsewhere. */
function TierMetaFeatures({ tier, t }: { tier: Tier; t: (bi: Bi) => string }) {
  const isPlanTier = tier.id === 'starter' || tier.id === 'signature' || tier.id === 'partner';
  const checkColor = tier.id === 'starter' ? '#4B5563' : isPlanTier ? '#6439FF' : '#000000';
  const checkColorClass = tier.id === 'starter' ? 'text-[#4B5563]' : isPlanTier ? 'text-[#6439FF]' : 'text-black';
  return (
    <>
      <ul className="space-y-3">
        {tier.meta.map((m, mi) => (
          <li key={mi} className="flex items-center gap-3 text-sm text-[#0A2947]">
            <m.icon className={cn('h-[18px] w-[18px]', checkColorClass)} />
            {t(m.label)}
          </li>
        ))}
      </ul>

      <ul className="mt-5 space-y-3">
        {tier.features.map((f, fi) => (
          <li key={fi} className="flex items-start gap-3 text-sm text-[#0A2947]">
            <span
              className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
              style={{ background: `color-mix(in srgb, ${checkColor} 25%, white)` }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={checkColor}
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

interface CardAccent {
  border: string;
  shadow: string;
  button: string;
}

const ACCENT_BLACK: CardAccent = {
  border: 'border-black',
  shadow: 'shadow-[6px_6px_0_0_#000]',
  button: 'bg-black hover:bg-black/85',
};
const ACCENT_PURPLE: CardAccent = {
  border: 'border-[#6367FF]',
  shadow: 'shadow-[6px_6px_0_0_#6367FF]',
  button: 'bg-[#6367FF] hover:bg-[#4f52e0]',
};
/** Same black CTA as ACCENT_BLACK, but flat — border only, no hard shadow.
 *  Used for the "other services" add-ons, which sit a step below the main
 *  plans and shouldn't compete with their 3D-pill treatment. */
const ACCENT_BLACK_FLAT: CardAccent = {
  border: 'border-black',
  shadow: '',
  button: 'bg-black hover:bg-black/85',
};

/** One pricing/service card — title pill, price (with an optional
 *  struck-through original), a slide-to-confirm CTA on mobile and a plain
 *  button on desktop, then the meta/feature checklist. Shared by the three
 *  main plans and the "other services" add-ons below them, so both grids
 *  render identically and only the color accent and data differ. */
function TierCard({
  tier,
  t,
  accent,
  raised,
  simple,
  bgClassName = 'bg-[#F3F4F4]',
  badge,
}: {
  tier: Tier;
  t: (bi: Bi) => string;
  accent: CardAccent;
  raised?: boolean;
  /** Add-on cards: a plain description instead of the feature checklist,
   *  and a normal button — no slide-to-confirm, no arrow — at every size. */
  simple?: boolean;
  bgClassName?: string;
  /** Pill straddling the card's top-left border — half in, half out. */
  badge?: Bi;
}) {
  // No card slides anymore: mobile and desktop both get the same plain
  // click button, with no arrow either way.
  return (
    <li className={cn('min-w-0', raised && 'md:-my-5')}>
      <div className="h-full">
        <div className="relative h-full">
          {badge && (
            <span className="absolute left-6 top-0 z-10 -translate-y-1/2 rounded-full bg-[#6367FF] px-5 py-2.5 font-display text-sm font-semibold tracking-normal text-white md:px-4 md:py-2 md:text-xs">
              {t(badge)}
            </span>
          )}
          <div className={cn('relative flex h-full flex-col overflow-hidden rounded-3xl border-2', bgClassName, accent.border, accent.shadow)}>
            <div className={cn('flex flex-1 flex-col p-6 md:p-7', simple && 'min-h-[380px] md:min-h-[440px]')}>
              <div className="flex w-full items-center justify-center">
                <h2 className="inline-flex w-fit items-center rounded-full px-4 py-1.5 text-center font-display text-2xl font-semibold text-black md:text-3xl">
                  {tier.name}
                </h2>
              </div>

              <div className="mt-3 flex items-baseline justify-center gap-2">
                <p className="font-display text-5xl font-bold text-black md:text-6xl">{t(tier.price)}</p>
                {tier.originalPrice && (
                  <p className="relative inline-block font-display text-2xl text-[#6B7280] before:absolute before:left-0 before:top-1/2 before:h-[2px] before:w-full before:-translate-y-1/2 before:-rotate-[14deg] before:bg-[#6B7280] before:content-[''] md:text-3xl">
                    {t(tier.originalPrice)}
                  </p>
                )}
              </div>

              {simple && (
                <p className="mt-auto text-center text-base leading-relaxed text-black md:text-lg">
                  {t(tier.desc)}
                  {tier.learnMoreHref && (
                    <>
                      {' '}
                      <Link
                        href={tier.learnMoreHref}
                        data-cursor
                        className="font-medium text-[#6367FF] underline-offset-2 hover:underline"
                      >
                        {t({ en: 'Learn more', sq: 'Mëso më shumë' })}
                      </Link>
                    </>
                  )}
                </p>
              )}

              <a
                href={whatsappHref(WA_MESSAGE)}
                data-cursor
                className={cn(
                  'flex items-center justify-center gap-0.5 rounded-full py-2.5 text-center font-display text-base font-medium tracking-normal text-white transition-colors duration-300',
                  simple ? 'mt-4' : 'mt-6',
                  accent.button
                )}
              >
                {t(tier.cta)}
              </a>

              {!simple && (
                <div className="mt-6">
                  <TierMetaFeatures tier={tier} t={t} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function PricingPage() {
  const t = useT();

  return (
    <div className="isolate min-h-screen overflow-x-clip bg-white text-[#061E29]">
      <Nav />

      <main>
        {/* hero */}
        <section className="relative px-6 pt-40 text-left md:px-12 md:pt-28">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-3xl">
              <SplitText
                as="h1"
                delay={0.15}
                animate
                className="font-display text-[clamp(3.2rem,9vw,4.8rem)] font-semibold leading-[0.98] [text-wrap:balance]"
              >
                {t({
                  en: 'Try it free for 7 days, then tell us what you think.',
                  sq: 'Shijo falas për 7 ditë, pastaj na thuaj.',
                })}
              </SplitText>
            </div>
          </div>
        </section>

        {/* plan cards */}
        <section className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <ul className="grid gap-10 md:grid-cols-3 md:items-stretch md:gap-6">
              {TIERS.map((tier) => (
                <TierCard
                  key={tier.id}
                  tier={tier}
                  t={t}
                  raised={tier.featured}
                  accent={tier.id === 'signature' || tier.id === 'partner' ? ACCENT_PURPLE : ACCENT_BLACK}
                  bgClassName={tier.id === 'signature' ? 'bg-[#EEF0FF]' : undefined}
                  badge={tier.id === 'signature' ? { en: 'WOW choice!!', sq: 'Zgjedhja WOW!!' } : undefined}
                />
              ))}
            </ul>

            <FadeIn delay={0.2}>
              <p className="mt-10 text-center text-xs text-black/40">
                {t({
                  en: 'Prices in EUR for the Albanian market · pay in euro or lekë · installments available · VAT not included',
                  sq: 'Çmimet në EUR për tregun shqiptar · paguaj në euro ose lekë · me këste · TVSH-ja nuk përfshihet',
                })}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* other services — same card design as the plans above, sold as
            standalone add-ons rather than a full website package. */}
        <section className="relative px-6 pb-16 md:px-12 md:pb-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-10 text-center md:mb-14">
              <SplitText
                as="h2"
                className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[0.98]"
              >
                {t(SERVICES_HEADING)}
              </SplitText>
            </div>

            <ul className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {OTHER_SERVICES.map((service) => (
                <TierCard key={service.id} tier={service} t={t} accent={ACCENT_BLACK_FLAT} simple />
              ))}
            </ul>
          </div>
        </section>

        {/* our partners — real, live client sites */}
        <section className="relative bg-[#DEDFE1] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-10 text-center md:mb-14">
              <SplitText
                as="h2"
                className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[0.98]"
              >
                {t(PARTNERS_HEADING)}
              </SplitText>
            </div>

            <ul className="grid items-stretch gap-6 md:grid-cols-3">
              {PARTNERS.map((partner) => (
                <li key={partner.name} className="min-w-0">
                  <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white">
                    <div className="p-4">
                      <div className="flex items-center justify-center gap-4 rounded-2xl bg-black px-6 py-12">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={partner.logo}
                          alt=""
                          className={cn('h-14 w-auto object-contain', partner.logoFilter)}
                        />
                        <p className="font-display text-4xl font-semibold text-white">{partner.name}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
                      <p className="font-display text-lg font-medium text-black/70">{t(partner.category)}</p>
                      <a
                        href={partner.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="inline-flex items-center gap-1.5 font-display text-base font-medium tracking-normal text-black underline underline-offset-4 transition-colors duration-300 hover:text-black/70"
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

        {/* why this investment — us vs. typical agencies in Albania */}
        <section className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-10 text-center md:mb-14">
              <SplitText
                as="h2"
                className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[0.98]"
              >
                {t({ en: 'Why this investment is the best choice.', sq: 'Pse ky investim është zgjedhja më e mirë.' })}
              </SplitText>
            </div>

            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="overflow-hidden border border-black/10">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* card 1 */}
                    <div className="border-b border-black/10 bg-[#F3F4F4] p-8 md:border-r md:p-10">
                      <h3 className="font-display text-2xl font-semibold leading-tight text-[#061E29] md:text-3xl">
                        {t(AGENCY_COMPARISON[0].title)}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-black/60 md:text-lg">
                        {t(AGENCY_COMPARISON[0].body)}
                      </p>
                    </div>

                    {/* image */}
                    <div className="min-h-[220px] overflow-hidden border-b border-black/10 md:border-r">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/pricing-image.webp" alt="" className="h-full w-full object-cover" />
                    </div>

                    {/* card 2 */}
                    <div className="border-b border-black/10 bg-[#F3F4F4] p-8 md:p-10">
                      <h3 className="font-display text-2xl font-semibold leading-tight text-[#061E29] md:text-3xl">
                        {t(AGENCY_COMPARISON[1].title)}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-black/60 md:text-lg">
                        {t(AGENCY_COMPARISON[1].body)}
                      </p>
                    </div>

                    {/* card 3 — wide */}
                    <div className="border-b border-black/10 bg-[#F3F4F4] p-8 md:col-span-2 md:border-b-0 md:border-r md:p-10">
                      <h3 className="font-display text-2xl font-semibold leading-tight text-[#061E29] md:text-3xl">
                        {t(AGENCY_COMPARISON[2].title)}
                      </h3>
                      <p className="mt-4 max-w-lg text-base leading-relaxed text-black/60 md:text-lg">
                        {t(AGENCY_COMPARISON[2].body)}
                      </p>
                    </div>

                    {/* card 4 — highlighted */}
                    <div
                      className="bg-[#F3F4F4] p-8 md:p-10"
                      style={{
                        backgroundImage:
                          'radial-gradient(130% 130% at 100% 100%, rgba(99,103,255,0.18), transparent 60%)',
                      }}
                    >
                      <h3 className="font-display text-2xl font-semibold leading-tight text-[#061E29] md:text-3xl">
                        {t(AGENCY_COMPARISON[3].title)}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
                        {t(AGENCY_COMPARISON[3].body)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA — flat background (no gradient); image right / content left
            on desktop, image before the heading on mobile. */}
        <section className="relative px-6 py-24 md:px-12 md:py-36">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 text-center md:grid-cols-2 md:gap-16 md:text-left">
            <div className="order-2 md:order-1">
              <SplitText
                as="h2"
                className="font-display text-[clamp(2.2rem,6.5vw,5rem)] font-semibold leading-[0.98]"
              >
                {t({ en: 'Get a clear answer before you commit.', sq: 'Merr një përgjigje të qartë para se të vendosësh.' })}
              </SplitText>
              <FadeIn delay={0.15}>
                <p className="mx-auto mt-5 max-w-md text-sm text-black/70 md:mx-0 md:text-base">
                  {t({
                    en: "Tell us what you're building — we'll tell you exactly what it costs and how long it takes, for free.",
                    sq: 'Na trego çfarë po ndërton — do të të themi saktësisht sa kushton dhe sa kohë merr, falas.',
                  })}
                </p>
              </FadeIn>
              <FadeIn delay={0.3} className="mt-10 flex justify-center md:justify-start">
                <a
                  href={whatsappHref(WA_MESSAGE)}
                  data-cursor
                  className="inline-flex items-center gap-0.5 rounded-full bg-[#6367FF] px-6 py-2.5 font-display text-base font-medium tracking-normal text-white transition-colors duration-300 hover:bg-[#4f52e0]"
                >
                  {t({ en: 'Get a free quote', sq: 'Merr një ofertë falas' })}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </FadeIn>
            </div>

            <div className="order-1 max-md:-mx-6 md:order-2">
              <ClipRevealImage
                src="/images/payment-image.webp"
                className="rounded-2xl max-md:rounded-none md:rounded-lg md:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#6439FF]/[0.05]" />
              </ClipRevealImage>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay"
      />
    </div>
  );
}
