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
    canvasColor: '#92EEFF',
    overviewBg: '#5996FF',
    slug: 'kroni-restaurant',
    heroImage: '/images/kroni-restaurant-hero.webp',
    overviewImages: ['/images/kroni-restaurant-overview-1.webp', '/images/kroni-restaurant-overview-2.webp'],
    overviewImageScale: 1.1,
    overviewImageFit: 'cover',
    liveUrl: 'https://kroni-restaurant.com',
    description: {
      en: 'A bilingual website for Kroni, a beachfront bar-restaurant-pizzeria with guest apartments in Velipojë, Albania.',
      sq: 'Një faqe web dygjuhëshe për Kroni, një bar-restorant-piceri me apartamente për mysafirë buzë plazhit në Velipojë, Shqipëri.',
    },
    services: [
      { en: 'Website Design & Visual Identity', sq: 'Dizajn Faqeje & Identitet Vizual' },
      { en: 'Interactive Digital Menu (bilingual, searchable, categorized)', sq: 'Menu Dixhitale Interaktive (dygjuhëshe, e kërkueshme, e kategorizuar)' },
      { en: 'Apartment Booking Page (room photos, amenities, connects to Booking.com)', sq: 'Faqe Rezervimi Apartamentesh (foto dhomash, pajisje, lidhet me Booking.com)' },
      { en: 'WhatsApp Reservations for Tables & Rooms', sq: 'Rezervime përmes WhatsApp për Tavolina & Dhoma' },
      { en: 'Location & Google Reviews Built In', sq: 'Vendndodhja & Vlerësimet në Google, të Integruara' },
      { en: 'Smooth Animations Throughout', sq: 'Animacione të Buta Kudo' },
    ],
    approach: {
      en: 'One site that works equally well for a walk-up diner scanning a QR code and a tourist booking a stay — reservations go straight to WhatsApp, Booking.com and Google, so there’s nothing new to maintain. The menu and apartments got their own dedicated pages, while the rest stays a fast, boutique-feeling scroll.',
      sq: 'Një faqe e vetme që funksionon njësoj mirë për klientin që skanon kod QR dhe turistin që rezervon qëndrim — rezervimet shkojnë direkt në WhatsApp, Booking.com dhe Google, pa asgjë të re për t’u mirëmbajtur. Menuja dhe apartamentet morën faqet e tyre të dedikuara, ndërsa pjesa tjetër mbetet një faqe e shpejtë dhe butike.',
    },
  },
  {
    name: 'Riva Restaurant',
    category: { en: 'Restaurant', sq: 'Restorant' },
    tagColor: '#b5657e',
    image: '/images/riva-restaurant-card.webp',
    canvasColor: '#C7D3C0',
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
      { en: 'A Simple Path from Visit to Google Review', sq: 'Një Rrugë e Thjeshtë nga Vizita te Review-i në Google' },
      { en: 'Custom Animations Throughout', sq: 'Animacione të Personalizuara Kudo' },
      { en: 'SEO & Local Search Setup', sq: 'SEO dhe Konfigurim për Kërkim Lokal' },
      { en: 'Cookie Notice, Handled Properly', sq: 'Njoftim për Cookies, i Trajtuar si Duhet' },
    ],
    approach: {
      en: "Riva needed a site as considered as the restaurant itself, without a booking platform it didn't need — every important step, from reservations to feedback, goes straight to WhatsApp. A star-rating check sends happy diners to leave a Google review, while it catches unhappy ones privately first.",
      sq: 'Riva kishte nevojë për një faqe po aq të kuruar sa vetë restoranti, pa një platformë rezervimesh që s’i shërbente — çdo hap i rëndësishëm, nga rezervimet te feedback-u, kalon direkt në WhatsApp. Një kontroll me yje i çon mysafirët e kënaqur të lënë një review në Google, ndërsa ata të pakënaqur i mbledh më parë privatisht.',
    },
  },
  {
    name: 'Platinum Fitness',
    category: { en: 'Gym', sq: 'Palestër' },
    tagColor: '#4d6bff',
    image: '/images/platinum-mockup.webp',
    imageScale: 1.3,
    canvasColor: '#FFEA88',
    overviewBg: '#FDC086',
    slug: 'platinum-fitness',
    heroImage: '/images/platinum-fitness-hero.webp',
    liveUrl: 'https://www.platinumfitness.site',
    overviewImages: ['/images/platinum-fitness-overview-1.webp', '/images/platinum-fitness-overview-2.webp'],
    description: {
      en: 'A bilingual marketing site for a real gym in Albania, designed to turn visitors into WhatsApp sign-ups.',
      sq: 'Një faqe web dygjuhëshe për një palestër reale në Shqipëri, e krijuar për të kthyer vizitorët në regjistrime përmes WhatsApp.',
    },
    services: [
      { en: 'Website Design & Development', sq: 'Dizajnim dhe Zhvillim Faqeje' },
      { en: 'Bilingual Localization (English/Albanian)', sq: 'Lokalizim Dygjuhësh (Anglisht/Shqip)' },
      { en: 'Membership & Pricing Pages', sq: 'Faqe Anëtarësimi dhe Çmimesh' },
      { en: 'Class Schedule', sq: 'Orari i Klasave' },
      { en: 'WhatsApp-Based Enrollment', sq: 'Regjistrim përmes WhatsApp' },
      { en: 'Promotions & Google Reviews (countdown offers, real reviews on display)', sq: 'Promocione dhe Vlerësime Google (oferta me kohëmatës, vlerësime reale)' },
    ],
    approach: {
      en: "A fast, image-driven site that feels premium but stays simple to act on from a phone — WhatsApp buttons already filled in with the right plan and trainer replace a regular contact form. Small touches like a countdown offer, a row of Google reviews and a live class schedule keep it feeling current, with no extra work to update.",
      sq: 'Një faqe e shpejtë dhe e fokusuar te vizuali, që duket premium por mbetet e thjeshtë për t’u përdorur nga telefoni — butona WhatsApp të para-plotësuar për çdo plan dhe trajner zëvendësojnë një formular klasik kontakti. Detaje si oferta me kohëmatës, vlerësimet nga Google dhe orari live i klasave e mbajnë faqen të freskët, pa asnjë punë shtesë.',
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
      sq: "Një faqe web e fuqishme dhe moderne për një palestër premium në Tiranë, e menduar për t'i kthyer vizitorët në anëtarë.",
    },
    services: [
      { en: 'Website Design', sq: 'Dizajn Faqeje' },
      { en: 'Class & Program Showcase', sq: 'Prezantimi i Programeve dhe Klasave' },
      { en: 'Trainer Profiles', sq: 'Profilet e Trajnerëve' },
      { en: 'Membership Pricing Plans', sq: 'Planet e Çmimeve për Anëtarësim' },
      { en: 'Online Sign-Up', sq: 'Regjistrim Online' },
      { en: 'Reviews & Testimonials', sq: 'Vlerësime dhe Përshtypje nga Klientët' },
      { en: 'Direct WhatsApp Contact', sq: 'Kontakt i Drejtpërdrejtë në WhatsApp' },
    ],
    approach: {
      en: "We wanted to give a Tirana gym an online presence as intense as the training itself — something that felt premium, not like a generic gym template. We built a bold, dark look with big text and smooth scroll animations that make the site feel alive, not static. Every part — the weekly schedule, trainer bios, pricing plans, and real member reviews — was laid out to walk a visitor straight toward signing up, with a floating WhatsApp button keeping a real conversation always one tap away. The result feels bigger and more polished than a typical local gym site, which was the whole point.",
      sq: "Donim t'i jepnim një palestre në Tiranë një prani online po aq intensive sa vetë stërvitja — diçka premium, jo si një faqe e zakonshme palestre. Ndërtuam një pamje të errët dhe të fortë, me shkronja të mëdha dhe animacione të buta që e bëjnë faqen të duket e gjallë, jo statike. Çdo pjesë — orari javor, trajnerët, planet e çmimeve dhe vlerësimet e vërteta të klientëve — u vendos në mënyrë që ta udhëheqë vizitorin drejt regjistrimit, ndërsa një buton WhatsApp gjithmonë i dukshëm e mban kontaktin real vetëm një klikim larg. Rezultati duket më i madh dhe më i kompletuar se një faqe e zakonshme palestre lokale — dhe pikërisht kjo ishte qëllimi.",
    },
  },
  {
    name: 'Jim Estate',
    isPrototype: true,
    category: { en: 'Real Estate', sq: 'Pasuri të Paluajtshme' },
    tagColor: '#3f9c8c',
    image: '/images/atom-mockup.webp',
    canvasColor: '#FBD1D1',
    overviewBg: '#F8B2B2',
    slug: 'jim-estate',
    heroImage: '/images/jim-estate-hero.webp',
    liveUrl: 'https://jimsestate.vercel.app',
    overviewImages: ['/images/jim-estate-overview-1.webp', '/images/jim-estate-overview-2.webp'],
    description: {
      en: 'A boutique real-estate website with an easy-to-update property listings page, built for a luxury property agency.',
      sq: 'Një faqe për një agjenci pasurish të paluajtshme, me një faqe listimesh të lehtë për t’u përditësuar, ndërtuar për një agjenci pronash luksoze.',
    },
    services: [
      { en: 'Website Design & Development', sq: 'Dizajnim dhe Zhvillim i Faqes së Internetit' },
      { en: 'Easy-to-Update Listings (no coding needed)', sq: 'Listime të Lehta për t’u Përditësuar (pa nevojë për kod)' },
      { en: 'Property Listings & Search', sq: 'Listime dhe Kërkim Pronash' },
      { en: 'Property Detail Pages & Inquiry Forms', sq: 'Faqe Detajesh të Pronës dhe Formularë Kontakti' },
      { en: 'Built to Load Fast', sq: 'E Ndërtuar për t’u Ngarkuar Shpejt' },
    ],
    approach: {
      en: 'A fast, polished site where new property listings can be added and updated anytime — no coding needed. Listings update automatically, so the site always shows fresh properties without slowing down.',
      sq: 'Një faqe e shpejtë dhe e kuruar, ku listime të reja pronash mund të shtohen dhe përditësohen kurdo — pa nevojë për kod. Listimet përditësohen automatikisht, kështu që faqja tregon gjithmonë prona të freskëta pa u ngadalësuar.',
    },
  },
];
