# Tales by Phani

Portfolio website for **Tales by Phani Productions**, wedding, couple and concert photography from Hyderabad.

Built with [Next.js](https://nextjs.org) (App Router, TypeScript), CSS Modules, [GSAP](https://gsap.com) + ScrollTrigger
for animation and [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling. It exports as a fully
static site, so it can be hosted anywhere (GitHub Pages, Netlify, Vercel).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 with hot reload
npm run build      # static export to out/
npm start          # serve out/ to check the production build
```

## Structure

```
app/
  layout.tsx       fonts (self-hosted via next/font), SEO metadata, motion opt-in script
  page.tsx         assembles the sections, JSON-LD
  globals.css      colour tokens, type, buttons, shared utilities
  icon.svg         favicon
  robots.ts        robots.txt
  sitemap.ts       sitemap.xml
components/
  SmoothScroll     Lenis + GSAP ticker; scroll lock for menu and lightbox
  Lightbox         full-screen photo viewer (keyboard and swipe)
  Cursor           trailing cursor, "View" disc over photos, magnetic buttons
  Nav              header, full-screen mobile menu, mobile sticky bar
  Hero             preloader intro timeline and parallax
  Statement        manifesto that lights up word by word
  Story            pinned horizontal scroll (desktop) / swipe (mobile)
  Work             filterable portfolio grid
  Stage            concerts, layered parallax
  Services         rows with floating hover preview
  Process, Contact, Footer, RevealHeading
  *.module.css     each component's styles
lib/
  site.ts          WhatsApp number, email, site URL, nav links
  photos.ts        every photo list (story, grid, concerts, services) and image dimensions
  gsap.ts          GSAP plugin registration and motion helpers
public/img/        web-sized photos (.webp, 1200-1800px, plus -s 900px versions) and logos
source/logo/       original logo file as received
```

## Motion and accessibility

- Visitors who set "reduce motion" in their OS get the full site with no intro, parallax or pinning; the story
  becomes a swipeable row.
- The preloader has a CSS fail-safe, so the page never gets stuck behind it if scripts fail to load.
- Custom cursor and hover previews only switch on for a mouse or trackpad.

## Deploy on GitHub Pages

A workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**
   (this replaces the old "Deploy from a branch" setting).
2. Push to `main`. Until the custom domain is connected, the site is at
   https://venkateshthammisetti.github.io/tales-by-phani/ (the workflow sets `BASE_PATH=/tales-by-phani` for this).

### Custom domain (www.talesbyphani.in, registered at GoDaddy)

`SITE_URL` in `lib/site.ts` already points at the domain. When the domain is connected, delete the two `env` /
`BASE_PATH` lines in `.github/workflows/deploy.yml` so the site is built for the root of the domain.

.IN domains need KYC verification at GoDaddy before DNS changes are allowed (the yellow "Validate" banner).

DNS records in GoDaddy (**My Products → talesbyphani.in → DNS**):

| Type  | Name | Value                           |
|-------|------|---------------------------------|
| CNAME | www  | `venkateshthammisetti.github.io` |
| A     | @    | `185.199.108.153`               |
| A     | @    | `185.199.109.153`               |
| A     | @    | `185.199.110.153`               |
| A     | @    | `185.199.111.153`               |

Delete GoDaddy's default `A @ Parked` record and any existing `CNAME www` first. The four A records make
`talesbyphani.in` (no www) redirect to `www.talesbyphani.in`.

Then in GitHub: **Settings → Pages → Custom domain** → `www.talesbyphani.in` → Save. When the DNS check passes,
tick **Enforce HTTPS** (the certificate can take up to an hour). With the Actions workflow no `CNAME` file is needed.

## Before going live

- [x] Phani's WhatsApp number (+91 90142 47710) is set in `lib/site.ts` (`WHATSAPP` and `PHONE_DISPLAY`).
      It powers the enquiry form, the contact links, the floating WhatsApp button and the footer.
- [ ] Confirm the contact email (`EMAIL` in `lib/site.ts`)
- [ ] Confirm rights for the "AR / Art of Revealing" watermarked Pavan & Sanjana photos, or swap in clean exports
- [ ] Add the BRIDE / WEDDING photos as web-size exports (originals were too large to pull)
- [ ] Replace `public/img/logo-light.png` with the original transparent logo PNG
- [ ] Add real client testimonials
- [ ] Optional: export a 1200×630 JPG for link previews and point the Open Graph image in `app/layout.tsx` at it

## Adding photos

Export at 1800px on the long edge as WebP (quality ~80), plus a 900px `-s` version, into `public/img/`.
Add the photo's dimensions to `DIM` in `lib/photos.ts`, then add it to `GRID` (portfolio), `STORY` or `STAGE`.
