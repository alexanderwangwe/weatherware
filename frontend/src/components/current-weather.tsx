import { useEffect, useState } from "react";
import { fetchWeather } from "../utils/api";
import { Cloud, Sun } from "lucide-react";

interface CurrentWeatherProps {
  city: string;
  unit: string;
}

export default function CurrentWeather({ city, unit }: CurrentWeatherProps) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(city, unit); // Fetch data based on props
        setWeather(data);
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
  if (!weather) return null;

  return (
    <div className="flex flex-col items-center text-center">
      {/* Weather Icon */}
      <div className="mb-4 text-8xl text-gray-700">
        {weather.icon === "partly-cloudy" ? (
          <div className="relative">
            <Sun className="h-24 w-24 text-yellow-400" />
            <Cloud className="absolute -bottom-2 -right-2 h-16 w-16 text-gray-400" />
          </div>
        ) : weather.icon === "sunny" ? (
          <Sun className="h-24 w-24 text-yellow-400" />
        ) : (
          <Cloud className="h-24 w-24 text-gray-400" />
        )}
      </div>

      {/* Temperature */}
      <div className="mb-2 text-5xl font-bold text-gray-800">
        {weather.temperature}°{unit === "metric" ? "C" : "F"}
      </div>

      {/* Weather Condition */}
      <div className="mb-6 text-xl text-gray-600">{weather.condition}</div>

      {/* Date and Location */}
      <div className="text-gray-500">
        <div className="text-lg font-medium">{weather.date}</div>
        <div>{weather.location}</div>
      </div>
    </div>
  );
}
