function generateExpandCollapseItem(title, link, description) {
    var expandableItem = document.createElement('div');
    expandableItem.className = 'expandableItem';
    expandableItem.appendChild(generateExpandCollapseIcon());
    expandableItem.appendChild(generateExpandableItemContent(title, link, description));
    return expandableItem;
}

function generateExpandCollapseIcon() {
    var expandCollapseIcon = document.createElement('div');
    expandCollapseIcon.className = 'expandCollapseIcon';
    expandCollapseIcon.onclick = function() {expandCollapseItem(this);};
    expandCollapseIcon.innerHTML = '+';
    console.log(expandCollapseIcon.onClick);
    return expandCollapseIcon;
}

function generateExpandableItemContent(title, link, description) {
    var expandableItemContent = document.createElement('div');
    expandableItemContent.className = 'expandableItemContent';
    expandableItemContent.appendChild(generateExpandableItemTitle(title, link));
    expandableItemContent.appendChild(generateExpandableItemDescription(description));
    return expandableItemContent;
}

function generateExpandableItemTitle(title, link) {
    var expandableItemTitle = document.createElement('a');
    expandableItemTitle.href = link;
    expandableItemTitle.className = 'expandableItemTitle';
    expandableItemTitle.innerHTML = title;
    return expandableItemTitle;
}

function generateExpandableItemDescription(description) {
    var expandableItemDescription = document.createElement('div');
    expandableItemDescription.className = 'expandableItemDescription';
    expandableItemDescription.innerHTML = description;
    return expandableItemDescription;
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