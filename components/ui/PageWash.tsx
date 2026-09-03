'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { REVEAL_CLOSED as CLOSED, REVEAL_OPEN as OPEN, REVEAL_WINDOW_CLASS } from '@/lib/reveal';
import { prefersReducedMotion } from '@/lib/utils';

/**
 * Route transition, mirroring the home intro reveal: the page closes down
 * into the center of a dark field, the route swaps behind it, then it
 * opens back out to full-bleed.
 *
 * Rather than clipping the page itself (which would anchor the cutout to
 * the document rather than the screen, and would trap the page's `fixed`
 * nav/overlays in a new containing block), this is a transparent window
 * whose enormous box-shadow paints the dark field around it — so it lands
 * identically no matter how far down the page the visitor had scrolled.
 */
export default function PageWash() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pendingRef = useRef(false);

  useEffect(() => {
    gsap.set(windowRef.current, OPEN);
  }, []);

  useEffect(() => {
    useStore.setState({
      pageNavigate: (href: string) => {
        if (href === pathname) return;

        if (prefersReducedMotion()) {
          router.push(href);
          return;
        }

        const overlay = overlayRef.current!;
        const win = windowRef.current!;

        // Navigation is the last step of the shrink below, but that
        // animation can be interrupted (a second click killing this tween, a
        // backgrounded tab throttling rAF, a Fast Refresh mid-transition) —
        // in which case router.push would silently never fire. This timeout
        // is a safety net so the route change always happens regardless.
        let navigated = false;
        const go = () => {
          if (navigated) return;
          navigated = true;
          router.push(href);
        };
        const fallback = window.setTimeout(go, 1400);

        pendingRef.current = true;
        overlay.style.visibility = 'visible';
        gsap.killTweensOf(win);
        gsap
          .timeline()
          .set(win, OPEN)
          .to(win, { ...CLOSED, duration: 0.8, ease: 'expo.inOut' })
          .add(() => {
            window.clearTimeout(fallback);
            go();
          });
      },
    });
    return () => {
      useStore.setState({ pageNavigate: () => {} });
    };
  }, [pathname, router]);

  // Once the new route has actually committed (pathname changed), hold on
  // the small screen a beat and then open it back out — this also means slow
  // route compiles just stay closed instead of flashing half-loaded content.
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    const overlay = overlayRef.current!;
    const win = windowRef.current!;
    gsap.killTweensOf(win);
    gsap.to(win, {
      ...OPEN,
      duration: 1,
      delay: 0.25,
      ease: 'expo.inOut',
      onComplete: () => {
        overlay.style.visibility = 'hidden';
      },
    });
  }, [pathname]);

  return (
    <div ref={overlayRef} aria-hidden className="pointer-events-none invisible fixed inset-0 z-[95]">
      <div ref={windowRef} className={REVEAL_WINDOW_CLASS} />
    </div>
  );
}
