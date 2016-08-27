var randomWikiArticleURL = 'https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&format=json&rnnamespace=0';
var randomArticleID = 0;

function randomWikiArticleCallback(randomWikiArticleData) {
    var wikiArticleURL = generateWikiArticleExtractURL(randomWikiArticleData.query.random[0].title);
    randomArticleID = randomWikiArticleData.query.random[0].id;
    ajaxGetJSONP(wikiArticleURL, 'generateRandomWikiArticleHTML');
}

function generateRandomWikiArticleHTML(wikiArticleData) {
    var actualData = wikiArticleData.query.pages[randomArticleID];
    var wikipediaDiv = document.createElement('div');
    wikipediaDiv.appendChild(generateRandomWikiArticleLink(actualData.title));
    wikipediaDiv.appendChild(generateRandomWikiArticleExtract(actualData.extract));
    document.getElementById('wikipedia').appendChild(wikipediaDiv);
}

function generateRandomWikiArticleLink(title) {
    var wikiArticleLink = document.createElement('a');
    wikiArticleLink.href = 'https://en.wikipedia.org/wiki/' + title;
    wikiArticleLink.innerHTML = title;
    return wikiArticleLink;
}

function generateRandomWikiArticleExtract(extract) {
    var wikiArticleExtract = document.createElement('p');
    wikiArticleExtract.innerHTML = extract;
    return wikiArticleExtract;
}

function generateWikiArticleExtractURL(title) {
    return 'http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&' +
        'titles=' + title + '&redirects=';
}

function getWikipeidaInformation() {
    ajaxGetJSONP(randomWikiArticleURL, 'randomWikiArticleCallback');
}
