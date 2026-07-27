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
  /** excludes this project from the homepage Work slider while still showing it on the /portfolio grid */
  hideFromHome?: boolean;
  /** shows a faint "(Prototype)" label next to the project name wherever it's displayed */
  isPrototype?: boolean;
}

export const PROJECTS: Project[] = [
  {
    name: 'Kroni Restaurant',
    category: { en: 'Restaurant', sq: 'Restorant' },
    tagColor: '#c2883f',
    image: '/images/kroni-mockup.webp',
    canvasColor: '#5996FF',
    overviewBg: '#5996FF',
    slug: 'kroni-restaurant',
    heroImage: '/images/kroni-restaurant-hero.webp',
    overviewImages: ['/images/kroni-restaurant-overview-1.webp', '/images/kroni-restaurant-overview-2.webp'],
    overviewImageScale: 1.1,
    overviewImageFit: 'cover',
    liveUrl: 'https://kroni-restaurant.com',
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
    image: '/images/riva-restaurant-card.webp',
    canvasColor: '#8FA28A',
    overviewBg: '#8FA28A',
    slug: 'riva-restaurant',
    heroImage: '/images/riva-restaurant-hero.webp',
    liveUrl: 'https://riva-restaurant.al',
    overviewImages: ['/images/riva-restaurant-overview-1.webp', '/images/riva-restaurant-overview-2.webp'],
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
    canvasColor: '#FDC086',
    overviewBg: '#FDC086',
    slug: 'platinum-fitness',
    heroImage: '/images/platinum-fitness-hero.webp',
    liveUrl: 'https://www.platinumfitness.site',
    overviewImages: ['/images/platinum-fitness-overview-1.webp', '/images/platinum-fitness-overview-2.webp'],
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
    name: 'Angels Fitness',
    isPrototype: true,
    hideFromHome: true,
    category: { en: 'Gym', sq: 'Palestër' },
    tagColor: '#d94f4f',
    image: '/images/angels-fitness-card.webp',
    canvasColor: '#65DCD5',
    overviewBg: '#65DCD5',
    slug: 'angels-fitness',
    heroImage: '/images/angels-fitness-hero.webp',
    liveUrl: 'https://angels-fitness.vercel.app/',
    overviewImages: ['/images/angels-fitness-overview-1.webp', '/images/angels-fitness-overview-2.webp'],
    description: {
      en: 'A bold, high-energy website for a premium gym in Tirana, built to turn visitors into members.',
      sq: "Një faqe interneti e fuqishme dhe moderne për një palestër premium në Tiranë, e menduar për t'i kthyer vizitorët në anëtarë.",
    },
    services: [
      { en: 'Website Design', sq: 'Dizajn Faqeje' },
      { en: 'Class & Program Showcase', sq: 'Prezantimi i Programeve dhe Klasave' },
      { en: 'Trainer Profiles', sq: 'Profilet e Trajnerëve' },
      { en: 'Membership Pricing Plans', sq: 'Planet e Çmimeve për Anëtarësim' },
      { en: 'Online Sign-Up', sq: 'Regjistrim Online' },
      { en: 'Reviews & Testimonials', sq: 'Vlerësime dhe Përshtypje nga Klientët' },
      { en: 'WhatsApp Contact Integration', sq: 'Kontakt i Drejtpërdrejtë në WhatsApp' },
    ],
    approach: {
      en: 'The brief was to give a Tirana gym an online presence as intense as the training itself — something that felt premium, not like a generic gym template. We designed a dark, editorial look with oversized bold type and smooth animations that reveal each section as you scroll, making the site feel alive rather than static. Every part — the weekly schedule, trainer bios, pricing tiers, and real member reviews — was laid out to walk a visitor straight toward signing up, with a floating WhatsApp button keeping a real conversation always one tap away. The result feels bigger and more polished than a typical local gym site, which was the whole point.',
      sq: "Kërkesa ishte t'i jepnim një palestre në Tiranë një prani online po aq intensive sa vetë stërvitja — diçka premium, jo si një faqe e zakonshme palestre. Krijuam një pamje të errët dhe elegante, me shkronja të mëdha e të forta dhe animacione të buta që zbulojnë çdo pjesë të faqes ndërsa lëviz poshtë, duke e bërë faqen të duket e gjallë dhe jo statike. Çdo pjesë — orari javor, trajnerët, planet e çmimeve dhe vlerësimet e vërteta të klientëve — u vendos në mënyrë që ta udhëheqë vizitorin drejt regjistrimit, ndërsa një buton WhatsApp gjithmonë i dukshëm e mban kontaktin real vetëm një klikim larg. Rezultati duket më i madh dhe më i kompletuar se një faqe e zakonshme palestre lokale — dhe pikërisht kjo ishte qëllimi.",
    },
  },
  {
    name: 'Jim Estate',
    isPrototype: true,
    category: { en: 'Real Estate', sq: 'Pasuri të Paluajtshme' },
    tagColor: '#3f9c8c',
    image: '/images/atom-mockup.webp',
    canvasColor: '#F8B2B2',
    overviewBg: '#F8B2B2',
    slug: 'jim-estate',
    heroImage: '/images/jim-estate-hero.webp',
    liveUrl: 'https://jimsestate.vercel.app',
    overviewImages: ['/images/jim-estate-overview-1.webp', '/images/jim-estate-overview-2.webp'],
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
