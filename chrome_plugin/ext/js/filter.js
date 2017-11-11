var aggregatedScore = 0;
var numberOfPosts = 0;

function getPostScore(text) {
    var url = "https://us-central1-facebook-filter.cloudfunctions.net/analyzePost";
    var done = false;
    var score = 0;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            console.log("Scoring!");
            numberOfPosts++;
            score = xhttp.response.data;
            aggregatedScore += score;
            done = true;
            console.log("Score: " + score);
        }
    }
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send(text);
    return 1;
    
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