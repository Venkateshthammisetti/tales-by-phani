"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersMotion } from "@/lib/gsap";

type ScrollApi = {
  /** Freeze page scroll (menu or lightbox open). */
  lock: () => void;
  unlock: () => void;
};

const ScrollContext = createContext<ScrollApi>({ lock: () => {}, unlock: () => {} });
export const useScrollLock = () => useContext(ScrollContext);

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger animations stay in sync. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    // In-page links: glide with Lenis when it runs, otherwise fall back to a native jump.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      const target = hash.length > 1 ? document.querySelector<HTMLElement>(hash) : null;
      if (!target) return;
      e.preventDefault();
      if (lenis.current) lenis.current.scrollTo(target, { offset: hash === "#top" ? 0 : -10, duration: 1.6 });
      else target.scrollIntoView();
    };
    document.addEventListener("click", onClick);

    if (!prefersMotion()) return () => document.removeEventListener("click", onClick);

    const l = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.current = l;
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Images and fonts change section heights after load; re-measure pinned sections once they settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  const api = useRef<ScrollApi>({
    lock: () => {
      lenis.current?.stop();
      document.documentElement.style.overflow = "hidden";
    },
    unlock: () => {
      lenis.current?.start();
      document.documentElement.style.overflow = "";
    },
  });

  return <ScrollContext.Provider value={api.current}>{children}</ScrollContext.Provider>;
}
