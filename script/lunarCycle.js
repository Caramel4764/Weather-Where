import info from "./info.js";
import util from "./util.js";

const moonList = document.getElementById("moonList");

let lunarCycle = (function() {
  function updateMoonPhase () {
    for(let i = 0; i<info.data.days.length; i++) {
      let moonCard = document.createElement('div');
      moonCard.classList.add('moonCard');
      let moonDate = document.createElement('h3');
      let moonIcon = document.createElement('div');
      let moonName = document.createElement('p');
      moonCard.appendChild(moonDate);
      moonCard.appendChild(moonIcon);
      moonCard.appendChild(moonName);
      moonDate.textContent = util.convertDate(info.data.days[i].datetime);
      moonIcon.classList.add('flex');
      let moonIconI = document.createElement('img');
      moonIconI.setAttribute('src', `../assets/moon/moon${getMoonPhase(info.data.days[i].moonphase).imgId}.png`);
      moonIconI.classList.add('moon-icon');
      moonIcon.appendChild(moonIconI);
      moonName.classList.add('moonName');
      moonName.textContent = getMoonPhase(info.data.days[i].moonphase).name;
      moonList.appendChild(moonCard);
    }
  }
  function getMoonPhase(moonphase) {
    if (moonphase == 0) {
      return {name: "New Moon", imgId: 1};
    } else if (moonphase > 0 && moonphase < 0.25) {
      return {name: "Waxing Crescent", imgId: 2};
    } else if (moonphase == 0.25) {
      return {name: "First Quarter", imgId: 3};
    } else if (moonphase > 0.25 && moonphase < 0.5) {
      return {name: "Waxing Gibbous", imgId: 4};
    } else if (moonphase == 0.5) {
      return {name: "Full Moon", imgId: 5};
    } else if (moonphase > 0.5 && moonphase < 0.75) {
      return {name: "Waning gibbous", imgId: 6};
    } else if (moonphase == 0.75) {
      return {name: "Last Quarter", imgId: 7};
    } else {
      return {name: "Waning Crescent", imgId: 8};
    }
  }
  return {updateMoonPhase}
})();

export default lunarCycle;