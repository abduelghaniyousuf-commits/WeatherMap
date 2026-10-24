// progressindicator functionality
function progressHandler(event) {
  if (event.lengthComputable) {
    const progressRate = (event.loaded / event.total) * 100;
    const indicator = document.getElementById("sProgress");
    indicator.setAttribute("max", `${event.total}`);
    indicator.setAttribute("value", `${progressRate}`);
    console.log(progressRate);
  } else {
    const indicator = document.getElementById("sProgress");

    console.log("un computable length");
  }
}

function onLoadHandler() {
  document.getElementById("sProgress").classList.remove("show");
  document.getElementById("sProgress").classList.add("hidden");
}

// http.onload handler 
function requestOnLoadHandler(coming_http) {
  const http = coming_http;
  console.log(http);
  const res = JSON.parse(http.responseText);
  const location = res.results[0].location
  return location;
}

// translates given address name to lat, lng location

function translateAddress(address) {
  http.addEventListener("progress", progressHandler);
  http.addEventListener("loadend", onLoadHandler)
  http.open("GET", `https://geocode.googleapis.com/v4/geocode/address/${address}?languageCode=en&key=AIzaSyBTzqYftm3d4Meu0fCxQ9QUhTlCus_27gE`);
  http.send();
  console.log("sent");
  http.onload = () => { requestOnLoadHandler(http) };
}


// get form text
var http = new XMLHttpRequest();
var cityName;
var city;
const getBtn = document.getElementById("search");

getBtn.addEventListener("click", formHandler);

async function formHandler(event) {
  event.preventDefault();
  document.getElementById("sProgress").classList.remove("hidden");
  document.getElementById("sProgress").classList.add("show");
  setTimeout(() => { }, 3000);
  city = document.getElementById("city");
  console.log("translating");
  cityName = city.value;
  city.value = "";

  // request geolocation for current location to get cities

  translateAddress(cityName);

  // get Weather of supplied city 
  getWeatherByName(cityName);

}


async function getWeatherByName(city) {
  // testing is city setted must be implemented
  console.log("weathering...");
  var url = `https://api.weatherapi.com/v1/current.json?key=70c796da70864de7951112249260910&q=${city}`
  http.open("GET", url);
  http.send();
  http.onload = async () => {
    // console.log(http.response);
    const info = JSON.parse(http.response);
    console.log(info);
    const location = {};
    location.lat = info.location.lat;
    location.lng = info.location.lon;
    console.log(location)
    var newOptions = {
      center: location,
      zoom: 10,
      mapId: "demo"
    }
    // console.log(newOptions)
    if (newOptions.center) {
      // updating map with new options 
      await updateMap(newOptions, info)
    }

    var weatherInfo;



  }
}
// 

// city.addEventListener("keyup", getText);
// function getText(e) {
//   console.log(e.target.value);
//   var q = e.target.value;
//   http.open("GET", "suggestion url");
//   http.send();
//   handleRespons();
// }

// function handleRespons(httpResponse) {

// }

// process suggestions
function getLocation(cityName) {
  cityName = formHandler;
}

// initialize google map

var cityLocation = {
  lat: 13.5007, lng: 32.5599
}
var options = {
  center: cityLocation,
  zoom: 12,
  zoomControl: true,
  mapId: "demo"
}

async function initMap() {

  const map = await new google.maps.Map(document.getElementById("map"), options)
  // const map = new google.maps.Map(document.getElementById("map").innerHTML);
}

// update google map to focus on the specified city
async function updateMap(newOptions, info) {
  const newMap = await new google.maps.Map(document.getElementById("map"), newOptions)
  const marker = new google.maps.marker.AdvancedMarkerElement({
    map: newMap,
    position: newOptions.center,
    title: info.location.name,
  }
  )

  const imageIcon = document.createElement("img")
  imageIcon.src = info.current.condition.icon
  marker.append(imageIcon)
  const infoWindow = new google.maps.InfoWindow()
  console.log(infoWindow)
  marker.addListener("click", () => {
    console.log("marker clicked...")
    infoWindow.close();
    // marker.map = null
    var content = `<div id="weatherInfo" class="roboto-sans">
    <!-- current.condition -->
    <i><img src="${info.current.condition.icon}" alt="${info.current.condition.text}"></i>
    <h1 style="text-align: center;display:inline-block">${info.location.name}</h1>
    <ul style="list-style: none;">
      <!-- current -->
      <li>cloud:${info.current.cloud}%</li>
      <li>temp: ${info.current.temp_c}C°</li>
      <li>humidity: ${info.current.humidity}%</li>
      <li>wind_kph: ${info.current.wind_kph}<span><small> ${info.current.wind_dir}°</small></span></li>
      <li>chance_of_rain: ${info.current.chance_of_rain} </li>
      <hr>
      <li style="display:flex; flex-wrap:wrap"><button id="share" style="margin-right:16px">share</button> <button id="more-forecast" style="background-color: blue;margin-top:16px">more forecasts</button></li>
    </ul>
  </div>`
    infoWindow.setContent(content);
    infoWindow.open({ anchor: marker });
    const details = document.getElementById("details")
    console.log(content)
    details.innerHTML = content
    details.classList.remove("hidden")
    details.classList.add("show")

    // adds listeners to share & more forecast buttons
    var share = document.getElementById("share")
    var forecast = document.getElementById("more-forecast")
    share.addEventListener('click', async () => { await shareHandler(city) })
    forecast.addEventListener("click", async () => { await forecastHandler(info.location.name) })

  })

  console.log(marker);
}

// console.log(city);
setTimeout(initMap, 5000);
// await initMap()


// shareHandler: shares weather details of current window across websites or clipboard
async function shareHandler(city) {
  console.log("sharing...")
  // require "AdvanceMarkerElemen" from "google.maps.libraries('marker')"

  var data = {
    title: "share API",
    text: document.getElementById('weatherInfo').textContent,
    url: Window.url
  }
  try {
    var isShared = await navigator.share(data)
    console.log("shared successfully")

  }
  catch (err) {
    console.error(err)
  }

  // implementing share api
}

// forecastHandler: more weather forecasts
async function forecastHandler(city) {
  console.log(city)
  var forecastContainer = document.getElementById("forecast")
  if (forecastContainer) {
    forecastContainer.classList.toggle("hidden")
    forecastContainer.textContent = "<p>Weather Data for a week...</p>"
    // call forecast api 
  }

}
// sending location to weather api 