import { describe, expect, it } from "vitest";
import { standardPhases } from "@/data/missions";
import { formatClock, phaseStarts, scalePhases } from "@/lib/timer";

const sum = (xs: { minutes: number }[]) => xs.reduce((s, p) => s + p.minutes, 0);

describe("scalePhases", () => {
  it.each([60, 90, 120, 45, 7])("sums exactly to %i minutes", (total) => {
    const scaled = scalePhases(standardPhases, total);
    expect(sum(scaled)).toBe(total);
    expect(scaled.every((p) => p.minutes >= 1)).toBe(true);
    expect(scaled.map((p) => p.name)).toEqual(standardPhases.map((p) => p.name));
  });

  it("keeps the default plan unchanged at 90 minutes", () => {
    expect(scalePhases(standardPhases, 90).map((p) => p.minutes)).toEqual(
      standardPhases.map((p) => p.minutes),
    );
  });
});

describe("formatClock", () => {
  it("formats normal, long and overtime values", () => {
    expect(formatClock(65)).toBe("1:05");
    expect(formatClock(0)).toBe("0:00");
    expect(formatClock(3725)).toBe("1:02:05");
    expect(formatClock(-30)).toBe("+0:30");
  });
});

describe("phaseStarts", () => {
  it("returns cumulative start minutes", () => {
    expect(phaseStarts(standardPhases)).toEqual([0, 10, 20, 40, 60, 75, 85]);
  });
});
