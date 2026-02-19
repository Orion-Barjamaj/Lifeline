"use client";

import { useMemo, useState } from "react";
import Card from "./card";
import style from "./sos.module.css";
import type { SosAlertCard } from "./types";

const CITY_OPTIONS = ["Fier", "Tirana", "Elbasan", "Durres", "Shkoder"] as const;
const TIME_RANGE_OPTIONS = [
  { value: "last_1_hour", label: "Last 1 hour", maxMinutes: 60 },
  { value: "last_24_hours", label: "Last 24 hours", maxMinutes: 24 * 60 },
  { value: "last_7_days", label: "Last 7 days", maxMinutes: 7 * 24 * 60 },
  { value: "all_time", label: "All time", maxMinutes: null },
] as const;

type SosFeedProps = {
  alerts: SosAlertCard[];
};

export default function SosFeed({ alerts }: SosFeedProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [timeRange, setTimeRange] = useState<
    (typeof TIME_RANGE_OPTIONS)[number]["value"]
  >("all_time");
  const [selectedCity, setSelectedCity] = useState("All");

  const filteredAlerts = useMemo(() => {
    const selectedTimeRange = TIME_RANGE_OPTIONS.find(
      (option) => option.value === timeRange,
    );
    const maxMinutes = selectedTimeRange?.maxMinutes ?? null;

    return alerts.filter((alert) => {
      const cityMatches =
        selectedCity === "All" || alert.location === selectedCity;
      const timeMatches =
        maxMinutes === null ? true : alert.ageMinutes <= maxMinutes;

      return cityMatches && timeMatches;
    });
  }, [alerts, timeRange, selectedCity]);

  return (
    <>
      <div className={style.filterBar}>
        <button
          type="button"
          className={style.filterButton}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? "Hide Filters" : "Filter Alerts"}
        </button>
        <span className={style.resultCount}>{filteredAlerts.length} shown</span>
      </div>

      {showFilters && (
        <div className={style.filterPanel}>
          <label className={style.filterField}>
            <span>Time range</span>
            <select
              value={timeRange}
              onChange={(event) =>
                setTimeRange(
                  event.target.value as (typeof TIME_RANGE_OPTIONS)[number]["value"],
                )
              }
            >
              {TIME_RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className={style.filterField}>
            <span>City</span>
            <select
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
            >
              <option value="All">All cities</option>
              {CITY_OPTIONS.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div className={style.cards}>
        {filteredAlerts.length === 0 ? (
          <div className={style.emptyState}>
            No SOS alerts match your current filters.
          </div>
        ) : (
          filteredAlerts.map((alert) => <Card key={alert.id} sos={alert} />)
        )}
      </div>
    </>
  );
}
