"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useLocalState } from "@/lib/useLocalState";

interface FacilitatorContextValue {
  isFacilitator: boolean;
  setFacilitator: (on: boolean) => void;
}

const FacilitatorContext = createContext<FacilitatorContextValue>({
  isFacilitator: false,
  setFacilitator: () => {},
});

export function FacilitatorProvider({ children }: { children: ReactNode }) {
  const [isFacilitator, setFacilitator] = useLocalState<boolean>(
    "mc:facilitator",
    false,
    (raw) => raw === true,
  );
  return (
    <FacilitatorContext.Provider value={{ isFacilitator, setFacilitator }}>
      {children}
    </FacilitatorContext.Provider>
  );
}

export function useFacilitator() {
  return useContext(FacilitatorContext);
}

/**
 * Switch between Participant view (safe for a projector) and Facilitator view.
 * Turning facilitator view ON asks for confirmation so notes aren't revealed by
 * an accidental tap in front of the room.
 */
export function FacilitatorToggle() {
  const { isFacilitator, setFacilitator } = useFacilitator();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div
        role="alertdialog"
        aria-labelledby="fac-confirm"
        className="flex flex-wrap items-center gap-2 rounded-md border border-amber/60 bg-panel-2 px-3 py-2 text-sm"
      >
        <span id="fac-confirm" className="text-ink">
          Show facilitator notes on this screen?
        </span>
        <button
          type="button"
          autoFocus
          onClick={() => {
            setFacilitator(true);
            setConfirming(false);
          }}
          className="rounded bg-amber px-3 py-1.5 font-semibold text-card-ink hover:bg-amber-deep"
        >
          Show notes
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded px-3 py-1.5 text-muted hover:text-ink"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isFacilitator}
      onClick={() => (isFacilitator ? setFacilitator(false) : setConfirming(true))}
      className={`group flex min-h-11 items-center gap-2.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
        isFacilitator
          ? "border-amber bg-amber/10 text-amber"
          : "border-rule text-muted hover:border-muted hover:text-ink"
      }`}
    >
      <span
        aria-hidden
        className={`relative h-5 w-9 rounded-full transition-colors ${
          isFacilitator ? "bg-amber" : "bg-rule"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-console transition-transform ${
            isFacilitator ? "translate-x-4.5" : "translate-x-0.5"
          }`}
        />
      </span>
      {isFacilitator ? "Facilitator view" : "Participant view"}
    </button>
  );
}
