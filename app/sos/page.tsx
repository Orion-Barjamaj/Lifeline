import style from "./sos.module.css";
import Card from "./card";

export default function SOS() {
  const sosData = [
    {
      location: "Tirana",
      address: "Rruga Myslym Shyri 45, Tirana, Albania",
      time: "10:14",
      temperature: "10°C",
      co2: "400 ppm",
      humidity: "10°C",
      listedHoursAgo: 5
    },
    {
      location: "Tirana",
      address: "Rruga Myslym Shyri 45, Tirana, Albania",
      time: "10:14",
      temperature: "10°C",
      co2: "400 ppm",
      humidity: "10°C",
      listedHoursAgo: 5
    }
  ];

  return <div className={style.container}>
    <h1>SOS</h1>
    {sosData.map((sos, index) => (
      <Card key={index} sos={sos} />
    ))}
  </div>;
}