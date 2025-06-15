import hourlyCaro from './hourlyCaro.js';
import info from './info.js';
import uiUpdate from './uiUpdate.js';
const searchBar = document.querySelector('#searchbar');
const searchBtn = document.querySelector('#searchbar-send-btn');
const hourlyRightCarousel = document.querySelector('#hourlyRightCarousel');
const hourlyLeftCarousel = document.querySelector('#hourlyLeftCarousel');

window.addEventListener('resize', () => {
  hourlyCaro.calcCaro();
});

searchBar.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    info.city = searchBar.value;
    updateWeatherByCity(info.city);
    searchBar.value = "";
  }
})
searchBtn.addEventListener('click', function() {
  info.city = searchBar.value;
  updateWeatherByCity(info.city);
})
hourlyLeftCarousel.addEventListener('click', hourlyCaro.moveCarouselLeft);
hourlyRightCarousel.addEventListener('click', hourlyCaro.moveCarouselRight);


uiUpdate.updateWeatherByCity('Sawtooth');
hourlyCaro.updateCaroBtnVisibility();
