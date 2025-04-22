<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherService
{
    /**
     * Cache duration in seconds (1 hour)
     */
    private const CACHE_DURATION = 3600;

    /**
     * Base URL for OpenWeatherMap API
     */
    private const BASE_URL = 'https://api.openweathermap.org/data/2.5';

    /**
     * Get current weather data for a city
     *
     * @param string $city
     * @param string $unit
     * @return array|null
     */
    public function getCurrentWeather(string $city, string $unit = 'metric'): ?array
    {
        $cacheKey = "weather:current:{$city}:{$unit}";

        return Cache::remember($cacheKey, self::CACHE_DURATION, function () use ($city, $unit) {
            try {
                $response = Http::get(self::BASE_URL . '/weather', [
                    'q' => $city,
                    'appid' => env('OPENWEATHER_API_KEY'),
                    'units' => $unit,
                ]);

                if ($response->failed()) {
                    Log::error('Weather API error', [
                        'city' => $city,
                        'status' => $response->status(),
                        'response' => $response->json()
                    ]);
                    return null;
                }

                return $response->json();
            } catch (\Exception $e) {
                Log::error('Weather API exception', [
                    'city' => $city,
                    'error' => $e->getMessage()
                ]);
                return null;
            }
        });
    }

    /**
     * Get forecast data for a city
     *
     * @param string $city
     * @param string $unit
     * @return array|null
     */
    public function getForecast(string $city, string $unit = 'metric'): ?array
    {
        $cacheKey = "weather:forecast:{$city}:{$unit}";

        return Cache::remember($cacheKey, self::CACHE_DURATION, function () use ($city, $unit) {
            try {
                $response = Http::get(self::BASE_URL . '/forecast', [
                    'q' => $city,
                    'appid' => env('OPENWEATHER_API_KEY'),
                    'units' => $unit,
                ]);

                if ($response->failed()) {
                    Log::error('Forecast API error', [
                        'city' => $city,
                        'status' => $response->status(),
                        'response' => $response->json()
                    ]);
                    return null;
                }

                return $response->json();
            } catch (\Exception $e) {
                Log::error('Forecast API exception', [
                    'city' => $city,
                    'error' => $e->getMessage()
                ]);
                return null;
            }
        });
    }

    /**
     * Get geocoding data for a city
     *
     * @param string $city
     * @return array|null
     */
    public function geocodeCity(string $city): ?array
    {
        $cacheKey = "geocode:{$city}";

        return Cache::remember($cacheKey, self::CACHE_DURATION * 24, function () use ($city) {
            try {
                $response = Http::get('http://api.openweathermap.org/geo/1.0/direct', [
                    'q' => $city,
                    'limit' => 1,
                    'appid' => env('OPENWEATHER_API_KEY'),
                ]);

                if ($response->failed() || empty($response->json())) {
                    Log::error('Geocoding API error', [
                        'city' => $city,
                        'status' => $response->status(),
                        'response' => $response->json()
                    ]);
                    return null;
                }

                return $response->json()[0];
            } catch (\Exception $e) {
                Log::error('Geocoding API exception', [
                    'city' => $city,
                    'error' => $e->getMessage()
                ]);
                return null;
            }
        });
    }
} 