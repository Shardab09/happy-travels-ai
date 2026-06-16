# HappyTravelsAI — Product Requirements Document

**Date:** May 29, 2026  
**Author:** Sharu  
**Status:** Draft  
**Version:** 1.0

---

## 1. Problem Definition

### What problem is this solving?

Vacation planning for families is one of life's most anticipated experiences, yet the process is often chaotic, stressful, and far from joyful. Families face three intersecting pain points: **information overload** (dozens of travel sites and platforms make it impossible to filter signal from noise), **deal timing volatility** (finding the optimal booking window requires constant price monitoring), and **preference misalignment** (every family member has different opinions on destinations, activities, and dining, yet reaching consensus consumes weeks of research and group coordination).

According to Skift Travel research (2024), families spend an average of **15–20 hours planning a week-long vacation**, with 67% reporting high stress during the planning phase. Meanwhile, 43% report missing deals because no one had the time to monitor prices. The result: frustration, delayed bookings, and purchases made reactively rather than strategically.

**Job to be done:** When planning a family vacation, people want to find options that delight everyone, lock in the best deals at the right time, and arrive at a shared, coordinated plan—without weeks of research, fragmented bookings, or compromise-driven outcomes.

### Who are you solving this problem for?

**Primary Persona: The Family Planner**
- **Role & Demographics:** Parent or primary coordinator, age 30–50, coordinates vacations for a household of 3–5 people
- **Behaviour:** Typically the decision-maker and point person for logistics; signs booking confirmations; manages budget and schedules
- **Pain points:** Time-poor (full-time job + family responsibilities); deal-conscious; stressed by coordination overhead; wants a trusted guide that does the heavy lifting
- **Tech affinity:** Comfortable with mobile apps and web tools; uses travel search engines and booking platforms regularly

**Secondary Persona: The Family Member**
- **Role & Demographics:** Child, teen, or adult family member; varied ages (6–70+)
- **Behaviour:** Wants a voice in the plan; has preferences for destinations, activities, dining; expects ease of participation without needing to do research
- **Pain points:** Preferences often ignored or overridden; feels left out of decision-making; frustrated when final itinerary doesn't reflect their interests

**Tertiary Persona: The Group Organizer (Stretch Goal, Post-MVP)**
- **Role & Demographics:** Coordinator of extended family or friend group vacation (8–20 people); multiple households
- **Behaviour:** Must balance multiple budgets, schedules, and highly divergent preferences
- **Pain points:** Complexity increases exponentially; logistics fragmentation across multiple platforms; difficult to reach consensus

### Why is this problem worth solving?

Travel is one of the largest discretionary spending categories for families globally. The industry generates over **$1.2 trillion in annual leisure travel spend** (WTTC, 2024), with families accounting for approximately 35–40% of that ($400–480 billion). Within this, approximately 60% of families report that vacation planning dissatisfaction directly impacts their likelihood to rebook with the same destination, airlines, or hotel brands—suggesting significant lifetime value erosion.

Beyond the market size, research on anticipation (Decrop & Masset, 2020) shows that the **planning phase generates dopamine equivalent to the trip itself**. Tools that make planning joyful—rather than stressful—dramatically increase customer lifetime value, word-of-mouth, and repeat bookings. This emotional anchor creates a defensible moat: families that experience HappyTravels once will resist switching because the emotional investment in the tool's personalization is high.

**The MOAT:** The competitive advantage is not a feature—it's a **continuous learning loop**. HappyTravelsAI builds a rich, persistent model of each family member's tastes, travel style, dietary preferences, schedule flexibility, and budget sensitivity. This personalized context layer is impossible to replicate with generic tools (Google Trips, Kayak, Expedia) and deepens in value the more the family uses it. Over time, the system learns that "Sarah always books beach destinations but hates humidity," "Dad wants hikes but gets fatigued over 8km," and "The kids prefer lodging with pools." No off-the-shelf travel tool maintains this type of granular, multi-person context across trips.

### Why Agentic AI?

HappyTravels requires orchestration across **at least five distinct workflows**: research (surfacing destinations and activities tailored to individual preferences), **deals and ticketing** (monitoring price feeds and recommending optimal booking windows), **itinerary synthesis** (merging individual preferences into a shared master plan), **local booking automation** (restaurants, tours, activities), and **memory curation** (organizing photos and trip journeys). Each workflow requires different capabilities:

1. **Research:** Must consume unstructured data (reviews, descriptions, social media, blogs) and reason about implicit preferences (e.g., "Beach + budget-conscious → likely looking for Southeast Asia, not Maldives").
2. **Deals & Ticketing:** Must monitor real-time, multi-dimensional feeds (airline prices, hotel rates, package deals) and apply per-family heuristics (preferred airlines, seat preferences, loyalty programs).
3. **Itinerary Synthesis:** Must negotiate conflicting preferences (Dad wants hiking, but Mom prefers city culture) and suggest compromises that feel collaborative, not imposed.
4. **Automation:** Must handle ambiguous, context-dependent requests (e.g., "Book a romantic dinner Friday night, but make sure there's good vegetarian options for my sister"—requires implicit understanding of family roles, constraints, and priorities).
5. **Curation:** Must organize multi-modal media (photos, videos, messages) and synthesize narrative ("Here's the story of your trip").

**Why rules fail:** A rule-based system would require thousands of if-then branches, each updating with new destinations, prices, and user preferences. Regex or structured pattern matching cannot generalize across the variety of unstructured data (reviews vary in tone, language, and specificity). Preference alignment algorithms would need manual encoding of every possible conflict resolution—infeasible at scale.

**Why LLMs are necessary:** LLMs excel at reasoning over unstructured text, understanding implicit intent, and generating natural language explanations. They can apply learned patterns from millions of reviews and travel blogs to infer preferences. They can generate persuasive, nuanced itinerary suggestions that feel collaborative. They can orchestrate complex multi-step workflows (e.g., "Check prices, identify the best booking window, draft a recommendation email, and hold the booking until the family votes").

**Differentiation from ChatGPT / Copilots:** ChatGPT and travel copilots provide generic question-answering. HappyTravelsAI differs in three critical ways:
- **Continuous learning:** It retains multi-trip, multi-person preference models and refines them iteratively. ChatGPT has no memory across sessions.
- **Agentic orchestration:** HappyTravelsAI coordinates multiple agents (research, pricing, booking, curation) toward a shared goal. Copilots respond to discrete queries.
- **Workflow integration:** HappyTravelsAI is embedded in the booking and coordination workflow (not a separate search tool). It knows when to act autonomously (book after family approval) vs. when to defer (for high-cost, high-risk decisions).

### How will you know the problem is solved? (Core Metrics)

**North Star Metric: Family Happiness Index (FHI)**

The FHI measures the degree to which every family member experienced something they personally valued during the trip, at a price that felt like a win. Operationally:

| Metric | Baseline | Target | How tracked |
|---|---|---|---|
| **Family Happiness Index** | 0 (new product) | ≥8.0 / 10.0 (avg across all family members, per trip) | Post-trip NPS-style survey: "How much of your personal preferences made it into the final itinerary? (0–10)" + "Did the trip feel like a good value? (0–10)". Index = avg of both. |

**Primary Metrics (MVP):**

| Metric | Baseline | Target | How tracked |
|---|---|---|---|
| **Time to plan (family hours)** | 15–20 hours (manual) | <6 hours (with HappyTravels) | Session logs; sum of time spent by all family members in the app |
| **Family consensus on final itinerary** | 50–60% (manual compromise) | ≥80% agreement (preference coverage) | Post-plan survey: "What % of your preferred activities made it into the final plan?" |

**Secondary Metrics:**

| Metric | Baseline | Target | How tracked |
|---|---|---|---|
| **Deal capture rate** | ~0% (missed deals) | ≥70% of identified optimal booking windows capitalized | Automated: compare user's final booking date to algorithm-identified best-price window |
| **User retention (2+ trips)** | 0% | ≥40% (by end of Year 1) | Analytics: repeat user sign-ins and new trip creation |
| **NPS (Net Promoter Score)** | — | ≥50 (strong satisfaction) | Post-trip survey: "How likely would you recommend HappyTravels to a friend?" |
| **Cost per family plan** | — | <$50 in total LLM tokens + infrastructure | Billing logs divided by active families |
| **Support ticket volume per plan** | — | <0.5 tickets per plan (low friction) | Support system logs |

---

## 2. Solution Definition

### User Flows

**Primary Flow: "From Dream to Shared Plan"**

```
[1. Family kicks off the trip idea]
    ↓
[2. HappyTravels gathers preferences (family members vote)]
    ↓
[3. Research agent proposes destinations & experiences]
    ↓
[4. Pricing agent monitors deals & recommends booking windows]
    ↓
[5. Itinerary synthesis: family votes on consolidated plan]
    ↓
[6. Booking agent automates flights, hotels, local reservations]
    ↓
[7. Curation: post-trip, organize memories into trip journal]
```

