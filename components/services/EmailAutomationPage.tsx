'use client';

import ServicePage from './ServicePage';
import { EmailHero, TileFlow, TileInbox, TileOpen } from './graphics/EmailGraphics';

export default function EmailAutomationPage() {
  return (
    <ServicePage
      currentHref="/email-automation"
      accent="#D99500"
      accent2="#FFC85A"
      heroGradient="linear-gradient(140deg, #2FA0F5 0%, #3E63F0 52%, #8A5CFF 100%)"
      heroBlobs={['#7FD8FF', '#5B7CFF', '#B58BFF']}
      eyebrow={{ en: 'Email Automation', sq: 'Automatizim Email-i' }}
      heading={{ en: 'Emails that send themselves.', sq: 'Email-e që nisen vetë.' }}
      subheading={{
        en: 'Forgotten follow-ups and manual confirmations waste hours every week — automate them once and they keep working for you, hands-free. Every message triggers off what your customer actually does, so it always feels timely, not generic.',
        sq: 'Përgjigjet e harruara dhe konfirmimet manuale humbasin orë çdo javë — automatizoji një herë dhe vazhdojnë të punojnë vetë, pa dorë. Çdo mesazh niset nga veprimi i klientit, kështu që ndihet gjithmonë në kohën e duhur, jo gjenerik.',
      }}
      ctaLabel={{ en: 'Contact us', sq: 'Na kontaktoni' }}
      heroGraphic={<EmailHero />}
      showcaseHeading={{ en: 'Set once, runs forever.', sq: 'Vendos një herë, punon përgjithmonë.' }}
      tiles={[
        {
          graphic: <TileFlow />,
          title: { en: 'Simple flows', sq: 'Rrjedha të thjeshta' },
          subtitle: {
            en: 'Trigger the right email the moment something happens.',
            sq: 'Nis email-in e duhur në momentin që ndodh diçka.',
          },
        },
        {
          graphic: <TileInbox />,
          title: { en: 'Right message', sq: 'Mesazhi i duhur' },
          subtitle: {
            en: "Personalized content that matches each customer's step.",
            sq: 'Përmbajtje e personalizuar që përshtatet me hapin e klientit.',
          },
        },
        {
          graphic: <TileOpen />,
          title: { en: 'People open them', sq: 'Njerëzit i hapin' },
          subtitle: {
            en: 'Clean design and subject lines built to get opened.',
            sq: "Dizajn i pastër dhe tituj që i bëjnë njerëzit t'i hapin.",
          },
        },
      ]}
      ctaHeading={{ en: 'Stay in touch, on autopilot.', sq: 'Rri në kontakt, automatikisht.' }}
      mailSubject={{ en: 'Email automation for my business', sq: 'Automatizim email-i për biznesin tim' }}
    />
  );
}
