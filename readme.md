# Android: Become the default dialer as a device owner on a Samsung Tablet

Our app is built on Angular, Ionic and Cordova. This sample project
contains the core problem:
The app is device owner and the LyluDedicatedDevicesDO plugin should ensure that it becomes
the default dialer on the system, so that the LyluDialer plugin can get a reference to the sytem's InCallService
and start handling call-related things such as hanging up, ringing, etc.

For this, we have tried applying the same principle as
https://developer.android.com/work/dpc/dedicated-devices/cookbook#be_the_home_app
which is to call
`addPersistentPreferredActivity()` using an intent filter for ACTION_DIAL or ACTION_CALL, for example.
None of that seemed to work.

When running the app as it is, you will notice that when you call someone, it is impossible to hang up.
Also, none of the "New call state: <>" logs are appearing.
This will work if the app is the default dialer. You can verify that by manually making the app the default dialer in the settings.

NOTE: We cannot use the system's default picker dialog to ask the user to change default apps.
The app MUST do that itself, so the ACTION_CHANGE_DEFAULT_DIALER intent cannot be used because it shows UI.

You might have grant the CALL_PHONE permission explicitly.
`adb shell pm grant io.ionic.starter android.permission.CALL_PHONE`

## How to build and work on this project
We are providing a native android project in `platform/android`.

If you want to build an android project from this ionic project yourself, run `ionic cordova build android` with the ionic cli installed.

This will build a native android project to `platforms/android`.
We recommend doing native code work in there. We assume that you won't have to do this.

## Make the app a device owner
Run `adb shell dpm set-device-owner io.ionic.starter/app.lylu.app.DeviceOwner`.

## Remove the device owner permissions
If you installed the app as TEST_ONLY, you can simply run
`adb shell dpm remove-active-admin io.ionic.starter/app.lylu.app.DeviceOwner`.

If the app was not installe das TEST_ONLY, you can ask it to drop its permissions itself.
Run ` adb shell am broadcast -a io.ionic.starter.intent.dropdeviceownerpermissions`.

Then you can uninstall the app.


## Expected behaviour
1. If the app is not a device owner and you call a number, the system's default dialer will be opened on top of the app to handle the call.
2. If the app is a device owner, the same thing happens as the app is still not the default dialer.
3. When set as the default dialer in the device settings manually, the app shows its own UI and allows you to hang up a call, mute your microphone etc.
4. We want the behaviour of 3. but without doing any setup manually. The device owner code should make the app the default dialer.  

Don't worry about the UI - for example, it doesn't notice when a call is hung up, the "end call" button only ends the call and doesn't navigate back - you'll have to use the android navigation bar for that.
The "call duration" will also continue to go up after hanging up, which is fine as long as the call actually ended.
