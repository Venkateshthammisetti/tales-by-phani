import type { PhotoId } from "./photos";

/**
 * Client testimonials, shown in the "Kind words" section above the enquiry form.
 *
 * Only add words a real client actually wrote or said (a Google review, a WhatsApp message, an email), with their
 * permission to show them. Keep the quote as they wrote it; trimming for length is fine, rewording is not.
 * While this list is empty the section is hidden, so the site never shows placeholder quotes.
 *
 *   quote     what they said
 *   name      how they want to be credited, e.g. "Pavan & Sanjana"
 *   occasion  e.g. "Pre-wedding shoot"
 *   place     optional, e.g. "Hyderabad"
 *   source    optional, e.g. "Google review" or "via WhatsApp"
 *   photo     optional photo id from lib/photos.ts (their own shoot), shown as a small portrait
 */
export type Testimonial = {
  quote: string;
  name: string;
  occasion: string;
  place?: string;
  source?: string;
  photo?: PhotoId;
};

export const TESTIMONIALS: Testimonial[] = [
  // {
  //   quote: "…",
  //   name: "Pavan & Sanjana",
  //   occasion: "Pre-wedding shoot",
  //   place: "Hyderabad",
  //   source: "Google review",
  //   photo: "forehead-fog",
  // },
];
