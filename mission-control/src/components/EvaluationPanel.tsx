"use client";

import { useState } from "react";
import { evaluationCriteria, maxScore, scoreLabels } from "@/data/evaluation";
import { useLocalState } from "@/lib/useLocalState";

interface Team {
  id: string;
  name: string;
  scores: Record<string, number>;
  notes: string;
}

const MAX_TEAMS = 8;

function newTeam(n: number, id = `team-${Date.now()}-${n}`): Team {
  return { id, name: `Squad ${n}`, scores: {}, notes: "" };
}

const initialTeams: Team[] = [newTeam(1, "team-1")];

function validateTeams(raw: unknown): Team[] {
  if (!Array.isArray(raw)) return initialTeams;
  const teams = raw
    .filter((t): t is Team => !!t && typeof t === "object" && typeof (t as Team).id === "string")
    .map((t) => ({
      id: t.id,
      name: typeof t.name === "string" ? t.name : "Squad",
      notes: typeof t.notes === "string" ? t.notes : "",
      scores:
        t.scores && typeof t.scores === "object"
          ? Object.fromEntries(
              Object.entries(t.scores).filter(
                ([k, v]) => evaluationCriteria.some((c) => c.id === k) && typeof v === "number" && v >= 0 && v <= 3,
              ),
            )
          : {},
    }))
    .slice(0, MAX_TEAMS);
  return teams.length ? teams : initialTeams;
}

export function totalFor(team: Team): number {
  return evaluationCriteria.reduce((s, c) => s + (team.scores[c.id] ?? 0), 0);
}

export function EvaluationPanel({ missionId, missionTitle }: { missionId: string; missionTitle: string }) {
  const [teams, setTeams] = useLocalState<Team[]>(`mc:eval:${missionId}`, initialTeams, validateTeams);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copied, setCopied] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const active = teams.find((t) => t.id === activeId) ?? teams[0];

  function update(id: string, patch: Partial<Team>) {
    setTeams((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }
  function setScore(id: string, criterion: string, value: number) {
    setTeams((ts) =>
      ts.map((t) => {
        if (t.id !== id) return t;
        const scores = { ...t.scores };
        if (scores[criterion] === value) delete scores[criterion];
        else scores[criterion] = value;
        return { ...t, scores };
      }),
    );
  }
  function addTeam() {
    if (teams.length >= MAX_TEAMS) return;
    const team = newTeam(teams.length + 1);
    setTeams((ts) => [...ts, team]);
    setActiveId(team.id);
  }
  function removeTeam(id: string) {
    setTeams((ts) => (ts.length <= 1 ? ts : ts.filter((t) => t.id !== id)));
    setActiveId(null);
  }
  function clearAll() {
    const team = newTeam(1);
    setTeams([team]);
    setActiveId(team.id);
    setConfirmClear(false);
  }

  async function copySummary() {
    const lines = [
      `${missionTitle}: team evaluation`,
      ...teams.flatMap((t) => [
        "",
        `${t.name}: ${totalFor(t)}/${maxScore}`,
        ...evaluationCriteria.map((c) => {
          const s = t.scores[c.id];
          return `  ${c.label}: ${s === undefined ? "not scored" : `${s} (${scoreLabels[s]})`}`;
        }),
        ...(t.notes.trim() ? [`  Notes: ${t.notes.trim()}`] : []),
      ]),
    ];
    const text = lines.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied("Results copied to the clipboard.");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      setCopied(ok ? "Results copied to the clipboard." : "Copy failed. Select and copy the scores manually.");
    }
    setTimeout(() => setCopied(""), 3000);
  }

  if (!active) return null;

  return (
    <section aria-labelledby="eval-heading" className="grid gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="eval-heading" className="text-3xl font-semibold">
            Team evaluation
          </h2>
          <p className="mt-1 max-w-prose text-muted">
            Score each squad on what you observed. Scores are 0–3, and you can tap a selected score again to clear it.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={copySummary} className="min-h-11 rounded-md border border-rule px-4 hover:border-muted">
            Copy results
          </button>
          {confirmClear ? (
            <span className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearAll}
                className="min-h-11 rounded-md border border-alert px-4 text-alert hover:bg-alert/10"
              >
                Clear all scores
              </button>
              <button type="button" onClick={() => setConfirmClear(false)} className="min-h-11 px-3 text-muted hover:text-ink">
                Cancel
              </button>
            </span>
          ) : (
            <button type="button" onClick={() => setConfirmClear(true)} className="min-h-11 rounded-md px-4 text-muted hover:text-ink">
              Clear
            </button>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied}
      </p>
      {copied && <p className="text-sm text-go">{copied}</p>}

      {/* Team switcher */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Squads">
        {teams.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active.id}
            onClick={() => setActiveId(t.id)}
            className={`min-h-10 rounded-md border px-3 text-sm ${
              t.id === active.id ? "border-amber bg-amber/10 text-ink" : "border-rule text-muted hover:text-ink"
            }`}
          >
            {t.name || "Unnamed squad"}{" "}
            <span className="tabular text-muted">
              {totalFor(t)}/{maxScore}
            </span>
          </button>
        ))}
        {teams.length < MAX_TEAMS && (
          <button
            type="button"
            onClick={addTeam}
            className="min-h-10 rounded-md border border-dashed border-rule px-3 text-sm text-cyan hover:border-cyan"
          >
            Add squad
          </button>
        )}
      </div>

      <div className="rounded-lg border border-rule bg-panel p-4 sm:p-6">
        <div className="flex flex-wrap items-end gap-3">
          <label className="grid flex-1 gap-1 text-sm text-muted">
            Squad name
            <input
              value={active.name}
              onChange={(e) => update(active.id, { name: e.target.value })}
              maxLength={40}
              className="min-h-11 rounded-md border border-rule bg-console px-3 text-base text-ink"
            />
          </label>
          <p className="pb-2 font-console text-2xl font-semibold tabular">
            {totalFor(active)}
            <span className="text-base text-muted">/{maxScore}</span>
          </p>
          {teams.length > 1 && (
            <button
              type="button"
              onClick={() => removeTeam(active.id)}
              className="min-h-11 rounded-md px-3 text-sm text-muted hover:text-alert"
            >
              Remove squad
            </button>
          )}
        </div>

        <ul className="mt-5 grid gap-px overflow-hidden rounded-md border border-rule bg-rule">
          {evaluationCriteria.map((c) => (
            <li key={c.id} className="grid gap-3 bg-panel px-4 py-3 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-semibold">{c.label}</p>
                <p className="text-sm text-muted">{c.lookFor}</p>
              </div>
              <div role="radiogroup" aria-label={`${c.label} score`} className="flex flex-wrap gap-1">
                {scoreLabels.map((label, value) => {
                  const on = active.scores[c.id] === value;
                  return (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setScore(active.id, c.id, value)}
                      className={`min-h-10 rounded border px-2.5 text-sm ${
                        on ? "border-amber bg-amber text-card-ink" : "border-rule text-muted hover:text-ink"
                      }`}
                    >
                      <span className="tabular font-semibold">{value}</span> {label}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>

        <label className="mt-5 grid gap-1 text-sm text-muted">
          Observations
          <textarea
            value={active.notes}
            onChange={(e) => update(active.id, { notes: e.target.value })}
            rows={3}
            maxLength={1500}
            placeholder="What did this squad do well? What should they try next time?"
            className="rounded-md border border-rule bg-console p-3 text-base text-ink placeholder:text-muted/70"
          />
        </label>
      </div>
    </section>
  );
}
