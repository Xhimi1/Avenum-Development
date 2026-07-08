'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';
import { scrollState } from '@/lib/scroll';
import { useT } from '@/lib/i18n';
import { cn, prefersReducedMotion } from '@/lib/utils';
import LangToggle from '@/components/ui/LangToggle';
import Logo from '@/components/ui/Logo';

const PRICING_LABEL = { en: 'Pricing', sq: 'Çmimet' };
const REMOTE_LINE = { en: 'Tirana · Berlin · Remote', sq: 'Tiranë · Berlin · Në distancë' };
const PRICING_WASH = { accent: '#8b5cf6', bg: '#1c0f36' };

export default function Nav() {
  const section = useStore((s) => s.section);
  const navigate = useStore((s) => s.navigate);
  const pageNavigate = useStore((s) => s.pageNavigate);
  const t = useT();
  const [open, setOpen] = useState(false);
  const linksRef = useRef<HTMLElement>(null);

  // Stagger the links in on open, and quick-fade them out on close.
  useEffect(() => {
    const container = linksRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>('[data-nav-link]');
    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: open ? 1 : 0, y: 0 });
      return;
    }
    gsap.killTweensOf(items);
    if (open) {
      gsap.fromTo(
        items,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07, delay: 0.15 }
      );
    } else {
      gsap.to(items, { y: -16, opacity: 0, duration: 0.25, ease: 'power2.in', stagger: 0.03 });
    }
  }, [open]);

  // Lock scrolling while the mobile menu is open (Lenis when present, native
  // otherwise). Cleanup restarts scroll, which keeps state consistent across
  // toggles and StrictMode's double-invoked effects.
  useEffect(() => {
    if (open) {
      scrollState.lenis?.stop();
      if (!scrollState.lenis) document.documentElement.style.overflow = 'hidden';
    } else {
      scrollState.lenis?.start();
      if (!scrollState.lenis) document.documentElement.style.overflow = '';
    }
    return () => {
      scrollState.lenis?.start();
      if (!scrollState.lenis) document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Close on Escape and when the viewport grows to desktop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 768px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  const go = (i: number) => {
    setOpen(false);
    navigate(i);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none relative z-50 flex items-center justify-between px-4 py-4 md:px-10 md:py-6">
        <Logo onClick={() => go(0)} className="pointer-events-auto text-base md:text-lg" />

        {/* Desktop inline nav */}
        <nav
          aria-label="Sections"
          className="pointer-events-auto hidden items-center gap-6 rounded-full bg-black px-6 py-3 md:flex"
        >
          {SECTIONS.slice(1).map((s, i) => (
            <button
              key={s.id}
              type="button"
              data-cursor
              onClick={() => navigate(i + 1)}
              className={cn(
                'text-xs tracking-normal transition-colors duration-300',
                section === i + 1 ? 'text-[var(--accent)]' : 'text-white/60 hover:text-white'
              )}
            >
              {t(s.label)}
            </button>
          ))}
          <Link
            href="/pricing"
            data-cursor
            onClick={(e) => {
              e.preventDefault();
              pageNavigate('/pricing', PRICING_WASH);
            }}
            className="text-xs tracking-normal text-white/60 transition-colors duration-300 hover:text-white"
          >
            {t(PRICING_LABEL)}
          </Link>
          <LangToggle />
        </nav>

        {/* Mobile burger toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="pointer-events-auto flex h-9 w-9 flex-col items-center justify-center gap-[6px] md:hidden"
        >
          <span
            className={cn(
              'block h-[2px] w-6 rounded-full bg-white transition-all duration-300 ease-out motion-reduce:transition-none',
              open && 'translate-y-[4px] rotate-45 bg-[var(--accent)]'
            )}
          />
          <span
            className={cn(
              'block h-[2px] w-6 rounded-full bg-white transition-all duration-300 ease-out motion-reduce:transition-none',
              open && '-translate-y-[4px] -rotate-45 bg-[var(--accent)]'
            )}
          />
        </button>
      </div>

      {/* Mobile full-screen menu — circular clip-path reveal from the burger,
          driven by React state (no imperative timelines). */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        style={{
          clipPath: open
            ? 'circle(150% at calc(100% - 34px) 38px)'
            : 'circle(0% at calc(100% - 34px) 38px)',
          transitionProperty: 'clip-path, opacity',
        }}
        className={cn(
          'fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-[#0a0a0d] px-6 pb-10 pt-28 duration-[600ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <nav ref={linksRef} aria-label="Sections" className="relative flex flex-col gap-1">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              data-nav-link
              onClick={() => go(i)}
              style={{ ['--item' as string]: s.accent }}
              className={cn(
                'flex items-baseline gap-4 border-b border-white/10 py-4 text-left',
                section === i ? 'text-[color:var(--item)]' : 'text-white hover:text-[color:var(--item)]'
              )}
            >
              <span className="font-display text-4xl font-semibold leading-none">{t(s.label)}</span>
            </button>
          ))}
          <Link
            href="/pricing"
            data-nav-link
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              pageNavigate('/pricing', PRICING_WASH);
            }}
            className="flex items-baseline gap-4 border-b border-white/10 py-4 text-left text-white hover:text-[var(--accent)]"
          >
            <span className="font-display text-4xl font-semibold leading-none">{t(PRICING_LABEL)}</span>
          </Link>
        </nav>

        <div
          style={{ transitionDelay: open ? '0.42s' : '0s' }}
          className={cn(
            'subtext relative flex flex-col gap-3 text-sm transition-opacity duration-500 motion-reduce:transition-none',
            open ? 'opacity-100' : 'opacity-0'
          )}
        >
          <a
            href="mailto:hello@avenum.studio"
            className="w-fit transition-colors hover:text-[var(--accent)]"
          >
            hello@avenum.studio
          </a>
          <p>{t(REMOTE_LINE)}</p>
          <LangToggle className="mt-1 w-fit" />
        </div>
      </div>
    </header>
  );
}
