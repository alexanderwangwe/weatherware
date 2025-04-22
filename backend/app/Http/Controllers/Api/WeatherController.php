<?php

namespace App\Http\Controllers\Api;

use App\DTOs\{CurrentWeatherDTO, ForecastDTO};
use App\Http\Controllers\Controller;
use App\Http\Requests\WeatherRequest;
use App\Services\WeatherService;
use App\Transformers\WeatherTransformer;
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

        $weatherDTO = WeatherTransformer::toCurrentWeather($data, $unit);

        return response()->json($weatherDTO);
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

        $forecastDTO = WeatherTransformer::toForecast($data, $unit);

        return response()->json($forecastDTO);
    }
}
