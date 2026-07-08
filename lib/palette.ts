import type { Bi } from './i18n';

export interface SectionDef {
  id: string;
  label: Bi;
  /** deep scene/background tint */
  bg: string;
  /** saturated primary accent */
  accent: string;
  /** secondary glow color */
  glow: string;
}

/**
 * One entry per "location" in the 3D world, in travel order.
 * The camera path, scene background, fog and UI accent all derive from this.
 */
export const SECTIONS: SectionDef[] = [
  { id: 'hero', label: { en: 'Home', sq: 'Ballina' }, bg: '#08080b', accent: '#4d6bff', glow: '#00e5ff' },
  { id: 'services', label: { en: 'Services', sq: 'Shërbimet' }, bg: '#0f0313', accent: '#ff2da6', glow: '#ff7ad9' },
  { id: 'work', label: { en: 'Work', sq: 'Punët' }, bg: '#0a0a0d', accent: '#ffb300', glow: '#ff6b00' },
  { id: 'about', label: { en: 'About', sq: 'Rreth Nesh' }, bg: '#150736', accent: '#8b3dff', glow: '#c77dff' },
  { id: 'contact', label: { en: 'Contact', sq: 'Kontakt' }, bg: '#02101e', accent: '#00e5ff', glow: '#4d6bff' },
];
