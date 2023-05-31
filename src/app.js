let apiKey = "0c5f59b841b794d99933757d256233b1";

function showWeatherDetails(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let visibility = response.data.visibility;
  let description = response.data.weather[0].description;
  let currentTime = new Date();

  let temperatureElement = document.getElementById("number");
  let humidityElement = document.getElementById("humidity");
  let windElement = document.getElementById("wind");
  let visibilityElement = document.getElementById("visibility");
  let descriptionElement = document.getElementById("description");
  let currentTimeElement = document.getElementById("current-time");

  temperatureElement.innerHTML = `${temperature}`;
  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
  visibilityElement.innerHTML = `${visibility}`;
  descriptionElement.innerHTML = `${description}`;
  currentTimeElement.innerHTML = `${currentTime}`;
}

// show location

function showPosition(position) {
  let = latitude = position.coords.latitude;
  let = longitude = position.coords.longitude;
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

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showCityName(response) {
  let cityName = response.data.name;
  let cityNameElement = document.getElementById("city");
  cityNameElement.innerHTML = cityName;
}

let currentButton = document.getElementById("current-button");
currentButton.addEventListener("click", getCurrentPosition);

// type a city-search button

function showCityInput() {
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
