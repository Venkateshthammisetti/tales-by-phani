"use client";

import { useEffect, useRef } from "react";
import { finePointer } from "@/lib/gsap";
import styles from "./Cursor.module.css";

/**
 * Trailing dot cursor that grows into a "View" disc over [data-cursor="view"] elements,
 * plus magnetic pull on [data-magnetic] buttons. Mouse and trackpad only.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
    let magnet: HTMLElement | null = null;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      el.style.opacity = "1";
      const t = e.target as HTMLElement;
      el.classList.toggle(styles.big, !!t.closest('[data-cursor="view"]'));

      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== m) magnet.style.transform = "";
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(mx - r.left - r.width / 2) * 0.18}px,${(my - r.top - r.height / 2) * 0.28}px)`;
      }
    };
    const leave = () => (el.style.opacity = "0");
    const loop = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      el.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };

    addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={styles.cursor} aria-hidden="true">
      <span>View</span>
    </div>
  );
}
