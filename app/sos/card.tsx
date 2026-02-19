"use client";

import Link from "next/link";
import style from "./sos.module.css";
import type { SosAlertCard } from "./types";

type CardProps = {
  sos: SosAlertCard;
};

export default function Card({ sos }: CardProps) {
  return (
    <div className={style.card}>
      <div className={style.image}></div>
      <div className={style.info}>
        <h2>Survivor Found in {sos.location}</h2>
        <p>{sos.address}</p>
        <span className={style.time}>{sos.time}</span>
        <div className={style.data}>
          <span className={style.data_values}>{sos.temperature}</span>
          <div className={style.line}></div>
          <span className={style.data_values}>{sos.co2}</span>
          <div className={style.line}></div>
          <span className={style.data_values}>{sos.humidity}</span>
        </div>
        <p className={style.listed}>
          LISTED <span className={style.ago}>{sos.listedHoursAgo}</span>
        </p>
        <div className={style.btn_container}>
          <button className={style.btn}>Dismiss</button>
          <Link className={style.btn} href={sos.mapsCord} target="_blank">
            Open Maps
          </Link>
        </div>
      </div>
    </div>
  );
}
