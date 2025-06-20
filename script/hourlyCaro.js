import util from './util.js';
import info from './info.js';
import callApi from './callAPI.js';
let hourlyCaro = (function(){
  const totalCardNum = 15;
  const hourlyChartCanvas = document.querySelector('#hourlyChartCanvas');
  const caroHidden = document.querySelector('#caro-hidden');
  const hourlyChartResizeDiv = document.querySelector('#hourlyChartResizeDiv');
  const ctx = document.getElementById('hourlyChartCanvas').getContext('2d');
  let cardNum = 0;
  let caroIndex = 0;
  let borderLeyway = 0;
  const options = {
    responsive: false,
    animation: false,
    scales: {
      y: {
        min: 0, // Set the minimum value
        max: 100, // Set the maximum value
        grid: {
          display: false          
        }
      },
      x: {
        grid: {
          display: false
        }
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
    data: info.chartData,
    options: options,
  });
  function calcCaro() {
    caroHidden.style.width = window.innerWidth+"px";
    cardNum = Math.floor(caroHidden.offsetWidth/150);
    caroHidden.style.width = 150*cardNum+(cardNum-1)*10+"px";
  }
  function changeGraphSize() {
    if (info.screenSize == "phone") {
      hourlyChartCanvas.width = "330";
      hourlyChartCanvas.height = "165";
      info.chartData.datasets[0].pointRadius = 3;
    } else if (info.screenSize == "tablet") {
      hourlyChartCanvas.width = "400";
      hourlyChartCanvas.height = "200";
      info.chartData.datasets[0].pointRadius = 4;
    } else {
      hourlyChartCanvas.width = "600";
      hourlyChartCanvas.height = "300";
      info.chartData.datasets[0].pointRadius = 6;
    }
  }
  function updateActiveChartPoint() {
    info.chartData.datasets[0].pointBackgroundColor = [];
    for (let i = 0; i<info.chartData.labels.length; i++) {
      let labelMilitaryHour = info.chartData.labels[i];
      if (labelMilitaryHour.includes("PM")) {
        labelMilitaryHour = parseInt(info.chartData.labels[i]) + 12;
      } else {
        labelMilitaryHour = parseInt(info.chartData.labels[i]);
      }
      if (util.getCurrentHour() == labelMilitaryHour) {
        info.chartData.datasets[0].pointBackgroundColor.push('rgb(2, 27, 255)');
      } else {
        info.chartData.datasets[0].pointBackgroundColor.push('rgb(198, 91, 3)');
      }
    }
    drawHourlyChart();
  }
  function updateCaro() {
    hourSelectionDiv.style.left = -1*caroIndex*(cardNum*150 + cardNum*10) + "px";
    updateCaroBtnVisibility();
  }
  function moveCarouselRight() {
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
    if (info.isFahrenheit) {
      options.scales.y.max = ((Math.floor(((util.findHighestTemp()))/10)+1)*10)+borderLeyway;
      options.scales.y.min = ((Math.floor(((util.findLowestTemp()))/10)-1)*10)-borderLeyway;
    } else {
      options.scales.y.max = ((Math.floor((util.fahrenheitToCelsius(util.findHighestTemp()))/10)+1)*10)+borderLeyway;
      options.scales.y.min = ((Math.floor((util.fahrenheitToCelsius(util.findLowestTemp()))/10)-1)*10)-borderLeyway;
    }
    changeGraphSize();
    for (let i = 0; i<info.chartData.datasets[0].data.length; i++) {
      if (info.isFahrenheit) {
        info.chartData.datasets[0].data[i] = info.ogHourlyData[i];
        
      } else {
        info.chartData.datasets[0].data[i] = util.fahrenheitToCelsius(info.ogHourlyData[i]);
      }
    }
    chart = new Chart(ctx, {
      type: 'line',
      data: info.chartData,
      options: options,
    });
  }
  //creates the 15 day cards
function updateDayWeather(days) {
  hourSelectionDiv.innerHTML = "";
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
    let temp = document.createElement('p');
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
    temp.classList.add('temp');
    if (info.isFahrenheit) {
      temp.textContent = days[i].temp;
      cardTempText.textContent = "°F";
    } else {
      temp.textContent = util.fahrenheitToCelsius(days[i].temp);
      cardTempText.textContent = "°C";
    }
    temp.setAttribute('id', days[i].temp);

    cardTempText.classList.add('hourlyCardTemp');
    cardTempText.classList.add('degree');
    cardIcon.appendChild(cardIconI);
    hourlyCard.appendChild(cardDate);
    hourlyCard.appendChild(cardIcon);
    hourlyCard.appendChild(cardTemp);
    cardTemp.appendChild(temp);
    cardTemp.appendChild(cardTempText);
    hourSelectionDiv.appendChild(hourlyCard);
  }
  //how many card in carousel
  hourlyCaro.calcCaro();
  updateActiveChartPoint();
}

  return {updateActiveChartPoint, options, calcCaro, moveCarouselRight, moveCarouselLeft, updateCaroBtnVisibility, drawHourlyChart, updateDayWeather};
})();

export default hourlyCaro;