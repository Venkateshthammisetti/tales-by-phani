"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import { asset } from "@/lib/site";
import { large, small } from "@/lib/photos";
import styles from "./Hero.module.css";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useGSAP(
    () => {
      if (!prefersMotion()) {
        setLoaderDone(true);
        return;
      }
      const q = gsap.utils.selector(root);

      // Intro: logo wipes in, curtain lifts, photo settles, headline lines rise.
      gsap.set(q("[data-hero-img]"), { scale: 1.18 });
      gsap
        .timeline({ defaults: { ease: "expo.out" }, onComplete: () => setLoaderDone(true) })
        .to(q("[data-loader-logo]"), { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut" })
        .to(q("[data-loader-bar]"), { scaleX: 1, duration: 1.0, ease: "power2.inOut" }, 0)
        .to(q("[data-loader]"), { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "+=.15")
        .to(q("[data-hero-img]"), { scale: 1, duration: 2.4, ease: "power3.out" }, "-=.75")
        .to(q("[data-hero-line]"), { y: 0, duration: 1.4, stagger: 0.12 }, "-=2.05")
        .to(q("[data-hero-fade]"), { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 }, "-=1.1");

      // Scroll: photo drifts slower than the page, copy lifts and fades.
      gsap.to(q("[data-hero-img]"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-hero-copy]"), {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "center center", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} aria-label="Introduction">
      {!loaderDone && (
        <div className={styles.loader} data-loader aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.loaderLogo} data-loader-logo src={asset("/img/logo-light.png")} alt="" />
          <div className={styles.prog}>
            <i data-loader-bar />
          </div>
        </div>
      )}

      <div className={styles.ph}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-hero-img
          src={large("forehead-fog")}
          srcSet={`${small("forehead-fog")} 900w, ${large("forehead-fog")} 1200w`}
          sizes="100vw"
          alt="A couple touching foreheads on a misty hillside"
          fetchPriority="high"
        />
      </div>
      <div className={styles.shade} />
      <div className={styles.scrollcue} aria-hidden="true">
        Scroll <i />
      </div>

      <div className={styles.copy} data-hero-copy>
        <p className="kicker" data-hero-fade>
          Weddings, portraits, emotions
        </p>
        <h1 aria-label="Every love has a story.">
          <span className={styles.mask} aria-hidden="true">
            <span data-hero-line>Every love</span>
          </span>
          <span className={styles.mask} aria-hidden="true">
            <span data-hero-line>
              has a <em>story.</em>
            </span>
          </span>
        </h1>
        <div className={styles.row} data-hero-fade>
          <p>Capturing the feeling, not just the frame. Wedding and couple photography from Hyderabad, anywhere you are.</p>
          <div className="btns">
            <a className="btn fill" href="#story" data-magnetic>
              See the work
            </a>
            <a className="btn" href="#contact" data-magnetic>
              Check your date
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
