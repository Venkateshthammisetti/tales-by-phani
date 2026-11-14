"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import { BRIDAL, small, srcSet } from "@/lib/photos";
import { useLightbox } from "./Lightbox";
import { RevealHeading } from "./RevealHeading";
import styles from "./Bridal.module.css";

const SHAPES = [styles.a, styles.b, styles.c];
const DEPTH = [-10, -16, -22]; // each photo drifts at its own speed

/** Bridal portraits: an editorial spread of the gold-lit bride series, mirrored from the concerts layout. */
export function Bridal() {
  const root = useRef<HTMLElement>(null);
  const open = useLightbox();

  useGSAP(
    () => {
      if (!prefersMotion()) return;
      const figs = gsap.utils.toArray<HTMLElement>("figure", root.current);
      figs.forEach((f, i) =>
        gsap.to(f.querySelector("img"), {
          yPercent: DEPTH[i],
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        }),
      );
      gsap.from(figs, {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.5,
        stagger: 0.15,
        ease: "expo.inOut",
        scrollTrigger: { trigger: figs[0], start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="bridal" className={`${styles.bridal} on-fog`} aria-label="Bridal portraits">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.text}>
          <div>
            <p className="kicker">Bridal portraits</p>
            <RevealHeading>
              Draped in <em>gold.</em>
            </RevealHeading>
          </div>
          <p>
            The quiet hour before the ceremony. Silk, mehndi and lamplight, and the bride as she really is: laughing,
            nervous, radiant. Portraits she will keep for a lifetime.
          </p>
        </div>
        <div className={styles.imgs}>
          {BRIDAL.map((p, i) => (
            <figure
              key={p.id}
              className={SHAPES[i]}
              data-cursor="view"
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${p.alt}`}
              onClick={() => open(BRIDAL, i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(BRIDAL, i);
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={small(p.id)} srcSet={srcSet(p.id)} sizes={p.sizes} alt={p.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
