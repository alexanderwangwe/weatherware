"use client";

import { useEffect, useState } from "react";
import { Cloud, Sun } from "lucide-react";

interface CurrentWeatherProps {
  city: string;
  unit: "metric" | "imperial";
}

export default function CurrentWeather({ city, unit }: CurrentWeatherProps) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/weather?city=${city}&unit=${unit}`
        );
        if (!res.ok) throw new Error("Failed to fetch current weather");

        const json = await res.json();

        setWeather({
          temperature: json.weather.temperature.current,
          feelsLike: json.weather.temperature.feels_like,
          condition: json.weather.description,
          icon: json.weather.icon,
          humidity: json.weather.humidity,
          windSpeed: json.weather.wind.speed,
          windDirection: json.weather.wind.direction,
          location: `${json.location.city}, ${json.location.country}`,
          date: new Date(json.timestamp).toLocaleString(),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, unit]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return null;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 text-8xl text-gray-700">
        {/* Render weather icon */}
        {weather.icon === "01d" ? (
          <Sun className="h-24 w-24 text-yellow-400" />
        ) : (
          <Cloud className="h-24 w-24 text-gray-400" />
        )}
      </div>
      <div className="mb-2 text-5xl font-bold text-gray-800">
        {weather.temperature}°{unit === "metric" ? "C" : "F"}
      </div>
      <div className="mb-6 text-xl text-gray-600">{weather.condition}</div>
      <div className="text-gray-500">
        <div className="text-lg font-medium">{weather.date}</div>
        <div>{weather.location}</div>
      </div>
    </div>
  );
}
