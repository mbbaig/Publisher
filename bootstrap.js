/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource:///modules/devtools/gDevTools.jsm");

XPCOMUtils.defineLazyGetter(this, "osString", () => Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULRuntime).OS);

XPCOMUtils.defineLazyGetter(this, "toolStrings", () => Services.strings.createBundle("chrome://publisher/locale/strings.properties"));

XPCOMUtils.defineLazyGetter(this, "toolDefinition", () => ({
  id: "publisher",
  ordinal: 99,
  key: toolStrings.GetStringFromName("Publisher.commandkey"),
  modifiers: osString == "Darwin" ? "accel,alt" : "accel,shift",
  icon: "chrome://publisher/skin/icon.png",
  url: "chrome://publisher/content/tool.xul",
  label: toolStrings.GetStringFromName("Publisher.label"),
  tooltip: toolStrings.GetStringFromName("Publisher.tooltip"),
  isTargetSupported: function(target) {
    return target.isLocalTab;
  },
  build: function(iframeWindow, toolbox) {
    Cu.import("chrome://publisher/content/panel.js");
    let panel = new AddonPanel(iframeWindow, toolbox);
    return panel.open();
  }
}));

function startup() {
  gDevTools.registerTool(toolDefinition);
}

function shutdown() {
  gDevTools.unregisterTool(toolDefinition);
  Services.obs.notifyObservers(null, "startupcache-invalidate", null);
}

function install() {
}

function uninstall() {
}
