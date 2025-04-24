import { Cloud, Sun } from "lucide-react"

interface CurrentWeatherProps {
  icon: string
  temperature: string
  condition: string
  date: string
  location: string
}

export default function CurrentWeather({ icon, temperature, condition, date, location }: CurrentWeatherProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Weather Icon */}
      <div className="mb-4 text-8xl text-gray-700">
        {icon === "partly-cloudy" ? (
          <div className="relative">
            <Sun className="h-24 w-24 text-yellow-400" />
            <Cloud className="absolute -bottom-2 -right-2 h-16 w-16 text-gray-400" />
          </div>
        ) : icon === "sunny" ? (
          <Sun className="h-24 w-24 text-yellow-400" />
        ) : (
          <Cloud className="h-24 w-24 text-gray-400" />
        )}
      </div>

      {/* Temperature */}
      <div className="mb-2 text-5xl font-bold text-gray-800">{temperature}°C</div>

      {/* Weather Condition */}
      <div className="mb-6 text-xl text-gray-600">{condition}</div>

      {/* Date and Location */}
      <div className="text-gray-500">
        <div className="text-lg font-medium">{date}</div>
        <div>{location}</div>
      </div>
    </div>
  )
}
