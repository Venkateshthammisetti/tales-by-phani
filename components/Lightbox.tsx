"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { large, type Photo } from "@/lib/photos";
import { gsap, prefersMotion } from "@/lib/gsap";
import { useScrollLock } from "./SmoothScroll";
import styles from "./Lightbox.module.css";

type Open = (photos: Photo[], index: number) => void;
const LightboxContext = createContext<Open>(() => {});
export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<Photo[] | null>(null);
  const [cur, setCur] = useState(0);
  const { lock, unlock } = useScrollLock();
  const returnTo = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const touchX = useRef<number | null>(null);

  const open = useCallback<Open>(
    (photos, index) => {
      returnTo.current = document.activeElement as HTMLElement;
      setList(photos);
      setCur(index);
      lock();
    },
    [lock],
  );

  const close = useCallback(() => {
    setList(null);
    unlock();
    returnTo.current?.focus();
  }, [unlock]);

  const go = useCallback((d: number) => setCur((c) => (list ? (c + d + list.length) % list.length : 0)), [list]);

  useEffect(() => {
    if (!list) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [list, close, go]);

  // Soft cross-fade between photos.
  useEffect(() => {
    if (list && img.current && prefersMotion())
      gsap.fromTo(img.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" });
  }, [list, cur]);

  const photo = list?.[cur];

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {list && photo && (
        <div
          className={styles.lb}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button ref={closeBtn} className={styles.x} onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
          <button className={styles.prev} onClick={() => go(-1)} aria-label="Previous photo">
            <svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8" /></svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={img} key={photo.id} src={large(photo.id)} alt={photo.alt} />
          <button className={styles.next} onClick={() => go(1)} aria-label="Next photo">
            <svg viewBox="0 0 24 24"><path d="M9 4l8 8-8 8" /></svg>
          </button>
          <div className={styles.count}>
            {cur + 1} / {list.length}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}
