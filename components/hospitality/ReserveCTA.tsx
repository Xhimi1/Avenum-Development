'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';
import { useT, type Bi } from '@/lib/i18n';
import { whatsappHref } from '@/lib/contact';

const WA_MESSAGE_RESERVE =
  'Përshëndetje. Dua të rezervoj faqen time. Mund të flasim?';

const LABEL: Bi = { en: 'Book your website', sq: 'Rezervo faqen tënde' };

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

/** Sticky bottom-center CTA that rises up from off-screen once the visitor
 *  has scrolled roughly a viewport's worth, then widens from a small circle
 *  into a full pill to reveal its label — width (not scale) is what's
 *  animated so the pill's rounded ends stay true semicircles instead of
 *  stretching into ellipses. Fixed positioning keeps it pinned through the
 *  rest of the scroll, mirroring the site's other sticky CTA. */
export default function ReserveCTA() {
  const t = useT();
  const waLink = whatsappHref(WA_MESSAGE_RESERVE);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const pill = pillRef.current;
    const text = textRef.current;
    if (!wrap || !pill || !text) return;

    if (prefersReducedMotion()) {
      gsap.set(wrap, { y: '0%' });
      gsap.set(pill, {
        width: window.matchMedia('(min-width: 768px)').matches ? 'auto' : '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
      });
      gsap.set(text, { opacity: 1, y: 0, filter: 'blur(0px)' });
      return;
    }

    gsap.set(wrap, { y: '150%' });
    gsap.set(pill, { width: '3.25rem', borderWidth: 0, borderColor: 'rgba(255,255,255,0.25)' });
    gsap.set(text, { opacity: 0, y: 14, filter: 'blur(6px)' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.getElementById('services') ?? document.body,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      tl.to(wrap, { y: '0%', duration: 0.5, ease: 'power3.out' })
        .to(
          pill,
          {
            width: () => (window.matchMedia('(min-width: 768px)').matches ? 'auto' : '100%'),
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.25)',
            duration: 0.5,
            ease: 'power3.inOut',
          },
          '-=0.15'
        )
        .to(text, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' }, '-=0.2');
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 md:px-0">
      <a
        ref={pillRef}
        href={waLink}
        data-cursor
        className="pointer-events-auto flex h-[3.25rem] items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-white/20 bg-black/50 px-6 text-white shadow-2xl backdrop-blur-xl transition-colors duration-300 hover:bg-black/60"
      >
        <span ref={textRef} className="flex items-center gap-1.5 text-sm font-medium">
          {t(LABEL)}
          <Chevron />
        </span>
      </a>
    </div>
  );
}
