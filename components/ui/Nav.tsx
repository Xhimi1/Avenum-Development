'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { SECTIONS, HOME_SECTIONS } from '@/lib/palette';
import { scrollState } from '@/lib/scroll';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';
import { useT } from '@/lib/i18n';
import { cn, prefersReducedMotion } from '@/lib/utils';
import LangToggle from '@/components/ui/LangToggle';
import ArrowRight from '@/components/ui/ArrowRight';

const PRICING_LABEL = { en: 'Pricing', sq: 'Paketat' };
const CONTACT_LABEL = { en: 'Contact', sq: 'Kontakto' };
const MENU_LABEL = { en: 'Menu', sq: 'Menu' };
const CLOSE_LABEL = { en: 'Close', sq: 'Mbyll' };
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
  const burgerLabelRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuMounted = useRef(false);
  const barRef = useRef<HTMLDivElement>(null);

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

  // At rest (top of page, unscrolled) the bar is fully transparent — just
  // the logo/links floating over whatever's behind them. It shrinks into a
  // smaller, centered pill with a lightly tinted, blurred backing as the
  // visitor scrolls, scrubbed directly off scrollY (0..1 over the first
  // 100px) rather than snapping at a threshold — so it tracks the
  // finger/wheel movement 1:1 instead of playing a timed transition. Written
  // straight to the DOM via a ref (not React state) so it can update every
  // scroll frame without re-rendering the tree. Stays translucent rather
  // than solid, so the bar's content can stay white the whole way through
  // instead of flipping to dark text.
  useEffect(() => {
    const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;
    let ticking = false;
    const apply = () => {
      ticking = false;
      const el = barRef.current;
      if (!el) return;
      // Geometry always tracks the real scroll position, even while the
      // mobile menu is open (scroll is locked then, so this just holds
      // still) — opening the menu must not snap an already-shrunk pill back
      // to its full-width shape.
      const p = Math.min(1, Math.max(0, window.scrollY / 100));
      const desktop = isDesktop();
      const maxWidth = 1440 - p * (1440 - (desktop ? 768 : 400));
      const padX = desktop ? 48 - p * 32 : 24 - p * 8;
      const padY = desktop ? 8 - p * 2 : 12 - p * 4;
      el.style.maxWidth = `${maxWidth}px`;
      el.style.marginTop = `${(desktop ? 16 : 12) * p}px`;
      el.style.paddingLeft = `${padX}px`;
      el.style.paddingRight = `${padX}px`;
      el.style.paddingTop = `${padY}px`;
      el.style.paddingBottom = `${padY}px`;
      el.style.borderRadius = `${p * 999}px`;
      // Background/blur/shadow, though, always go to their "rest" (p=0)
      // values while the menu is open — the bar sits on top of the panel's
      // opaque white sheet, so it should read as transparent no matter how
      // far down the page it was opened from.
      const bgP = open ? 0 : p;
      el.style.backgroundColor = `rgba(${Math.round(bgP * 255)}, ${Math.round(bgP * 255)}, ${Math.round(bgP * 255)}, ${(bgP * 0.18).toFixed(3)})`;
      el.style.backdropFilter = `blur(${bgP * 20}px)`;
      el.style.setProperty('-webkit-backdrop-filter', `blur(${bgP * 20}px)`);
      el.style.boxShadow = `0 ${1 + bgP * 9}px ${4 + bgP * 26}px rgba(0, 0, 0, ${(bgP * 0.12).toFixed(3)})`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', apply);
    };
  }, [open]);

  // "Services" is a plain link to the homepage section: no colour wash and
  // no smooth-scroll easing — it lands there immediately. Off the homepage
  // it routes to /#services, where Home's hash effect makes the same
  // instant jump once the intro loader releases scrolling.
  const goToServicesSection = () => {
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

  // Closes the mobile menu and only fires the navigation once its slide-shut
  // transition has actually finished, instead of firing it in the same tick
  // as setOpen(false) — otherwise the page (and its own transition/reveal)
  // would start while the panel is still visibly sliding away.
  const closeMenuThenGo = (fn: () => void) => {
    if (!open) {
      fn();
      return;
    }
    setOpen(false);
    const panel = panelRef.current;
    if (prefersReducedMotion() || !panel) {
      fn();
      return;
    }
    const handleClosed = (e: TransitionEvent) => {
      if (e.target !== panel || e.propertyName !== 'transform') return;
      panel.removeEventListener('transitionend', handleClosed);
      fn();
    };
    panel.addEventListener('transitionend', handleClosed);
  };

  // The panel itself just slides down from behind the header on a plain CSS
  // transition (see its className below) — no JS drives that part. Once it
  // is open, the links stagger in with GSAP; menuMounted just skips that
  // stagger on first paint so the server-rendered (closed) state doesn't
  // animate in on load.
  useLayoutEffect(() => {
    const container = linksRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>('[data-nav-link]');
    gsap.killTweensOf(items);

    if (!menuMounted.current) {
      menuMounted.current = true;
      gsap.set(items, { opacity: open ? 1 : 0, y: 0 });
      return;
    }

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: open ? 1 : 0, y: 0 });
      return;
    }

    if (open) {
      gsap.set(items, { opacity: 0, y: 16 });
      gsap.to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.55, ease: 'power2.out' });
    } else {
      gsap.to(items, { opacity: 0, duration: 0.2, ease: 'power1.in' });
    }
  }, [open]);

  // The burger's own "Menu" / "Mbyll" label swaps with a vertical slide —
  // old word out, new word in — instead of the text just popping. The label
  // is imperative (not driven by JSX) past the first paint so the swap can
  // animate rather than snap; skip the very first run since that initial
  // text already came from the server-rendered markup below.
  const burgerMounted = useRef(false);
  useLayoutEffect(() => {
    const el = burgerLabelRef.current;
    if (!el) return;
    if (!burgerMounted.current) {
      burgerMounted.current = true;
      return;
    }
    const label = open ? t(CLOSE_LABEL) : t(MENU_LABEL);
    if (prefersReducedMotion()) {
      el.textContent = label;
      return;
    }
    gsap.killTweensOf(el);
    gsap
      .timeline()
      .to(el, { yPercent: -100, opacity: 0, duration: 0.16, ease: 'power2.in' })
      .add(() => {
        el.textContent = label;
      })
      .fromTo(el, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.22, ease: 'power2.out' });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `t` is a new
    // function reference every render (useT() isn't memoized); depending on
    // it here would replay this swap animation on every unrelated re-render
    // (e.g. scroll-driven state changes), not just when `open` toggles.
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
    closeMenuThenGo(() => goToSection(i));
  };

  const goToPricing = () => {
    closeMenuThenGo(() => pageNavigate('/pricing', PRICING_WASH));
  };

  const desktopLinkClass =
    'text-sm text-[var(--muted)] transition-colors duration-300 hover:text-white';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Announcement strip. Lives inside the header rather than above it
            so the fixed bar stays one block — dismissing it just makes the
            header shorter, with no offset to keep in sync. The dismiss X is
            a sibling of the link, not nested inside it. */}
        {announceOpen && !open && (
          <div className="relative border-b border-[var(--line)] bg-black text-white">
            <button
              type="button"
              data-cursor
              onClick={goToPricing}
              className="flex w-full items-center justify-center gap-1.5 px-12 py-2.5 text-center text-xs text-[var(--muted)] transition-colors duration-300 hover:text-white"
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

        <div
          ref={barRef}
          className={cn(
            'relative mx-auto grid w-full grid-cols-[1fr_auto_1fr] items-center gap-6 transition-colors duration-300 md:grid-cols-[auto_1fr_auto]',
            open ? 'text-black' : 'text-white'
          )}
        >
          {/* Mobile-only: phone/WhatsApp icon in the left column. Desktop
              shows its own text pill further below instead. Placed first in
              source order so CSS Grid's sparse auto-placement doesn't bump
              it to a second row — it walks explicit column placements in
              DOM order and never backtracks, so a left-column item must
              come before the center-column logo, not after. */}
          <a
            href={whatsappHref(WA_MESSAGE)}
            data-cursor
            onClick={() => setOpen(false)}
            aria-label={t(CONTACT_LABEL)}
            className={cn(
              'col-start-1 flex h-9 w-9 flex-shrink-0 items-center justify-self-start justify-center rounded-full transition-colors duration-300 md:hidden',
              open ? 'text-black' : 'text-white'
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="h-[18px] w-[18px] flex-shrink-0"
            >
              <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2Z" />
            </svg>
          </a>

          <button
            type="button"
            data-cursor
            onClick={() => go(0)}
            aria-label="Avenum — back to top"
            className={cn(
              'col-start-2 flex items-center justify-self-center font-display text-2xl leading-none transition-[color,opacity] duration-300 ease-out hover:opacity-60 md:col-start-1 md:justify-self-start',
              open ? 'text-black' : 'text-white'
            )}
          >
            Avenum
          </button>

          {/* Desktop-only inline nav — mobile keeps the full-screen burger
              menu below, since there's no room to lay these out flat there. */}
          <nav className="hidden w-fit items-center justify-center gap-8 md:col-start-2 md:flex md:justify-self-center">
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

          <div className="col-start-3 flex items-center gap-3 justify-self-end">
            {/* Desktop: plain text CTA — the icon + animated "Call Us"
                reveal (in the left column on mobile) reads as a phone-call
                prompt, misleading on a button that actually opens WhatsApp,
                so desktop keeps the original text pill instead. */}
            <a
              href={whatsappHref(WA_MESSAGE)}
              data-cursor
              className="hidden h-8 flex-shrink-0 items-center rounded-full border border-[var(--line)] px-5 text-sm text-white transition-colors duration-300 hover:bg-white hover:text-black md:flex"
            >
              {t(CONTACT_LABEL)}
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
              className={cn(
                'flex h-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full px-3.5 text-sm transition-colors duration-300 md:hidden',
                open ? 'bg-neutral-100 text-black' : 'text-white'
              )}
            >
              {/* Text is set once here for the server-rendered first paint,
                  then owned imperatively by the effect above so "open"
                  changes can animate the old label out before the new one
                  swaps in, instead of React just overwriting it. */}
              <span ref={burgerLabelRef} className="inline-block">
                {t(MENU_LABEL)}
              </span>
              <span
                aria-hidden
                className="inline-flex items-center overflow-hidden transition-[max-width,margin] duration-300 ease-out"
                style={{ maxWidth: open ? '13px' : '0px', marginLeft: open ? '6px' : '0px' }}
              >
                {/* Slides up from below and fades in, same as the label
                    swap, instead of just clipping into view. */}
                <span
                  className={cn(
                    'flex items-center transition-[transform,opacity] duration-300 ease-out',
                    open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    className="block h-3.5 w-3.5"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </span>
              </span>
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

      {/* Full-screen panel, mobile-only — slides down from behind the header
          on a plain CSS transform transition (like an ordinary mobile nav
          drawer) instead of the GSAP expanding-window reveal used for page
          transitions. Closed state is baked in as a plain class so the
          server-rendered first paint already starts off-screen. */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-40 h-screen w-screen overflow-hidden bg-white transition-transform ease-in-out md:hidden',
          open ? 'translate-y-0 pointer-events-auto duration-1000' : '-translate-y-full pointer-events-none duration-500'
        )}
      >
      <div className="flex h-full w-full flex-col justify-between px-6 pb-10 pt-28">
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
                  closeMenuThenGo(() => {
                    if (s.id === 'work') goToWork();
                    else if (s.id === 'about') goToAbout();
                    else if (s.id === 'services') goToServicesSection();
                    else goToSection(HOME_SECTIONS.findIndex((hs) => hs.id === s.id));
                  });
                }}
                className="flex items-baseline gap-4 py-2 text-left text-black"
              >
                <span className="font-display text-2xl font-medium leading-none">{t(s.label)}</span>
              </button>
            );
          })}
          <Link
            href="/pricing"
            data-nav-link
            onClick={(e) => {
              e.preventDefault();
              closeMenuThenGo(() => pageNavigate('/pricing', PRICING_WASH));
            }}
            className="flex items-baseline gap-4 py-2 text-left text-black"
          >
            <span className="font-display text-2xl font-medium leading-none">{t(PRICING_LABEL)}</span>
          </Link>
        </nav>

        <div
          className={cn(
            'relative flex flex-col gap-3 text-sm text-black/50',
            open ? 'opacity-100' : 'opacity-0'
          )}
        >
          <LangToggle className="w-fit" />
        </div>
      </div>
      </div>
    </>
  );
}
