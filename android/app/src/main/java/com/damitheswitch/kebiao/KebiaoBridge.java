package com.damitheswitch.kebiao;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.webkit.JavascriptInterface;

/**
 * JS bridge exposed to the WebView as `window.Kebiao`. The app pushes its
 * localStorage schedule (courses + meetings + term + reminder prefs) here on
 * every change; the widget and reminder alarms read it from SharedPreferences.
 */
public class KebiaoBridge {

    private final Activity activity;

    public KebiaoBridge(Activity activity) {
        this.activity = activity;
    }

    /** Called by the web app whenever the schedule or reminder prefs change. */
    @JavascriptInterface
    public void setSchedule(String json) {
        Context ctx = activity.getApplicationContext();
        SharedPreferences prefs = ctx.getSharedPreferences(ScheduleSnapshot.PREFS, Context.MODE_PRIVATE);
        prefs.edit().putString(ScheduleSnapshot.KEY_SCHEDULE, json).apply();

        NextClassWidget.updateAll(ctx);
        ReminderScheduler.reschedule(ctx);

        // Android 13+ needs the runtime notification permission for reminders.
        org.json.JSONObject root = ScheduleSnapshot.parse(ctx);
        if (root != null && ScheduleSnapshot.remindersEnabled(root)) {
            maybeRequestNotificationPermission();
        }
    }

    @JavascriptInterface
    public String getSchedule() {
        return ScheduleSnapshot.readJson(activity.getApplicationContext());
    }

    @JavascriptInterface
    public String platform() {
        return "android";
    }

    private void maybeRequestNotificationPermission() {
        if (Build.VERSION.SDK_INT < 33) return;
        if (activity.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                == PackageManager.PERMISSION_GRANTED) return;
        activity.runOnUiThread(() ->
                activity.requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 42));
    }
}
