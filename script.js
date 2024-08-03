// Initialize necessary variables
let lat, lon;

// Function to fetch the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to show the user's position
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // Switch to weather container and hide landing page
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('weather-container').style.display = 'block';
    document.getElementById('weather-data').style.display = 'block';

    // Display the latitude and longitude
    document.getElementById("location-info").innerHTML = `
        <p>Latitude: ${lat}</p>
        <p>Longitude: ${lon}</p>
    `;

    // Display Google Maps iframe with the location
    let googleMapIframe = document.getElementById("google-map");
    googleMapIframe.src = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;

    // Fetch weather data
    fetchWeatherData(lat, lon);
}

// Function to handle geolocation errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Function to fetch weather data using OpenWeatherMap API
function fetchWeatherData(lat, lon) {
    const apiKey = '2ad8e7678e28a8f169bbf06fff0495aa'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
}

// Function to display the fetched weather data
function displayWeatherData(data) {
    document.getElementById('location').textContent = data.name;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('time-zone').textContent = `UTC ${data.timezone / 3600}`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('wind-direction').textContent = data.wind.deg + '°';
    document.getElementById('uv-index').textContent = data.current?.uvi || 'N/A'; // UV index might not be available
    document.getElementById('feels-like').textContent = `${data.main.feels_like} °C`;
}

// Event listener for the "Fetch Data" button
document.getElementById('fetch-data').addEventListener('click', getLocation);





