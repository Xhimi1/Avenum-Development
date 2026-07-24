'use client';

import Link from 'next/link';
import { type CSSProperties, type ReactNode } from 'react';
import { useT, type Bi } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import LangToggle from '@/components/ui/LangToggle';
import Logo from '@/components/ui/Logo';
import AuroraBackdrop from './graphics/AuroraBackdrop';
import { whatsappHref } from '@/lib/contact';

export interface ServiceTile {
  graphic: ReactNode;
  title: Bi;
}

interface ServicePageProps {
  /** drives every accent touch through --svc-accent */
  accent: string;
  /** second hue for gradients */
  accent2: string;
  /** paint the hero with the animated chatbot gradient instead of white */
  vividHero?: boolean;
  heading: Bi;
  subheading: Bi;
  ctaLabel: Bi;
  heroGraphic: ReactNode;
  showcaseHeading: Bi;
  tiles: ServiceTile[];
  ctaHeading: Bi;
  mailSubject: Bi;
}

const BACK_LINK = { en: '← Back', sq: '← Kthehu' };
const COPYRIGHT = {
  en: '© 2026 Avenum — All rights reserved',
  sq: '© 2026 Avenum — Të gjitha të drejtat e rezervuara',
};

/**
 * Shared skeleton for every service page: hero (heading · subheading · CTA ·
 * graphic) → graphic showcase → closing CTA. Deliberately light on copy —
 * the 2D graphics carry the page, the words just label them.
 */
export default function ServicePage({
  accent,
  accent2,
  vividHero = false,
  heading,
  subheading,
  ctaLabel,
  heroGraphic,
  showcaseHeading,
  tiles,
  ctaHeading,
  mailSubject,
}: ServicePageProps) {
  const t = useT();
  const waLink = whatsappHref(t(mailSubject));
  const accentVar = {
    '--svc-accent': accent,
    '--svc-accent2': accent2,
  } as CSSProperties;

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]" style={accentVar}>
      {!vividHero && <AuroraBackdrop accent={accent} accent2={accent2} />}

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Logo className="text-3xl md:text-4xl" />
        <div className="flex items-center gap-4">
          <Link href="/" data-cursor className={vividHero ? 'text-xs text-white' : 'text-xs text-black'}>
            {t(BACK_LINK)}
          </Link>
          <LangToggle light={!vividHero} />
        </div>
      </header>

      <main>
        {/* hero */}
        <section
          className={`relative flex min-h-dvh items-center overflow-hidden pt-28 pb-20 md:pt-32 ${
            vividHero ? 'text-white' : ''
          }`}
          style={
            vividHero
              ? {
                  backgroundImage:
                    'radial-gradient(120% 120% at 15% 12%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 42%), linear-gradient(140deg, #2BB8F0 0%, #7A3CE0 50%, #FF6FA5 100%)',
                }
              : undefined
          }
        >
          {vividHero && (
            <span aria-hidden className="pointer-events-none absolute inset-0 z-0">
              <span
                className="chatbot-blob chatbot-blob-1"
                style={{ left: '-14%', top: '-18%', background: 'radial-gradient(circle at center, #5FD2FF 0%, rgba(95,210,255,0) 62%)' }}
              />
              <span
                className="chatbot-blob chatbot-blob-2"
                style={{ right: '-16%', top: '-10%', background: 'radial-gradient(circle at center, #FF64A6 0%, rgba(255,100,166,0) 62%)' }}
              />
              <span
                className="chatbot-blob chatbot-blob-3"
                style={{ left: '8%', bottom: '-24%', background: 'radial-gradient(circle at center, #A57BFF 0%, rgba(165,123,255,0) 62%)' }}
              />
            </span>
          )}

          <div className="relative z-10 mx-auto grid w-full max-w-[90rem] items-center gap-14 px-6 md:grid-cols-2 md:gap-10 md:px-12">
            <div className="max-w-xl">
              <SplitText
                as="h1"
                delay={0.15}
                className="font-display text-[clamp(2.3rem,5.5vw,4.2rem)] font-semibold leading-[0.98] tracking-normal"
              >
                {t(heading)}
              </SplitText>
              <FadeIn delay={0.35}>
                <p
                  className={`mt-6 max-w-md text-base tracking-normal md:text-lg ${
                    vividHero ? 'text-white' : 'text-black'
                  }`}
                >
                  {t(subheading)}
                </p>
              </FadeIn>

              <FadeIn delay={0.5} className="mt-10">
                <a
                  href={waLink}
                  data-cursor
                  className={`group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-normal transition-transform duration-300 hover:-translate-y-0.5 ${
                    vividHero
                      ? 'bg-white text-black shadow-lg'
                      : 'bg-gradient-to-r from-[var(--svc-accent)] to-[var(--svc-accent2)] text-white shadow-lg'
                  }`}
                >
                  {t(ctaLabel)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </FadeIn>
            </div>

            <FadeIn delay={0.3} className="flex justify-center md:justify-end">
              {heroGraphic}
            </FadeIn>
          </div>
        </section>

        {/* graphic showcase — the labels stay short on purpose */}
        <section className="relative py-24 md:py-36">
          <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <SplitText
              as="h2"
              className="max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[1] tracking-normal"
            >
              {t(showcaseHeading)}
            </SplitText>

            <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-7">
              {tiles.map((tile, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group flex h-full flex-col items-center rounded-3xl border border-black/[0.07] bg-white p-8 text-center shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-28px_rgba(0,0,0,0.4)]">
                    <div className="flex h-44 w-full items-center justify-center">{tile.graphic}</div>
                    <h3 className="mt-7 font-display text-xl font-semibold tracking-normal md:text-2xl">
                      {t(tile.title)}
                    </h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* closing CTA */}
        <section className="relative py-28 md:py-40">
          <div className="mx-auto w-full max-w-[90rem] px-6 text-center md:px-12">
            <SplitText
              as="h2"
              className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[1] tracking-normal"
            >
              {t(ctaHeading)}
            </SplitText>
            <FadeIn delay={0.3} className="mt-10">
              <a
                href={waLink}
                data-cursor
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--svc-accent)] to-[var(--svc-accent2)] px-11 py-5 text-base font-medium tracking-normal text-white shadow-xl transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t(ctaLabel)}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-4 text-xs tracking-normal text-black md:flex-row md:items-center md:justify-between">
          <p>{t(COPYRIGHT)}</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" data-cursor className="transition-colors duration-300 hover:text-black/70">
              {t({ en: 'Privacy Policy', sq: 'Privatësia' })}
            </Link>
            <Link href="/terms-of-service" data-cursor className="transition-colors duration-300 hover:text-black/70">
              {t({ en: 'Terms of Service', sq: 'Kushtet' })}
            </Link>
          </div>
          <Link href="/" data-cursor className="w-fit text-black">
            avenum.website
          </Link>
        </div>
      </footer>
    </div>
  );
}
