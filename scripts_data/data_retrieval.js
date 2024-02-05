/*--------------------------------------------------------------------------------
----- RETRIEVED DATA INFORMATION ABOUT CITIES METEO
--------------------------------------------------------------------------------*/

// Function to retrieve today's date and display it in the application
function get_and_display_today_date() {
    // Retrieve today's date with Javascript built-in function
    const date = new Date();
    // Extract date components from today's date for later custom display
    let day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();
    // Format today's date with the previously extracted components
    let day_string = day.toString(), month_string = month.toString(), year_string = year.toString();
    if(day < 10) day_string = '0' + day_string;
    if(month < 10) month_string = '0' + month_string;
    let currentDate = `${day_string}/${month_string}/${year_string}`;
    // Display today's formatted date in the relevant panel of the application
    document.getElementById('today_date').innerHTML = currentDate;
}
get_and_display_today_date();


let icon_temperature = "<i class='fa-solid fa-temperature-half' style='font-size:50px;'></i>";
let icon_humidity = "<i class='fa-solid fa-droplet' style='font-size:50px;'></i>";
let icon_precipitation = "<i class='fa-solid fa-cloud-showers-heavy' style='font-size:50px;'></i>";
let icon_pressure = "<i class='fa-solid fa-gauge-high' style='font-size:50px;'></i>";
let icon_wind = "<i class='fa-solid fa-wind' style='font-size:50px;'></i>";


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







