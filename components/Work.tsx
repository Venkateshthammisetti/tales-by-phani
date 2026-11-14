"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersMotion } from "@/lib/gsap";
import { DIM, GRID, small, type Kind } from "@/lib/photos";
import { useLightbox } from "./Lightbox";
import { RevealHeading } from "./RevealHeading";
import styles from "./Work.module.css";

type Filter = "all" | Kind;
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "couple", label: "Couples" },
  { id: "stage", label: "Concerts" },
];

export function Work() {
  const root = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const btns = useRef<Record<string, HTMLButtonElement | null>>({});
  const [filter, setFilter] = useState<Filter>("all");
  const first = useRef(true);
  const open = useLightbox();

  const shown = GRID.filter((p) => filter === "all" || p.kind === filter);

  // Sliding pill sits under the active filter.
  useLayoutEffect(() => {
    const place = () => {
      const b = btns.current[filter];
      if (b && pill.current) {
        pill.current.style.left = `${b.offsetLeft}px`;
        pill.current.style.width = `${b.offsetWidth}px`;
      }
    };
    place();
    addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => removeEventListener("resize", place);
  }, [filter]);

  // Tiles unmask with a clip-path wipe as they scroll in.
  useGSAP(
    () => {
      ScrollTrigger.batch("[data-tile]", {
        start: "top 94%",
        onEnter: (batch) => batch.forEach((el, i) => setTimeout(() => el.classList.add("in"), i * 90)),
      });
    },
    { scope: root },
  );

  // After a filter change, visible tiles drift back in.
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      ScrollTrigger.refresh();
      if (!prefersMotion()) return;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]:not([hidden])", root.current);
      tiles.forEach((t) => t.classList.add("in"));
      gsap.fromTo(
        tiles,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.04, ease: "power3.out", clearProps: "transform,opacity" },
      );
    },
    { dependencies: [filter], scope: root },
  );

  return (
    <section ref={root} id="work" className={`${styles.work} on-fog`}>
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <p className="kicker">Portfolio</p>
            <RevealHeading>
              Frames we <em>kept</em>
            </RevealHeading>
          </div>
          <div className={styles.filters} role="group" aria-label="Filter photographs">
            <span ref={pill} className={styles.pill} aria-hidden="true" />
            {FILTERS.map((f) => (
              <button
                key={f.id}
                ref={(el) => {
                  btns.current[f.id] = el;
                }}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {GRID.map((p) => {
            const visible = filter === "all" || p.kind === filter;
            const [w, h] = DIM[p.id];
            return (
              <button
                key={p.id}
                data-tile
                hidden={!visible}
                className={`${styles.tile} reveal`}
                data-cursor="view"
                aria-label={`Open photo: ${p.alt}`}
                onClick={() => open(shown, shown.indexOf(p))}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={small(p.id)} width={w} height={h} alt={p.alt} loading="lazy" />
                <span className={styles.cap}>{p.alt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
