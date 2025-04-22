<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WeatherRequest extends FormRequest
{
    public function authorize(): bool
    {
        
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'city' => ['required', 'string', 'min:2', 'max:100'],
            'unit' => ['sometimes', 'string', 'in:metric,imperial'],
        ];
    }
    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'city.required' => 'City name is required',
            'city.min' => 'City name must be at least 2 characters',
            'city.max' => 'City name must not exceed 100 characters',
            'unit.in' => 'Unit must be either metric or imperial',
        ];
    }
} 