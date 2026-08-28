'use client';

import { useState } from 'react';
import { useT, type Bi } from '@/lib/i18n';
import { whatsappHref } from '@/lib/contact';

const NAV_CTA: Bi = { en: 'Talk to us', sq: 'Na shkruaj' };
const MENU_LINK: Bi = { en: 'Menus & booking', sq: 'Menu & rezervime' };
const HOTELS_LINK: Bi = { en: 'Hotels', sq: 'Hotele' };
const WORK_LINK: Bi = { en: 'Our work', sq: 'Punët tona' };
const CONTACT_LINK: Bi = { en: 'Contact', sq: 'Kontakt' };

const WA_MESSAGE_HOSPITALITY =
  'Përshëndetje. Kam një restorant/hotel dhe dua një faqe web. Mund të flasim?';

const LINKS: Array<{ id: string; label: Bi }> = [
  { id: 'menu', label: MENU_LINK },
  { id: 'hotels', label: HOTELS_LINK },
  { id: 'work', label: WORK_LINK },
  { id: 'contact', label: CONTACT_LINK },
];

/** Floating pill nav for the Hospitality page — collapsed to a brand mark
 *  + burger; clicking the burger expands the same pill downward to reveal
 *  section links and the CTA, instead of a full-screen takeover. */
export default function HospitalityNav() {
  const t = useT();
  const waLink = whatsappHref(WA_MESSAGE_HOSPITALITY);
  const [open, setOpen] = useState(false);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="absolute inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <div
        className={`w-full max-w-[26rem] overflow-hidden rounded-[2rem] border border-black/5 bg-white/70 shadow-sm backdrop-blur-xl transition-[max-height] duration-500 ease-in-out ${
          open ? 'max-h-[28rem]' : 'max-h-[3.5rem]'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-2.5 md:px-7">
          <span className="font-[family-name:var(--font-general-sans)] text-black">
            <span className="text-base font-normal tracking-[-0.035em] md:text-lg">AVENUM</span>
            <span className="ml-2 text-[0.65rem] font-extralight tracking-normal text-black/50 md:text-xs">for hospitality</span>
          </span>

          <button
            type="button"
            data-cursor
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menu"
            className="flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`h-px w-5 bg-black transition-transform duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-5 bg-black transition-transform duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
            />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6 pb-6 md:px-7">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              data-cursor
              onClick={() => goTo(l.id)}
              className="py-2 text-left font-[family-name:var(--font-general-sans)] text-lg font-light tracking-[-0.02em] text-black transition-colors duration-300 hover:text-[#12544F]"
            >
              {t(l.label)}
            </button>
          ))}
          <a
            href={waLink}
            data-cursor
            className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#12544F] px-3.5 py-1.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-[#12544F]/85"
          >
            {t(NAV_CTA)}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
