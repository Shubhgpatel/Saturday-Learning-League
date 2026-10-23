import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MissionTabs } from "@/components/MissionTabs";
import { TwistCardFace } from "@/components/TwistCardFace";
import { getMission, missionMinutes, missions } from "@/data/missions";
import { getTwist } from "@/data/twists";
import type { Mission } from "@/data/types";

// Only the 4 missions exist; any other id is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return missions.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps<"/missions/[id]">): Promise<Metadata> {
  const { id } = await params;
  const mission = getMission(id);
  if (!mission) return { title: "Mission not found" };
  return { title: mission.title, description: mission.tagline };
}

const fitLabel = { technical: "Technical", "non-technical": "Non-technical", any: "Anyone" } as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-rule pt-6 md:grid-cols-[12rem_1fr] md:gap-8">
      <h2 className="font-console text-xl font-semibold text-muted">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function List({ items, marker = "amber" }: { items: string[]; marker?: "amber" | "cyan" | "alert" }) {
  const dot = { amber: "bg-amber", cyan: "bg-cyan", alert: "bg-alert" }[marker];
  return (
    <ul className="grid max-w-prose gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Brief({ mission }: { mission: Mission }) {
  const { brief } = mission;
  return (
    <div className="grid gap-10">
      <Section title="Situation">
        <div className="grid max-w-prose gap-4 text-lg">
          {brief.situation.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section title="What we know">
        <dl className="grid overflow-hidden rounded-md border border-rule">
          {brief.facts.map((f, i) => (
            <div
              key={f.label}
              className={`grid gap-1 px-4 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4 ${i % 2 ? "bg-panel" : "bg-panel-2/60"}`}
            >
              <dt className="font-console font-semibold text-cyan">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Your mission">
        <p className="max-w-prose border-l-4 border-amber pl-5 font-console text-2xl leading-snug font-medium sm:text-3xl">
          {brief.problemStatement}
        </p>
      </Section>

      <Section title="Constraints">
        <List items={brief.constraints} marker="alert" />
      </Section>

      <Section title="Deliverables">
        <ol className="grid max-w-prose gap-2.5">
          {brief.deliverables.map((d, i) => (
            <li key={d} className="flex gap-3">
              <span className="tabular w-6 shrink-0 font-console font-semibold text-amber">{i + 1}</span>
              <span>{d}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Roles">
        <p className="mb-4 max-w-prose text-muted">
          Draw roles at random. With fewer people, combine roles. With more, add a second Reviewer or Analyst.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {brief.roles.map((r) => (
            <li key={r.name} className="rounded-md border border-rule bg-panel p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{r.name}</h3>
                <span className="text-sm text-muted">{fitLabel[r.fit]}</span>
              </div>
              <p className="mt-1.5 text-[15px] text-ink/90">{r.responsibility}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Success looks like">
        <List items={brief.successLooksLike} marker="cyan" />
      </Section>

      <Section title="Session plan">
        <ol className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule">
          {mission.phases.map((p, i) => (
            <li
              key={p.name}
              className={`grid gap-1 bg-panel px-4 py-3 sm:grid-cols-[2rem_8rem_4.5rem_1fr] sm:items-baseline sm:gap-4 ${
                p.twistWindow ? "bg-panel-2" : ""
              }`}
            >
              <span className="tabular font-console text-muted">{i + 1}</span>
              <span className="font-semibold">{p.name}</span>
              <span className="tabular text-muted">{p.minutes} min</span>
              <span>
                {p.goal}
                {p.twistWindow && (
                  <span className="ml-2 inline-block rounded bg-amber px-1.5 text-sm font-semibold text-card-ink">
                    Twist lands here
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

function Notes({ mission }: { mission: Mission }) {
  const f = mission.facilitator;
  return (
    <div className="grid gap-10">
      <p className="rounded-md border border-amber/40 bg-amber/5 px-4 py-3 text-sm">
        Facilitator only. Keep this view off the projector. Hidden facts are released only when a team asks the
        right question.
      </p>

      <Section title="Stakeholder brief">
        <p className="max-w-prose text-lg">{f.stakeholderBrief}</p>
      </Section>

      <Section title="Likely questions">
        <dl className="grid gap-3">
          {f.stakeholderAnswers.map((qa) => (
            <div key={qa.question} className="rounded-md border border-rule bg-panel p-4">
              <dt className="font-semibold">{qa.question}</dt>
              <dd className="mt-1 text-ink/90">“{qa.answer}”</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Hidden facts">
        <dl className="grid gap-3">
          {f.hiddenFacts.map((h) => (
            <div key={h.trigger} className="rounded-md border border-cyan/40 bg-panel p-4">
              <dt className="text-sm text-cyan">Release when: {h.trigger}</dt>
              <dd className="mt-1.5">{h.reveal}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Watch for">
        <List items={f.watchFor} />
      </Section>

      <Section title="Possible directions">
        <p className="mb-3 max-w-prose text-sm text-muted">
          Not an answer key. Use these to judge whether a team&apos;s plan covers the ground, and never reveal them during the
          session.
        </p>
        <List items={f.solutionDirections} marker="cyan" />
      </Section>

      <Section title="Common pitfalls">
        <List items={f.commonPitfalls} marker="alert" />
      </Section>

      <Section title="Debrief questions">
        <List items={f.debriefQuestions} />
      </Section>

      <Section title="Suggested twists">
        <div className="grid gap-4 lg:grid-cols-2">
          {f.recommendedTwists.map((id) => {
            const t = getTwist(id);
            return t ? <TwistCardFace key={id} card={t} showFacilitator /> : null;
          })}
        </div>
      </Section>
    </div>
  );
}

export default async function MissionPage({ params }: PageProps<"/missions/[id]">) {
  const { id } = await params;
  const mission = getMission(id);
  if (!mission) notFound();

  const index = missions.findIndex((m) => m.id === mission.id);
  const next = missions[(index + 1) % missions.length];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="no-print mb-8 text-sm text-muted">
        <Link href="/#missions" className="hover:text-ink">
          All missions
        </Link>
      </nav>

      <header className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-console text-lg font-semibold text-amber">{mission.codename}</p>
          <h1 className="mt-1 text-5xl font-bold sm:text-6xl">{mission.title}</h1>
          <p className="mt-4 max-w-2xl text-xl text-ink/90">{mission.tagline}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-muted">Level</dt>
              <dd className="font-semibold">{mission.level}</dd>
            </div>
            <div>
              <dt className="text-muted">Default length</dt>
              <dd className="font-semibold">{missionMinutes(mission)} minutes (60–120 supported)</dd>
            </div>
            <div>
              <dt className="text-muted">Team size</dt>
              <dd className="font-semibold">{mission.teamSize}</dd>
            </div>
            <div>
              <dt className="text-muted">Focus</dt>
              <dd className="font-semibold">{mission.domain}</dd>
            </div>
          </dl>
        </div>
        <div className="no-print flex flex-wrap gap-3">
          <Link
            href={`/control?mission=${mission.id}`}
            className="inline-flex min-h-11 items-center rounded-md bg-amber px-5 py-2.5 font-semibold text-card-ink hover:bg-amber-deep"
          >
            Run this mission
          </Link>
        </div>
      </header>

      <MissionTabs brief={<Brief mission={mission} />} notes={<Notes mission={mission} />} />

      <footer className="no-print mt-16 flex flex-col gap-2 border-t border-rule pt-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p className="max-w-prose">{mission.inspiration}</p>
        <Link href={`/missions/${next.id}`} className="shrink-0 text-cyan hover:underline">
          Next: {next.title}
        </Link>
      </footer>
    </div>
  );
}
