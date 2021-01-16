import updateClimacellCode from "./updateClimacellCode";

const handleForecastData = ({ object, kind, method, options }) => {
  const forecast = object[kind][method]
    .filter(store => store.name === options.storeName)
    .map(store => updateClimacellCode(store))
    .pop();

  return { forecast };
};

export default handleForecastData;
