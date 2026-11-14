"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** True unless the visitor asked for reduced motion. Read on the client only. */
export const prefersMotion = () =>
  typeof window !== "undefined" && document.documentElement.classList.contains("motion");

/** Mouse or trackpad: enables the custom cursor, magnetic buttons and hover previews. */
export const finePointer = () =>
  typeof window !== "undefined" && matchMedia("(hover:hover) and (pointer:fine)").matches;

export { gsap, ScrollTrigger, useGSAP };
