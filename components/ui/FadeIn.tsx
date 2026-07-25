'use client';

import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}

/**
 * Renders children directly, with no entrance animation. Kept as a drop-in
 * replacement for the old scroll-triggered fade/slide version so every call
 * site (which still passes `delay`/`y`/`start`) needs no changes.
 */
export default function FadeIn({ children, className }: FadeInProps) {
  return <div className={className}>{children}</div>;
}
