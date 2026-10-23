"use client";

import { useEffect, useRef, useState } from "react";
import type { Phase } from "@/data/types";
import { formatClock, phaseStarts, sessionLengths, type SessionLength } from "@/lib/timer";

export type TimerStatus = "idle" | "running" | "paused";

export interface TimerState {
  phaseIndex: number;
  status: TimerStatus;
  /** Epoch ms when the current phase ends (while running). */
  endsAt: number | null;
  /** Seconds left in the current phase (while idle/paused). May be negative (overtime). */
  remaining: number;
}

export function freshTimer(phases: Phase[]): TimerState {
  return { phaseIndex: 0, status: "idle", endsAt: null, remaining: (phases[0]?.minutes ?? 0) * 60 };
}

export function validateTimer(raw: unknown, phases: Phase[]): TimerState {
  const fallback = freshTimer(phases);
  if (!raw || typeof raw !== "object") return fallback;
  const r = raw as Partial<TimerState>;
  const phaseIndex =
    typeof r.phaseIndex === "number" && r.phaseIndex >= 0 && r.phaseIndex < phases.length
      ? Math.floor(r.phaseIndex)
      : 0;
  const status: TimerStatus =
    r.status === "running" || r.status === "paused" || r.status === "idle" ? r.status : "idle";
  const endsAt = typeof r.endsAt === "number" ? r.endsAt : null;
  const remaining = typeof r.remaining === "number" ? r.remaining : phases[phaseIndex].minutes * 60;
  if (status === "running" && endsAt === null) return { ...fallback, phaseIndex };
  return { phaseIndex, status, endsAt, remaining };
}

function beep() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [0, 0.28].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + offset + 0.22);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + 0.25);
    });
    setTimeout(() => ctx.close(), 1000);
  } catch {
    // audio not available
  }
}

interface Props {
  phases: Phase[];
  length: SessionLength;
  onLengthChange: (l: SessionLength) => void;
  timer: TimerState;
  setTimer: (t: TimerState | ((prev: TimerState) => TimerState)) => void;
  sound: boolean;
  onSoundChange: (on: boolean) => void;
}

