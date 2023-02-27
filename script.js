//const weatherBody = document.getElementById('weather-body');
const todaysWeather = document.getElementById('todays-weather');
//todays temperature
const forecast = document.getElementById('forecast');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const condition = document.getElementById('condition')


//fetches city temp condition sunrise sunset wind

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=657719ffb9094260c77c12077e523aa2')
   .then((response) => {
    return response.json();
   })
   .then((json) => {
    city.innerHTML = `<p>${json.name}</p>`;
    temperature.innerHTML = `<p>${Math.round(json.main.temp * 10) / 10}°C</p`;
    condition.innerHTML = `<p>${json.weather[0].description}</p>`;
    wind.innerHTML = `<p>Wind speed ${json.wind.speed} m/s</p>`;

    const setSunrise = json.sys.sunrise;
    const sunriseTime = new Date(setSunrise * 1000);
    const sunriseHour = sunriseTime.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })

    sunrise.innerHTML =`<p>Sunrise: ${sunriseHour}</p>`

    const setSunset = json.sys.sunset;
    const sunsetTime = new Date(setSunset * 1000);
    const sunsetHour = sunsetTime.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
})

        sunset.innerHTML =`<p>Sunset: ${sunsetHour}</p>`
    })
     


 //5 day forecast

 const createFiveDayForecast = (filteredForecast) => {
    filteredForecast.forEach((day) => {
        const days = new Date(day.dt * 1000).toLocaleDateString("en-EN", {
            weekday: "long",
        });
        const forecastTemp = Math.round(day.main.temp * 10) / 10;
        createFiveDaysInnerHTML(days, forecastTemp);
    });
};

 // Creates innerHTML for each day in the forecast.
 const createFiveDaysInnerHTML = (days, forecastTemp) => {
    forecast.innerHTML += `
      <section class="day"> 
        <span class="forecast-day">${days}</span> 
        <span class="forecast-temp">${forecastTemp} °C </span> 
      </section>
    `;
  };
  
  // Fetches the forecast data
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=bcc357d81ce23673e3a8e92322d840f2"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const fiveDayForecast = json.list.filter((day) =>
        day.dt_txt.includes("12:00")
      );
      createFiveDayForecast(fiveDayForecast);
      console.log(json);
    });