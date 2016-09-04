var storyIdURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.google.com%2Ftrends%2Fapi%2Fstories%2Flatest%3Fhl%3Den-US%26tz%3D300%26cat%3Dall%26fi%3D15%26fs%3D15%26geo%3DUS%26ri%3D300%26rs%3D15%26sort%3D0'&format=json&callback=";

function getGoogleTrendsInformation() {
    ajaxGetJSON(storyIdURL).then(function (response) {
        var responseString = response.query.results.body;
        var responseJSON = JSON.parse(responseString.substring(5, responseString.length));
        var topStoryIDs = responseJSON.trendingStoryIds.slice(0, 20);
        console.log(topStoryIDs);
        var yqlURLForStoryInfo = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20'https%3A%2F%2Fwww.google.com%2Ftrends%2Fapi%2Fstories%2Fsummary%3Fhl%3Den-US%26tz%3D300";
        for (var i = 0; i < topStoryIDs.length; i++) {
            yqlURLForStoryInfo += '%26id%3D' + topStoryIDs[i];
        }
        yqlURLForStoryInfo += "'&format=json&diagnostics=true&callback=";

        ajaxGetJSON(yqlURLForStoryInfo).then(function (response2) {
            responseString = response2.query.results.body;
            responseJSON = JSON.parse(responseString.substring(5, responseString.length));
            generateTextLinks(converGoogleTrendsToTextLinkObjects(responseJSON.trendingStories).slice(0, 10), 'google');
        })
    });
}

function converGoogleTrendsToTextLinkObjects(googleTrends) {
    var textLinkObjects = [];
    for(var i = 0; i < googleTrends.length; i++) {
        var currentTextLinkObject = {};
        currentTextLinkObject.title = googleTrends[i].title;
        currentTextLinkObject.href = 'https://www.google.com/trends/story/' + googleTrends[i].id;
        textLinkObjects.push(currentTextLinkObject);
    }
    return textLinkObjects;
}