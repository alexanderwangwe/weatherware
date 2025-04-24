import { RotateCw } from "lucide-react"

interface WeatherDetailsProps {
  title: string
  value: string
  icon: string
  showProgressBar?: boolean
}

export default function WeatherDetails({ title, value, icon, showProgressBar = false }: WeatherDetailsProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="mb-4 text-center text-sm text-gray-500">{title}</div>
      <div className="mb-4 text-center text-4xl font-bold">{value}</div>

      {icon === "wind" && (
        <div className="flex items-center justify-center">
          <div className="rounded-full border border-gray-200 p-2">
            <RotateCw className="h-4 w-4 text-gray-400" />
          </div>
          <span className="ml-2 text-xs text-gray-500">WSW</span>
        </div>
      )}

      {showProgressBar && (
        <div className="mt-4">
          <div className="relative h-2 w-full rounded-full bg-gray-200">
            <div className="absolute left-0 top-0 h-2 rounded-full bg-gray-400" style={{ width: "80%" }}></div>
          </div>
        </div>
      )}
    </div>
  )
}
