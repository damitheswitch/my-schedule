package com.damitheswitch.kebiao;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONObject;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Parses the schedule JSON the WebView pushes through KebiaoBridge and answers
 * the two questions the native layer needs: "what's the next class?" (widget)
 * and "when do reminders fire?" (ReminderScheduler).
 *
 * The JSON shape mirrors the web app's localStorage payload:
 * { courses:[{id,name,short}], meetings:[{courseId,campus,day,start,end,room,
 * weeks:[]}], term:{label,startMonday,weeks}, reminders:{enabled,leadMin} }
 */
public final class ScheduleSnapshot {

    public static final String PREFS = "kebiao";
    public static final String KEY_SCHEDULE = "schedule_json";

    public static final String[] DAYS = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};

    public static final class Entry {
        public final String course;
        public final String place;
        public final LocalDate date;
        public final LocalTime start;
        public final LocalTime end;

        Entry(String course, String place, LocalDate date, LocalTime start, LocalTime end) {
            this.course = course;
            this.place = place;
            this.date = date;
            this.start = start;
            this.end = end;
        }
    }

    private ScheduleSnapshot() {}

    public static String readJson(Context ctx) {
        SharedPreferences prefs = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        return prefs.getString(KEY_SCHEDULE, null);
    }

    public static JSONObject parse(Context ctx) {
        try {
            String raw = readJson(ctx);
            return raw == null ? null : new JSONObject(raw);
        } catch (Exception e) {
            return null;
        }
    }

    public static boolean remindersEnabled(JSONObject root) {
        JSONObject r = root.optJSONObject("reminders");
        return r != null && r.optBoolean("enabled", false);
    }

    public static int leadMinutes(JSONObject root) {
        JSONObject r = root.optJSONObject("reminders");
        int v = r != null ? r.optInt("leadMin", 10) : 10;
        return v <= 0 ? 10 : v;
    }

    /**
     * The next class on or after now, or null when the term is over / empty.
     * Scans the current week day-by-day, then later weeks in order.
     */
    public static Entry nextClass(JSONObject root, LocalDate today, LocalTime now) {
        List<Entry> upcoming = upcoming(root, today, now, 1);
        return upcoming.isEmpty() ? null : upcoming.get(0);
    }

    /**
     * Upcoming class occurrences starting `limit` from now. Meetings are weekly
     * patterns over term weeks; we expand the current and following weeks.
     */
    public static List<Entry> upcoming(JSONObject root, LocalDate today, LocalTime now, int limit) {
        List<Entry> out = new ArrayList<>();
        try {
            JSONObject term = root.optJSONObject("term");
            if (term == null) return out;
            LocalDate week1 = LocalDate.parse(term.getString("startMonday"));
            int termWeeks = term.optInt("weeks", 16);

            Map<String, String> courseNames = new HashMap<>();
            JSONArray courses = root.optJSONArray("courses");
            if (courses != null) {
                for (int i = 0; i < courses.length(); i++) {
                    JSONObject c = courses.getJSONObject(i);
                    String shortName = c.optString("short", c.optString("name", c.getString("id")));
                    courseNames.put(c.getString("id"), shortName);
                }
            }

            JSONArray meetings = root.optJSONArray("meetings");
            if (meetings == null || meetings.length() == 0) return out;

            long daysSinceStart = ChronoUnit.DAYS.between(week1, today);
            int currentWeek = (int) Math.floor(daysSinceStart / 7.0) + 1;
            // Before week 1, everything is upcoming; after the term, nothing is.
            if (currentWeek < 1) currentWeek = 1;
            if (currentWeek > termWeeks) return out;

            for (int week = currentWeek; week <= termWeeks && out.size() < limit; week++) {
                List<Entry> inWeek = new ArrayList<>();
                for (int i = 0; i < meetings.length(); i++) {
                    JSONObject m = meetings.getJSONObject(i);
                    if (!weekOccurs(m.optJSONArray("weeks"), week)) continue;
                    int dayIdx = dayIndex(m.optString("day", ""));
                    if (dayIdx < 0) continue;
                    LocalDate date = week1.plusWeeks(week - 1).plusDays(dayIdx);
                    LocalTime start = LocalTime.parse(m.getString("start"));
                    LocalTime end = LocalTime.parse(m.getString("end"));
                    // Skip classes already over today.
                    if (week == currentWeek && date.isBefore(today)) continue;
                    if (date.equals(today) && !end.isAfter(now)) continue;
                    String place = joinNonEmpty(" ",
                            m.optString("campus", ""), m.optString("room", ""));
                    String course = courseNames.getOrDefault(
                            m.optString("courseId", ""), m.optString("courseId", "Class"));
                    inWeek.add(new Entry(course, place, date, start, end));
                }
                inWeek.sort((a, b) -> {
                    int d = a.date.compareTo(b.date);
                    return d != 0 ? d : a.start.compareTo(b.start);
                });
                for (Entry e : inWeek) {
                    if (out.size() >= limit) break;
                    out.add(e);
                }
            }
        } catch (Exception e) {
            return out;
        }
        return out;
    }

    private static boolean weekOccurs(JSONArray weeks, int week) {
        if (weeks == null) return false;
        for (int i = 0; i < weeks.length(); i++) {
            if (weeks.optInt(i) == week) return true;
        }
        return false;
    }

    public static int dayIndex(String day) {
        for (int i = 0; i < DAYS.length; i++) {
            if (DAYS[i].equals(day)) return i;
        }
        return -1;
    }

    private static String joinNonEmpty(String sep, String a, String b) {
        if (a == null || a.isEmpty()) return b == null ? "" : b;
        if (b == null || b.isEmpty()) return a;
        return a + sep + b;
    }
}
