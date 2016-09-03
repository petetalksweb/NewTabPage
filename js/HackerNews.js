var hnTopStoriesURL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

function getHackerNewInformation() {
    ajaxGetJSON(hnTopStoriesURL).then(function(hnTopStoryIDs) {
        var hnTopStoriesIDs = hnTopStoryIDs.slice(0, 10);
        var hnStoryPromises = generateHNStoryPromises(hnTopStoriesIDs);
        Promise.all(hnStoryPromises).then(function(hnStories) {
            hnTextLinkObjects = convertHNStoriesToTextLinkObjects(hnStories);
            generateTextLinks(hnTextLinkObjects, 'hackerNews');
        }).catch(function(error) {
            console.error(error);
        });
    }).catch(function(error) {
        console.error(error);
    });
}

function convertHNStoriesToTextLinkObjects(hnStories) {
    var textLinkObjects = [];
    for(var i = 0; i < hnStories.length; i++) {
        var currentTextLinkObject = {};
        currentTextLinkObject.title = hnStories[i].title;
        currentTextLinkObject.href = hnStories[i].url;
        textLinkObjects.push(currentTextLinkObject);
    }
    return textLinkObjects;
}
function generateHNStoryURL(storyID) {
    return 'https://hacker-news.firebaseio.com/v0/item/' + storyID + '.json';
}

function generateHNStoryPromises(hnTopStoryIDs) {
    var hnStoryPromises = new Array(10);
    for(var i = 0; i < hnTopStoryIDs.length; i++) {
        hnStoryPromises[i] = ajaxGetJSON(generateHNStoryURL(hnTopStoryIDs[i]));
    }
    return hnStoryPromises;
}