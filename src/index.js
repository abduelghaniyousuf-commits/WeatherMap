// progressindicator functionality
function progressHandler(event) {
  if (event.lengthComputable) {
    const progressRate = (event.loaded / event.total) * 100;
    const indicator = document.getElementById("sProgress");
    indicator.setAttribute("max", `${event.total}`);
    indicator.setAttribute("value", `${progressRate}`);
    console.log(progressRate);
  } else {
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

function formHandler(event) {
  event.preventDefault();
  document.getElementById("sProgress").classList.toggle("show");
  city = document.getElementById("city");
  console.log("translating");
  cityName = city.value;
  const location = translateAddress(cityName);

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
console.log(cityName);
function getLocation(cityName) {
  cityName = formHandler;
}



// request for lat ,lng of right suggested city 
// console.log(cityName);



// initialize google map

var cityLocation = {
  lat: 13.5007, lng: 32.5599
}
var options = {
  center: cityLocation,
  zoom: 12
}

async function initMap() {
  new google.maps.Map(document.getElementById("map"), options);
  // const map = new google.maps.Map(document.getElementById("map").innerHTML);
}

// console.log(city);

// await initMap();
// request geolocation for current location to get cities




// sending location to weather api 