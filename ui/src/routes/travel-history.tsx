import { useState, type KeyboardEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const YEARS = Array.from({ length: 2025 - 2018 + 1 }, (_, i) => 2025 - i);

type Verdict = "Yes" | "Maybe" | "No";

type Trip = {
  place: string;
  year: number;
  loves: string[];
  loveInput: string;
  rating: number;
  verdict: Verdict | null;
};

const emptyTrip = (): Trip => ({
  place: "",
  year: 2024,
  loves: [],
  loveInput: "",
  rating: 0,
  verdict: null,
});

export const Route = createFileRoute("/travel-history")({
  validateSearch: (search: Record<string, unknown>) => ({
    name: typeof search.name === "string" ? search.name : "",
  }),
  head: () => ({
    meta: [
      { title: "Your Travel History | HappyTravelsAI" },
      { name: "description", content: "Share a trip you loved so we can personalise your recommendations." },
    ],
  }),
  component: TravelHistory,
});

function TravelHistory() {
  const navigate = useNavigate();
  const { name } = Route.useSearch();
  const [trips, setTrips] = useState<Trip[]>([emptyTrip()]);

  const updateTrip = (idx: number, patch: Partial<Trip>) => {
    setTrips((prev) => prev.map((t, i) => (i === idx ? { ...t, ...patch } : t)));
  };

  const addLove = (idx: number) => {
    const trip = trips[idx];
    const value = trip.loveInput.trim();
    if (!value || trip.loves.includes(value)) {
      updateTrip(idx, { loveInput: "" });
      return;
    }
    updateTrip(idx, { loves: [...trip.loves, value], loveInput: "" });
  };

  const removeLove = (idx: number, love: string) => {
    updateTrip(idx, { loves: trips[idx].loves.filter((l) => l !== love) });
  };

  const handleLoveKey = (idx: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addLove(idx);
    }
  };

  const canFinish = trips.every((t) => t.place.trim() && t.rating > 0 && t.verdict);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-secondary px-5 py-8 text-foreground sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-24 top-24 size-64 rounded-full bg-lagoon/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 size-72 rounded-full bg-coral/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/preferences" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-coral">
            <span aria-hidden="true">←</span> Back
          </Link>
          <div className="flex items-center gap-2" aria-label="Step 3 of 4">
            <span className="size-2.5 rounded-full bg-coral" />
            <span className="size-2.5 rounded-full bg-coral" />
            <span className="size-2.5 rounded-full bg-coral" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="ml-1 text-xs font-semibold text-muted-foreground">3 of 4</span>
          </div>
        </div>

        <header className="mb-6 text-center">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Tell us about a trip you loved
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            We use your travel history to personalise recommendations — not just what you say you like, but what you&apos;ve actually loved.
          </p>
        </header>

        <div className="space-y-5">
          {trips.map((trip, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-card p-5 shadow-[0_24px_70px_-35px_var(--hero-ink)] sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">Trip {idx + 1}</h2>
                {idx === 1 && (
                  <button
                    type="button"
                    onClick={() => setTrips((prev) => prev.slice(0, 1))}
                    className="text-xs font-semibold text-muted-foreground hover:text-coral"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-foreground">Where did you go?</label>
                  <input
                    type="text"
                    value={trip.place}
                    onChange={(e) => updateTrip(idx, { place: e.target.value })}
                    placeholder="e.g. Greece — Santorini, Milos"
                    className="mt-2 w-full rounded-2xl border border-border bg-secondary px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground">When?</label>
                  <select
                    value={trip.year}
                    onChange={(e) => updateTrip(idx, { year: Number(e.target.value) })}
                    className="mt-2 w-full rounded-2xl border border-border bg-secondary px-4 py-3 text-foreground outline-none transition-colors focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground">What did you love doing?</label>
                  <div className="mt-2 flex flex-wrap gap-2 rounded-2xl border border-border bg-secondary px-3 py-2 focus-within:border-lagoon focus-within:ring-2 focus-within:ring-lagoon/20">
                    {trip.loves.map((love) => (
                      <span
                        key={love}
                        className="inline-flex items-center gap-1.5 rounded-full bg-lagoon/15 px-3 py-1 text-sm font-semibold text-foreground"
                      >
                        {love}
                        <button
                          type="button"
                          onClick={() => removeLove(idx, love)}
                          aria-label={`Remove ${love}`}
                          className="text-muted-foreground hover:text-coral"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={trip.loveInput}
                      onChange={(e) => updateTrip(idx, { loveInput: e.target.value })}
                      onKeyDown={handleLoveKey(idx)}
                      onBlur={() => addLove(idx)}
                      placeholder={trip.loves.length === 0 ? "cliff jumping, boat trips, local food…" : "Add another"}
                      className="min-w-[140px] flex-1 bg-transparent px-1 py-1 text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Press Enter or comma to add</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground">Overall, how was it?</label>
                  <div className="mt-2 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= trip.rating;
                      return (
                        <button
                          key={star}
                          type="button"
                          aria-label={`${star} star${star > 1 ? "s" : ""}`}
                          onClick={() => updateTrip(idx, { rating: star })}
                          className={`text-4xl leading-none transition-transform hover:scale-110 ${active ? "text-coral" : "text-border"}`}
                        >
                          ★
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground">Would you go back?</label>
                  <div className="mt-2 flex gap-2">
                    {(["Yes", "Maybe", "No"] as Verdict[]).map((v) => {
                      const active = trip.verdict === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => updateTrip(idx, { verdict: v })}
                          className={`flex-1 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-all ${
                            active
                              ? "border-coral bg-coral text-primary-foreground shadow-sm"
                              : "border-border bg-secondary text-foreground hover:border-coral/40"
                          }`}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {trips.length < 2 && (
            <button
              type="button"
              onClick={() => setTrips((prev) => [...prev, emptyTrip()])}
              className="w-full rounded-2xl border-2 border-dashed border-border bg-card/50 px-4 py-4 text-sm font-semibold text-foreground transition-colors hover:border-lagoon hover:bg-lagoon/5"
            >
              + Add another trip
            </button>
          )}
        </div>

        <Button
          type="button"
          size="lg"
          disabled={!canFinish}
          onClick={() => navigate({ to: "/generating", search: { name } })}
          className="mt-7 h-14 w-full rounded-full bg-coral text-base font-semibold text-primary-foreground shadow-[0_16px_35px_-16px_var(--coral)] hover:bg-coral/90 sm:text-lg"
        >
          Find our destinations →
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          🔒 Your history is private — only used to personalise your recommendations
        </p>
      </div>
    </main>
  );
}
