import type { CSSProperties } from "react";
import style from "./product.module.css";

type CardProps = {
  name: string;
  info: string;
  className?: string;
  tilt?: string;
};

export default function Card({ name, info, className, tilt }: CardProps) {
  return (
    <div
      className={`${style.card} ${className ?? ""}`}
      style={{ "--tilt": tilt } as CSSProperties}
      data-reveal
    >
      <h2 className={style.name}>{name}</h2>
      <span className={style.info}>{info}</span>
    </div>
  );
}
