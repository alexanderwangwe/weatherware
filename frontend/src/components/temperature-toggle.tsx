

interface TemperatureToggleProps {
  onToggle: (unit: string) => void;
}

export default function TemperatureToggle({
  onToggle,
}: TemperatureToggleProps) {
  return (
    <div className="flex items-center space-x-1 rounded-md border border-gray-300 p-1">
      <button
        className="rounded px-2 py-1 font-medium text-gray-800 bg-gray-200"
        onClick={() => onToggle("metric")} // Call onToggle with "metric"
      >
        °C
      </button>
      <button
        className="rounded px-2 py-1 font-medium text-gray-500"
        onClick={() => onToggle("imperial")} // Call onToggle with "imperial"
      >
        °F
      </button>
    </div>
  );
}
