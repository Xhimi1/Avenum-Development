'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';

interface ClipRevealImageProps {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  /** color of the panel that wipes across before the image does */
  swipeColor?: string;
  /** extra decorative layers (tints, gradients) rendered on top of the image */
  children?: ReactNode;
  /** fires once the swipe/reveal finishes (or immediately under reduced motion) */
  onRevealed?: () => void;
}

/** Two-stage clip-path reveal, scroll-triggered once: a color panel wipes in
 *  left-to-right covering the box, then wipes back off in the same direction
 *  while the image reveals underneath it in sync. */
export default function ClipRevealImage({
  src,
  alt = '',
  className,
  imgClassName,
  swipeColor = '#6367FF',
  children,
  onRevealed,
}: ClipRevealImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const swipeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    const swipe = swipeRef.current;
    if (!wrap || !img || !swipe) return;

    if (prefersReducedMotion()) {
      gsap.set(img, { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(swipe, { clipPath: 'inset(0% 100% 0% 0%)' });
      onRevealed?.();
      return;
    }

    gsap.set(img, { clipPath: 'inset(0% 100% 0% 0%)' });
    gsap.set(swipe, { clipPath: 'inset(0% 100% 0% 0%)' });

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: wrap, start: 'top 85%', once: true },
          defaults: { duration: 0.75, ease: 'power2.inOut' },
          onComplete: onRevealed,
        })
        .to(swipe, { clipPath: 'inset(0% 0% 0% 0%)' })
        .to(swipe, { clipPath: 'inset(0% 0% 0% 100%)' }, '+=0.09')
        .to(img, { clipPath: 'inset(0% 0% 0% 0%)' }, '<');
    }, wrap);
    return () => ctx.revert();
  }, [src]);

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt={alt} className={cn('h-full w-full object-cover', imgClassName)} />
      <div ref={swipeRef} className="absolute inset-0" style={{ backgroundColor: swipeColor }} />
      {children}
    </div>
  );
}
