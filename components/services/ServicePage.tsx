'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { useT, type Bi } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import Nav from '@/components/ui/Nav';
import OtherServices from './OtherServices';
import Footer from '@/components/ui/Footer';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

export interface ServiceTile {
  graphic: ReactNode;
  title: Bi;
  subtitle: Bi;
}

interface ServicePageProps {
  /** this page's own route, so "Other Services" can exclude it */
  currentHref: string;
  /** drives every accent touch through --svc-accent */
  accent: string;
  /** second hue for gradients */
  accent2: string;
  /** three-stop CSS gradient painted behind the hero (in this page's palette) */
  heroGradient: string;
  /** three colors for the slowly-drifting hero blobs */
  heroBlobs: [string, string, string];
  /** short service name, shown as a pill above the heading */
  eyebrow: Bi;
  heading: Bi;
  subheading: Bi;
  ctaLabel: Bi;
  heroGraphic: ReactNode;
  showcaseHeading: Bi;
  tiles: ServiceTile[];
  ctaHeading: Bi;
}

/**
 * Shared skeleton for every service page: hero (heading · subheading · CTA ·
 * graphic) → graphic showcase → closing CTA. Deliberately light on copy —
 * the 2D graphics carry the page, the words just label them.
 */
export default function ServicePage({
  currentHref,
  accent,
  accent2,
  heroGradient,
  heroBlobs,
  eyebrow,
  heading,
  subheading,
  ctaLabel,
  heroGraphic,
  showcaseHeading,
  tiles,
  ctaHeading,
}: ServicePageProps) {
  const t = useT();
  const waLink = whatsappHref(WA_MESSAGE);
  const accentVar = {
    '--svc-accent': accent,
    '--svc-accent2': accent2,
  } as CSSProperties;

  const blob = (c: string) => `radial-gradient(circle at center, ${c} 0%, ${c}00 62%)`;

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]" style={accentVar}>
      <Nav />

      <main>
        {/* hero — vivid animated gradient in this page's palette */}
        <section
          className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-32 text-white md:pb-40 md:pt-32"
          style={{
            backgroundImage: `radial-gradient(120% 120% at 15% 12%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 42%), ${heroGradient}`,
          }}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <span className="chatbot-blob chatbot-blob-1" style={{ left: '-14%', top: '-18%', background: blob(heroBlobs[0]) }} />
            <span className="chatbot-blob chatbot-blob-2" style={{ right: '-16%', top: '-10%', background: blob(heroBlobs[1]) }} />
            <span className="chatbot-blob chatbot-blob-3" style={{ left: '8%', bottom: '-24%', background: blob(heroBlobs[2]) }} />
          </span>

          <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-14 px-6 md:grid-cols-2 md:gap-6 md:px-12">
            <div className="max-w-xl">
              <FadeIn delay={0.05}>
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-normal text-white">
                  {t(eyebrow)}
                </span>
              </FadeIn>
              <SplitText
                as="h1"
                delay={0.15}
                className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-normal [text-wrap:balance]"
              >
                {t(heading)}
              </SplitText>
              <FadeIn delay={0.35}>
                <p className="mt-6 max-w-xl text-sm tracking-normal text-white md:text-base">
                  {t(subheading)}
                </p>
              </FadeIn>

              <FadeIn delay={0.5} className="mt-10">
                <a
                  href={waLink}
                  data-cursor
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium tracking-normal text-black shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
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

          {/* wave cut instead of a straight edge into the white section below */}
          <svg
            aria-hidden
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 w-full md:h-24"
          >
            <path
              fill="white"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1440,64L1440,120L1280,120C1120,120,960,120,800,120C640,120,480,120,320,120C160,120,80,120,0,120Z"
            />
          </svg>
        </section>

        {/* graphic showcase — the labels stay short on purpose */}
        <section className="relative py-24 md:py-36">
          <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <SplitText
              as="h2"
              className="max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[1] tracking-normal text-[#333D6D]"
            >
              {t(showcaseHeading)}
            </SplitText>

            <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-7">
              {tiles.map((tile, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group flex h-full flex-col items-center rounded-md border border-black/15 bg-white p-8 text-center transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex h-44 w-full items-center justify-center">{tile.graphic}</div>
                    <h3
                      className="mt-7 font-display text-3xl font-semibold tracking-normal md:text-4xl"
                      style={{ color: '#6439FF' }}
                    >
                      {t(tile.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0A2947]">{t(tile.subtitle)}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <OtherServices currentHref={currentHref} />

        {/* closing CTA — soft radial wash in the same blue used on Business
            Websites (shared across every service page), colored at the
            bottom, fading to transparent (white) toward the top */}
        <section
          className="relative py-28 md:py-40"
          style={{
            backgroundImage:
              'radial-gradient(140% 90% at 50% 100%, color-mix(in srgb, #3B6BFF 78%, transparent) 0%, transparent 75%)',
          }}
        >
          <div className="mx-auto w-full max-w-[90rem] px-6 text-center md:px-12">
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[1] tracking-normal">
              {t(ctaHeading)}
            </h2>
            <div className="mt-10">
              <a
                href={waLink}
                data-cursor
                className="group inline-flex items-center gap-3 rounded-full bg-black px-11 py-5 text-base font-medium tracking-normal text-white shadow-xl transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t(ctaLabel)}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
