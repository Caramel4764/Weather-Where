
let info = (function(){
  let city = "None";
  const APIkey = "AWQDP4A7HBA8L97EMKCSQTSWR";
  let currentDay = 0;
  let isAm = true;
  let screenSize;
  //let allHourlyTemps = [];
  let data;
  const chartData = {
    labels: ['1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12PM'],
    datasets: [
      {
        label: 'Temperature',
        data: [],
        pointBackgroundColor: [],
        borderColor: 'rgb(198, 91, 3)',
        backgroundColor: 'rgb(198, 91, 3)',
        borderWidth: 1,
        pointRadius: 5,
        tension: 0.4, // Smooth curve
      },
    ],
  };
  return {currentDay, city, APIkey, chartData};
}())

export default info