var redditURL = 'https://www.reddit.com/.json';

function getRedditInformation() {
    ajaxGetJSON(redditURL).then(function(redditResponse) {
        var redditPosts = redditResponse.data.children.slice(0, 10);
        generateAllRedditPostHTML(redditPosts);
    }).catch(function(error) {
        console.error(error);
    });
}

function generateAllRedditPostHTML(redditPosts) {
    for(var i = 0; i < redditPosts.length; i++) {
        generateRedditPostHTML(redditPosts[i].data);
    }
}

function generateRedditPostHTML(redditPost) {
    var redditPostDiv = document.createElement('div');
    redditPostDiv.className = 'hackerNewsLink';
    redditPostDiv.appendChild(generateRedditPostLink(redditPost));
    document.getElementById('reddit').appendChild(redditPostDiv);
}

function generateRedditPostLink(redditPost) {
    var redditPostLink = document.createElement('a');
    redditPostLink.href = redditPost.url;
    redditPostLink.innerHTML = redditPost.title;
    return redditPostLink;
}