'use client'
import { useState } from "react";
import CurrentWeather from "./current-weather";
import WeatherForecast from "./weather-forecast";
import WeatherDetails from "./weather-details";
import SearchBar from "./search-bar";
import TemperatureToggle from "./temperature-toggle";

export default function WeatherDashboard() {
  const [city, setCity] = useState("Nairobi"); // Default city
  const [unit, setUnit] = useState("metric"); // Default unit (metric)

  // Handle search input from the SearchBar
  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  // Handle unit toggle (e.g., metric or imperial)
  const handleUnitToggle = (newUnit: string) => {
    setUnit(newUnit);
  };

  return (
    <div className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Current Weather */}
        <div className="flex flex-col items-center justify-center space-y-4 border-b pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
          {/* Pass city and unit to CurrentWeather */}
          <CurrentWeather city={city} unit={unit} />
        </div>

        {/* Right Column - Search, Forecast, and Details */}
        <div className="lg:col-span-2">
          {/* Search Bar and Temperature Toggle */}
          <div className="mb-6 flex items-center justify-between gap-2">
            <SearchBar onSearch={handleSearch} />
            <TemperatureToggle onToggle={handleUnitToggle} />
          </div>

          {/* Weather Forecast */}
          <div className="mb-6">
            {/* Pass city and unit to WeatherForecast */}
            <WeatherForecast city={city} unit={unit} />
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <WeatherDetails title="Wind Status" value="3 km/h" icon="wind" />
            <WeatherDetails
              title="Humidity"
              value="80%"
              icon="humidity"
              showProgressBar={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
