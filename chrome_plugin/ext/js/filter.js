var aggregatedScore = 0;
var numberOfPosts = 0;

function getPostScore(text) {
    var url = "https://us-central1-facebook-filter.cloudfunctions.net/analyzePost";
    var done = false;
    var score = 0;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            score = xhttp.response;
            done = true;
        }
    }
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send(text);
    while (!done) {
    }
    return score;
    
}
function filterContent(element) {
    if (getPostScore(element.textContent) < -.25) {
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