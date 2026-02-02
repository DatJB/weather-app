import { Routes, Route } from "react-router-dom";
import Weather from "./Weather";
import useWeather from "./hooks/useWeather";
import Header from "./Components/Header/Header";
import SearchBar from "./Components/Search/SearchBar";
import Today from "./Components/Today/TodayInfo";
import Daily from "./Components/Daily/DailyForecast";
import Hourly from "./Components/Hourly/HourlyForecast";
import NotFound from "./Components/common/NotFound";
import { useState } from "react";
import ErrorScreen from "./Components/common/ErrorScreen";
import TodayInfo from "./Components/Today/TodayInfo";
import DailyForecast from "./Components/Daily/DailyForecast";
import HourlyForecast from "./Components/Hourly/HourlyForecast";

const App = () => {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState({});
  
  const [units, setUnits] = useState({
    temp: "C",
    wind: "km/h",
    precip: "mm",
  });

  const { loading, error, notFound, cache, fetchWeather } = useWeather();

  const handleSearch = async (city) => {
    const result = await fetchWeather(city);
    if (!result) return;

    setWeather(result.weather);
    setCityName(result.location.name);
    setCountry(result.location.country);
  };

  return (
    <main>
      <Header units={units} setUnits={setUnits}/>

      { error ? < ErrorScreen /> : (
        <>
          <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} cache={cache} onSearch={handleSearch} />
        

          { notFound ? < NotFound /> : (
            <div className="flex flex-col md:flex-row place-content-center gap-10 mt-12 ml-5  mb-10">
              <div>
                <TodayInfo units={units} loading={loading} weather={weather} cityName={cityName} country={country} />
                <DailyForecast weather={weather} loading={loading} units={units} />
              </div>

              <div className="">
                <HourlyForecast weather={weather} loading={loading} units={units} />
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default App;