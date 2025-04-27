import { useEffect, useState } from "react";

interface WeatherForecastProps {
  city: string;
  unit: string;
}

export default function WeatherForecast({ city, unit }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/forecast?city=${city}&unit=${unit}`
        );
        if (!res.ok) {
          const errorBody = await res.text();
          console.error("Error response:", res.status, errorBody);
          throw new Error(`Failed to fetch forecast: ${res.status}`);
        }

        const json = await res.json();
        console.log("Fetched forecast data:", json);

        setForecast(
          json.forecast.map((item: any) => ({
            day: new Date(item.date).toLocaleDateString("en-US", {
              weekday: "long",
            }),
            min: item.temperature.min,
            max: item.temperature.max,
            feels_like: item.temperature.feels_like,
            unit: item.temperature.unit,
          }))
        );
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city, unit]); // Re-fetch when city or unit changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!forecast.length) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Day */}
          <div className="mb-2 text-sm font-medium text-primary">{day.day}</div>

          {/* Temperatures */}
          <div className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-700">
            <span>
              {day.min}
              {day.unit}
            </span>
            <span className="text-gray-400">—</span>
            <span>
              {day.max}
              {day.unit}
            </span>
          </div>
          {/* Feels like */}
          <div className="text-sm text-gray-500">
            Feels like:{" "}
            <span className="font-semibold text-gray-700">
              {day.feels_like}
              {day.unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
