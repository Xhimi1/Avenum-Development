'use client';

import ServicePage from './ServicePage';
import { WhatsappHero, TileAutoReply, TileBroadcast, TileAlways } from './graphics/WhatsappGraphics';

export default function WhatsappAutomationPage() {
  return (
    <ServicePage
      currentHref="/whatsapp-automation"
      accent="#16A97C"
      accent2="#5FD8B0"
      heroGradient="linear-gradient(140deg, #2FA0F5 0%, #3E63F0 52%, #8A5CFF 100%)"
      heroBlobs={['#7FD8FF', '#5B7CFF', '#B58BFF']}
      eyebrow={{ en: 'WhatsApp Automation', sq: 'Automatizim WhatsApp' }}
      heading={{ en: 'Reply on WhatsApp, instantly.', sq: 'Përgjigju në WhatsApp, menjëherë.' }}
      subheading={{
        en: 'A slow reply on WhatsApp sends customers straight to your competitor — answer instantly, day or night, with automation built into the chat they already use. Confirmations, reminders and promotions go out without lifting a finger, in Albanian or any language your customers speak.',
        sq: 'Një përgjigje e ngadaltë në WhatsApp i dërgon klientët te konkurrenca — përgjigju menjëherë, ditë e natë, me automatizim brenda bisedës që përdorin tashmë. Konfirmime, kujtesa dhe promocione dërgohen pa lëvizur gisht, në shqip apo çdo gjuhë tjetër që flasin klientët.',
      }}
      ctaLabel={{ en: 'Contact us', sq: 'Na kontaktoni' }}
      heroGraphic={<WhatsappHero />}
      showcaseHeading={{ en: 'Always one step ahead.', sq: 'Gjithmonë një hap përpara.' }}
      tiles={[
        {
          graphic: <TileAutoReply />,
          title: { en: 'Instant replies', sq: 'Përgjigje të menjëhershme' },
          subtitle: {
            en: 'Guests get an answer in seconds, day or night.',
            sq: 'Klientët marrin përgjigje brenda sekondash, ditë e natë.',
          },
        },
        {
          graphic: <TileBroadcast />,
          title: { en: 'Send offers', sq: 'Dërgo oferta' },
          subtitle: {
            en: 'Broadcast promotions straight to your customer list.',
            sq: 'Dërgo promocione direkt te lista e klientëve.',
          },
        },
        {
          graphic: <TileAlways />,
          title: { en: 'Never offline', sq: 'Kurrë jashtë linje' },
          subtitle: {
            en: 'Always-on automation that never takes a day off.',
            sq: "Automatizim gjithmonë aktiv, që s'pushon kurrë.",
          },
        },
      ]}
      ctaHeading={{ en: 'Turn chats into clients.', sq: 'Kthe bisedat në klientë.' }}
    />
  );
}
