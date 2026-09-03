'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { SECTIONS, HOME_SECTIONS } from '@/lib/palette';
import { scrollState } from '@/lib/scroll';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';
import { useT } from '@/lib/i18n';
import { cn, prefersReducedMotion } from '@/lib/utils';
import LangToggle from '@/components/ui/LangToggle';
import { BrandMark } from '@/components/ui/Logo';
import ArrowRight from '@/components/ui/ArrowRight';

const PRICING_LABEL = { en: 'Pricing', sq: 'Paketat' };
const CONTACT_LABEL = { en: 'Contact', sq: 'Kontakto' };
const CALL_US_LABEL = { en: 'Call Us', sq: 'Call Us' };
const ANNOUNCE_LABEL = {
  en: 'Enjoy more than 90% of our prices',
  sq: 'Shijo më shumë se 90% të çmimeve tona',
};
const ANNOUNCE_STORAGE_KEY = 'avenum-announce-dismissed';
const PRICING_WASH = { accent: '#8b5cf6', bg: '#1c0f36' };
const aboutSection = SECTIONS.find((s) => s.id === 'about')!;

export default function Nav() {
  const navigate = useStore((s) => s.navigate);
  const pageNavigate = useStore((s) => s.pageNavigate);
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();
  const onHomePage = pathname === '/';
  const [open, setOpen] = useState(false);
  const linksRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Announcement bar above the nav. Its dismissal is remembered in
  // localStorage, and it stays unmounted until that's been read so the
  // server-rendered markup can't disagree with the client's first paint.
  const [announceOpen, setAnnounceOpen] = useState(false);
  useEffect(() => {
    if (window.localStorage.getItem(ANNOUNCE_STORAGE_KEY) !== '1') setAnnounceOpen(true);
  }, []);
  const dismissAnnounce = () => {
    window.localStorage.setItem(ANNOUNCE_STORAGE_KEY, '1');
    setAnnounceOpen(false);
  };

  // Contact button expands to reveal a "Call Us" label, growing rightward
  // from the icon, once the visitor has scrolled past the hero's own CTAs —
  // the point where those buttons are gone and the nav becomes the only way
  // to reach us. Collapses again on the way back up. Pages without a hero
  // CTA row fall back to a plain viewport-height threshold. Reads
  // `window.scrollY` rather than `scrollState.y`, which only <SmoothScroll>
  // (homepage-only) keeps in sync — Lenis drives the real window scroll
  // there too, so this stays accurate on both.
  const [callUsOpen, setCallUsOpen] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const measure = () => {
      const cta = document.querySelector<HTMLElement>('[data-hero-cta]');
      if (!cta) return window.innerHeight * 0.6;
      return cta.getBoundingClientRect().bottom + window.scrollY;
    };
    let threshold = measure();
    const onScroll = () => setCallUsOpen(window.scrollY > threshold);
    const onResize = () => {
      threshold = measure();
      onScroll();
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [pathname]);

  // "Services" is a plain link to the homepage section: no colour wash and
  // no smooth-scroll easing — it lands there immediately. Off the homepage
  // it routes to /#services, where Home's hash effect makes the same
  // instant jump once the intro loader releases scrolling.
  const goToServicesSection = () => {
    setOpen(false);
    if (!onHomePage) {
      router.push('/#services');
      return;
    }
    const target = document.getElementById('services');
    if (!target) return;
    useStore.setState({ section: HOME_SECTIONS.findIndex((hs) => hs.id === 'services') });
    if (scrollState.lenis) scrollState.lenis.scrollTo(target, { immediate: true });
    else target.scrollIntoView();
  };

  // Section links scroll in-page on the homepage; from any other route they
  // route home first, landing on the target section via Home's hash effect.
  const goToSection = (i: number) => {
    if (onHomePage) {
      navigate(i);
    } else {
      pageNavigate(`/#${HOME_SECTIONS[i].id}`, { accent: HOME_SECTIONS[i].accent, bg: HOME_SECTIONS[i].bg });
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

  // Close the menu on Escape, and close the mobile panel if the viewport
  // grows to desktop mid-open (it has no desktop trigger anymore).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
    };
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
    goToSection(i);
  };

  const goToPricing = () => {
    setOpen(false);
    pageNavigate('/pricing', PRICING_WASH);
  };

  // Bar is always a plain white navbar now, so link color no longer needs
  // to branch on scroll position or the page's own background.
  const desktopLinkClass =
    'font-display text-sm font-medium tracking-normal text-[#061E29] transition-colors duration-300 hover:text-[#6367FF]';

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 bg-white',
          // the open menu is a solid white sheet below the bar; a drop
          // shadow over it would read as a seam across the panel
          !open && 'shadow-md shadow-black/[0.04]'
        )}
      >
        {/* Announcement strip. Lives inside the header rather than above it
            so the fixed bar stays one block — dismissing it just makes the
            header shorter, with no offset to keep in sync. The dismiss X is
            a sibling of the link, not nested inside it. */}
        {announceOpen && !open && (
          <div className="relative bg-[#76C457] text-white">
            <button
              type="button"
              data-cursor
              onClick={goToPricing}
              className="flex w-full items-center justify-center gap-1 px-12 py-2 text-center font-display text-xs font-medium tracking-normal transition-opacity duration-300 hover:opacity-90 md:text-sm"
            >
              {t(ANNOUNCE_LABEL)}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              data-cursor
              onClick={dismissAnnounce}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-300 hover:bg-white/15 md:right-6"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                aria-hidden
                className="h-3.5 w-3.5"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
        )}

        <div className="relative mx-auto flex w-full max-w-[90rem] items-center justify-between gap-6 px-6 py-4 md:grid md:grid-cols-[auto_1fr_auto] md:px-12 md:py-2">
          <button
            type="button"
            data-cursor
            onClick={() => go(0)}
            aria-label="Avenum — back to top"
            className="flex items-center gap-2 font-display text-2xl font-bold text-[#061E29] transition-colors duration-300 ease-out md:text-2xl"
          >
            <BrandMark className="h-[0.75em] w-auto" />
            Avenum
          </button>

          {/* Desktop-only inline nav — mobile keeps the full-screen burger
              menu below, since there's no room to lay these out flat there. */}
          <nav className="hidden w-fit items-center justify-center justify-self-center gap-8 md:flex">
            {SECTIONS.filter((s) => s.id !== 'contact').map((s) => {
              return (
                <button
                  key={s.id}
                  type="button"
                  data-cursor
                  onClick={() => {
                    if (s.id === 'work') goToWork();
                    else if (s.id === 'about') goToAbout();
                    else if (s.id === 'services') goToServicesSection();
                    else goToSection(HOME_SECTIONS.findIndex((hs) => hs.id === s.id));
                  }}
                  className={desktopLinkClass}
                >
                  {t(s.label)}
                </button>
              );
            })}
            <Link
              href="/pricing"
              data-cursor
              onClick={(e) => {
                e.preventDefault();
                pageNavigate('/pricing', PRICING_WASH);
              }}
              className={desktopLinkClass}
            >
              {t(PRICING_LABEL)}
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:justify-self-end">
            {/* Desktop: plain text CTA — the icon + animated "Call Us"
                reveal below reads as a phone-call prompt, misleading on a
                button that actually opens WhatsApp, so desktop keeps the
                original text pill instead. */}
            <a
              href={whatsappHref(WA_MESSAGE)}
              data-cursor
              className="hidden h-9 flex-shrink-0 items-center rounded-full bg-[#6367FF] px-6 font-display text-base font-medium tracking-normal text-white transition-colors duration-300 hover:bg-[#4f52e0] md:flex"
            >
              {t(CONTACT_LABEL)}
            </a>

            <a
              href={whatsappHref(WA_MESSAGE)}
              data-cursor
              onClick={() => setOpen(false)}
              aria-label={t(CONTACT_LABEL)}
              className="flex h-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#6367FF] px-[13px] text-white transition-colors duration-300 hover:bg-[#4f52e0] md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="h-[18px] w-[18px] flex-shrink-0"
              >
                <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2Z" />
              </svg>
              <span
                aria-hidden
                className="overflow-hidden whitespace-nowrap font-display text-sm font-medium tracking-normal transition-[max-width,margin] duration-500 ease-out"
                style={{ maxWidth: callUsOpen ? '72px' : '0px', marginLeft: callUsOpen ? '8px' : '0px' }}
              >
                {t(CALL_US_LABEL)}
              </span>
            </a>

            {/* Burger — mobile-only now; desktop shows the inline nav above. */}
            <button
              ref={burgerRef}
              type="button"
              data-cursor
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-[3px] rounded-full bg-[#F3F4F4] transition-colors duration-300 md:hidden"
            >
              <span
                className={cn(
                  'block h-[3px] w-5 rounded-full transition-colors duration-300',
                  'bg-black',
                  open && 'translate-y-[6px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'block h-[3px] w-5 rounded-full transition-colors duration-300',
                  'bg-black',
                  open && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-[3px] w-5 rounded-full transition-colors duration-300',
                  'bg-black',
                  open && '-translate-y-[6px] -rotate-45'
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Dims and blurs the page behind the menu while it's open. */}
      <div
        aria-hidden
        className={cn(
          'fixed inset-0 z-30 bg-black/60 backdrop-blur-sm',
          open
            ? 'pointer-events-auto opacity-100 transition-[opacity,backdrop-filter] duration-300'
            : 'pointer-events-none opacity-0 transition-none'
        )}
      />

      {/* Full-screen panel, mobile-only now (the burger that opens it is
          hidden on desktop) — snaps open/closed instantly, no clip-path
          transition. */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        style={{ clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
        className={cn(
          'fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-white px-6 pb-10 pt-28 md:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <nav
          ref={linksRef}
          aria-label="Sections"
          className="relative flex flex-col gap-1"
        >
          {SECTIONS.map((s) => {
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
                  else if (s.id === 'services') goToServicesSection();
                  else goToSection(HOME_SECTIONS.findIndex((hs) => hs.id === s.id));
                }}
                className="flex items-baseline gap-4 py-2 text-left text-[#061E29]"
              >
                <span className="font-display text-2xl font-semibold leading-none">{t(s.label)}</span>
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
            className="flex items-baseline gap-4 py-2 text-left text-[#061E29]"
          >
            <span className="font-display text-2xl font-semibold leading-none">{t(PRICING_LABEL)}</span>
          </Link>
        </nav>

        <div
          className={cn(
            'relative flex flex-col gap-3 text-sm text-[#061E29]',
            open ? 'opacity-100' : 'opacity-0'
          )}
        >
          <LangToggle light className="w-fit" />
        </div>

      </div>
    </>
  );
}
