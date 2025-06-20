import info from './info.js';
import hourlyCaro from './hourlyCaro.js';
import util from './util.js';

let callAPI = (function(){
  async function fetchWeather (city) {
  try {
    let res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${info.city}?key=${info.APIkey}`, {mode:"cors"});
    let data = await res.json();
    info.data = data;
    return data;
    } catch (error) {
      alert("Please enter a valid city.");
    }
  }
  async function getHourlyTemp (dayFromToday) {
    let data = info.data;
      let upcomingTemps = [];
      for (let i = 0; i<data.days[dayFromToday].hours.length; i++) {
        upcomingTemps.push(data.days[dayFromToday].hours[i].temp);
      }
      info.ogHourlyData = upcomingTemps;
      info.chartData.datasets[0].data = upcomingTemps;
      hourlyCaro.drawHourlyChart();
  }

  return {getHourlyTemp, fetchWeather};

})();

export default callAPI;