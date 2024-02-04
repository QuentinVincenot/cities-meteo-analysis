/*--------------------------------------------------------------------------------
----- RETRIEVED DATA INFORMATION ABOUT CITIES METEO
--------------------------------------------------------------------------------*/


const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const ctx2 = document.getElementById('lineChart');

new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});




//
async function retrieve_meteo_data() {
    let request_url = "https://api.open-meteo.com/v1/meteofrance?latitude=43.59&longitude=1.43&hourly=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,wind_speed_10m&timezone=Europe%2FBerlin&start_date=2024-01-01&end_date=2024-01-31";
    let response = await fetch(request_url);
    let data = await response.json();
    console.log(data);
}


//
retrieve_meteo_data();







