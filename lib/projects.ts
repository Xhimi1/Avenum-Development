import type { Bi } from './i18n';

export interface Project {
  name: string;
  category: Bi;
  /** eyebrow-pill color for this project's industry — muted, not saturated */
  tagColor: string;
  tagline: string;
  year: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'Lumina Bank',
    category: { en: 'Fintech', sq: 'Fintech' },
    tagColor: '#4d6bff',
    tagline: 'Banking that feels like light',
    year: '2026',
    image: '/images/Group 1.webp',
  },
  {
    name: 'Pulse Records',
    category: { en: 'Music platform', sq: 'Platformë Muzikore' },
    tagColor: '#b5657e',
    tagline: 'Sound you can see',
    year: '2025',
    image: '/images/mockup2.0.jpg',
  },
  {
    name: 'Atlas Voyages',
    category: { en: 'Travel', sq: 'Udhëtime' },
    tagColor: '#3f9c8c',
    tagline: 'The world, pre-rendered',
    year: '2025',
    image: '/images/mockup3.jpg',
  },
  {
    name: 'Neon Market',
    category: { en: 'E-commerce', sq: 'E-commerce' },
    tagColor: '#c2883f',
    tagline: 'Shopping at the speed of thought',
    year: '2024',
    image: '/images/mockup4.jpg',
  },
];
