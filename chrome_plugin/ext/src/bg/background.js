// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
var token = "";

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(request.content);
  });

chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.id, {
        code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { alert('success'); });"
     }, function() { console.log('done'); });
});

chrome.contextMenus.create({
      title: "Facebook Filter",
      contexts: ["all"],
      onclick: function() {

	  window.open("https://www.facebook.com/v2.11/dialog/oauth?client_id=149180932480745&redirect_uri=https://www.facebook.com/connect/login_success.html&response_type=token");
	  
      }
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
	
		var facebookURL =
		"https://www.facebook.com/connect/login_success.html#";
		if(changeInfo.url.startsWith(facebookURL)){
			token = changeInfo.url.substring(65,changeInfo.url.indexOf("&expires"));
			console.log(token);
			
			var userID = getAppToken(token);
			var name = getName(userID);
			var url = "https://us-central1-facebook-filter.cloudfunctions.net/createUser";
			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-type", "text/plain");
			xhttp.send(userID + " : " + name);
			console.log(userID + " : " + name);
		}
		console.log(changeInfo.url);
	
});

function getAppToken(token){
	
	var url = "https://graph.facebook.com/debug_token?input_token=" + token + "&access_token=149180932480745|dc03249613671e3b0449b1786db28fa3";
    var xhttp = new XMLHttpRequest();
	var userID= "";
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {

			userID = JSON.parse(xhttp.response).data.user_id;
			console.log(userID);
		
        }
    }
    xhttp.open("GET", url, false);
    xhttp.send();
    return userID;
	
}

function getName(userID){
	
	var url = "https://graph.facebook.com/" + userID + "?field=name&access_token=149180932480745|dc03249613671e3b0449b1786db28fa3";
    var xhttp = new XMLHttpRequest();
	var name = "";
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {

			name = JSON.parse(xhttp.response).name;
			console.log(name);
		
        }
    }
    xhttp.open("GET", url, false);
    xhttp.send();
    return name;
	
}
// Comments: UFICommentBody
// Posts: userContent