export function SessionTimer({ phases, length, onLengthChange, timer, setTimer, sound, onSoundChange }: Props) {
  // 0 until mounted: Date.now() must not run during prerender.
  const [now, setNow] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);
  const alertedRef = useRef<string>("");

  useEffect(() => {
    if (timer.status !== "running") return;
    const tick = () => setNow(Date.now());
    tick();
    const t = setInterval(tick, 250);
    return () => clearInterval(t);
  }, [timer.status]);

  const phase = phases[timer.phaseIndex];
  const remaining =
    timer.status === "running" && timer.endsAt !== null && now > 0
      ? Math.ceil((timer.endsAt - now) / 1000)
      : timer.remaining;
  const overtime = remaining < 0;
  const phaseSeconds = phase.minutes * 60;
  const elapsedInPhase = phaseSeconds - remaining;
  const starts = phaseStarts(phases);
  const totalSeconds = length * 60;
  const elapsedTotal = Math.max(0, starts[timer.phaseIndex] * 60 + elapsedInPhase);
  const progress = Math.min(1, elapsedTotal / totalSeconds);

  // Alert once when a phase runs out.
  useEffect(() => {
    const key = `${timer.phaseIndex}:${timer.endsAt}`;
    if (timer.status === "running" && remaining <= 0 && alertedRef.current !== key) {
      alertedRef.current = key;
      if (sound) beep();
    }
  }, [remaining, timer.status, timer.phaseIndex, timer.endsAt, sound]);

  function start() {
    setNow(Date.now());
    setTimer((t) => ({ ...t, status: "running", endsAt: Date.now() + t.remaining * 1000 }));
  }
  function pause() {
    setTimer((t) => ({
      ...t,
      status: "paused",
      endsAt: null,
      remaining: t.endsAt !== null ? Math.ceil((t.endsAt - Date.now()) / 1000) : t.remaining,
    }));
  }
  function goTo(index: number) {
    const i = Math.max(0, Math.min(phases.length - 1, index));
    setNow(Date.now());
    setTimer((t) => {
      const secs = phases[i].minutes * 60;
      return t.status === "running"
        ? { phaseIndex: i, status: "running", endsAt: Date.now() + secs * 1000, remaining: secs }
        : { phaseIndex: i, status: t.status === "idle" ? "idle" : "paused", endsAt: null, remaining: secs };
    });
  }
  function addMinute() {
    setTimer((t) =>
      t.status === "running" && t.endsAt !== null
        ? { ...t, endsAt: t.endsAt + 60_000 }
        : { ...t, remaining: t.remaining + 60 },
    );
  }
  function reset() {
    setTimer(freshTimer(phases));
    setConfirmReset(false);
  }
  function fullscreen() {
    const el = clockRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.().catch(() => {});
  }

  const isLast = timer.phaseIndex === phases.length - 1;

  return (
    <section aria-label="Session timer" className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="radiogroup" aria-label="Session length" className="inline-flex rounded-md border border-rule p-0.5">
          {sessionLengths.map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={length === l}
              onClick={() => onLengthChange(l)}
              className={`min-h-10 rounded px-3.5 text-sm tabular ${
                length === l ? "bg-panel-2 font-semibold text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {l} min
            </button>
          ))}
        </div>
        <label className="flex min-h-10 cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={sound}
            onChange={(e) => onSoundChange(e.target.checked)}
            className="h-4 w-4 accent-amber"
          />
          Chime when a phase ends
        </label>
      </div>

      <div
        ref={clockRef}
        className="console-grid rounded-lg border border-rule bg-panel p-5 sm:p-8 [&:fullscreen]:grid [&:fullscreen]:place-content-center [&:fullscreen]:bg-console"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-console text-lg font-semibold">
            <span className="text-muted">
              Phase {timer.phaseIndex + 1} of {phases.length}:
            </span>{" "}
            <span className="text-ink">{phase.name}</span>
          </p>
          <p className="text-sm text-muted tabular">
            {timer.status === "running" ? "Running" : timer.status === "paused" ? "Paused" : "Ready"},{" "}
            {formatClock(elapsedTotal)} of {length}:00 used
          </p>
        </div>

        <p
          className={`my-4 font-console text-[clamp(4.5rem,18vw,10rem)] leading-none font-semibold tabular ${
            overtime ? "animate-overtime text-alert" : phase.twistWindow ? "text-amber" : "text-ink"
          }`}
          aria-live="off"
        >
          {formatClock(remaining)}
        </p>
        <p className="sr-only" aria-live="polite">
          {overtime ? `${phase.name} is over time.` : ""}
        </p>

        <p className="max-w-2xl text-lg text-ink/90">{phase.goal}</p>
        {phase.twistWindow && (
          <p className="mt-3 inline-block rounded bg-amber px-2.5 py-1 font-semibold text-card-ink">
            Twist window: draw a card about halfway through this phase.
          </p>
        )}

        <div
          className="mt-6 h-1.5 overflow-hidden rounded-full bg-rule"
          role="progressbar"
          aria-label="Session progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <div className="h-full bg-cyan transition-[width]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {timer.status === "running" ? (
          <button
            type="button"
            onClick={pause}
            className="min-h-11 min-w-28 rounded-md border border-amber px-5 font-semibold text-amber hover:bg-amber/10"
          >
            Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            className="min-h-11 min-w-28 rounded-md bg-amber px-5 font-semibold text-card-ink hover:bg-amber-deep"
          >
            {timer.status === "paused" ? "Resume" : "Start"}
          </button>
        )}
        <button
          type="button"
          onClick={() => goTo(timer.phaseIndex - 1)}
          disabled={timer.phaseIndex === 0}
          className="min-h-11 rounded-md border border-rule px-4 hover:border-muted disabled:cursor-not-allowed disabled:text-muted/50"
        >
          Previous phase
        </button>
        <button
          type="button"
          onClick={() => goTo(timer.phaseIndex + 1)}
          disabled={isLast}
          className="min-h-11 rounded-md border border-rule px-4 hover:border-muted disabled:cursor-not-allowed disabled:text-muted/50"
        >
          Next phase
        </button>
        <button type="button" onClick={addMinute} className="min-h-11 rounded-md border border-rule px-4 hover:border-muted">
          Add 1 minute
        </button>
        <button type="button" onClick={fullscreen} className="min-h-11 rounded-md border border-rule px-4 hover:border-muted">
          Full screen
        </button>
        {confirmReset ? (
          <span className="flex items-center gap-1">
            <button
              type="button"
              onClick={reset}
              className="min-h-11 rounded-md border border-alert px-4 text-alert hover:bg-alert/10"
            >
              Reset timer
            </button>
            <button type="button" onClick={() => setConfirmReset(false)} className="min-h-11 px-3 text-muted hover:text-ink">
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="min-h-11 rounded-md px-4 text-muted hover:text-ink"
          >
            Reset
          </button>
        )}
      </div>

      {/* Phase tracker */}
      <ol aria-label="Phases" className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule">
        {phases.map((p, i) => {
          const state = i < timer.phaseIndex ? "done" : i === timer.phaseIndex ? "current" : "next";
          return (
            <li key={p.name}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={state === "current" ? "step" : undefined}
                className={`grid w-full grid-cols-[1.75rem_1fr_auto] items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  state === "current" ? "bg-panel-2" : "bg-panel hover:bg-panel-2/70"
                }`}
              >
                <span
                  aria-hidden
                  className={`grid h-6 w-6 place-items-center rounded-full text-xs font-semibold tabular ${
                    state === "done"
                      ? "bg-go text-card-ink"
                      : state === "current"
                        ? "bg-amber text-card-ink"
                        : "border border-rule text-muted"
                  }`}
                >
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span className={state === "next" ? "text-muted" : "text-ink"}>
                  {p.name}
                  {p.twistWindow && <span className="ml-2 text-sm text-amber">twist</span>}
                  <span className="sr-only">
                    {state === "done" ? ", done" : state === "current" ? ", current phase" : ""}
                  </span>
                </span>
                <span className="text-sm text-muted tabular">{p.minutes} min</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
