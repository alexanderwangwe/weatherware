<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WeatherRequest;
use App\Services\WeatherService;
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    /**
     * @var WeatherService
     */
    private WeatherService $weatherService;

    /**
     * Constructor
     *
     * @param WeatherService $weatherService
     */
    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    /**
     * Get current weather for a city
     *
     * @param WeatherRequest $request
     * @return JsonResponse
     */
    public function getWeather(WeatherRequest $request): JsonResponse
    {
        $city = $request->input('city');
        $unit = $request->input('unit', 'metric');

        // Try to geocode the city first
        $geocode = $this->weatherService->geocodeCity($city);
        if (!$geocode) {
            return response()->json([
                'error' => 'Could not find the specified city'
            ], 404);
        }

        // Get weather data
        $data = $this->weatherService->getCurrentWeather($city, $unit);
        if (!$data) {
            return response()->json([
                'error' => 'Could not fetch weather data'
            ], 500);
        }

        return response()->json([
            'location' => [
                'city' => $data['name'],
                'country' => $data['sys']['country'] ?? null,
                'coordinates' => [
                    'lat' => $data['coord']['lat'],
                    'lon' => $data['coord']['lon']
                ]
            ],
            'weather' => [
                'main' => $data['weather'][0]['main'],
                'description' => $data['weather'][0]['description'],
                'icon' => $data['weather'][0]['icon'],
                'temperature' => [
                    'current' => $data['main']['temp'],
                    'feels_like' => $data['main']['feels_like'],
                    'min' => $data['main']['temp_min'],
                    'max' => $data['main']['temp_max'],
                    'unit' => $unit === 'metric' ? '°C' : '°F'
                ],
                'humidity' => $data['main']['humidity'] . '%',
                'pressure' => $data['main']['pressure'] . ' hPa',
                'wind' => [
                    'speed' => $data['wind']['speed'],
                    'direction' => $data['wind']['deg'] ?? null,
                    'gust' => $data['wind']['gust'] ?? null,
                    'unit' => $unit === 'metric' ? 'm/s' : 'mph'
                ],
                'visibility' => $data['visibility'] / 1000 . ' km',
                'clouds' => $data['clouds']['all'] . '%',
                'sunrise' => date('H:i', $data['sys']['sunrise']),
                'sunset' => date('H:i', $data['sys']['sunset'])
            ],
            'timestamp' => date('Y-m-d H:i:s', $data['dt'])
        ]);
    }

    /**
     * Get 3-day forecast for a city
     *
     * @param WeatherRequest $request
     * @return JsonResponse
     */
    public function getForecast(WeatherRequest $request): JsonResponse
    {
        $city = $request->input('city');
        $unit = $request->input('unit', 'metric');

        // Try to geocode the city first
        $geocode = $this->weatherService->geocodeCity($city);
        if (!$geocode) {
            return response()->json([
                'error' => 'Could not find the specified city'
            ], 404);
        }

        // Get forecast data
        $data = $this->weatherService->getForecast($city, $unit);
        if (!$data) {
            return response()->json([
                'error' => 'Could not fetch forecast data'
            ], 500);
        }

        $forecasts = [];
        $processedDays = [];

        // Process the forecast data to get daily summaries
        foreach ($data['list'] as $forecast) {
            $date = date('Y-m-d', $forecast['dt']);
            
            // Skip if we already have data for this day
            if (in_array($date, $processedDays)) {
                continue;
            }

            // Only process the next 3 days
            if (count($processedDays) >= 3) {
                break;
            }

            $processedDays[] = $date;

            $forecasts[] = [
                'date' => $date,
                'weather' => [
                    'main' => $forecast['weather'][0]['main'],
                    'description' => $forecast['weather'][0]['description'],
                    'icon' => $forecast['weather'][0]['icon']
                ],
                'temperature' => [
                    'day' => $forecast['main']['temp'],
                    'min' => $forecast['main']['temp_min'],
                    'max' => $forecast['main']['temp_max'],
                    'feels_like' => $forecast['main']['feels_like'],
                    'unit' => $unit === 'metric' ? '°C' : '°F'
                ],
                'humidity' => $forecast['main']['humidity'] . '%',
                'pressure' => $forecast['main']['pressure'] . ' hPa',
                'wind' => [
                    'speed' => $forecast['wind']['speed'],
                    'direction' => $forecast['wind']['deg'] ?? null,
                    'gust' => $forecast['wind']['gust'] ?? null,
                    'unit' => $unit === 'metric' ? 'm/s' : 'mph'
                ],
                'clouds' => $forecast['clouds']['all'] . '%',
                'precipitation' => [
                    'probability' => $forecast['pop'] * 100 . '%',
                    'volume' => $forecast['rain']['3h'] ?? 0 . ' mm'
                ]
            ];
        }

        return response()->json([
            'location' => [
                'city' => $data['city']['name'],
                'country' => $data['city']['country'],
                'coordinates' => [
                    'lat' => $data['city']['coord']['lat'],
                    'lon' => $data['city']['coord']['lon']
                ]
            ],
            'forecast' => $forecasts,
            'timestamp' => date('Y-m-d H:i:s', $data['list'][0]['dt'])
        ]);
    }
}
