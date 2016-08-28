function setupModal(modalID, iconID, closeID) {
    var modal = document.getElementById(modalID);
    var btn = document.getElementById(iconID);
    var span = document.getElementById(closeID);
    btn.onclick = function () {
        modal.style.display = "block";
    };
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}