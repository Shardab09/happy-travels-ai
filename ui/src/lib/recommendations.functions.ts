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

// Stub: simulates the n8n webhook + AI call.
// TODO: replace with fetch(N8N_WEBHOOK_URL, ...) on Day 4.
export const getRecommendations = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async (_ctx): Promise<RecommendationResult> => {
    await new Promise((r) => setTimeout(r, 8000));

    return {
      generatedAt: new Date().toISOString(),
      family: ["Sharda", "Niel", "Nisha"],
      destinations: [
        {
          id: "azores",
          name: "São Miguel, Azores",
          country: "Portugal",
          image:
            "https://images.unsplash.com/photo-1583531352515-8884af319dc7?auto=format&fit=crop&w=1200&q=70",
          rationale:
            "Dramatic cliffs, volcanic hot springs and quiet coastal walks — fewer crowds than mainland Portugal, with the kind of cinematic scenery Sharda loves and adventure beaches Nisha can explore.",
          memberCallouts: [
            { member: "Sharda", reason: "scenic crater views" },
            { member: "Niel", reason: "sea caves & history" },
            { member: "Nisha", reason: "adventure beaches" },
          ],
          buildsOn: "Nisha's love of cliff jumping in Greece",
          advisoryLevel: 1,
          advisoryLabel: "Level 1 ✓",
          sourceType: "reddit",
          sourceName: "r/travel — hidden Azores gems",
          sourceUrl: "https://www.reddit.com/r/travel/",
          learnMoreUrl: "https://www.visitazores.com/",
        },
        {
          id: "lofoten",
          name: "Lofoten Islands",
          country: "Norway",
          image:
            "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=70",
          rationale:
            "Jagged peaks dropping into turquoise water, sleepy fishing villages and proper hiking. Photogenic from every angle, with safe roads and family-friendly cabins.",
          memberCallouts: [
            { member: "Sharda", reason: "fjord viewpoints" },
            { member: "Niel", reason: "viking history" },
            { member: "Nisha", reason: "kayaking & surf" },
          ],
          buildsOn: "your love of scenic drives in Iceland",
          advisoryLevel: 1,
          advisoryLabel: "Level 1 ✓",
          sourceType: "blog",
          sourceName: "Nordic Visitor — Lofoten guide",
          sourceUrl: "https://www.nordicvisitor.com/",
          learnMoreUrl: "https://www.lofoten.info/",
        },
        {
          id: "oaxaca",
          name: "Oaxaca",
          country: "Mexico",
          image:
            "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=70",
          rationale:
            "Colourful colonial streets, world-class food markets and a short drive to Pacific beaches. A culture-and-coast combo with strong local food that suits the whole family.",
          memberCallouts: [
            { member: "Sharda", reason: "markets & textiles" },
            { member: "Niel", reason: "Mesoamerican ruins" },
            { member: "Nisha", reason: "surf at Mazunte" },
          ],
          buildsOn: "the family's love of local food tours",
          advisoryLevel: 2,
          advisoryLabel: "Level 2 ⚠",
          sourceType: "reddit",
          sourceName: "r/solotravel — Oaxaca with kids",
          sourceUrl: "https://www.reddit.com/r/solotravel/",
          learnMoreUrl: "https://www.visitmexico.com/oaxaca",
        },
        {
          id: "slovenia",
          name: "Lake Bled & Soča Valley",
          country: "Slovenia",
          image:
            "https://images.unsplash.com/photo-1503918748781-7a3408cf8eb1?auto=format&fit=crop&w=1200&q=70",
          rationale:
            "Alpine lakes, emerald rivers and easy day-hikes — compact enough to base in one place. Quietly one of Europe's safest and most under-rated family destinations.",
          memberCallouts: [
            { member: "Sharda", reason: "lakeside walks" },
            { member: "Niel", reason: "castle tours" },
            { member: "Nisha", reason: "white-water rafting" },
          ],
          buildsOn: "your alpine trip to Switzerland",
          advisoryLevel: 1,
          advisoryLabel: "Level 1 ✓",
          sourceType: "mainstream",
          sourceName: "Lonely Planet — Slovenia",
          sourceUrl: "https://www.lonelyplanet.com/slovenia",
          learnMoreUrl: "https://www.slovenia.info/",
        },
        {
          id: "kyoto",
          name: "Kyoto & Nara",
          country: "Japan",
          image:
            "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=70",
          rationale:
            "Temples, bamboo groves and unbeatable trains. Walkable neighbourhoods, calm parks and side-trips to Nara's deer mean everyone gets their kind of day.",
          memberCallouts: [
            { member: "Sharda", reason: "temple gardens" },
            { member: "Niel", reason: "samurai history" },
            { member: "Nisha", reason: "Arashiyama bamboo hike" },
          ],
          buildsOn: "your trip to Seoul in 2023",
          advisoryLevel: 1,
          advisoryLabel: "Level 1 ✓",
          sourceType: "blog",
          sourceName: "Inside Kyoto — itineraries",
          sourceUrl: "https://www.insidekyoto.com/",
          learnMoreUrl: "https://kyoto.travel/en",
        },
      ],
    };
  });
