import { create } from 'zustand';

export type Locale = 'en' | 'sq';

interface AppState {
  /** intro reveal finished — scrolling unlocks */
  ready: boolean;
  quality: 'high' | 'low';
  reducedMotion: boolean;
  /** index into SECTIONS of the section nearest the viewport */
  section: number;
  /** site language — persisted to localStorage by <LangToggle> */
  locale: Locale;
  /** homepage section jump, installed by <SmoothScroll> */
  navigate: (sectionIndex: number) => void;
  /** route navigation, installed by <PageWash>. Callers may still pass an
   *  accent/bg color pair (a holdover from the old color-wash transition);
   *  it's accepted but ignored. */
  pageNavigate: (href: string, colors?: { accent: string; bg: string }) => void;
  setLocale: (locale: Locale) => void;
}

export const useStore = create<AppState>()((set) => ({
  ready: false,
  quality: 'high',
  reducedMotion: false,
  section: 0,
  locale: 'sq',
  navigate: () => {},
  pageNavigate: () => {},
  setLocale: (locale) => set({ locale }),
}));
