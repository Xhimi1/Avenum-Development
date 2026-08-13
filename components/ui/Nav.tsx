'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { SECTIONS, HOME_SECTIONS } from '@/lib/palette';
import { NAV_SERVICES } from '@/lib/services-nav';
import { scrollState } from '@/lib/scroll';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import LangToggle from '@/components/ui/LangToggle';
import ServiceIcon from '@/components/services/ServiceIcon';

const PRICING_LABEL = { en: 'Pricing', sq: 'Paketat' };
const BACK_LABEL = { en: 'Back', sq: 'Kthehu' };
const CONTACT_LABEL = { en: 'Contact', sq: 'Kontakto' };
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

  // Desktop "Services" dropdown — a separate small popover anchored under
  // its own trigger in the inline desktop nav, independent of the mobile
  // full-screen menu below.
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const desktopServicesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!desktopServicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (desktopServicesRef.current?.contains(e.target as Node)) return;
      setDesktopServicesOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [desktopServicesOpen]);

  // Bar behavior driven by scroll position, not CSS `position: sticky`:
  // stays put and visible the whole time (no hide/slide interaction) —
  // transparent at the top, then once scrolled past a threshold it docks
  // flush to the top with a background and the purple brand name, and
  // stays that way for the rest of the page. Reads `window.scrollY`
  // directly (not `scrollState.y`) so it works on every page —
  // `scrollState` is only kept in sync by <SmoothScroll>, which is mounted
  // just on the homepage; Lenis still drives the real window scroll there
  // too, so this stays accurate on the homepage as well. A passive scroll
  // listener (not a gsap.ticker/rAF loop) — the latter would poll every
  // frame for the page's entire lifetime, even while completely idle.
  const [dockedBg, setDockedBg] = useState(false);
  const dockedRef = useRef(dockedBg);
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY >= window.innerHeight * 0.6;
      if (next !== dockedRef.current) {
        dockedRef.current = next;
        setDockedBg(next);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  // Close both menus on Escape, and close the mobile panel if the viewport
  // grows to desktop mid-open (it has no desktop trigger anymore).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      setDesktopServicesOpen(false);
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
  // On mobile, the docked bar's background hides while the full-screen menu
  // is open, so the bar reads as part of that solid black panel instead of
  // showing its own light bg through it.
  const bgVisible = dockedBg && !open;

  const go = (i: number) => {
    setOpen(false);
    goToSection(i);
  };

  // Links always sit on a light background now — the docked bar's own
  // F3F4F4 fill, or the white pill wrapping them when not docked — so the
  // text color no longer needs to branch on the page's own background.
  const desktopLinkClass =
    'font-display text-sm font-medium tracking-normal text-[#061E29] transition-colors duration-300 hover:text-[#6367FF]';

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
          dockedBg ? 'fixed top-0' : 'absolute top-4'
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
        <div className="pointer-events-auto relative mx-auto flex w-full max-w-[90rem] items-center justify-between gap-6 px-6 py-4 md:grid md:grid-cols-[auto_1fr_auto] md:px-12 md:py-3">
          <button
            type="button"
            data-cursor
            onClick={() => go(0)}
            aria-label="Avenum — back to top"
            className="font-display text-3xl font-bold transition-colors duration-300 ease-out md:text-4xl"
            style={{ color: bgVisible ? '#6367FF' : open ? '#ffffff' : onDarkPage ? '#ffffff' : '#061E29' }}
          >
            Avenum
          </button>

          {/* Desktop-only inline nav — mobile keeps the full-screen burger
              menu below, since there's no room to lay these out flat there.
              Not docked: wrapped in its own white pill so it stays readable
              over any page background. Docked: sits directly on the bar's
              own light bg, no separate wrapper needed. */}
          <nav
            className={cn(
              'hidden w-fit items-center justify-center justify-self-center gap-8 md:flex',
              !dockedBg && 'h-11 rounded-full bg-white/70 px-6 shadow-lg shadow-black/5 backdrop-blur-md'
            )}
          >
            {SECTIONS.filter((s) => s.id !== 'contact').map((s) => {
              if (s.id === 'services') {
                return (
                  <div key={s.id} ref={desktopServicesRef} className="relative">
                    <button
                      type="button"
                      data-cursor
                      onClick={() => setDesktopServicesOpen((o) => !o)}
                      aria-expanded={desktopServicesOpen}
                      className={cn(desktopLinkClass, 'flex items-center gap-1.5')}
                    >
                      {t(s.label)}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                        className={cn('h-3.5 w-3.5 transition-transform duration-200', desktopServicesOpen && 'rotate-180')}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    <div
                      className={cn(
                        'absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/10 transition-[opacity,transform] duration-200',
                        desktopServicesOpen
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none -translate-y-2 opacity-0'
                      )}
                    >
                      {NAV_SERVICES.map((svc) => (
                        <Link
                          key={svc.href}
                          href={svc.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setDesktopServicesOpen(false);
                            goToService(svc.href, svc.accent);
                          }}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-black transition-colors duration-200 hover:bg-black/5"
                        >
                          <ServiceIcon id={svc.id} className="h-5 w-5 flex-shrink-0 text-black" />
                          <span className="text-sm font-medium">{t(svc.title)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <button
                  key={s.id}
                  type="button"
                  data-cursor
                  onClick={() => {
                    if (s.id === 'work') goToWork();
                    else if (s.id === 'about') goToAbout();
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
            <a
              href={whatsappHref(WA_MESSAGE)}
              data-cursor
              onClick={() => setOpen(false)}
              className={cn(
                'h-11 flex-shrink-0 items-center rounded-full px-8 font-display text-base font-medium tracking-normal text-white transition-colors duration-300',
                dockedBg ? 'flex bg-[#6367FF] hover:bg-[#4f52e0]' : 'hidden bg-black hover:bg-black/85 md:flex'
              )}
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
                'flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-[3px] rounded-full transition-colors duration-300 md:hidden',
                !open && dockedBg ? 'bg-[#DDDDDD]/70' : 'bg-white'
              )}
            >
              <span
                className={cn(
                  'block h-[3px] w-5 rounded-full transition-colors duration-300',
                  open ? 'bg-black' : 'bg-[#6367FF]',
                  open && 'translate-y-[6px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'block h-[3px] w-5 rounded-full transition-colors duration-300',
                  open ? 'bg-black' : 'bg-[#6367FF]',
                  open && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-[3px] w-5 rounded-full transition-colors duration-300',
                  open ? 'bg-black' : 'bg-[#6367FF]',
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
          'fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-[opacity,backdrop-filter] duration-300',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
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
          'fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-black px-6 pb-10 pt-28 md:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <nav
          ref={linksRef}
          aria-label="Sections"
          className={cn(
            'relative flex flex-col gap-1 transition-transform duration-300 ease-out',
            mobileServicesOpen && '-translate-x-8'
          )}
        >
          {SECTIONS.map((s) => {
            if (s.id === 'services') {
              return (
                <button
                  key={s.id}
                  type="button"
                  data-nav-link
                  onClick={() => setMobileServicesOpen(true)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between gap-4 py-2 text-left text-white"
                >
                  <span className="font-display text-4xl font-semibold uppercase leading-none">{t(s.label)}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="h-5 w-5 shrink-0"
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
                  else goToSection(HOME_SECTIONS.findIndex((hs) => hs.id === s.id));
                }}
                className="flex items-baseline gap-4 py-2 text-left text-white"
              >
                <span className="font-display text-4xl font-semibold uppercase leading-none">{t(s.label)}</span>
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
            className="flex items-baseline gap-4 py-2 text-left text-white"
          >
            <span className="font-display text-4xl font-semibold uppercase leading-none">{t(PRICING_LABEL)}</span>
          </Link>
        </nav>

        <div
          className={cn(
            'subtext relative flex flex-col gap-3 text-sm',
            open ? 'opacity-100' : 'opacity-0',
            mobileServicesOpen && '-translate-x-8'
          )}
        >
          <LangToggle className="w-fit" />
        </div>

        {/* Services drill-in — slides over the menu from the right */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col bg-black px-6 pb-10 pt-28 transition-transform duration-300 ease-out',
            mobileServicesOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <button
            type="button"
            onClick={() => setMobileServicesOpen(false)}
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
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

          <div className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
            {NAV_SERVICES.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  goToService(svc.href, svc.accent);
                }}
                className="flex items-center gap-4 py-4 text-left text-white"
              >
                <ServiceIcon id={svc.id} className="h-6 w-6 shrink-0 text-white" />
                <div className="min-w-0 truncate font-display text-2xl font-semibold uppercase leading-none">{t(svc.title)}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
