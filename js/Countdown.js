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
    var countdownTimeDiv = document.createElement('div');
    countdownTimeDiv.innerHTML = timeUntil.hours + ':' + timeUntil.minutes;
    document.getElementById('countdown').appendChild(countdownTimeDiv);
}

function formatTimeUntil(timeUntil){
    if(timeUntil.minutes.length < 2) {
        timeUntil.minutes = '0' + timeUntil.minutes;
    }
    return timeUntil;
}

function getCountdownTimeInformation() {
    generateCountdownTimeHTML(generateCountdownTime());
}