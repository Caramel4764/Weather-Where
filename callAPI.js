import info from './info.js';
import hourlyCaro from './hourlyCaro.js';

let callAPI = (function(){
  async function fetchWeather (city) {
  try {
    let res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${info.city}?key=${info.APIkey}`, {mode:"cors"});
    let data = await res.json();
    return data;
    } catch (error) {
      alert("Please enter a valid city.");
    }
  }
  async function getHourlyTemp (dayFromToday) {
    let data = await fetchWeather(info.city).then(
      function(data) {
        let upcomingTemps = [];
        for (let i = 0; i<data.days[dayFromToday].hours.length; i++) {
            upcomingTemps.push(data.days[dayFromToday].hours[i].temp);
        }
        hourlyCaro.chartData.datasets[0].data = upcomingTemps;
      }
    ).then(function() {
      hourlyCaro.drawHourlyChart();
    })
  }
  
  return {getHourlyTemp, fetchWeather};
})();

export default callAPI;