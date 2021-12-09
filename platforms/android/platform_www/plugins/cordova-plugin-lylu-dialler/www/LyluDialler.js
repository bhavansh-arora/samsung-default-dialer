cordova.define("cordova-plugin-lylu-dialler.LyluDialler", function(require, exports, module) {
var exec = require('cordova/exec');
var PLUGIN_NAME = 'LyluDialler';

function callNativeFunction(name, args, success, error) {
  args = args || [];
  success = success || function() {
  };
  error = error || function() {
  };
  exec(success, error, PLUGIN_NAME, name, args);

}


var dialler = {
  callNumber: function(number, success, error) {
    callNativeFunction('call', [number], success, error);
  },
  answer: function(success, error) {
    callNativeFunction('answer', [], success, error);
  },
  hangup: function(success, error) {
    callNativeFunction('hangup', [], success, error);
  },
  attachCallingStatusCallback: function(success, error) {
    callNativeFunction('attachCallingStatusCallback', [], success, error);
  },
  isMicrophoneMuted: function(on,success, error) {
    callNativeFunction('isMicrophoneMuted', [], success, error);
  },
  setMicrophoneMute: function(on,success, error) {
    callNativeFunction('setMicrophoneMute', [on], success, error);
  }
};

module.exports = dialler;

});
