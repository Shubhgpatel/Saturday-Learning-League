"use client";

import { useId, useState, type ReactNode } from "react";
import { useFacilitator } from "./FacilitatorProvider";

/**
 * Participant brief and facilitator notes live in separate tabs. The
 * facilitator tab exists only while Facilitator view is on, so a projected
 * screen in Participant view can never show the notes.
 */
export function MissionTabs({ brief, notes }: { brief: ReactNode; notes: ReactNode }) {
  const { isFacilitator } = useFacilitator();
  const [tab, setTab] = useState<"brief" | "notes">("brief");
  const id = useId();
  const active = isFacilitator ? tab : "brief";

  const tabClass = (on: boolean) =>
    `min-h-11 border-b-2 px-4 py-2 text-base transition-colors ${
      on ? "border-amber text-ink" : "border-transparent text-muted hover:text-ink"
    }`;

  return (
    <div>
      <div className="no-print flex flex-wrap items-end justify-between gap-3 border-b border-rule">
        <div role="tablist" aria-label="Mission views" className="flex">
          <button
            type="button"
            role="tab"
            id={`${id}-brief-tab`}
            aria-selected={active === "brief"}
            aria-controls={`${id}-brief`}
            onClick={() => setTab("brief")}
            className={tabClass(active === "brief")}
          >
            Participant brief
          </button>
          {isFacilitator && (
            <button
              type="button"
              role="tab"
              id={`${id}-notes-tab`}
              aria-selected={active === "notes"}
              aria-controls={`${id}-notes`}
              onClick={() => setTab("notes")}
              className={tabClass(active === "notes")}
            >
              Facilitator notes
            </button>
          )}
        </div>
        {!isFacilitator && (
          <p className="pb-2 text-sm text-muted">
            Facilitator notes are hidden. Switch to Facilitator view in the header to see them.
          </p>
        )}
      </div>

      <div
        role="tabpanel"
        id={`${id}-brief`}
        aria-labelledby={`${id}-brief-tab`}
        hidden={active !== "brief"}
        className="pt-8"
      >
        {brief}
      </div>
      {isFacilitator && (
        <div
          role="tabpanel"
          id={`${id}-notes`}
          aria-labelledby={`${id}-notes-tab`}
          hidden={active !== "notes"}
          className="pt-8"
        >
          {notes}
        </div>
      )}
    </div>
  );
}
