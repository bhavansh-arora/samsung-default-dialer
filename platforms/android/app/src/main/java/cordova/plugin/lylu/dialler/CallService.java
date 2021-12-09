package cordova.plugin.lylu.dialler;

import android.os.Build;
import android.telecom.Call;
import android.telecom.InCallService;
import android.telecom.VideoProfile;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import org.json.JSONObject;

@RequiresApi(api = Build.VERSION_CODES.M)
public class CallService extends InCallService {

    private static Call call;
    private static CallbackContext ongoingCallStatusCallbackContext;
    private final Object callback = new Call.Callback() {
        @Override
        public void onStateChanged(Call call, int newState) {
            super.onStateChanged(call, newState);
            if (ongoingCallStatusCallbackContext != null) {
                ongoingCallStatusCallbackContext.sendPluginResult(_getCallStatusResult(call, newState));
            }
        }
    };

    public static void answer() {
        if (call == null)
            return;
        call.answer(VideoProfile.STATE_AUDIO_ONLY);
    }

    public static void hangup() {
        if (call == null)
            return;
        call.disconnect();
    }

    public static void setOngoingCallStatusCallbackContext(CallbackContext context) {
        ongoingCallStatusCallbackContext = context;
    }

    @Override
    public void onCallAdded(Call call) {
        super.onCallAdded(call);
        setCall(call);
    }

    @Override
    public void onCallRemoved(Call call) {
        super.onCallRemoved(call);
        setCall(null);
    }

    public final void setCall(@Nullable Call value) {
        if (call != null) {
            call.unregisterCallback((Call.Callback) callback);
        }

        if (value != null) {
            if (ongoingCallStatusCallbackContext != null) {
                ongoingCallStatusCallbackContext.sendPluginResult(_getCallStatusResult(value, value.getState()));
            }
            value.registerCallback((Call.Callback) callback);
        }

        call = value;
    }

    private PluginResult _getCallStatusResult(Call call, int state) {
        JSONObject res = new JSONObject();
        PluginResult result = null;
        try {
            res.put("number", call.getDetails().getHandle().getSchemeSpecificPart());
            res.put("statusCode", _getCallStatusCode(state));
            result = new PluginResult(PluginResult.Status.OK, res);
            result.setKeepCallback(true);
        } catch (JSONException e) {
            result = new PluginResult(PluginResult.Status.ERROR, e.getMessage());
            result.setKeepCallback(true);
        }
        return result;
    }


    private int _getCallStatusCode(int newState) {
        int lyluDiallerCallStatusCode = LyluDialler.UNKNOWN;
        switch (newState) {
            case 0: // "NEW"
                break;
            case 1:// "DIALING"
                lyluDiallerCallStatusCode = LyluDialler.DIALING;
                break;
            case 2:// "RINGING"
                lyluDiallerCallStatusCode = LyluDialler.RINGING;
                break;
            case 3:// "HOLDING"
                break;
            case 4:// "ACTIVE"
                lyluDiallerCallStatusCode = LyluDialler.ACTIVE;
                break;
            case 7:// "DISCONNECTED"
                lyluDiallerCallStatusCode = LyluDialler.DISCONNECTED;
                break;
            case 8:// "SELECT_PHONE_ACCOUNT"
                break;
            case 9:// "CONNECTING"
                lyluDiallerCallStatusCode = LyluDialler.CONNECTING;
                break;
            case 10:// "DISCONNECTING"
                break;
        }
        return lyluDiallerCallStatusCode;
    }
}
