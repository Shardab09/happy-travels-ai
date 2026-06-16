import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { getRecommendations } from "@/lib/recommendations.functions";

export const Route = createFileRoute("/generating")({
  validateSearch: (search: Record<string, unknown>) => ({
    name: typeof search.name === "string" ? search.name : "",
  }),
  head: () => ({
    meta: [
      { title: "Finding your destinations | HappyTravelsAI" },
      { name: "description", content: "Generating your personalised travel recommendations." },
    ],
  }),
  component: GeneratingPage,
});

function GeneratingPage() {
  const { name } = Route.useSearch();
  const navigate = useNavigate();
  const fetchRecs = useServerFn(getRecommendations);

  const messages = useMemo(
    () => [
      "Analysing your family's travel history...",
      `Finding destinations ${name || "you"} would love...`,
      "Checking travel advisories...",
      "Searching travel communities for hidden gems...",
      "Building your personalised shortlist...",
    ],
    [name],
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 2000);
    return () => clearInterval(t);
  }, [messages.length]);

  // Kick off the recommendation request; auto-advance when it resolves.
  useEffect(() => {
    let cancelled = false;
    fetchRecs({ data: { name } })
      .then((result) => {
        if (cancelled) return;
        try {
          sessionStorage.setItem("htai:recommendations", JSON.stringify(result));
        } catch {
          /* ignore quota / privacy errors */
        }
        navigate({ to: "/results", search: { name } });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Recommendation request failed", err);
        navigate({ to: "/results", search: { name } });
      });
    return () => {
      cancelled = true;
    };
  }, [fetchRecs, navigate, name]);

  // Particles
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 12,
        size: 2 + Math.random() * 3,
      })),
    [],
  );

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c3b3f] px-6 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,127,102,0.18),transparent_60%)]" />

      {/* Drifting particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/40 blur-[1px] animate-drift"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
        {/* A couple of plane glyphs */}
        {[0, 1, 2].map((i) => (
          <span
            key={`plane-${i}`}
            className="absolute text-white/30 animate-plane"
            style={{
              top: `${15 + i * 28}%`,
              animationDelay: `${i * 5}s`,
              animationDuration: `${22 + i * 4}s`,
              fontSize: 18,
            }}
          >
            ✈
          </span>
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <h1
          className="font-[var(--font-display,inherit)] text-3xl font-semibold tracking-tight sm:text-4xl animate-logo-pulse"
          style={{ fontFamily: "Outfit, ui-sans-serif, system-ui" }}
        >
          HappyTravels<span className="text-coral">AI</span>
        </h1>

        <div className="mt-12 h-14 w-full">
          <p
            key={idx}
            className="text-base text-white/85 animate-fade-in sm:text-lg"
          >
            {messages[idx]}
          </p>
        </div>

        <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 rounded-full bg-coral animate-progress-loop" />
        </div>

        <p className="mt-10 text-xs text-white/50">
          Powered by Claude AI + live travel sources
        </p>
      </div>

      <style>{`
        @keyframes drift {
          0% { transform: translate3d(0,0,0); opacity: 0; }
          10% { opacity: 0.8; }
          50% { transform: translate3d(20px,-30px,0); opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translate3d(-10px,-80px,0); opacity: 0; }
        }
        .animate-drift { animation: drift linear infinite; }

        @keyframes plane {
          0% { transform: translateX(-10vw) translateY(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateX(110vw) translateY(-20px); opacity: 0; }
        }
        .animate-plane { animation: plane linear infinite; left: 0; }

        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); text-shadow: 0 0 0 rgba(255,127,102,0); }
          50% { transform: scale(1.04); text-shadow: 0 0 24px rgba(255,127,102,0.35); }
        }
        .animate-logo-pulse { animation: logo-pulse 2.4s ease-in-out infinite; }

        @keyframes progress-loop {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-progress-loop { animation: progress-loop 1.8s ease-in-out infinite; }
      `}</style>
    </main>
  );
}
