'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { useT, type Bi } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { SECTIONS } from '@/lib/palette';
import { NAV_SERVICES } from '@/lib/services-nav';
import Logo from '@/components/ui/Logo';

const TAGLINE: Bi = {
  en: 'A web agency in Tirana building fast, unique websites — mostly for restaurants.',
  sq: 'Një agjenci web në Tiranë që ndërton faqe të shpejta e unike — kryesisht për restorante.',
};
const SERVICES_LABEL: Bi = { en: 'Services', sq: 'Shërbimet' };
const EXPLORE_LABEL: Bi = { en: 'Explore', sq: 'Eksploro' };
const LEGAL_LABEL: Bi = { en: 'Legal', sq: 'Ligjore' };
const HOME_LABEL: Bi = { en: 'Home', sq: 'Kreu' };
const PRICING_LABEL: Bi = { en: 'Pricing', sq: 'Çmimet' };
const PRIVACY_LABEL: Bi = { en: 'Privacy Policy', sq: 'Privatësia' };
const TERMS_LABEL: Bi = { en: 'Terms of Service', sq: 'Kushtet' };
const COPYRIGHT: Bi = {
  en: '© 2026 Avenum — All rights reserved',
  sq: '© 2026 Avenum — Të gjitha të drejtat e rezervuara',
};
const PRICING_WASH = { accent: '#8b5cf6', bg: '#1c0f36' };

const workSection = SECTIONS.find((s) => s.id === 'work')!;
const aboutSection = SECTIONS.find((s) => s.id === 'about')!;
const contactSection = SECTIONS.find((s) => s.id === 'contact')!;

/** Full site footer — every service, every main section, legal pages — capped
 *  with a full-bleed wordmark. `theme="dark"` for the site's dark pages
 *  (home, pricing, chatbots); default "light" for the white ones. */
export default function Footer({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const t = useT();
  const pageNavigate = useStore((s) => s.pageNavigate);
  const dark = theme === 'dark';

  const goHash = (id: string, accent: string, bg: string) => {
    pageNavigate(`/#${id}`, { accent, bg });
  };

  const linkClass = cn(
    'text-xs transition-colors duration-300',
    dark ? 'text-white/60 hover:text-white' : 'text-black/70 hover:text-black'
  );

  return (
    <footer
      className={cn(
        'relative overflow-hidden border-t',
        dark ? 'border-white/10 bg-black text-white' : 'border-black/10 bg-white text-black'
      )}
    >
      <div className="mx-auto grid w-full max-w-[90rem] gap-10 px-6 pt-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-6 md:px-12">
        <div className="max-w-xs">
          <Logo className={cn('text-3xl', dark && 'text-white')} />
          <p className={cn('mt-4 text-sm leading-relaxed', dark ? 'text-white/55' : 'text-black/55')}>
            {t(TAGLINE)}
          </p>
        </div>

        <div>
          <h3 className={cn('text-xs font-semibold uppercase tracking-wide', dark ? 'text-white/40' : 'text-black/40')}>
            {t(SERVICES_LABEL)}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {NAV_SERVICES.map((svc) => (
              <li key={svc.href}>
                <Link
                  href={svc.href}
                  data-cursor
                  onClick={(e) => {
                    e.preventDefault();
                    pageNavigate(svc.href, { accent: svc.accent, bg: '#0b0a16' });
                  }}
                  className={linkClass}
                >
                  {t(svc.title)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={cn('text-xs font-semibold uppercase tracking-wide', dark ? 'text-white/40' : 'text-black/40')}>
            {t(EXPLORE_LABEL)}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <Link href="/" data-cursor className={linkClass}>
                {t(HOME_LABEL)}
              </Link>
            </li>
            <li>
              <Link
                href="/#work"
                data-cursor
                onClick={(e) => {
                  e.preventDefault();
                  goHash(workSection.id, workSection.accent, workSection.bg);
                }}
                className={linkClass}
              >
                {t(workSection.label)}
              </Link>
            </li>
            <li>
              <Link href="/about" data-cursor className={linkClass}>
                {t(aboutSection.label)}
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                data-cursor
                onClick={(e) => {
                  e.preventDefault();
                  goHash(contactSection.id, contactSection.accent, contactSection.bg);
                }}
                className={linkClass}
              >
                {t(contactSection.label)}
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                data-cursor
                onClick={(e) => {
                  e.preventDefault();
                  pageNavigate('/pricing', PRICING_WASH);
                }}
                className={linkClass}
              >
                {t(PRICING_LABEL)}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={cn('text-xs font-semibold uppercase tracking-wide', dark ? 'text-white/40' : 'text-black/40')}>
            {t(LEGAL_LABEL)}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <Link href="/privacy-policy" data-cursor className={linkClass}>
                {t(PRIVACY_LABEL)}
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" data-cursor className={linkClass}>
                {t(TERMS_LABEL)}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={cn('mt-12 border-t px-6 py-6 md:px-12', dark ? 'border-white/10' : 'border-black/10')}>
        <p className={cn('mx-auto w-full max-w-[90rem] text-xs tracking-normal', dark ? 'text-white/50' : 'text-black/50')}>
          {t(COPYRIGHT)}
        </p>
      </div>

      {/* full-bleed wordmark — textLength forces it to exactly the SVG's
          width, so it always spans edge-to-edge regardless of font metrics */}
      <div aria-hidden className="w-full select-none">
        <svg viewBox="0 0 1000 170" preserveAspectRatio="none" className="block h-auto w-full">
          <defs>
            <linearGradient id="avenum-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="85%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="140"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-display)"
            fontWeight="700"
            fontSize="150"
            fill="url(#avenum-fade)"
          >
            AVENUM
          </text>
        </svg>
      </div>
    </footer>
  );
}
