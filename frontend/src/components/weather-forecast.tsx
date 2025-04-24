import { useEffect, useState } from "react";
import { fetchForecast } from "../utils/api";
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
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchForecast(city, unit); // Fetch data based on props
        setForecast(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, unit]); // Refetch data when city or unit changes

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
