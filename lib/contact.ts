/** Single source of truth for Avenum's contact details — update here to change it everywhere. */
export const PHONE_DISPLAY = '068 867 6585';
export const PHONE_INTL = '355688676585';
export const EMAIL = 'avenumdevelopment@gmail.com';
export const DOMAIN = 'avenum.website';

/** WhatsApp deep link pre-filled with a message, for a specific CTA context. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(message)}`;
}
