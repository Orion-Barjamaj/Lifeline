import { cookies } from "next/headers";
import BottomNav from "../components/bottom-nav";
import { createClient } from "../utils/supabase/server";
import SosFeed from "./sos-feed";
import style from "./sos.module.css";
import type { SosAlertCard } from "./types";

function timeAgo(dateStr: string): string {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000),
  );

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 52) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  return "A long time ago";
}

function getAgeMinutes(dateStr: string): number {
  return Math.max(
    0,
    Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000 / 60),
  );
}

export default async function SOS() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sosData } = await supabase
    .from("sos_alerts")
    .select("*")
    .order("created_at", { ascending: false });

  const allowedCities = ["Fier", "Tirana", "Elbasan", "Durres", "Shkoder"];
  const defaultMapLink =
    "https://www.google.com/maps/place/41%C2%B020'07.2%22N+19%C2%B048'35.1%22E/@41.3352081,19.8080016,17.94z/data=!4m4!3m3!8m2!3d41.335319!4d19.809748?entry=ttu&g_ep=EgoyMDI2MDIxNy4wIKXMDSoASAFQAw%3D%3D";

  const formattedData: SosAlertCard[] = (sosData ?? []).map((event, index) => {
    const rawCity = String(event.city ?? event.location ?? "").trim();
    const matchedCity = allowedCities.find(
      (city) => city.toLowerCase() === rawCity.toLowerCase(),
    );

    return {
      id: String(event.id ?? `${event.created_at}-${index}`),
      location: matchedCity ?? "Tirana",
      address: String(
        event.address ?? "Rruga Asim Vokshi, Tirane 1000, Albania",
      ),
      time: new Date(event.created_at).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temperature: `${event.temp ?? "-"} C`,
      co2: `${event.gas ?? "-"}%`,
      humidity: `${event.humidity ?? "-"}%`,
      listedHoursAgo: timeAgo(event.created_at),
      ageMinutes: getAgeMinutes(event.created_at),
      mapsCord: String(event.map_link ?? defaultMapLink),
    };
  });

  return (
    <div className={style.page}>
      <header className={style.header}>
        <h1>SOS Alerts</h1>
        <p>Track emergency alerts and filter by recency or city.</p>
      </header>

      <div className={style.container}>
        <SosFeed alerts={formattedData} />
      </div>

      <BottomNav />
    </div>
  );
}
