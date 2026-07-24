'use client';

import ServicePage from './ServicePage';
import { WebsiteHero, TileSpeed, TileResponsive, TileDesign } from './graphics/WebsiteGraphics';

export default function BusinessWebsitesPage() {
  return (
    <ServicePage
      accent="#3B6BFF"
      accent2="#7AA2FF"
      heroGradient="linear-gradient(140deg, #2FA0F5 0%, #3E63F0 52%, #8A5CFF 100%)"
      heroBlobs={['#7FD8FF', '#5B7CFF', '#B58BFF']}
      heading={{ en: 'Websites that win clients.', sq: 'Faqe që sjellin klientë.' }}
      subheading={{
        en: 'Fast, unique sites that make your business look premium.',
        sq: 'Faqe të shpejta e unike që e bëjnë biznesin tënd të duket premium.',
      }}
      ctaLabel={{ en: 'Get a website', sq: 'Merr një faqe' }}
      heroGraphic={<WebsiteHero />}
      showcaseHeading={{ en: 'Built to perform.', sq: 'Ndërtuar për të performuar.' }}
      tiles={[
        { graphic: <TileSpeed />, title: { en: 'Loads fast', sq: 'Ngarkohet shpejt' } },
        { graphic: <TileResponsive />, title: { en: 'Works on any screen', sq: 'Në çdo ekran' } },
        { graphic: <TileDesign />, title: { en: 'Designed for you', sq: 'Dizajnuar për ty' } },
      ]}
      ctaHeading={{ en: 'Ready for a site that sells?', sq: 'Gati për një faqe që shet?' }}
      mailSubject={{ en: 'Business website for my brand', sq: 'Faqe biznesi për markën time' }}
    />
  );
}
