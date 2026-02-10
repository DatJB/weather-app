import useUnitConvert from "../../hooks/useUnitConvert";
import DailySkeleton from "./DailySkeleton";
import WeatherCode from "../../utils/WeatherCode";

const DailyForecast = ({ weather, loading, units }) => {
    const { convertTemp } = useUnitConvert(units);

    return (
        <section>
            <div className="font-[DM-SemiBold] mt-8">
                Daily forecast
            </div>

            { loading ? (
                <DailySkeleton />
            ) : (
            <div className=" text-white grid grid-cols-3 sm:grid-cols-7 place-content-around mt-3 mb-3 sm:-ml-1 sm:-mr-2.5 sm:gap-1 md:gap-2">
                {weather?.daily?.time?.slice(0, 7).map((date, index) => (
                <div key={date} className="bg-[#25253F] rounded-lg w-23 sm:w-20 h-30 mb-3">
                    <div className="text-center mt-2">
                    {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                    </div>

                    <div className="w-15 sm:ml-2 ml-3.5">
                    <img src={`assets/images/${WeatherCode(index, weather)}`} />
                    </div>

                    <div className="flex place-content-around">
                    <div>{convertTemp(weather.daily.temperature_2m_max[index]).toFixed(0)}°</div>
                    <div>{convertTemp(weather.daily.temperature_2m_min[index]).toFixed(0)}°</div>
                    </div>
                </div>
                ))}
            </div>
            )}
        </section>
    )
};

export default DailyForecast;