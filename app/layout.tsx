import type { Metadata, Viewport } from "next";
import { Cormorant, Jost } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Honest moments, quiet glances and the beautiful in-between. Wedding, couple and concert photography from Hyderabad.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tales by Phani",
  description: "Tales by Phani Productions: wedding, couple and concert photography from Hyderabad.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: "Tales by Phani",
    title: "Tales by Phani · Wedding & couple photography, Hyderabad",
    description,
    url: SITE_URL,
    images: [{ url: `${SITE_URL}img/forehead-fog.webp`, alt: "A couple touching foreheads on a misty hillside" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b1d21",
  viewportFit: "cover",
};

// Runs before first paint: opt into motion (hidden intro states, preloader) unless reduced motion is requested.
const motionScript = `document.documentElement.classList.add(matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'motion')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
