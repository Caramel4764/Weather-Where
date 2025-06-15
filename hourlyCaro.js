import util from './util.js';
import info from './info.js';
import callApi from './callAPI.js';
let hourlyCaro = (function(){
  const totalCardNum = 15;
  const caroHidden = document.querySelector('#caro-hidden');
  const hourlyChartCanvas = document.querySelector('#hourlyChartCanvas');
  const ctx = document.getElementById('hourlyChartCanvas').getContext('2d');
  let cardNum = 0;
  let caroIndex = 0;

  const chartData = {
    labels: ['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm'],
    datasets: [
      {
        label: 'Temperature',
        data: [10],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(73, 129, 129, 0.2)',
        borderWidth: 2,
        tension: 0.4, // Smooth curve
      },
    ],
  };
  
  const options = {
    responsive: true,
    animation: false,
    scales: {
      y: {
            min: -35, // Set the minimum value
            max: 135, // Set the maximum value
      }
    },
    indexAxis: 'x',
    xAxis: {
      type: 'time',
    },
    plugins: {
      legend: {
        display: false // Disables the entire legend
      }
    }
  };
  
  let chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: options,
  });

  function calcCaro() {
    caroHidden.style.width = window.innerWidth+"px";
    cardNum = Math.floor(caroHidden.offsetWidth/150);
    caroHidden.style.width = 150*cardNum+(cardNum-1)*10+"px";
  }

  function updateCaro() {
    hourSelectionDiv.style.left = -1*caroIndex*(cardNum*150 + cardNum*10) + "px";
    updateCaroBtnVisibility();
  }
  function moveCarouselRight() {
    //caroHidden
    //hourSelectionDiv
    caroIndex++;
    updateCaro();
  }
  function moveCarouselLeft() {
    caroIndex--;
    updateCaro();
  }
  function updateCaroBtnVisibility() {
    if (caroIndex == 0) {
      hourlyLeftCarousel.style.visibility = "hidden";
    } else {
      hourlyLeftCarousel.style.visibility = "visible";
    }
    if (caroIndex >= (totalCardNum/cardNum)-1) {
      hourlyRightCarousel.style.visibility = "hidden";
    } else {
      hourlyRightCarousel.style.visibility = "visible";
    }
  }

  function drawHourlyChart() {
    chart.destroy();
    chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: options,
    });
  }
  //creates the 15 day cards
function updateDayWeather(days) {
  for (let i = 0; i<days.length; i++) {
    let hourlyCard = document.createElement('div');
    hourlyCard.addEventListener('click', () => {
      //look here later. Get and update method needed?
      info.currentDay = i;
      callApi.getHourlyTemp(info.currentDay);
    })
    let cardDate = document.createElement('p');
    let cardIcon = document.createElement('div');
    let cardTemp = document.createElement('div');
    let cardTempText = document.createElement('p');
    let cardIconI = util.createForecastIcon(days[i].conditions, 50);
    hourlyCard.classList.add('hourlyCard');
    cardDate.classList.add('hourlyCardDate');
    if (i == 0) {
      cardDate.textContent = "Today";
    } else {
      cardDate.textContent = util.convertDate(days[i].datetime);
    }
    cardIcon.classList.add('hourlyIcon');
    cardTemp.classList.add('flex');
    cardTemp.textContent = days[i].temp;
    cardTempText.classList.add('hourlyCardTemp');
    cardIcon.appendChild(cardIconI);
    hourlyCard.appendChild(cardDate);
    hourlyCard.appendChild(cardIcon);
    hourlyCard.appendChild(cardTemp);
    cardTemp.appendChild(cardTempText);
    hourSelectionDiv.appendChild(hourlyCard);
  }
  //how many card in carousel
  hourlyCaro.calcCaro();
}

  return {calcCaro, moveCarouselRight, moveCarouselLeft, updateCaroBtnVisibility, drawHourlyChart, chartData, updateDayWeather};
})();

export default hourlyCaro;