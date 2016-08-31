var devRSSURLs = ['http://daverupert.com/atom.xml',
    'https://jakearchibald.com/posts.rss',
    'http://feeds.igvita.com/igvita',
    'http://feeds.feedburner.com/paul-irish?format=xml',
    'http://feeds.feedburner.com/CssTricks?format=xml',
    'https://blog.codepen.io/feed/',
    'https://hacks.mozilla.org/feed/'
];
var newsRSSURLs = ['http://rss.cnn.com/rss/cnn_topstories.rss?format=xml',
    'http://www.wired.com/feed/',
    'https://feeds.bbci.co.uk/news/rss.xml?edition=us',
    'http://feeds.feedburner.com/TechCrunch/?format=xml',
    'http://america.aljazeera.com/content/ajam/articles/rss',
];
getWeatherInformation();
getHackerNewInformation();
getVestInformation();
getCountdownTimeInformation();
getWikipeidaInformation();
getRSSFeeds(devRSSURLs, 'devRSS');
getRSSFeeds(newsRSSURLs, 'newsRSS');
getRedditInformation();
getTwitterInformation();