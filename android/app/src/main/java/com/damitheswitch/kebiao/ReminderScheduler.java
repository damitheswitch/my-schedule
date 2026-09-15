package com.damitheswitch.kebiao;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import org.json.JSONObject;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;

/**
 * Schedules "class in N minutes" alarms from the stored schedule snapshot.
 * Keeps the next few firings armed (re-armed on schedule change, on boot, and
 * each time a reminder fires).
 */
public final class ReminderScheduler {

    private static final int MAX_PENDING = 10;

    private ReminderScheduler() {}

    public static void reschedule(Context context) {
        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        JSONObject root = ScheduleSnapshot.parse(context);

        // Always cancel our known slots first — stale alarms must not fire.
        for (int i = 0; i < MAX_PENDING; i++) {
            PendingIntent existing = pending(context, i, null, 0);
            if (existing != null) am.cancel(existing);
        }
        if (root == null || !ScheduleSnapshot.remindersEnabled(root)) return;

        int lead = ScheduleSnapshot.leadMinutes(root);
        List<ScheduleSnapshot.Entry> upcoming =
                ScheduleSnapshot.upcoming(root, LocalDate.now(), LocalTime.now(), MAX_PENDING + 4);

        int slot = 0;
        long nowMs = System.currentTimeMillis();
        for (ScheduleSnapshot.Entry e : upcoming) {
            if (slot >= MAX_PENDING) break;
            LocalDateTime fire = e.date.atTime(e.start).minusMinutes(lead);
            long atMs = fire.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
            if (atMs <= nowMs) continue;
            schedule(context, am, slot++, atMs, e, lead);
        }
    }

    private static void schedule(Context context, AlarmManager am, int slot,
                                 long atMs, ScheduleSnapshot.Entry e, int lead) {
        PendingIntent pi = pending(context, slot, e, lead);
        if (pi == null) return;
        if (Build.VERSION.SDK_INT >= 31 && !am.canScheduleExactAlarms()) {
            // Permission denied (Android 14+) — inexact is still useful.
            am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, atMs, pi);
        } else {
            am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, atMs, pi);
        }
    }

    private static PendingIntent pending(Context context, int slot,
                                         ScheduleSnapshot.Entry e, int lead) {
        Intent intent = new Intent(context, ReminderReceiver.class);
        if (e != null) {
            intent.putExtra("course", e.course);
            intent.putExtra("place", e.place);
            intent.putExtra("start", e.start.toString());
            intent.putExtra("end", e.end.toString());
            intent.putExtra("lead", lead);
        }
        return PendingIntent.getBroadcast(
                context,
                slot,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }
}
