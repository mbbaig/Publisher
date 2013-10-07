/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyModuleGetter(this, "EventEmitter", "resource:///modules/devtools/shared/event-emitter.js");
XPCOMUtils.defineLazyModuleGetter(this, "promise", "resource://gre/modules/commonjs/sdk/core/promise.js", "Promise");
XPCOMUtils.defineLazyModuleGetter(this, "tabs", "resource://gre/modules/commonjs/sdk/tabs.js");

//var { Ci } = require('chrome');
//var u = require('sdk/window/utils');

function startup(aToolbox) {
  return promise.resolve(null);
}

function shutdown() {
  return promise.resolve(null);
}

tabs.on('activate', function () {
  console.log('active: ' + tabs.activeTab.url);
});

function showDOM() {
  //alert(inspector.window.document.getElementsByTagName("*"));
  //var browserWindow = u.getMostRecentBrowserWindow();
  //var window = browserWindow.content;
  //alert(browserWindow.content.document);
}