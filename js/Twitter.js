function getTwitterInformation() {
    ajaxGetJSON('https://morbi1lqbb.execute-api.us-west-2.amazonaws.com/dev/twitter').then(function(twitterResponse) {
        console.log(twitterResponse);
        var twitterTrendTextLinkObjects = convertTwitterTrendsToTextLinkObjects(twitterResponse.trends);
        generateTextLinks(twitterTrendTextLinkObjects, 'twitter');
    })
}

function convertTwitterTrendsToTextLinkObjects(twitterTrends) {
    var textLinkObjects = [];
    for(var i = 0; i < twitterTrends.length; i++) {
        var currentTextLinkObject = {};
        currentTextLinkObject.title = twitterTrends[i].name;
        currentTextLinkObject.href = twitterTrends[i].url;
        textLinkObjects.push(currentTextLinkObject);
    }
    return textLinkObjects;
}