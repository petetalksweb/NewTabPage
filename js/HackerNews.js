var hnTopStoriesURL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

function getHackerNewInformation() {
    ajaxGetJSON(hnTopStoriesURL).then(function(hnTopStoryIDs) {
        var hnTopStoriesIDs = hnTopStoryIDs.slice(0, 10);
        var hnStoryPromises = generateHNStoryPromises(hnTopStoriesIDs);
        Promise.all(hnStoryPromises).then(function(hnStories) {
            generateAllHNStoryHTML(hnStories);
        }).catch(function(error) {
            console.error(error);
        });
    }).catch(function(error) {
        console.error(error);
    });
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

function generateAllHNStoryHTML(hnStoryResponses) {
    for(var i = 0; i < hnStoryResponses.length; i++) {
        generateHNStoryHTML(hnStoryResponses[i]);
    }
}

function generateHNStoryHTML(hnStory) {
    var hnStoryDiv = document.createElement('div');
    hnStoryDiv.appendChild(generateHNStoryLink(hnStory));
    document.getElementById('hackerNews').appendChild(hnStoryDiv);
}

function generateHNStoryLink(hnStory) {
    var hnStoryLink = document.createElement('a');
    hnStoryLink.href = hnStory.url;
    hnStoryLink.innerHTML = hnStory.title;
    return hnStoryLink;
}