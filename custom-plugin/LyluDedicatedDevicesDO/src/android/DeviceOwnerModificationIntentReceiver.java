package app.lylu.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class DeviceOwnerModificationIntentReceiver extends BroadcastReceiver {

    final static String ACTION_DROP_DEVICE_OWNER_PERMISSIONS = "app.lylu.app.intent.dropdeviceownerpermissions";
    final static String ACTION_CLEAR_KIOSK = "app.lylu.app.intent.clearkiosk";
    final static String ACTION_QUIT = "app.lylu.app.intent.quit";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("LyluDOMIR", "Received intent: " + intent);
        switch (intent.getAction()) {
            case ACTION_DROP_DEVICE_OWNER_PERMISSIONS:
                DeviceOwnerPolicyEnforcer.dropDeviceOwnerPermissions();
                break;
            case ACTION_CLEAR_KIOSK:
                DeviceOwnerPolicyEnforcer.clearKiosk(context);
                System.exit(0);
                break;
            case ACTION_QUIT:
                Log.d("LyluDOMIR", "Quitting.");
                System.exit(0);
        }

    }
}
