'use client';

import { createElement } from 'react';
import { cn } from '@/lib/utils';

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
}

/**
 * Renders text directly, with no entrance animation. Kept as a drop-in
 * replacement for the old char/word-reveal version so every call site
 * (which still passes `as`/`delay`/`type`/etc.) needs no changes.
 */
export default function SplitText({ children, as = 'div', className }: SplitTextProps) {
  return createElement(as, { className: cn(className) }, children);
}
