<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WeatherController;

// rate limiting to all weather routes
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/weather', [WeatherController::class, 'getWeather']);
    Route::get('/forecast', [WeatherController::class, 'getForecast']);
});

