function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windspeedElement = document.querySelector("#windspeed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windspeedElement.innerHTML = `${response.data.wind.speed} mph`;
timeElement.innerHTML = formatDate(date);
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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Charleston");