import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="Search city..."
        className="w-full rounded-md border border-gray-300 py-2 pl-4 pr-10 focus:border-gray-400 focus:outline-none"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-gray-100 p-1">
        <Search className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  )
}
