'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { scrollState } from '@/lib/scroll';
import { clamp, prefersReducedMotion } from '@/lib/utils';

interface KineticProps {
  children: ReactNode;
  className?: string;
  factor?: number;
}

/** Skews/stretches its children with scroll velocity — kinetic typography wrapper. */
export default function Kinetic({ children, className, factor = 1 }: KineticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let skew = 0;
    const tick = (_t: number, dtMs: number) => {
      const target = clamp(scrollState.velocity * 0.08 * factor, -10, 10);
      skew += (target - skew) * Math.min((dtMs / 1000) * 8, 1);
      el.style.transform = `skewX(${-skew}deg) scaleY(${1 + Math.min(Math.abs(skew) * 0.006, 0.06)})`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      el.style.transform = '';
    };
  }, [factor]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
