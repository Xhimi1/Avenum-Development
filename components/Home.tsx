'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Loader from '@/components/ui/Loader';
import Nav from '@/components/ui/Nav';
import ColorWash from '@/components/ui/ColorWash';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Work from '@/components/sections/Work';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/ui/Footer';
import BookCallPill from '@/components/ui/BookCallPill';
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';
import { scrollState } from '@/lib/scroll';

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });

export default function Home() {
  const section = useStore((s) => s.section);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', SECTIONS[section].accent);
  }, [section]);

  // Landing here with a #section hash (e.g. a nav link clicked from a
  // standalone page) jumps straight to that section once the intro loader
  // has released scrolling, instead of always opening on the hero.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const index = SECTIONS.findIndex((s) => s.id === hash);
    if (index < 0) return;

    const jump = () => {
      const target = document.getElementById(hash);
      if (!target) return;
      useStore.setState({ section: index });
      requestAnimationFrame(() => {
        if (scrollState.lenis) scrollState.lenis.scrollTo(target, { immediate: true });
        else target.scrollIntoView();
      });
    };

    if (useStore.getState().ready) {
      jump();
      return;
    }
    const unsubscribe = useStore.subscribe((state, prev) => {
      if (state.ready && !prev.ready) {
        unsubscribe();
        jump();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <SmoothScroll>
      <Scene />
      <Loader />
      <ColorWash />
      <Nav />
      <main className="pointer-events-none relative z-10">
        <Hero />
        <Services />
        <Work />
        <About />
        <Contact />
      </main>
      <div className="relative z-10 pointer-events-auto">
        <Footer theme="dark" />
      </div>
      <BookCallPill />
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay" />
    </SmoothScroll>
  );
}
