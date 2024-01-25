function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windspeedElement = document.querySelector("#windspeed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
let weatherEmojiElement = document.querySelector("#weather-emoji");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windspeedElement.innerHTML = `${response.data.wind.speed} mph`;
timeElement.innerHTML = formatDate(date);
weatherEmojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;


getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date. getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday",
"Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes<10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes},`;

}

function searchCity (city) {
    let apiKey = "d39d6443520afb97te34a49a61faf9o3";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
searchCity(searchInput.value);
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}



function getForecast(city) {
  let apiKey = "d39d6443520afb97te34a49a61faf9o3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

 
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5 ) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-day">
<div class="weather-forecast-date">${formatDay(day.time)}</div>
<div class="weather-forecast-icon">
<img src= "${day.condition.icon_url}" class="weather-forecast-icon" />
</div>
<div class="weather-forecast-temperatures">
<div class="weather-forecast-temperature">
<strong>${Math.round(day.temperature.maximum)}°</strong>
</div>
<div class="weather-forecast-temperature">${Math.round(
        day.temperature.minimum
      )}°</div>
</div>
</div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Charleston");




