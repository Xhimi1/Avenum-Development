'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

/** The brand mark — sits just above the "AV" in the wordmark, everywhere the wordmark appears. */
export function Mark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo.svg"
      alt=""
      aria-hidden
      className="pointer-events-none absolute left-0 w-[1.9em]"
      style={{ top: '-0.35em', height: 'auto' }}
    />
  );
}

/** The "AVENUM" wordmark, used identically across the homepage nav and every standalone page header. */
export default function Logo({ href = '/', onClick, className }: LogoProps) {
  const content = (
    <>
      <span className="relative inline-block">
        <Mark />
        AV
      </span>
      ENUM
    </>
  );

  const classes = cn('font-display font-semibold tracking-normal', className);

  if (onClick) {
    return (
      <button
        type="button"
        data-cursor
        onClick={onClick}
        aria-label="Avenum — back to top"
        className={classes}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href} data-cursor className={classes}>
      {content}
    </Link>
  );
}