**Detailed Flow:**

1. **Initiation (Family Planner):**
   - Parent opens HappyTravels and selects "Plan a new trip"
   - Inputs basic constraints: dates (flexible window ±1 week), approximate budget, household size
   - **Input:** Dates, budget, # of travelers, existing preferences from prior trips (if available)

2. **Preference Collection (All Family Members):**
   - Each family member receives an invite (via push, SMS, or email)
   - Each completes a quick preference form: "What type of vacation appeals to you?" (beach, hiking, city, adventure, culture, luxury, budget, etc.)
   - Each can upload photos, links, or past trips they enjoyed
   - System learns from prior trips if available
   - **Processing:** Preference agent embeds each response; aggregates interests per person; flags conflicts
   - **Output:** Family preference profile (e.g., "Dad + hiking, Mom + city culture, Kids + beach + pool")

3. **Research Agent (Autonomous with Proposal):**
   - Agent retrieves live travel content via web search (lightweight RAG) — Reddit travel communities, niche travel blogs, TripAdvisor, Google Reviews, social media — matched to the family's preference profile
   - Agent synthesizes 3–5 destination recommendations with rationales (e.g., "Croatia matches hiking (Dad), culture (Mom), beach (kids) and is budget-friendly")
   - **Retrieval mechanism (MVP):** LLM web search tool (Claude web search / GPT-4o + Bing Search API). Retrieves live, recent content at query time. No vector DB ingestion pipeline required at MVP — swap for full Pinecone/Weaviate pipeline post-launch when volume justifies it.
   - **Processing:** 
     - Retrieve live content from web search matching family preferences + destination pool
     - At least 2 of 5 destinations must be surfaced from non-obvious sources (Reddit threads, niche travel blogs) — not just top-10 mainstream results
     - Rank by multi-person preference alignment (custom scoring per destination)
     - Generate plain-language justification ("Here's why we think Costa Rica works for you…")
   - **Output:** Curated destination shortlist (max 5) with a summary per destination; each includes a live citation URL from retrieved content
   - **Hallucination safeguard:** All recommendations are grounded in retrieved live content; every destination includes a real, retrievable source URL — no static or fabricated citations
   - **Explainability:** For each destination, show which family member's preference it addresses and which source surfaced it

4. **Family Voting (Preference Collection):**
   - Each family member votes on the 3–5 destinations (ranked choice or yes/no)
   - System selects the destination with the highest consensus (or flags the tie for a family discussion)
   - **Output:** Agreed destination (e.g., "Costa Rica")

5. **Pricing Agent (Autonomous with Alerts):**
   - Begins monitoring flight and hotel prices for the chosen destination and date window
   - Uses historical price trend data + ML to estimate the optimal booking window (e.g., "Best prices likely 3–4 weeks out")
   - Sends real-time alerts to the family planner: "Flight prices dropped 15% today for your dates" or "We recommend booking flights by June 5 to lock in good rates"
   - **Processing:** 
     - Monitor Skyscanner, Google Flights, hotel APIs (or aggregators like Hopper, Kayak)
     - Apply price elasticity models (historical data) to forecast when prices will rise / fall
     - Cross-reference family preferences (preferred airlines, hotel chains, loyalty programs)
   - **Output:** Booking recommendations with time pressure ("Book by X date")
   - **Explainability:** Show price history graph; explain the reasoning (e.g., "Prices typically dip mid-week; post-May they spike due to summer demand")
   - **Hallucination safeguard:** All price data comes from live APIs; recommendations are transparent about data freshness

6. **Itinerary Synthesis (Autonomous with Review):**
   - Using the destination and family preferences, synthesis agent drafts a day-by-day itinerary
   - Balances conflicting preferences (e.g., "Day 1: Hike in the morning (Dad), city tour in afternoon (Mom), beach time with kids (rest of family)")
   - Proposes restaurants, activities, experiences matched to individual tastes
   - **Processing:**
     - Retrieve activity/restaurant recommendations from reviews and family preferences
     - Build a schedule that maximizes preference coverage (optimization problem)
     - Generate narrative transitions ("After hiking, you'll head to the city for dinner…")
   - **Output:** Shared itinerary (visual calendar + descriptions)
   - **Hallucination safeguard:** All activities are real, searchable locations; agent includes ratings, hours, and reservation links
   - **Explainability:** For each activity, show which family member requested it and why it was chosen

7. **Family Voting on Itinerary:**
   - Each member reviews the proposed itinerary and can vote "thumbs up" or propose modifications
   - System collects feedback and re-synthesizes if needed
   - Once consensus is reached (≥80% agreement), move to booking
   - **Output:** Approved itinerary

8. **Booking Automation (Human-in-Loop for Major Decisions):**
   - Flights: System presents the shortlisted flights (filtered by family preferences: airlines, times, connections). Family planner reviews and approves; system books.
   - Hotels: System presents 2–3 hotel options matching budget and preferences. Family votes or planner approves.
   - Restaurants & Local Activities: System auto-reserves (if possible) or generates booking links + times. Family can modify or delete.
   - **Autonomy:** Low—human must approve major bookings (flights, hotels). High for restaurants and activities (auto-book, but send confirmation).
   - **Output:** Booking confirmations; unified calendar with all reservations

9. **Proactive Price Monitoring (Ongoing):**
   - While bookings are being finalized, the pricing agent monitors for price drops on booked flights/hotels
   - If a price drops >15%, alerts the family: "You could save $200 if you rebook this flight. Shall we do it?"
   - **Output:** Savings opportunities or confirmation that the family got a good deal

