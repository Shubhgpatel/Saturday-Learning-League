import { describe, expect, it } from "vitest";
import { twists } from "@/data/twists";
import { drawCard, emptyFilters, filterCards, remainingCards, sanitizeDrawn } from "@/lib/deck";

describe("twist deck draws", () => {
  it("never draws a duplicate until the deck is exhausted", () => {
    let drawn: string[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < twists.length; i++) {
      const r = drawCard(twists, emptyFilters, drawn);
      expect(r.status).toBe("drawn");
      if (r.status !== "drawn") return;
      expect(seen.has(r.card.id)).toBe(false);
      seen.add(r.card.id);
      drawn = r.drawnIds;
    }
    expect(seen.size).toBe(twists.length);
    expect(drawCard(twists, emptyFilters, drawn).status).toBe("exhausted");
  });

  it("only draws cards matching the active filters", () => {
    const filters = { categories: ["Budget Changes" as const], difficulties: [] };
    let drawn: string[] = [];
    const ids: string[] = [];
    for (;;) {
      const r = drawCard(twists, filters, drawn);
      if (r.status === "exhausted") break;
      expect(r.card.category).toBe("Budget Changes");
      ids.push(r.card.id);
      drawn = r.drawnIds;
    }
    expect(ids.sort()).toEqual(["T03", "T04"]);
  });

  it("combines category and difficulty filters", () => {
    const result = filterCards(twists, { categories: [], difficulties: ["Major"] });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((c) => c.difficulty === "Major")).toBe(true);
  });

  it("is deterministic with an injected random source", () => {
    const first = drawCard(twists, emptyFilters, [], () => 0);
    const last = drawCard(twists, emptyFilters, [], () => 0.999999);
    expect(first.status === "drawn" && first.card.id).toBe(twists[0].id);
    expect(last.status === "drawn" && last.card.id).toBe(twists[twists.length - 1].id);
  });

  it("reset (empty drawn list) restores the full pool", () => {
    expect(remainingCards(twists, emptyFilters, []).length).toBe(twists.length);
  });

  it("sanitizes stored draw history", () => {
    expect(sanitizeDrawn(twists, ["T01", "T01", "nope", 4, "T02"])).toEqual(["T01", "T02"]);
    expect(sanitizeDrawn(twists, "garbage")).toEqual([]);
  });
});
