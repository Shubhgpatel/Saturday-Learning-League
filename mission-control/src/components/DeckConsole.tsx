"use client";

import { useState } from "react";
import { difficulties, twistCategories, twists } from "@/data/twists";
import type { Difficulty, TwistCategory } from "@/data/types";
import {
  drawCard,
  emptyFilters,
  filterCards,
  remainingCards,
  sanitizeDrawn,
  toggleInList,
  type DeckFilters,
} from "@/lib/deck";
import { useLocalState } from "@/lib/useLocalState";
import { useFacilitator } from "./FacilitatorProvider";
import { DifficultyBars, TwistCardFace, difficultyStyle } from "./TwistCardFace";

function validateFilters(raw: unknown): DeckFilters {
  if (!raw || typeof raw !== "object") return emptyFilters;
  const r = raw as Partial<DeckFilters>;
  return {
    categories: Array.isArray(r.categories)
      ? r.categories.filter((c): c is TwistCategory => twistCategories.includes(c as TwistCategory))
      : [],
    difficulties: Array.isArray(r.difficulties)
      ? r.difficulties.filter((d): d is Difficulty => difficulties.includes(d as Difficulty))
      : [],
  };
}

interface Props {
  /** Compact mode is used inside the session console. */
  compact?: boolean;
  /** Optional list of card ids to show as a "suggested for this mission" shortcut. */
  suggested?: string[];
}

