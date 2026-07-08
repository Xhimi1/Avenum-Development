'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { scrollState } from '@/lib/scroll';
import { cn, clamp, prefersReducedMotion } from '@/lib/utils';

interface MarqueeProps {
  text: string;
  className?: string;
}

/**
 * Infinite text marquee whose speed and direction track scroll velocity,
 * with a velocity skew. Pure transform work on the GSAP ticker.
 */
export default function Marquee({ text, className }: MarqueeProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || prefersReducedMotion()) return;

    let half = 1;
    const measure = () => {
      half = el.scrollWidth / 2 || 1;
    };
    measure();
    window.addEventListener('resize', measure);

    let pos = 0;
    let skew = 0;
    const tick = (_t: number, dtMs: number) => {
      const dt = Math.min(dtMs / 1000, 0.05);
      const v = clamp(scrollState.velocity, -160, 160);
      pos -= (90 + v * 6) * dt;
      pos %= half;
      if (pos > 0) pos -= half;
      const target = clamp(v * 0.06, -12, 12);
      skew += (target - skew) * Math.min(dt * 7, 1);
      el.style.transform = `translate3d(${pos}px,0,0) skewX(${-skew}deg)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const chunk = Array(4).fill(text).join('  ');

  return (
    <div aria-hidden className={cn('relative select-none overflow-hidden py-10', className)}>
      <div
        ref={innerRef}
        className="text-outline flex whitespace-nowrap font-display text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-none opacity-60 will-change-transform"
      >
        <span className="pr-10">{chunk}</span>
        <span className="pr-10">{chunk}</span>
      </div>
    </div>
  );
}
