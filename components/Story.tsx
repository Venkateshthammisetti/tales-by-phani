"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { STORY, small, srcSet } from "@/lib/photos";
import { useLightbox } from "./Lightbox";
import { RevealHeading } from "./RevealHeading";
import styles from "./Story.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export function Story() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLElement>(null);
  const ctr = useRef<HTMLSpanElement>(null);
  const open = useLightbox();
  const n = STORY.length;

  const setProgress = (p: number) => {
    if (rail.current) rail.current.style.transform = `scaleX(${p})`;
    if (ctr.current) ctr.current.textContent = pad(Math.min(n, 1 + Math.floor(p * n)));
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const el = track.current!;

      // Desktop: pin the section and turn vertical scroll into a horizontal pan, each photo drifting inside its frame.
      mm.add("(min-width:900px) and (prefers-reduced-motion: no-preference)", () => {
        const dist = () => el.scrollWidth - innerWidth;
        const pan = gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (s) => setProgress(s.progress),
          },
        });
        el.querySelectorAll("figure").forEach((f) => {
          gsap.fromTo(
            f.querySelector("img"),
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: f, containerAnimation: pan, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      });

      // Mobile, or reduced motion: native swipe with snap, counter follows the scroll position.
      mm.add("(max-width:899px), (prefers-reduced-motion: reduce)", () => {
        const onScroll = () => setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="story" className={styles.story} aria-label="Featured story: Pavan and Sanjana">
      <div ref={track} className={styles.track}>
        <div className={styles.intro}>
          <p className="kicker">Featured story</p>
          <RevealHeading>
            Pavan <em>&amp;</em> Sanjana
          </RevealHeading>
          <p>A monsoon pre-wedding on the hills. Fog rolled in all afternoon, so we stopped fighting it and let it frame them.</p>
        </div>
        {STORY.map((p, i) => (
          <figure
            key={p.id}
            className={styles[p.shape]}
            data-cursor="view"
            role="button"
            tabIndex={0}
            aria-label={`Open photo: ${p.caption}`}
            onClick={() => open(STORY, i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open(STORY, i);
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={small(p.id)} srcSet={srcSet(p.id)} sizes={p.sizes} alt={p.alt} loading="lazy" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className={styles.count} aria-hidden="true">
        <span ref={ctr}>01</span>
        <span className={styles.rail}>
          <i ref={rail} />
        </span>
        <span>{pad(n)}</span>
      </div>
    </section>
  );
}
