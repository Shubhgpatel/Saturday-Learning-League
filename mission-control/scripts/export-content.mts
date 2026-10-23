// Regenerates CONTENT.md from the data files so the full mission and twist
// content can be read, printed or shared without running the app.
// Run with: npm run export:content (Node 22.18+ runs TypeScript directly)
import { writeFileSync } from "node:fs";
import { evaluationCriteria, scoreLabels } from "../src/data/evaluation.ts";
import { missions } from "../src/data/missions.ts";
import { twistCategories, twists } from "../src/data/twists.ts";

const out: string[] = [];
const push = (...lines: string[]) => out.push(...lines);
const list = (items: string[]) => items.map((i) => `- ${i}`);

push(
  "# Mission Control: full content",
  "",
  "Generated from `src/data/` by `npm run export:content`. Edit the data files, not this file.",
  "",
  "## Contents",
  "",
  ...missions.map((m, i) => `${i + 1}. [${m.title}](#${m.id})`),
  `${missions.length + 1}. [Mystery Twist Deck](#mystery-twist-deck)`,
  `${missions.length + 2}. [Team evaluation checklist](#team-evaluation-checklist)`,
  "",
);

for (const m of missions) {
  const b = m.brief;
  const f = m.facilitator;
  push(
    "---",
    "",
    `<a id="${m.id}"></a>`,
    "",
    `## ${m.codename.replace("MISSION", "Mission")}: ${m.title}`,
    "",
    `*${m.tagline}*`,
    "",
    `**Level:** ${m.level}  `,
    `**Default length:** ${m.defaultMinutes} minutes (rescalable to 60 or 120)  `,
    `**Team size:** ${m.teamSize}  `,
    `**Focus:** ${m.domain}  `,
    `**Inspiration:** ${m.inspiration}`,
    "",
    "### Participant brief",
    "",
    "#### Situation",
    "",
    ...b.situation.flatMap((p) => [p, ""]),
    "#### What we know",
    "",
    "| | |",
    "|---|---|",
    ...b.facts.map((x) => `| ${x.label} | ${x.value.replace(/\|/g, "\\|")} |`),
    "",
    "#### Problem statement",
    "",
    `> ${b.problemStatement}`,
    "",
    "#### Constraints",
    "",
    ...list(b.constraints),
    "",
    "#### Deliverables",
    "",
    ...b.deliverables.map((d, i) => `${i + 1}. ${d}`),
    "",
    "#### Roles",
    "",
    ...b.roles.map((r) => `- **${r.name}** (${r.fit}): ${r.responsibility}`),
    "",
    "#### Success looks like",
    "",
    ...list(b.successLooksLike),
    "",
    "#### Session plan (90 minutes)",
    "",
    "| # | Phase | Minutes | Goal |",
    "|---|---|---|---|",
    ...m.phases.map(
      (p, i) => `| ${i + 1} | ${p.name}${p.twistWindow ? " (twist lands here)" : ""} | ${p.minutes} | ${p.goal} |`,
    ),
    "",
    "### Facilitator notes (do not show participants)",
    "",
    "#### Stakeholder brief",
    "",
    f.stakeholderBrief,
    "",
    "#### Likely questions and in-character answers",
    "",
    ...f.stakeholderAnswers.flatMap((qa) => [`- **Q:** ${qa.question}  `, `  **A:** “${qa.answer}”`]),
    "",
    "#### Hidden facts (release only when earned)",
    "",
    ...f.hiddenFacts.flatMap((h) => [`- **When:** ${h.trigger}  `, `  **Reveal:** ${h.reveal}`]),
    "",
    "#### Watch for",
    "",
    ...list(f.watchFor),
    "",
    "#### Possible solution directions (not an answer key)",
    "",
    ...list(f.solutionDirections),
    "",
    "#### Common pitfalls",
    "",
    ...list(f.commonPitfalls),
    "",
    "#### Debrief questions",
    "",
    ...list(f.debriefQuestions),
    "",
    `#### Suggested twists: ${f.recommendedTwists.join(", ")}`,
    "",
  );
}

push(
  "---",
  "",
  "## Mystery Twist Deck",
  "",
  `${twists.length} reusable, scenario-independent cards across ${twistCategories.length} categories.`,
  "",
  "| Difficulty | Meaning | Cards |",
  "|---|---|---|",
  `| Minor | A tweak; the plan survives with adjustments (~5 min) | ${twists.filter((t) => t.difficulty === "Minor").length} |`,
  `| Moderate | One part of the plan must be reworked (~10 min) | ${twists.filter((t) => t.difficulty === "Moderate").length} |`,
  `| Major | The team must reconsider its whole approach (~15 min) | ${twists.filter((t) => t.difficulty === "Major").length} |`,
  "",
);

for (const cat of twistCategories) {
  push(`### ${cat}`, "");
  for (const t of twists.filter((x) => x.category === cat)) {
    push(
      `#### ${t.id}: ${t.title}`,
      "",
      `**Category:** ${t.category}  `,
      `**Difficulty:** ${t.difficulty}`,
      "",
      `**Card text (read aloud):**`,
      "",
      `> ${t.cardText}`,
      "",
      `**When to reveal:** ${t.whenToReveal}`,
      "",
      `**Impact:** ${t.impact}`,
      "",
      `**Facilitator guidance:** ${t.facilitatorGuidance}`,
      "",
    );
  }
}

push(
  "---",
  "",
  "## Team evaluation checklist",
  "",
  `Each criterion is scored ${scoreLabels.map((l, i) => `${i} = ${l}`).join(", ")}.`,
  "",
  "| Criterion | Look for |",
  "|---|---|",
  ...evaluationCriteria.map((c) => `| ${c.label} | ${c.lookFor} |`),
  "",
);

writeFileSync(new URL("../CONTENT.md", import.meta.url), out.join("\n"));
console.log(`Wrote CONTENT.md: ${missions.length} missions, ${twists.length} twist cards.`);
