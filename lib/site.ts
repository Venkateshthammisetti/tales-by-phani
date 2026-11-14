/** Site-wide settings. Update these before going live. */

export const SITE_URL = "https://venkateshthammisetti.github.io/tales-by-phani/";

/** Phani's WhatsApp number, country code first, digits only. Until a real one is set, enquiries go by email. */
export const WHATSAPP = "910000000000";
export const EMAIL = "phanifilms3@gmail.com";

export const whatsAppOn = /^[1-9]\d{9,14}$/.test(WHATSAPP) && !/^910+$/.test(WHATSAPP);

/** Prefix a /public path with the deploy base path (e.g. /tales-by-phani on GitHub Pages). */
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;

export const NAV_LINKS = [
  { href: "#story", label: "Stories" },
  { href: "#work", label: "Portfolio" },
  { href: "#stage", label: "Concerts" },
  { href: "#services", label: "Services" },
] as const;
