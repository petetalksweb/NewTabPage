function setCookie(propertyName, propertyValue) {
    var cookie = {};
    if(document.cookie) {
        cookie = JSON.parse(document.cookie);
    }
    cookie[propertyName] = propertyValue;
    console.log(cookie);
    document.cookie = JSON.stringify(cookie);
}

function getCookie(propertyName) {
    if(document.cookie) {
        var cookie = JSON.parse(document.cookie);
        if(cookie[propertyName]) {
            return cookie[propertyName];
        }
    }
    return null;
}
