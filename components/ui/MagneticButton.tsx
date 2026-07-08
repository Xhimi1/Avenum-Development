'use client';

import { useEffect, useRef, type ReactNode, type MouseEventHandler } from 'react';
import { gsap } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler;
  'aria-label'?: string;
}

/**
 * Button/link that leans toward the cursor within its bounds and snaps back
 * with an elastic ease. Falls back to a plain element on touch devices.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  href,
  type = 'button',
  onClick,
  ...rest
}: MagneticButtonProps) {
  const outerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = outerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    const xiTo = gsap.quickTo(inner, 'x', { duration: 0.4, ease: 'power3.out' });
    const yiTo = gsap.quickTo(inner, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      xiTo(dx * strength * 0.35);
      yiTo(dy * strength * 0.35);
    };

    const onLeave = () => {
      gsap.to([el, inner], { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf([el, inner]);
    };
  }, [strength]);

  const classes = cn('pointer-events-auto inline-block will-change-transform', className);
  const inner = (
    <span ref={innerRef} className="block will-change-transform">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={outerRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        data-cursor
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={outerRef as React.RefObject<HTMLButtonElement>}
      type={type}
      data-cursor
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {inner}
    </button>
  );
}
