cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-ionic-keyboard.keyboard",
      "file": "plugins/cordova-plugin-ionic-keyboard/www/android/keyboard.js",
      "pluginId": "cordova-plugin-ionic-keyboard",
      "clobbers": [
        "window.Keyboard"
      ]
    },
    {
      "id": "cordova-plugin-ionic-webview.IonicWebView",
      "file": "plugins/cordova-plugin-ionic-webview/src/www/util.js",
      "pluginId": "cordova-plugin-ionic-webview",
      "clobbers": [
        "Ionic.WebView"
      ]
    },
    {
      "id": "cordova-plugin-lylu-dedicated-devices-do.LyluDedicatedDevicesDO",
      "file": "plugins/cordova-plugin-lylu-dedicated-devices-do/www/LyluDedicatedDevicesDO.js",
      "pluginId": "cordova-plugin-lylu-dedicated-devices-do",
      "clobbers": [
        "cordova.plugins.LyluDedicatedDevicesDO",
        "LyluDedicatedDevicesDO"
      ]
    },
    {
      "id": "cordova-plugin-lylu-dialler.LyluDialler",
      "file": "plugins/cordova-plugin-lylu-dialler/www/LyluDialler.js",
      "pluginId": "cordova-plugin-lylu-dialler",
      "clobbers": [
        "LyluDialler",
        "cordova.plugins.LyluDialler"
      ]
    },
    {
      "id": "cordova-plugin-lylu-dialler.LyluDiallerCallStatus",
      "file": "plugins/cordova-plugin-lylu-dialler/www/LyluDiallerCallStatus.js",
      "pluginId": "cordova-plugin-lylu-dialler",
      "clobbers": [
        "LyluDiallerCallStatus"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-androidx-adapter": "1.1.3",
    "cordova-plugin-device": "2.0.2",
    "cordova-plugin-ionic-keyboard": "2.2.0",
    "cordova-plugin-ionic-webview": "4.2.1",
    "cordova-plugin-lylu-dedicated-devices-do": "1.0.0",
    "cordova-plugin-lylu-dialler": "1.0",
    "cordova-plugin-splashscreen": "5.0.2",
    "cordova-plugin-statusbar": "2.4.2",
    "cordova-plugin-whitelist": "1.3.3"
  };
});