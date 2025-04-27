"use client";

import { useEffect, useState } from "react";

interface WeatherDetailsProps {
  city: string;
}

interface WeatherData {
  humidity: string;
  windSpeed: number;
  windDirection: number;
}

export default function WeatherDetails({ city }: WeatherDetailsProps) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/weather?city=${city}`
        );
        if (!res.ok) throw new Error("Failed to fetch weather details");

        const json = await res.json();

        setData({
          humidity: json.weather.humidity,
          windSpeed: json.weather.wind.speed,
          windDirection: json.weather.wind.direction,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  if (loading) return <div>Loading weather details...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <DetailBox title="Humidity" value={data.humidity} />
      <DetailBox title="Wind Speed" value={`${data.windSpeed} m/s`} />
      <DetailBox title="Wind Direction" value={`${data.windDirection}°`} />
    </div>
  );
}

function DetailBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-sm">
      <div className="text-sm font-semibold text-gray-600">{title}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  );
}