10. **Trip Execution & Curation (During & After):**
    - Family members can share photos/videos with the trip journal (push to HappyTravels)
    - Post-trip, curation agent auto-organizes photos by day, location, and people
    - Generates a trip narrative: "Here's the story of your Costa Rica adventure…" with photos, captions, and highlights
    - **Processing:**
      - Image tagging (who's in the photo, location detection, sentiment)
      - Narrative generation (summarize the trip in prose)
    - **Output:** Shareable trip journal (PDF, link, or printed album option)

---

### Functional Requirements

**User Stories:**

| ID | User Story | Acceptance Criteria | Priority |
|---|---|---|---|
| US-001 | As a family planner, I want to quickly input my trip dates, budget, and household size so that the system understands my constraints | Form accepts dates, budget (in currency), # of travelers; form validates and stores preference; system retrieves prior preferences if available | P0 |
| US-002 | As a family member, I want to vote on my travel preferences (beach, hiking, culture, etc.) so that my voice is heard in the itinerary | **Part 1 — Preferences (all users, every trip):** Each family member receives an invite; completes preference form in <5 mins (destination type, activities, pace); votes are aggregated and visible to the family. **Part 2 — Travel History (new users only, one-time onboarding):** Each member is asked about 1–2 past trips — destination, activities done, what they loved, what they'd avoid. System stores this in member profile and uses it to personalise future recommendations. Returning users skip Part 2; their history is retrieved automatically from the database. | P0 |
| US-003 | As a family planner, I want to see 3–5 destination recommendations tailored to my family's preferences so that I don't spend hours researching | System proposes destinations with rationales; each recommendation shows which family preferences it addresses; family can shortlist or request alternatives | P0 |
| US-004 | As a family member, I want to vote on the destination so that the final choice reflects our collective preference | Voting UI is mobile-friendly; each member can vote yes/no or rank; system shows voting results; ties trigger a discussion prompt | P0 |
| US-005 | As a family planner, I want to know the optimal time to book flights so that I don't miss deals or pay inflated prices | System monitors prices for chosen destination + dates; sends alerts when prices drop or when the booking window is closing; explains reasoning | P0 |
| US-006 | As a family member, I want to see a day-by-day itinerary tailored to my interests so that I feel invested in the trip | System synthesizes itinerary; highlights activities for each person; includes restaurants, times, reservation links | P1 |
| US-007 | As a family member, I want to propose changes to the itinerary so that my input is reflected in the final plan | Itinerary has edit UI; family can swap activities, change times, or add preferences; system re-synthesizes and re-votes | P1 |
| US-008 | As a family planner, I want flights, hotels, and restaurants to be booked with one approval so that I don't spend hours across multiple sites | System aggregates booking options; planner reviews and approves in a single flow; system executes bookings across multiple platforms | P1 |
| US-009 | As a family member, I want to share trip photos in one place so that memories are organized together | Family members can upload photos to trip journal; system tags by day, location, people; accessible to all family members | P1 |
| US-010 | As a family planner, I want a post-trip trip journal/story so that we can relive and share the experience | System auto-generates narrative with photos, captions, highlights; includes statistics (miles traveled, meals, activities); shareable as PDF or link | P2 |

**Functional Requirements Table:**

| ID | Requirement | Priority | Notes |
|---|---|---|---|
| FR1 | System shall collect trip parameters (dates ±7 days, budget, # travelers) in <5 minutes | P0 | Mobile-first form; defaults from prior trips if available |
| FR2 | System shall gather preference votes from all family members within 24 hours of trip initiation | P0 | Automated invites via SMS/email/push; reminder after 12 hours |
| FR3 | System shall propose 3–5 destination recommendations within 2 hours of preference collection, grounded in live travel content retrieved via web search | P0 | Retrieval mechanism: lightweight RAG via LLM web search tool (Claude web search or GPT-4o + Bing Search API) — no vector DB ingestion pipeline required at MVP. At query time, system retrieves live content from Reddit, travel blogs, and niche travel sources matching the family's preference profile. Every recommendation must include a real, retrievable citation URL from the retrieved content — no static seed citations. Results cached per family preference hash if same family re-plans with identical inputs. |
| FR4 | System shall monitor real-time prices for flights and hotels from initiation through 14 days post-booking | P1 | Integrates with Skyscanner, Google Flights, Hopper, hotel chain APIs |
| FR5 | System shall synthesize a day-by-day itinerary addressing ≥80% of family preferences | P1 | Uses preference weights + activity rankings; re-synthesizes if >2 members object |
| FR6 | System shall support booking integration with at least 3 airlines, 5 hotel chains, and OpenTable / Viator | P1 | API-based; OAuth for Viator; OAuth + direct API for airlines |
| FR7 | System shall auto-organize trip photos by date, location, and people | P1 | Uses image metadata (EXIF) + ML (Google Cloud Vision or Azure Computer Vision) |
| FR8 | System shall generate a trip narrative (text + photos) in <10 minutes post-trip | P2 | Uses template-based narrative + LLM for personalization |

**Non-Functional Requirements:**

- **Performance:** P95 itinerary synthesis latency <45 seconds for families up to 10 members; P95 search query latency <5 seconds
- **Scalability:** Handle 10,000 concurrent family planning sessions without degradation; real-time price monitoring for 1M+ trips simultaneously
- **Security:** AES-256 encryption at rest; TLS 1.3 in transit; OAuth 2.0 for third-party integrations; PCI-DSS compliance for payment data (handled by Stripe, not stored)
- **Reliability:** 99.5% uptime SLA; critical errors (booking failures, data loss) <0.1% of operations; automated rollback for failed API calls
- **Usability:** App usable by ages 8–80 without tutorials; WCAG 2.1 AA compliance; mobile-first design
- **Compliance:** GDPR (EU users), CCPA (CA users), PIPEDA (Canada); option for data residency (EU / US); SOC 2 Type II audit planned for Year 2

### Agent Capabilities & System Behaviour

| Agent / Component | Input | Output | Autonomy Level | Human-in-Loop Trigger |
|---|---|---|---|---|
| **Preference Aggregator** | Family member preference votes (beach, hiking, culture, etc.) | Weighted preference vector per family member + family consensus score | Fully autonomous | N/A (always runs) |
| **Research Agent** | Destination constraints (dates, budget, family size, preferences) | Ranked list of 3–5 destinations with justifications and key activity ideas | Fully autonomous | Family can request alternatives; system re-ranks |
| **Pricing Agent** | Destination + dates + family booking preferences (airlines, chains) | Real-time price alerts; booking window recommendations; price predictions with confidence | Fully autonomous (monitoring); human approval (booking) | All flight/hotel bookings require family planner approval |
| **Itinerary Synthesis Agent** | Destination, dates, family preferences, selected activities | Day-by-day itinerary with activity times, restaurant reservations, travel times | Autonomous + review | Families vote on itinerary; each member can propose modifications |
| **Booking Agent** | Approved itinerary + booking preferences | Confirmed flights, hotels, restaurant reservations; unified booking calendar | Autonomous for restaurants/activities; human approval for flights/hotels | High-cost or high-conflict bookings require explicit planner approval |
| **Curation Agent** | Trip photos (uploaded by family members) + itinerary + dates | Organized photo gallery (by date/location/people) + auto-generated trip narrative | Fully autonomous | Family can edit narrative; upload additional photos |

---

## 3. Technical Requirements (Week 2)

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Web / Mobile)                 │
│   (React SPA / React Native) — Trip planning UI, voting,     │
│   itinerary review, photo upload, booking approval           │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                      API GATEWAY / ORCHESTRATION             │
│   (FastAPI / Node.js) — Route requests, rate limit,          │
│   authentication, logging                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌────▼────────┐ ┌──▼────────────┐
│  ML Pipeline │ │ Integrations│ │  Data Layer  │
├──────────────┤ ├─────────────┤ ├──────────────┤
│ - Research   │ │ - Skyscanner│ │ - PostgreSQL │
│   Agent      │ │ - Google    │ │   (user data)│
│ - Pricing    │ │   Flights   │ │              │
│   Agent      │ │ - Hopper    │ │ - Pinecone / │
│ - Itinerary │ │ - Hotels    │ │   Weaviate   │
│   Synthesis │ │ - OpenTable │ │   (vector DB)│
│ - Curation   │ │ - Viator    │ │              │
│   Agent      │ │ - Stripe    │ │ - Redis      │
│              │ │   (payments)│ │   (cache)    │
│ (LLM + RAG + │ │ - Google    │ │              │
│  tools)      │ │   Cloud     │ │              │
│              │ │   Vision    │ │              │
└──────────────┘ └─────────────┘ └──────────────┘
```

#### MVP Architecture (Demo — US-001 through US-004)

```
┌─────────────────────────────────────────────────────────────┐
│  LOVABLE UI  (Next.js / React)                              │
│  US-001: Trip initiation form (dates, budget, duration)     │
│  US-002: Preference form — Part 1 (interests) +            │
│          Part 2 (travel history, new users only)            │
│  US-004: Destination results — cards with citations         │
└──────────────────────┬──────────────────────────────────────┘
                       │ webhook (family_id + trip params)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  n8n  WORKFLOW ORCHESTRATION                                │
│                                                             │
│  Node 1 ── Webhook Trigger                                  │
│            Receives: family_id, budget, month, duration     │
│                 │                                           │
│  Node 2 ── Supabase → fetch members + preferences          │
│  Node 3 ── Supabase → fetch travel history                 │
│                 │                                           │
│  Node 4 ── Code node: buildSystemPrompt()                  │
│            Assembles family profile + history into          │
│            structured LLM context                          │
│                 │                                           │
│  Node 5 ── Anthropic (Claude) — STAGE 1: RECOMMEND        │
│            Input:  system prompt (family context)          │
│            Output: 5 destination names + rationale JSON    │
│                 │                                           │
│  Node 6 ── Split in Batches (5 parallel branches)         │
│            For each destination:                           │
│   Node 6a ── Tavily Search API                             │
│              Query: "{dest} travel {month} {pref_tags}"    │
│              Output: real URL + content excerpt            │
│   Node 6b ── Merge destination + citation                  │
│                 │                                           │
│  Node 7 ── Aggregate all 5 results                        │
│  Node 8 ── Respond to Webhook → Lovable renders cards     │
└──────────────────────┬──────────────────────────────────────┘
                       │ reads / writes
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  SUPABASE  (PostgreSQL)                                     │
│  members · preferences · travel_history · trips            │
└──────────┬──────────────────────────────────────────────────┘
           │
  ┌────────┴────────┐
  ▼                 ▼
┌──────────────┐  ┌──────────────────────┐
│ ANTHROPIC    │  │ TAVILY SEARCH API    │
│ claude-sonnet│  │ Live web search      │
│ Stage 1:     │  │ Stage 2: cite        │
│ recommend    │  │ Parallel × 5 dests   │
│ ~5s          │  │ ~2s per search       │
└──────────────┘  └──────────────────────┘
  Total end-to-end latency: ~8–10 seconds
```

**Why this architecture — key design decisions:**

| Decision | What | Why |
|---|---|---|
| **n8n orchestration** | Multi-node workflow manages the full pipeline | Separates concerns — UI, data retrieval, LLM, and search are independent nodes. Easy to extend with pricing, itinerary, and booking agents post-MVP |
| **Two-stage: recommend then cite** | Claude recommends first; Tavily cites after | Avoids pre-seeding destination-specific content — works for any destination, not just ones in a fixed corpus |
| **Supabase PostgreSQL** | Structured family data — profiles, history, preferences | Managed cloud DB; no ops overhead; connects natively to n8n. pgvector available post-MVP for full RAG pipeline |
| **No vector DB at MVP** | Tavily web search replaces pre-indexed RAG | Pre-seeding a vector store ties the system to known destinations. Web search is destination-agnostic and always fresh |
| **Learning loop = DB + prompt injection** | Family history retrieved from DB, injected into every LLM call | LLM does not retain memory between sessions — the database does. Richer history = better prompt = better recommendations |
| **Lovable for UI** | AI-generated Next.js frontend | Accelerates UI from weeks to days; output is real deployable React code |

**Post-MVP architecture additions:**

```
├── pgvector on Supabase   → full RAG over indexed Reddit/blog corpus
├── n8n pricing node       → Skyscanner/Hopper API for deal alerts (US-005)
├── n8n itinerary node     → Claude synthesis agent (US-006)
├── n8n booking node       → airline/hotel APIs with human approval (US-008)
├── Redis cache            → destination rankings, price snapshots
└── React Native           → mobile app (web-first at MVP)
```

**Key Components (full production):**

- **Frontend:** React SPA (web) + React Native (iOS/Android); real-time updates via WebSocket; offline support for trip view
- **API & Orchestration:** n8n workflow engine; async job queue for long-running tasks (research, synthesis)
- **ML Pipeline:**
  - Research Agent: Claude + lightweight RAG (Tavily web search at MVP; Supabase pgvector post-MVP)
  - Pricing Agent: LLM + real-time price feeds + time-series forecasting (Prophet or LSTMs)
  - Itinerary Synthesis: LLM + constraint-based scheduling
  - Curation Agent: LLM + Google Cloud Vision (image tagging / metadata extraction)
- **Integrations:** Tavily Search (citation retrieval), Skyscanner/Hopper (pricing), OpenTable/Viator (activities), Stripe (payments)
- **Data Layer:**
  - Supabase PostgreSQL for structured user data (profiles, preferences, trips, bookings)
  - Supabase pgvector for travel content embeddings (post-MVP)
  - S3 for trip photos and generated PDFs

---

### Prompt Strategy

| Task | Technique | Rationale | Output Format |
|---|---|---|---|
| **Destination Research** | Few-shot + Lightweight RAG (web search) | LLM retrieves live travel content at query time via web search tool — no vector DB pipeline at MVP. Family profile + travel history injected as context. Demonstrates style ("Here's why Bali matches your family…") and grounds recommendations in real, recently retrieved reviews. Post-MVP: swap web search for Pinecone/Weaviate over indexed Reddit + travel blog corpus. | JSON: `{ "destination": string, "rationale": string, "key_activities": [string], "confidence": 0–1, "sources": [url], "source_type": "reddit|blog|review_site|mainstream" }` |
| **Preference Merging** | Chain-of-thought | Step through each family member's preferences; explain trade-offs; justify the final recommendation | Text: "Given that Dad loves hiking and Mom prefers culture, we think Costa Rica is ideal because..." |
| **Itinerary Synthesis** | Chain-of-thought + structured output | Reason through each day's activities; ensure balance; produce a schedule | JSON: `{ "day": int, "activities": [{ "time": string, "activity": string, "person_id": string, "rationale": string }], "meals": [...] }` |
| **Price Analysis & Alerts** | Few-shot + context injection | Show examples of price alerts ("Drop of 15% detected"); inject current price trends | Text: "Flight prices typically dip on Tuesdays. Based on historical data, we recommend booking by June 5 to lock in $320/person." |
| **Trip Narrative** | Template-based + LLM personalization | Use structure (Day 1, Day 2…) and fill with generated prose + photo captions | Markdown: "# Trip: Costa Rica 2026\n## Day 1: Arrival\nYou landed in San José and headed to the cloud forest lodge..." |
| **Conflict Resolution** | Chain-of-thought + multi-turn | If family members disagree on an activity, walk through options; suggest compromises | Text: "I see Dad wants a 10km hike and Mom prefers a city tour. What if we do a 5km morning hike in the cloud forest, then head to San José for lunch and explore the art museum?" |

**Output Format Constraints:**

- All extraction outputs use consistent JSON schema with `confidence`, `source`, `explanation` fields
- Itinerary outputs are date-stamped and activity-linked (to real locations/reservations)
- Price alerts include threshold (%, $), historical context (graph), and decision recommendation
- Narratives are <500 words, use active voice, include photos

**Prompt Improvement Plan:**

- Maintain versioned prompt library in shared docs (v1.0, v1.1, etc.)
- A/B test prompts weekly on a validation set (50 families, ~200 preferences)
- Track user corrections (e.g., "This restaurant isn't real") as failure signals; update prompts if >3% correction rate
- Monthly prompt review: analyze low-confidence outputs and re-prompt or adjust system message

---

### Model Requirements

| Criteria | Requirement | Rationale |
|---|---|---|
| **Model type** | Closed-source API (Claude 3 Sonnet or GPT-4o) for MVP | Time-to-market; quality; no infrastructure cost for fine-tuning (defer to MVP 2) |
| **Context window** | ≥100K tokens | Need to pass in full itinerary + family preferences + destination research in a single call; support long trip summaries |
| **Fine-tuning** | Not required for MVP; plan for Prompt-tuning (GPT-4o) in MVP 2 | MVP 1 focuses on evals and prompt refinement; fine-tuning justified post-MVP if accuracy dips below 85% |
| **Latency** | P95 <45s per LLM call (research, synthesis); P95 <10s for price alerts | Research can be async; synthesis needs to feel interactive |
| **Cost per plan** | <$50 in total LLM tokens + infra for a full trip plan | Pricing model depends on this; assume 5–10 LLM calls per trip (research, synthesis, alternatives, curation) |
| **Multimodal** | Image input (photos from family); text input/output only | Vision needed for photo organization and trip narrative (image tagging) |

### Model Selection & Cost Trade-offs

| Item | What we use | Why we chose this | Trade-off |
|---|---|---|---|
| **Framework** | LangChain (Python) | Rapid agent orchestration; integrates with multiple LLM providers; good RAG support | Vendor lock-in risk; LangChain updates can break workflows |
| **LLM for inference** | Claude 3 Sonnet (primary); GPT-4o (fallback) | Sonnet = fast, cheap, good reasoning; GPT-4o = multimodal (photos) | Cost: ~$0.01–0.03 per call; latency: 2–10s per call; rate limits |
| **Vector DB** | Pinecone (managed) or Weaviate (self-hosted) | Managed = no ops overhead; Weaviate = more control, lower cost at scale | Pinecone cost scales with stored vectors; Weaviate requires devops |
| **Search & Retrieval** | Semantic search (embeddings) + hybrid (keyword + semantic) | Semantic captures intent ("beaches with culture"); keyword ensures recall (specific restaurant names) | Hybrid = higher latency; need to tune weights |
| **Real-time prices** | Hopper API (flights) + hotel chain APIs (direct or aggregator) | Hopper = best price prediction; hotel APIs = real-time rates | Costs vary per integration; some have metering fees |
| **UI** | React SPA (web) + React Native (mobile) | Team familiarity; large ecosystem; easy to hire for | Requires two codebases; RN can lag behind web |
| **Hosting** | AWS (ECS + S3 + RDS) | Scales with usage; good uptime SLA; data residency options | Cold start latency; data transfer costs; vendor lock-in |
| **Dev editor** | VS Code + Copilot | Industry standard; fast iteration | Microsoft account required; limited to VSCode |

---

## 4. Prioritization — Week 3

### Breaking the Agentic Workflow into Components

1. **Trip Initiation & Preference Collection:** Family planner sets dates/budget; family members vote on preferences
2. **Destination Research & Recommendation:** Research agent scans travel data; proposes 3–5 destinations
3. **Pricing Monitoring & Alerts:** Pricing agent monitors real-time prices; recommends booking windows
4. **Itinerary Synthesis & Voting:** Synthesis agent drafts itinerary; family votes and proposes modifications
5. **Booking Orchestration:** Booking agent integrates with airlines, hotels, restaurants; executes reservations
6. **Photo Curation & Trip Narrative:** Curation agent organizes photos; generates trip story

### Risk Assessment per Component

| Component | ML Necessary? | Data Available? | Can ML Solve? | Accuracy Feasible? | Scalable? | Fast Feedback? | Legal Risk? | Bias Risk? | Explainable? | Easy to Evaluate? |
|---|---|---|---|---|---|---|---|---|---|---|
| **Preference Collection** | FAIL | N/A | N/A | N/A | — | — | — | — | — | — |
| **Destination Research** | PASS | PASS | PASS | PASS | PASS | PASS | LOW | MEDIUM | PASS | PASS |
| **Pricing Monitoring** | PASS | PASS | PASS | PASS | PASS | PASS | MEDIUM | LOW | PASS | PASS |
| **Itinerary Synthesis** | PASS | PASS | PASS | PASS | PASS | PASS | LOW | MEDIUM | PASS | PASS |
| **Booking Orchestration** | FAIL | PASS | N/A | N/A | PASS | PASS | HIGH | LOW | PASS | PASS |
| **Photo Curation** | PASS | PASS | PASS | PASS | PASS | PASS | LOW | LOW | PASS | PASS |

**Component Risk Details:**

1. **Preference Collection (Rule-based; no ML needed):** Low risk. Straightforward form; validation via family re-vote.

2. **Destination Research (High value; medium complexity):**
   - **Risk:** Hallucinated destinations or activities (e.g., "Lake Baikal has white-sand beaches" — false)
   - **Mitigation:** RAG over verified sources (TripAdvisor, Google Reviews, official tourism boards); cite sources in every recommendation; human review for first 100 families
   - **Explainability:** Show source reviews; highlight which preference each destination addresses
   - **Feedback:** User can rate destination; if <3/5 stars, log as model failure; re-prompt if >10% failure rate

3. **Pricing Monitoring (Critical for trust; high data availability):**
   - **Risk:** Missed deals or false alarms ("Book now!" when prices will drop further)
   - **Mitigation:** Use established price prediction models (Hopper uses Prophet + proprietary ML); add 5% buffer to recommendations; A/B test alerts with subset of users
   - **Explainability:** Show price history graph; explain model confidence (e.g., "80% confident prices will rise by June 1")
   - **Feedback:** User books or doesn't; later track actual price trajectory; retrain forecaster monthly

4. **Itinerary Synthesis (Complex; core value delivery):**
   - **Risk:** Itinerary doesn't match family preferences; conflicts emerge after synthesis (e.g., "You scheduled hiking the day after a 14-hour flight")
   - **Mitigation:** Chain-of-thought reasoning; constraint-based scheduling; family voting before booking; offer re-synthesis
   - **Explainability:** For each activity, show which family member it addresses; show trade-off reasoning ("This hiking day is right after arrival; if too fatiguing, we can move it to Day 3")
   - **Feedback:** Family votes; if >30% rejection rate, iterate on constraints

5. **Booking Orchestration (Low ML; high manual control):**
   - **Risk:** Booking fails; wrong reservation made; integration breaks
   - **Mitigation:** Extensive testing with real APIs; human approval gate for flights/hotels; clear confirmation before booking
   - **Explainability:** Show booking details before final confirmation; easy cancellation (within API terms)
   - **Feedback:** Booking success rate; support tickets for failures

6. **Photo Curation (Medium complexity; lower stakes):**
   - **Risk:** Mistagged photos; incorrect locations; poor narrative
   - **Mitigation:** User can edit tags; narrative is templated and personalized (not purely generated); family reviews before sharing
   - **Explainability:** Show photo metadata; explain tagging confidence
   - **Feedback:** User edits narrative; log as feedback for curation model improvement

### Overall Risk Summary

| Component | Risk Level | Comment / Mitigation |
|---|---|---|
| **Preference Collection** | **Low** | Rule-based; straightforward. Mitigation: easy re-voting; default reminders. |
| **Destination Research** | **Medium** | LLM can hallucinate locations. Mitigation: RAG + source citations; human review for first cohort; user feedback loop. Target: >85% "helpful" ratings by users. |
| **Pricing Monitoring** | **Medium** | Forecasting errors (missed deals or false alarms). Mitigation: A/B test with control group; use established models (Hopper). Target: >70% of optimal booking windows captured. |
| **Itinerary Synthesis** | **High** | Most complex; directly impacts family happiness. Mitigation: Multi-turn synthesis with voting; family can re-vote and re-synthesize; constraint-based (avoid conflicts). Target: ≥80% family agreement on itinerary. |
| **Booking Orchestration** | **Medium** | Integration failures; wrong reservations. Mitigation: Extensive API testing; human approval gates. Target: <1% booking failures; <0.5% wrong reservations. |
| **Photo Curation** | **Low** | Lower stakes; family can edit. Mitigation: Template-based narrative; user review. Target: >80% family satisfaction with narrative. |

### Prioritized Stories (MVP Scope)

| Story ID | Title | Priority | Est. Points | Status |
|---|---|---|---|---|
| US-001 | Trip initiation: planner inputs dates, budget, # travelers | P0 | 3 | To Do |
| US-002 | Preference voting: family members vote on interests | P0 | 5 | To Do |
| US-003 | Destination research: system proposes 3–5 destinations | P0 | 8 | To Do |
| US-004 | Family votes on destination | P0 | 2 | To Do |
| US-005 | Pricing monitoring: system tracks real-time prices, sends alerts | P1 | 13 | To Do |
| US-006 | Itinerary synthesis: system drafts day-by-day plan | P1 | 13 | To Do |
| US-007 | Family votes on itinerary (accept/modify) | P1 | 5 | To Do |
| US-008 | Booking: integrate with airlines, hotels, restaurants | P1 | 21 | To Do |
| US-009 | Photo upload & organization | P2 | 8 | To Do |
| US-010 | Trip narrative generation | P2 | 5 | To Do |

**MVP Scope Rationale:** P0 (US-001 through US-004) delivers core value: trip initiation, preference voting, destination research, and family voting on destination. Pricing monitoring (US-005) has been moved to P1 alongside itinerary synthesis and voting. Booking (P1) is important but can be MVP 1. Photo curation (P2) is a nice-to-have for MVP.

---

## 5. Roadmap — Week 3

| Release | Features | Duration | Success Criteria |
|---|---|---|---|
| **MEP (Minimum Explorable Product)** | Trip initiation, preference voting, destination research + voting | Weeks 1–4 (4 weeks) | 20 families sign up; 80%+ complete a full preference vote; 70%+ find destination helpful |
| **MVP** | ↑ + pricing monitoring + itinerary synthesis + voting | Weeks 5–8 (4 weeks) | 100 families; itinerary approval rate ≥70%; FHI ≥7.0; zero critical bugs |
| **MVP 1 / Launch** | ↑ + booking orchestration (flights, hotels, restaurants) | Weeks 9–12 (4 weeks) | 500 families; booking success rate ≥99%; support tickets <0.5 per plan |
| **MVP 2 (Post-Launch)** | Photo curation, trip narrative, group travel (tertiary persona), fine-tuning on proprietary data | Weeks 13–24 (12 weeks) | 2,000 families; repeat rate ≥40%; NPS ≥50 |
| **Iteration & Scale** | Expand to more destinations, integrations, languages | Ongoing | Grow to 10K+ families; expand to EU / APAC; launch mobile app |

**Dependencies:**

- Hopper API access (pricing); availability likely in 2–4 weeks post-request
- Hotel chain API partnerships (direct or via aggregator); some may require legal review (4–6 weeks)
- OpenTable + Viator OAuth setup; standard integrations (2–3 weeks)
- Google Cloud Vision setup for image tagging (1 week)
- Stripe merchant account for payments; underwriting (1–2 weeks)
- GDPR compliance audit (legal review, data handling policies); 4–6 weeks

---

## 6. Evaluations — Week 4 & 5

### Evaluation Strategy

**Ground Truth Sources:**

1. **Synthetic Travel Data:** Generated dataset of 100 family profiles + 500 trip scenarios with multi-person preferences and optimal itineraries (expert-curated)
2. **Real User Feedback:** Beta users (20–50 families) who provide post-trip surveys and approval/rejection signals
3. **Expert Reviews:** Travel industry SMEs (travel consultants, itinerary planners) who review system outputs for realism and quality
4. **Public Datasets:** TripAdvisor reviews, Google Flights price history, Viator activity ratings (for destination recommendations)

**Evaluation Plan:**

| Eval Type | Method | Target | Cadence |
|---|---|---|---|
| **Destination Relevance** | Multi-choice test: Does recommended destination match family preferences? (by 3 expert travel consultants) | ≥85% agreement among experts | Per release (50 test cases per release) |
| **Itinerary Quality** | Family approval rate (% families who approve itinerary without major edits) + expert review (realism, variety, balance) | ≥75% approval; ≥80% expert realism rating | Monthly (100 families) |
| **Price Prediction Accuracy** | Absolute Percentage Error (APE) on hold-out test set; compare algorithm's booking window to actual best-price window | APE <10% on price predictions; capture ≥70% of optimal booking windows | Monthly (historical data) |
| **End-to-end Latency** | Measure time from itinerary synthesis request to output | P95 <45s; P99 <60s | Per release |
| **User Satisfaction (Post-Trip)** | NPS-style survey: "How much of your preferences made it into the plan?" + "Was it a good value?" | ≥8.0/10 FHI; ≥50 NPS | After each trip (~2 weeks per family, staggered) |
| **Booking Success** | % of bookings that complete without errors or user support | ≥99% success rate | Per release |
| **Support Ticket Volume** | # support tickets / # families | <0.5 tickets per family | Monthly |

**AI Performance Monitoring (Post-Launch):**

- Weekly automated regression suite: run 20 test cases against baseline outputs; alert if >5% divergence
- Monthly drift check: sample 50 random recent outputs; have expert review for accuracy; track F1 or expert approval rate
- Quarterly audit: travel consultant reviews 100 random families' trips; spot-check for hallucinations or bad recommendations
- Alert threshold: if approval rate drops below 75% or FHI <7.5, trigger model review and re-prompt iteration

**Evaluation Spreadsheet:**

[Link to shared Google Sheet]

| Trip ID | Family ID | Destination | System Recommendation | User Selection | Match? | Itinerary Approval Rate | Price Capture? | FHI Score | Support Tickets | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| TRIP-001 | FAM-001 | Costa Rica | Costa Rica (Primary) | Costa Rica | ✓ Yes | 90% | Yes (booked 3 weeks before peak) | 8.5 | 0 | Great outcome |
| TRIP-002 | FAM-002 | Bali | Bali (Secondary) | Thailand (user choice) | ✗ No | 65% | No (missed 15% price drop) | 6.8 | 2 | Re-prompt to include Thailand |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

### HHH Evaluation

| Pillar | Evaluation Question | Strength | Risk | Mitigation |
|---|---|---|---|---|
| **Helpful** | Did it cite the personal preferences for each user with the suggested recommendations? | Each recommendation is explicitly tagged to a specific family member's preference, making the rationale transparent and personal | If preferences are sparse or ambiguous, citations may feel generic or forced | Require minimum preference inputs before synthesis; prompt users to complete their profile before recommendations are generated |
| **Helpful** | Did the member find it helpful? | Post-trip FHI and NPS surveys capture direct member satisfaction; feedback loop improves future recommendations | Subjective measure; younger children may not accurately self-report; satisfaction may reflect trip outcome rather than AI quality | Use age-appropriate survey formats (e.g., emoji scale for kids); separate AI helpfulness from overall trip satisfaction in survey design |
| **Helpful** | Were these recommendations unique and did the member love them? | At least 2 of 5 (50%) recommendations should be non-obvious destinations the family would not find through a generic Google search — surfaced via social media, Reddit, niche blogs, or activity-specific discovery — while still matching preferences and safety criteria. Popular destinations may fill the remaining slots. | System defaults to well-known destinations for all 5 slots; or surfaces non-obvious places that don't meet family preferences | Research agent draws from Reddit travel communities, niche travel blogs, and activity-specific sources alongside mainstream review sites; SME evaluates: "would this family have found this themselves?" |
| **Honest** | Were the destination suggestions real and not fictional or hallucinated? | RAG grounds all recommendations in verified travel data; source citations included with every destination proposal | LLM may confabulate details about lesser-known destinations with sparse training data | Verify all destinations against official tourism board databases; confidence threshold <70% triggers human review; users can flag hallucinations via in-app feedback |
| **Honest** | Were the destination recommendations cited with the link from the websites/social media sites provided by the members? | System extracts and surfaces links from member-provided sources, creating a direct traceability chain from input to recommendation | Links may become stale or redirect; social media content may be deleted or set to private after ingestion | Link validation at time of recommendation generation; cache page snapshots; fallback to domain-level citation if specific URL is unavailable |
| **Honest** | Did it adhere to the personal preferences for each user? | Preference vector per family member is explicitly matched against each recommendation; explainability layer shows which preference each destination addresses | Implicit or unstated preferences (e.g., "I hate long flights") not captured in the initial form may be missed | Multi-turn preference refinement; allow free-text preference input; track rejection patterns to infer and surface missing preferences over time |
| **Harmless** | Were the recommendations appropriate by age? | Family profile includes ages of all members; system filters activities by age-appropriateness (e.g., no extreme sports for under-12) | Age filters may be too conservative (frustrating teens) or miss edge cases (e.g., activity rated 12+ but requires high physical fitness) | Age-based activity taxonomy with configurable thresholds; parents can override with acknowledgement; flag borderline activities for family review before itinerary is finalised |
| **Harmless** | Were the destinations safe to travel and not on any do-not-travel advisory? | System cross-references government travel advisories (US State Dept, UK FCDO, Australia DFAT) before surfacing any destination | Advisory data may be stale; sub-regional advisories (e.g., specific provinces) may be missed; advisories can change rapidly | Real-time advisory API integration refreshed daily; hard block on Level 3/4 destinations; prominent alert for Level 2 with opt-in acknowledgement required from family planner |
| **Harmless** | Were the activities in these destinations safe to undertake? | Activity recommendations include safety ratings and operator reviews; high-risk activities (e.g., volcano hiking, scuba) are flagged with explicit warnings | Safety information from reviews may be outdated; seasonal hazards (monsoons, wildfires) not always reflected in static review data | Integrate operator safety ratings from Viator/GetYourGuide; seasonal risk flags based on travel dates; mandatory disclaimer for high-risk activities; link to official operator safety records |

### MVP Evaluation Questions (HHH Framework)

**MVP Scope:** US-001 (Trip Initiation) · US-002 (Preference Voting) · US-003 (Destination Research) · US-004 (Family Voting on Destination)

| # | Criteria | MVP Task | Evaluation Question |
|---|----------|----------|---------------------|
| 1 | **Helpful** | US-003 Destination Research | Did the system cite each family member's specific preferences in the destination recommendations (e.g., "This matches Dad's hiking preference")? |
| 3 | **Helpful** | US-003 Destination Research | Do at least 2 of 5 (50%) recommendations surface non-obvious destinations the family would not easily find through a generic Google search — discovered via social media, Reddit, niche travel blogs, or activity-specific research — while still matching the family's preferences and safety criteria? |
| 4 | **Honest** | US-003 Destination Research | Are all recommended destinations real, verifiable locations — with no fabricated activities, beaches, or attractions? |
| 5 | **Honest** | US-003 Destination Research | Does each destination recommendation include a traceable citation (link or source) from a travel site or member-provided input? |
| 6 | **Honest** | US-002 & US-003 | Did the system accurately reflect each family member's stated preferences in the final recommendation, without ignoring or overriding any individual's input? |
| 7 | **Harmless** | US-003 Destination Research | Were all recommended destinations checked against US State Dept travel advisories — Level 1 & 2 allowed freely; Level 3 & 4 allowed only if a critical advisory warning is displayed to the family planner before the destination is shown? |
| 8 | **Harmless** | US-003 Destination Research | Were activities within recommended destinations flagged for age-appropriateness based on family member ages provided in US-001? |
| 9 | **Harmless** | US-001 Trip Initiation | Does the system avoid storing or exposing sensitive family data (budget, household size, ages) beyond the active session without explicit consent? |

**Usage Note:** SMEs should test MVP outputs against each question. A "No" on any Honest or Harmless question = **unsuccessful** — do not pass to beta. A "No" on Helpful = flag for prompt iteration before beta launch.

**Assumptions & Risks (MVP Scope Flags):**

| Flag | Detail |
|------|--------|
| ⚠️ Pricing questions deferred | US-005 (pricing monitoring) moved to P1 — HHH questions for deal alerts & price predictions not evaluated at MVP |
| ⚠️ Itinerary synthesis not in scope | Conflict resolution, scheduling quality, and booking accuracy evals deferred to MVP 1 |
| ⚠️ Bias checks limited | Full fairness audit (language, geography, income) deferred to MVP 2 — only age-appropriateness checked at MVP |
| ⚠️ Advisory data freshness | Travel advisory checks depend on real-time API; if not integrated at MVP, this is a manual SME check |

---

### Launch Criteria

| Stage | Helpful | Honest | Harmless | Go / No-Go Criteria |
|---|---|---|---|---|
| **Measurement Launch (1–2%, ~20 families)** | Destination helpfulness ≥70%; <2 hrs avg planning time (vs 15–20 hrs baseline) | <1% hallucinated recommendations | <1% user complaints about bad recommendations | App works end-to-end; no crashes; users complete preferences; positive feedback on core flow |
| **Beta Launch (5–10%, ~100 families)** | Destination approval ≥80%; itinerary approval ≥70%; FHI ≥7.5 | Price predictions APE <15%; <2% hallucinations | <0.5% support tickets related to bad recommendations; zero booking failures | Stable infrastructure; metrics on track; ready for scaled marketing |
| **Full Launch (GA)** | FHI ≥8.0; price capture ≥70%; NPS ≥50 | Price predictions APE <10%; <1% hallucinations; all claims sourced | <0.5 tickets per family; <0.1% critical errors (e.g., double-booked flights) | All go-live criteria met; legal review passed; SOC 2 readiness confirmed |

---

## 7. Responsible AI Risks & Mitigation — Week 4 & 5

### Accountability

| Question | Answer |
|---|---|
| **What does the product do well? Where will it struggle?** | **Strengths:** Handles multi-person preference aggregation; can surface novel destination combinations; monitors prices at scale. **Weaknesses:** Can struggle with niche interests (specialty diving, obscure hiking routes); may underweight safety concerns (avoids dangerous destinations but doesn't always flag them); doesn't account for visa complexity or travel advisories. |
| **Compliance policies for sensitive data?** | GDPR (EU users): data residency in EU region; 30-day deletion on request. CCPA (CA users): do-not-sell opt-out available. PIPEDA (Canada): same as GDPR. PCI-DSS: payment data never stored; handled by Stripe. |
| **How is sensitive data managed?** | Encryption at rest (AES-256); encryption in transit (TLS 1.3). Access controls: only authorized staff can view family data; logging of all access. Retention: trip data deleted 2 years after completion (user can request earlier deletion). Photo data: hosted on S3 with lifecycle policies (archive after 1 year). |
| **Human oversight and control?** | Booking decisions require explicit family planner approval (especially flights/hotels). Price alerts are advisory only; user chooses to book. Itinerary suggestions can be rejected, modified, or re-synthesized. Disclaimers: "Not legal or financial advice; verify all information before booking." |

### Transparency

| Question | Answer |
|---|---|
| **Direct and indirect use cases?** | **Intended:** Family vacation planning; group travel coordination; deal hunting. **Potential misuse:** Using personal preference data to profile families (mitigated by data residency; no third-party data sales). Using price monitoring for arbitrage (unlikely, but not explicitly prohibited). |
| **How are results generated?** | Destination recommendations: LLM (Claude/GPT-4) + RAG over TripAdvisor/tourism data. Itinerary synthesis: LLM + constraint solver. Pricing: real-time APIs (Hopper, Google Flights). Photos: image tagging with Google Cloud Vision. All steps logged; users can inspect recommendation rationales. |
| **Benchmarks to share with users?** | "Destination recommendations are based on 1M+ travel reviews and 80% of families find them helpful." "Itinerary synth matches 80%+ of family preferences on average." "Price predictions have <10% average error and capture 70%+ of optimal booking windows." |
| **What disclosures are needed?** | "This is AI-assisted planning, not a guarantee." "Prices are real-time estimates; confirm before booking." "Activities are based on online data; verify ratings/hours before visiting." "Photos are organized by AI; please review for accuracy." Opt-out option for all AI features (manual planning mode). |

### Fairness

| Question | Answer |
|---|---|
| **Which groups are underrepresented?** | **Language:** Currently English-only; Spanish/Mandarin/French in MVP 2. **Geography:** Strong coverage of popular destinations (US, EU, Southeast Asia); weaker for remote/developing regions (lack of online reviews). **Accessibility:** App may not be fully WCAG 2.1 AA compliant on launch (commitment: full compliance by Month 6). **Income:** Budget-conscious features are strong; luxury travel (5-star hotels) is underrepresented in training data. **Ability:** Not fully tested with disabled users (plan: accessibility audit with 5 disabled users in beta). |
| **Why don't they work and what's the plan?** | **Language gap:** LLM performs worse on non-English text. **Plan:** Hire native speakers; test on 50+ families per language. **Geography gap:** Fewer online reviews = less training data. **Plan:** Supplement with official tourism data; partner with local travel experts. **Accessibility gap:** Visual/motor impairments not fully tested. **Plan:** Conduct audit; fix critical barriers (alt text, keyboard nav, screen reader support) in MVP. **Income gap:** Luxury hotels are niche; may not be well-represented in public reviews. **Plan:** Partner with luxury travel brands; solicit user feedback to expand coverage. |
| **Test/feedback loop to identify gaps?** | Monthly audit by demographic segment (income, age, location, ability). User survey: "Did HappyTravels work well for your family?" segmented by demographics. Support ticket analysis: over-representation of issues from specific groups triggers investigation. Quarterly external audit by DEI consultant. |

### Reliability & Safety

| Question | Answer |
|---|---|
| **Acceptable error rates?** | Critical errors (e.g., double-booked flights, missed visa requirements, unsafe destination): <0.1% of trips. Recommendation errors (e.g., restaurant closed, activity unavailable): <5% of activities per itinerary. User satisfaction errors (e.g., itinerary doesn't reflect preferences): <20% rejection rate. |
| **Consequences of bad input/errors?** | **Hallucinated destination:** Family wastes time researching; mitigation: all recs are sourced; users rate helpfulness. **Bad price prediction:** Family overpays; mitigation: confidence bounds shared; alert only if high-confidence; user can ignore. **Hallucinated activity:** Family goes to nonexistent restaurant; mitigation: all activities are searchable/real; system verifies availability before including in itinerary. **Booking failure:** Family misses a flight; mitigation: multiple confirmation steps; integration testing with real APIs; rollback plan. |
| **Recovery plan if system fails?** | **Latency spike:** Async job (synthesis) times out; fallback: return pre-computed itinerary template while synthesis retries in background. **API outage (airline/hotel):** Cache last-known prices; alert user to stale data; revert to manual booking flow. **Model failure (poor outputs):** Roll back to previous model version within 1 hour; notify affected families; offer manual planning support. **Data loss:** Daily backups to S3 with cross-region replication; RPO <4 hours; RTO <1 hour. |
| **How is system health monitored?** | Automated monitoring: latency, error rates, API availability (CloudWatch + custom dashboards). Alerting: PagerDuty for P0 (crashes, data loss), P1 (degraded performance). On-call rotation: 1 SRE 24/7. Weekly incident review. Status page (public) updated in real-time. |
| **Customer communication plan?** | P0 incident: in-app banner + SMS/email within 15 mins. Estimated fix time; hourly updates if >1 hour. Post-incident: email summary + transparency report. Compensation: affected families get $20 credit if booking disrupted. |

---

## 8. Pricing — Week 6 & 7

### Cost & Accuracy Trade-offs

| # | Item | What We Use | Why | Trade-off |
|---|---|---|---|---|
| 1 | **Framework** | LangChain (Python) + FastAPI | Rapid agent orchestration; integrates with multiple LLM providers | Vendor risk if LangChain breaks; alternative: build custom orchestration |
| 2 | **LLM for Inference** | Claude 3 Sonnet (primary); GPT-4o (fallback) | Sonnet: $3/$15 per 1M in/out tokens; 200K context; fast. GPT-4o: $5/$15; better multimodal | Cost per plan could exceed budget if more calls needed; latency variance |
| 3 | **Vector DB** | Pinecone (Starter: $0/month for prototype; Pro: $84/month + usage) | Managed; scales; good uptime | Monthly cost scales with stored vectors; lock-in |
| 4 | **Image Processing** | Google Cloud Vision API ($6 per 1K images) | High accuracy; integrates with Google services | Per-image cost can add up; alternative: open-source models (lower accuracy) |
| 5 | **Real-time Pricing Data** | Hopper API (partner) + hotel chain APIs | Hopper = most accurate flight predictions; hotel APIs = direct source | Hopper may have rate limits; hotel APIs have varying integration costs |
| 6 | **UI** | React SPA (web) + React Native (iOS/Android) | Standard web framework; code reuse across platforms | RN can lag behind web; two codebases = 20% extra dev cost |
| 7 | **Hosting** | AWS (ECS + S3 + RDS + Lambda) | Scalable; good uptime; familiar to team | Vendor lock-in; data transfer costs; cold start latency |

### Development Costs (One-Time / MVP)

| Item | Cost | Notes |
|---|---|---|
| **Cloud hosting & storage setup** | $3,000 | AWS setup, security, monitoring tools, backups |
| **LLM API credits (dev + test)** | $5,000 | Estimate: 10K+ test calls, $0.50+ per call for LLM synthesis |
| **Vector DB setup** | $1,000 | Pinecone setup, embeddings generation, indexing |
| **Vision API setup** | $2,000 | Google Cloud Vision integration, testing |
| **CI/CD & DevOps tools** | $2,000 | GitHub, Vercel, monitoring (Datadog), logging (Mixpanel) |
| **Security & compliance** | $5,000 | SSL certificates, security audit, GDPR legal review |
| **Misc. (APIs, licenses)** | $2,000 | Hopper partner agreement, Stripe, third-party tools |
| **Infrastructure Subtotal** | **$20,000** | |

| Role | Qty | Monthly Cost | Duration (Months) | Subtotal |
|---|---|---|---|---|
| **Product Manager** | 1 | $12,000 | 3 | $36,000 |
| **Lead Backend Engineer** | 1 | $15,000 | 3 | $45,000 |
| **Backend Engineer** (LLM orchestration) | 1 | $13,000 | 3 | $39,000 |
| **Frontend Engineer** (React/RN) | 1 | $13,000 | 3 | $39,000 |
| **ML / Data Scientist** (evals, monitoring) | 1 | $14,000 | 3 | $42,000 |
| **QA Engineer** | 0.5 | $11,000 | 3 | $16,500 |
| **UX Designer** (part-time) | 0.5 | $10,000 | 2 | $10,000 |
| **Manpower Subtotal** | | | | **$227,500** |

| | | | **Total One-Time (MVP)** | **$247,500** |

### Operational Costs (Recurring Monthly)

| Item | Monthly Cost | Notes |
|---|---|---|
| **Cloud hosting & storage** | $2,000 | ECS, S3, RDS (assume 50K active families by Month 6) |
| **LLM API usage** | $8,000 | Average 5–10 calls per trip per family; assume 1,000 active families/month = $8/family |
| **Vector DB** | $500 | Pinecone Pro + usage; alternative: Weaviate self-hosted ($3K upfront, $500/month ops) |
| **Image tagging (Vision API)** | $1,000 | Assume 500 photos/family/trip = 500K photos/month @ $6/1K |
| **Monitoring & observability** | $500 | Datadog, LogRocket, custom dashboards |
| **3rd-party integrations** | $1,000 | Hopper credits, Stripe processing fees, OpenTable, Viator |
| **CI/CD & DevOps tools** | $300 | GitHub, Vercel, security scanning |
| **Support & customer services** | $2,000 | Help desk software, basic support team (part-time) |
| **Manpower (maintenance team)** | $8,000 | 0.5 SRE + 0.5 support engineer |
| **Monthly Total** | **$23,300** | |

### Market Size

- **TAM (Total Addressable Market):** Global family leisure travel market = $400–480 billion (35–40% of $1.2T leisure travel). Assuming avg trip spend = $5,000/family and digital planning tool penetration = 10%, TAM = $40–48 billion.
- **SAM (Serviceable Addressable Market):** Target: English-speaking families in US, UK, Canada, Australia, Western Europe planning trips 1–4x/year. ~100M families x 2–3 trips/year x $5K avg spend = $1–1.5 trillion in trips. Assuming 5% penetration of digital planning tools, SAM = $50–75 billion.
- **SOM (Serviceable Obtainable Market):** Conservative first 24 months: 10K families x 2 trips/year x $100 ARPU (subscription) = $2M ARR by end of Year 2. Optimistic: 50K families = $10M ARR.

### Revenue Potential

| Scenario | Customers (Yr 3) | ARPU (Annual) | ARR | Notes |
|---|---|---|---|---|
| **Conservative** | 25,000 | $120 | $3.0M | Assumes 40% penetration of beta cohort; $10/month subscription; minimal add-ons |
| **Target** | 100,000 | $180 | $18M | Assumes network effects + word-of-mouth; mix of $12/mo subscription + $60/trip premium features |
| **Optimistic** | 250,000 | $240 | $60M | Assumes strong viral growth; international expansion; higher ARPU from premium/group features |

### Pricing Models Considered

| Model | Pros | Cons | Verdict |
|---|---|---|---|
| **Per-trip** | Low friction; users see value immediately; good for price-sensitive families | Unpredictable revenue; users may avoid the tool if priced per-trip | **Offered as add-on:** $15 per additional trip synthesis |
| **Freemium** | Drives adoption; free tier builds habit | Hard to convert to paid; low ARPU; cannibalization risk | **Not primary strategy:** Free trial (14 days) only |
| **Subscription (Monthly)** | Predictable ARR; encourages usage; simple billing | Families may use tool only during peak planning season (Dec–Apr, Jun–Aug) | **Primary model:** $12/month (3 trips included) |
| **Subscription (Annual)** | Higher LTV; better predictability | Payment friction; lower conversion than monthly | **Secondary model:** $120/year (−17% vs. monthly) |
| **Usage-based** | Scales with value delivered | Unpredictable for customers; hard to forecast revenue; families can game it | **Not recommended:** Too complex given low transaction volume |

### Directional Pricing

| Plan | Price | Includes | Target User |
|---|---|---|---|
| **Free Trial** | $0 / 14 days | 1 full trip plan (all features) | All new users |
| **Basic** | $12 / month | 3 trip syntheses/month; basic curation; up to 5 family members | Individual families; occasional travelers |
| **Plus** | $25 / month | 10 trip syntheses/month; premium curation (video memories, printed album); up to 15 family members | Active families (2–3 trips/year); group organizers |
| **Pro** | $50 / month | Unlimited trip syntheses; priority support; early access to new features; up to 30 family members | Travel enthusiasts; multi-family groups; power users |

**Value Anchor:** "$12/month = ~$1.50 per trip = 1/3 the cost of a single travel agent consultation. You get unlimited destination ideas, deal alerts, itinerary synthesis, and booking help."

**Add-ons:**
- Premium itinerary re-synthesis: $5/synthesis (if >10/month)
- Group travel coordination (tertiary persona): +$20/month
- Trip memories album (printed): $35 (one-time)

---

## 9. Open Questions

1. **Hopper API Partnership:** Can we establish a data-sharing agreement with Hopper for real-time price feeds and historical data? (Owner: Business Development; by Week 2)
2. **Hotel Chain API Access:** Which hotel chains (Marriott, Hilton, Hyatt, IHG, etc.) will grant us direct booking API access, and what are the commercial terms? (Owner: Partnerships; by Week 3)
3. **Legal Liability for Bad Recommendations:** If a family books based on our destination rec and it's unsafe or unsuitable, who is liable? (Owner: Legal; by Week 1)
4. **GDPR Data Residency:** Do we need to set up EU data centers, or is a contract with an EU data processor sufficient? (Owner: Compliance; by Week 2)
5. **Fine-tuning Data:** Post-MVP, should we fine-tune the LLM on our proprietary trip data, or continue with prompt-tuning? (Owner: ML Lead; decision by Month 6)
6. **Photo Hosting:** Should we use S3 for long-term storage, or a CDN + archive solution to reduce costs? (Owner: Infrastructure; by Week 4)
7. **Group Travel (Tertiary Persona):** What's the MVP scope for coordinating 8–20 person trips (split budgets, multiple households)? (Owner: PM; decision by Month 2)
8. **Mobile-first Design:** Should MVP focus on web (React SPA) with mobile responsive, or invest in React Native apps early? (Owner: Design Lead; decision by Week 2)

---

## 10. Assumptions Made

1. **Target Market:** Assumed English-speaking, digitally savvy families in North America, UK, Western Europe with annual household income >$75K and ability to travel 1–4x/year. (Non-assumption: tertiary persona / group travel is a post-MVP feature.)

2. **LLM Baseline:** Assumed Claude 3 Sonnet or GPT-4o as the primary LLM. Both have strong reasoning and can handle long contexts (100K+ tokens). (Alternative: Open-source models like Llama 2 if cost becomes prohibitive; noted as fallback for MVP 2.)

3. **Development Timeline:** Assumed a team of 6–7 FTEs (PM, lead engineer, 2 backend engineers, frontend, ML scientist, QA) can deliver MVP in 12 weeks (3 months). (This assumes clear requirements, minimal scope creep, and dedicated focus.)

4. **API Availability:** Assumed Hopper, Google Flights, Skyscanner, hotel chain APIs, OpenTable, and Viator APIs are available for integration with reasonable (non-prohibitive) commercial terms. (If APIs are unavailable or too expensive, alternative: web scraping + ML-based price prediction, which adds 4–6 weeks.)

5. **Pricing Model Viability:** Assumed $12/month is attractive vs. the time/value trade-off ($15+ per hour of consultant time). (If uptake is <10%, will pivot to per-trip or free-to-freemium model.)

6. **Preference Diversity:** Assumed families have 3–5 distinct, reconcilable preference types (beach, hiking, culture, adventure, luxury). (If preferences are highly niche or adversarial—e.g., "only luxury 5-star" vs. "ultra budget-conscious"—synthesis becomes harder.)

7. **Data Availability:** Assumed sufficient reviews and travel data exist on TripAdvisor, Google, etc., for research agent to operate at scale. (Niche destinations or lesser-known activities may have sparse data, reducing recommendation quality.)

8. **User Adoption:** Assumed families will adopt the app if it delivers clear value (time savings >50%, deal capture >70%, FHI ≥7.5). (If satisfaction is lower, growth will plateau; may require repositioning or feature pivots.)

9. **Booking Integration:** Assumed airlines, hotels, and restaurants will allow automated bookings via APIs without requiring phone calls or manual confirmations. (Some smaller establishments may not have APIs; fallback: generate booking links + instructions.)

10. **Responsible AI / Fairness:** Assumed that accessibility features (WCAG 2.1 AA, alt text, screen readers) and fairness audits can be implemented within MVP timeline. (May require post-launch fixes if timeline is tight; committed to Month 6 for full compliance.)

---

**End of PRD**

---

**Document Review Status:**

- [✓] Problem Definition: Specific, quantified, MOAT clear, agentic AI justified
- [✓] Solution Definition: User flows detailed, functional requirements in user story format, agent capabilities defined
- [✓] Core Metrics: North Star (FHI) explicit with targets and tracking; primary and secondary metrics defined
- [✓] Prioritization: Components broken down, risk assessment per component, MVP scope clear
- [✓] Roadmap: Phases (MEP, MVP, MVP 1, MVP 2) with durations and success criteria
- [✓] Evaluations: Strategy, ground truth, HHH framework, launch criteria defined
- [✓] Prompt Strategy: Techniques, output formats, improvement plan detailed
- [✓] Responsible AI: Accountability, transparency, fairness, reliability assessed
- [✓] Pricing: Cost/accuracy trade-offs, development and operational costs, market size, revenue scenarios, pricing models defined
- [✓] Open Questions: 8 unresolved questions flagged with owners and timelines
- [✓] Assumptions: 10 key assumptions listed; alternative approaches noted where applicable

**Status:** Ready for stakeholder review and team kickoff.
