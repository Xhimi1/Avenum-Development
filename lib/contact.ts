/** Single source of truth for Avenum's contact details — update here to change it everywhere. */
export const PHONE_DISPLAY = '068 371 4904';
export const PHONE_INTL = '355683714904';
export const EMAIL = 'avenumdevelopment@gmail.com';
export const DOMAIN = 'avenum.website';

/** Pre-filled WhatsApp message used for every WhatsApp CTA on the site. */
export const WA_MESSAGE =
  'Përshëndetje. Dua të krijoj një faqe web për biznesin tim. Mund të flasim?';

/** WhatsApp deep link pre-filled with a message, for a specific CTA context. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(message)}`;
}
