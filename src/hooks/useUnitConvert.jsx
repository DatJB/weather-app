const useUnitConvert = (units) => {
  const convertTemp = (value) => {
    if (value == null) return "";
    return units.temp === "C"
      ? Math.round(value)
      : Math.round(value * 9 / 5 + 32);
  };

  const convertWind = (value) => {
    if (value == null) return "";
    return units.wind === "km/h"
      ? Math.round(value)
      : Math.round(value / 1.609);
  };

  const convertPrecip = (value) => {
    if (value == null) return "";
    return units.precip === "mm"
      ? value.toFixed(1)
      : (value / 25.4).toFixed(2);
  };

  return { convertTemp, convertWind, convertPrecip };
};

export default useUnitConvert;
