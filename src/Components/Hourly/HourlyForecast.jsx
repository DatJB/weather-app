import { useState } from "react";
import HourlySkeleton from "./HourlySkeleton";
import WeatherCode from "../../utils/WeatherCode";
import useUnitConvert from "../../hooks/useUnitConvert";

const HourlyForecast = ({ weather, loading, units }) => {
    const [openDay, setOpenDay] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const { convertTemp } = useUnitConvert(units);

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

    return (
        <section className="bg-[#25253F] rounded-2xl w-85 h-128 sm:mt-0">
            <div className="flex place-content-between ml-6 mr-6">
                <div className="font-[DM-SemiBold] mt-4.5">Hourly forecast</div>
                <button onClick={() => setOpenDay(!openDay)} className={`bg-[#3D3B5E] mt-4 rounded-md ${loading ? "w-12 animate-pulse" : "w-30" } h-7 flex items-center justify-center gap-2 cursor-pointer hover:border`}>
                {loading ? "-" : new Date(days[selectedDay]).toLocaleDateString("en-US", { weekday: "long" })}
                <img src="assets/images/icon-dropdown.svg" className="ml-1 -mr-1"/>
                </button>

                {openDay && (
                <div className="absolute right-0 mt-13 border-[0.5px] bg-[#25253F] rounded-lg w-40 text-sm z-50 mr-9 sm:mr-50">
                    {days.map((day, i) => (
                    <div key={day}
                        onClick={() => {
                        setSelectedDay(i);
                        setOpenDay(false);
                        }}
                        className={`px-4 py-2 hover:bg-[#32325A] rounded-2xl mt-px mb-px cursor-pointer ${i === selectedDay ? "bg-[#32325A]" : ""}`}
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
                        src={`assets/images/${WeatherCode(hour.code, weather)}`}
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

            
        </section>
    )
};

export default HourlyForecast;