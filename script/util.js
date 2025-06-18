import info from './info.js';

let util = (function(){
  function getCurrentHour(isMilitaryTime = true) {
    if (isMilitaryTime){
      let date = new Date();
      let hour = date.getHours();
      return hour;
    }
  }
  function findLowestTemp(){
    let data = info.data;
    let lowestTemp = data.days[0].hours[0].temp;
    for (let i = 0; i<data.days.length; i++) {
      for(let j = 0; j<data.days[i].hours.length; j++) {
        if (data.days[i].hours[j].temp < lowestTemp) {
        lowestTemp = data.days[i].hours[j].temp;
        }
      }
    }
    return lowestTemp;
  }
  function findHighestTemp(){
    let data = info.data;
    let highestTemp = data.days[0].hours[0].temp;
    for (let i = 0; i<data.days.length; i++) {
      for(let j = 0; j<data.days[i].hours.length; j++) {
        if (data.days[i].hours[j].temp > highestTemp) {
        highestTemp = data.days[i].hours[j].temp;
        }
      }
    }
    return highestTemp;
  }

  function createForecastIcon(forecast, size = 100) {
    let forecastIcon = document.createElement('i');
    if (forecast.indexOf("Hail") != -1) {
      forecastIcon.classList.add('bi', 'bi-cloud-sleet');
    } else if (forecast.indexOf("Snow") != -1) {
      forecastIcon.classList.add('bi', 'bi-cloud-snow');
    } else if (forecast.indexOf("Rain") != -1) {
      forecastIcon.classList.add('bi', 'bi-cloud-drizzle');
    } else if (forecast.indexOf("Partially cloudy") != -1) {
      forecastIcon.classList.add('bi', 'bi-cloud-sun');
    } else if (forecast.indexOf("Cloudy") != -1) {
      forecastIcon.classList.add('bi', 'bi-cloudy');
    } else if (forecast.indexOf("Overcast") != -1) {
      forecastIcon.classList.add('bi', 'bi-clouds');
    } else if (forecast.indexOf("Clear") != -1) {
      forecastIcon.classList.add('bi', 'bi-sun');
    } else {
      forecastIcon.classList.add('bi', 'bi-patch-question');
    }
    forecastIcon.style.fontSize = `${size}px`;
    return forecastIcon;
  }

  //formated mm/dd
  function convertDate(date) {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    return `${month}/${day}`;
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
      //ex
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
  function getRegularTime(militaryTime) {
    if (!militaryTime) {
      return false;
    }
    let hour = Number(militaryTime.substring(0,2));
    let minute = militaryTime.substring(3,5)
    if (hour>12) {
      return {hour:hour-12, minute, amPm:'PM'};
    } else {
      return {hour:hour, minute, amPm:'AM'};
    }
  }
  function calcScreenWidth() {
    let width = window.innerWidth;
    let size;
    if (width <= 480) {
      size = "phone";
    } else if (width <= 768) {
      size = "tablet";
    } else {
      size = "desktop";
    }
    return size;
  }
  
  return {getCurrentHour, findLowestTemp, findHighestTemp, calcScreenWidth, createForecastIcon, convertDate, getTempColor, convertPascalCase, getRegularTime};
})();

  export default util;
