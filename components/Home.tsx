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
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });

export default function Home() {
  const section = useStore((s) => s.section);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', SECTIONS[section].accent);
  }, [section]);

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
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay" />
    </SmoothScroll>
  );
}
