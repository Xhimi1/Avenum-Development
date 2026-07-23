import { create } from 'zustand';

export type Locale = 'en' | 'sq';

interface AppState {
  /** intro loader finished — scrolling unlocks */
  ready: boolean;
  quality: 'high' | 'low';
  reducedMotion: boolean;
  /** index into SECTIONS of the section nearest the viewport */
  section: number;
  /** site language — persisted to localStorage by <LangToggle> */
  locale: Locale;
  /** color-wash navigation, installed by <ColorWash> */
  navigate: (sectionIndex: number) => void;
  /** color-wash route navigation, installed by <PageWash> */
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
