# Tales by Phani

Portfolio website for **Tales by Phani Productions**, wedding, couple and concert photography from Hyderabad.

A single static page: plain HTML and CSS, with [GSAP](https://gsap.com) + ScrollTrigger and [Lenis](https://github.com/darkroomengineering/lenis) loaded from CDNs. There's no build step.

## Run locally

```bash
npx serve .
# or
python3 -m http.server 8000
```

Open http://localhost:8000.

## Structure

```
index.html        the whole site (markup, styles, scripts)
img/              web-sized photos (.webp, 1200-1800px, plus -s 900px versions) and logos
source/logo/      original logo file as received
```

## Sections

Hero, manifesto, featured story (horizontal scroll on desktop, swipe on mobile), filterable portfolio with lightbox,
concerts, services, process, and a WhatsApp enquiry form.

## Before going live

- [ ] Set Phani's WhatsApp number: `var WA='910000000000'` in `index.html` (country code first, digits only)
- [ ] Confirm the contact email (currently phanifilms3@gmail.com)
- [ ] Confirm rights for the "AR / Art of Revealing" watermarked Pavan & Sanjana photos, or swap in clean exports
- [ ] Add the BRIDE / WEDDING photos as web-size exports (originals were too large to pull)
- [ ] Replace `img/logo-light.png` with the original transparent logo PNG
- [ ] Add real client testimonials
- [ ] Choose hosting (GitHub Pages, Netlify or Vercel all work as-is) and connect the domain

## Adding photos

Export at 1800px on the long edge as WebP (quality ~80), plus a 900px `-s` version. Then add an entry to the `DIM` and `GRID`
lists near the top of the `<script>` in `index.html`.
