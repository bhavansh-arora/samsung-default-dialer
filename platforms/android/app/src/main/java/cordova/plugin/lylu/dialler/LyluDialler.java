package cordova.plugin.lylu.dialler;

import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.net.Uri;
import android.os.Build;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class LyluDialler extends CordovaPlugin {

    public static final int UNKNOWN = 0;
    public static final int DIALING = 1;
    public static final int RINGING = 2;
    public static final int DISCONNECTED = 3;
    public static final int CONNECTING = 4;
    public static final int ACTIVE = 5;


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("call")) {
            String number = args.getString(0);
            this.callNumber(number, callbackContext);
            return true;
        }
        if (action.equals("answer")) {
            PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                CallService.answer();
            }
            callbackContext.sendPluginResult(result);
            return true;
        }
        if (action.equals("hangup")) {
            PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                CallService.hangup();
            }
            callbackContext.sendPluginResult(result);
            return true;
        }
        if (action.equals("attachCallingStatusCallback")) {
            PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
            result.setKeepCallback(true);
            callbackContext.sendPluginResult(result);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                CallService.setOngoingCallStatusCallbackContext(callbackContext);
            }
            return true;
        }
        if (action.equals("isMicrophoneMuted")) {
            AudioManager audioManager = (AudioManager) cordova.getActivity().getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
            JSONObject result = new JSONObject();
            result.put("isMuted", audioManager.isMicrophoneMute());
            callbackContext.success(result);
            return true;
        }
        if (action.equals("setMicrophoneMute")) {
            boolean on = args.getBoolean(0);
            AudioManager audioManager = (AudioManager) cordova.getActivity().getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
            audioManager.setMode(AudioManager.MODE_IN_CALL);
            audioManager.setMicrophoneMute(on);
            callbackContext.success();
            return true;
        }
        return false;
    }

    private void callNumber(String number, CallbackContext callbackContext) {
        if (number != null && number.length() > 0) {
            Uri uri = Uri.parse("tel:" + number.trim());
            cordova.getContext().startActivity(new Intent(Intent.ACTION_CALL, uri));
            callbackContext.success();
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
