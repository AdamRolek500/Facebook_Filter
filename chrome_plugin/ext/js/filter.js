var aggregatedScore = 0;
var numberOfPosts = 0;
var countedComments = 0;
var countedPosts = 0;

function getPostScore(text) {
    var url = "https://us-central1-facebook-filter.cloudfunctions.net/analyzePost";
    var done = false;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            console.log("Scoring!");
            numberOfPosts++;
            score = Number.parseFloat(xhttp.response);
            aggregatedScore += score;
        }
    }
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send(text);
    xhttp.success
    return score;
}

function filterContent(element) {
    if (getPostScore(element.textContent) > -.25) {
        element.className += " filter_content";
    }
}
function filterUserContent() {
    var list = document.getElementsByClassName("userContent");
    for (var i = countedPosts; i < list.length; i++) {
        countedPosts++;
        var element = list[i];
        filterContent(element);
    }
}

function filterComments() {
    var list = document.getElementsByClassName("UFICommentBody");
    for (var i = countedComments; i < list.length; i++) {
        countedComments++;
        var element = list[i];
        filterContent(element);
    }
}
filterComments();
filterUserContent();
