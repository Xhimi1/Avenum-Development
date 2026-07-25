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
  /** URL segment for this project's case-study page, e.g. '/portfolio/kroni-restaurant' */
  slug: string;
  /** real screenshot for the case-study page's own hero (aspect-video); falls back to a placeholder when absent */
  heroImage?: string;
  /** short subtext under the project name on the case-study hero */
  description?: Bi;
  /** live site URL — shown as a "Live website" button under the description */
  liveUrl?: string;
  /** freeform bilingual labels — shown as pills on the case-study hero */
  services?: Bi[];
  /** two mockup screenshots for the case-study "Project overview" section; falls back to placeholders when absent */
  overviewImages?: [string?, string?];
  /** backdrop behind the first overview mockup (it has a transparent background); falls back to canvasColor when absent */
  overviewBg?: string;
  /** zoom applied to both overview mockups inside their 4:3 box; defaults to 1.7 — lower it for tall/portrait shots that would otherwise crop */
  overviewImageScale?: number;
  /** object-fit for both overview mockups; defaults to 'contain' */
  overviewImageFit?: 'contain' | 'cover';
  /** "Our approach" body copy on the case-study page */
  approach?: Bi;
}

export const PROJECTS: Project[] = [
  {
    name: 'Kroni Restaurant',
    category: { en: 'Restaurant', sq: 'Restorant' },
    tagColor: '#c2883f',
    image: '/images/kroni-mockup.webp',
    canvasColor: 'linear-gradient(180deg, #C0F0E7 0%, #79A79E 100%)',
    slug: 'kroni-restaurant',
    heroImage: '/images/kroni-restaurant-hero.webp',
    overviewImages: ['/images/kroni-restaurant-overview-1.webp'],
    overviewImageScale: 1.1,
    overviewImageFit: 'cover',
    liveUrl: '#', // TODO: swap in Kroni's real live domain
    description: {
      en: 'A bilingual website for Kroni, a beachfront bar-restaurant-pizzeria with guest apartments in Velipojë, Albania.',
      sq: 'Një faqe interneti dygjuhëshe për Kroni, një bar-restorant-piceri me apartamente për mysafirë buzë plazhit në Velipojë, Shqipëri.',
    },
    services: [
      { en: 'Website Design & Visual Identity', sq: 'Dizajn Faqeje & Identitet Vizual' },
      { en: 'Interactive Digital Menu (bilingual, searchable, categorized)', sq: 'Menu Dixhitale Interaktive (dygjuhëshe, e kërkueshme, e kategorizuar)' },
      { en: 'Apartment Booking Page (room carousel, amenities, Booking.com integration)', sq: 'Faqe Rezervimi Apartamentesh (karusel dhomash, pajisje, integrim me Booking.com)' },
      { en: 'WhatsApp Reservations for Tables & Rooms', sq: 'Rezervime përmes WhatsApp për Tavolina & Dhoma' },
      { en: 'Location & Google Reviews Integration', sq: 'Integrim i Vendndodhjes & Vlerësimeve në Google' },
      { en: 'Motion & Interaction Design', sq: 'Dizajn Lëvizjeje & Ndërveprimi' },
    ],
    approach: {
      en: 'One site that works equally well for a walk-up diner scanning a QR code and a tourist booking a stay — reservations route straight to WhatsApp, Booking.com and Google, so there’s nothing new to maintain. The menu and apartments got their own dedicated pages, while the rest stays a fast, boutique-feeling scroll built with Next.js.',
      sq: 'Një faqe e vetme që funksionon njësoj mirë për klientin që skanon kod QR dhe turistin që rezervon qëndrim — rezervimet kalojnë direkt në WhatsApp, Booking.com dhe Google, pa asgjë të re për t’u mirëmbajtur. Menuja dhe apartamentet morën faqet e tyre të dedikuara, ndërsa pjesa tjetër mbetet një faqe e shpejtë dhe butike e ndërtuar me Next.js.',
    },
  },
  {
    name: 'Riva Restaurant',
    category: { en: 'Restaurant', sq: 'Restorant' },
    tagColor: '#b5657e',
    image: '/images/riva-mockup.webp',
    canvasColor: 'linear-gradient(180deg, #F0B584 0%, #FCE3CC 100%)',
    overviewBg: '#E73F1E',
    slug: 'riva-restaurant',
    heroImage: '/images/riva-restaurant-hero.webp',
    liveUrl: 'https://riva-restaurant.al',
    overviewImages: ['/images/riva-restaurant-overview-1.webp'],
    description: {
      en: 'A one-page website for Riva, a seaside Mediterranean restaurant in Durrës, Albania, built to turn visitors into table reservations and 5-star reviews.',
      sq: 'Një faqe web për Riva, një restorant mesdhetar pranë detit në Durrës, e ndërtuar për të kthyer vizitorët në rezervime tavolinash dhe review-e 5-yjesh.',
    },
    services: [
      { en: 'Website Design & Development', sq: 'Dizajnim dhe Zhvillim i Website-it' },
      { en: 'WhatsApp-Based Table Reservations', sq: 'Rezervime Tavolinash nëpërmjet WhatsApp' },
      { en: 'Bilingual Digital Menu (Albanian/English)', sq: 'Menu Dixhitale Dygjuhëshe (Shqip/Anglisht)' },
      { en: 'Review & Feedback Funnel', sq: 'Funnel për Review-e dhe Feedback' },
      { en: 'Custom Motion & Interaction Design', sq: 'Animacione dhe Ndërveprim i Personalizuar' },
      { en: 'SEO & Local Search Setup', sq: 'SEO dhe Konfigurim për Kërkim Lokal' },
      { en: 'Cookie Consent & Privacy Compliance', sq: 'Pëlqim për Cookies dhe Përputhshmëri me Privatësinë' },
    ],
    approach: {
      en: 'Riva needed a site as considered as the restaurant itself, without a booking platform it didn’t need — every conversion point, from reservations to feedback, routes straight to WhatsApp. A star-rating gate sends happy diners to a Google review while catching unhappy ones privately first.',
      sq: 'Riva kishte nevojë për një faqe po aq të kuruar sa vetë restoranti, pa një platformë rezervimesh që s’i shërbente — çdo pikë konvertimi, nga rezervimet te feedback-u, kalon direkt në WhatsApp. Një filtër me yje i çon mysafirët e kënaqur te një review në Google, ndërsa ata të pakënaqur i mbledh më parë privatisht.',
    },
  },
  {
    name: 'Platinum Fitness',
    category: { en: 'Gym', sq: 'Palestër' },
    tagColor: '#4d6bff',
    image: '/images/platinum-mockup.webp',
    imageScale: 1.3,
    canvasColor: 'linear-gradient(180deg, #FFE789 0%, #FFF7DB 100%)',
    overviewBg: '#063B00',
    slug: 'platinum-fitness',
    heroImage: '/images/platinum-fitness-hero.webp',
    liveUrl: 'https://www.platinumfitness.site',
    overviewImages: ['/images/platinum-fitness-overview-1.webp'],
    description: {
      en: 'A bilingual marketing site for a real gym in Albania, designed to turn visitors into WhatsApp sign-ups.',
      sq: 'Një faqe interneti dygjuhëshe për një palestër reale në Shqipëri, e krijuar për të kthyer vizitorët në regjistrime përmes WhatsApp.',
    },
    services: [
      { en: 'Website Design & Development', sq: 'Dizajnim dhe Zhvillim Faqeje' },
      { en: 'Bilingual Localization (English/Albanian)', sq: 'Lokalizim Dygjuhësh (Anglisht/Shqip)' },
      { en: 'Membership & Pricing Pages', sq: 'Faqe Anëtarësimi dhe Çmimesh' },
      { en: 'Class Schedule', sq: 'Orari i Klasave' },
      { en: 'WhatsApp-Based Enrollment', sq: 'Regjistrim përmes WhatsApp' },
      { en: 'Promotions & Social Proof (countdown offers, Google reviews)', sq: 'Promocione dhe Vlerësime (oferta me kohëmatës, vlerësime Google)' },
    ],
    approach: {
      en: 'A fast, image-driven site that feels premium but stays simple to act on from a phone — WhatsApp deep links pre-filled per plan and trainer replace a conventional contact form. Small touches like a countdown promo, a Google-reviews marquee and a live class schedule keep it feeling current without needing a CMS.',
      sq: 'Një faqe e shpejtë dhe e fokusuar te vizuali, që duket premium por mbetet e thjeshtë për t’u përdorur nga telefoni — lidhje WhatsApp të para-plotësuara për çdo plan dhe trajner zëvendësojnë një formular klasik kontakti. Detaje si oferta me kohëmatës, vlerësimet nga Google dhe orari live i klasave e mbajnë faqen të freskët pa u dashur një CMS.',
    },
  },
  {
    name: 'Jim Estate',
    category: { en: 'Real Estate', sq: 'Pasuri të Paluajtshme' },
    tagColor: '#3f9c8c',
    image: '/images/atom-mockup.webp',
    canvasColor: 'linear-gradient(180deg, #A9E4D8 0%, #EAF8F4 100%)',
    overviewBg: '#0B1849',
    slug: 'jim-estate',
    heroImage: '/images/jim-estate-hero.webp',
    liveUrl: 'https://jimsestate.vercel.app',
    overviewImages: ['/images/jim-estate-overview-1.webp'],
    description: {
      en: 'A boutique real-estate marketing site with a custom Sanity-powered listings platform, built for a luxury property agency.',
      sq: 'Një faqe marketingu për një agjenci pasurish të paluajtshme, me një platformë listimesh të personalizuar mbi Sanity, ndërtuar për një agjenci pronash luksoze.',
    },
    services: [
      { en: 'Website Design & Development', sq: 'Dizajnim dhe Zhvillim i Faqes së Internetit' },
      { en: 'Custom CMS Integration (Sanity Studio)', sq: 'Integrim i CMS-it të Personalizuar (Sanity Studio)' },
      { en: 'Property Listings & Search', sq: 'Listime dhe Kërkim Pronash' },
      { en: 'Property Detail Pages & Inquiry Forms', sq: 'Faqe Detajesh të Pronës dhe Formularë Kontakti' },
      { en: 'Performance Optimization', sq: 'Optimizim i Performancës' },
    ],
    approach: {
      en: 'A fast, editorial-feeling site built on Next.js with Sanity as a headless CMS, so listings can be updated without touching code via an embedded Studio at /studio. Property pages are statically generated and revalidated every 60 seconds, keeping the site fast without sacrificing fresh content.',
      sq: 'Një faqe e shpejtë, me pamje editoriale, e ndërtuar mbi Next.js me Sanity si CMS headless, që listimet të përditësohen pa prekur kodin përmes një Studio të integruar te /studio. Faqet e pronave gjenerohen statikisht dhe rifreskohen çdo 60 sekonda, duke e mbajtur faqen të shpejtë pa sakrifikuar përmbajtjen e freskët.',
    },
  },
];
