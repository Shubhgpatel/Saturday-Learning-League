import type { Difficulty, TwistCard, TwistCategory } from "@/data/types";

export interface DeckFilters {
  /** Empty array means "all categories". */
  categories: TwistCategory[];
  /** Empty array means "all difficulties". */
  difficulties: Difficulty[];
}

export const emptyFilters: DeckFilters = { categories: [], difficulties: [] };

/** Cards that match the current filters (ignores what has been drawn). */
export function filterCards(cards: TwistCard[], filters: DeckFilters): TwistCard[] {
  return cards.filter(
    (c) =>
      (filters.categories.length === 0 || filters.categories.includes(c.category)) &&
      (filters.difficulties.length === 0 || filters.difficulties.includes(c.difficulty)),
  );
}

/** Cards that match the filters AND have not been drawn yet. */
export function remainingCards(
  cards: TwistCard[],
  filters: DeckFilters,
  drawnIds: string[],
): TwistCard[] {
  const drawn = new Set(drawnIds);
  return filterCards(cards, filters).filter((c) => !drawn.has(c.id));
}

export type DrawResult =
  | { status: "drawn"; card: TwistCard; drawnIds: string[] }
  | { status: "exhausted"; drawnIds: string[] };

/**
 * Draw one random card that matches the filters and has not been drawn since the
 * last reset. Never returns a duplicate: when nothing is left, it reports
 * "exhausted" and the caller should offer a reset.
 *
 * `random` is injectable so draws are testable.
 */
export function drawCard(
  cards: TwistCard[],
  filters: DeckFilters,
  drawnIds: string[],
  random: () => number = Math.random,
): DrawResult {
  const pool = remainingCards(cards, filters, drawnIds);
  if (pool.length === 0) return { status: "exhausted", drawnIds };
  const index = Math.min(pool.length - 1, Math.floor(random() * pool.length));
  const card = pool[index];
  return { status: "drawn", card, drawnIds: [...drawnIds, card.id] };
}

/** Remove ids that no longer exist in the deck (e.g. after editing the data file). */
export function sanitizeDrawn(cards: TwistCard[], drawnIds: unknown): string[] {
  if (!Array.isArray(drawnIds)) return [];
  const valid = new Set(cards.map((c) => c.id));
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of drawnIds) {
    if (typeof id === "string" && valid.has(id) && !seen.has(id)) {
      seen.add(id);
      out.push(id);
    }
  }
  return out;
}

export function toggleInList<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
