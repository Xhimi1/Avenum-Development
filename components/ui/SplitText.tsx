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
  /** 'lines' (default) slides each unit up out of a clipped mask; 'blur'
   *  fades each word in from a blur, one word after another */
  effect?: 'lines' | 'blur';
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
  effect = 'lines',
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
      gsap.set(
        targets,
        effect === 'blur' ? { opacity: 1, filter: 'blur(0px)' } : { yPercent: 0, rotate: 0, opacity: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      if (effect === 'blur') {
        gsap.fromTo(
          targets,
          { opacity: 0, filter: 'blur(14px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power2.out',
            delay,
            stagger: stagger ?? 0.12,
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
        return;
      }

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
  }, [animate, children, delay, type, start, stagger, once, effect]);

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
        className={cn(
          'inline-block whitespace-pre pb-[0.1em] -mb-[0.1em] align-top',
          effect === 'blur' ? 'overflow-visible' : 'overflow-hidden'
        )}
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
