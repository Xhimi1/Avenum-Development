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
import { cn, prefersReducedMotion } from '@/lib/utils';
import LangToggle from '@/components/ui/LangToggle';
import Logo from '@/components/ui/Logo';
import ServiceIcon from '@/components/services/ServiceIcon';
import { EMAIL } from '@/lib/contact';

const PRICING_LABEL = { en: 'Pricing', sq: 'Çmimet' };
const BACK_LABEL = { en: 'Back', sq: 'Kthehu' };
const REMOTE_LINE = {
  en: 'Tirana · we build for other cities too',
  sq: 'Tiranë · punojmë edhe për qytete të tjera',
};
const PRICING_WASH = { accent: '#8b5cf6', bg: '#1c0f36' };
const contactSection = SECTIONS.find((s) => s.id === 'contact')!;
const aboutSection = SECTIONS.find((s) => s.id === 'about')!;

export default function Nav() {
  const navigate = useStore((s) => s.navigate);
  const pageNavigate = useStore((s) => s.pageNavigate);
  const t = useT();
  const pathname = usePathname();
  const onHomePage = pathname === '/';
  const [open, setOpen] = useState(false);
  const linksRef = useRef<HTMLElement>(null);

  // Desktop "Services" dropdown — closes on an outside click. The dropdown
  // sits below the pill with a visual gap (it's absolutely positioned, so
  // that gap isn't part of the pill's own hit box), so a plain onMouseLeave
  // fires the instant the cursor crosses into that gap. A short close delay,
  // cancelled by re-entering either the button or the panel, bridges it.
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesCloseTimeout = useRef<number | null>(null);
  const clearServicesCloseTimeout = () => {
    if (servicesCloseTimeout.current != null) {
      window.clearTimeout(servicesCloseTimeout.current);
      servicesCloseTimeout.current = null;
    }
  };
  const openServices = () => {
    clearServicesCloseTimeout();
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    clearServicesCloseTimeout();
    servicesCloseTimeout.current = window.setTimeout(() => setServicesOpen(false), 250);
  };
  useEffect(() => clearServicesCloseTimeout, []);
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [servicesOpen]);

  // Mobile "Services" row expands a submenu in place; collapses whenever the
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
    goToSection(i);
  };

  return (
    <>
      {/* dims the rest of the page while the desktop Services dropdown is open */}
      <div
        aria-hidden
        onClick={() => setServicesOpen(false)}
        className={cn(
          'fixed inset-0 z-40 hidden bg-black/50 transition-opacity duration-300 md:block',
          servicesOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      {/* full-width bar, border only at the bottom, always visible */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0F0824]">
        <div className="pointer-events-auto mx-auto flex w-full max-w-[90rem] items-center justify-between px-6 py-2.5 md:px-12">
          <Logo onClick={() => go(0)} className="text-2xl text-white" />

          {/* Desktop links */}
          <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
            {SECTIONS.slice(1).map((s, i) => {
              // Contact is rendered separately as a pill button, at the end.
              if (s.id === 'contact') return null;
              if (s.id === 'services') {
                return (
                  <div
                    key={s.id}
                    ref={servicesRef}
                    onMouseLeave={scheduleCloseServices}
                    className="relative"
                  >
                    <button
                      type="button"
                      data-cursor
                      onClick={() => setServicesOpen((o) => !o)}
                      onMouseEnter={openServices}
                      aria-expanded={servicesOpen}
                      className={cn(
                        'flex items-center gap-1.5 text-xs tracking-normal transition-colors duration-300',
                        'text-[#BFC9D1] hover:text-white'
                      )}
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
                        className={cn('h-3 w-3 transition-transform duration-300', servicesOpen && 'rotate-180')}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {/* dropdown — anchored under the Services link, fades in fast while sliding up into place */}
                    <div
                      onMouseEnter={openServices}
                      onMouseLeave={scheduleCloseServices}
                      className={cn(
                        'absolute left-0 top-full z-10 mt-3 w-[22rem] rounded-md border border-white/15 bg-black shadow-2xl transition-all duration-150 ease-out',
                        servicesOpen
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none translate-y-2 opacity-0'
                      )}
                    >
                      <div className="p-2">
                        <div className="grid grid-cols-2 gap-1">
                          {NAV_SERVICES.map((svc) => (
                            <button
                              key={svc.href}
                              type="button"
                              data-cursor
                              onClick={() => {
                                setServicesOpen(false);
                                goToService(svc.href, svc.accent);
                              }}
                              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-200 hover:bg-white/10"
                            >
                              <ServiceIcon id={svc.id} className="h-5 w-5 shrink-0 text-white" />
                              <div className="min-w-0">
                                <div className="text-xs font-medium text-white">{t(svc.title)}</div>
                                <div className="mt-0.5 truncate text-[0.65rem] text-white/45">{t(svc.desc)}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              // "About" and "Work" open their own pages instead of scrolling
              // to a homepage section.
              return (
                <button
                  key={s.id}
                  type="button"
                  data-cursor
                  onClick={() => (s.id === 'work' ? goToWork() : s.id === 'about' ? goToAbout() : goToSection(i + 1))}
                  className={cn(
                    'text-xs tracking-normal transition-colors duration-300',
                    'text-[#BFC9D1] hover:text-white'
                  )}
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
              className="text-xs tracking-normal text-[#BFC9D1] transition-colors duration-300 hover:text-white"
            >
              {t(PRICING_LABEL)}
            </Link>
            <LangToggle />
            <button
              type="button"
              data-cursor
              onClick={() => goToSection(SECTIONS.indexOf(contactSection))}
              className="rounded-full bg-white px-4 py-1.5 text-xs font-medium tracking-normal text-black"
            >
              {t(contactSection.label)}
            </button>
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[6px] md:hidden"
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
      </header>

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
        <nav
          ref={linksRef}
          aria-label="Sections"
          className={cn(
            'relative flex flex-col gap-1 transition-transform duration-300 ease-out',
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
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-white"
                >
                  <span className="font-display text-4xl font-semibold leading-none">{t(s.label)}</span>
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
                  else goToSection(i);
                }}
                className="flex items-baseline gap-4 py-4 text-left text-white"
              >
                <span className="font-display text-4xl font-semibold leading-none">{t(s.label)}</span>
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
            className="flex items-baseline gap-4 py-4 text-left text-white hover:text-[var(--accent)]"
          >
            <span className="font-display text-4xl font-semibold leading-none">{t(PRICING_LABEL)}</span>
          </Link>
        </nav>

        <div
          style={{ transitionDelay: open ? '0.42s' : '0s' }}
          className={cn(
            'subtext relative flex flex-col gap-3 text-sm transition-[opacity,transform] duration-500 motion-reduce:transition-none',
            open ? 'opacity-100' : 'opacity-0',
            mobileServicesOpen && '-translate-x-8'
          )}
        >
          <a
            href={`mailto:${EMAIL}`}
            className="w-fit transition-colors hover:text-[var(--accent)]"
          >
            {EMAIL}
          </a>
          <p>{t(REMOTE_LINE)}</p>
          <LangToggle className="mt-1 w-fit" />
        </div>

        {/* Services drill-in — slides over the full menu from the right */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col bg-[#0a0a0d] px-6 pb-10 pt-28 transition-transform duration-300 ease-out',
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
                <div className="min-w-0 truncate font-display text-2xl font-semibold leading-none">{t(svc.title)}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
