import style from "./sos.module.css";

export default function Card({ sos } : any) {
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
          <span className={style.data_values}>10°C</span>
        </div>
        <p className={style.listed}>
          LISTED <span className={style.ago}>5 Hours Ago</span>
        </p>
        <div className={style.btn_container}>
          <button className={style.btn}>Dismiss</button>
          <button className={style.btn}>Open Maps</button>
        </div>
      </div>
    </div>
  );
}
