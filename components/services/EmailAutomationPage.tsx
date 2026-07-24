'use client';

import ServicePage from './ServicePage';
import { EmailHero, TileFlow, TileInbox, TileOpen } from './graphics/EmailGraphics';

export default function EmailAutomationPage() {
  return (
    <ServicePage
      accent="#D99500"
      accent2="#FFC85A"
      heading={{ en: 'Emails that send themselves.', sq: 'Email-e që nisen vetë.' }}
      subheading={{
        en: 'Confirmations and follow-ups go out on their own — hands-free.',
        sq: 'Konfirmimet dhe përgjigjet nisen vetë — pa dorë.',
      }}
      ctaLabel={{ en: 'Automate email', sq: 'Automatizo email-in' }}
      heroGraphic={<EmailHero />}
      showcaseHeading={{ en: 'Set once, runs forever.', sq: 'Vendos një herë, punon përgjithmonë.' }}
      tiles={[
        { graphic: <TileFlow />, title: { en: 'Simple flows', sq: 'Rrjedha të thjeshta' } },
        { graphic: <TileInbox />, title: { en: 'Right message', sq: 'Mesazhi i duhur' } },
        { graphic: <TileOpen />, title: { en: 'People open them', sq: 'Njerëzit i hapin' } },
      ]}
      ctaHeading={{ en: 'Stay in touch, on autopilot.', sq: 'Rri në kontakt, automatikisht.' }}
      mailSubject={{ en: 'Email automation for my business', sq: 'Automatizim email-i për biznesin tim' }}
    />
  );
}
