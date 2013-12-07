"uses strict";

const {Cc, Ci, Cu, Cr} = require("chrome");

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource:///modules/devtools/gDevTools.jsm");

var data = require("self").data;

XPCOMUtils.defineLazyGetter(this, "osString", () => Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULRuntime).OS);

let events = require("sdk/system/events");
//const EventEmitter = require("modules/devtools/shared/event-emitter");
//XPCOMUtils.defineLazyModuleGetter(this, "EventEmitter", "resource:///modules/devtools/shared/event-emitter.js");
const promise = require("sdk/core/promise");
var l10n = require("l10n").get;

/* Panel */
XPCOMUtils.defineLazyGetter(this, "PublisherPanel", () => require("panel/panel").PublisherPanel);

/* Strings */
//const publisherProps = data.url("locale/en-US/publisher.properties");
//XPCOMUtils.defineLazyGetter(this, "publisherStrings", () => Services.strings.createBundle(publisherProps));
//console.log(Cu.import(data.url("panel/panel.js")));
//XPCOMUtils.defineLazyGetter(this, "toolDefinition", () => ({
gDevTools.registerTool(toolDefinition = {
    id: "publisher",
    ordinal: 99,
    icon: data.url("icons/icon.png"),
    url: data.url("panel/text.html"),
    label: l10n("Publisher"),
    tooltip: l10n("Send to Thimble"),
    inMenu: false,
    
    isTargetSupported: function(target) {
        return true;
    },
    
    build: function(iframeWindow, toolbox) {
        let panel = new PublisherPanel(iframeWindow, toolbox);
        //console.log(panel.open());
        return panel.open();
    }
});

function startup() {
    ////gDevTools.registerTool(toolDefinition);
    panel.getDOM();
}

function shutdown() {
    ////gDevTools.unregisterTool(toolDefinition);
    Services.obs.notifyObservers(null, "startupcache-invalidate", null);
}

function install() {
}

function uninstall() {
}

/*var Widget = require("widget").Widget;
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
};*/
