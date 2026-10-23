"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { missions } from "@/data/missions";
import { scalePhases, sessionLengths, type SessionLength } from "@/lib/timer";
import { useLocalState } from "@/lib/useLocalState";
import { DeckConsole } from "./DeckConsole";
import { EvaluationPanel } from "./EvaluationPanel";
import { useFacilitator } from "./FacilitatorProvider";
import { SessionTimer, freshTimer, validateTimer, type TimerState } from "./SessionTimer";

interface SessionSettings {
  missionId: string;
  length: SessionLength;
  sound: boolean;
}

const defaults: SessionSettings = { missionId: missions[0].id, length: 90, sound: true };

function validateSettings(raw: unknown): SessionSettings {
  if (!raw || typeof raw !== "object") return defaults;
  const r = raw as Partial<SessionSettings>;
  return {
    missionId: missions.some((m) => m.id === r.missionId) ? (r.missionId as string) : defaults.missionId,
    length: sessionLengths.includes(r.length as SessionLength) ? (r.length as SessionLength) : 90,
    sound: typeof r.sound === "boolean" ? r.sound : true,
  };
}

function DeliverablesChecklist({ missionId, items }: { missionId: string; items: string[] }) {
  const [done, setDone] = useLocalState<string[]>(`mc:deliverables:${missionId}`, [], (raw) =>
    Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string" && items.includes(x)) : [],
  );
  const count = items.filter((i) => done.includes(i)).length;

  return (
    <section aria-labelledby="deliv-heading" className="rounded-lg border border-rule bg-panel p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="deliv-heading" className="text-2xl font-semibold">
          Deliverables
        </h2>
        <p className="tabular text-sm text-muted">
          {count} of {items.length} ready
        </p>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-rule"
        role="progressbar"
        aria-label="Deliverables ready"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={count}
      >
        <div className="h-full bg-go transition-[width]" style={{ width: `${(count / items.length) * 100}%` }} />
      </div>
      <ul className="mt-4 grid gap-1">
        {items.map((item) => {
          const checked = done.includes(item);
          return (
            <li key={item}>
              <label className="flex cursor-pointer gap-3 rounded px-2 py-2 hover:bg-panel-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setDone((d) => (d.includes(item) ? d.filter((x) => x !== item) : [...d, item]))
                  }
                  className="mt-1 h-4 w-4 shrink-0 accent-amber"
                />
                <span className={checked ? "text-muted line-through" : ""}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {count > 0 && (
        <button
          type="button"
          onClick={() => setDone([])}
          className="mt-2 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Uncheck all
        </button>
      )}
    </section>
  );
}

export function SessionConsole() {
  const { isFacilitator } = useFacilitator();
  const [settings, setSettings, settingsLoaded] = useLocalState<SessionSettings>(
    "mc:session",
    defaults,
    validateSettings,
  );
  const mission = missions.find((m) => m.id === settings.missionId) ?? missions[0];
  const phases = useMemo(() => scalePhases(mission.phases, settings.length), [mission, settings.length]);
  const [timer, setTimer] = useLocalState<TimerState>("mc:timer", freshTimer(phases), (raw) =>
    validateTimer(raw, phases),
  );

  // "Run this mission" links pass ?mission=<id>. Apply it once settings have loaded.
  useEffect(() => {
    if (!settingsLoaded) return;
    const id = new URLSearchParams(window.location.search).get("mission");
    if (id && missions.some((m) => m.id === id) && id !== settings.missionId) {
      setSettings((s) => ({ ...s, missionId: id }));
      const target = missions.find((m) => m.id === id)!;
      setTimer(freshTimer(scalePhases(target.phases, settings.length)));
    }
    // Run only when settings finish loading.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsLoaded]);

  const running = timer.status === "running";

  function changeMission(id: string) {
    const target = missions.find((m) => m.id === id);
    if (!target) return;
    setSettings((s) => ({ ...s, missionId: id }));
    setTimer(freshTimer(scalePhases(target.phases, settings.length)));
    window.history.replaceState(null, "", `/control?mission=${id}`);
  }
  function changeLength(length: SessionLength) {
    setSettings((s) => ({ ...s, length }));
    setTimer(freshTimer(scalePhases(mission.phases, length)));
  }

  return (
    <div className="grid gap-12">
      {/* Mission selector */}
      <section aria-labelledby="mission-select-label" className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="grid gap-2">
          <label id="mission-select-label" htmlFor="mission-select" className="font-console text-lg font-semibold text-muted">
            Mission
          </label>
          <select
            id="mission-select"
            value={mission.id}
            disabled={running}
            onChange={(e) => changeMission(e.target.value)}
            className="min-h-12 w-full max-w-xl rounded-md border border-rule bg-panel px-3 text-lg text-ink disabled:opacity-60"
          >
            {missions.map((m) => (
              <option key={m.id} value={m.id}>
                {m.codename.replace("MISSION", "Mission")}: {m.title}
              </option>
            ))}
          </select>
          <p className="text-sm text-muted">
            {running
              ? "Pause the timer to change the mission or session length."
              : "Changing the mission or session length resets the timer."}
          </p>
        </div>
        <Link
          href={`/missions/${mission.id}`}
          className="inline-flex min-h-11 items-center rounded-md border border-rule px-4 hover:border-muted"
        >
          Open the {isFacilitator ? "brief and notes" : "participant brief"}
        </Link>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <SessionTimer
          phases={phases}
          length={settings.length}
          onLengthChange={(l) => !running && changeLength(l)}
          timer={timer}
          setTimer={setTimer}
          sound={settings.sound}
          onSoundChange={(sound) => setSettings((s) => ({ ...s, sound }))}
        />
        <div className="grid content-start gap-6">
          <section className="rounded-lg border border-rule bg-panel p-5">
            <h2 className="text-2xl font-semibold">{mission.title}</h2>
            <p className="mt-2 text-ink/90">{mission.brief.problemStatement}</p>
          </section>
          <DeliverablesChecklist missionId={mission.id} items={mission.brief.deliverables} />
        </div>
      </div>

      <section aria-labelledby="twist-heading" className="grid gap-4 border-t border-rule pt-10">
        <div>
          <h2 id="twist-heading" className="text-3xl font-semibold">
            Mystery Twist
          </h2>
          <p className="mt-1 max-w-prose text-muted">
            Draw during the Adapt phase and read the card aloud. The deck is shared with the Twist deck page, so a card
            never comes up twice until you reset it.
          </p>
        </div>
        <DeckConsole compact suggested={mission.facilitator.recommendedTwists} />
      </section>

      <div className="border-t border-rule pt-10">
        {isFacilitator ? (
          <EvaluationPanel missionId={mission.id} missionTitle={mission.title} />
        ) : (
          <section className="rounded-lg border border-dashed border-rule p-6">
            <h2 className="text-2xl font-semibold">Team evaluation</h2>
            <p className="mt-2 max-w-prose text-muted">
              The evaluation checklist is for facilitators. Switch to Facilitator view in the header to score squads.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
