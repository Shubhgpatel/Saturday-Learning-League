import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { FacilitatorProvider } from "@/components/FacilitatorProvider";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mission Control: team problem-solving missions",
    template: "%s | Mission Control",
  },
  description:
    "Four realistic 60–120 minute team missions, a reusable Mystery Twist deck, and a facilitator console with timer, progress tracking and team evaluation.",
};

export const viewport: Viewport = {
  themeColor: "#121c25",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded bg-amber px-3 py-2 font-semibold text-card-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <FacilitatorProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <footer className="no-print border-t border-rule">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p>
                Free to use. Runs entirely in your browser, and session data stays on this device.
              </p>
              <nav aria-label="Footer" className="flex gap-5">
                <Link href="/#missions" className="hover:text-ink">
                  Missions
                </Link>
                <Link href="/deck" className="hover:text-ink">
                  Twist deck
                </Link>
                <Link href="/control" className="hover:text-ink">
                  Run a session
                </Link>
              </nav>
            </div>
          </footer>
        </FacilitatorProvider>
      </body>
    </html>
  );
}
