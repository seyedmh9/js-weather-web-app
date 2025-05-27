class ForecastCard {
  constructor(cartContainer, forecastsData) {
    this.cartContainer = cartContainer;
    this.forecastsData = forecastsData;
  }

  showCards() {
    this.cartContainer.innerHTML = "";
    this.forecastsData.forEach((data) => {
      const cardJSX = `
    <div class="swiper-slide forecast-container">
      <img src="https://openweathermap.org/img/w/${data.icon}.png" alt="forcast icon" class="forecast-icon">
      <p class="forecast-date">${data.date}</p>
      <div class="forecast-info">
        <p class="forecast-temp">${data.temp} °C</p>
        <p class="forecast-status">${data.status}</p>
      </div>
    </div>`;
      this.cartContainer.innerHTML += cardJSX;
    });
  }
}

export { ForecastCard };
