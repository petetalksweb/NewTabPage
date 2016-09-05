function ajaxGet(url) {
    return new Promise(function(resolve, reject) {
        var xmlHTTPRequest = new XMLHttpRequest();
        xmlHTTPRequest.open('GET', url);
        xmlHTTPRequest.onload = function() {
            if (xmlHTTPRequest.status == 200) {
                resolve(xmlHTTPRequest.response);
            }
            else {
                reject('AJAX GET request for URL: ' + url + ' failed');
            }
        };
        xmlHTTPRequest.onerror = function() {
            reject('Network error during AJAX GET request for URL: ' + url);
        };
        xmlHTTPRequest.send();
    });
}

function ajaxGetJSON(url) {
    return new Promise(function(resolve, reject) {
        ajaxGet(url).then(function(response) {
            resolve(JSON.parse(response));
        }).catch(function(error) {
            console.error(error);
        })
    });
}

function ajaxGetJSONWithCaching(url, cacheTimeHours) {
    if(localStorage.getItem(url)) {
        var cachedItem = JSON.parse(localStorage.getItem(url));
        if((Math.abs(new Date(cachedItem.cachedAt) - new Date()) / 36e5) <= cacheTimeHours) {
            return new Promise(function(resolve, reject) {
                resolve(cachedItem.response);
            }).catch(function(error) {
                console.error(error);
            });
        }
    }
    return new Promise(function(resolve, reject) {
        ajaxGetJSON(url).then(function(jsonResponse) {
            var cachedItem = {
                cachedAt: new Date(),
                response: jsonResponse
            };
            localStorage.setItem(url, JSON.stringify(cachedItem));
            resolve(jsonResponse);
        }).catch(function(error) {
            console.error(error);
        });
    });
}

function ajaxGetJSONP(url, callback) {
    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute('src', url + '&callback=' + callback);
    document.body.appendChild(jsonpScript);
}