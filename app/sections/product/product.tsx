"use client";

import { useEffect, useRef } from "react";
import style from "./product.module.css";
import "../sections.css";
import Card from "./card";

const productCards = [
  { name: "Height", info: "190 Cm", tilt: "-5deg" },
  { name: "Payload", info: "80 Kg", tilt: "4deg" },
  { name: "Runtime", info: "6 Hrs", tilt: "-4deg" },
  { name: "Range", info: "4 Km", tilt: "6deg" },
];

export default function Product() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = containerRef.current;
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
    <div
      id="product"
      ref={containerRef}
      className={`section_container ${style.container}`}
    >
      <div className={`${style.header} ${style.reveal}`} data-reveal>
        <h1 className={style.title}>PRODUCT</h1>
        <p className={style.paragraph}>Disaster Response Robot</p>
      </div>
      <div className={style.cards}>
        {productCards.map((card, index) => (
          <Card
            key={`${card.name}-${index}`}
            name={card.name}
            info={card.info}
            className={style.revealCard}
            tilt={card.tilt}
          />
        ))}
      </div>
    </div>
  );
}
