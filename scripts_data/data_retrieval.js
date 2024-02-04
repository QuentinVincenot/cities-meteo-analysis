/*--------------------------------------------------------------------------------
----- RETRIEVED DATA INFORMATION ABOUT CITIES METEO
--------------------------------------------------------------------------------*/

document.getElementById('barchart_canvas').style.width = '700px';
document.getElementById('barchart_canvas').style.height = '250px';
const ctx = document.getElementById('barchart_canvas').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 12, 15, 10, 7, 9, 5],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true, layout: {padding: {top: 5, left: 10, right: 10, bottom: 5}}
    }
});



let LINE_DATAPOINTS = [], LINE_DATALABELS = [];
for(let i=0; i<100; i++) {
    LINE_DATAPOINTS.push(Math.random() * 25 - 5);
    LINE_DATALABELS.push(''+(i+1));
}
console.log(LINE_DATAPOINTS);
console.log(LINE_DATALABELS);


document.getElementById('linechart_canvas').style.width = '1200px';
document.getElementById('linechart_canvas').style.height = '300px';
const ctx2 = document.getElementById('linechart_canvas').getContext('2d');

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: LINE_DATALABELS,
        datasets: [{
            label: '# of Votes',
            data: LINE_DATAPOINTS,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true, layout: {padding: {top: 5, left: 10, right: 10, bottom: 5}},
        elements: {
            point: {radius: 2}
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







