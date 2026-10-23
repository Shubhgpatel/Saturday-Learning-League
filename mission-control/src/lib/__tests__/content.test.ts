import { describe, expect, it } from "vitest";
import { missions, missionMinutes } from "@/data/missions";
import { twistCategories, twists } from "@/data/twists";

describe("mission content", () => {
  it("has exactly 4 missions with unique ids", () => {
    expect(missions).toHaveLength(4);
    expect(new Set(missions.map((m) => m.id)).size).toBe(4);
  });

  it.each(missions.map((m) => [m.id, m] as const))("%s fits a 60–120 minute session", (_, m) => {
    const total = missionMinutes(m);
    expect(total).toBe(m.defaultMinutes);
    expect(total).toBeGreaterThanOrEqual(60);
    expect(total).toBeLessThanOrEqual(120);
    expect(m.phases.filter((p) => p.twistWindow)).toHaveLength(1);
  });

  it.each(missions.map((m) => [m.id, m] as const))("%s has complete brief and facilitator notes", (_, m) => {
    expect(m.brief.situation.length).toBeGreaterThan(0);
    expect(m.brief.facts.length).toBeGreaterThan(0);
    expect(m.brief.constraints.length).toBeGreaterThan(0);
    expect(m.brief.deliverables.length).toBeGreaterThan(0);
    expect(m.brief.roles.length).toBeGreaterThan(0);
    expect(m.facilitator.stakeholderBrief.length).toBeGreaterThan(0);
    expect(m.facilitator.hiddenFacts.length).toBeGreaterThan(0);
    expect(m.facilitator.debriefQuestions.length).toBeGreaterThan(0);
  });

  it("recommends only twist cards that exist", () => {
    const ids = new Set(twists.map((t) => t.id));
    for (const m of missions) {
      for (const id of m.facilitator.recommendedTwists) expect(ids.has(id)).toBe(true);
    }
  });
});

describe("twist deck content", () => {
  it("has unique ids and every required field", () => {
    expect(new Set(twists.map((t) => t.id)).size).toBe(twists.length);
    for (const t of twists) {
      for (const field of ["title", "cardText", "whenToReveal", "impact", "facilitatorGuidance"] as const) {
        expect(t[field].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("covers all 12 categories and all 3 difficulty levels", () => {
    expect(new Set(twists.map((t) => t.category))).toEqual(new Set(twistCategories));
    expect(new Set(twists.map((t) => t.difficulty))).toEqual(new Set(["Minor", "Moderate", "Major"]));
  });
});
