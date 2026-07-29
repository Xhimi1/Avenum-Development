'use client';

import { useT, type Bi } from '@/lib/i18n';
import { whatsappHref } from '@/lib/contact';
import ArrowRight from '@/components/ui/ArrowRight';

const WA_MESSAGE: Bi = {
  en: "Hi! I'd like to book a call.",
  sq: 'Përshëndetje! Do të doja të rezervoja një bisedë.',
};
const TITLE: Bi = { en: 'Book a call', sq: 'Rezervo një bisedë' };
const SUBTITLE: Bi = { en: 'Send us a message', sq: 'Na shkruaj një mesazh' };

/** Sticky bottom-right CTA — visible on every page from the moment it loads. */
export default function BookCallPill() {
  const t = useT();

  return (
    <a
      href={whatsappHref(t(WA_MESSAGE))}
      data-cursor
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-black/10 bg-[#BFC9D1] py-2.5 pl-3 pr-4 shadow-2xl"
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
