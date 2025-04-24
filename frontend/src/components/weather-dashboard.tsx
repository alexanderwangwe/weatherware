import CurrentWeather from "./current-weather"
import WeatherForecast from "./weather-forecast"
import WeatherDetails from "./weather-details"
import SearchBar from "./search-bar"
import TemperatureToggle from "./temperature-toggle"

export default function WeatherDashboard() {
  return (
    <div className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Current Weather */}
        <div className="flex flex-col items-center justify-center space-y-4 border-b pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
          <CurrentWeather
            icon="partly-cloudy"
            temperature="13"
            condition="Sunny"
            date="20th May 2027"
            location="Nairobi"
          />
        </div>

        {/* Right Column - Search, Forecast and Details */}
        <div className="lg:col-span-2">
          {/* Search Bar and Temperature Toggle */}
          <div className="mb-6 flex items-center justify-between gap-2">
            <SearchBar />
            <TemperatureToggle />
          </div>

          {/* Weather Forecast */}
          <div className="mb-6">
            <WeatherForecast />
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <WeatherDetails title="Wind Status" value="3 km/h" icon="wind" />
            <WeatherDetails title="Humidity" value="80%" icon="humidity" showProgressBar={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
