"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import { EMAIL, WHATSAPP, whatsAppOn } from "@/lib/site";
import { small } from "@/lib/photos";
import { RevealHeading } from "./RevealHeading";
import styles from "./Contact.module.css";

const OCCASIONS = ["Wedding", "Pre-wedding shoot", "Engagement", "Couple shoot", "Concert or event"];

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [f, setF] = useState({ name: "", phone: "", type: OCCASIONS[0], date: "", city: "", msg: "" });
  const [note, setNote] = useState("");

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  // The enquiry opens in WhatsApp (or email until a number is set), pre-filled and ready to send.
  const t = (s: string) => s.trim();
  const lines = [
    "Hi Phani, I found Tales by Phani online.",
    `Names: ${t(f.name) || "-"}`,
    `Occasion: ${f.type}`,
    `Date: ${f.date || "not fixed yet"}`,
    `City/venue: ${t(f.city) || "-"}`,
    ...(t(f.phone) ? [`Phone: ${t(f.phone)}`] : []),
    ...(t(f.msg) ? [t(f.msg)] : []),
  ];
  const body = encodeURIComponent(lines.join("\n"));
  const href = whatsAppOn
    ? `https://wa.me/${WHATSAPP}?text=${body}`
    : `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${f.type}${f.date ? ` on ${f.date}` : ""}`)}&body=${body}`;

  useGSAP(
    () => {
      if (!prefersMotion()) return;
      gsap.fromTo(
        "[data-bg]",
        { scale: 1.25 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" className={styles.contact}>
      <div className={styles.bg} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-bg src={small("beach-blur")} alt="" loading="lazy" />
      </div>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className="kicker">Enquire</p>
          <RevealHeading>
            Is your date <em>free?</em>
          </RevealHeading>
          <p className={styles.lead}>
            Tell us when and where. Your message opens in {whatsAppOn ? "WhatsApp" : "your email app"}, ready to send, and
            Phani replies personally.
          </p>
          <div className={styles.reach}>
            <a href={`mailto:${EMAIL}`}>
              <span>
                <small>Email</small>
                {EMAIL}
              </span>
            </a>
            <span>
              <small>Studio</small>Hyderabad, Telangana, India
            </span>
          </div>
        </div>

        <form className={styles.form} noValidate onSubmit={(e) => e.preventDefault()}>
          <div className={styles.two}>
            <Field id="f-name" label="Your names">
              <input id="f-name" ref={nameRef} autoComplete="name" placeholder="Pavan & Sanjana" value={f.name} onChange={set("name")} />
            </Field>
            <Field id="f-phone" label="Phone">
              <input id="f-phone" type="tel" autoComplete="tel" placeholder="+91" value={f.phone} onChange={set("phone")} />
            </Field>
          </div>
          <div className={styles.two}>
            <Field id="f-type" label="Occasion">
              <select id="f-type" value={f.type} onChange={set("type")}>
                {OCCASIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
            <Field id="f-date" label="Date">
              <input id="f-date" type="date" value={f.date} onChange={set("date")} />
            </Field>
          </div>
          <Field id="f-city" label="City or venue">
            <input id="f-city" placeholder="Hyderabad, Vizag, Goa…" value={f.city} onChange={set("city")} />
          </Field>
          <Field id="f-msg" label="Anything else">
            <textarea id="f-msg" placeholder="Guest count, rituals, the mood you want" value={f.msg} onChange={set("msg")} />
          </Field>
          <div className="btns">
            <a
              className="btn fill"
              href={href}
              data-magnetic
              {...(whatsAppOn ? { target: "_blank", rel: "noopener" } : {})}
              onClick={(e) => {
                if (!t(f.name)) {
                  e.preventDefault();
                  setNote("Add your names so Phani knows who is writing.");
                  nameRef.current?.focus();
                } else {
                  setNote(whatsAppOn ? "Opening WhatsApp with your message." : "Opening your email app with your message.");
                }
              }}
            >
              {whatsAppOn ? "Send on WhatsApp" : "Send by email"}
            </a>
          </div>
          <p className={styles.note} role="status">
            {note}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}
