/* Detailed flat 2D graphics for the Multi-Language Websites page. */
import { ELEV_LG, ELEV_MD, HAIRLINE } from './depth';
import { useT, type Bi, type Locale } from '@/lib/i18n';
import { type ReactNode } from 'react';
import { TileIconBadge, IconSwitch, IconDictionary, IconEarth } from './StreamlineIcons';

const TITLE: Bi = { en: 'Luxury room with sea view', sq: 'Dhomë luksoze me pamje nga deti' };
const LEARN_MORE: Bi = { en: 'Learn more', sq: 'Mëso më shumë' };

const GLASS_SHADOW = '0 14px 28px -12px rgba(0,0,0,0.45)';

/** Thin blue square with a small blue square handle at each corner —
    the crop-tool selection outline reused around the title and CTA. */
function CropSquare({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative border border-blue-500 ${className}`}>
      <span className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-blue-500" />
      <span className="absolute right-0 top-0 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 bg-blue-500" />
      <span className="absolute left-0 bottom-0 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 bg-blue-500" />
      <span className="absolute right-0 bottom-0 h-1.5 w-1.5 translate-x-1/2 translate-y-1/2 bg-blue-500" />
      {children}
    </div>
  );
}

/** A single translated listing card — a real interior shot topped with a
    title and CTA — standing in for the kind of page this service turns into
    "Dhomë luksoze..." / "Luxury room..." depending on the visitor. */
function ListingCard({
  className = '',
  pillPosition = 'top',
  locale,
}: {
  className?: string;
  pillPosition?: 'top' | 'bottom-right';
  /** pins the copy to one language instead of following the site's locale toggle */
  locale?: Locale;
}) {
  const tDynamic = useT();
  const t = (bi: Bi) => (locale ? bi[locale] : tDynamic(bi));
  return (
    <div aria-hidden className={`relative w-32 md:w-40 ${className}`}>
      <div className="absolute inset-x-8 -bottom-3 h-10 rounded-full bg-black/25 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl bg-white" style={{ border: `1px solid ${HAIRLINE}`, boxShadow: ELEV_LG }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/luxury-room-sea-view.webp"
          alt="Luxury hotel room with sea view"
          draggable={false}
          className="aspect-[4/3] w-full select-none object-cover"
        />

        <div className="p-4">
          <CropSquare className="px-2.5 py-2">
            <h3 className="line-clamp-2 min-h-[2rem] font-display text-xs font-semibold leading-snug text-black">{t(TITLE)}</h3>
          </CropSquare>
          <CropSquare className="mt-1 inline-block p-1 pt-0">
            <div className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[0.45rem] font-medium text-white">
              {t(LEARN_MORE)}
            </div>
          </CropSquare>
        </div>
      </div>

      {/* glass chip — same treatment as the Business Websites hero chips —
          poking out over the image's top-left corner */}
      <div
        className="absolute -left-2 -top-2 z-10 flex items-center gap-1.5 rounded-lg border border-white/40 bg-white/15 px-2 py-1 backdrop-blur-md"
        style={{ boxShadow: GLASS_SHADOW }}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded bg-white/20 text-[0.5rem] font-bold text-white">
          {locale === 'sq' ? 'SQ' : 'EN'}
        </span>
        <span className="text-[0.5rem] font-medium tracking-wide text-white/90">
          {locale === 'sq' ? 'Shqip' : 'English'}
        </span>
      </div>

      <div
        className={
          pillPosition === 'bottom-right'
            ? 'absolute top-full right-5 z-10 mt-0.5 flex items-center gap-1 rounded-full bg-white p-1'
            : 'absolute bottom-full left-5 z-10 mb-0.5 flex items-center gap-1 rounded-full bg-white p-1'
        }
        style={{ boxShadow: ELEV_MD }}
      >
        <div className="h-5 w-5 overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/vertical-shot-beautiful-asian-woman-posing-with-headphones-around-neck-smiling-laughing-stand.webp"
            alt=""
            draggable={false}
            className="h-full w-full select-none object-cover"
          />
        </div>
        <div className="h-5 w-5 overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={locale === 'sq' ? '/images/AlbanianFlag.avif' : '/images/BritainFlag.avif'}
            alt=""
            draggable={false}
            className="h-full w-full select-none object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export function LanguageHero() {
  return (
    <div className="relative flex items-end gap-4 mt-6 md:-ml-32 md:mt-0">
      <ListingCard locale="en" />
      <ListingCard locale="sq" pillPosition="bottom-right" />

      {/* swap arrows: one arcs over the top (card 1 → card 2), the other
          arcs under the bottom (card 2 → card 1) — the two translated
          versions of the same page, flowing into each other. */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <marker id="lang-swap-arrow" viewBox="-2 -2 14 14" refX="9" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
            <path
              d="M0.5,1 L9,5 L0.5,9"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
        <path
          d="M25,-8 Q50,-30 75,-8"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#lang-swap-arrow)"
        />
        <path
          d="M75,108 Q50,130 25,108"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#lang-swap-arrow)"
        />
      </svg>
    </div>
  );
}

export function TileToggle() {
  return (
    <TileIconBadge>
      <IconSwitch />
    </TileIconBadge>
  );
}

export function TileMirror() {
  return (
    <TileIconBadge>
      <IconDictionary />
    </TileIconBadge>
  );
}

export function TileReach() {
  return (
    <TileIconBadge>
      <IconEarth />
    </TileIconBadge>
  );
}
