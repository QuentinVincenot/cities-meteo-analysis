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



// Function to initialize the bar chart
function initialize_bar_chart() {
    document.getElementById('barchart_canvas').style.width = '700px';
    document.getElementById('barchart_canvas').style.height = '250px';
    const ctx = document.getElementById('barchart_canvas').getContext('2d');
    
    bar_chart = new Chart(ctx, {
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
}
let bar_chart = undefined;
initialize_bar_chart();



// Function to retrieve and store meteo data from the open-meteo online API
async function retrieve_meteo_data() {
    // Compute the date 90 days before today and format it to open-meteo API requested format
    let date = new Date();
    date.setDate(date.getDate() - 90);
    let day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();
    let day_string = day.toString(), month_string = month.toString(), year_string = year.toString();
    if(day < 10) day_string = '0' + day_string;
    if(month < 10) month_string = '0' + month_string;
    let start_date = `${year_string}-${month_string}-${day_string}`;

    // Compute today's date and format it to open-meteo API requested format
    const date2 = new Date();
    day = date2.getDate(), month = date2.getMonth() + 1, year = date2.getFullYear();
    day_string = day.toString(), month_string = month.toString(), year_string = year.toString();
    if(day < 10) day_string = '0' + day_string;
    if(month < 10) month_string = '0' + month_string;
    let end_date = `${year_string}-${month_string}-${day_string}`;

    // Create and trigger the request to get data from the open-meteo online API
    let request_url = "https://api.open-meteo.com/v1/meteofrance?latitude=52.52&longitude=13.41&" +
                        "daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&" +
                        "start_date=" + start_date + "&end_date=" + end_date;
    let response = await fetch(request_url);
    let data = await response.json();

    // Affect initially retrieved datapoints to the line chart data
    LINE_DATALABELS = data.daily.time;
    LINE_DATAPOINTS_MIN = data.daily.temperature_2m_min;
    LINE_DATAPOINTS_MAX = data.daily.temperature_2m_max;
}

// Function to initialize the line chart containing the latest 90 values of a measurement
async function initialize_line_chart() {
    // Configure the dimensions of the canvas containing the latest measurements line chart
    document.getElementById('linechart_canvas').style.width = '1200px';
    document.getElementById('linechart_canvas').style.height = '300px';
    
    // Request the online API to retrieve data to display in the line chart
    await retrieve_meteo_data();
    
    // Retrieve the context of the canvas used to display the chart with Chart.js
    const ctx2 = document.getElementById('linechart_canvas').getContext('2d');
    // Create the line chart with retrieved data from the online API
    line_chart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: LINE_DATALABELS,
            datasets: [
                { label: 'Min Temperature (°C)', data: LINE_DATAPOINTS_MIN,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', borderWidth: 2 },
                { label: 'Max Temperature (°C)', data: LINE_DATAPOINTS_MAX,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)', borderWidth: 2 },
            ]
        },
        options: {
            responsive: true, layout: {padding: {top: 5, left: 15, right: 15, bottom: 10}},
            elements: {point: {radius: 2}}
        }
    });    
}
// Save references to the line chart, line data labels and line data points for later reuse/update
let line_chart = undefined, LINE_DATALABELS = [], LINE_DATAPOINTS_MIN = [], LINE_DATAPOINTS_MAX = [];
// Retrieve data from the open-meteo API and initialize the line chart with the retrieved data points
initialize_line_chart();



let icon_temperature = "<i class='fa-solid fa-temperature-half' style='font-size:50px;'></i>";
let icon_humidity = "<i class='fa-solid fa-droplet' style='font-size:50px;'></i>";
let icon_precipitation = "<i class='fa-solid fa-cloud-showers-heavy' style='font-size:50px;'></i>";
let icon_pressure = "<i class='fa-solid fa-gauge-high' style='font-size:50px;'></i>";
let icon_wind = "<i class='fa-solid fa-wind' style='font-size:50px;'></i>";


