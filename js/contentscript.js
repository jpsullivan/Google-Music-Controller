chrome.extension.onRequest.addListener(function(request, sender, callback) {
    var playPauseAttributes = document.getElementById("playPause").attributes;
    var state = "disabled";
    if (playPauseAttributes.getNamedItem("class").nodeValue.indexOf("disabled") == -1)
        state = playPauseAttributes.getNamedItem("title").nodeValue;
    callback(state);
});

document.getElementById("playing_controls").addEventListener("DOMSubtreeModified", function() {
    chrome.extension.sendRequest(0);
});
