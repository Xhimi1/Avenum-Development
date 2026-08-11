'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { SECTIONS } from '@/lib/palette';
import { NAV_SERVICES } from '@/lib/services-nav';
import { scrollState } from '@/lib/scroll';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import LangToggle from '@/components/ui/LangToggle';
import ServiceIcon from '@/components/services/ServiceIcon';

const PRICING_LABEL = { en: 'Pricing', sq: 'Paketat' };
const BACK_LABEL = { en: 'Back', sq: 'Kthehu' };
const PRICING_WASH = { accent: '#8b5cf6', bg: '#1c0f36' };
const aboutSection = SECTIONS.find((s) => s.id === 'about')!;

// Standalone pages with a dark (#0F0824) background end-to-end — the brand
// name needs to switch to white on these, unlike the homepage hero (bright
// purple) or the other white-background pages, which read fine with the
// default dark navy.
const DARK_PAGES = ['/about', '/pricing', '/ai-chatbots'];

export default function Nav() {
  const navigate = useStore((s) => s.navigate);
  const pageNavigate = useStore((s) => s.pageNavigate);
  const t = useT();
  const pathname = usePathname();
  const onHomePage = pathname === '/';
  const onDarkPage = DARK_PAGES.some((p) => pathname === p);
  const [open, setOpen] = useState(false);
  const linksRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Bar behavior driven by scroll position, not CSS `position: sticky`:
  // stays put and visible the whole time (no hide/slide interaction) —
  // transparent at the top, then once scrolled past a threshold it docks
  // flush to the top with a background and the purple brand name, and
  // stays that way for the rest of the page. Reads `window.scrollY`
  // directly (not `scrollState.y`) so it works on every page —
  // `scrollState` is only kept in sync by <SmoothScroll>, which is mounted
  // just on the homepage; Lenis still drives the real window scroll there
  // too, so this stays accurate on the homepage as well.
  const [dockedBg, setDockedBg] = useState(false);
  const dockedRef = useRef(dockedBg);
  useEffect(() => {
    const tick = () => {
      const next = window.scrollY >= window.innerHeight * 0.6;
      if (next !== dockedRef.current) {
        dockedRef.current = next;
        setDockedBg(next);
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // Desktop renders the menu as a small anchored card — close it on an
  // outside click, like any dropdown. (Mobile's full-screen panel covers
  // the whole viewport, so this effectively never fires there.)
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || burgerRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // "Services" row expands a submenu in place; collapses whenever the
  // full-screen menu itself closes so it doesn't reopen pre-expanded.
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  useEffect(() => {
    if (!open) setMobileServicesOpen(false);
  }, [open]);

  const goToService = (href: string, accent: string) => {
    pageNavigate(href, { accent, bg: '#0b0a16' });
  };

  // Section links scroll in-page on the homepage; from any other route they
  // route home first, landing on the target section via Home's hash effect.
  const goToSection = (i: number) => {
    if (onHomePage) {
      navigate(i);
    } else {
      pageNavigate(`/#${SECTIONS[i].id}`, { accent: SECTIONS[i].accent, bg: SECTIONS[i].bg });
    }
  };

  // "Work" and "About" are nav items that open their own page instead of
  // scrolling to a homepage section.
  const workSection = SECTIONS.find((s) => s.id === 'work')!;
  const goToWork = () => pageNavigate('/portfolio', { accent: workSection.accent, bg: workSection.bg });
  const goToAbout = () => pageNavigate('/about', { accent: aboutSection.accent, bg: aboutSection.bg });

  // Menu opens/closes instantly — links appear in their final state immediately.
  useEffect(() => {
    const container = linksRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>('[data-nav-link]');
    gsap.killTweensOf(items);
    gsap.set(items, { opacity: open ? 1 : 0, y: 0 });
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

  // Close on Escape and when the viewport grows to desktop. Also tracks the
  // breakpoint itself — on mobile, the docked bar's background hides while
  // the full-screen menu is open (so it reads as one solid black panel);
  // on desktop, the small anchored card doesn't cover the bar, so it stays.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 768px)');
    const onMq = () => {
      setIsDesktop(mq.matches);
      if (mq.matches) setOpen(false);
    };
    onMq();
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, []);
  const bgVisible = dockedBg && (!open || isDesktop);

  const go = (i: number) => {
    setOpen(false);
    goToSection(i);
  };

  return (
    <>
      {/* Not docked: `absolute` (not `fixed`) — it sits at the top of the
          page and scrolls away with the rest of the content, like any
          normal block, no JS-driven hide animation. Once scrolled past the
          threshold it switches to `fixed` and docks flush to the top with
          a background and the purple brand name, staying stuck from there. */}
      <header
        className={cn(
          'pointer-events-none inset-x-0 z-50',
          dockedBg ? 'fixed top-0' : 'absolute top-4 md:top-8'
        )}
      >
        {/* background lives on its own layer behind the content — keeping
            it off the transform-animated `fixed` element avoids an
            iOS/mobile Safari bug where a blurred layer can render over
            (and hide) its own children. On mobile it hides while the
            full-screen menu is open, so the bar reads as part of that
            solid black panel instead of showing its own light bg through it.
            Always mounted (not conditionally rendered) so the opacity
            change can actually transition instead of popping in. */}
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 rounded-b-[32px] bg-[#F3F4F4] shadow-xl shadow-black/[0.07] transition-opacity duration-300 ease-out',
            bgVisible ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div className="pointer-events-auto relative mx-auto flex w-full max-w-[90rem] items-center justify-between px-6 py-4 md:px-12 md:py-3">
          <button
            type="button"
            data-cursor
            onClick={() => go(0)}
            aria-label="Avenum — back to top"
            className={cn(
              'font-display font-bold transition-colors duration-300 ease-out',
              dockedBg ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
            )}
            style={{ color: bgVisible ? '#6367FF' : open ? '#ffffff' : onDarkPage ? '#ffffff' : '#061E29' }}
          >
            Avenum
          </button>

          {/* Burger — same circular control on every breakpoint. Opens a
              small anchored card on desktop, a full-screen panel on mobile. */}
          <button
            ref={burgerRef}
            type="button"
            data-cursor
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[3px] rounded-full bg-[#DDDDDD]/70"
          >
            <span
              className={cn(
                'block h-[3px] w-5 rounded-full bg-[#6367FF]',
                open && 'translate-y-[6px] rotate-45'
              )}
            />
            <span
              className={cn(
                'block h-[3px] w-5 rounded-full bg-[#6367FF]',
                open && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block h-[3px] w-5 rounded-full bg-[#6367FF]',
                open && '-translate-y-[6px] -rotate-45'
              )}
            />
          </button>
        </div>
      </header>

      {/* Dims and blurs the page behind the menu while it's open. */}
      <div
        aria-hidden
        className={cn(
          'fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-[opacity,backdrop-filter] duration-300',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      {/* Full-screen panel on mobile; a small card anchored under the
          burger on desktop — same black, snaps open/closed instantly
          (no clip-path transition). */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        style={{ clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
        className={cn(
          'fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-black px-6 pb-10 pt-28',
          'md:inset-auto md:right-[max(3rem,calc((100vw-90rem)/2+3rem))] md:top-28 md:max-h-[calc(100vh-8rem)] md:w-72 md:justify-start md:gap-20 md:overflow-y-auto md:rounded-lg md:bg-white md:px-6 md:pb-8 md:pt-8 md:shadow-2xl md:ring-1 md:ring-black/10',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <nav
          ref={linksRef}
          aria-label="Sections"
          className={cn(
            'relative flex flex-col gap-1 transition-transform duration-300 ease-out md:gap-0',
            mobileServicesOpen && '-translate-x-8'
          )}
        >
          {SECTIONS.map((s, i) => {
            if (s.id === 'services') {
              return (
                <button
                  key={s.id}
                  type="button"
                  data-nav-link
                  onClick={() => setMobileServicesOpen(true)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between gap-4 py-2 text-left text-white md:-mx-3 md:rounded-md md:px-3 md:py-0.5 md:text-black md:transition-colors md:hover:bg-black/5"
                >
                  <span className="font-display text-4xl font-semibold uppercase leading-none md:text-2xl md:font-medium">{t(s.label)}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="h-5 w-5 shrink-0 md:h-4 md:w-4"
                  >
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              );
            }
            // "About" and "Work" open their own pages instead of scrolling
            // to a homepage section.
            return (
              <button
                key={s.id}
                type="button"
                data-nav-link
                onClick={() => {
                  setOpen(false);
                  if (s.id === 'work') goToWork();
                  else if (s.id === 'about') goToAbout();
                  else goToSection(i);
                }}
                className="flex items-baseline gap-4 py-2 text-left text-white md:-mx-3 md:rounded-md md:px-3 md:py-0.5 md:text-black md:transition-colors md:hover:bg-black/5"
              >
                <span className="font-display text-4xl font-semibold uppercase leading-none md:text-2xl md:font-medium">{t(s.label)}</span>
              </button>
            );
          })}
          <Link
            href="/pricing"
            data-nav-link
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              pageNavigate('/pricing', PRICING_WASH);
            }}
            className="flex items-baseline gap-4 py-2 text-left text-white md:-mx-3 md:rounded-md md:px-3 md:py-0.5 md:text-black md:transition-colors md:hover:bg-black/5"
          >
            <span className="font-display text-4xl font-semibold uppercase leading-none md:text-2xl md:font-medium">{t(PRICING_LABEL)}</span>
          </Link>
        </nav>

        <div
          className={cn(
            'subtext relative flex flex-col gap-3 text-sm md:gap-2 md:text-xs',
            open ? 'opacity-100' : 'opacity-0',
            mobileServicesOpen && '-translate-x-8'
          )}
        >
          <LangToggle className="w-fit md:hidden" />
          <LangToggle light className="hidden w-fit md:inline-flex" />
        </div>

        {/* Services drill-in — slides over the menu from the right */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col bg-black px-6 pb-10 pt-28 transition-transform duration-300 ease-out',
            'md:rounded-lg md:bg-white md:px-5 md:pb-5 md:pt-5',
            mobileServicesOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <button
            type="button"
            onClick={() => setMobileServicesOpen(false)}
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white md:text-black/60 md:hover:text-black"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="h-4 w-4"
            >
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {t(BACK_LABEL)}
          </button>

          <div className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto md:mt-4">
            {NAV_SERVICES.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  goToService(svc.href, svc.accent);
                }}
                className="flex items-center gap-4 py-4 text-left text-white md:gap-3 md:py-0.5 md:text-black"
              >
                <ServiceIcon id={svc.id} className="h-6 w-6 shrink-0 text-white md:h-4 md:w-4 md:text-black" />
                <div className="min-w-0 truncate font-display text-2xl font-semibold uppercase leading-none md:text-sm md:font-medium">{t(svc.title)}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
