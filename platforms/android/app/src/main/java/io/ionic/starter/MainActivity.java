/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

/*
Note: This is a patched MainActivity file. Cordova generates a MainActivity.java,
and this is an extended version of it that also initializes our dpc and our update
service. This file is copied over the generated java file using a hook.
See plugin.xml in LyluDedicatedDevicesDO/.
*/

package io.ionic.starter;

import android.content.Context;
import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.media.AudioManager;

import org.apache.cordova.*;
import org.apache.cordova.device.Device;

import java.util.Timer;
import java.util.TimerTask;

import app.lylu.app.DeviceOwnerPolicyEnforcer;
import me.weishu.reflection.Reflection;


public class MainActivity extends CordovaActivity {

    AudioManager audioManager;

    boolean isVolDownPressed = false;
    boolean isVolUpPressed = false;
    boolean isCheatTimerRunning = false;

    private float volUpKeyPressTimer = 0.0f;
    private float volDownKeyPressTimer = 0.0f;

    private int volUpCounter = 0;
    private int volDownCounter = 0;
    private int cheatStep = 0;
    // unten unten oben unten unten oben


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // The entire device owner / kiosk mode code runs instantly. Lock task restarts the app
        //  so running anything else before it will make the app take ages to start.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
            && DeviceOwnerPolicyEnforcer.canEnforce(this)) {
            Log.d("LyluMain", "The app is a device owner.");
            DeviceOwnerPolicyEnforcer.registerBroadcastReceiver(this);
            DeviceOwnerPolicyEnforcer.startEnforcement(this, this);
            // DeviceOwnerPolicyEnforcer.clearKiosk(this, this);
            DeviceOwnerPolicyEnforcer.autoGrantRequestedPermissionsToSelf(this,this);
        }

        Log.d("LyluMain", "DeviceOwner enforcement setup complete.");

        audioManager = (AudioManager) getApplicationContext().getSystemService(Context.AUDIO_SERVICE);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }

    @Override
    protected void onResume() {
        super.onResume();
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        Log.v("LyluMainActivity", "Dispatching key event: " + event);
        boolean result;
        switch (event.getKeyCode()) {
            case KeyEvent.KEYCODE_VOLUME_UP:
                audioManager.adjustVolume(AudioManager.ADJUST_RAISE, AudioManager.FLAG_PLAY_SOUND);

                result = true;
                break;
            case KeyEvent.KEYCODE_VOLUME_DOWN:
                audioManager.adjustVolume(AudioManager.ADJUST_LOWER, AudioManager.FLAG_PLAY_SOUND);
                result = true;

                break;
            default:
                result = super.dispatchKeyEvent(event);
                break;
        }
        return result;
    }

    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(newBase);
        Reflection.unseal(newBase);
    }
}
