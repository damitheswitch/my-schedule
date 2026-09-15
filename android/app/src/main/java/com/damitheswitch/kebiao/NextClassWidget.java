package com.damitheswitch.kebiao;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

import org.json.JSONObject;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * Home-screen widget: shows the next class at a glance. Reads the schedule
 * JSON the WebView pushed into SharedPreferences — no network, no server.
 * Refreshed on schedule change, every half hour (updatePeriodMillis), and when
 * a reminder fires.
 */
public class NextClassWidget extends AppWidgetProvider {

    private static final DateTimeFormatter DAY_FMT =
            DateTimeFormatter.ofPattern("EEE d MMM", Locale.getDefault());

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        for (int id : ids) {
            manager.updateAppWidget(id, buildView(context));
        }
    }

    public static void updateAll(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        int[] ids = manager.getAppWidgetIds(
                new ComponentName(context, NextClassWidget.class));
        if (ids.length > 0) {
            for (int id : ids) {
                manager.updateAppWidget(id, buildView(context));
            }
        }
    }

    private static RemoteViews buildView(Context context) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_next_class);

        JSONObject root = ScheduleSnapshot.parse(context);
        ScheduleSnapshot.Entry next =
                root == null ? null : ScheduleSnapshot.nextClass(root, LocalDate.now(), LocalTime.now());

        if (next == null) {
            views.setTextViewText(R.id.widget_course, "No upcoming classes");
            views.setTextViewText(R.id.widget_when, "");
            views.setTextViewText(R.id.widget_where, "Open Kebiao to set up your schedule");
        } else {
            views.setTextViewText(R.id.widget_course, next.course);
            String when = next.date.equals(LocalDate.now())
                    ? "Today " + next.start + "–" + next.end
                    : next.date.format(DAY_FMT) + " " + next.start + "–" + next.end;
            views.setTextViewText(R.id.widget_when, when);
            views.setTextViewText(R.id.widget_where,
                    next.place.isEmpty() ? " " : next.place);
        }

        Intent open = new Intent(context, MainActivity.class);
        PendingIntent pi = PendingIntent.getActivity(
                context, 0, open, PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_root, pi);
        return views;
    }
}
