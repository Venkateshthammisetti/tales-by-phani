"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersMotion, finePointer } from "@/lib/gsap";
import { SERVICES, small } from "@/lib/photos";
import { RevealHeading } from "./RevealHeading";
import styles from "./Services.module.css";

export function Services() {
  const root = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Floating photo preview trails the pointer while hovering a row (mouse and trackpad only).
  useEffect(() => {
    const el = float.current;
    if (!el || !finePointer()) return;
    let fx = 0, fy = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX + 28;
      ty = e.clientY - 150;
    };
    const loop = () => {
      fx += (tx - fx) * 0.12;
      fy += (ty - fy) * 0.12;
      el.style.translate = `${fx}px ${fy}px`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", move);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", move);
    };
  }, []);

  useGSAP(
    () => {
      if (!prefersMotion()) return;
      gsap.from("li", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: "ul", start: "top 88%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className={`${styles.services} on-fog`}>
      <div className="wrap">
        <p className="kicker">Services</p>
        <RevealHeading>
          What we <em>shoot</em>
        </RevealHeading>
        <ul className={styles.svc}>
          {SERVICES.map((s, i) => (
            <li key={s.title}>
              <a href="#contact" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.thumb} src={small(s.img)} alt="" loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className={styles.go}>Enquire</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div ref={float} className={`${styles.float} ${active !== null ? styles.floatOn : ""}`} aria-hidden="true">
        {SERVICES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s.img} src={small(s.img)} alt="" className={active === i ? styles.imgOn : ""} />
        ))}
      </div>
    </section>
  );
}
