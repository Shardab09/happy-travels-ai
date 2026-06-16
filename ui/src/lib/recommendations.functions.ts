import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  name: z.string().max(100).optional().default(""),
});

export type AdvisoryLevel = 1 | 2 | 3 | 4;
export type SourceType = "reddit" | "blog" | "mainstream";

export type MemberCallout = {
  member: string;
  reason: string;
};

export type Destination = {
  id: string;
  name: string;
  country: string;
  image: string;
  rationale: string;
  memberCallouts: MemberCallout[];
  buildsOn: string;
  advisoryLevel: AdvisoryLevel;
  advisoryLabel: string;
  sourceType: SourceType;
  sourceName: string;
  sourceUrl: string;
  learnMoreUrl: string;
};

export type RecommendationResult = {
  destinations: Destination[];
  generatedAt: string;
  family: string[];
};

export const getRecommendations = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async (_ctx): Promise<RecommendationResult> => {
    const N8N_WEBHOOK_URL = "https://happytravelsai.app.n8n.cloud/webhook/5edae2aa-6751-4ad5-961d-6bf10585ebb7";

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        family_id: "FAM-DEMO",
        budget: 7000,
        month: "September",
        days: 7,
        travellers: 3,
      }),
    });

    const raw: Array<{
      destination: string;
      rationale: string;
      addresses_member: string | string[];
      builds_on_history: string;
      advisory_level: number;
      mainstream_or_offpath: string;
      source_url: string;
      source_type: string;
    }> = await response.json();

    const destinations: Destination[] = raw.map((item, index) => {
      const [name, ...countryParts] = item.destination.split(",");
      const country = countryParts.join(",").trim();

      const members = Array.isArray(item.addresses_member)
        ? item.addresses_member
        : [item.addresses_member];

      const advisoryLevel = (item.advisory_level ?? 1) as AdvisoryLevel;

      let advisoryLabel: string;
      switch (advisoryLevel) {
        case 1:
          advisoryLabel = "Level 1 ✓";
          break;
        case 2:
          advisoryLabel = "Level 2 ⚠";
          break;
        case 3:
          advisoryLabel = "Level 3 ⚠ Reconsider Travel";
          break;
        case 4:
          advisoryLabel = "Level 4 ⛔ Do Not Travel";
          break;
        default:
          advisoryLabel = "Level 1 ✓";
      }

      let sourceType: SourceType;
      if (item.source_type === "reddit") {
        sourceType = "reddit";
      } else if (item.source_type === "niche_blog") {
        sourceType = "blog";
      } else {
        sourceType = "mainstream";
      }

      return {
        id: String(index),
        name: name.trim(),
        country: country || "Unknown",
        image: `https://picsum.photos/seed/${encodeURIComponent(name)}/1200/800`,
        rationale: item.rationale,
        memberCallouts: members.map((member) => ({ member, reason: "" })),
        buildsOn: item.builds_on_history,
        advisoryLevel,
        advisoryLabel,
        sourceType,
        sourceName: item.source_type,
        sourceUrl: item.source_url,
        learnMoreUrl: item.source_url,
      };
    });

    return {
      generatedAt: new Date().toISOString(),
      family: ["Sharda", "Niel", "Nisha"],
      destinations,
    };
  });
