import { useEffect, useState } from "react";
import { Cloud, Sun } from "lucide-react";

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
          `${process.env.NEXT_PUBLIC_API_URL}/api/forecast?city=${city}&unit=metric`
        );
        if (!res.ok) {
          const errorBody = await res.text();
          console.error("Error response:", res.status, errorBody);
          throw new Error(`Failed to fetch forecast: ${res.status}`);
        }

        const json = await res.json();
        console.log("Forecast data:", json);

        // Update the forecast state with the fetched data
        setForecast(
          json.forecast.map((day: any) => ({
            date: day.date,
            icon: day.weather.icon, // Adjust based on backend response
            temperature: day.temperature,
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
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!forecast.length) return null;

  return (
    <div className="grid grid-cols-3 gap-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center"
        >
          <div className="mb-2 text-sm font-medium">{day.date}</div>
          <div className="mb-2 text-3xl">
            {day.icon === "sunny" ? (
              <Sun className="mx-auto h-10 w-10 text-yellow-400" />
            ) : (
              <Cloud className="mx-auto h-10 w-10 text-gray-400" />
            )}
          </div>
          <div className="text-xs text-gray-600">
            {day.temperature}°{unit === "metric" ? "C" : "F"}
          </div>
        </div>
      ))}
    </div>
  );
}
