'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { scrollState } from '@/lib/scroll';
import { useStore } from '@/lib/store';
import { clamp, computeQuality, prefersReducedMotion } from '@/lib/utils';

/**
 * Owns scrolling for the whole experience:
 * - Lenis smooth scroll driven by the GSAP ticker, synced with ScrollTrigger
 * - measures section anchors (used to map scroll -> camera path parameter)
 * - mirrors scroll/velocity into scrollState and the active section into the store
 * - native scroll fallback when the user prefers reduced motion
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    useStore.setState({ reducedMotion: reduced, quality: computeQuality() });

    const measure = () => {
      const vh = window.innerHeight;
      const els = document.querySelectorAll<HTMLElement>('[data-scene-section]');
      scrollState.anchors = Array.from(els).map((el) => {
        const top = el.offsetTop;
        return { top, pinEnd: top + Math.max(el.offsetHeight - vh, 0) };
      });
      scrollState.maxScroll = Math.max(
        document.documentElement.scrollHeight - vh,
        1
      );
    };
    measure();

    const onData = (y: number, velocity: number) => {
      scrollState.y = y;
      scrollState.velocity = velocity;
      scrollState.progress = clamp(y / scrollState.maxScroll, 0, 1);
      let s = 0;
      const half = window.innerHeight * 0.5;
      scrollState.anchors.forEach((a, i) => {
        if (y >= a.top - half) s = i;
      });
      if (useStore.getState().section !== s) useStore.setState({ section: s });
    };

    const cleanups: Array<() => void> = [];

    if (reduced) {
      useStore.setState({ ready: true });
      const onScroll = () => onData(window.scrollY, 0);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    } else {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.6,
      });
      scrollState.lenis = lenis;

      lenis.on('scroll', (e: { scroll: number; velocity: number }) => {
        onData(e.scroll, e.velocity);
        ScrollTrigger.update();
      });

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // hold scroll until the intro loader finishes
      if (!useStore.getState().ready) lenis.stop();
      const unsub = useStore.subscribe((state, prev) => {
        if (state.ready && !prev.ready) lenis.start();
      });

      cleanups.push(() => {
        unsub();
        gsap.ticker.remove(raf);
        lenis.destroy();
        scrollState.lenis = null;
        scrollState.velocity = 0;
      });
    }

    const onFonts = () => {
      measure();
      ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(onFonts).catch(() => {});
    window.addEventListener('resize', measure);
    ScrollTrigger.addEventListener('refresh', measure);
    cleanups.push(() => {
      window.removeEventListener('resize', measure);
      ScrollTrigger.removeEventListener('refresh', measure);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <>{children}</>;
}
