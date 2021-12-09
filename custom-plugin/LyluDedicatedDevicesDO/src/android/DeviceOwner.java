package app.lylu.app;

import android.app.admin.DeviceAdminReceiver;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import org.apache.cordova.device.Device;

import io.ionic.starter.MainActivity;

/**
 *
 */
public class DeviceOwner extends DeviceAdminReceiver {

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public void onEnabled(Context context, Intent intent) {
        ComponentName lyluDpm = new ComponentName(context, DeviceOwner.class);
        DevicePolicyManager dpm = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);

        // Create an intent filter to specify the Home category.
        IntentFilter filter = new IntentFilter(Intent.ACTION_MAIN);
        filter.addCategory(Intent.CATEGORY_HOME);
        filter.addCategory(Intent.CATEGORY_DEFAULT);

        // Set the activity as the preferred option for the device.
        ComponentName activity = new ComponentName(context, MainActivity.class);
        dpm.addPersistentPreferredActivity(lyluDpm, filter, activity);

        dpm.setPermissionPolicy(lyluDpm, DevicePolicyManager.PERMISSION_POLICY_AUTO_GRANT);
    }

    @Override
    public CharSequence onDisableRequested(Context context, Intent intent) {
        return "";
    }

    @Override
    public void onDisabled(Context context, Intent intent) {}

    @Override
    public void onLockTaskModeEntering(Context context, Intent intent, String pkg) {}

    @Override
    public void onLockTaskModeExiting(Context context, Intent intent) {}
}
