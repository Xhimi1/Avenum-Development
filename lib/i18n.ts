import { useStore, type Locale } from './store';

export type { Locale };

/** A bilingual string — one value per supported locale. */
export interface Bi {
  en: string;
  sq: string;
}

/** Resolves a bilingual string for a given locale. */
export function t(bi: Bi, locale: Locale): string {
  return bi[locale];
}

/** Returns a translate function bound to the current locale. */
export function useT() {
  const locale = useStore((s) => s.locale);
  return (bi: Bi) => bi[locale];
}
