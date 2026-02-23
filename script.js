//https://api.openweathermap.org/data/2.5/weather?q=kharar&apiid=203f8a4bcc957a869ee34933d843ab48

const API_Key = "5b38ca2c61e412e406a771e81ac0fdd5"
const form = document.querySelector("#weather_form")
const city = document.querySelector("#city")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const data = city.value

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API_Key}`
    )

    const weatherData = await response.json()

    // console.log("City:", weatherData.name)
    // console.log("Temperature:", (weatherData.main.temp - 273).toFixed(1), "C")
    // console.log("Weather:", weatherData.weather[0].main)
    // console.log("Humidity:", weatherData.main.humidity)
    // console.log("Wind:", weatherData.wind.speed, "m/s")
    weatherInfo.innerHTML`
    <p>City: ${weatherData.name}</p>
    <p>Temprature: ${(weatherData.main.temp-273).toFixed(1)} C</p>
    <p>Weather: ${weatherData.weather[0].main}</p>
    <p>Humidity: ${weatherData.main.humidity}</p>
    <p>Wind: ${weatherData.weatherData.wind.speed} m/s</p>
    `
})

