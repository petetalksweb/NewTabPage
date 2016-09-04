var rssURLS = {
    blogs: ['http://daverupert.com/atom.xml',
        'https://jakearchibald.com/posts.rss',
        'http://feeds.igvita.com/igvita',
        'http://feeds.feedburner.com/paul-irish?format=xml',
        'http://feeds.feedburner.com/CssTricks?format=xml',
        'https://hacks.mozilla.org/feed/',
        'https://jslive.com/rss'],
    news:  ['http://rss.cnn.com/rss/cnn_topstories.rss?format=xml',
            'http://www.wired.com/feed/',
            'https://feeds.bbci.co.uk/news/rss.xml?edition=us',
            'http://feeds.feedburner.com/TechCrunch/?format=xml',
            'http://america.aljazeera.com/content/ajam/articles/rss',
        ]
};

function getRSSFeeds(collectionName, modalName, settingsIconName, closeIconName, rssURLInputDivID) {
    if(!localStorage.getItem(collectionName)) {
        localStorage.setItem(collectionName, JSON.stringify(rssURLS[collectionName]));
    }
    var urls = JSON.parse(localStorage.getItem(collectionName));
    var yqlURL = generateYQLURL(urls);
    ajaxGetJSON(yqlURL).then(function(yqlResponse) {
        generateAllBlogPostHTML(yqlResponse.query.results.feed, collectionName)
    });
    setupModal(modalName, settingsIconName, closeIconName);
    generateRssURLInputs(urls, rssURLInputDivID);
}

function deleteURL() {
    var div = event.srcElement.parentNode;
    div.parentNode.removeChild(div);
}

function addRssURLInput(appendToID) {
    var rssUrlInputTemplate = document.getElementById('rssURLInput');
    var containingDiv = document.getElementById(appendToID);
    var newRssUrlInputDiv = rssUrlInputTemplate.content.cloneNode(true);
    var newRssUrlInput = newRssUrlInputDiv.querySelector('input');
    newRssUrlInput.placeholder = 'New RSS URL';
    containingDiv.appendChild(newRssUrlInputDiv);
}

function saveRssURLs(collectionName) {
    var rssURLInputs = event.srcElement.parentNode.getElementsByTagName('input');
    var rssURLsToSave = [];
    for(var i = 0; i < rssURLInputs.length; i++) {
        rssURLsToSave.push(rssURLInputs[i].value);
    }
    localStorage.setItem(collectionName, JSON.stringify(rssURLsToSave));
}

function generateRssURLInputs(rssURLs, appendToID) {
    var rssUrlInputTemplate = document.getElementById('rssURLInput');
    var containingDiv = document.getElementById(appendToID);
    for(var i = 0; i < rssURLs.length; i++) {
        var currentRssUrlInputDiv = rssUrlInputTemplate.content.cloneNode(true);
        var rssURLInput = currentRssUrlInputDiv.querySelector('input');
        rssURLInput.value = rssURLs[i];
        containingDiv.appendChild(currentRssUrlInputDiv);
    }
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