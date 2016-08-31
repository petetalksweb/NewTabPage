var msInHour = 1000 * 60 * 60;
var msInMinute = 1000 * 60;
var countingToQuittingTime = false;

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
}

function msUntil(givenTime) {
    return (givenTime - new Date());
}

function generateCountdownTime() {
    var startTime = document.getElementById('startTime').value.substring(0,2);
    console.log(startTime);
    document.getElementById('endTime').value = vestDate;
    var currentTime = new Date();
    var countingToTime;
    if(currentTime.getHours() > 17 || currentTime.getHours() < 9) {
        countingToTime = generateTimeUntilWorkStarts(currentTime);
    } else {
        countingToTime = generateTimeUntilWorkEnds(currentTime);
    }
    var msUntilTime = msUntil(countingToTime);
    var timeUntil = {'hours': parseInt(msUntilTime / msInHour),
        'minutes': parseInt((msUntilTime / msInMinute) % 60)
    };
    return timeUntil;
}

function generateTimeUntilWorkStarts(currentTime) {
    var workStartsTime = new Date();
    if(currentTime.getHours() > 9) {
        workStartsTime.addDays(1);
    }
    while(workStartsTime.getDay() == 0 || workStartsTime.getDay() == 6) {
        workStartsTime.addDays(1);
    }
    console.log(workStartsTime.getDay());
    workStartsTime.setHours(9, 0, 0);
    return workStartsTime;
}

function generateTimeUntilWorkEnds(currentTime) {
    var workEndsTime = new Date();
    workEndsTime.setHours(17, 0, 0);
    countingToQuittingTime = true;
    return workEndsTime;
}

function generateCountdownTimeHTML(timeUntil) {
    timeUntil = formatTimeUntil(timeUntil);
    document.getElementById('countdownTime').innerHTML = timeUntil.hours + ':' + timeUntil.minutes;
    var untilDiv = document.getElementById('countdownUntil');
    if(countingToQuittingTime) {
        untilDiv.innerHTML = "Until Quitting Time";
    } else {
        untilDiv.innerHTML = "Until Work Time";
    }
}

function formatTimeUntil(timeUntil){
    if(String(timeUntil.minutes).length < 2) {
        timeUntil.minutes = '0' + String(timeUntil.minutes);
    }
    return timeUntil;
}

function getCountdownTimeInformation() {
    generateCountdownTimeHTML(generateCountdownTime());
    setupModal('countdownInformationModal', 'countdownSettingsIcon', 'countdownSettingsClose');
}
function loadCountdownInformation() {
    var startTime = getCookie('startTime');
    var endTime = getCookie('endTime');
    if(startTime) {
        document.getElementById('startTime').value = startDate;
        document.getElementById('endTime').value = vestDate;
    }
}
function updateCountdownInformation() {
    generateCountdownTimeHTML(generateCountdownTime());
    updateCookie();
}
function updateCookie() {
    var startDateString = document.getElementById('startDate').value;
    var vestDateString = document.getElementById('vestDate').value;
    setCookie('startDate', startDateString);
    setCookie('vestDate', vestDateString);
}