function generateExpandableItem(title, link, description) {
    var expandableItemTemplate = document.getElementById('expandableItemTemplate');
    var expandableItem = expandableItemTemplate.content.cloneNode(true);
    var expandableItemLink = expandableItem.querySelector('a');
    expandableItemLink.href = link;
    expandableItemLink.innerHTML = title;
    var expandableItemDescription = expandableItem.querySelector('.expandableItemDescription');
    expandableItemDescription.innerHTML = description;
    return expandableItem;
}

function expandCollapseItem(expandCollapseIcon) {
    var expandableItemContent = expandCollapseIcon.parentNode.getElementsByClassName('expandableItemContent')[0];
    var expandableItemDescription = expandableItemContent.getElementsByClassName('expandableItemDescription')[0];
    if(expandCollapseIcon.innerHTML === '+') {
        expandableItemDescription.style.display = 'block';
        expandCollapseIcon.innerHTML = '-';
    } else {
        expandableItemDescription.style.display = 'none';
        expandCollapseIcon.innerHTML = '+';
    }
}