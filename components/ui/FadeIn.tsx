'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}

/** Simple scroll-triggered fade/slide reveal. */
export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 40,
  start = 'top 88%',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
