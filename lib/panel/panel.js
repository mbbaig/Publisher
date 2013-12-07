// panel/panel.js - Publisher's module
// author: mbbaig
"use strict";

const {Cc, Ci, Cu, Cr} = require("chrome");

Cu.import("resource://gre/modules/XPCOMUtils.jsm");

//this.EXPORTED_SYMBOLS = ["PublisherPanel"];

//const EventEmitter = require("devtools/shared/event-emitter");
XPCOMUtils.defineLazyModuleGetter(this, "EventEmitter", "resource:///modules/devtools/shared/event-emitter.js");
const promise = require("sdk/core/promise");
var data = require("self").data;
//XPCOMUtils.defineLazyModuleGetter(this, "promise", "resource://gre/modules/commonjs/sdk/core/promise.js", "Promise")

this.PublisherPanel = function PublisherPanel(iframeWindow, toolbox) {
    this.panelWin = iframeWindow;
    this._toolbox = toolbox;
    this._destroyer = null;
    
    EventEmitter.decorate(this);
}
exports.PublisherPanel = PublisherPanel;

PublisherPanel.prototype = {
    open: function() {
        var tab = require("windows").browserWindows.activeWindow.tabs.activeTab;
        //console.log(tab);
         tab.attach({
            contentScriptFile : data.url("panel/text.js"),
            onMessage : function(dom) {
                console.log(dom);
            }
        });
        let panelWin = this.panelWin;
        let panelLoaded = promise.defer();
    
        /* Make sure the iframe content window is ready. */
        panelWin.addEventListener("load", function onLoad() {
          panelWin.removeEventListener("load", onLoad, true);
          panelLoaded.resolve();
        }, true);
        
        //.then(() => this.panelWin.startup(this._toolbox))
        
        return panelLoaded.promise
            .then(() => {
                this.isReady = true;
                this.emit("ready");
                return this;
            })
            .then(null, function onError(aReason) {
                Cu.reportError("Publisher open failed. " + 
                aReason.error + ": " + aReason.message);
        });
    },
    
    get target() {
        return this._toolbox.target;
    },
    
    destroy: function() {
        /*Make sure this panel is not already destroyed.*/
        if (this._destroyer) {
            return this._destroyer;
        }
        
        //this.panelWin.shutdown()
        return this._destroyer = function() {
                this.isReady = false;
                this.emit("destroyed");
                return promise.resolve();
            }.then(null, function onError(aReason) {
                Cu.reportError("Publisher destroy failed. " +
                aReason.error + ": " + aReason.message);
        });
    }
}