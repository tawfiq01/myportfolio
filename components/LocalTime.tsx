"use client";

import { useEffect, useState } from "react";

// Dhaka local time for the footer, updated every half minute.
export default function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return <p>{time ? `${time} GMT+6` : "—"}</p>;
}
