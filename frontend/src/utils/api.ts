// The base URL for the API, taken from an environment variable or defaulting to localhost
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Function to fetch current weather data from the backend
export const fetchWeather = async (city: string, unit = "metric") => {
  // Sends a POST request to the /api/weather endpoint
  const res = await fetch(`${BASE_URL}/api/weather`, {
    method: "POST", // HTTP method
    headers: { "Content-Type": "application/json" }, // Specifies JSON content type
    body: JSON.stringify({ city, unit }), // Sends the city and unit as JSON in the request body
  })
  // Throws an error if the response status is not OK (e.g., 4xx or 5xx)
  if (!res.ok) throw new Error("Failed to fetch current weather")
  // Parses and returns the JSON response from the backend
  return res.json()
}

// Function to fetch weather forecast data from the backend
export const fetchForecast = async (city: string, unit = "metric") => {
  // Sends a POST request to the /api/forecast endpoint
  const res = await fetch(`${BASE_URL}/api/forecast`, {
    method: "POST", // HTTP method
    headers: { "Content-Type": "application/json" }, // Specifies JSON content type
    body: JSON.stringify({ city, unit }), // Sends the city and unit as JSON in the request body
  })
  // Throws an error if the response status is not OK (e.g., 4xx or 5xx)
  if (!res.ok) throw new Error("Failed to fetch forecast")
  // Parses and returns the JSON response from the backend
  return res.json()
}
