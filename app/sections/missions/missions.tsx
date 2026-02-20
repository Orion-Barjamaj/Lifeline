"use client";

import { useEffect, useRef } from "react";
import style from "./missions.module.css";
import "../sections.css";

const missions = [
  {
    title: "Rapid Assessment",
    detail:
      "Autonomous scouting maps hazards and safe corridors before teams enter unstable zones.",
    metric: "< 90 sec",
  },
  {
    title: "Victim Localization",
    detail:
      "Thermal and acoustic signals are fused to flag likely survivor positions in dense debris.",
    metric: "98% hit rate",
  },
  {
    title: "Resource Routing",
    detail:
      "Live telemetry prioritizes med kits, extraction tools, and personnel to where impact is highest.",
    metric: "Real-time",
  },
];

export default function Missions() {
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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    revealNodes.forEach((node, index) => {
      node.style.setProperty("--reveal-delay", `${index * 90}ms`);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="missions"
      ref={sectionRef}
      className={`section_container ${style.container}`}
    >
      <header className={`${style.header} ${style.reveal}`} data-reveal>
        <p className={style.eyebrow}>Mission Profiles</p>
        <h2 className={style.title}>Operations We Run in the Field</h2>
        <p className={style.subtitle}>
          Structured mission flows help responders move from first detection to
          extraction with less delay and lower risk.
        </p>
      </header>

      <div className={style.grid}>
        {missions.map((mission) => (
          <article
            key={mission.title}
            className={`${style.card} ${style.revealCard}`}
            data-reveal
          >
            <span className={style.metric}>{mission.metric}</span>
            <h3 className={style.cardTitle}>{mission.title}</h3>
            <p className={style.cardText}>{mission.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
