import type { CSSProperties } from "react";
import type { ScheduleData } from "@/lib/schedule";

/**
 * Location colors. A schedule maps each distinct place label to a palette
 * index (`campusTone`, first-seen order). Tones index the `--color-loc-*`
 * custom properties in styles.css; undefined tone = neutral paper.
 */

export function locTone(data: ScheduleData, campus: string): number | undefined {
  if (!campus) return undefined;
  return data.campusTone[campus];
}

export function locVar(tone: number | undefined, suffix: "" | "-fg" | "-fill"): string {
  return tone === undefined
    ? `var(--color-${suffix === "-fill" ? "paper-elevated" : suffix === "-fg" ? "ink" : "ink-faint"})`
    : `var(--color-loc-${tone}${suffix})`;
}

/** Card/chip fill + readable foreground for a location. */
export function locFillStyle(
  data: ScheduleData,
  campus: string,
): CSSProperties {
  const tone = locTone(data, campus);
  return {
    backgroundColor: locVar(tone, "-fill"),
    color: locVar(tone, "-fg"),
  };
}

/** Solid accent (left bar, dot, legend swatch). */
export function locSolidStyle(
  data: ScheduleData,
  campus: string,
): CSSProperties {
  const tone = locTone(data, campus);
  return { backgroundColor: locVar(tone, "") };
}
