var Widget = require("widget").Widget;
var data = require("self").data;

exports.main = function() {
    new Widget({
        id : "mbbaig-widget-1",
        label : "Publisher Widget",
        contentURL : data.url("icons/icon.png"),

        // Add a function to trigger when the Widget is clicked.
        onClick : function(event) {
            var tab = require("windows").browserWindows.activeWindow.tabs.activeTab;
            tab.attach({
                contentScript : "self.postMessage(document.documentElement.outerHTML);",
                onMessage : function(page)
                {
                    //console.log("Tab data received: " + data);
                    var panel = require("sdk/panel").Panel({
                      width : 503,
                      height : 500,
                      contentURL : data.url("text.html"),
                      contentScriptFile : data.url("text.js"),
                      contentScriptOptions : page
                    }).show();
                    panel.on("show", function() {
                      panel.port.emit("show");
                    });
                }
            });
        }
    });
};
