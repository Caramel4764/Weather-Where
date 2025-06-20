import callApi from './script/callAPI.js';
import hourlyCaro from './script/hourlyCaro.js';
import info from './script/info.js';
import uiUpdate from './script/uiUpdate.js';
import util from './script/util.js';
import lunarCycle from './script/lunarCycle.js';

const searchBar = document.querySelector('#searchbar');
const searchBtn = document.querySelector('#searchbar-send-btn');
const hourlyRightCarousel = document.querySelector('#hourlyRightCarousel');
const hourlyLeftCarousel = document.querySelector('#hourlyLeftCarousel');
const unitConvBtn = document.querySelector('#unitConvBtn');
window.addEventListener('resize', () => {
  hourlyCaro.calcCaro();
  info.screenSize = util.calcScreenWidth();
  hourlyCaro.updateActiveChartPoint();
  
});
unitConvBtn.addEventListener('click', () => {
  info.isFahrenheit = !info.isFahrenheit;
  unitConvBtn.textContent= util.getTempUnit();
  util.updateUnits();
  callApi.getHourlyTemp(info.currentDay);

})
searchBar.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    handleSearch();
  }
})
searchBtn.addEventListener('click', function() {
  handleSearch();

})
function handleSearch() {
  info.city = searchBar.value;
  uiUpdate.updateWeatherByCity(info.city);
  searchBar.value = "";
}
hourlyLeftCarousel.addEventListener('click', hourlyCaro.moveCarouselLeft);
hourlyRightCarousel.addEventListener('click', hourlyCaro.moveCarouselRight);

info.screenSize = util.calcScreenWidth();
hourlyCaro.updateCaroBtnVisibility();

uiUpdate.updateWeatherByCity('antarctica').then(function(){
  lunarCycle.updateMoonPhase();
})
