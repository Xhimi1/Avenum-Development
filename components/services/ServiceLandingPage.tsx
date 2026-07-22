'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';
import { useT, type Bi } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import LangToggle from '@/components/ui/LangToggle';
import Logo from '@/components/ui/Logo';
import AuroraBackdrop from './graphics/AuroraBackdrop';

export interface ServiceFeature {
  icon: (props: { className?: string }) => JSX.Element;
  title: Bi;
  desc: Bi;
}

export interface ServiceBuildStep {
  /** locale-agnostic step number, e.g. "01" */
  phase: string;
  title: Bi;
  desc: Bi;
}

interface ServiceLandingPageProps {
  /** hex color driving every accent touch on the page via a CSS variable */
  accent: string;
  /** secondary hue paired with accent for gradients and the aurora backdrop */
  accent2: string;
  heading: Bi;
  subheading: Bi;
  graphic?: ReactNode;
  featuresHeading: Bi;
  features: ServiceFeature[];
  buildHeading: Bi;
  buildSub: Bi;
  buildSteps: ServiceBuildStep[];
  ctaHeading: Bi;
  ctaSub: Bi;
  ctaLabel: Bi;
  mailSubject: Bi;
}

const BACK_LINK = { en: '← Back to the experience', sq: '← Kthehu te eksperienca' };
const COPYRIGHT = {
  en: '© 2026 Avenum — All rights reserved',
  sq: '© 2026 Avenum — Të gjitha të drejtat e rezervuara',
};

const MAIL_BASE = 'mailto:hello@avenum.studio?subject=';

/**
 * Shared skeleton for the light, no-3D service pages (hero → features →
 * build timeline → CTA). Every color touch reads `var(--svc-accent)`, set
 * once via inline style so each page can supply its own hex without the
 * class name changing (keeps Tailwind's static-analysis purge happy).
 */
export default function ServiceLandingPage({
  accent,
  accent2,
  heading,
  subheading,
  graphic,
  featuresHeading,
  features,
  buildHeading,
  buildSub,
  buildSteps,
  ctaHeading,
  ctaSub,
  ctaLabel,
  mailSubject,
}: ServiceLandingPageProps) {
  const buildSectionRef = useRef<HTMLElement>(null);
  const buildLineRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const mailto = `${MAIL_BASE}${encodeURIComponent(t(mailSubject))}`;
  const accentVar = {
    '--svc-accent': accent,
    '--svc-accent2': accent2,
  } as CSSProperties;

  // The build-steps line draws itself in as the timeline scrolls into view.
  useLayoutEffect(() => {
    const section = buildSectionRef.current;
    const line = buildLineRef.current;
    if (!section || !line || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.5,
          },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]" style={accentVar}>
      <AuroraBackdrop accent={accent} accent2={accent2} />
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Logo className="text-3xl md:text-4xl" />
        <div className="flex items-center gap-4">
          <Link href="/" data-cursor className="text-xs text-black">
            {t(BACK_LINK)}
          </Link>
          <LangToggle light />
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-16 md:pt-32">
          <div className="mx-auto grid w-full max-w-[90rem] items-center gap-12 px-6 md:grid-cols-2 md:gap-10 md:px-12">
            <div className="max-w-xl">
              <SplitText
                as="h1"
                delay={0.15}
                className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[0.98]"
              >
                {t(heading)}
              </SplitText>
              <FadeIn delay={0.35}>
                <p className="mt-6 max-w-lg text-sm text-black md:text-base">{t(subheading)}</p>
              </FadeIn>

              <FadeIn delay={0.5} className="mt-10">
                <a
                  href={mailto}
                  data-cursor
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--svc-accent)] to-[var(--svc-accent2)] px-8 py-4 text-xs font-medium tracking-normal text-white"
                >
                  {t(ctaLabel)}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </FadeIn>
            </div>

            {graphic && (
              <FadeIn delay={0.3} className="flex justify-center md:justify-end">
                {graphic}
              </FadeIn>
            )}
          </div>
        </section>

        {/* features */}
        <section id="features" className="relative py-24 md:py-36">
          <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <div className="mb-12 md:mb-20">
              <SplitText
                as="h2"
                className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[0.98]"
              >
                {t(featuresHeading)}
              </SplitText>
            </div>

            <div className="grid gap-10 md:grid-cols-4 md:gap-6">
              {features.map((f, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--svc-accent)]"
                    style={{
                      background:
                        'linear-gradient(135deg, color-mix(in srgb, var(--svc-accent) 14%, white), color-mix(in srgb, var(--svc-accent2) 10%, white))',
                      border: '1px solid color-mix(in srgb, var(--svc-accent) 25%, transparent)',
                    }}
                  >
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold md:text-xl">{t(f.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black">{t(f.desc)}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* how we build it */}
        <section ref={buildSectionRef} className="relative py-24 md:py-36">
          <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
              <div>
                <SplitText
                  as="h2"
                  className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[0.98]"
                >
                  {t(buildHeading)}
                </SplitText>
                <FadeIn delay={0.15}>
                  <p className="mt-4 max-w-sm text-sm text-black md:text-base">{t(buildSub)}</p>
                </FadeIn>
              </div>

              <div className="relative">
                <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-black/10" />
                <div
                  ref={buildLineRef}
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px origin-top bg-[var(--svc-accent)]"
                  style={{ transform: 'scaleY(0)' }}
                />
                <ol className="space-y-12 pl-8">
                  {buildSteps.map((step, i) => (
                    <FadeIn key={step.phase} delay={i * 0.1}>
                      <li className="relative">
                        <span
                          aria-hidden
                          className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--svc-accent)]"
                        />
                        <p className="text-xs tracking-normal text-[var(--svc-accent)]">
                          {step.phase}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold md:text-2xl">
                          {t(step.title)}
                        </h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-black">
                          {t(step.desc)}
                        </p>
                      </li>
                    </FadeIn>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 md:py-44">
          <div className="mx-auto w-full max-w-[90rem] px-6 text-center md:px-12">
            <SplitText
              as="h2"
              className="font-display text-[clamp(2.2rem,6.5vw,5rem)] font-semibold leading-[0.98]"
            >
              {t(ctaHeading)}
            </SplitText>
            <FadeIn delay={0.15}>
              <p className="mx-auto mt-5 max-w-md text-sm text-black md:text-base">{t(ctaSub)}</p>
            </FadeIn>
            <FadeIn delay={0.3} className="mt-10">
              <a
                href={mailto}
                data-cursor
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--svc-accent)] to-[var(--svc-accent2)] px-12 py-6 text-base font-medium tracking-normal text-white"
              >
                {t(ctaLabel)}
                <ArrowRight className="h-5 w-5" />
              </a>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-3 text-xs text-black md:flex-row md:items-center md:justify-between">
          <p>{t(COPYRIGHT)}</p>
          <Link
            href="/"
            data-cursor
            className="w-fit text-black"
          >
            avenum.studio
          </Link>
        </div>
      </footer>
    </div>
  );
}
