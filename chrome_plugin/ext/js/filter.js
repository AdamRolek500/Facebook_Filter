function filterContent(element) {
    if (element.textContent.indexOf("cuuuuuute") !== -1) {
        element.className += " filter_content";
    }
}
function filterUserContent() {
    var list = document.getElementsByClassName("userContent");
    for (var i = 0; i < list.length; i++) {
        var element = list[i];
        filterContent(element);
    }
}

function filterComments() {
    var list = document.getElementsByClassName("UFICommentBody");
    for (var i = 0; i < list.length; i++) {
        var element = list[i];
        filterContent(element);
    }
}

filterUserContent();
filterComments();