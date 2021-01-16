import SunCalc from "suncalc";
import isWithinInterval from "date-fns/isWithinInterval";
import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import snakeToSentenceCase from "./snakeToSentenceCase";
import camelToSentenceCase from "./camelToSentenceCase";

const dayNightWeatherCodes = ["clear", "mostly_clear", "partly_cloudy"];
const weatherKeys = [
  "temp",
  "feels_like",
  "humidity",
  "precipitation",
  "precipitation_probability"
];

const updateWeatherCode = ({
  weatherCode,
  observationTime,
  sunrise,
  sunset
}) => {
  const isDayOrNight = isWithinInterval(observationTime, {
    start: sunrise,
    end: sunset
  })
    ? "_day"
    : "_night";

  return weatherCode + isDayOrNight;
};

const updateValue = item =>
  `${Math.round(item?.value)}${item?.units === "C" ? "°" : ""}${item?.units}`;

const updateUnits = (object, key) => {
  if (Array.isArray(object[key])) {
    object[key] = object[key].map(item => {
      if (item.min) {
        item.min = updateValue(item.min);
      }
      if (item.max) {
        item.max = updateValue(item.max);
      }
      return item;
    });
  } else {
    object[key] = updateValue(object[key]);
  }
};

const formatObservationTime = (observationTime, kind) =>
  kind === "day"
    ? format(observationTime, "EEE dd MMM")
    : format(observationTime, "h:mm a").toLowerCase();

const formatMoonPhase = phase => {
  switch (phase) {
    case phase === 0:
      return "newMoon";
    case phase > 0 && phase < 0.25:
      return "waxingCrescent";
    case phase === 0.25:
      return "firstQuarter";
    case phase > 0.25 && phase < 0.5:
      return "waxingGibbous";
    case phase === 0.5:
      return "fullMoon";
    case phase > 0.5 && phase < 0.75:
      return "waningGibbous";
    case phase === 0.75:
      return "lastQuarter";
    default:
      return "waningCrescent";
  }
};

const updateObjectKey = (object, latLong, kind) => {
  const {
    observation_time: { value },
    weather_code: { value: weatherCode }
  } = object;
  const { lat, lon } = latLong;
  const observationTime = new Date(value);
  const { sunrise, sunset } = SunCalc.getTimes(observationTime, lat, lon);
  const { phase } = SunCalc.getMoonIllumination(observationTime);
  const formattedMoonPhase = formatMoonPhase(phase);
  const moonPhase = {
    phase: formattedMoonPhase,
    phaseTitle: camelToSentenceCase(formattedMoonPhase)
  };

  weatherKeys.map(key => {
    if (object[key]) {
      updateUnits(object, key);
    }
  });

  object.weather_code.title = snakeToSentenceCase(weatherCode);

  if (dayNightWeatherCodes.includes(weatherCode)) {
    object.weather_code.value = updateWeatherCode({
      weatherCode,
      observationTime,
      sunrise,
      sunset
    });
  }

  object.sunCalc = {
    sunrise: formatObservationTime(new Date(sunrise), "hour"),
    sunset: formatObservationTime(new Date(sunset), "hour"),
    moonPhase
  };

  object.observation_time.string = formatObservationTime(observationTime, kind);

  return object;
};

const updateClimacellCode = data => {
  const { latLong, hourly } = data;
  const now = new Date(new Date().toISOString());

  const filteredHourly = hourly.filter(hour => {
    const {
      observation_time: { value }
    } = hour;
    return isAfter(new Date(value), now);
  });

  data.realTime = updateObjectKey(data.realTime, latLong, "day");
  data.daily = data.daily
    .map(day => updateObjectKey(day, latLong, "day"))
    .slice(0, 6);
  data.hourly = filteredHourly
    .map(hour => updateObjectKey(hour, latLong, "hour"))
    .slice(0, 6);

  return data;
};

export default updateClimacellCode;
