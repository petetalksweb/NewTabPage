var redditURL = 'https://www.reddit.com/.json';

function getRedditInformation() {
    ajaxGetJSON(redditURL).then(function(redditResponse) {
        var redditPosts = redditResponse.data.children.slice(0, 10);
        var redditTextLinkObjects = convertRedditStoriesToTextLinkObjects(redditPosts);
        generateTextLinks(redditTextLinkObjects, 'reddit');
    }).catch(function(error) {
        console.error(error);
    });
}

function convertRedditStoriesToTextLinkObjects(redditStories) {
    var textLinkObjects = [];
    for(var i = 0; i < redditStories.length; i++) {
        var currentTextLinkObject = {};
        currentTextLinkObject.title = redditStories[i].data.title;
        currentTextLinkObject.href = 'http://reddit.com' + redditStories[i].data.permalink;
        textLinkObjects.push(currentTextLinkObject);
    }
    return textLinkObjects;
}