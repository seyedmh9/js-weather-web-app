const currentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=46ecc34d90cba5d2c7ebdfae341e05dc";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "46ecc34d90cba5d2c7ebdfae341e05dc";
const hourlyForecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=46ecc34d90cba5d2c7ebdfae341e05dc";

const getWeatherData = async (type, data) => {
  let url;
  switch (type) {
    case "current":
      typeof data == "string"
        ? (url = `${BASE_URL}weather?units=metric&appid=${API_KEY}&q=${data}`)
        : (url = `${BASE_URL}weather?units=metric&appid=${API_KEY}&lat=${data.lat}&lon=${data.lon}`);
      break;

    default:
      typeof data == "string"
        ? (url = `${BASE_URL}forecast?units=metric&appid=${API_KEY}&q=${data}`)
        : (url = `${BASE_URL}forecast?units=metric&appid=${API_KEY}&lat=${data.lat}&lon=${data.lon}`);
      break;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`server error ${res.status}`);
    }
    const json = await res.json();
    let finalData;
    type == "current"
      ? (finalData = formatCurrentData(json))
      : (finalData = formatForecastData(json));
    return finalData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const formatCurrentData = (data) => {
  const {
    name: cityName,
    sys: { country },
    weather: [{ icon, main: status }],
    main: { temp, humidity },
    wind: { speed: windSpeed },
  } = data;
  const newdata = {
    cityName,
    country,
    icon,
    status,
    temp: Math.round(temp),
    humidity,
    windSpeed,
  };
  return newdata;
};

const formatForecastData = (data) => {
  const dataList = data.list;
  const daysOfWeekForecast = dataList
    .filter((data) => data.dt_txt.endsWith("12:00:00"))
    .map((data) => ({
      date: getWeekDay(data.dt),
      temp: Math.round(data.main.temp),
      status: data.weather[0].main,
      icon: data.weather[0].icon,
    }));
  return daysOfWeekForecast;
};

function getWeekDay(dt) {
  dt = dt * 1000;
  const date = new Date(dt);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

export { getWeatherData };
