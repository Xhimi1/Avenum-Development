'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';
import { prefersReducedMotion } from '@/lib/utils';
import { BrandLogo } from '@/components/ui/Logo';

/**
 * Intro overlay: reveals the brand logo, runs a progress bar, then lifts
 * away and flips `ready` (which unlocks scrolling and cues the hero reveal).
 */
export default function Loader() {
  const [gone, setGone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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
        logoRef.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power4.out' },
        0.1
      )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
          0.2
        )
        .to(
          logoRef.current,
          { yPercent: -120, opacity: 0, duration: 0.5, ease: 'power4.in' },
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
      <div className="overflow-hidden">
        <div ref={logoRef} className="will-change-transform">
          <BrandLogo className="h-10 w-auto text-white md:h-14" />
        </div>
      </div>
      <div className="h-px w-44 overflow-hidden bg-white/15">
        <div ref={barRef} className="h-full w-full origin-left bg-[var(--accent)]" />
      </div>
    </div>
  );
}
