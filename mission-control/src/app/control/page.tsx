import type { Metadata } from "next";
import { SessionConsole } from "@/components/SessionConsole";

export const metadata: Metadata = {
  title: "Run a session",
  description: "Session timer, mission selector, progress tracker, twist draws and team evaluation.",
};

export default function ControlPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10">
        <h1 className="text-5xl font-bold sm:text-6xl">Run a session</h1>
        <p className="mt-4 max-w-2xl text-xl text-ink/90">
          Pick the mission, start the clock, and move through the phases. Progress is saved in this browser, so a
          refresh won&apos;t lose your place.
        </p>
      </header>
      <SessionConsole />
    </div>
  );
}
