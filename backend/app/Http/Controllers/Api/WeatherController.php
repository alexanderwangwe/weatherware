<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function fetch(Request $request)
    {
        $city = $request->query('city', 'Nairobi'); 

        $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'q' => $city,
            'appid' => env('OPENWEATHER_API_KEY'),
            'units' => 'metric',
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Could not fetch weather data'], 500);
        }

        $data = $response->json();

        return response()->json([
            'location' => $data['name'],
            'temperature' => $data['main']['temp'] . '°C',
            'description' => $data['weather'][0]['description'],
        ]);
    }
}
