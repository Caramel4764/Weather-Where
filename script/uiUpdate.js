import info from './info.js';
import util from './util.js';
import callApi from './callAPI.js';
import hourlyCaro from './hourlyCaro.js';


let uiUpdate = (function(){
  const overviewMenu = document.querySelector('#min-overviewstat');
  const forcastDiv = document.querySelector('#forcast-div');
  const cityName = document.querySelector("#cityName");
  const temp = document.querySelector("#temp");
  const tempMax = document.querySelector('#tempMax');
  const tempMin = document.querySelector('#tempMin');
  const overviewBg = document.querySelector('#overview-bg');
  const forcast = document.querySelector('#forcast-div');
  const condition = document.querySelector('#condition-text');
  const hourSelectionDiv = document.querySelector('#hourSelectionDiv');
  const currTempText = document.querySelector('#currTempText');
  const currentTempIconDiv = document.querySelector('#currentTemp-icon-div');
  const danger = document.querySelector('#danger');
  const sunSetAmPm = document.querySelector("#sunSetAmPm");
  const sunRiseAmPm = document.querySelector("#sunRiseAmPm");
  const rainChance = document.querySelector("#rainChance");
  const windSpeed = document.querySelector("#windSpeed");
  const sunsetTime = document.querySelector("#sunSetTime");
  const sunriseTime = document.querySelector("#sunRiseTime");
  const cloudyness = document.querySelector("#cloudyness");
  const humidity = document.querySelector("#humidity");

  async function updateWeatherByCity (city) {
    info.city = util.convertPascalCase(city);
    let data = await callApi.fetchWeather(info.city);
    console.log(data);
    cityName.textContent = data.address;
    let currDay = data.days[0]
    temp.textContent = currDay.temp;
    tempMax.textContent = currDay.tempmax;
    tempMin.textContent = currDay.tempmin;
    //overviewBg.style.backgroundColor = util.getTempColor(currDay.temp);
    forcastDiv.style.backgroundColor = util.getTempColor(currDay.temp);
    overviewMenu.style.backgroundColor = util.getTempColor(currDay.temp);
    rainChance.textContent = currDay.precip;
    windSpeed.textContent = currDay.windgust;

    let regularTimeSet = util.getRegularTime(currDay.sunset);
    let regularTimeRise = util.getRegularTime(currDay.sunrise);
    if (regularTimeSet) {
      sunsetTime.textContent = `${regularTimeSet.hour}:${regularTimeSet.minute}`;
      sunSetAmPm.textContent = regularTimeSet.amPm;
    } else {
      sunsetTime.textContent = `N/A`;
      sunSetAmPm.textContent = "";
    }
    if (regularTimeRise) {
      sunriseTime.textContent = `${regularTimeRise.hour}:${regularTimeRise.minute}`;
      sunRiseAmPm.textContent = regularTimeSet.amPm;
    } else {
      sunriseTime.textContent = `N/A`;
      sunRiseAmPm.textContent = "";
    }
    humidity.textContent = currDay.humidity;
    cloudyness.textContent = currDay.cloudcover;
    util.getRegularTime(currDay.sunset);
    if (data.alerts) {
      displayWarning(data.alerts);
    }
    forcast.innerHTML = "";
    condition.textContent = data.currentConditions.conditions;
    let forecastIcon = util.createForecastIcon(data.currentConditions.conditions, 130);
    forcast.appendChild(forecastIcon);
    hourlyCaro.updateDayWeather(data.days);
    callApi.getHourlyTemp(info.currentDay);
    currTempText.textContent = data.days[0].hours[util.getCurrentHour()].temp;
    currentTempIconDiv.innerHTML = "";
    currentTempIconDiv.appendChild(util.createForecastIcon(data.days[0].conditions, 70));
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
  return {displayWarning, updateWeatherByCity}
})()

export default uiUpdate