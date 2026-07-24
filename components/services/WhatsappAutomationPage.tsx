'use client';

import ServicePage from './ServicePage';
import { WhatsappHero, TileAutoReply, TileBroadcast, TileAlways } from './graphics/WhatsappGraphics';

export default function WhatsappAutomationPage() {
  return (
    <ServicePage
      accent="#16A97C"
      accent2="#5FD8B0"
      heroGradient="linear-gradient(140deg, #24C9C0 0%, #16A97C 52%, #54C85E 100%)"
      heroBlobs={['#6FE6D8', '#3ED89E', '#8FE07A']}
      heading={{ en: 'Reply on WhatsApp, instantly.', sq: 'Përgjigju në WhatsApp, menjëherë.' }}
      subheading={{
        en: 'Meet customers where they already chat — answered automatically.',
        sq: 'Takoji klientët aty ku bisedojnë tashmë — përgjigje automatike.',
      }}
      ctaLabel={{ en: 'Automate WhatsApp', sq: 'Automatizo WhatsApp' }}
      heroGraphic={<WhatsappHero />}
      showcaseHeading={{ en: 'Always one step ahead.', sq: 'Gjithmonë një hap përpara.' }}
      tiles={[
        { graphic: <TileAutoReply />, title: { en: 'Instant replies', sq: 'Përgjigje të menjëhershme' } },
        { graphic: <TileBroadcast />, title: { en: 'Send offers', sq: 'Dërgo oferta' } },
        { graphic: <TileAlways />, title: { en: 'Never offline', sq: 'Kurrë jashtë linje' } },
      ]}
      ctaHeading={{ en: 'Turn chats into clients.', sq: 'Kthe bisedat në klientë.' }}
      mailSubject={{ en: 'WhatsApp automation for my business', sq: 'Automatizim WhatsApp për biznesin tim' }}
    />
  );
}
