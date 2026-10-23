import type { Phase } from "@/data/types";

export const sessionLengths = [60, 90, 120] as const;
export type SessionLength = (typeof sessionLengths)[number];

/**
 * Scale phase durations proportionally to a new total, rounding to whole
 * minutes while guaranteeing the result sums exactly to `totalMinutes` and that
 * every phase keeps at least 1 minute. Uses the largest-remainder method.
 */
export function scalePhases(phases: Phase[], totalMinutes: number): Phase[] {
  if (phases.length === 0) return [];
  const base = phases.reduce((s, p) => s + p.minutes, 0);
  const total = Math.max(totalMinutes, phases.length);
  if (base <= 0) {
    const even = Math.floor(total / phases.length);
    return phases.map((p, i) => ({
      ...p,
      minutes: even + (i < total - even * phases.length ? 1 : 0),
    }));
  }

  const exact = phases.map((p) => (p.minutes / base) * total);
  const floored = exact.map((x) => Math.max(1, Math.floor(x)));
  let diff = total - floored.reduce((s, m) => s + m, 0);

  // Order by largest fractional remainder (ties: earlier phase first).
  const order = exact
    .map((x, i) => ({ i, frac: x - Math.floor(x) }))
    .sort((a, b) => b.frac - a.frac || a.i - b.i);

  let k = 0;
  while (diff > 0) {
    floored[order[k % order.length].i] += 1;
    diff -= 1;
    k += 1;
  }
  // If the 1-minute floor pushed us over, take minutes back from the longest phases.
  while (diff < 0) {
    const longest = floored.reduce((best, m, i) => (m > floored[best] ? i : best), 0);
    if (floored[longest] <= 1) break;
    floored[longest] -= 1;
    diff += 1;
  }

  return phases.map((p, i) => ({ ...p, minutes: floored[i] }));
}

/** Format seconds as m:ss (or h:mm:ss); negative values become "+m:ss" (overtime). */
export function formatClock(totalSeconds: number): string {
  const negative = totalSeconds < 0;
  const s = Math.abs(Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const body =
    h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
      : `${m}:${String(sec).padStart(2, "0")}`;
  return negative ? `+${body}` : body;
}

/** Minute offset at which each phase starts. */
export function phaseStarts(phases: Phase[]): number[] {
  const starts: number[] = [];
  let acc = 0;
  for (const p of phases) {
    starts.push(acc);
    acc += p.minutes;
  }
  return starts;
}
