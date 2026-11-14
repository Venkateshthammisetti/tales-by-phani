import { SmoothScroll } from "@/components/SmoothScroll";
import { LightboxProvider } from "@/components/Lightbox";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { Story } from "@/components/Story";
import { Work } from "@/components/Work";
import { Stage } from "@/components/Stage";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { EMAIL, SITE_URL, WHATSAPP } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tales by Phani Productions",
  description: "Wedding, couple and concert photography from Hyderabad.",
  url: SITE_URL,
  email: EMAIL,
  telephone: `+${WHATSAPP}`,
  image: `${SITE_URL}img/forehead-fog.webp`,
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
  areaServed: "IN",
};

export default function Home() {
  return (
    <SmoothScroll>
      <LightboxProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#work">
          Skip to portfolio
        </a>
        <Cursor />
        <Nav />
        <main id="top">
          <Hero />
          <Statement />
          <Story />
          <Work />
          <Stage />
          <Services />
          <Process />
          <Contact />
        </main>
        <Footer />
      </LightboxProvider>
    </SmoothScroll>
  );
}
