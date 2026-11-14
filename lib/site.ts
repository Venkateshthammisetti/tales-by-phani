/** Site-wide settings. Update these before going live. */

export const SITE_URL = "https://www.talesbyphani.in/";

/** Phani's WhatsApp number, country code first, digits only. If it's ever cleared, enquiries fall back to email. */
export const WHATSAPP = "919014247710";
export const PHONE_DISPLAY = "+91 90142 47710";
export const EMAIL = "phanifilms3@gmail.com";

export const whatsAppOn = /^[1-9]\d{9,14}$/.test(WHATSAPP) && !/^910+$/.test(WHATSAPP);

/** wa.me link that opens a chat with Phani, optionally with a pre-filled message. */
export const waLink = (text = "Hi Phani, I found Tales by Phani online and would like to check a date.") =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

/** Prefix a /public path with the deploy base path (e.g. /tales-by-phani on GitHub Pages). */
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;

export const NAV_LINKS = [
  { href: "#story", label: "Stories" },
  { href: "#work", label: "Portfolio" },
  { href: "#stage", label: "Concerts" },
  { href: "#services", label: "Services" },
] as const;
