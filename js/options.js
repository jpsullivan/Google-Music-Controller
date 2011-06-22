var LocalStorage = { // Store option data
    init: function() {
        var onclick_action = LocalStorage.getStorage('onclick_action');

        $('#catalogs_filter input:checkbox').bind('change', function() {
            // save the data on change
            onclick_action.set(this.id, $(this).is(':checked') ? 'checked' : 'not');
        }).each(function() {
            // on load, set the value to what we read from storage:
            var val = onclick_action.get(this.id);
            if (val === 'checked') { $(this).attr('checked', 'checked'); }
            if (val === 'not') { $(this).removeAttr('checked'); }
            if (val) { $(this).trigger('change'); }
        });
    },
    getStorage: function(key_prefix) {
        // this function will return us an object with a "set" and "get" method
        // using either localStorage if available, or defaulting to document.cookie
        if (window.localStorage) {
            // use localStorage:
            return {
                set: function(id, data) {
                    localStorage.setItem(key_prefix+id, data);
                },
                get: function(id) {
                    return localStorage.getItem(key_prefix+id);
                }
            };
        } else {
            // use document.cookie:
            return {
                set: function(id, data) {
                    document.cookie = key_prefix+id+'='+encodeURIComponent(data);
                },
                get: function(id, data) {
                    var cookies = document.cookie, parsed = {};
                    cookies.replace(/([^=]+)=([^;]*);?\s*/g, function(whole, key, value) {
                        parsed[key] = unescape(value);
                    });
                    return parsed[key_prefix+id];
                }
            };
        }
    }
};