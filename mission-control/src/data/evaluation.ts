import type { EvaluationCriterion } from "./types";

// Team evaluation checklist used on the Mission Control console.
// Each criterion is scored 0–3 (see scoreLabels).

export const evaluationCriteria: EvaluationCriterion[] = [
  {
    id: "understand",
    label: "Understood the real problem",
    lookFor: "Asked clarifying questions and separated facts from assumptions before solving.",
  },
  {
    id: "options",
    label: "Explored alternatives",
    lookFor: "Generated several distinct options before converging on one.",
  },
  {
    id: "tradeoffs",
    label: "Prioritised under constraints",
    lookFor: "Made trade-offs explicit and respected the stated time, budget and people limits.",
  },
  {
    id: "adapt",
    label: "Adapted to the twist",
    lookFor: "Reassessed calmly, kept what still worked, and changed what no longer did.",
  },
  {
    id: "collaboration",
    label: "Collaborated as a team",
    lookFor: "Everyone contributed. Roles were used, and quieter voices were drawn in.",
  },
  {
    id: "people",
    label: "Considered people and risks",
    lookFor: "Thought about who is affected, plus fairness, privacy and what could go wrong.",
  },
  {
    id: "feasible",
    label: "Feasible, concrete plan",
    lookFor: "Clear owners, steps and timing. It could realistically be started tomorrow.",
  },
  {
    id: "pitch",
    label: "Clear, convincing pitch",
    lookFor: "Led with the decision, explained the why, and handled questions well.",
  },
];

export const scoreLabels = ["Not seen", "Emerging", "Solid", "Excellent"] as const;

export const maxScore = evaluationCriteria.length * (scoreLabels.length - 1);
