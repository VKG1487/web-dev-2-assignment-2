const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const historyList = document.getElementById("historyList");
const loader = document.getElementById("loader");
const clearHistoryBtn = document.getElementById("clearHistory");

console.log("Script Start");

// Load history on page load
window.addEventListener("DOMContentLoaded", loadHistory);

// Search Button Click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  fetchWeather(city);
});

// Async Function
async function fetchWeather(city) {
  console.log("Fetching weather for:", city);

  try {
    loader.style.display = "block";
    weatherResult.innerHTML = "";

    console.log("Before fetch call");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    console.log("After fetch call");

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    displayWeather(data);
    saveToLocalStorage(city);

  } catch (error) {
    console.error("Error:", error);
    weatherResult.innerHTML = "⚠️ " + error.message;
  } finally {
    loader.style.display = "none";
  }
}

// Display Weather
function displayWeather(data) {
  weatherResult.innerHTML = `
    City: ${data.name} <br>
    Temperature: ${data.main.temp} °C <br>
    Condition: ${data.weather[0].description}
  `;
}

// Save History
function saveToLocalStorage(city) {
  let history = JSON.parse(localStorage.getItem("cities")) || [];

  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("cities", JSON.stringify(history));
  }

  loadHistory();
}

// Load History
function loadHistory() {
  historyList.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("cities")) || [];

  history.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => fetchWeather(city));
    historyList.appendChild(li);
  });
}

// Clear History
clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("cities");
  loadHistory();
});

console.log("Script End");