function getRSSFeeds(urls, elementID) {
    var rssPromises = [];
    for(var i = 0; i < urls.length; i++) {
        rssPromises.push(ajaxGet(yqlURLGenerator(urls[i])));
    }
    Promise.all(rssPromises).then(function(rss) {
        var posts = [];
        for(var i = 0; i < rss.length; i++) {
            posts = posts.concat(generatePostsJSON(rss[i]));
        }
        posts.sort(postsDateCompare);
        generateAllBlogPostHTML(posts, elementID);
    });
}

function generateAllBlogPostHTML(posts, elementID) {
    var containingDiv = document.getElementById(elementID);

    for(var i = 0; i < 10; i++) {
        containingDiv.appendChild(generateExpandCollapseItem(posts[i].title, posts[i].link, posts[i].description));
    }
}

function generateBlogPostHTML(post, elementID) {
    var blogPostDiv = document.createElement('div');
    blogPostDiv.appendChild(generateBlogPostLink(post));
    document.getElementById(elementID).appendChild(blogPostDiv);
}

function generateBlogPostLink(post) {
    var blogPostLink = document.createElement('a');
    blogPostLink.href = post.link;
    blogPostLink.innerHTML = post.title;
    return blogPostLink;
}

function postsDateCompare(post1, post2) {
    var post1Date = new Date(post1.date).getTime();
    var post2Date = new Date(post2.date).getTime();
    if (post1Date > post2Date) {
        return -1;
    }
    if (post1Date < post2Date) {
        return 1;
    }
    return 0;
}

var parser = new DOMParser();
function generatePostsJSON(rssResponse) {
    var rss = parser.parseFromString(rssResponse, "application/xml");
    var articles = rss.getElementsByTagName('item');
    if(articles.length != 0) {
        return parseArticleItems(articles);
    } else {
        var entries = rss.getElementsByTagName('entry');
        return parseEntryItems(entries);
    }
    return [];
}
function parseArticleItems(articles) {
    var articlesJSON = [];
    for(var i = 0; i < articles.length; i++) {
        var articleJSON = {};
        if(articles[i].getElementsByTagName('pubDate')[0]) {
            articleJSON.title = articles[i].getElementsByTagName('title')[0].innerHTML;
            if(articleJSON.title.indexOf('![CDATA[') > 0) {
                articleJSON.title = articleJSON.title.slice(9, articleJSON.title.length - 3);
            }
            articleJSON.link = articles[i].getElementsByTagName('link')[0].innerHTML;
            articleJSON.date = articles[i].getElementsByTagName('pubDate')[0].innerHTML;
            articleJSON.description = articles[i].getElementsByTagName('description')[0].innerHTML;
            if(articleJSON.description.indexOf('![CDATA[') > 0) {
                articleJSON.description = articleJSON.description.slice(9, articleJSON.description.length - 3);
            }
            if(articleJSON.description.indexOf('&lt;') > 0) {
                articleJSON.description = articleJSON.description.substring(0, articleJSON.description.indexOf('&lt;'));
            }
        }
        articlesJSON.push(articleJSON);
    }
    return articlesJSON;
}
function parseEntryItems(entries) {
    var entriesJSON = [];
    for(var i = 0; i < entries.length; i++) {
        var entryJSON = {};
        entryJSON.title = entries[i].getElementsByTagName('title')[0].innerHTML;
        if(entryJSON.title.indexOf('![CDATA[') > 0) {
            entryJSON.title = entryJSON.title.slice(9, entryJSON.title.length - 3);
        }
        entryJSON.link = entries[i].getElementsByTagName('id')[0].innerHTML;
        entryJSON.date = entries[i].getElementsByTagName('updated')[0].innerHTML;
        entriesJSON.push(entryJSON);
    }
    return entriesJSON;
}
function yqlURLGenerator(actualURL) {
    return 'http://query.yahooapis.com/v1/public/yql?q=' +
        encodeURIComponent('select * from xml where url="' + actualURL + '"') +
        "&format=xml"
}
