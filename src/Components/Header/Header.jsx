import { useState } from "react";
import Item from "./Item";

const Header = ({ units, setUnits }) => {
  const [open, setOpen] = useState(false);

    return (
        <section className="mb-10">
            <div className="flex place-content-around mt-10 gap-10 sm:gap-110">
            <img src="assets/images/logo.svg" onClick={() => navigate("/weather-app")} style={{ cursor: "pointer" }} alt="logo"/>

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
        </section>
    )
};

export default Header;