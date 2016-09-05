ajaxGetJSONWithCaching('http://quotes.rest/qod.json', 8).then(function(quoteResponse) {
    document.getElementById('quote').innerHTML = quoteResponse.contents.quotes[0].quote;
    document.getElementById('quoteAuthor').innerHTML = quoteResponse.contents.quotes[0].author;
});