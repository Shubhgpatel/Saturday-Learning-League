import type { Metadata } from "next";
import { DeckConsole } from "@/components/DeckConsole";
import { twistCategories, twists } from "@/data/twists";

export const metadata: Metadata = {
  title: "Mystery Twist deck",
  description: `${twists.length} reusable twist cards across ${twistCategories.length} categories, with filters, random draws and reset.`,
};

export default function DeckPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10">
        <h1 className="text-5xl font-bold sm:text-6xl">Mystery Twist deck</h1>
        <p className="mt-4 max-w-2xl text-xl text-ink/90">
          Halfway through a mission, draw a card and read it aloud. The team has to reassess and adapt. Cards don&apos;t
          repeat until you reset the deck.
        </p>
      </header>
      <DeckConsole />
    </div>
  );
}
