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
    ajaxGet(weatherURL).then(function(weatherResponse) {
        var weatherResponseJSON = JSON.parse(weatherResponse);
        var temperature = formatTemperature(weatherResponseJSON.main.temp);
        displayTemperature(temperature);
    }).catch(function(error) {
        console.error(error);
    });
}

function displayTemperature(temperature) {
    document.getElementById('temperature').innerHTML = temperature;
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