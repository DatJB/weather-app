import { Routes, Route } from "react-router-dom";
import Weather from "./Weather";
import useWeather from "./hooks/useWeather";
import Header from "./Components/Header/Header";
import SearchBar from "./Components/Search/SearchBar";
import NotFound from "./Components/common/NotFound";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!navigator.geolocation) {
      handleSearch("Hanoi");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await fetch(`
          https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);

        const data = await res.json(); 
        
        const city = data.address.city || data.address.town || data.address.village;

        if (city) {
          handleSearch(city);
        } else {
          handleSearch("Hanoi");
        }
      },

      // Refuse
      () => {
        handleSearch("Hanoi");
      }
    );
  }, []);


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
};

export default App;