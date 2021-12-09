cordova.define("cordova-plugin-lylu-dialler.LyluDiallerCallStatus", function(require, exports, module) {
'use strict';
/**
 *  LyluDiallerCallStatus.
 *  An status code assigned by an implementation when an call status has changed
 * @constructor
 */
var LyluDiallerCallStatus = function(status) {
  this.code = (typeof status != 'undefined' ? status : null);
};

/**
 * status codes
 */
LyluDiallerCallStatus.UNKNOWN = 0;
LyluDiallerCallStatus.DIALING = 1;
LyluDiallerCallStatus.RINGING = 2;
LyluDiallerCallStatus.DISCONNECTED = 3;
LyluDiallerCallStatus.CONNECTING = 4;
LyluDiallerCallStatus.ACTIVE = 5;
module.exports = LyluDiallerCallStatus;

});
