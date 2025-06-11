const cityName = document.querySelector("#cityName");
const temp = document.querySelector("#temp");
const tempMax = document.querySelector('#tempMax');
const tempMin = document.querySelector('#tempMin');
const searchBar = document.querySelector('#searchbar');
const searchBtn = document.querySelector('#searchbar-send-btn');
const overviewBg = document.querySelector('#overview-bg');

const danger = document.querySelector('#danger');
const sunSetAmPm = document.querySelector("#sunSetAmPm");
const sunRiseAmPm = document.querySelector("#sunRiseAmPm");
const rainChance = document.querySelector("#rainChance");
const windSpeed = document.querySelector("#windSpeed");
const sunsetTime = document.querySelector("#sunSetTime");
const sunriseTime = document.querySelector("#sunRiseTime");
const cloudyness = document.querySelector("#cloudyness");
const humidity = document.querySelector("#humidity");

let city = "elk grove";
const APIkey = "AWQDP4A7HBA8L97EMKCSQTSWR";
searchBar.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    city = searchBar.value;
    updateWeather(city);
    searchBar.value = "";
  }
})
searchBtn.addEventListener('click', function() {
  city = searchBar.value;
  updateWeather(city);
})
async function fetchWeather (city) {
  try {
    let res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${APIkey}`, {mode:"cors"});
    let data = await res.json();
    return data;
    } catch (error) {
      alert("Please enter a valid city.");
    }
}
async function updateWeather (city) {
  city = convertPascalCase(city);
  let data = await fetchWeather(city);
  console.log(data);
  cityName.textContent = data.address;
  let currDay = data.days[0]
  temp.textContent = currDay.temp;
  tempMax.textContent = currDay.tempmax;
  tempMin.textContent = currDay.tempmin;
  overviewBg.style.backgroundColor = getTempColor(currDay.temp);
  rainChance.textContent = currDay.precip;
  windSpeed.textContent = currDay.windgust;

  let regularTimeSet = getRegularTime(currDay.sunset);
  let regularTimeRise = getRegularTime(currDay.sunrise);
  sunsetTime.textContent = `${regularTimeSet.hour}:${regularTimeSet.minute}`;
  sunSetAmPm.textContent = regularTimeSet.amPm;
  sunriseTime.textContent = `${regularTimeRise.hour}:${regularTimeRise.minute}`;
  sunRiseAmPm.textContent = regularTimeSet.amPm;
  humidity.textContent = currDay.humidity;
  cloudyness.textContent = currDay.cloudcover;
  getRegularTime(currDay.sunset);
  if (data.alerts) {
    displayWarning(data.alerts);
  }
}
function getRegularTime(militaryTime) {
  let hour = Number(militaryTime.substring(0,2));
  let minute = militaryTime.substring(3,5)
  if (hour>12) {
    return {hour:hour-12, minute, amPm:'PM'};
  } else {
    return {hour:hour, minute, amPm:'AM'};
  }
}
function displayWarning(warnings) {
  danger.innerHTML = "";
  for(let i = 0; i<warnings.length; i++) {
    let div = document.createElement('div');
    div.classList.add('danger-bg', 'flex');
    danger.appendChild(div);
    let warning = document.createElement('h1');
    let dangerDesc = document.createElement('p');
    dangerDesc.classList.add('danger-desc');
    div.appendChild(warning);
    div.appendChild(dangerDesc);
    warning.textContent = "Warning: "+warnings[i].event;
    dangerDesc.textContent = warnings[i].description;
  }
}
function getTempColor(temp) {
  let color;
  if (temp > 100) {
    color = "#A90202";
  } else if (temp > 90) {
    color = "#FC0101";
  } else if (temp > 80) {
    color = "#FF4646";
  } else if (temp > 70) {
    color = "#FF8484";
  } else if (temp > 60) {
    color = "#FEBABA";
  } else if (temp > 50) {
    //red start here
    color = "#FFE5E5";
  } else if (temp > 40) {
    //blue start here
    color = "#E5EAFF";
  } else if (temp > 30) {
    color = "#A0B5FE";
  } else if (temp > 20) {
    color = "#6B8BFF";
  } else if (temp > 10) {
    color = "#3C66FF";
  } else if (temp > 0) {
    color = "#0339FF";
  } else {
    color = "#002DC0";
  }
  return color;
}
function convertPascalCase(word) {
  let converted = "";
  let capitalizeNext = true;
  for (let i = 0; i<word.length; i++) {
    if (capitalizeNext) {
      converted+=word.substring(i, i+1).toUpperCase();
    } else {
      converted+=word.substring(i, i+1);
    }
    if (word.substring(i, i+1) == " ") {
      capitalizeNext = true;
    } else {
      capitalizeNext = false;
    }
  }
  return converted;
}

updateWeather('sawtooth');