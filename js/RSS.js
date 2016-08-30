function getRSSFeeds(urls, elementID) {
    var yqlURL = generateYQLURL(urls);
    ajaxGetJSON(yqlURL).then(function(yqlResponse) {
        generateAllBlogPostHTML(yqlResponse.query.results.feed, elementID)
    });
}

function generateYQLURL(urls) {
    var yqlURL = 'https://query.yahooapis.com/v1/public/yql?format=json&q=';
    yqlURL += encodeURI(generateYQLQuery(urls));
    return yqlURL;
}

function generateYQLQuery(urls) {
    var yqlQuery = 'select entry.title, entry.link.href, entry.summary.content, entry.published from feednormalizer where url in (';
    for(var i = 0; i < urls.length; i++) {
        yqlQuery += '\'' + urls[i] + '\', ';
    }
    yqlQuery = yqlQuery.substring(0, yqlQuery.length - 2);
    yqlQuery += ') and output="atom_1.0" | sort(field="entry.published", descending="true") | truncate(count=10)';
    return yqlQuery;
}

function generateAllBlogPostHTML(posts, elementID) {
    var containingDiv = document.getElementById(elementID);
    for(var i = 0; i < posts.length; i++) {
        containingDiv.appendChild(generateExpandCollapseItem(posts[i].entry.title, posts[i].entry.link.href, posts[i].entry.summary));
    }
}