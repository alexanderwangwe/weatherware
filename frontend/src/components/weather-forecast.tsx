import { Cloud, Sun } from "lucide-react"

export default function WeatherForecast() {
  const forecast = [
    {
      day: "21 May",
      icon: "sunny",
      temperature: "11-17",
    },
    {
      day: "22 May",
      icon: "cloudy",
      temperature: "20-24",
    },
    {
      day: "23 May",
      icon: "sunny",
      temperature: "18-20",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {forecast.map((day, index) => (
        <div key={index} className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center">
          <div className="mb-2 text-sm font-medium">{day.day}</div>
          <div className="mb-2 text-3xl">
            {day.icon === "sunny" ? (
              <Sun className="mx-auto h-10 w-10 text-yellow-400" />
            ) : (
              <Cloud className="mx-auto h-10 w-10 text-gray-400" />
            )}
          </div>
          <div className="text-xs text-gray-600">{day.temperature}°C</div>
        </div>
      ))}
    </div>
  )
}
