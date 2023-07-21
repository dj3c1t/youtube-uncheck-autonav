(function() {

    "use strict";

    let o = {

        parameters: {
            selector: "#player .ytp-autonav-toggle-button[aria-checked=true]",
            interval: 5000,
            logPrefix: "[" + chrome.runtime.getManifest().name + "] ",
        },

        start: function()
        {
            o.log("starting to check every " + o.parameters.interval + "ms");
            setInterval(
                function() {
                    o.step();
                },
                o.parameters.interval
            );
            o.step();
        },

        step: function() {
            o.checkAutonavToggle();
            o.hideInFeedAds();
        },

        checkAutonavToggle: function() {
            let toggle = o.findVisibleAutonavToggle();
            if(toggle !== null) {
                o.log("triggering a click on the autonav toggle");
                toggle.click();
            }
        },

        hideInFeedAds: function() {
            let ads = document.getElementsByClassName('style-scope ytd-in-feed-ad-layout-renderer');
            for(let i = 0; i < ads.length; i++) {
                ads.item(i).style.display = "none";
            };
        },

        findVisibleAutonavToggle: function() {
            let toggles = Array.prototype.slice.call(
                document.querySelectorAll(o.parameters.selector)
            ).filter(function(item, index) {
                // a not so 'cross-browser' way to filter only visible elements
                // this might not always work
                return item.offsetParent !== null;
            });
            if(toggles.length) {
                return toggles[0];
            }
            return null;
        },

        log: function(message) {
            console.log(o.parameters.logPrefix + message);
        },

    };

    return o;

})().start();
