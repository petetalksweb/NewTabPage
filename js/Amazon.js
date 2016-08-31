ajaxGetJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fpjqn7td6qj.execute-api.us-west-2.amazonaws.com%2Fprod%2FamazonBestSellingBooks'&format=json&callback=").then(function(response) {
    var topBooks = response.query.results.body.browsenodelookupresponse.browsenodes.browsenode.topitemset.topitem;
    generateAllAmazonHTML(topBooks);
});

function generateAllAmazonHTML(amazonItems) {
    for(var i = 0; i < amazonItems.length; i++) {
        generateAmazonItemHTML(amazonItems[i]);
    }
}

function generateAmazonItemHTML(amazonItem) {
    var amazonItemDiv = document.createElement('div');
    amazonItemDiv.className = 'hackerNewsLink';
    amazonItemDiv.appendChild(generateAmazonItemLink(amazonItem));
    document.getElementById('amazon').appendChild(amazonItemDiv);
}

function generateAmazonItemLink(amazonItem) {
    var amazonItemLink = document.createElement('a');
    amazonItemLink.href = amazonItem.detailpageurl;
    amazonItemLink.innerHTML = amazonItem.content;
    return amazonItemLink;
}