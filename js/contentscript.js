function simulate_click(elem) {
    // GM no longer lets us trigger a click for some reason, so we have to fake it
    // by chaining a mousedown + mouseup event. Retarded.
    var el = document.getElementById(elem),
        evt = document.createEvent("MouseEvents"),
        evt2 = document.createEvent("MouseEvents");

    // event chain
    evt.initMouseEvent("mousedown", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    evt2.initMouseEvent("mouseup", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(evt);
    el.dispatchEvent(evt2);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.command == 'upvote_selected_track') {
        /**
         *  Dirty upvote method.  This utilizes a false click event to
         *  simulate actually clicking on the currently selected track.
         */
        simulate_click("thumbsUpPlayer");
    } else if(request.command == 'downvote_selected_track') {
        simulate_click("thumbsDownPlayer");
    } else {
        var playPauseAttributes = document.getElementById("playPause").attributes;
        var state = "disabled";
        if (playPauseAttributes.getNamedItem("class").nodeValue.indexOf("disabled") == -1)
            state = playPauseAttributes.getNamedItem("title").nodeValue;
        sendResponse(state);
    }
});

document.getElementById("playing_controls").addEventListener("DOMSubtreeModified", function() {
    chrome.extension.sendRequest(0);
});