export function DeckConsole({ compact = false, suggested = [] }: Props) {
  const { isFacilitator } = useFacilitator();
  const [drawn, setDrawn] = useLocalState<string[]>("mc:deck:drawn", [], (raw) =>
    sanitizeDrawn(twists, raw),
  );
  const [filters, setFilters] = useLocalState<DeckFilters>(
    "mc:deck:filters",
    emptyFilters,
    validateFilters,
  );
  const [currentId, setCurrentId] = useLocalState<string | null>("mc:deck:current", null, (raw) =>
    typeof raw === "string" && twists.some((t) => t.id === raw) ? raw : null,
  );
  const [confirmReset, setConfirmReset] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [announce, setAnnounce] = useState("");

  const inSelection = filterCards(twists, filters);
  const left = remainingCards(twists, filters, drawn);
  const leftInDeck = twists.length - drawn.length;
  const current = twists.find((t) => t.id === currentId) ?? null;
  const filtersActive = filters.categories.length > 0 || filters.difficulties.length > 0;

  function draw() {
    const result = drawCard(twists, filters, drawn);
    if (result.status === "drawn") {
      setDrawn(result.drawnIds);
      setCurrentId(result.card.id);
      setAnnounce(`Drew ${result.card.id}, ${result.card.title}. ${result.card.difficulty} twist.`);
    } else {
      setAnnounce("No cards left in this selection.");
    }
  }

  function drawSpecific(id: string) {
    if (!drawn.includes(id)) setDrawn([...drawn, id]);
    setCurrentId(id);
  }

  function reset() {
    setDrawn([]);
    setCurrentId(null);
    setConfirmReset(false);
    setAnnounce("Deck reset. All cards are back in the deck.");
  }

  return (
    <div className="grid gap-6">
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      {/* Filters */}
      <fieldset className="grid gap-3">
        <legend className="sr-only">Filter the deck</legend>
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="font-console text-base font-semibold text-muted">Category</h3>
            {filtersActive && (
              <button
                type="button"
                onClick={() => setFilters(emptyFilters)}
                className="text-sm text-cyan underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {twistCategories.map((c) => {
              const on = filters.categories.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    setFilters((f) => ({ ...f, categories: toggleInList(f.categories, c) }))
                  }
                  className={`min-h-9 rounded-full border px-3 py-1 text-sm transition-colors ${
                    on
                      ? "border-amber bg-amber text-card-ink"
                      : "border-rule text-ink hover:border-muted"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-console text-base font-semibold text-muted">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((d) => {
              const on = filters.difficulties.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    setFilters((f) => ({ ...f, difficulties: toggleInList(f.difficulties, d) }))
                  }
                  className={`flex min-h-9 items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors ${
                    on ? "border-ink bg-panel-2 text-ink" : `border-rule ${difficultyStyle[d].chip.split(" ")[1]} hover:border-muted`
                  }`}
                >
                  <DifficultyBars level={d} />
                  <span className="text-muted">({difficultyStyle[d].note.toLowerCase()})</span>
                </button>
              );
            })}
          </div>
        </div>
      </fieldset>

      {/* Draw controls */}
      <div className="flex flex-col gap-4 rounded-lg border border-rule bg-panel p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted">
          <p>
            <span className="tabular font-console text-2xl font-semibold text-ink">{left.length}</span>{" "}
            of {inSelection.length} cards left {filtersActive ? "in this selection" : "in the deck"}
          </p>
          <p>
            {drawn.length} drawn since the last reset
            {filtersActive ? `, ${leftInDeck} left in the whole deck` : ""}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={draw}
            disabled={left.length === 0}
            className="min-h-11 rounded-md bg-amber px-5 py-2.5 font-semibold text-card-ink transition-colors hover:bg-amber-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-muted"
          >
            Draw a twist
          </button>
          {confirmReset ? (
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={reset}
                className="min-h-11 rounded-md border border-alert px-4 py-2 text-alert hover:bg-alert/10"
              >
                Reset all {twists.length} cards
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="min-h-11 px-3 text-muted hover:text-ink"
              >
                Keep
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              disabled={drawn.length === 0}
              className="min-h-11 rounded-md border border-rule px-4 py-2 text-ink hover:border-muted disabled:cursor-not-allowed disabled:text-muted/60"
            >
              Reset deck
            </button>
          )}
        </div>
      </div>

      {left.length === 0 && (
        <p className="rounded-md border border-amber/40 bg-amber/5 px-4 py-3 text-sm">
          {filtersActive && leftInDeck > 0
            ? `Every card in this selection has been drawn. Widen the filters to use the ${leftInDeck} remaining cards, or reset the deck.`
            : "Every card has been drawn. Reset the deck to shuffle all cards back in."}
        </p>
      )}

      {/* Current card */}
      <section aria-label="Current twist">
        {current ? (
          <div key={current.id} className="animate-deal">
            <TwistCardFace card={current} showFacilitator={isFacilitator} size={compact ? "small" : "large"} />
          </div>
        ) : (
          <div className="grid place-items-center rounded-md border border-dashed border-rule px-6 py-12 text-center text-muted">
            <p className="max-w-sm">
              No twist drawn yet. When the team is halfway through, draw one and read it aloud.
            </p>
          </div>
        )}
      </section>

      {/* Suggested for this mission */}
      {suggested.length > 0 && isFacilitator && (
        <section>
          <h3 className="mb-2 font-console text-base font-semibold text-muted">
            Suggested for this mission
          </h3>
          <div className="flex flex-wrap gap-2">
            {suggested.map((id) => {
              const t = twists.find((x) => x.id === id);
              if (!t) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => drawSpecific(id)}
                  className={`min-h-9 rounded border border-rule px-3 py-1 text-left text-sm hover:border-muted ${
                    drawn.includes(id) ? "text-muted line-through" : "text-ink"
                  }`}
                >
                  {t.id} {t.title}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* History */}
      {drawn.length > 0 && (
        <section>
          <h3 className="mb-2 font-console text-base font-semibold text-muted">Drawn this session</h3>
          <ol className="flex flex-wrap gap-2">
            {drawn.map((id, i) => {
              const t = twists.find((x) => x.id === id);
              if (!t) return null;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setCurrentId(id)}
                    aria-current={id === currentId ? "true" : undefined}
                    className={`min-h-9 rounded border px-3 py-1 text-sm ${
                      id === currentId ? "border-amber text-amber" : "border-rule text-ink hover:border-muted"
                    }`}
                  >
                    <span className="tabular text-muted">{i + 1}.</span> {t.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {/* Browse */}
      {!compact && (
        <section className="border-t border-rule pt-6">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="all-cards"
            onClick={() => setShowAll((v) => !v)}
            className="min-h-11 rounded-md border border-rule px-4 py-2 hover:border-muted"
          >
            {showAll ? "Hide the full deck" : `Browse all ${inSelection.length} cards in this selection`}
          </button>
          {showAll && (
            <div id="all-cards" className="mt-5 grid gap-4 md:grid-cols-2">
              {inSelection.map((t) => (
                <div key={t.id} className="relative">
                  {drawn.includes(t.id) && (
                    <span className="absolute top-3 right-3 z-10 rounded bg-card-ink px-2 py-0.5 text-xs text-manila">
                      Drawn
                    </span>
                  )}
                  <TwistCardFace card={t} showFacilitator={isFacilitator} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
