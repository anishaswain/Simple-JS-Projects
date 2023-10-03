import("./tailwind.config").catch((error) => {
  console.log("Failed to load tailwind.config");
  console.log(error);
});
import dayjs from "dayjs";

// Reactive state
const _state = {
  location: null,
  latlng: {
    lat: null,
    lng: null,
  },
  weather: null,
};

const handler = {
  set(target, property, value) {
    target[property] = value;
    // console.log(
    //   `Property '${property}' set to: ${JSON.stringify(value, null, 2)}`
    // );
    const locationInfoEl = document.getElementById("location-info");
    const weatherEl = document.getElementById("weather");
    if (!value) return;

    switch (property) {
      case "location":
        locationInfoEl.textContent = value;
        return;
      case "latlng":
        getWeather();
        return;
      case "weather":
        try {
          _setWeatherInfo();
        } catch (error) {
          weatherEl.classList.add("hidden");
          console.log(error);
        }
        return;
      default:
        break;
    }
  },
};
const state = new Proxy(_state, handler);

const setFormEventListener = () => {
  const formEl = document.querySelector("form#weather-form");

  formEl.addEventListener("submit", onReverseGeocoding, true);
};

const onReverseGeocoding = async (event) => {
  event.preventDefault();

  const weatherQueryEl = document.getElementById("weather-query");
  const weatherEl = document.getElementById("weather");
  weatherEl.classList.add("hidden");

  try {
    const _params = {
      q: encodeURIComponent(weatherQueryEl.value),
      key: process.env.OPENGATE_API_KEY,
    };
    const params = Object.keys(_params)
      .map((key) => key + "=" + _params[key])
      .join("&");
    const url = `https://api.opencagedata.com/geocode/v1/json?${params}`;
    const response = await fetch(url);
    const data = await response.json();

    const [firstEl, ...rest] = data.results;
    const { formatted, geometry } = firstEl;
    state.location = formatted;
    state.latlng = geometry;
  } catch (error) {
    console.log("Failed to get location from lat,lng");
    state.location = null;
    state.latlng = null;
  }
};

const getWeather = async () => {
  if (!state.latlng.lat) return;
  try {
    const _params = {
      lat: state.latlng.lat,
      lon: state.latlng.lng,
      units: "metric",
      appid: process.env.OPENWEATHER_API_KEY,
    };
    const params = Object.keys(_params)
      .map((key) => key + "=" + _params[key])
      .join("&");
    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
    const response = await fetch(url);
    const data = await response.json();
    state.weather = {
      weather: { ...data.weather[0] },
      main: data.main,
      visibility: data.visibility,
      wind: data.wind,
      time: {
        sunrise: data.sys.sunrise * 1000,
        sunset: data.sys.sunset * 1000,
      },
    };
  } catch (error) {
    console.log("Failed to fetch weather info");
    state.weather = null;
  }
};

const getCurrentLocation = () => {
  const locationInfo = document.getElementById("location-info");
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const latlng = { lat: latitude, lng: longitude };
        state.latlng = latlng;

        // await _reverseGeocoding(latitude, longitude);
      },
      function (error) {
        locationInfo.textContent = error.message;
      }
    );
  } else {
    locationInfo.textContent = "Geolocation is not supported in your browser.";
  }
};

const _setWeatherInfo = () => {
  const weatherEl = document.getElementById("weather");
  const weatherIcon = document.getElementById("weather-icon");
  const weatherTemperature = document.getElementById("weather-temperature");
  const weatherDescription = document.getElementById("weather-description");
  const weatherWindEl = document.getElementById("weather-wind");
  const weatherHumidityEl = document.getElementById("weather-humidity");
  const weatherPressureEl = document.getElementById("weather-pressure");
  const weatherVisibilityEl = document.getElementById("weather-visibility");
  const weatherSunriseEl = document.getElementById("weather-sunrise");
  const weatherSunsetEl = document.getElementById("weather-sunset");

  const value = state.weather || null;

  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${value.weather.icon || "02d"}@2x.png`
  );
  weatherTemperature.innerHTML = `${String(
    Math.round(value.main.temp)
  )}&#8451;`;
  weatherDescription.textContent = `${String(
    value.weather.description || "-"
  )}`;
  weatherWindEl.textContent = `${String(value.wind.speed || 0)} km/h`;
  weatherHumidityEl.textContent = `${String(value.main.humidity || 0)} %`;
  weatherPressureEl.textContent = `${String(value.main.pressure || 0)} hPa`;
  weatherVisibilityEl.textContent = `${String(
    value.visibility / 1000 || 0
  )} km`;
  weatherSunriseEl.textContent = dayjs(value.time.sunrise || Date.now()).format(
    "HH:mm"
  );
  weatherSunsetEl.textContent = dayjs(value.time.sunset || Date.now()).format(
    "HH:mm"
  );

  weatherEl.classList.remove("hidden");
};

setFormEventListener();
getCurrentLocation();
