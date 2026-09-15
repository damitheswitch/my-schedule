package com.damitheswitch.kebiao;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Re-arms class reminders after a reboot — alarms don't survive one. */
public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
            ReminderScheduler.reschedule(context);
            NextClassWidget.updateAll(context);
        }
    }
}
