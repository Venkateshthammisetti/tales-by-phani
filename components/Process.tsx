"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import { RevealHeading } from "./RevealHeading";
import styles from "./Process.module.css";

const STEPS = [
  ["Say hello", "Share your date, city and what you're planning. We'll check availability the same day."],
  ["Plan it together", "Locations, timings, outfits and light. A short call so nothing on the day is a surprise."],
  ["The day", "We stay close, direct very little and let things happen."],
  ["Your story", "A curated, edited gallery in the order the day unfolded, ready to share and print."],
];

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!prefersMotion()) {
        gsap.set("[data-ln]", { scaleX: 1 });
        return;
      }
      const st = { trigger: "ol", start: "top 85%" };
      // Rose lines draw across in sequence, then each step's text rises.
      gsap.to("[data-ln]", { scaleX: 1, duration: 1.2, stagger: 0.25, ease: "power3.inOut", scrollTrigger: st });
      gsap.from("li > :not([data-ln])", { y: 24, opacity: 0, duration: 1, stagger: 0.06, ease: "power3.out", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.process} aria-label="How it works">
      <div className="wrap">
        <p className="kicker">How it works</p>
        <RevealHeading>
          From first call to <em>final gallery</em>
        </RevealHeading>
        <ol className={styles.steps}>
          {STEPS.map(([h, p]) => (
            <li key={h}>
              <span className={styles.ln} data-ln />
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
