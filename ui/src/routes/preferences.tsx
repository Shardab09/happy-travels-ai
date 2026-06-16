import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const PREFERENCES = [
  { emoji: "🏖", label: "Beach" },
  { emoji: "🥾", label: "Hiking" },
  { emoji: "🏛", label: "Culture" },
  { emoji: "🍜", label: "Food scene" },
  { emoji: "🌊", label: "Adventure" },
  { emoji: "🌃", label: "Nightlife" },
  { emoji: "🏰", label: "History" },
  { emoji: "📸", label: "Photography" },
  { emoji: "🌿", label: "Nature" },
  { emoji: "🏙", label: "City life" },
  { emoji: "🏝", label: "Island" },
  { emoji: "💆", label: "Wellness" },
  { emoji: "✈️", label: "Off-beaten-path" },
  { emoji: "🛶", label: "Boat trips" },
  { emoji: "🌅", label: "Scenic views" },
];

export const Route = createFileRoute("/preferences")({
  validateSearch: (search: Record<string, unknown>) => ({
    member: Number(search.member ?? 1) || 1,
    total: Number(search.total ?? 3) || 3,
    name: typeof search.name === "string" ? search.name : "",
  }),
  head: () => ({
    meta: [
      { title: "Your Travel Style | HappyTravelsAI" },
      { name: "description", content: "Tell us what you love — we'll match your family with the perfect trip." },
    ],
  }),
  component: Preferences,
});

function Preferences() {
  const { member, total, name: initialName } = Route.useSearch();
  const navigate = useNavigate();
  const [name, setName] = useState(initialName);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");

  const toggle = (label: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const canContinue = selected.size >= 2 && name.trim().length > 0;

  const handleNext = () => {
    if (!canContinue) return;
    if (member < total) {
      navigate({ to: "/preferences", search: { member: member + 1, total, name: "" } });
      setSelected(new Set());
      setNotes("");
      setName("");
    } else {
      navigate({ to: "/travel-history", search: { name } });
    }
  };

  const displayName = name.trim() || "traveller";

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-secondary px-5 py-8 text-foreground sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-24 top-24 size-64 rounded-full bg-lagoon/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 size-72 rounded-full bg-coral/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/trip-setup" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-coral">
            <span aria-hidden="true">←</span> Back
          </Link>
          <div className="flex items-center gap-2" aria-label="Step 2 of 4">
            <span className="size-2.5 rounded-full bg-coral" />
            <span className="size-2.5 rounded-full bg-coral" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="ml-1 text-xs font-semibold text-muted-foreground">2 of 4</span>
          </div>
        </div>

        <header className="mb-6 text-center">
          <p className="mb-3 inline-block rounded-full bg-lagoon/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
            Adding preferences for member {member} of {total}
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Hi {displayName}, what&apos;s your travel style?
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pick everything that appeals to you — the more you choose, the better we match.
          </p>
        </header>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-[0_24px_70px_-35px_var(--hero-ink)] sm:p-8">
          <div className="mb-6">
            <label htmlFor="member-name" className="text-sm font-semibold text-foreground">I am:</label>
            <input
              id="member-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-2 w-full rounded-2xl border border-border bg-secondary px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PREFERENCES.map((pref) => {
              const isSelected = selected.has(pref.label);
              return (
                <button
                  key={pref.label}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggle(pref.label)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 px-3 py-5 text-center transition-all ${
                    isSelected
                      ? "border-lagoon bg-lagoon/10 text-foreground shadow-sm"
                      : "border-border bg-secondary text-foreground hover:border-lagoon/40 hover:bg-lagoon/5"
                  }`}
                >
                  <span className="text-3xl" aria-hidden="true">{pref.emoji}</span>
                  <span className="text-sm font-semibold">{pref.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-7">
            <label htmlFor="notes" className="text-sm font-semibold text-foreground">Anything else? <span className="font-normal text-muted-foreground">(optional)</span></label>
            <input
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. love street markets, mild weather…"
              className="mt-2 w-full rounded-2xl border border-border bg-secondary px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
            />
          </div>

          <Button
            type="button"
            size="lg"
            disabled={!canContinue}
            onClick={handleNext}
            className="mt-7 h-14 w-full rounded-full bg-coral text-base font-semibold text-primary-foreground shadow-[0_16px_35px_-16px_var(--coral)] hover:bg-coral/90 sm:text-lg"
          >
            {member < total ? `Next traveller →` : `Next →`}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {selected.size < 2 ? `Pick at least ${2 - selected.size} more to continue` : `${selected.size} selected`}
          </p>
        </div>
      </div>
    </main>
  );
}
