"use client";

import useFetchAPI from "@/services/FetchAPI";
import { useState, useEffect } from "react";
import weatherIcons from "@/app/data/Forecast";
import ShareButton from "./components/ShareButton";
import BgButton from "./components/BgButton";
import { MdLocationPin } from "react-icons/md";
import BgModal from "./components/Modal";
import ShareUI from "./components/ShareUI";

export default function Home() {
  const [ip, setIp] = useState("");
  const [coords, setCoords] = useState({
    country: null,
    state: null,
    city: null,
  });
  const [url, setUrl] = useState(null);
  const [isLabelVisible, setIsLabelVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://warnersallman.com/1280/28320-mountains-moon-dark-artist-artwork-digital-art.jpg"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("imageUrl", imageUrl);
  }, [imageUrl]);

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

  const weatherLabelRaw = isLabelVisible
    ? data?.data?.current?.summary || ""
    : "";
  const weatherLabel = weatherLabelRaw.trim();
  const icon = isLabelVisible
    ? weatherIcons[weatherLabel] || "Not available"
    : null;

  return (
    <main
      className=""
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center flex-col justify-center gap-14 h-screen w-full font-quicksand text-white bg-black/50">
        <h1 className="text-2xl flex items-center gap-2">
          <MdLocationPin /> {coords.city}, {coords.state}, {coords.country}
        </h1>
        <section className="flex w-[80%] justify-around items-center">
          <div className="font-bungee">
            <div className="flex items-center">
              <span className="text-9xl">{icon}</span>
              {data && data.data && data.data.current ? (
                <span className="text-6xl">
                  {data.data.current.temperature} C°
                </span>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="text-center">
              {data && data.data && data.data.current ? (
                <h2 className="text-2xl">{data.data.current.summary}</h2>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="font-bungee text-2xl mb-3">Hourly Forecast</h2>
            {data && data.data && data.data.hourly && data.data.hourly.data ? (
              <ul>
                {data.data.hourly.data.slice(0, 3).map((hour, index) => (
                  <li key={index} className="mb-2 border-b border-b-white py-1 px-4 font-medium">
                    {hour.summary} | {hour.temperature}°C | {hour.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading hourly forecast...</p>
            )}
          </div>
        </section>
        <div className="flex items-center gap-6 ">
          <span className="hidden"><ShareButton /></span>
          {isModalOpen && (
            <BgModal
              onClose={() => setIsModalOpen(false)}
              onSave={(url) => setImageUrl(url)}
            />
          )}
          <BgButton onClick={() => setIsModalOpen(true)} />
        </div>
      </div>
    </main>
  );
}
