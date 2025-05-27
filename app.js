import { getWeatherData } from "./utils/httpReq.js";
import { WeatherCard } from "./models/WeatherCard.js";
import { ForecastCard } from "./models/ForecastCard.js";
import { showModal, offModal } from "./utils/modal.js";

const searchBtn = document.querySelector(".searchBtn");
const citynameInput = document.querySelector(".name-input");
const locationImg = document.querySelector(".location-img");
const weatherCon = document.querySelector(".waether-container");
const forcastsCon = document.querySelector(".forcasts-container");
const globalLoader = document.querySelector(".global-loader-content");
const modalClose = document.querySelector(".modal-content").firstChild;
const modalCon = document.querySelector(".modal-container");

const searchHndle = async (event) => {
  const cityName = citynameInput.value;
  if (cityName.length > 1) {
    weatherCon.innerHTML = "";
    forcastsCon.innerHTML = "";
    weatherCon.className = "loader";
    const currentData = await getWeatherData("current", citynameInput.value);
    if (!currentData) {
      showModal("error!!");
      weatherCon.className = "";
      return;
    }
    const forecastData = await getWeatherData("forecast", citynameInput.value);
    weatherCon.className = "waether-container moveFromTop";
    const WeatherCardInctans = new WeatherCard(weatherCon, currentData);
    const ForecastCardInctans = new ForecastCard(forcastsCon, forecastData);
    WeatherCardInctans.showCard();
    ForecastCardInctans.showCards();
  }
};

const locationHndle = (event) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getData(lat, lon);
      },
      (error) => {
        console.error("خطا در دریافت موقعیت:", error.message);
        alert("لطفاً دسترسی به موقعیت مکانی را فعال کنید.");
      }
    );
  }

  const getData = async (lat, lon) => {
    const data = { lat, lon };
    console.log(data);
    weatherCon.innerHTML = "";
    forcastsCon.innerHTML = "";
    weatherCon.style.display = "none";
    weatherCon.className = "loader";
    const currentData = await getWeatherData("current", data);
    if (!currentData) {
      showModal("error!!");
    }
    const forecastData = await getWeatherData("forecast", data);
    weatherCon.className = "waether-container moveFromTop";
    const WeatherCardInctans = new WeatherCard(weatherCon, currentData);
    const ForecastCardInctans = new ForecastCard(forcastsCon, forecastData);
    WeatherCardInctans.showCard();
    ForecastCardInctans.showCards();
  };
};

const swiperHndle = (event) => {
  const width = event.target.innerWidth;
  if (width < 572) {
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: true,
      effect: "cube",
      cubeEffect: {
        slideShadows: false,
      },

      autoplay: {
        delay: 4000,
      },

      pagination: {
        el: ".swiper-pagination",
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
};

window.addEventListener("resize", swiperHndle);
searchBtn.addEventListener("click", searchHndle);
locationImg.addEventListener("click", locationHndle);
modalClose.addEventListener("click", offModal);
modalCon.addEventListener("click", offModal);
document.addEventListener("DOMContentLoaded", () => {
  globalLoader.style.display = "inline";
  globalLoader.style.animation = "loaderAnim 2s linear";
  setTimeout(() => {
    globalLoader.style.display = "none";
    globalLoader.parentElement.style.opacity = "0";
  }, 2000);
  setTimeout(() => {
    globalLoader.parentElement.style.display = "none";
  }, 4000);
});
