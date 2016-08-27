var oneDayInMS = 1000 * 60 * 60 * 24;

function calculateVestInformation() {
    var startDate = new Date('July 14, 2014');
    var vestDate = new Date('July 14, 2017');
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
    var daysUntilVestH = document.createElement('h1');
    daysUntilVestH.innerHTML = 'Days Until Vesting';
    document.getElementById('vest').appendChild(daysUntilVestH);
    var daysUntilVestP = document.createElement('p');
    daysUntilVestP.innerHTML = vestInformation.numberOfDays;
    document.getElementById('vest').appendChild(daysUntilVestP);
}

function getVestInformation() {
    generateVestInformationHTML(calculateVestInformation());
}