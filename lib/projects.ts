import type { Bi } from './i18n';

export interface Project {
  name: string;
  category: Bi;
  /** eyebrow-pill color for this project's industry — muted, not saturated */
  tagColor: string;
  /** real project screenshot, shown centered over a soft sky gradient; falls back to a gray placeholder when absent */
  image?: string;
  /** override the default sky-blue canvas background for this project's image — accepts any CSS background value (solid color or gradient) */
  canvasColor?: string;
  /** zooms the image within its own wrapper to crop out unwanted baked-in padding/margins; leaves aspect ratio and box size untouched */
  imageScale?: number;
}

export const PROJECTS: Project[] = [
  {
    name: 'Kroni Restaurant',
    category: { en: 'Restaurant', sq: 'Restorant' },
    tagColor: '#c2883f',
    image: '/images/kroni-mockup.webp',
    canvasColor: 'linear-gradient(180deg, #C0F0E7 0%, #79A79E 100%)',
  },
  {
    name: 'Riva Restaurant',
    category: { en: 'Restaurant', sq: 'Restorant' },
    tagColor: '#b5657e',
    image: '/images/riva-mockup.webp',
    canvasColor: 'linear-gradient(180deg, #F0B584 0%, #FCE3CC 100%)',
  },
  {
    name: 'Platinum Fitness',
    category: { en: 'Gym', sq: 'Palestër' },
    tagColor: '#4d6bff',
    image: '/images/platinum-mockup.webp',
    imageScale: 1.3,
    canvasColor: 'linear-gradient(180deg, #FFE789 0%, #FFF7DB 100%)',
  },
  {
    name: 'Jim Estate',
    category: { en: 'Real Estate', sq: 'Pasuri të Paluajtshme' },
    tagColor: '#3f9c8c',
    image: '/images/atom-mockup.webp',
  },
];
