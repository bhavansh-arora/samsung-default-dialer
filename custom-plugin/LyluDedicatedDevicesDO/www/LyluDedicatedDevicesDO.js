var exec = require('cordova/exec');

const PLUGIN_NAME = 'LyluDedicatedDevicesDO';

function callNativeFunction(name, args, success, error) {
  args = args || [];
  success = success || function () {};
  error = error || function () {};
  exec(success, error, PLUGIN_NAME, name, args);
}

const dddo = {

};

module.exports = dddo;
