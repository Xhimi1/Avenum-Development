'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';

interface RevealImageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scroll-triggered image reveal: a clip-path wipe that expands from right
 * to left, paired with a zoom-out on the content itself (starts scaled up,
 * settles to 1). Fires once, the first time it scrolls into view.
 */
export default function RevealImage({ children, className }: RevealImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1.4, ease: 'power3.inOut' },
        scrollTrigger: { trigger: wrap, start: 'top 85%', once: true },
      });
      tl.fromTo(wrap, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)' }, 0);
      tl.fromTo(inner, { scale: 1.25 }, { scale: 1 }, 0);
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={cn('overflow-hidden', className)}>
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
