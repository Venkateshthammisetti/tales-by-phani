"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, PHONE_DISPLAY, asset, waLink, whatsAppOn } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useScrollLock } from "./SmoothScroll";
import styles from "./Nav.module.css";

export function Nav() {
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [bar, setBar] = useState(false);
  const menuRef = useRef(menu);
  const btn = useRef<HTMLButtonElement>(null);
  const { lock, unlock } = useScrollLock();

  useEffect(() => {
    menuRef.current = menu;
  }, [menu]);

  // Solid backdrop after the hero starts scrolling; hide while scrolling down, reveal on the way up.
  useEffect(() => {
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      setSolid(y > 60);
      setHidden(y > lastY && y > 400 && !menuRef.current);
      setBar(y > innerHeight * 0.6);
      lastY = y;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const setOpen = (on: boolean) => {
    setMenu(on);
    if (on) lock();
    else unlock();
  };

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  const cls = [styles.nav, solid && styles.solid, hidden && styles.hide, menu && styles.open].filter(Boolean).join(" ");

  return (
    <>
      <header className={cls}>
        <a className={styles.logo} href="#top" aria-label="Tales by Phani, back to top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/img/logo-light.png")} alt="Tales by Phani Productions" width={1400} height={790} />
        </a>
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a className={styles.cta} href="#contact" data-magnetic>
          Check your date
        </a>
        <button
          ref={btn}
          className={styles.menuBtn}
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          aria-controls="sheet"
          onClick={() => setOpen(!menu)}
        >
          <i />
          <i />
        </button>
      </header>

      <div id="sheet" className={`${styles.sheet} ${menu ? styles.sheetOn : ""}`}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            <em>Check your date</em>
          </a>
        </nav>
        <p>Hyderabad, India. Weddings, couples and concerts.</p>
      </div>

      <div className={`${styles.bar} ${bar && !menu ? styles.barOn : ""}`}>
        <a href="#contact">Check your date</a>
        <a href="#work">Portfolio</a>
      </div>

      {/* Floating WhatsApp button, icon only, shown once the visitor is past the hero. */}
      {whatsAppOn && (
        <a
          href={waLink()}
          target="_blank"
          rel="noopener"
          className={`${styles.waFloat} ${bar && !menu ? styles.waFloatOn : ""}`}
          aria-label={`Chat with Phani on WhatsApp, ${PHONE_DISPLAY}`}
          title="Chat on WhatsApp"
          data-magnetic
        >
          <WhatsAppIcon className={styles.waIcon} />
        </a>
      )}
    </>
  );
}
