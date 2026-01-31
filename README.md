# Weather Forecast Application

A modern and responsive weather web application that provides real-time weather, hourly forecasts, and 7-day forecasts for any location worldwide.

The app supports geolocation-based weather, city search with suggestions, and unit conversions, all built with React and Tailwind CSS, powered by the Open-Meteo API.

## Features 

- Current location weather (via browser geolocation)
- Search weather by city name
- Hourly forecast (next 8 hours)
- 7-day daily forecast
- Unit conversion:
    - Temperature: °C / °F
    - Wind speed: km/h / mph
    - Precipitation: mm / inches
- Search history suggestions (cached)
- Skeleton loading UI
- Fully responsive design 
- Graceful handling of errors & no-result cases

## Tech Stack
- Frontend: React (Hooks, Custom Hooks)
- Styling: Tailwind CSS
- API: Open-Meteo Weather & Geocoding API
- Routing: React Router
- State Management: React useState, useEffect, useRef
- Architecture: Component-based & clean data flow