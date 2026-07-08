'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';

/**
 * Custom animated cursor: a fast dot plus a lagging ring that scales up over
 * interactive elements. Rendered only on fine-pointer devices.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    gsap.set([dot, ring], { x: -100, y: -100 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const hit = (e.target as Element).closest?.(
        'a, button, input, textarea, [data-cursor]'
      );
      gsap.to(ring, {
        scale: hit ? 1.9 : 1,
        opacity: hit ? 0.95 : 0.55,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const onDown = () => gsap.to(dot, { scale: 0.55, duration: 0.15 });
    const onUp = () => gsap.to(dot, { scale: 1, duration: 0.25 });
    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    const onEnter = () => {
      gsap.to(dot, { opacity: 1, duration: 0.25 });
      gsap.to(ring, { opacity: 0.55, duration: 0.25 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      gsap.killTweensOf([dot, ring]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-5 -mt-5 h-10 w-10 rounded-full border border-[var(--accent)] opacity-55 will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[var(--accent)] will-change-transform"
      />
    </>
  );
}
