'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import FadeIn from '@/components/ui/FadeIn';
import ArrowRight from '@/components/ui/ArrowRight';
import { useStore } from '@/lib/store';
import { PROJECTS } from '@/lib/projects';
import { sectionLocal } from '@/lib/scroll';
import { useT } from '@/lib/i18n';
import { prefersReducedMotion } from '@/lib/utils';

/** Index of the work section in SECTIONS / camera path. */
const WORK_INDEX = 2;

const CASE_STUDY_LABEL = { en: 'See case study', sq: 'Shiko studimin e rastit' };

export default function Work() {
  const active = useStore((s) => s.activeWork);
  const t = useT();
  const titleRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const project = PROJECTS[active];

  // Crossfade the project title whenever the 3D gallery lands on a new panel.
  useEffect(() => {
    const el = titleRef.current;
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(
      el,
      { yPercent: 35, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
    );
  }, [active]);

  // Thin progress bar tracking scroll through the pinned gallery.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const tick = () => {
      bar.style.transform = `scaleX(${sectionLocal(WORK_INDEX)})`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <section id="work" data-scene-section className="relative h-[400vh]">
      <div className="sticky top-0 h-screen">
        <FadeIn
          delay={0.15}
          className="pointer-events-auto absolute inset-x-6 bottom-8 md:inset-x-auto md:bottom-4 md:right-12 md:w-full md:max-w-2xl"
        >
          <div className="rounded-3xl bg-white px-6 py-6 text-black shadow-2xl md:px-10 md:py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div ref={titleRef} className="will-change-transform">
                <p className="mb-3 w-fit rounded-full bg-black px-4 py-1.5 text-xs tracking-normal text-white">
                  0{active + 1} / 0{PROJECTS.length} — {t(project.category)}
                </p>
                <h3 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-none text-black">
                  {project.name}
                </h3>
                <button
                  type="button"
                  data-cursor
                  className="group mt-3 inline-flex items-center gap-2 text-sm font-medium text-black transition-colors duration-300 hover:text-[var(--accent)] md:text-base"
                >
                  {t(CASE_STUDY_LABEL)}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div className="mt-8 w-full max-w-xs">
              <div className="h-px w-full bg-black/10">
                <div
                  ref={barRef}
                  className="h-full w-full origin-left bg-black will-change-transform"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
