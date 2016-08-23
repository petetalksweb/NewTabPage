var austinTXPosition = {'lat': 30.268328,
                        'lon': -97.7554749};

function getUserPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}