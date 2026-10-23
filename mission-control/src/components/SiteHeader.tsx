"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FacilitatorToggle } from "./FacilitatorProvider";

const links = [
  { href: "/#missions", match: "/missions", label: "Missions" },
  { href: "/deck", match: "/deck", label: "Twist deck" },
  { href: "/control", match: "/control", label: "Run a session" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-30 border-b border-rule bg-console/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="lamp" aria-hidden />
          <span className="font-console text-xl font-semibold tracking-tight">Mission Control</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.match);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded px-3 py-2 text-sm transition-colors ${
                  active ? "bg-panel-2 text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <FacilitatorToggle />
        </div>

        <button
          type="button"
          className="flex min-h-11 items-center rounded border border-rule px-3 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-rule px-4 pb-4 md:hidden">
          <nav aria-label="Main" className="flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-base text-ink hover:bg-panel-2"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <FacilitatorToggle />
        </div>
      )}
    </header>
  );
}
