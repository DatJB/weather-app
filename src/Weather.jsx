import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorScreen from "./ErrorScreen";

const Weather = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [units, setUnits] = useState({
    temp: "C",
    wind: "km/h",
    precip: "mm",
  });

  // Loading
  const [loading, setLoading] = useState(true);
  

  const Item = ({ label, active, onClick }) => (
    <li
      onClick={onClick}
      className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-[#32325A] rounded-xl ml-1 mr-1 mt-1 ${active ? "bg-[#32325A]" : ""}`}
    >
      <span>{label}</span>
      {active && <span><img src="assets/images/icon-checkmark.svg"/></span>}
    </li>
  );

  // Weather API
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("Hanoi");
  const [weather, setWeather] = useState(null);
  const [country, setCountry] = useState("Vietnam");

  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);

    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoRes.json();
    if (!geoData.results) {
      setError(true);
      return;
    }

    const { latitude, longitude } = geoData.results[0];
    setCityName(geoData.results[0].name);
    setCountry(geoData.results[0].country);

    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto`);

    const weatherData = await weatherRes.json();
    setWeather(weatherData);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }; 

  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-[#2F2F4A] rounded-xl ${className}`} />
  );

  const TodaySkeleton = () => (
    <div className="w-170 h-55 rounded-xl animate-pulse bg-[#25253D] flex flex-col items-center justify-center gap-1">
      
      {/* Dots */}
      <div className="flex gap-1.5">
        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>

      {/* Text */}
      <span className="text-sm text-gray-400 mt-2">Loading...</span>
    </div>
  );

  const InfoSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="w-39 h-20" />
      ))}
    </div>
  );

  const DailySkeleton = () => (
    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mt-3">
      {[...Array(7)].map((_, i) => (
        <Skeleton key={i} className="w-23 sm:w-20 h-30" />
      ))}
    </div>
  );

  const HourlySkeleton = () => (
    <div className="space-y-2 mt-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="w-75 h-12 ml-4.5" />
      ))}
    </div>
  );


  // Hourly forecast
  const [openDay, setOpenDay] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const hourlyByDay = {};

  if (weather?.hourly?.time)
  weather.hourly.time.forEach((time, i) => {
    const date = time.split("T")[0];
    if (!hourlyByDay[date]) hourlyByDay[date] = [];
    hourlyByDay[date].push({
      time,
      temp: weather.hourly.temperature_2m[i],
      code: weather.hourly.weather_code[i],
    });
  });

  const days = Object.keys(hourlyByDay);
  let hoursOfSelectedDay = [];

  if (days[selectedDay]) {
    const now = new Date();
    const selectedDate = days[selectedDay];

    hoursOfSelectedDay = hourlyByDay[selectedDate]
      .filter(item => {
        const t = new Date(item.time);
        if (selectedDate === now.toISOString().split("T")[0]) {
          return t >= now;
        }
        return true;
      })
      .slice(0, 8);
  }

  // Date
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    if (!weather?.current?.time) return;

    const date = new Date(weather.current.time);
    const formatDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    setFormattedDate(formatDate);
  }, [weather]);

  // Weather Code 
  const weatherCode = (index) => {
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

  // Unit change
  const convertTemp = (value) => {
    if (value == null) return "__";
    return units.temp === "F"
      ? (value * 9) / 5 + 32
      : value;
  };

  const convertWind = (value) => {
    if (value == null) return "__";
    return units.wind === "mph"
      ? value * 0.621371
      : value;
  };

  const convertPrecip = (value) => {
    if (value == null) return "__";
    return units.precip === "in"
      ? value * 0.0393701
      : value;
  };

  if (error) return <ErrorScreen/>
  return (
    <div className="mb-10">
      <div className="flex place-content-around mt-10 gap-10 sm:gap-110">
        <img src="assets/images/logo.svg" onClick={() => navigate("/")} style={{ cursor: "pointer" }} alt="logo"/>

        <div className="dropdown">
          <button className={`w-27 border-0 bg-[#25253D] h-9 rounded-md items-center hover:border cursor-pointer ${open ? "border-2" : ""}`} onClick={() => setOpen(!open)}>
            <img className="inline mr-2" src="assets/images/icon-units.svg"/>
            <p className="inline text-sm">Units</p>
            <img className="inline ml-2" src="assets/images/icon-dropdown.svg" />
          </button>

          {
            open && (
              <div className="absolute right-0 mt-2 mr-3 sm:mr-40 w-56 bg-[#25253D] rounded-lg shadow-xl text-sm z-999">
              
                <div className="text-[#A8A6BB] px-4 mt-2">Temperature</div>
                <div className="border-b border-white/10 py-1">
                  <Item
                    label="Celsius(°C)"
                    active={units.temp === "C"}
                    onClick={() => setUnits({ ...units, temp: "C" })}
                  />
                  <Item
                    label="Fahrenheit(°F)"
                    active={units.temp === "F"}
                    onClick={() => setUnits({ ...units, temp: "F" })}
                  />
                </div>

                <div className="text-[#A8A6BB] px-4 mt-2">Wind Speed</div>
                <div className="border-b border-white/10 py-1">
                  <Item
                    label="km/h"
                    active={units.wind === "km/h"}
                    onClick={() => setUnits({ ...units, wind: "km/h" })}
                  />
                  <Item
                    label="mph"
                    active={units.wind === "mph"}
                    onClick={() => setUnits({ ...units, wind: "mph" })}
                  />
                </div>

                <div className="text-[#A8A6BB] px-4 mt-2">Precipitation</div>
                <div className="py-1">
                  <Item
                    label="Millimeters(mm)"
                    active={units.precip === "mm"}
                    onClick={() => setUnits({ ...units, precip: "mm" })}
                  />
                  <Item
                    label="Inches(in)"
                    active={units.precip === "in"}
                    onClick={() => setUnits({ ...units, precip: "in" })}
                  />
                </div>
              </div>
            )
          }
        </div>
      </div>

      <h2 className="font-[Bricola] font-semibold text-4xl text-center mt-15">How's the sky looking today?</h2>

      <form className="flex flex-col sm:flex-row items-center place-content-center gap-3 mt-15" onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
      }}>
        <div className="relative">
          <img src="assets/images/icon-search.svg" alt="search"className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70"/>

          <input type="text" value={city} placeholder="Search for a place..." className="w-70 mm:w-100 sm:w-80 h-11 pl-11 pr-4 rounded-lg bg-[#2A2A44] text-white text-sm placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setCity(e.target.value)}/>
        </div>

        <button type="submit" className="w-70 sm:w-25 h-11 px-6 rounded-lg bg-linear-to-r from-indigo-500 to-blue-500 text-white font-medium hover:opacity-90 cursor-pointer">
          Search
        </button>
      </form>

      <div className="flex flex-col sm:flex-row place-content-around gap-10 mt-12 ml-5 sm:ml-40 sm:mr-45">
        <div>

          { loading ? (
            <TodaySkeleton />
          ) : (
          <div className="relative w-170 h-55 rounded-2xl overflow-hidden">
            <div
              className="
                w-90
                sm:w-full h-full
                bg-[url('assets/images/bg-today-small.svg')]
                sm:bg-[url('assets/images/bg-today-large.svg')]
                bg-cover bg-center rounded-r-[17px] sm:rounded-r-0
              "
            ></div>

              <div className="">
                <div className="absolute inset-0 flex flex-col gap-1 sm:flex-row sm:justify-between items-center px-10">
                  <div>
                    <h2 className="text-white text-2xl font-semibold">
                      {cityName}, {country}
                    </h2>
                    <p className="text-white/70 mt-2">
                      {formattedDate}
                    </p>
                </div>

                  
                    <div className="absolute ml-100">
                      <img className="w-24 h-24" src={`assets/images/${weatherCode(0)}`} />
                    </div>

                    <div className="text-white text-6xl font-bold">
                      {
                        weather?.current?.temperature_2m ? convertTemp(weather.current.temperature_2m).toFixed(0) : 20
                      }°
                    </div>
                  
                </div>

              </div>
              
          </div>
          )}

          
          <div className="grid grid-cols-2 sm:grid-cols-4 place-content-around gap-1 sm:gap-2.5">
            <div className={`bg-[#25253F] mt-6 rounded-lg w-39 h-20`}>
                <div className="text-[#A8A6BB] text-sm mt-2.5 ml-3">Feels Like</div>
                <div className="text-xl mt-3 ml-3">
                  {weather?.current?.apparent_temperature && !loading ? `${convertTemp(weather.current.apparent_temperature).toFixed(0)}°` : "__"}
                </div>
            </div>

            <div className={`bg-[#25253F] mt-6 rounded-lg w-39 h-20`}>
                <div className="text-[#A8A6BB] text-sm mt-2.5 ml-3">Humidity</div>
                <div className="text-xl mt-3 ml-3">
                  {weather?.current?.relative_humidity_2m && !loading ? `${weather.current.relative_humidity_2m}%` : "__"}
                </div>
            </div>

            <div className={`bg-[#25253F] mt-6 rounded-lg w-39 h-20`}>
                <div className="text-[#A8A6BB] text-sm mt-2.5 ml-3">Wind</div>
                <div className="text-xl mt-3 ml-3">
                  {weather?.current?.wind_speed_10m && !loading ? `${convertWind(weather.current.wind_speed_10m).toFixed(1)} ${units.wind}` : "__"}
                </div>
            </div>

            <div className={`bg-[#25253F] mt-6 rounded-lg w-39 h-20`}>
                <div className="text-[#A8A6BB] text-sm mt-2.5 ml-3">Precipitatiion</div>
                <div className="text-xl mt-3 ml-3">
                  {weather?.current?.apparent_temperature && !loading ? `${convertPrecip(weather.current.precipitation).toFixed(0)} ${units.precip}` : "__"}
                </div>
            </div>
          </div>
          

          <div className="font-[550] mt-8">
            Daily forecast
          </div>

          { loading ? (
            <DailySkeleton />
          ) : (
          <div className=" text-white grid grid-cols-3 sm:grid-cols-7 place-content-around mt-3 mb-3 sm:-ml-1 sm:-mr-2.5 gap-2">
            {weather?.daily?.time?.slice(0, 7).map((date, index) => (
              <div key={date} className="bg-[#25253F] rounded-lg w-23 sm:w-20 h-30 mb-3">
                <div className="text-center mt-2">
                  {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                </div>

                <div className="w-15 ml-2">
                  <img src={`assets/images/${weatherCode(index)}`} />
                </div>

                <div className="flex place-content-around">
                  <div>{convertTemp(weather.daily.temperature_2m_max[index]).toFixed(0)}°</div>
                  <div>{convertTemp(weather.daily.temperature_2m_min[index]).toFixed(0)}°</div>
                </div>
              </div>
            ))}
          </div>
          )}

        </div>

        <div className="bg-[#25253F] rounded-2xl w-85 h-128 -mt-4 sm:mt-0">
          <div className="flex place-content-between mt-4 ml-6 mr-6">
            <div className="font-[550] mt-1">Hourly forecast</div>
            <button onClick={() => setOpenDay(!openDay)} className={`bg-[#3D3B5E] rounded-md ${loading ? "w-12 animate-pulse" : "w-30" } h-7 flex items-center justify-center gap-2 cursor-pointer hover:border`}>
              {loading ? "-" : new Date(days[selectedDay]).toLocaleDateString("en-US", { weekday: "long" })}
              <img src="assets/images/icon-dropdown.svg" className="ml-1 -mr-1"/>
            </button>

            {openDay && (
              <div className="absolute right-0 mt-9 border-[0.5px] bg-[#25253F] rounded-lg w-40 text-sm z-50 mr-9 sm:mr-50">
                {days.map((day, i) => (
                  <div key={day}
                    onClick={() => {
                      setSelectedDay(i);
                      setOpenDay(false);
                    }}
                    className="px-4 py-2 hover:bg-[#32325A] rounded-2xl mt-px mb-px cursor-pointer"
                  >
                    {new Date(day).toLocaleDateString("en-US", { weekday: "long" })}
                  </div>
                ))}
              </div>
            )}
          </div>

          { loading ? (
            <HourlySkeleton />
          ) : (
          <div className="mt-4 space-y-2">
            {hoursOfSelectedDay.map((hour, i) => (
              
              <div key={i} className="flex items-center justify-between bg-[#30304A] rounded-lg w-75 ml-4.5 h-12 px-4 py-2">
                <div className="flex items-center gap-3">
                  <img
                    src={`assets/images/${weatherCode(hour.code)}`}
                    className="w-6 h-6"
                  />

                  <span>
                    {new Date(hour.time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                    })}
                  </span>
                </div>

                <span>{convertTemp(hour.temp).toFixed(0)}°</span>
              </div>
            ))}
          </div>
          )}

        </div>

      </div>

      
    </div>

  )
};

export default Weather;