var iconMap = {
    '01d' : 'fa-day-sunny', // clear sky day
    '01n' : 'fa-weather-night', // clear sky night
    '02d' : 'fa-day-sunny-overcast', // few clouds day
    '02n' : 'fa-night-cloudy', // few clouds night
    '03d' : 'fa-weather-cloudy', // scattered clouds
    '03n' : 'fa-weather-cloudy',
    '04d' : 'fa-cloudy', // broken clouds
    '04n' : 'fa-cloudy',
    '09d' : 'fa-weather-pouring', // rain shower
    '09n' : 'fa-weather-pouring',
    '10d' : 'fa-day-rain', // day rain
    '10n' : 'fa-night-rain', // night rain
    '11d' : 'fa-thunderstorm', // thunderstorm
    '11n' : 'fa-thunderstorm',
    '13d' : 'fa-snow', // snow
    '13n' : 'fa-snow',
    '50d' : 'fa-day-fog', // mist
    '50n' : 'fa-night-fog',
    'x'   : 'fa-frown' // unknown
};

function getWeatherInformation() {
    getUserPosition().then(function(position) {
        var userPosition = formatPosition(position);
        getWeatherDataForPosition(userPosition);
    }).catch(function(error) {
        console.error(error);
        getWeatherDataForPosition(austinTXPosition);
    });
}

function getWeatherDataForPosition(userPosition) {
    var weatherURL = formatWeatherURL(userPosition);
    ajaxGetJSON(weatherURL).then(function(weatherResponse) {
        displayWeather(weatherResponse);
    }).catch(function(error) {
        console.error(error);
    });
}

function displayWeather(weatherResponse) {
    displayIcon(weatherResponse);
    displayTemperature(weatherResponse);
    displayLowHigh(weatherResponse);
    displayDescription(weatherResponse);
}
function displayDescription(weatherResponse) {
    document.getElementById('weatherDescription').innerHTML = weatherResponse.weather[0].description;
}
function displayIcon(weatherResponse) {
    var weatherIconCode = weatherResponse.weather[0].icon;
    if(!weatherIconCode) {
        weatherIconCode = 'x';
    }
    document.getElementById('weatherIcon').className = 'fa fa-5x ' + iconMap[weatherIconCode];
}
function displayTemperature(weatherResponse) {
    var temperature = formatTemperature(weatherResponse.main.temp);
    document.getElementById('temperature').innerHTML = temperature;
}
function displayLowHigh(weatherResponse) {
    document.getElementById('lowHigh').innerHTML = formatTemperature(weatherResponse.main.temp_min) + ' / ' + formatTemperature(weatherResponse.main.temp_max);
}

function formatPosition(geolocatedPosition) {
    return {'lat': geolocatedPosition.coords.latitude,
            'lon': geolocatedPosition.coords.longitude};
}

function formatWeatherURL(userPosition) {
    return 'http://api.openweathermap.org/data/2.5/weather?units=imperial' +
        '&lat=' + userPosition.lat +
        '&lon=' + userPosition.lon +
        '&APPID=03cac59ece41996f5673208b2ed57345'; // Free API? I'll risk it
}

function formatTemperature(temperature) {
    return String(temperature).split('.')[0];
}