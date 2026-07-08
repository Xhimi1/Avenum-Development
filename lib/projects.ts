import type { Bi } from './i18n';

export interface Project {
  name: string;
  category: Bi;
  tagline: string;
  year: string;
  /** gradient shader colors for the 3D panel's back face */
  colorA: string;
  colorB: string;
  /** placeholder photo shown on the panel's front face */
  image: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'Lumina Bank',
    category: { en: 'Fintech', sq: 'Fintech' },
    tagline: 'Banking that feels like light',
    year: '2026',
    colorA: '#ffb300',
    colorB: '#ff3d6e',
    image: '/images/Group 1.webp',
  },
  {
    name: 'Pulse Records',
    category: { en: 'Music platform', sq: 'Platformë Muzikore' },
    tagline: 'Sound you can see',
    year: '2025',
    colorA: '#ff6b00',
    colorB: '#d91bff',
    image: '/images/mockup2.0.jpg',
  },
  {
    name: 'Atlas Voyages',
    category: { en: 'Travel', sq: 'Udhëtime' },
    tagline: 'The world, pre-rendered',
    year: '2025',
    colorA: '#ffc93d',
    colorB: '#00b3ff',
    image: '/images/mockup3.jpg',
  },
  {
    name: 'Neon Market',
    category: { en: 'E-commerce', sq: 'E-commerce' },
    tagline: 'Shopping at the speed of thought',
    year: '2024',
    colorA: '#ff9e00',
    colorB: '#7c3aed',
    image: '/images/mockup4.jpg',
  },
];
