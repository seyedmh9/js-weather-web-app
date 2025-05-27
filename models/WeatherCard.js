class WeatherCard {
  constructor(weatherContainer, data) {
    this.weatherContainer = weatherContainer;
    this.data = data;
  }

  showCard() {
    const weatherData = this.data;
    const cardJSX = `<h3 class="waether-titel">${weatherData.cityName} | ${
      weatherData.country
    }</h3>
    <div class="weather-info">
        <div class="weather-info_top">
            <img src="https://openweathermap.org/img/w/${
              weatherData.icon
            }.png" alt="weather icon">
            <p class="weather-status">${weatherData.status}</p>
            <p class="weather-temp">${Math.floor(weatherData.temp)} °C</p>
        </div>
        <div class="weather-info_bottom">
            <p class="weather-humidity">Humidity: <span>${
              weatherData.humidity
            } %</span></p>
            <p class="weather-wind_speed">Wind Speed: <span>${
              weatherData.windSpeed
            } m/s</span></p>
          </div>
    </div>`;
    this.weatherContainer.innerHTML = cardJSX;
    this.weatherContainer.style.display = "flex";
  }
}

export { WeatherCard };
