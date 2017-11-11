// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(request.content);
  });

chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.id, {
        code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { alert('success'); });"
     }, function() { console.log('done'); });
});

// Comments: UFICommentBody
// Posts: userContent