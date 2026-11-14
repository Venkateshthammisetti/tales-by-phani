"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import { small } from "@/lib/photos";
import { TESTIMONIALS } from "@/lib/testimonials";
import { RevealHeading } from "./RevealHeading";
import styles from "./Testimonials.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** "Kind words": one client quote at a time, with previous / next, swipe and arrow keys. Hidden when there are none. */
export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = TESTIMONIALS.length;

  const go = useCallback((d: number) => setCur((c) => (c + d + n) % n), [n]);

  // Each new quote rises in softly.
  useGSAP(
    () => {
      if (!prefersMotion() || !card.current) return;
      gsap.fromTo(
        card.current.querySelectorAll("[data-rise]"),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "power3.out" },
      );
    },
    { dependencies: [cur], scope: root },
  );

  if (n === 0) return null;
  const t = TESTIMONIALS[cur];

  return (
    <section ref={root} id="kind-words" className={`${styles.kind} on-fog`} aria-label="Client testimonials">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.head}>
          <p className="kicker">Kind words</p>
          <RevealHeading>
            In their <em>words</em>
          </RevealHeading>
        </div>

        <figure
          ref={card}
          className={styles.card}
          aria-live="polite"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current == null || n < 2) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <span className={styles.mark} aria-hidden="true">
            &ldquo;
          </span>
          <blockquote key={cur} data-rise>
            <p>{t.quote}</p>
          </blockquote>
          <figcaption data-rise className={styles.who}>
            {t.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={small(t.photo)} alt="" loading="lazy" />
            )}
            <span>
              <b>{t.name}</b>
              <small>
                {[t.occasion, t.place].filter(Boolean).join(" · ")}
                {t.source && <em> · {t.source}</em>}
              </small>
            </span>
          </figcaption>
        </figure>

        {n > 1 && (
          <div
            className={styles.controls}
            role="group"
            aria-label="Choose a testimonial"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
          >
            <button onClick={() => go(-1)} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 4l-8 8 8 8" />
              </svg>
            </button>
            <span className={styles.count}>
              {pad(cur + 1)}
              <span className={styles.rail}>
                <i style={{ transform: `scaleX(${(cur + 1) / n})` }} />
              </span>
              {pad(n)}
            </span>
            <button onClick={() => go(1)} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 4l8 8-8 8" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
