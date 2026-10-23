import type { Difficulty, TwistCard } from "@/data/types";

export const difficultyStyle: Record<Difficulty, { stripe: string; chip: string; note: string }> = {
  Minor: { stripe: "bg-cyan", chip: "border-cyan/60 text-cyan", note: "A tweak to the plan" },
  Moderate: { stripe: "bg-amber", chip: "border-amber/60 text-amber", note: "Rework one part" },
  Major: { stripe: "bg-alert", chip: "border-alert/70 text-alert", note: "Rethink the approach" },
};

const inkStripe: Record<Difficulty, string> = {
  Minor: "bg-[#2f8f9b]",
  Moderate: "bg-amber-deep",
  Major: "bg-alert",
};

/** Small difficulty marker: 1, 2 or 3 bars, so it reads without colour too. */
export function DifficultyBars({ level, onCard = false }: { level: Difficulty; onCard?: boolean }) {
  const n = level === "Minor" ? 1 : level === "Moderate" ? 2 : 3;
  return (
    <span className="inline-flex items-center gap-1.5" title={`${level}: ${difficultyStyle[level].note}`}>
      <span aria-hidden className="inline-flex items-end gap-0.5">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-1 rounded-sm ${i <= n ? (onCard ? inkStripe[level] : difficultyStyle[level].stripe) : onCard ? "bg-card-ink/15" : "bg-rule"}`}
            style={{ height: `${4 + i * 3}px` }}
          />
        ))}
      </span>
      <span>{level}</span>
    </span>
  );
}

interface Props {
  card: TwistCard;
  showFacilitator: boolean;
  size?: "large" | "small";
  className?: string;
}

/** A manila "flight data file" card. Facilitator fields appear only when allowed. */
export function TwistCardFace({ card, showFacilitator, size = "small", className = "" }: Props) {
  const large = size === "large";
  return (
    <article
      className={`twist-card overflow-hidden rounded-md ${className}`}
      aria-label={`Twist card ${card.id}: ${card.title}`}
    >
      <div className={`h-1.5 ${inkStripe[card.difficulty]}`} aria-hidden />
      <div className={large ? "py-6 pr-6 pl-10 sm:py-8 sm:pr-8 sm:pl-12" : "py-4 pr-4 pl-9"}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-card-ink/70">
          <span className="font-console font-semibold">
            {card.id}, {card.category}
          </span>
          <DifficultyBars level={card.difficulty} onCard />
        </div>
        <h3
          className={`mt-2 font-semibold text-card-ink ${large ? "text-3xl sm:text-4xl" : "text-xl"}`}
        >
          {card.title}
        </h3>
        <p className={`mt-3 text-card-ink ${large ? "text-lg leading-relaxed sm:text-xl" : "text-[15px]"}`}>
          {card.cardText}
        </p>

        {showFacilitator && (
          <dl
            className={`mt-5 grid gap-3 border-t border-dashed border-card-ink/30 pt-4 text-card-ink ${
              large ? "text-base sm:grid-cols-2" : "text-sm"
            }`}
          >
            <div>
              <dt className="font-console font-semibold text-card-ink/70">When to reveal</dt>
              <dd>{card.whenToReveal}</dd>
            </div>
            <div>
              <dt className="font-console font-semibold text-card-ink/70">Impact</dt>
              <dd>{card.impact}</dd>
            </div>
            <div className={large ? "sm:col-span-2" : ""}>
              <dt className="font-console font-semibold text-card-ink/70">Facilitator guidance</dt>
              <dd>{card.facilitatorGuidance}</dd>
            </div>
          </dl>
        )}
      </div>
    </article>
  );
}
