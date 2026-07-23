import type { Bi } from './i18n';

export interface Project {
  name: string;
  category: Bi;
  /** eyebrow-pill color for this project's industry — muted, not saturated */
  tagColor: string;
  tagline: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'Riva Restaurant',
    category: { en: 'Restaurant', sq: 'Restorant' },
    tagColor: '#c2883f',
    tagline: 'Menu, rezervime dhe atmosferë — gjithçka online.',
  },
  {
    name: 'Kroni Restaurant',
    category: { en: 'Restaurant', sq: 'Restorant' },
    tagColor: '#b5657e',
    tagline: 'Prezantim modern për një restorant tradicional.',
  },
  {
    name: 'Platinum Fitness',
    category: { en: 'Gym', sq: 'Palestër' },
    tagColor: '#4d6bff',
    tagline: 'Faqe interneti moderne për një palestër premium.',
  },
  {
    name: 'Atom Club',
    category: { en: 'Nightclub (prototype)', sq: 'Klub Nate (prototip)' },
    tagColor: '#3f9c8c',
    tagline: 'Prototip — koncept për një klub nate.',
  },
];
