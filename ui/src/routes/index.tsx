import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/happytravels-hero.jpg.asset.json";
import islandAsset from "@/assets/island-destination.jpg.asset.json";
import lisbonAsset from "@/assets/lisbon-destination.jpg.asset.json";

const heroImage = heroAsset.url;
const islandImage = islandAsset.url;
const lisbonImage = lisbonAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HappyTravelsAI | Family Vacation Planner" },
      { name: "description", content: "Plan a family vacation everyone will love with AI recommendations shaped around every family member." },
      { property: "og:title", content: "HappyTravelsAI | Family Vacation Planner" },
      { property: "og:description", content: "AI-powered family vacation ideas shaped around everyone’s preferences." },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative isolate min-h-[100svh] overflow-hidden bg-hero-ink text-hero-foreground">
      <img
        src={heroImage}
        alt="A family walking toward a turquoise Mediterranean cove at sunset"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="hero-drift absolute inset-0 -z-30 h-full w-full object-cover object-[58%_center]"
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-hero-ink/55 via-hero-ink/25 to-hero-ink/80" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-hero-ink/45 via-transparent to-coral/10" />

      <div className="absolute -left-24 top-[24%] -z-10 h-64 w-64 rounded-full bg-lagoon/35 blur-3xl" />
      <div className="absolute -right-16 bottom-[8%] -z-10 h-72 w-72 rounded-full bg-coral/30 blur-3xl" />

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-7 sm:px-10 lg:px-14">
        <a href="/" className="font-display text-xl font-semibold tracking-[-0.03em] text-hero-foreground sm:text-2xl">
          HappyTravels<span className="text-sunshine">AI</span>
        </a>
        <div className="hidden items-center gap-2 rounded-full border border-hero-foreground/25 bg-hero-ink/20 px-3 py-2 text-xs font-medium text-hero-foreground/90 backdrop-blur-md sm:flex">
          <span className="size-2 rounded-full bg-sunshine" />
          Made for the whole crew
        </div>
      </header>

      <section className="mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 pb-28 pt-28 text-center sm:px-10 lg:pb-24">
        <div className="hero-rise [animation-delay:100ms] rounded-full border border-hero-foreground/25 bg-hero-ink/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-hero-foreground backdrop-blur-md">
          Your family · One unforgettable trip
        </div>

        <h1 className="hero-rise mt-7 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-balance sm:text-7xl lg:text-[5.75rem] [animation-delay:180ms]">
          Plan a trip your whole family will <span className="text-sunshine">love</span>
        </h1>

        <p className="hero-rise mt-6 max-w-2xl text-base leading-relaxed text-pretty text-hero-foreground/90 sm:text-xl [animation-delay:260ms]">
          AI-powered recommendations built around every family member&apos;s preferences — not just the planner&apos;s.
        </p>

        <Button
          asChild
          size="lg"
          className="hero-rise mt-9 h-14 rounded-full bg-coral px-8 text-base font-semibold text-primary-foreground shadow-[0_18px_50px_-15px_var(--coral)] transition-transform duration-300 hover:scale-105 hover:bg-coral active:scale-95 sm:h-16 sm:px-10 sm:text-lg [animation-delay:340ms]"
        >
          <Link to="/trip-setup">Start Planning <span aria-hidden="true">→</span></Link>
        </Button>

        <div className="hero-rise mt-7 flex items-center gap-3 text-left [animation-delay:420ms]">
          <div className="flex -space-x-2" aria-hidden="true">
          {[
              ["S", "bg-lagoon"],
              ["N", "bg-coral"],
              ["N", "bg-sunshine text-hero-ink"],
            ].map(([initial, color], i) => (
              <span key={`${initial}-${i}`} className={`grid size-9 place-items-center rounded-full border-2 border-hero-foreground/80 text-xs font-bold ${color}`}>
                {initial}
              </span>
            ))}
          </div>
          <p className="text-xs leading-tight text-hero-foreground/80">
            Family profiles<br /><strong className="font-semibold text-hero-foreground">Everyone gets a say</strong>
          </p>
        </div>
      </section>

      <figure className="postcard-float absolute -left-9 bottom-8 hidden w-36 overflow-hidden rounded-2xl border-4 border-hero-foreground bg-hero-foreground shadow-2xl lg:block xl:left-10 xl:w-44">
        <img src={lisbonImage} alt="A yellow tram in colorful Lisbon" width={768} height={960} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        <figcaption className="px-3 py-2 font-display text-xs font-semibold text-hero-ink">Lisbon, Portugal</figcaption>
      </figure>

      <figure className="absolute -right-8 top-[18%] hidden w-36 rotate-6 overflow-hidden rounded-2xl border-4 border-hero-foreground bg-hero-foreground shadow-2xl lg:block xl:right-10 xl:w-44">
        <img src={islandImage} alt="A turquoise tropical island cove" width={768} height={960} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        <figcaption className="px-3 py-2 font-display text-xs font-semibold text-hero-ink">Island daydreams</figcaption>
      </figure>

      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-coral via-sunshine to-lagoon" />
    </main>
  );
}
