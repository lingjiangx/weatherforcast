let apiKey = "0c5f59b841b794d99933757d256233b1";
let temperature = null;

function showWeatherDetails(response) {
  let temperature = Math.round(response.data.main.temp);

  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let visibility = response.data.visibility;
  let description = response.data.weather[0].description;
  let currentTime = new Date();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDay = weekdays[currentTime.getDay()];

  let temperatureElement = document.getElementById("number");
  let humidityElement = document.getElementById("humidity");
  let windElement = document.getElementById("wind");
  let visibilityElement = document.getElementById("visibility");
  let descriptionElement = document.getElementById("description");
  let currentDayElement = document.getElementById("current-day");
  let iconElement = document.getElementById("icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
  visibilityElement.innerHTML = `${visibility}`;
  descriptionElement.innerHTML = `${description}`;
  currentDayElement.innerHTML = `${currentDay}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  return temperature;
}

function showCityName(response) {
  let cityName = response.data.name;
  let cityNameElement = document.getElementById("city");
  cityNameElement.innerHTML = cityName;
}

// show location

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0c5f59b841b794d99933757d256233b1&units=metric`;

  axios
    .get(url)
    .then((response) => {
      showCityName(response);
      showWeatherDetails(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButtonElement = document.getElementById("current-button");
currentButtonElement.addEventListener("click", getCurrentPosition);

// type a city-search button

function showCityInput(event) {
  event.preventDefault();
  let input = document.getElementById("cityInput");
  let inputValue = input.value;
  let cityElement = document.getElementById("city");
  cityElement.innerHTML = `${inputValue}`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=0c5f59b841b794d99933757d256233b1&units=metric`;
  axios
    .get(url)
    .then((response) => {
      showWeatherDetails(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

let searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", showCityInput);

// degree unit conversion
function showFahrenheit(event) {
  event.preventDefault();
  let response;
  showWeatherDetails(response);
  let fahrenheitElement = document.getElementById("number");
  fahrenheitElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
