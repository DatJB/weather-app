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

  const { loading, error, setError, notFound, cache, fetchWeather } = useWeather();

  // Search weather by city
  const handleSearch = async (city) => {
    const result = await fetchWeather(city);
    if (!result) return;

    setWeather(result.weather);
    setCityName(result.location.name);
    setCountry(result.location.country);
  };

  // Fetch initial weather
  useEffect(() => {
    if (!navigator.geolocation) {
      handleSearch("Hanoi");
      return;
    }

    // Get current position
    navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            const res = await fetch(`
              https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);

            const data = await res.json(); 
            
            let city = data.address.state || data.address.province || data.address.region;

            city = city.replace(/\s*Province\s*$/i, ""); // remove 'Province' at the end

            if (city) {
              handleSearch(city);
            } else {
              handleSearch("Hanoi");
            }
          } 
          catch(exception) {
            setError(true);
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
            <div className="flex flex-col md:flex-row place-content-center gap-10 mt-12 ml-5 mb-10 justify-center">
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