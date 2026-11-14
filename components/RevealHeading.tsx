"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";

/** Section heading that rises and fades in as it scrolls into view. */
export function RevealHeading({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!prefersMotion()) return;
    gsap.from(ref.current, {
      yPercent: 40,
      opacity: 0,
      duration: 1.3,
      ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 90%" },
    });
  });

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
