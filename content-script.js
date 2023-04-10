({

    parameters: {
        selector: "#player .ytp-autonav-toggle-button[aria-checked=true]",
        interval: 5000,
        logPrefix: "[" + chrome.runtime.getManifest().name + "] ",
    },

    start: function()
    {
        let thisInstance = this;
        this.log("starting to check every " + this.parameters.interval + "ms");
        setInterval(
            function() {
                thisInstance.checkAutonavToggle();
            },
            this.parameters.interval
        );
    },

    checkAutonavToggle: function() {
        let toggle = this.findVisibleAutonavToggle();
        if(toggle !== null) {
            this.log("triggering a click on the autonav toggle");
            toggle.click();
        }
    },

    findVisibleAutonavToggle: function() {
        let toggles = Array.prototype.slice.call(
            document.querySelectorAll(this.parameters.selector)
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
        console.log(this.parameters.logPrefix + message);
    },

}).start();
