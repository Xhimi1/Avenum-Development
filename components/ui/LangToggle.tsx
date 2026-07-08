'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'avenum-locale';

/**
 * EN/SQ language switch. Rendered once per page header; reads the saved
 * locale from localStorage on mount so the choice persists across full
 * reloads and separate standalone pages (which don't share a route tree).
 */
export default function LangToggle({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const locale = useStore((s) => s.locale);
  const setLocale = useStore((s) => s.setLocale);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if ((saved === 'en' || saved === 'sq') && saved !== locale) setLocale(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (l: Locale) => {
    setLocale(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  const activeClasses = light ? 'bg-black text-white' : 'bg-white text-black';
  const inactiveClasses = light
    ? 'text-black/50 hover:text-black'
    : 'text-white/60 hover:text-white';

  return (
    <div
      className={cn(
        'pointer-events-auto inline-flex items-center gap-0.5 rounded-full border p-0.5 text-[11px] font-medium tracking-normal',
        light ? 'border-black/15' : 'border-white/15',
        className
      )}
    >
      {(['en', 'sq'] as const).map((l) => (
        <button
          key={l}
          type="button"
          data-cursor
          onClick={() => choose(l)}
          aria-pressed={locale === l}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase transition-colors duration-300',
            locale === l ? activeClasses : inactiveClasses
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
