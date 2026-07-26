'use client';

import { createElement, useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';

interface SplitTextProps {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  type?: 'chars' | 'words';
  className?: string;
  /** seconds — used to sequence the hero behind the loader */
  delay?: number;
  /** ScrollTrigger start position */
  start?: string;
  stagger?: number;
  once?: boolean;
  /** opt into the staggered GSAP reveal below; defaults to a plain, static render */
  animate?: boolean;
}

/**
 * Renders text directly by default (no entrance animation). Pass `animate`
 * to opt a specific heading into the staggered word/char GSAP reveal below —
 * every other call site keeps the plain static render.
 */
export default function SplitText({
  children,
  as = 'div',
  type = 'chars',
  className,
  delay = 0,
  start = 'top 85%',
  stagger,
  once = false,
  animate = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => children.split(' '), [children]);
  const playedRef = useRef(false);

  useLayoutEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const targets = el.querySelectorAll('[data-split]');

    // Once this instance has already revealed itself, a later `children`
    // change (e.g. a language switch) should just swap the text in place —
    // not replay the entrance (which would re-run any intro `delay` too).
    if (playedRef.current) {
      gsap.set(targets, { yPercent: 0, rotate: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 120, rotate: type === 'chars' ? 6 : 3, opacity: type === 'words' ? 0 : 1 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          delay,
          stagger: stagger ?? (type === 'chars' ? 0.022 : 0.05),
          onStart: () => {
            playedRef.current = true;
          },
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [animate, children, delay, type, start, stagger, once]);

  if (!animate) {
    return createElement(as, { className: cn(className) }, children);
  }

  return createElement(
    as,
    { ref, className: cn(className), 'aria-label': children },
    words.map((word, wi) => (
      <span
        key={wi}
        aria-hidden
        className="inline-block overflow-hidden whitespace-pre pb-[0.1em] -mb-[0.1em] align-top"
      >
        {type === 'chars' ? (
          Array.from(word).map((ch, ci) => (
            <span key={ci} data-split className="inline-block will-change-transform">
              {ch}
            </span>
          ))
        ) : (
          <span data-split className="inline-block will-change-transform">
            {word}
          </span>
        )}
        {wi < words.length - 1 ? ' ' : ''}
      </span>
    ))
  );
}
