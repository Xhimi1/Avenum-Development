'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useT, type Bi } from '@/lib/i18n';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';
import ArrowRight from '@/components/ui/ArrowRight';

const TITLE: Bi = { en: 'Book a call', sq: 'Rezervo një bisedë' };
const SUBTITLE: Bi = { en: 'Send us a message', sq: 'Na shkruaj një mesazh' };

/** How far the visitor needs to scroll before the pill appears. */
const REVEAL_AT = 300;

/** Sticky bottom-right CTA — fades in once the visitor has scrolled a bit,
 *  rather than nudging them the instant a page loads. Hidden entirely on
 *  private one-off pages like /pay/* which shouldn't push the general
 *  contact flow. */
export default function BookCallPill() {
  const t = useT();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > REVEAL_AT);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname?.startsWith('/pay/')) return null;

  return (
    <a
      href={whatsappHref(WA_MESSAGE)}
      data-cursor
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-black/10 bg-[#BFC9D1] py-2.5 pl-3 pr-4 shadow-2xl transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span aria-hidden className="wave-ring" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo/logo-pack/brand-logo.svg" alt="" className="h-3.5 w-auto flex-shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-black">{t(TITLE)}</span>
        <span className="text-xs text-black/60">{t(SUBTITLE)}</span>
      </span>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-black" />
    </a>
  );
}
