'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { prefersReducedMotion } from '@/lib/utils';

const DEFAULT_ACCENT = '#4d6bff';
const DEFAULT_DARK = '#1c0f36';

/**
 * Full-screen color-wash transition for real route changes (e.g. the Pricing
 * link) — same two-layer sweep as <ColorWash>, but persisted in the root
 * layout so it survives the page unmount/mount and reveals once the new
 * route has actually committed (tracked via usePathname).
 */
export default function PageWash() {
  const accentRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pendingRef = useRef(false);

  useEffect(() => {
    gsap.set([accentRef.current, darkRef.current], { yPercent: 100 });
  }, []);

  useEffect(() => {
    useStore.setState({
      pageNavigate: (href: string, colors?: { accent: string; bg: string }) => {
        if (href === pathname) return;
        const accent = accentRef.current!;
        const dark = darkRef.current!;

        if (prefersReducedMotion()) {
          router.push(href);
          return;
        }

        pendingRef.current = true;
        gsap.killTweensOf([accent, dark]);
        gsap
          .timeline()
          .set(accent, { backgroundColor: colors?.accent ?? DEFAULT_ACCENT })
          .set(dark, { backgroundColor: colors?.bg ?? DEFAULT_DARK })
          .fromTo(accent, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: 'power3.in' }, 0)
          .fromTo(dark, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: 'power3.in' }, 0.09)
          .add(() => router.push(href), '+=0.05');
      },
    });
    return () => {
      useStore.setState({ pageNavigate: () => {} });
    };
  }, [pathname, router]);

  // Once the new route has actually committed (pathname changed), sweep the
  // cover away — this also means slow route compiles just stay covered
  // instead of flashing unstyled/half-loaded content.
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    const accent = accentRef.current!;
    const dark = darkRef.current!;
    gsap.killTweensOf([accent, dark]);
    gsap
      .timeline({ delay: 0.08 })
      .to(accent, { yPercent: -100, duration: 0.65, ease: 'power3.out' })
      .to(dark, { yPercent: -100, duration: 0.7, ease: 'power3.out' }, '<0.08');
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <div ref={accentRef} className="absolute inset-0 will-change-transform" />
      <div ref={darkRef} className="absolute inset-0 will-change-transform" />
    </div>
  );
}
