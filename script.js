const apiKey = "34c595ed1fa041d461df334188113343"; // Your API key
const weatherDataDiv = document.getElementById("weatherData");
const cityNameEl = document.getElementById("cityName");
const descriptionEl = document.getElementById("description");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");

const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");
const currentLocationBtn = document.getElementById("currentLocationBtn");

// Fetch weather data by city name
const fetchWeatherByCity = async (city) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert("City not found! Please try again.");
        }
    } catch (error) {
        alert("Error fetching weather data.");
    }
};

// Fetch weather data by current location
const fetchWeatherByCoords = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert("Unable to fetch weather for your location.");
        }
    } catch (error) {
        alert("Error fetching weather data.");
    }
};

// Display weather data on the page
const displayWeather = (data) => {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    cityNameEl.textContent = name;
    descriptionEl.textContent = `Weather: ${description}`;
    temperatureEl.textContent = `Temperature: ${temp.toFixed(1)}°C`;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    windSpeedEl.textContent = `Wind Speed: ${speed} m/s`;

    weatherDataDiv.style.display = "block";
};

// Event listeners
searchBtn.addEventListener("click", () => {
    const city = locationInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    } else {
        alert("Please enter a city name.");
    }
});

currentLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            () => {
                alert("Unable to retrieve your location. Please enter your city name. For a better experience, use Microsoft Edge or Chrome.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});
