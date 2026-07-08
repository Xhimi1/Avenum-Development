'use client';

import dynamic from 'next/dynamic';
import ServiceLandingPage, { type ServiceFeature } from './ServiceLandingPage';

const CreativeGraphic = dynamic(() => import('./graphics/CreativeGraphic'));

const ACCENT = '#e0245e';
const ACCENT2 = '#ffb84d';

function IconWave({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
      <path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
    </svg>
  );
}
function IconWand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="m4 20 11-11" />
      <path d="M15 3v3M20 6h-3M18.5 4.5l-2 2" />
      <path d="M6 15v2M4 19h2" />
    </svg>
  );
}
function IconFlask({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M9 3h6M10 3v6l-5 9.5A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-3L14 9V3" />
      <path d="M7.5 16h9" />
    </svg>
  );
}
function IconBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
    </svg>
  );
}

const FEATURES: ServiceFeature[] = [
  {
    icon: IconWave,
    title: { en: 'Shaders & WebGL', sq: 'Shaders & WebGL' },
    desc: {
      en: 'Custom GLSL and Three.js work built from scratch for the effect you actually want, not a plugin default.',
      sq: 'Punë e personalizuar me GLSL dhe Three.js, ndërtuar nga zero për efektin që dëshiron vërtet, jo një default plugin-i.',
    },
  },
  {
    icon: IconWand,
    title: { en: 'Motion design', sq: 'Dizajn animacioni' },
    desc: {
      en: 'Transitions, reveals and micro-interactions choreographed frame by frame, not just eased in.',
      sq: 'Tranzicione, zbulime dhe mikro-ndërveprime të koreografuara kuadro pas kuadro, jo thjesht të lëmuara me easing.',
    },
  },
  {
    icon: IconFlask,
    title: { en: 'Experimental interactions', sq: 'Ndërveprime eksperimentale' },
    desc: {
      en: 'The weird idea that could set your product apart — prototyped fast so we find out if it works.',
      sq: 'Ideja e çuditshme që mund ta dallojë produktin tënd — e prototipizuar shpejt që të shohim nëse funksionon.',
    },
  },
  {
    icon: IconBolt,
    title: { en: 'Performance craft', sq: 'Mjeshtëri performance-i' },
    desc: {
      en: 'Effects that stay buttery on real phones and laptops — measured, not just eyeballed on a fast machine.',
      sq: 'Efekte që rrjedhin butësisht në telefona dhe laptopë realë — të matura, jo thjesht të vlerësuara syresh në një makinë të fuqishme.',
    },
  },
];

export default function CreativeDevelopmentPage() {
  return (
    <ServiceLandingPage
      accent={ACCENT}
      accent2={ACCENT2}
      heading={{
        en: 'The details people screenshot.',
        sq: 'Detajet që njerëzit i bëjnë screenshot.',
      }}
      subheading={{
        en: 'WebGL, shaders and motion — brought in to solve one specific, ambitious idea inside a site or product you already have.',
        sq: 'WebGL, shaders dhe animacione — të përfshira për të zgjidhur një ide të veçantë dhe ambicioze brenda një faqeje apo produkti që ke tashmë.',
      }}
      graphic={<CreativeGraphic />}
      featuresHeading={{
        en: 'Craft for the moments that matter.',
        sq: 'Mjeshtëri për momentet që kanë rëndësi.',
      }}
      features={FEATURES}
      buildHeading={{ en: 'How we build it.', sq: 'Si e ndërtojmë.' }}
      buildSub={{
        en: 'Short, focused engagements — brought in for one hard problem at a time.',
        sq: 'Angazhime të shkurtra dhe të fokusuara — për një problem të vështirë në një kohë.',
      }}
      buildSteps={[
        {
          phase: '01',
          title: { en: 'We test the idea fast', sq: 'Testojmë idenë shpejt' },
          desc: {
            en: 'Quick prototypes to prove the effect is possible and worth the effort before committing.',
            sq: 'Prototipe të shpejta për të provuar që efekti është i mundur dhe ia vlen përpjekja para se të angazhohemi plotësisht.',
          },
        },
        {
          phase: '02',
          title: { en: 'The feel gets locked in', sq: 'Ndjesia përsoset' },
          desc: {
            en: 'Timing, easing and interaction rules refined until it feels intentional, not accidental.',
            sq: 'Kohëzgjatja, easing-u dhe rregullat e ndërveprimit rafinohen derisa të ndihet i qëllimshëm, jo i rastësishëm.',
          },
        },
        {
          phase: '03',
          title: { en: 'Edge cases, ironed out', sq: 'Rastet ekstreme, të zgjidhura' },
          desc: {
            en: 'Resize, slow devices, reduced motion — the effect holds up everywhere, not just in the demo.',
            sq: 'Ndryshimi i madhësisë, pajisjet e ngadalta, lëvizja e reduktuar — efekti qëndron kudo, jo vetëm në demo.',
          },
        },
        {
          phase: '04',
          title: { en: 'Dropped into your codebase', sq: 'I integruar në kodin tënd' },
          desc: {
            en: 'Integrated cleanly into what you already have, with docs so your team can maintain it.',
            sq: 'I integruar pastër në atë që ke tashmë, me dokumentacion që ekipi yt ta mirëmbajë.',
          },
        },
      ]}
      ctaHeading={{
        en: 'Got a wild idea? We love hard problems.',
        sq: 'Ke një ide të çmendur? Ne i duam problemet e vështira.',
      }}
      ctaSub={{
        en: "Describe the effect you're picturing — we'll tell you honestly if it's worth building.",
        sq: 'Përshkruaj efektin që ke në mendje — do të të themi sinqerisht nëse ia vlen të ndërtohet.',
      }}
      ctaLabel={{ en: 'Pitch us the idea', sq: 'Na trego idenë' }}
      mailSubject={{ en: 'Creative development project', sq: 'Projekt zhvillimi kreativ' }}
    />
  );
}
