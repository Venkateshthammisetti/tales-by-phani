"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import { asset } from "@/lib/site";
import { HERO, heroTall, heroWide } from "@/lib/photos";
import styles from "./Hero.module.css";

const SLIDE_MS = 3000; // time each photo stays up; the cross-fade in Hero.module.css is 0.9s
const pad = (n: number) => String(n).padStart(2, "0");

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(true);

  useGSAP(
    () => {
      if (!prefersMotion()) {
        setLoaderDone(true);
        setPlaying(false); // reduced motion: no autoplay, visitors can still step through the slides
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

      // Scroll: photos drift slower than the page, copy lifts and fades.
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

  // Only advance while the hero is on screen and the tab is visible.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const vis = () => setInView(document.visibilityState === "visible" && el.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  // No pause on hover: the hero fills the screen, so a resting mouse would stop it for good.
  const running = loaderDone && playing && inView;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % HERO.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [running, cur]);

  return (
    <section
      ref={root}
      className={styles.hero}
      aria-label="Introduction"
      aria-roledescription="carousel"
    >
      {!loaderDone && (
        <div className={styles.loader} data-loader aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.loaderLogo} data-loader-logo src={asset("/img/logo-light.png")} alt="" />
          <div className={styles.prog}>
            <i data-loader-bar />
          </div>
        </div>
      )}

      <div className={styles.ph} data-hero-img>
        {HERO.map((s, i) =>
          // The first slide loads straight away; the others wait for the intro so they don't compete with it
          // (unless a visitor picks one sooner).
          i === 0 || i === cur || loaderDone ? (
            <picture
              key={s.id}
              className={`${styles.slide} ${i === cur ? styles.on : ""}`}
              aria-hidden={i !== cur}
            >
              <source media="(orientation: landscape)" srcSet={heroWide(s.id)} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroTall(s.id)} alt={s.alt} fetchPriority={i === 0 ? "high" : "low"} decoding="async" />
            </picture>
          ) : null,
        )}
      </div>
      <div className={styles.shade} />
      <div className={styles.scrollcue} aria-hidden="true">
        Scroll <i />
      </div>

      <div className={styles.copy} data-hero-copy>
        <div className={styles.top} data-hero-fade>
          <p className="kicker">Weddings, portraits, emotions</p>
          <div className={styles.dots} role="group" aria-label="Hero photos">
            {HERO.map((s, i) => (
              <button
                key={s.id}
                className={i === cur ? styles.dotOn : undefined}
                aria-label={`Show photo ${i + 1} of ${HERO.length}`}
                aria-current={i === cur}
                onClick={() => setCur(i)}
              >
                <i
                  key={`${i}-${cur}`}
                  style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                />
              </button>
            ))}
            <button
              className={styles.pause}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6v12M15 6v12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.5l11 6.5-11 6.5z" />
                </svg>
              )}
            </button>
            <span className={styles.num} aria-hidden="true">
              {pad(cur + 1)} / {pad(HERO.length)}
            </span>
          </div>
        </div>
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
