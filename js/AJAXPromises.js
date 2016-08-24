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