"use client";

import useFetchAPI from "@/services/FetchAPI";
import { useState, useEffect } from "react";
import weatherIcons from "@/app/data/Forecast";

export default function Home() {
  const [ip, setIp] = useState("");
  const [coords, setCoords] = useState({
    country: null,
    state: null,
    city: null,
  });
  const [url, setUrl] = useState(null);
  const [isLabelVisible, setIsLabelVisible] = useState(false);

  useEffect(() => {
    fetch("https://api.ipquery.io/")
      .then((res) => res.text())
      .then((ipText) => setIp(ipText));
  }, []);

  useEffect(() => {
    if (!ip) return;

    fetch(`https://api.ipquery.io/${ip}`)
      .then((res) => res.json())
      .then((data) => {
        const { latitude, longitude, country, state, city } = data.location;
        setCoords({ country, state, city });
        setUrl(
          `https://www.meteosource.com/api/v1/free/point?lat=${latitude}&lon=${longitude}&sections=current,hourly&timezone=auto&language=en&units=metric&key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        setIsLabelVisible(true);
      });
  }, [ip]);

  const data = useFetchAPI(url);
  console.log("Data fetched:", data);

  const weatherLabelRaw = isLabelVisible
    ? data?.data?.current?.summary || ""
    : "";
  const weatherLabel = weatherLabelRaw.trim();
  const icon = isLabelVisible
    ? weatherIcons[weatherLabel] || "Not available"
    : null;

  return (
    <main>
      <h1>
        {coords.city}, {coords.state}, {coords.country}
      </h1>
      <section>
        <div>
          <div className="flex">
            <span>{icon}</span>
            {data && data.data && data.data.current ? (
              <span>{data.data.current.temperature}</span>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div>
            {data && data.data && data.data.current ? (
              <h2>{data.data.current.summary}</h2>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div>
          <h2>Hourly Forecast</h2>
          {data && data.data && data.data.hourly && data.data.hourly.data ? (
            <ul>
              {data.data.hourly.data.slice(0, 3).map((hour, index) => (
                <li key={index}>
                  {hour.summary} | {hour.temperature}°C | {hour.date}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading hourly forecast...</p>
          )}
        </div>
      </section>
    </main>
  );
}
