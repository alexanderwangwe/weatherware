# WeatherWare

This is my submission for Pawa IT_Software Engineering assessment.

A responsive and user-friendly weather app built in a decoupled architecture using NextJS, TypeScript, and Tailwind CSS with a Laravel backend. The app fetches real-time weather data and displays current conditions, a 3-day forecast, and detailed weather information for any city.

---

## Features 

- **Current Weather**: Displays temperature, weather condition, and location.
- **3-Day Forecast**: Provides a short-term weather outlook.
- **Unit Toggle**: Switch between metric (°C) and imperial (°F) units.
- **Search Functionality**: Search for weather data by city.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Error Handling**: Displays error messages for failed API requests.
- **Loading States**: Shows a loading indicator while fetching data.

---

## Tech Stack 

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Laravel
- **API**: OpenWeather API
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## Installation & Setup 

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weatherware/frontend   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd weatherware/backend
  

2. Install dependencies:
   ```bash
   composer install
   ```

3. Set up environment variables
4. Run database migrations:
   ```bash
   php artisan migrate
   ```

6. Start the backend server:

   ```bash
   php artisan serve
   ```

7. The backend will be available at:
   ```
   http://localhost:8000
   ```

---

## Usage

1. Enter a city name in the search bar to fetch weather data.
2. Toggle between °C and °F using the temperature toggle button.
3. View detailed weather information, including humidity, wind speed, and direction.

---
## API Reference 📡

- **Endpoint**: `/api/weather`
- **Query Parameters**:
  - `city`: Name of the city (e.g., `Nairobi`).
  - `unit`: Unit of measurement (`metric` or `imperial`).

Example Request:

```bash
GET /api/weather?city=Nairobi&unit=metric
```

## Screenshots 

<img width="853" alt="image" src="https://github.com/user-attachments/assets/c56e854b-6554-4026-9ff9-75d291b863a3" />


## Contact 📧

For questions or feedback, reach out to:
- **Email**: alexanderwangwe@gmail.com
