function getTwitterInformation() {
    ajaxGetJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22https%3A%2F%2Ftwitter.com%2Fi%2Ftrends%3Fk%3D2316700e79%26pc%3Dtrue%26show_context%3Dfalse%26src%3Dsearch-home%22&format=json&callback=").then(function(twitterResponse) {
        var htmlString = decodeURI(JSON.parse(twitterResponse.query.results.body).module_html);
        var listItems = htmlString.split('</li>');
        var trends = [];
        for(var i = 0; i < 10; i++) {
            trends.push(parseTwitterTrend(listItems[i]));
        }
        generateAllTwitterTrendHTML(trends);
    })
}

function parseTwitterTrend(listItem) {
    var newTrend = {};
    newTrend.name = listItem.split('data-trend-name="')[1].split('"')[0];
    newTrend.href = 'http://twitter.com' + listItem.split('href="')[1].split('" data-query')[0];
    return newTrend;
}

function generateAllTwitterTrendHTML(twitterTrends) {
    for(var i = 0; i < twitterTrends.length; i++) {
        generateTwitterTrendHTML(twitterTrends[i]);
    }
}

function generateTwitterTrendHTML(twitterTrend) {
    var twitterTrendDiv = document.createElement('div');
    twitterTrendDiv.className = 'hackerNewsLink';
    twitterTrendDiv.appendChild(generateTwitterTrendLink(twitterTrend));
    document.getElementById('twitter').appendChild(twitterTrendDiv);
}

function generateTwitterTrendLink(twitterTrend) {
    var twitterTrendLink = document.createElement('a');
    twitterTrendLink.href = twitterTrend.href;
    twitterTrendLink.innerHTML = twitterTrend.name;
    return twitterTrendLink;
}
