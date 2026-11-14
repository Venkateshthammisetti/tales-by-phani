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
favicon.svg       browser tab icon
.nojekyll         tells GitHub Pages to serve files as-is
img/              web-sized photos (.webp, 1200-1800px, plus -s 900px versions) and logos
source/logo/      original logo file as received
```

## Sections

Hero, manifesto, featured story (horizontal scroll on desktop, swipe on mobile), filterable portfolio with lightbox,
concerts, services, process, and a WhatsApp enquiry form.

## Deploy on GitHub Pages

1. Push to `main`.
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site goes live at https://venkateshthammisetti.github.io/tales-by-phani/ in a minute or two.

For a custom domain, add it under Settings → Pages, then replace `https://venkateshthammisetti.github.io/tales-by-phani/`
in the `<head>` of `index.html` (canonical, Open Graph and JSON-LD tags) with the new address.

## Before going live

- [ ] Set Phani's WhatsApp number: `var WA='910000000000'` in `index.html` (country code first, digits only).
      Until it's set, the enquiry form sends by email instead of WhatsApp.
- [ ] Confirm the contact email (currently phanifilms3@gmail.com, `var EMAIL` in `index.html` and the mailto link)
- [ ] Confirm rights for the "AR / Art of Revealing" watermarked Pavan & Sanjana photos, or swap in clean exports
- [ ] Add the BRIDE / WEDDING photos as web-size exports (originals were too large to pull)
- [ ] Replace `img/logo-light.png` with the original transparent logo PNG
- [ ] Add real client testimonials
- [ ] Turn on GitHub Pages (steps above) or use Netlify/Vercel, and connect the domain
- [ ] Optional: export a 1200×630 JPG for link previews and point `og:image` at it (WebP previews work on most apps but not all)

## Adding photos

Export at 1800px on the long edge as WebP (quality ~80), plus a 900px `-s` version. Then add an entry to the `DIM` and `GRID`
lists near the top of the `<script>` in `index.html`.
