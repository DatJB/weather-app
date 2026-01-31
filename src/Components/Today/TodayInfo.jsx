import TodaySkeleton from "../Today/TodaySkeleton";
import useUnitConvert from "../../hooks/useUnitConvert";
import { useEffect, useState } from "react";
import WeatherCode from "../../utils/WeatherCode";

const TodayInfo = ({ units, loading, weather, cityName, country }) => {
    const { convertTemp, convertWind, convertPrecip } = useUnitConvert(units);

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

    return (
        <section>
            { loading ? (
            <TodaySkeleton />
          ) : (
          <div className="relative w-170 h-55 rounded-2xl overflow-hidden">
            <div
              className="
                w-90
                sm:w-full h-full
                bg-[url('./assets/images/bg-today-small.svg')]
                sm:bg-[url('./assets/images/bg-today-large.svg')]
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
                      <img className="w-24 h-24" src={`assets/images/${WeatherCode(0, weather)}`} />
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
                  {weather?.current?.apparent_temperature && !loading ? `${convertPrecip(weather.current.precipitation)} ${units.precip}` : "__"}
                </div>
            </div>
          </div>
        </section>
    )
};

export default TodayInfo;