'use client';

import ServicePage from './ServicePage';
import { WebsiteHeroShowcase, TileSpeed, TileResponsive, TileDesign } from './graphics/WebsiteGraphics';

export default function BusinessWebsitesPage() {
  return (
    <ServicePage
      currentHref="/business-websites"
      accent="#3B6BFF"
      accent2="#7AA2FF"
      heroGradient="linear-gradient(140deg, #2FA0F5 0%, #3E63F0 52%, #8A5CFF 100%)"
      heroBlobs={['#7FD8FF', '#5B7CFF', '#B58BFF']}
      eyebrow={{ en: 'Business Websites', sq: 'Faqe Biznesi' }}
      heading={{ en: 'Websites that win clients.', sq: 'Faqe që sjellin klientë.' }}
      subheading={{
        en: 'Most businesses lose customers to an outdated site, or none at all — we build fast, custom websites that make you look premium and turn visitors into clients. Mobile-ready, optimized for Google, and live within weeks, not months.',
        sq: 'Shumica e bizneseve humbasin klientë nga një faqe e vjetruar, ose mungesa e saj — ne ndërtojmë faqe të shpejta e të personalizuara që të duken premium dhe kthejnë vizitorët në klientë. Të gatshme për celular, të optimizuara për Google, dhe online brenda javësh, jo muajsh.',
      }}
      ctaLabel={{ en: 'Contact us', sq: 'Na kontaktoni' }}
      heroGraphic={<WebsiteHeroShowcase />}
      showcaseHeading={{ en: 'Built to perform.', sq: 'Ndërtuar për të performuar.' }}
      tiles={[
        {
          graphic: <TileSpeed />,
          title: { en: 'Loads fast', sq: 'Ngarkohet shpejt' },
          subtitle: {
            en: 'Optimized code and images so pages open in a blink.',
            sq: 'Kod dhe imazhe të optimizuara që faqet hapen në një çast.',
          },
        },
        {
          graphic: <TileResponsive />,
          title: { en: 'Works on any screen', sq: 'Në çdo ekran' },
          subtitle: {
            en: 'Looks great on phones, tablets and desktops alike.',
            sq: 'Duket shkëlqyeshëm në telefon, tablet apo kompjuter.',
          },
        },
        {
          graphic: <TileDesign />,
          title: { en: 'Designed for you', sq: 'Dizajnuar për ty' },
          subtitle: {
            en: 'A custom look built around your brand, not a template.',
            sq: 'Një pamje e personalizuar për markën tënde, jo një shabllon.',
          },
        },
      ]}
      ctaHeading={{ en: 'Ready for a site that sells?', sq: 'Gati për një faqe që shet?' }}
    />
  );
}
