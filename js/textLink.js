function generateTextLinks(textLinkObjects, appendToID) {
    var textLinkTemplate = document.getElementById('textLinkTemplate');
    var containingDiv = document.getElementById(appendToID);
    for(var i = 0; i < textLinkObjects.length; i++) {
        var currentTextLink = textLinkTemplate.content.cloneNode(true);
        var currentTextLinkA= currentTextLink.querySelector('a');
        currentTextLinkA.href = textLinkObjects[i].href;
        currentTextLinkA.innerHTML = textLinkObjects[i].title;
        containingDiv.appendChild(currentTextLink);
    }
}