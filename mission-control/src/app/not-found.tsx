import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="text-5xl font-bold">This page isn&apos;t on the board</h1>
      <p className="mt-4 text-lg text-ink/90">
        The link may be mistyped, or the mission may have been renamed. Pick a mission from the list instead.
      </p>
      <Link
        href="/#missions"
        className="mt-8 inline-flex min-h-12 items-center rounded-md bg-amber px-6 font-semibold text-card-ink hover:bg-amber-deep"
      >
        See all missions
      </Link>
    </div>
  );
}
