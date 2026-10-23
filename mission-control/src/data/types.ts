// Shared content types. Edit the data files in this folder to change missions,
// twist cards, or evaluation criteria — the UI reads everything from here.

export type Difficulty = "Minor" | "Moderate" | "Major";

export type MissionLevel = "Starter" | "Intermediate" | "Advanced";

export interface Phase {
  /** Short label shown on the timer, e.g. "Ideate" */
  name: string;
  /** Minutes in the default 90-minute plan. Scaled for 60 or 120 minutes. */
  minutes: number;
  /** What the team should be doing in this phase (participant-facing). */
  goal: string;
  /** True for the phase where the Mystery Twist should land. */
  twistWindow?: boolean;
}

export interface Role {
  name: string;
  /** "technical" | "non-technical" | "any" — helps mixed teams pick roles. */
  fit: "technical" | "non-technical" | "any";
  responsibility: string;
}

export interface Fact {
  label: string;
  value: string;
}

/** Participant-facing content. Safe to show on a projector. */
export interface MissionBrief {
  situation: string[];
  facts: Fact[];
  problemStatement: string;
  constraints: string[];
  deliverables: string[];
  roles: Role[];
  successLooksLike: string[];
}

/** One question a team is likely to ask, with the in-character answer. */
export interface StakeholderAnswer {
  question: string;
  answer: string;
}

/** Information the facilitator releases only when a team earns it. */
export interface HiddenFact {
  trigger: string;
  reveal: string;
}

/** Facilitator-only content. Hidden unless Facilitator mode is on. */
export interface FacilitatorNotes {
  stakeholderBrief: string;
  stakeholderAnswers: StakeholderAnswer[];
  hiddenFacts: HiddenFact[];
  watchFor: string[];
  solutionDirections: string[];
  commonPitfalls: string[];
  debriefQuestions: string[];
  recommendedTwists: string[];
}

export interface Mission {
  id: string;
  codename: string;
  title: string;
  tagline: string;
  domain: string;
  level: MissionLevel;
  /** Default session length in minutes; phases add up to this. */
  defaultMinutes: number;
  teamSize: string;
  inspiration: string;
  brief: MissionBrief;
  phases: Phase[];
  facilitator: FacilitatorNotes;
}

export type TwistCategory =
  | "Customer Changes"
  | "Budget Changes"
  | "Time Pressure"
  | "Resource Loss"
  | "New Information"
  | "Stakeholder Conflict"
  | "Technical Limitations"
  | "Compliance and Safety"
  | "Customer Feedback"
  | "Market or Competitor Changes"
  | "Unexpected Opportunities"
  | "Ethical Dilemmas";

export interface TwistCard {
  id: string;
  title: string;
  category: TwistCategory;
  difficulty: Difficulty;
  /** The exact announcement to read aloud. */
  cardText: string;
  whenToReveal: string;
  impact: string;
  facilitatorGuidance: string;
}

export interface EvaluationCriterion {
  id: string;
  label: string;
  lookFor: string;
}
