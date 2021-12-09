package app.lylu.app;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.WallpaperManager;
import android.app.admin.DevicePolicyManager;
import android.app.admin.SystemUpdatePolicy;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.os.Build;
import android.os.UserManager;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import io.ionic.starter.MainActivity;

public class DeviceOwnerPolicyEnforcer {
    static DevicePolicyManager mDpm;
    static Context mContext;

    static String LYLU_DPM_SHARED_PREFS_NAME = "lylu_dpc_shared_prefs";

    public static int LYLU_PREF_DEFAULT_SCREEN_OFF_TIME_MS = 1000 * 60 * 10;
    public static int LYLU_PREF_KIOSK_SCREEN_OFF_TIME_MS = 1000 * 60 * 30;


    @RequiresApi(api = Build.VERSION_CODES.M)
    public static void startEnforcement(Context context, Activity activity) {
        mContext = context;
        ComponentName lyluDpm = new ComponentName(context.getApplicationContext(), DeviceOwner.class);
        mDpm = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);

        // Make this the default dialer activity?
        // Create an intent filter to specify the DIAL category.
        IntentFilter filter = new IntentFilter(Intent.ACTION_DIAL);

        // Set the activity as the preferred option for the device.
        ComponentName lyluActivityComponentName = new ComponentName(context.getApplicationContext(), MainActivity.class);
        mDpm.clearPackagePersistentPreferredActivities(lyluDpm, mContext.getPackageName());
        mDpm.addPersistentPreferredActivity(lyluDpm, filter, lyluActivityComponentName);

        Log.d("LyluDPC", "Added lylu main activity as default dialer activity.");

        autoGrantRequestedPermissionsToSelf(activity, context);
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public static void autoGrantRequestedPermissionsToSelf(Activity activity, Context context)  {
        String packageName = context.getPackageName();
        ComponentName adminComponentName = new ComponentName(context.getApplicationContext(), DeviceOwner.class);
        DevicePolicyManager dpm = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        dpm.setPermissionPolicy(adminComponentName, DevicePolicyManager.PERMISSION_POLICY_AUTO_GRANT);
        PackageInfo info = null;
        try {
            info = context.getPackageManager().getPackageInfo(packageName, PackageManager.GET_PERMISSIONS);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        List<String> permissions = new ArrayList<>(Arrays.asList(info.requestedPermissions));
        ActivityCompat.requestPermissions(activity, permissions.toArray(new String[0]), 101);
        for (String permission : new String[]{Manifest.permission.READ_CONTACTS, Manifest.permission.WRITE_CONTACTS, Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.CAMERA, Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.READ_PHONE_STATE, Manifest.permission.CALL_PHONE, Manifest.permission.GET_ACCOUNTS,
                Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.RECORD_AUDIO, Manifest.permission.READ_CONTACTS}) {

            boolean success = dpm.setPermissionGrantState(adminComponentName, packageName, permission, DevicePolicyManager.PERMISSION_GRANT_STATE_GRANTED);
            Log.d("LyluDPM", "Auto-granting " + permission + ", success: " + success);
            if (!success) {
                Log.e("LyluDPM", "Failed to auto grant permission to self: " + permission);
            }
        }
    }

    public static void clearKiosk(Context context) {
        ComponentName lyluDpm = new ComponentName(context.getApplicationContext(), DeviceOwner.class);
        DevicePolicyManager dpm = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        mDpm = dpm;
        dpm.clearPackagePersistentPreferredActivities(lyluDpm, context.getPackageName());
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_ADD_USER);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_MODIFY_ACCOUNTS);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_REMOVE_USER);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_SYSTEM_ERROR_DIALOGS);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_BLUETOOTH_SHARING);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_CONFIG_TETHERING);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_FACTORY_RESET);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_MOUNT_PHYSICAL_MEDIA);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_UNINSTALL_APPS);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_SAFE_BOOT);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_CONFIG_VPN);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_NETWORK_RESET);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_CONFIG_CREDENTIALS);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_CREATE_WINDOWS);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_SYSTEM_ERROR_DIALOGS);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_OUTGOING_BEAM);
        mDpm.clearUserRestriction(lyluDpm, UserManager.DISALLOW_USB_FILE_TRANSFER);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            dpm.setStatusBarDisabled(lyluDpm, false);
        }

        PackageManager pm = context.getPackageManager();
        Intent homeIntent = new Intent(Intent.ACTION_MAIN);
        homeIntent.addCategory(Intent.CATEGORY_HOME);
        List<ResolveInfo> infoList = pm.queryIntentActivities(homeIntent, PackageManager.MATCH_DEFAULT_ONLY);
        // Scan the list to find the first match that isn't my own app
        for (ResolveInfo info : infoList) {
            if (!context.getPackageName().equals(info.activityInfo.packageName)) {
                // This is the first match that isn't my package, so copy the
                //  package and class names into to the HOME Intent
                homeIntent.setClassName(info.activityInfo.packageName,
                        info.activityInfo.name);
                break;
            }
        }

        ComponentName manufacturerLauncherComponentName = homeIntent.getComponent();

        IntentFilter filter = new IntentFilter(Intent.ACTION_MAIN);
        filter.addCategory(Intent.CATEGORY_HOME);
        filter.addCategory(Intent.CATEGORY_DEFAULT);
        filter.addAction(Intent.ACTION_DIAL);

        mDpm.clearPackagePersistentPreferredActivities(lyluDpm, mContext.getPackageName());
        mDpm.setApplicationHidden(lyluDpm, "com.google.android.dialer", false);
        mDpm.addPersistentPreferredActivity(lyluDpm, filter, manufacturerLauncherComponentName);

        // Store the fact that the user disabled kiosk persistently. This way, the app will not auto-enforce anything.
        SharedPreferences settings = context.getSharedPreferences(LYLU_DPM_SHARED_PREFS_NAME, 0);
        SharedPreferences.Editor editor = settings.edit();

    }

    public static void dropDeviceOwnerPermissions() {
        if (mContext == null) {
            Log.d("LyluDPC", "No context, cannot drop permissions.");
            return;
        }
        Log.d("LyluDPC", "Dropping DO permissions.");
        ComponentName lyluDpm = new ComponentName(mContext.getApplicationContext(), DeviceOwner.class);
        mDpm = (DevicePolicyManager) mContext.getSystemService(Context.DEVICE_POLICY_SERVICE);

        clearKiosk(mContext);

        mDpm.clearPackagePersistentPreferredActivities(lyluDpm, mContext.getPackageName());

        mDpm.clearDeviceOwnerApp(mContext.getPackageName());
        System.exit(0);
    }

    /**
     * @return true if this app is a device owner and can enforce policies.
     */
    public static boolean canEnforce(Context context) {
        ComponentName lyluDpm = new ComponentName(context.getApplicationContext(), DeviceOwner.class);
        DevicePolicyManager dpm = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        return (dpm.isAdminActive(lyluDpm) && dpm.isDeviceOwnerApp(context.getPackageName()));
    }

    public static void registerBroadcastReceiver(Context context) {
        DeviceOwnerModificationIntentReceiver receiver = new DeviceOwnerModificationIntentReceiver();
        IntentFilter filter = new IntentFilter(DeviceOwnerModificationIntentReceiver.ACTION_CLEAR_KIOSK);
        filter.addAction(DeviceOwnerModificationIntentReceiver.ACTION_QUIT);
        filter.addAction(DeviceOwnerModificationIntentReceiver.ACTION_DROP_DEVICE_OWNER_PERMISSIONS);
        context.getApplicationContext().registerReceiver(receiver, filter);
    }
}
