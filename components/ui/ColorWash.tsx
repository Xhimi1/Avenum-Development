'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { scrollState } from '@/lib/scroll';
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';
import { prefersReducedMotion } from '@/lib/utils';

/**
 * Full-screen color-wash transition used for nav jumps: two layers sweep up
 * over the viewport, the scroll snaps underneath, then they sweep away.
 * Installs itself as `navigate` in the store.
 */
export default function ColorWash() {
  const accentRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);

  // Establish the hidden state through GSAP itself (not a Tailwind transform
  // class) — yPercent tweens cache the element's existing transform as a
  // baseline, so a class-based `translate-y-full` composes with (rather than
  // being replaced by) later yPercent tweens, leaving the overlay stuck
  // covering the screen even once GSAP's own bookkeeping reads -100%.
  useEffect(() => {
    gsap.set([accentRef.current, darkRef.current], { yPercent: 100 });
  }, []);

  useEffect(() => {
    useStore.setState({
      navigate: (i: number) => {
        const target = document.getElementById(SECTIONS[i].id);
        if (!target) return;

        if (prefersReducedMotion() || !scrollState.lenis) {
          target.scrollIntoView();
          return;
        }

        const accent = accentRef.current!;
        const dark = darkRef.current!;
        useStore.setState({ section: i });
        gsap.killTweensOf([accent, dark]);
        gsap
          .timeline()
          .set(accent, { backgroundColor: SECTIONS[i].accent })
          .set(dark, { backgroundColor: SECTIONS[i].bg })
          .fromTo(accent, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: 'power3.in' }, 0)
          .fromTo(dark, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: 'power3.in' }, 0.09)
          .add(() => {
            scrollState.lenis?.scrollTo(target, { immediate: true, force: true });
          })
          .to(accent, { yPercent: -100, duration: 0.65, ease: 'power3.out' }, '+=0.05')
          .to(dark, { yPercent: -100, duration: 0.7, ease: 'power3.out' }, '<0.08');
      },
    });
    return () => {
      useStore.setState({ navigate: () => {} });
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[85]">
      <div ref={accentRef} className="absolute inset-0 will-change-transform" />
      <div ref={darkRef} className="absolute inset-0 will-change-transform" />
    </div>
  );
}
