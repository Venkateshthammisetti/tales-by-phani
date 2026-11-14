"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import { STAGE, small, srcSet } from "@/lib/photos";
import { useLightbox } from "./Lightbox";
import { RevealHeading } from "./RevealHeading";
import styles from "./Stage.module.css";

const SHAPES = [styles.a, styles.b, styles.c];
const DEPTH = [-10, -16, -22]; // each photo drifts at its own speed

export function Stage() {
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
    <section ref={root} id="stage" className={styles.stage} aria-label="Concerts and events">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.text}>
          <div>
            <p className="kicker">Concerts and live events</p>
            <RevealHeading>
              When the lights <em>hit.</em>
            </RevealHeading>
          </div>
          <p>
            Fast light, huge crowds, no second takes. The same instinct that finds a quiet glance at a wedding finds the one
            second a performer turns back to the stage.
          </p>
        </div>
        <div className={styles.imgs}>
          {STAGE.map((p, i) => (
            <figure
              key={p.id}
              className={SHAPES[i]}
              data-cursor="view"
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${p.alt}`}
              onClick={() => open(STAGE, i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(STAGE, i);
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
