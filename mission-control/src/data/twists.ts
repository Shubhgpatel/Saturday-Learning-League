import type { Difficulty, TwistCard, TwistCategory } from "./types";

// The Mystery Twist Deck. Every card is scenario-independent: wording refers to
// "the customer", "your plan", "a key person", and so on, so the same deck
// works for any mission.
//
// Difficulty guide:
//   Minor    – a tweak; the plan survives with adjustments (≈5 min to absorb)
//   Moderate – one part of the plan has to be reworked (≈10 min)
//   Major    – the team must reconsider its whole approach (≈15 min)

export const twistCategories: TwistCategory[] = [
  "Customer Changes",
  "Budget Changes",
  "Time Pressure",
  "Resource Loss",
  "New Information",
  "Stakeholder Conflict",
  "Technical Limitations",
  "Compliance and Safety",
  "Customer Feedback",
  "Market or Competitor Changes",
  "Unexpected Opportunities",
  "Ethical Dilemmas",
];

export const difficulties: Difficulty[] = ["Minor", "Moderate", "Major"];

export const twists: TwistCard[] = [
  // ── Customer Changes ──────────────────────────────────────────────────────
  {
    id: "T01",
    title: "The New Must-Have",
    category: "Customer Changes",
    difficulty: "Moderate",
    cardText:
      "Message from the customer: “We've just realised one thing is non-negotiable. Whatever you propose must work for people who aren't comfortable with technology or with English. If it doesn't, we can't approve it.”",
    whenToReveal:
      "Early-to-mid: right after the team has shortlisted ideas (about 35–45% into the session).",
    impact:
      "Challenges the team's picture of who the end user is. Ideas that rely on apps, long forms or English-only messaging have to be rethought.",
    facilitatorGuidance:
      "Watch whether the team re-checks every part of the plan or just bolts on “we'll translate it”. Notice who starts speaking for the less tech-savvy user, and whether anyone asks the customer which groups they mean.",
  },
  {
    id: "T02",
    title: "Changed Our Mind",
    category: "Customer Changes",
    difficulty: "Major",
    cardText:
      "The customer has looked at your direction and rejects your team's favourite idea outright: “That's not what we need. Keep going, just not that.” They won't explain further unless you ask good questions.",
    whenToReveal:
      "Mid-session: just after the team commits to a leading idea (about 50%).",
    impact:
      "Removes the team's leading idea and tests how attached they were to it. Forces them to understand the customer's real need instead of defending a solution.",
    facilitatorGuidance:
      "As the customer, give a real reason only if asked a specific question (pick one that fits the mission: cost, risk, brand, or effort). Observe the emotional reaction, whether the team salvages useful parts of the rejected idea, and whether they ask “why” before starting over.",
  },

  // ── Budget Changes ────────────────────────────────────────────────────────
  {
    id: "T03",
    title: "Budget Cut in Half",
    category: "Budget Changes",
    difficulty: "Moderate",
    cardText:
      "Finance update: the budget for your solution has just been cut by 50%, effective immediately. Nothing that was previously approved is guaranteed.",
    whenToReveal:
      "Mid-session, once the team has started assigning money or effort to parts of the plan (about 45–55%).",
    impact:
      "Tests whether the team actually knows what each part of the plan costs, and what they'll protect when forced to cut.",
    facilitatorGuidance:
      "Notice whether the team prices items or hand-waves. What do they cut first: the customer-facing part or the internal part? Do they look for free alternatives, phase the work, or just shrink everything evenly?",
  },
  {
    id: "T04",
    title: "Money With Strings",
    category: "Budget Changes",
    difficulty: "Moderate",
    cardText:
      "Good news, sort of. A sponsor will double your budget, but only if their name is visible to every customer you serve and they get to see the results data at the end.",
    whenToReveal:
      "Mid-to-late: after the team has a budget-limited plan (about 55–65%).",
    impact:
      "Turns a resource gain into a trade-off between funding, brand independence, customer perception and data privacy.",
    facilitatorGuidance:
      "See whether the team accepts automatically or weighs the conditions. Do they consider what customers will think, what “results data” could include, and whether to negotiate the terms? There's no right answer. Look for an explicit, reasoned choice.",
  },

  // ── Time Pressure ─────────────────────────────────────────────────────────
  {
    id: "T05",
    title: "Deadline Moved Up",
    category: "Time Pressure",
    difficulty: "Major",
    cardText:
      "The deadline has moved. A working first version of whatever you're proposing is now needed in half the time. The full version can follow later.",
    whenToReveal:
      "Mid-session, once a full plan exists (about 50%).",
    impact:
      "Forces the team to split the plan into “first version now” and “later”, and to find the smallest thing that still solves the core problem.",
    facilitatorGuidance:
      "Look for a clear phase 1 vs phase 2 split. Does the team protect the most critical element, or keep the easiest parts? Notice whether anyone checks with the customer what “working” means.",
  },
  {
    id: "T06",
    title: "Ten-Minute Warning",
    category: "Time Pressure",
    difficulty: "Minor",
    cardText:
      "The decision-maker has to leave early. Your team now presents 5 minutes earlier than planned, and you get only 3 minutes to pitch, with no more than one page of notes or slides.",
    whenToReveal:
      "Late: during convergence, about 70–80% into the session.",
    impact:
      "Tests clarity and prioritisation of the message rather than the plan itself.",
    facilitatorGuidance:
      "Shorten the clock for real. Watch who edits ruthlessly, whether the pitch leads with the decision and the ask, and whether the team stays calm or scrambles to fit everything in.",
  },

  // ── Resource Loss ─────────────────────────────────────────────────────────
  {
    id: "T07",
    title: "Key Person Out",
    category: "Resource Loss",
    difficulty: "Moderate",
    cardText:
      "Your Coordinator (or whoever has spoken most so far) has been called away. For the next 15 minutes they may listen but not speak, write or point. The team carries on without them.",
    whenToReveal:
      "Mid-session, when one person is clearly driving (about 40–60%).",
    impact:
      "Exposes dependence on one person and whether knowledge has been shared or written down.",
    facilitatorGuidance:
      "Enforce the silence gently. Observe who steps up, whether quieter members contribute more, and whether the team can find its own notes. Ask the silenced person afterwards what they noticed from the outside.",
  },
  {
    id: "T08",
    title: "The Tool Is Gone",
    category: "Resource Loss",
    difficulty: "Moderate",
    cardText:
      "The main tool, system, supplier or channel your plan relies on is unavailable: an outage, a cancelled contract, or blocked by policy. Assume it won't be back in time.",
    whenToReveal:
      "Mid-session, once the plan clearly depends on one tool or partner (about 45–55%).",
    impact:
      "Reveals single points of failure. The team needs a fallback that doesn't depend on the lost resource.",
    facilitatorGuidance:
      "If several tools are involved, you choose the one the plan leans on most. Notice whether the team designs a genuine fallback or just swaps in a near-identical tool, and whether they add resilience to the final plan.",
  },

  // ── New Information ───────────────────────────────────────────────────────
  {
    id: "T09",
    title: "The Numbers Were Wrong",
    category: "New Information",
    difficulty: "Major",
    cardText:
      "Correction from the data team: the most important number your team has been relying on is wrong. The real figure is about half what you were told. The facilitator will tell you which number.",
    whenToReveal:
      "Mid-session, after the team has visibly anchored on a figure (about 45–55%).",
    impact:
      "Challenges a core assumption and tests whether the solution is proportionate to the real size of the problem.",
    facilitatorGuidance:
      "Pick the figure the team quoted most often. Watch whether they know which parts of the plan rested on it, whether they right-size the response (it may now be over-engineered, or a different problem may now be the biggest), and whether they ask how reliable the other numbers are.",
  },
  {
    id: "T10",
    title: "Someone Already Tried This",
    category: "New Information",
    difficulty: "Minor",
    cardText:
      "You discover that an approach very similar to your current plan was tried 18 months ago and quietly abandoned. Nobody wrote down why. One person who was there can answer exactly two questions.",
    whenToReveal:
      "Mid-session, once the team has a favoured approach (about 40–55%).",
    impact:
      "Tests whether the team learns from history, and the quality of their questions.",
    facilitatorGuidance:
      "Answer only two questions, in character. A good default reason for the failure: “No one owned it after launch, so it slowly died.” Notice whether the questions are sharp (“What exactly made people stop?”) or vague, and whether the team designs around the cause.",
  },

  // ── Stakeholder Conflict ──────────────────────────────────────────────────
  {
    id: "T11",
    title: "Two Bosses, Two Answers",
    category: "Stakeholder Conflict",
    difficulty: "Major",
    cardText:
      "Two senior stakeholders have weighed in. One says: “Speed matters most. Get something out this week.” The other says: “Quality and safety matter most. Nothing goes out until it's right.” Both must sign off on your plan.",
    whenToReveal:
      "Mid-to-late: when the team is converging (about 55–65%).",
    impact:
      "Introduces incompatible priorities. The team must negotiate, sequence or design a plan both can accept, rather than pick a winner.",
    facilitatorGuidance:
      "Optionally ask two volunteers to voice the stakeholders. Watch whether the team makes the trade-off explicit, finds a creative middle (phasing, guardrails, a limited pilot), or just picks the louder side.",
  },
  {
    id: "T12",
    title: "The Frontline Pushback",
    category: "Stakeholder Conflict",
    difficulty: "Major",
    cardText:
      "The people who will actually run your solution day to day have seen the plan. They say it will double their workload and they won't support it as designed.",
    whenToReveal:
      "Mid-to-late, after the plan's daily operation is clear (about 55–70%).",
    impact:
      "Tests whether the design works for the operators, not just the customer, and whether adoption has been considered.",
    facilitatorGuidance:
      "If asked, give one concrete complaint (e.g. “We'd have to enter everything twice”). Watch whether the team listens and reduces the burden, or tries to “sell” the plan harder. Strong teams invite the frontline perspective into the redesign.",
  },

  // ── Technical Limitations ─────────────────────────────────────────────────
  {
    id: "T13",
    title: "It Doesn't Scale",
    category: "Technical Limitations",
    difficulty: "Moderate",
    cardText:
      "Technical review: your approach works for a small group but breaks at full scale. It would take ten times the people-hours or system capacity you planned for.",
    whenToReveal:
      "Mid-session, once the method is defined (about 45–60%).",
    impact:
      "Challenges feasibility. The team must automate, prioritise, pilot, or rethink the method.",
    facilitatorGuidance:
      "Notice whether the team asks which part breaks, or assumes the whole thing fails. Good responses include piloting with a subset, prioritising the highest-impact cases, or simplifying the process. Note whether anyone checks capacity numbers.",
  },
  {
    id: "T14",
    title: "Old Phones, Weak Signal",
    category: "Technical Limitations",
    difficulty: "Minor",
    cardText:
      "Reality check: about a third of the people you serve use older low-end phones or have unreliable internet. Anything that needs a new app, large downloads or a constant connection won't reach them.",
    whenToReveal:
      "Early-to-mid: once the team proposes a digital channel (about 30–45%).",
    impact:
      "Challenges technology assumptions and widens the solution to low-bandwidth or offline options.",
    facilitatorGuidance:
      "Watch for practical alternatives (SMS, a phone call, printed or in-person options, lightweight pages) versus dismissing the group as an edge case.",
  },

  // ── Compliance and Safety ─────────────────────────────────────────────────
  {
    id: "T15",
    title: "Privacy Check",
    category: "Compliance and Safety",
    difficulty: "Moderate",
    cardText:
      "Compliance flag: part of your plan collects, shares or stores personal information. Before approval, you must show what data you need, who can see it, how long you keep it, and how people agree to it. Otherwise, remove that part.",
    whenToReveal:
      "Mid-session, as soon as the plan touches personal data (about 40–60%).",
    impact:
      "Pushes the team toward data minimisation and clear consent.",
    facilitatorGuidance:
      "Look for the team shrinking the data they collect rather than just adding a consent checkbox. Note whether they think about access rights and deletion. Don't require legal precision; reward clear, sensible reasoning.",
  },
  {
    id: "T16",
    title: "Policy Says No",
    category: "Compliance and Safety",
    difficulty: "Major",
    cardText:
      "A rule nobody mentioned has surfaced: the main action at the centre of your plan isn't allowed without written approval, and approval takes two weeks.",
    whenToReveal:
      "Mid-session, once the core action is clear (about 45–55%).",
    impact:
      "Blocks the core action. The team must find a compliant alternative, a way to act within the rules while approval is pending, or a legitimate fast-track.",
    facilitatorGuidance:
      "Make it clear that breaking the rule isn't an option. Watch whether the team gives up, ignores the rule, or creatively finds what they can do now (interim measures, a smaller scope that doesn't need approval, starting the approval request immediately).",
  },

  // ── Customer Feedback ─────────────────────────────────────────────────────
  {
    id: "T17",
    title: "The Pilot Said “Meh”",
    category: "Customer Feedback",
    difficulty: "Moderate",
    cardText:
      "Quick feedback from five real users who saw your idea: three found it confusing, one liked it, and one said, “I'd never use this. I'd just call someone.”",
    whenToReveal:
      "Mid-to-late, once a concrete solution exists (about 55–65%).",
    impact:
      "Challenges usability and whether the solution fits real behaviour.",
    facilitatorGuidance:
      "Notice whether the team dismisses the feedback (“small sample”), digs into it (“What confused them?”), or simplifies. Also notice whether anyone takes the “I'd just call someone” comment seriously as an insight.",
  },
  {
    id: "T18",
    title: "The Loudest Voice",
    category: "Customer Feedback",
    difficulty: "Minor",
    cardText:
      "A single angry customer post about this situation has gone viral overnight with thousands of shares. It's partly inaccurate. Your plan now needs a public response within the hour.",
    whenToReveal:
      "Any time after the plan's direction is set (about 40–70%).",
    impact:
      "Adds public-communication pressure and tests accuracy, tone and priorities under scrutiny.",
    facilitatorGuidance:
      "Watch whether the team corrects inaccuracies without sounding defensive, and whether the viral post hijacks the whole plan or is handled proportionately. A strong response acknowledges, corrects and commits to action.",
  },

  // ── Market or Competitor Changes ──────────────────────────────────────────
  {
    id: "T19",
    title: "Competitor Beat You to It",
    category: "Market or Competitor Changes",
    difficulty: "Moderate",
    cardText:
      "A competitor has just announced something almost identical to your idea, and it's free. Your customers are already asking why they should wait for yours.",
    whenToReveal:
      "Mid-to-late, once the solution is defined (about 55–65%).",
    impact:
      "Forces the team to find what's genuinely different or valuable about their approach, or to change course.",
    facilitatorGuidance:
      "Look for the team identifying a real differentiator (trust, fit to their specific customers, service) instead of panicking. Note whether anyone suggests partnering with or learning from the competitor.",
  },
  {
    id: "T20",
    title: "Price Shock",
    category: "Market or Competitor Changes",
    difficulty: "Moderate",
    cardText:
      "External costs have jumped: a key cost your plan depends on (shipping, fuel, advertising, cloud services, materials, or similar) has risen by 40% this week, and nobody knows for how long.",
    whenToReveal:
      "Mid-session, after costs are estimated (about 45–60%).",
    impact:
      "Tests whether the plan's economics still work and how the team handles uncertainty about duration.",
    facilitatorGuidance:
      "You choose the cost that fits the mission. Watch whether the team recalculates, passes cost to customers, absorbs it short-term, or redesigns to depend less on that input. Note how they plan for not knowing how long it will last.",
  },

  // ── Unexpected Opportunities ──────────────────────────────────────────────
  {
    id: "T21",
    title: "A Helping Hand",
    category: "Unexpected Opportunities",
    difficulty: "Minor",
    cardText:
      "A partner organisation offers five volunteers for one week, free. They're enthusiastic but untrained, and they can't access your internal systems or customer data.",
    whenToReveal:
      "Any time after the plan has clear tasks (about 35–65%).",
    impact:
      "Tests whether the team can use extra resources wisely, given the limits.",
    facilitatorGuidance:
      "Notice whether the team finds suitable tasks (packing, phoning with scripts, testing, outreach) or forces volunteers into roles that break the data restriction. It's also fine if they decide the volunteers aren't worth the coordination cost, as long as they reason about it.",
  },
  {
    id: "T22",
    title: "The Shortcut",
    category: "Unexpected Opportunities",
    difficulty: "Minor",
    cardText:
      "Someone has found an existing tool, service or partner that already does about 70% of what you need. Using it means giving up control over how it looks and works, and depending on an outside party.",
    whenToReveal:
      "Mid-session, while the team is designing its own solution (about 40–55%).",
    impact:
      "Raises a build-versus-use decision: speed against control and dependence.",
    facilitatorGuidance:
      "Watch whether the team evaluates what the missing 30% is and whether it matters. Note whether they consider lock-in risk, cost over time, and who owns it if the partner changes.",
  },

  // ── Ethical Dilemmas ──────────────────────────────────────────────────────
  {
    id: "T23",
    title: "Quiet Fix or Full Disclosure",
    category: "Ethical Dilemmas",
    difficulty: "Major",
    cardText:
      "You discover that your own organisation made a mistake that contributed to this problem. Customers don't know. Disclosing it will cost trust and maybe money in the short term. Staying quiet probably won't be discovered.",
    whenToReveal:
      "Mid-to-late, once the communication plan is forming (about 55–70%).",
    impact:
      "Creates a direct trade-off between transparency and short-term self-interest. It can reshape all external communication.",
    facilitatorGuidance:
      "Don't steer toward an answer. Observe how the team reasons: long-term trust, likelihood of discovery, fairness to customers, and consequences for the people involved. Notice who argues which side and whether the team reaches a decision it can explain.",
  },
  {
    id: "T24",
    title: "Fair for Whom?",
    category: "Ethical Dilemmas",
    difficulty: "Moderate",
    cardText:
      "Your solution helps most people, but the quickest version leaves out one group, such as people with disabilities, a particular region, or people who can't pay. Including them doubles the effort for that part.",
    whenToReveal:
      "Mid-to-late, after the solution's reach is clear (about 50–65%).",
    impact:
      "Forces an explicit fairness trade-off between speed and inclusion.",
    facilitatorGuidance:
      "You can name the left-out group to fit the mission. Watch whether the team acknowledges the exclusion openly, finds a cheaper interim option for that group, or phases inclusion with a commitment. Avoid rewarding token gestures.",
  },
];

export function getTwist(id: string): TwistCard | undefined {
  return twists.find((t) => t.id === id);
}
