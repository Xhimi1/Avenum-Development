'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';
import { prefersReducedMotion } from '@/lib/utils';

/**
 * Intro overlay: a thick white progress bar along the bottom edge with a
 * live percentage readout in the corner, then fades out to reveal the page
 * (which flips `ready`, unlocking scrolling and cueing the hero reveal).
 */
export default function Loader() {
  const [gone, setGone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      useStore.setState({ ready: true });
      setGone(true);
      return;
    }
    const el = overlayRef.current!;
    const progress = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          useStore.setState({ ready: true });
          setGone(true);
        },
      });
      tl.to(
          brandRef.current,
          {
            duration: 1,
            ease: 'none',
            scrambleText: { text: 'Avenum', chars: 'upperAndLowerCase', speed: 0.4 },
          },
          0
        )
        .to(barRef.current, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
        .to(
          progress,
          {
            value: 100,
            duration: 1.4,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (percentRef.current) percentRef.current.textContent = `${Math.round(progress.value)}%`;
            },
          },
          0
        )
        .to(el, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 1.5);
    }, el);
    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading Avenum"
      className="fixed inset-0 z-[95] flex items-center justify-center"
      style={{ background: SECTIONS[0].bg }}
    >
      <span ref={brandRef} className="font-display text-6xl font-bold text-white/50 md:text-8xl">
        Avenum
      </span>

      <div className="absolute inset-x-0 bottom-0 h-3 overflow-hidden bg-white/15">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-white" />
      </div>
      <div ref={percentRef} className="absolute bottom-6 right-6 text-sm font-medium tabular-nums text-white">
        0%
      </div>
    </div>
  );
}
