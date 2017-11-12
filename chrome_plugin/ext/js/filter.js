var aggregatedScore = 0;
var numberOfPosts = 0;
var countedComments = 0;
var countedPosts = "";

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
    if (element && getPostScore(element.textContent) <= -0.25) {
        element.className += " filter_content";
    }
}
function filterUserContent() {
    var list = document.getElementsByClassName("userContent");
    for (i = 0; i < list.length; i++) {
        if (!countedPosts.includes(list[i].textContent)) {
            var element = list[i];
            filterContent(element);
            countedPosts += element.textContent;
        }
    }
}

function checkPositivity(){
	/*if(aggregatedScore < -0.5){
        alert("Your feed is very toxic today. Please visit reddit.com/r/eyebleach");
	}*/
}

function filterComments() {
    var list = document.getElementsByClassName("UFICommentBody");
    for (i = 0; i < list.length; i++) {
        if (!countedPosts.includes(list[i].textContent)) {
            var element = list[i];
            filterContent(element);
            countedPosts += element.textContent;
        }
    }
}

function onElementHeightChange(element, callback){
    var lastHeight = element.clientHeight, newHeight;
    (function run(){
        newHeight = element.clientHeight;
        if(lastHeight != newHeight )
            callback();
        lastHeight = newHeight;

        if(element.onElementHeightChangeTimer )
            clearTimeout(element.onElementHeightChangeTimer);

        element.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

filterComments();
filterUserContent();
checkPositivity();

var classname = document.getElementsByClassName("UFIPagerLink");

var filter = function() {
    filterComments();
    filterUserContent();
    checkPositivity();
};

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', filter, false);
}

onElementHeightChange(document.body, function() {
    filterComments();
	filterUserContent();
	checkPositivity();

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', filter, false);
    }
});

setInterval(function() {
    console.log('Testing')
    filterComments();
	filterUserContent();
	checkPositivity();

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', filter, false);
    }
}, 5000);


