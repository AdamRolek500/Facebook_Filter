var aggregatedScore = 0;
var numberOfPosts = 0;
var countedComments = 0;
var countedPosts = 0;

function getPostScore(text) {
    var url = "https://us-central1-facebook-filter.cloudfunctions.net/analyzeTextSentiment";
    var done = false;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
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
    if (getPostScore(element.textContent) < -0.25) {
        element.className += " filter_content";
    }
}
function filterUserContent() {
    var list = document.getElementsByClassName("userContent");
    for (; countedPosts < list.length; countedPosts++) {
        var element = list[countedPosts];
        filterContent(element);
    }
}

function checkPositivity(){
	if(aggregatedScore < -0.35){
			alert("Your feed is very toxic today. Please visit reddit.com/r/eyebleach");
	}

}

function filterComments() {
    var list = document.getElementsByClassName("UFICommentBody");
    for (;countedComments < list.length; countedComments++) {
        var element = list[countedComments];
        filterContent(element);
    }
}

function onElementHeightChange(element, callback){
    var lastHeight = element.clientHeight, newHeight;
    (function run(){
        newHeight = element.clientHeight;
        if( lastHeight != newHeight )
            callback();
        lastHeight = newHeight;

        if( element.onElementHeightChangeTimer )
            clearTimeout(element.onElementHeightChangeTimer);

        element.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

onElementHeightChange(document.body, function(){
    filterComments();
	filterUserContent();
	checkPositivity();
});


