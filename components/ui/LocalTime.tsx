"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: siteConfig.timeZone,
});

export function LocalTime() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const updateTime = () => setTime(timeFormatter.format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums" aria-label={`Local time in ${siteConfig.location}`}>
      {time}
    </span>
  );
}
