import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ExternalLink, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  getRecommendations,
  type Destination,
  type RecommendationResult,
  type SourceType,
} from "@/lib/recommendations.functions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>) => ({
    name: typeof search.name === "string" ? search.name : "",
  }),
  head: () => ({
    meta: [
      { title: "Your destinations | HappyTravelsAI" },
      {
        name: "description",
        content: "AI-recommended destinations personalised for your family.",
      },
    ],
  }),
  component: ResultsPage,
});

const SOURCE_STYLES: Record<SourceType, { label: string; cls: string }> = {
  reddit: { label: "Reddit find", cls: "bg-purple-100 text-purple-800 border-purple-200" },
  blog: { label: "Travel blog", cls: "bg-blue-100 text-blue-800 border-blue-200" },
  mainstream: { label: "Mainstream", cls: "bg-gray-100 text-gray-700 border-gray-200" },
};

function ResultsPage() {
  const navigate = useNavigate();
  const fetchRecs = useServerFn(getRecommendations);
  const [data, setData] = useState<RecommendationResult | null>(null);
  const [votes, setVotes] = useState<Record<string, "love" | "no" | null>>({});

  useEffect(() => {
    // Prefer cached result from /generating
    try {
      const cached = sessionStorage.getItem("htai:recommendations");
      if (cached) {
        setData(JSON.parse(cached));
        return;
      }
    } catch {
      /* ignore */
    }
    fetchRecs({ data: { name: "" } }).then((r) => setData(r));
  }, [fetchRecs]);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] flex items-center justify-center p-6">
        <p className="text-[#0c3b3f]/70">Loading your destinations…</p>
      </main>
    );
  }

  const family = data.family.length
    ? data.family.slice(0, -1).join(", ") +
      (data.family.length > 1 ? " and " : "") +
      data.family[data.family.length - 1]
    : "your family";

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto px-5 py-10 sm:py-14">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#0c3b3f] tracking-tight">
            Your family&apos;s perfect destinations
          </h1>
          <p className="mt-3 text-[#0c3b3f]/70 max-w-2xl mx-auto">
            Personalised for {family} based on your preferences and travel history.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.destinations.map((d) => (
            <DestinationCard
              key={d.id}
              destination={d}
              vote={votes[d.id] ?? null}
              onVote={(v) =>
                setVotes((prev) => ({ ...prev, [d.id]: prev[d.id] === v ? null : v }))
              }
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => navigate({ to: "/results", search: { name: "" } })}
            className="h-12 px-8 rounded-full bg-[#ff6f5e] hover:bg-[#ff5a47] text-white font-medium text-base shadow-md"
          >
            Ready to vote as a family? →
          </Button>
        </div>
      </div>
    </main>
  );
}

function DestinationCard({
  destination: d,
  vote,
  onVote,
}: {
  destination: Destination;
  vote: "love" | "no" | null;
  onVote: (v: "love" | "no") => void;
}) {
  const advisory =
    d.advisoryLevel === 1
      ? "bg-green-100 text-green-800 border-green-200"
      : d.advisoryLevel === 2
        ? "bg-amber-100 text-amber-800 border-amber-200"
        : "bg-red-100 text-red-800 border-red-200";
  const source = SOURCE_STYLES[d.sourceType];

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 flex flex-col">
      <div className="relative h-56 sm:h-64">
        <img
          src={d.image}
          alt={`${d.name}, ${d.country}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${advisory}`}>
            {d.advisoryLabel}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${source.cls}`}>
            {source.label}
          </span>
        </div>
        <div className="absolute bottom-4 left-5 right-5">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow">{d.name}</h2>
          <p className="text-white/85 text-sm">{d.country}</p>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0c3b3f]/60 mb-1.5">
            Why this works for your family
          </p>
          <p className="text-[#0c3b3f] leading-relaxed text-[15px]">{d.rationale}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {d.memberCallouts.map((c) => (
            <span
              key={c.member}
              className="text-xs px-3 py-1.5 rounded-full bg-[#0c3b3f]/8 text-[#0c3b3f] border border-[#0c3b3f]/15"
              style={{ backgroundColor: "rgba(12,59,63,0.08)" }}
            >
              <span className="font-medium">{c.member}</span> — {c.reason}
            </span>
          ))}
        </div>

        <p className="text-sm italic text-[#0c3b3f]/60">Builds on: {d.buildsOn}</p>

        <a
          href={d.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#0c3b3f]/60 hover:text-[#0c3b3f]"
        >
          Source: {d.sourceName}
          <ExternalLink className="w-3 h-3" />
        </a>

        <div className="mt-auto pt-4 border-t border-black/5 flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => onVote("love")}
            className={`rounded-full border-[#0c3b3f]/30 text-[#0c3b3f] hover:bg-[#0c3b3f]/5 ${
              vote === "love" ? "bg-[#0c3b3f] text-white hover:bg-[#0c3b3f] hover:text-white" : ""
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            Love it
          </Button>
          <Button
            variant="outline"
            onClick={() => onVote("no")}
            className={`rounded-full border-gray-300 text-gray-600 hover:bg-gray-50 ${
              vote === "no" ? "bg-gray-700 text-white hover:bg-gray-700 hover:text-white" : ""
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            Not for us
          </Button>
          <a
            href={d.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-sm text-[#0c3b3f] font-medium hover:underline"
          >
            Learn more
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
