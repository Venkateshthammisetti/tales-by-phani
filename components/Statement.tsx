"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import styles from "./Statement.module.css";

const MANIFESTO =
  "Honest moments, quiet glances and the beautiful in-between. I don't ask couples to perform for the camera. I wait for the laugh that breaks the pose, the wind in her hair, the moment he forgets I'm there, and I make that the photograph.";

const META = [
  ["Hyderabad", "Based in, travelling across India"],
  ["Candid first", "Directed only when it helps"],
  ["Story galleries", "Delivered in the order the day happened"],
];

export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!prefersMotion()) return;
      const q = gsap.utils.selector(root);
      // Words light up as you read.
      gsap.fromTo(
        q("[data-w]"),
        { opacity: 0.28 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: q("[data-manifesto]")[0], start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
      gsap.from(q("[data-meta] > div"), {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: q("[data-meta]")[0], start: "top 92%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`${styles.statement} on-fog`} aria-label="About">
      <div className={`wrap ${styles.grid}`}>
        <p className="kicker">The art of togetherness</p>
        <div>
          <p className={styles.big} data-manifesto aria-label={MANIFESTO}>
            {MANIFESTO.split(" ").map((w, i) => (
              <span key={i} aria-hidden="true">
                <span data-w>{w}</span>{" "}
              </span>
            ))}
          </p>
          <div className={styles.meta} data-meta>
            {META.map(([b, t]) => (
              <div key={b}>
                <b>{b}</b>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
