chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.command == 'upvote_selected_track') {
        /**
         *  Dirty upvote method.  This utilizes a false click event to
         *  simulate actually clicking on the currently selected track.
         */
//        var track_guid = $('.selectedSong').attr('id').replace('songs_', '');
//        var track_obj = $('.selectedSong').children('.thumbsUpSmall');
//        sendResponse({ guid: track_guid, obj: track_obj });
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        $("#thumbsUpPlayer")[0].dispatchEvent(event);
    } else if(request.command == 'downvote_selected_track') {
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        $("#thumbsDownPlayer")[0].dispatchEvent(event);
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
