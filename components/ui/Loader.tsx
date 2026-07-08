'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';
import { prefersReducedMotion } from '@/lib/utils';
import { Mark } from '@/components/ui/Logo';

/**
 * Intro overlay: staggers the wordmark in, runs a progress bar, then lifts
 * away and flips `ready` (which unlocks scrolling and cues the hero reveal).
 */
export default function Loader() {
  const [gone, setGone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      useStore.setState({ ready: true });
      setGone(true);
      return;
    }
    const el = overlayRef.current!;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          useStore.setState({ ready: true });
          setGone(true);
        },
      });
      tl.fromTo(
        '[data-loader-char]',
        { yPercent: 120 },
        { yPercent: 0, stagger: 0.055, duration: 0.7, ease: 'power4.out' },
        0.1
      )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
          0.2
        )
        .to(
          '[data-loader-char]',
          { yPercent: -120, stagger: 0.04, duration: 0.5, ease: 'power4.in' },
          1.15
        )
        .to(el, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, 1.35);
    }, el);
    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading Avenum"
      className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-8"
      style={{ background: SECTIONS[0].bg }}
    >
      <div className="relative">
        <Mark />
        <div className="overflow-hidden">
          <div className="flex font-display text-4xl font-semibold tracking-normal md:text-6xl">
            {'AVENUM'.split('').map((c, i) => (
              <span key={i} data-loader-char className="inline-block will-change-transform">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px w-44 overflow-hidden bg-white/15">
        <div ref={barRef} className="h-full w-full origin-left bg-[var(--accent)]" />
      </div>
    </div>
  );
}
