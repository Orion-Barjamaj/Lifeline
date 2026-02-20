"use client";

import { useEffect, useRef } from "react";
import style from "./contact.module.css";
import "../sections.css";

const contactItems = [
  {
    label: "Dispatch Center",
    value: "ops@lifeline-response.org",
  },
  {
    label: "Emergency Hotline",
    value: "+1 (800) 555-0149",
  },
  {
    label: "Field HQ",
    value: "Pier 38, San Francisco, CA",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealNodes = Array.from(
      section.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(style.visible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    revealNodes.forEach((node, index) => {
      node.style.setProperty("--reveal-delay", `${index * 90}ms`);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`section_container ${style.container}`}
    >
      <div className={`${style.info} ${style.reveal}`} data-reveal>
        <p className={style.eyebrow}>Contact</p>
        <h2 className={style.title}>Coordinate With Lifeline Ops</h2>
        <p className={style.subtitle}>
          Reach command support for deployment planning, incident collaboration,
          and live response integration.
        </p>
      </div>

      <div className={style.cards}>
        {contactItems.map((item) => (
          <article
            key={item.label}
            className={`${style.card} ${style.revealCard}`}
            data-reveal
          >
            <h3 className={style.label}>{item.label}</h3>
            <p className={style.value}>{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
