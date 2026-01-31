const WeatherCode = (index, weather) => {
    if (!weather?.daily?.weather_code) return "icon-sunny.webp";

    const code = weather.daily.weather_code[index];
    if (code === 0) return "icon-sunny.webp";
    if (code <= 3) return "icon-partly-cloudy.webp";
    if (code <= 48) return "icon-fog.webp";
    if (code <= 57) return "icon-drizzle.webp";
    if (code <= 67) return "icon-rain.webp";
    if (code <= 77) return "icon-snow.webp";
    if (code >= 95) return "icon-storm.webp";
    return "icon-sunny.webp";
};

export default WeatherCode;