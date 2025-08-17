import React from "react";
import { MdLocationPin } from "react-icons/md";

export default function ShareUI({
  temperature,
  summary,
  icon,
  city,
  state,
  country,
  imageUrl,
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
      }}
      className="text-white flex flex-col text-center items-center justify-center py-6 px-4"
    >
      <div className="flex items-center font-bungee">
        <span className="text-9xl">{icon}</span>
        <span className="text-6xl">{temperature} C°</span>
      </div>
      <span className="font-bungee text-3xl mb-14">{summary}</span>

      <span className="flex items-center mb-14">
        <MdLocationPin /> {city}, {state}, {country}
      </span>

      <span>Taked by - weatherapp-nicolax.vercel.app</span>
    </div>
  );
}
