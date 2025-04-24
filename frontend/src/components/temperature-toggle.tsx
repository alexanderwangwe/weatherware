import { useState } from "react";

interface TemperatureToggleProps {
  onToggle: (unit: "metric" | "imperial") => void;
}

export default function TemperatureToggle({
  onToggle,
}: TemperatureToggleProps) {
  const [activeUnit, setActiveUnit] = useState<"metric" | "imperial">("metric");

  const handleToggle = (unit: "metric" | "imperial") => {
    setActiveUnit(unit);
    onToggle(unit); // Notify parent component
  };

  return (
    <div className="flex items-center space-x-1 rounded-md border border-gray-300 p-1">
      <button
        className={`rounded px-2 py-1 font-medium ${
          activeUnit === "metric"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-500"
        }`}
        onClick={() => handleToggle("metric")}
      >
        °C
      </button>
      <button
        className={`rounded px-2 py-1 font-medium ${
          activeUnit === "imperial"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-500"
        }`}
        onClick={() => handleToggle("imperial")}
      >
        °F
      </button>
    </div>
  );
}
