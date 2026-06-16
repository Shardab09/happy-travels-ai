import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plane, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const Route = createFileRoute("/trip-setup")({
  head: () => ({
    meta: [
      { title: "Set Up Your Trip | HappyTravelsAI" },
      { name: "description", content: "Set your family vacation budget, travel month, duration, and group size." },
      { property: "og:title", content: "Set Up Your Trip | HappyTravelsAI" },
      { property: "og:description", content: "Start planning a family vacation everyone will love." },
    ],
  }),
  component: TripSetup,
});

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border py-5 first:border-t-0">
      <div>
        <p className="font-display text-lg font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">Choose between {min} and {max}</p>
      </div>
      <div className="flex items-center gap-4 rounded-full bg-secondary p-1.5">
        <Button variant="ghost" size="icon" aria-label={`Decrease ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)} className="size-9 rounded-full bg-card text-foreground shadow-sm hover:bg-card hover:text-coral">
          <Minus aria-hidden="true" />
        </Button>
        <span className="w-6 text-center font-display text-lg font-semibold tabular-nums text-foreground">{value}</span>
        <Button variant="ghost" size="icon" aria-label={`Increase ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)} className="size-9 rounded-full bg-card text-foreground shadow-sm hover:bg-card hover:text-coral">
          <Plus aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function TripSetup() {
  const navigate = useNavigate();
  const [plannerName, setPlannerName] = useState("");
  const [budget, setBudget] = useState(7000);
  const [month, setMonth] = useState("Sep");
  const [days, setDays] = useState(7);
  const [travellers, setTravellers] = useState(3);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-secondary px-5 py-8 text-foreground sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-24 top-24 size-64 rounded-full bg-lagoon/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 size-72 rounded-full bg-coral/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-coral">
            <span aria-hidden="true">←</span> Back
          </Link>
          <div className="flex items-center gap-2" aria-label="Step 1 of 4">
            <span className="size-2.5 rounded-full bg-coral" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="ml-1 text-xs font-semibold text-muted-foreground">1 of 4</span>
          </div>
        </div>

        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-lagoon/20 text-foreground">
            <Plane className="size-6 -rotate-12" aria-hidden="true" />
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Let&apos;s set up your trip</h1>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">You&apos;re the planner — tell us the basics and we&apos;ll handle the rest.</p>
        </header>

        <form className="rounded-3xl border border-border bg-card p-5 shadow-[0_24px_70px_-35px_var(--hero-ink)] sm:p-8" onSubmit={(event) => { event.preventDefault(); navigate({ to: "/preferences", search: { member: 1, total: travellers, name: plannerName } }); }}>
          <section className="pb-7">
            <div className="mb-5">
              <label className="font-display text-lg font-semibold" htmlFor="planner-name">Your name (trip planner)</label>
              <p className="mt-1 text-sm text-muted-foreground">Who&apos;s planning this trip?</p>
              <input
                id="planner-name"
                type="text"
                value={plannerName}
                onChange={(e) => setPlannerName(e.target.value)}
                placeholder="e.g. Sharda"
                className="mt-3 w-full rounded-2xl border border-border bg-secondary px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
              />
            </div>
          </section>

          <section className="border-t border-border pb-7 pt-7">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <label className="font-display text-lg font-semibold" htmlFor="budget">Total budget</label>
                <p className="mt-1 text-sm text-muted-foreground">For your whole trip</p>
              </div>
              <output className="font-display text-2xl font-semibold text-foreground" htmlFor="budget">${budget.toLocaleString()}</output>
            </div>
            <Slider id="budget" min={1000} max={20000} step={500} value={[budget]} onValueChange={(value) => setBudget(value[0] ?? 7000)} className="[&>span]:bg-lagoon/20 [&>span>span]:bg-lagoon [&_[role=slider]]:border-lagoon/50" aria-label="Total budget" />
            <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground"><span>$1,000</span><span>$20,000</span></div>
          </section>

          <section className="border-t border-border py-7">
            <h2 className="font-display text-lg font-semibold">When are you travelling?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pick your preferred month</p>
            <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-12">
              {months.map((item) => (
                <Button key={item} type="button" variant="ghost" onClick={() => setMonth(item)} aria-pressed={month === item} className={`h-10 rounded-full px-0 text-sm ${month === item ? "bg-coral text-primary-foreground hover:bg-coral hover:text-primary-foreground" : "bg-secondary text-foreground hover:bg-coral/15"}`}>
                  {item}
                </Button>
              ))}
            </div>
          </section>

          <section className="border-t border-border">
            <Stepper label="How many days?" value={days} min={3} max={21} onChange={setDays} />
            <Stepper label="How many travellers?" value={travellers} min={1} max={10} onChange={setTravellers} />
          </section>

          <Button type="submit" size="lg" className="mt-3 h-14 w-full rounded-full bg-coral text-base font-semibold text-primary-foreground shadow-[0_16px_35px_-16px_var(--coral)] hover:bg-coral/90 sm:text-lg">
            Next: Add preferences <span aria-hidden="true">→</span>
          </Button>
        </form>
      </div>
    </main>
  );
}