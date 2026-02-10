import { useRef, useState } from "react";

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const cache = useRef([]);

  const fetchWeather = async (city) => {
    if (!city) return;
    try {
        setNotFound(false);
        setError(false);
        setLoading(true);

        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`); // convert addresses to latitude and longtitude
        const geoData = await geoRes.json();

        if (!geoData.results) {
            setNotFound(true);
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        cache.current.unshift(city); // add city to cache
        cache.current = [city, ...cache.current.filter(c => c !== city)].slice(0, 4); // remove duplicate city

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto`); // weather api

        const weatherData = await weatherRes.json();

        return {
            weather: weatherData,
            location: { name, country }
        };
    }
    catch (e) {
        setError(true);
    }
    finally {
        setLoading(false);
    }
  }; 

  return {
    weather, loading, error, setError, notFound, cache, fetchWeather,
  };
};

export default useWeather;
