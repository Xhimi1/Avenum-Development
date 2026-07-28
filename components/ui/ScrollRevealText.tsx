'use client';

import { createElement, useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';

interface ScrollRevealTextProps {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

/**
 * Each word sits at 10% opacity and brightens to 100% as its position
 * scrolls through the viewport — scrubbed directly to scroll position,
 * not a one-shot entrance.
 */
export default function ScrollRevealText({ children, as = 'p', className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => children.split(' '), [children]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const targets = el.querySelectorAll('[data-word]');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 55%',
            scrub: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [children]);

  return createElement(
    as,
    { ref, className: cn(className) },
    words.map((word, i) => (
      <span key={i} data-word className="inline-block">
        {word}
        {i < words.length - 1 ? ' ' : ''}
      </span>
    ))
  );
}
