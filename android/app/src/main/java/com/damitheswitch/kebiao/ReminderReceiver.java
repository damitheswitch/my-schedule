package com.damitheswitch.kebiao;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Icon;
import android.os.Build;

/**
 * Fires one class reminder notification, then re-arms the queue so later
 * classes keep their reminders even after reboots and schedule edits.
 */
public class ReminderReceiver extends BroadcastReceiver {

    public static final String CHANNEL = "classes";

    @Override
    public void onReceive(Context context, Intent intent) {
        String course = intent.getStringExtra("course");
        String place = intent.getStringExtra("place");
        String start = intent.getStringExtra("start");
        String end = intent.getStringExtra("end");
        int lead = intent.getIntExtra("lead", 10);

        if (course != null) {
            NotificationManager nm =
                    (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            if (Build.VERSION.SDK_INT >= 26) {
                nm.createNotificationChannel(new NotificationChannel(
                        CHANNEL, "Class reminders", NotificationManager.IMPORTANCE_HIGH));
            }
            Intent open = new Intent(context, MainActivity.class);
            PendingIntent pi = PendingIntent.getActivity(
                    context, 0, open, PendingIntent.FLAG_IMMUTABLE);

            String body = start + "–" + end + (place == null || place.isEmpty() ? "" : " · " + place);
            android.app.Notification n = new android.app.Notification.Builder(context, CHANNEL)
                    .setSmallIcon(Icon.createWithResource(context, R.mipmap.ic_launcher))
                    .setContentTitle(course + " in " + lead + " min")
                    .setContentText(body)
                    .setContentIntent(pi)
                    .setAutoCancel(true)
                    .build();
            nm.notify((int) (System.currentTimeMillis() & 0x7fffffff), n);
        }

        // Re-arm the next batch and refresh the widget.
        ReminderScheduler.reschedule(context);
        NextClassWidget.updateAll(context);
    }
}
