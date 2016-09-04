var oneDayInMS = 1000 * 60 * 60 * 24;

function calculateVestInformation() {
    var startDate = new Date(document.getElementById('startDate').value);
    var vestDate = new Date(document.getElementById('vestDate').value);
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
    setupModal('vestInformationModal', 'vestSettingsIcon', 'vestSettingsClose');
}

function loadVestInformation() {
    if(!localStorage.getItem('startDate')) {
        localStorage.setItem('startDate', '2014-07-14');
    }
    if(!localStorage.getItem('vestDate')) {
        localStorage.setItem('vestDate', '2017-07-14');
    }
    document.getElementById('startDate').value = localStorage.getItem('startDate');
    document.getElementById('vestDate').value = localStorage.getItem('vestDate');
}
function updateVestInformation() {
    generateVestInformationHTML(calculateVestInformation());
    updateLocalStorage();
}
function updateLocalStorage() {
    localStorage.setItem('startDate', document.getElementById('startDate').value);
    localStorage.setItem('vestDate', document.getElementById('vestDate').value);
}