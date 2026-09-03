'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { REVEAL_OPEN, REVEAL_WINDOW_CLASS } from '@/lib/reveal';
import { prefersReducedMotion } from '@/lib/utils';

/**
 * Home intro reveal — the opening half of the route transition
 * (<PageWash>): the screen starts as a zero-width slit in a dark field,
 * which then opens out to full-bleed. `ready` flips once it finishes,
 * releasing scroll.
 *
 * The closed state is the element's own CSS, so the very first
 * server-rendered paint is already covered — no flash of the page before
 * hydration picks it up.
 */
export default function IntroReveal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const win = windowRef.current;
    if (!overlay || !win) return;

    const done = () => {
      overlay.style.visibility = 'hidden';
      useStore.setState({ ready: true });
    };

    // `ready` survives client-side navigation, so coming back to the home
    // page mid-session doesn't replay the intro on top of the route
    // transition that just ran.
    if (prefersReducedMotion() || useStore.getState().ready) {
      done();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(win, {
        ...REVEAL_OPEN,
        duration: 1.1,
        delay: 0.3,
        ease: 'expo.inOut',
        onComplete: done,
      });
    }, overlay);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Without JS the field would never open, so drop it outright. */}
      <noscript>
        <style>{`.intro-field{display:none!important}`}</style>
      </noscript>
      <div
        ref={overlayRef}
        aria-hidden
        className="intro-field pointer-events-none fixed inset-0 z-[95]"
      >
        <div ref={windowRef} className={`${REVEAL_WINDOW_CLASS} reveal-window--closed`} />
      </div>
    </>
  );
}
