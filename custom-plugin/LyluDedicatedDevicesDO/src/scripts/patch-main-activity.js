const fs = require("fs");

const PLUGIN_NAME = "LyluDedicatedDevicesDO";

const PatchedMainActivityPath = "./custom-plugin/LyluDedicatedDevicesDO/src/android/MainActivity.java"
const RealMainActivityPath = "./platforms/android/app/src/main/java/io/ionic/starter/MainActivity.java";

function log(message) {
  console.log(PLUGIN_NAME + ": " + message);
}

function onError(error) {
  log("ERROR: " + error);
}

function run() {
  fs.copyFileSync(PatchedMainActivityPath, RealMainActivityPath);
  log('Patched MainActivity.java.');
}

module.exports = function() {
  return new Promise((resolve, reject) => {
    try {
      run();
      resolve();
    } catch (e) {
      onError("EXCEPTION: " + e.toString());
      reject(e);
    }
  });
}
