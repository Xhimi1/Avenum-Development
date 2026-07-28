'use client';

import { useStore } from '@/lib/store';
import { useT, type Bi } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { whatsappHref } from '@/lib/contact';
import ArrowRight from '@/components/ui/ArrowRight';

const WA_MESSAGE: Bi = {
  en: "Hi! I'd like to book a call.",
  sq: 'Përshëndetje! Do të doja të rezervoja një bisedë.',
};
const TITLE: Bi = { en: 'Book a call', sq: 'Rezervo një bisedë' };
const SUBTITLE: Bi = { en: 'Get started today', sq: 'Fillo sot' };

/** Sticky bottom-right CTA — hidden over the hero, fades in once the user
 *  has scrolled past it into any other section. */
export default function BookCallPill() {
  const section = useStore((s) => s.section);
  const t = useT();
  const visible = section > 0;

  return (
    <a
      href={whatsappHref(t(WA_MESSAGE))}
      data-cursor
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-white/15 bg-neutral-800 py-2.5 pl-3 pr-4 shadow-2xl transition-all duration-500 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo/logo-pack/brand-logo.svg" alt="" className="h-3.5 w-auto flex-shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-white">{t(TITLE)}</span>
        <span className="text-xs text-white/50">{t(SUBTITLE)}</span>
      </span>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-white" />
    </a>
  );
}
