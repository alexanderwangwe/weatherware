"use client";
import { useState } from "react";
import CurrentWeather from "./current-weather";
import WeatherForecast from "./weather-forecast";
import WeatherDetails from "./weather-details";
import SearchBar from "./search-bar";
import TemperatureToggle from "./temperature-toggle";

export default function WeatherDashboard() {
  const [city, setCity] = useState("Nairobi");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  // Handle search input from the SearchBar
  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  // Handle unit toggle (e.g., metric or imperial)
  const handleUnitToggle = (newUnit: "metric" | "imperial") => {
    setUnit(newUnit);
  };

  return (
    <div className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Current Weather */}
        <div className="flex flex-col items-center justify-center space-y-4 border-b pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
          <CurrentWeather city={city} unit={unit} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between gap-2">
            <SearchBar onSearch={handleSearch} />
            <TemperatureToggle onToggle={handleUnitToggle} />
          </div>

          {/* Weather Forecast */}
          <div className="mb-6">
            <WeatherForecast city={city} unit={unit} />
          </div>

          {/* Weather Details */}
          <WeatherDetails city={city} />
        </div>
      </div>
    </div>
  );
}
