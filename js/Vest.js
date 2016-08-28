var oneDayInMS = 1000 * 60 * 60 * 24;

function calculateVestInformation() {
    var startDate = new Date(document.getElementById('startDate').value);
    var vestDate = new Date(document.getElementById('vestDate').value);
    console.log(vestDate);
    var todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    var vestTimeInMS = vestDate.getTime() - startDate.getTime();
    var timeCompletedInMS = todayDate.getTime() - startDate.getTime();
    var timeToGoInMS = vestTimeInMS - timeCompletedInMS;
    var returnObject = {};
    var numberOfDays = Math.ceil(timeToGoInMS / oneDayInMS);
    returnObject.numberOfDays = (numberOfDays < 0) ? 0 : numberOfDays;
    var completionPercentage = (1 - (timeToGoInMS / vestTimeInMS)) * 100;
    returnObject.completionPercentage = (completionPercentage > 100) ? 100 : completionPercentage;
    return returnObject;
}

function generateVestInformationHTML(vestInformation) {
    document.getElementById('days').innerHTML = vestInformation.numberOfDays;
    document.getElementById('progress').style.width = vestInformation.completionPercentage + '%';
}

function getVestInformation() {
    loadVestInformation();
    generateVestInformationHTML(calculateVestInformation());
}

function loadVestInformation() {
    var startDate = getCookie('startDate');
    var vestDate = getCookie('vestDate');
    if(startDate) {
        document.getElementById('startDate').value = startDate;
        document.getElementById('vestDate').value = vestDate;
    }
}
function updateVestInformation() {
    generateVestInformationHTML(calculateVestInformation());
    updateCookie();
}
function updateCookie() {
    var startDateString = document.getElementById('startDate').value;
    var vestDateString = document.getElementById('vestDate').value;
    setCookie('startDate', startDateString);
    setCookie('vestDate', vestDateString);
}