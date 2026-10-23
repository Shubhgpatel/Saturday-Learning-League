import Link from "next/link";
import { DifficultyBars, TwistCardFace } from "@/components/TwistCardFace";
import { missionMinutes, missions, standardPhases } from "@/data/missions";
import { difficulties, twistCategories, twists } from "@/data/twists";

const heroCards = ["T11", "T05", "T17"].map((id) => twists.find((t) => t.id === id)!);
const totalMinutes = standardPhases.reduce((s, p) => s + p.minutes, 0);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="console-grid overflow-hidden border-b border-rule">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 className="font-console text-[clamp(3rem,8vw,5.75rem)] leading-[0.95] font-bold">
              Real problems. One afternoon. A twist nobody saw coming.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-ink/90">
              Four workplace missions a team can crack in 60 to 120 minutes, a deck of {twists.length} twists to throw in
              halfway, and a console to run the whole session.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#missions"
                className="inline-flex min-h-12 items-center rounded-md bg-amber px-6 text-lg font-semibold text-card-ink hover:bg-amber-deep"
              >
                Choose a mission
              </Link>
              <Link
                href="/control"
                className="inline-flex min-h-12 items-center rounded-md border border-rule px-6 text-lg hover:border-muted"
              >
                Run a session
              </Link>
            </div>
          </div>

          {/* The deck, fanned: the one memorable object on the page */}
          <div className="relative mx-auto h-[28rem] w-full max-w-md sm:h-[29rem]" aria-label="Sample twist cards">
            {heroCards.map((card, i) => (
              <div
                key={card.id}
                className="absolute inset-x-0 mx-auto w-[92%]"
                style={{
                  top: `${i * 6.25}rem`,
                  transform: `rotate(${[-4, 2.5, -1][i]}deg) translateX(${[-14, 18, 0][i]}px)`,
                  zIndex: i,
                }}
              >
                <TwistCardFace card={card} showFacilitator={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission board */}
      <section id="missions" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-bold sm:text-5xl">Pick a mission</h2>
            <p className="max-w-md text-muted">
              Each one has a participant brief for the room and private notes for the facilitator.
            </p>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-lg border border-rule bg-rule">
            {missions.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/missions/${m.id}`}
                  className="group grid gap-3 bg-panel px-5 py-6 transition-colors hover:bg-panel-2 sm:px-7 md:grid-cols-[7.5rem_1fr_11rem] md:items-start md:gap-8"
                >
                  <span className="font-console text-lg font-semibold text-amber">{m.codename.replace("MISSION", "Mission")}</span>
                  <span>
                    <span className="block text-2xl font-semibold group-hover:text-amber sm:text-3xl">{m.title}</span>
                    <span className="mt-2 block max-w-2xl text-ink/85">{m.tagline}</span>
                    <span className="mt-2 block text-sm text-muted">{m.domain}</span>
                  </span>
                  <span className="flex gap-6 text-sm md:flex-col md:gap-1 md:text-right">
                    <span>
                      <span className="text-muted">Level </span>
                      {m.level}
                    </span>
                    <span>
                      <span className="text-muted">Length </span>
                      <span className="tabular">{missionMinutes(m)} min</span>
                    </span>
                    <span>
                      <span className="text-muted">Team </span>
                      {m.teamSize}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Session shape */}
      <section className="border-y border-rule bg-panel/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-4xl font-bold sm:text-5xl">How a session runs</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink/90">
            Every mission follows the same seven phases. The default plan is {totalMinutes} minutes, and the console
            rescales it to 60 or 120 minutes when you need it to.
          </p>

          {/* Proportional timeline */}
          <div className="mt-10 hidden h-3 overflow-hidden rounded-full md:flex" aria-hidden>
            {standardPhases.map((p) => (
              <div
                key={p.name}
                style={{ flexGrow: p.minutes }}
                className={`border-r-2 border-console last:border-0 ${p.twistWindow ? "bg-amber" : "bg-cyan/50"}`}
              />
            ))}
          </div>
          <ol className="mt-4 grid gap-6 md:flex md:gap-0">
            {standardPhases.map((p, i) => (
              <li key={p.name} style={{ flexGrow: p.minutes, flexBasis: 0 }} className="min-w-0 md:pr-4">
                <p className="font-console font-semibold">
                  <span className="tabular text-muted">{i + 1}</span>{" "}
                  <span className={p.twistWindow ? "text-amber" : "text-ink"}>{p.name}</span>
                </p>
                <p className="tabular text-sm text-muted">{p.minutes} min</p>
                <p className="mt-1 text-sm text-ink/85 md:hidden">{p.goal}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Deck */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-4xl font-bold sm:text-5xl">The Mystery Twist deck</h2>
            <p className="mt-4 max-w-xl text-lg text-ink/90">
              {twists.length} cards across {twistCategories.length} categories, from budget cuts to ethical dilemmas.
              None of them belongs to a specific mission, so the same deck works for any scenario. Filter by category or
              difficulty, draw at random, and no card repeats until you reset.
            </p>
            <Link
              href="/deck"
              className="mt-8 inline-flex min-h-12 items-center rounded-md bg-amber px-6 text-lg font-semibold text-card-ink hover:bg-amber-deep"
            >
              Open the deck
            </Link>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-lg border border-rule bg-rule">
            {difficulties.map((d) => {
              const count = twists.filter((t) => t.difficulty === d).length;
              const note = {
                Minor: "A tweak. The plan survives with an adjustment, in about five minutes.",
                Moderate: "One part of the plan has to be reworked, in about ten minutes.",
                Major: "The team has to reconsider its whole approach, in about fifteen minutes.",
              }[d];
              return (
                <div key={d} className="grid grid-cols-[8rem_1fr] gap-4 bg-panel px-5 py-4">
                  <dt className="font-semibold">
                    <DifficultyBars level={d} />
                    <span className="mt-1 block text-sm font-normal text-muted tabular">{count} cards</span>
                  </dt>
                  <dd className="text-ink/90">{note}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* Facilitator note */}
      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-semibold">Participant view</h3>
            <p className="mt-2 text-ink/85">
              The default. Briefs, roles and twist cards are safe to put on a projector.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Facilitator view</h3>
            <p className="mt-2 text-ink/85">
              Switch it on in the header to see stakeholder scripts, hidden facts, what to watch for, and the evaluation
              checklist.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Nothing to sign up for</h3>
            <p className="mt-2 text-ink/85">
              No accounts and no server. Timers, draws and scores are saved in this browser only.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
