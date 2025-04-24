export default function TemperatureToggle() {
  return (
    <div className="flex items-center space-x-1 rounded-md border border-gray-300 p-1">
      <button className="rounded px-2 py-1 font-medium text-gray-800 bg-gray-200">°C</button>
      <button className="rounded px-2 py-1 font-medium text-gray-500">°F</button>
    </div>
  )
}
