# HappyTravelsAI — Lovable Screen Prompts
**Status:** In progress | Demo: Saturday June 21 2026

---

## Screen flow
```
Screen 1 (Welcome) → Screen 2 (Trip Setup) → Screen 3 (Preferences) 
→ Screen 4 (Travel History) → Screen 5 (Loading) → Screen 6 (Results)
```

---

## Screen 1 — Welcome / Landing ✅ DONE

**Status:** Built and approved. Avatars updated to S (teal), N (coral), N (gold).

```
Build a beautiful travel app welcome screen for "HappyTravelsAI" 
— an AI-powered family vacation planner.

Design:
- Full-screen hero with a warm, aspirational travel photo background 
  (use an unsplash travel image placeholder)
- Semi-transparent overlay so text is readable
- Top-left: "HappyTravelsAI" logo in white, clean sans-serif font
- Centre: Large headline "Plan a trip your whole family will love"
- Subheadline: "AI-powered recommendations built around every 
  family member's preferences — not just the planner's."
- One primary CTA button: "Start Planning →" (coral/sunset orange, 
  large, rounded)
- Warm colour palette: deep teal, coral, warm white
- Three family avatar initials: S (teal), N (coral), N (gold/yellow)
  with label "Family profiles — Everyone gets a say"
- Badge top-right: "Made for the whole crew"

Make it feel joyful and premium — like a modern travel brand, 
not a booking engine.
```

---

## Screen 2 — Trip Setup (US-001) ✅ DONE

**Status:** Built and approved. Pending: change default month Jun → Sep, add planner name field.

**Pending tweaks (run these in Lovable before moving on):**
```
Change the default selected month from Jun to Sep
```
```
Add a text input field at the top of the form, above the budget slider.
Label: "Your name (trip planner)"
Placeholder: "e.g. Sharda"
This captures the planner's name before they set up the trip.
```

**Original prompt:**
```
Build a trip setup form screen for HappyTravelsAI. 
This is the first step where the family planner enters trip parameters.

Header: "Let's set up your trip" with a small plane icon
Subheader: "You're the planner — tell us the basics and 
we'll handle the rest."

Form fields (clean card layout, one column, generous spacing):

1. "Total budget" — slider from $1,000 to $20,000 with a 
   live dollar display (e.g. "$7,000") — teal accent colour

2. "When are you travelling?" — horizontal month pill selector 
   (Jan through Dec, single select, coral highlight on selected)

3. "How many days?" — stepper with − and + buttons (default 7, 
   range 3–21)

4. "How many travellers?" — stepper with − and + buttons 
   (default 3, range 1–10)

Bottom: Primary button "Next: Add preferences →" (coral, full width)
Back link top-left.

Progress indicator at top: step 1 of 4 dots.
Clean white card on light grey background.
Connect the "Start Planning →" button on the welcome screen 
to navigate to this screen.
```

---

## Screen 3 — Preferences (US-002 Part 1) 🔲 TODO

**Status:** Not yet built. Build tomorrow.

```
Build a preference voting screen for HappyTravelsAI. 
Each family member fills this in individually.

Header: "Hi [Name], what's your travel style?"
Subheader: "Pick everything that appeals to you — 
the more you choose, the better we match."

Top: Small avatar/name field — "I am: [name input]" 
(so each member can identify themselves)

Preference tiles — a responsive grid of rounded cards 
(3 columns on desktop, 2 on mobile). 
Each tile has an emoji + label. 
Tapping selects it (teal border + light teal fill):

🏖 Beach          🥾 Hiking         🏛 Culture
🍜 Food scene     🌊 Adventure      🌃 Nightlife  
🏰 History        📸 Photography    🌿 Nature
🏙 City life      🏝 Island         💆 Wellness
✈️ Off-beaten-path  🛶 Boat trips   🌅 Scenic views

Below tiles: "Anything else? (optional)" — small free text input

Bottom: "Next →" button (coral, full width, disabled until 
≥2 tiles selected)

Progress: step 2 of 4 dots. 
Show: "Adding preferences for member 1 of 3" 
(or however many travellers were set in step 1).
Connect "Next: Add preferences →" from the trip setup screen 
to navigate here.
```

---

## Screen 4 — Travel History (US-002 Part 2) 🔲 TODO

**Status:** Not yet built.

```
Build a travel history screen for HappyTravelsAI. 
This appears for new users only — first time using the app.

Header: "Tell us about a trip you loved"
Subheader: "We use your travel history to personalise 
recommendations — not just what you say you like, 
but what you've actually loved."

Show 2 trip entry cards (Card 1 + Card 2 — "Add a second trip" 
expands the second card):

Each card contains:
- "Where did you go?" — text input (e.g. "Greece — Santorini, Milos")
- "When?" — year dropdown (2018–2025)
- "What did you love doing?" — tag chips the user can type 
  and add (e.g. "cliff jumping", "boat trips", "local food")
- "Overall, how was it?" — 5-star rating (large stars, coral fill)
- "Would you go back?" — 3 pill buttons: Yes / Maybe / No

Between cards: "+ Add another trip" link (only shows 2 max for MVP)

Bottom: 
- "Find our destinations →" button (coral, full width)
- Small note: "🔒 Your history is private — 
  only used to personalise your recommendations"

Progress: step 3 of 4 dots.
Connect "Next →" from the preferences screen to navigate here.
```

---

## Screen 5 — Loading State 🔲 TODO

**Status:** Not yet built.

```
Build a loading screen for HappyTravelsAI that appears while 
the AI is generating destination recommendations.

Centre of screen, dark teal background with subtle animated 
travel-themed particles (planes or dots drifting slowly).

Animated logo: "HappyTravelsAI" pulsing gently.

Rotating status messages (change every 2 seconds):
1. "Analysing your family's travel history..."
2. "Finding destinations Nisha would love..."
3. "Checking travel advisories..."
4. "Searching travel communities for hidden gems..."
5. "Building your personalised shortlist..."

Below messages: a thin coral progress bar animating 
left to right (loops until response arrives).

Bottom in small text: 
"Powered by Claude AI + live travel sources"

Connect "Find our destinations →" from the travel history screen 
to navigate here. This screen auto-advances to the results screen 
when the API response is received.
```

---

## Screen 6 — Destination Results (US-003 / US-004) 🔲 TODO

**Status:** Not yet built. This is the most important screen — wire to n8n webhook.

```
Build a destination results screen for HappyTravelsAI 
showing 5 AI-recommended destinations as cards.

Header: "Your family's perfect destinations"
Subheader: "Personalised for Sharda, Niel and Nisha 
based on your preferences and travel history"

5 destination cards in a vertical stack (full-width on mobile, 
2-col grid on desktop). Each card contains:

TOP SECTION (hero image placeholder — use unsplash):
- Destination name (large, white text over image)
- Two badges top-right: 
  • Advisory badge: green "Level 1 ✓" or amber "Level 2 ⚠"
  • Source badge: purple "Reddit find" or blue "Travel blog" 
    or grey "Mainstream"

BODY SECTION (white card):
- "Why this works for your family:" — 2-3 sentence rationale
- Member callouts (pill chips, teal):
  • "Sharda — scenic views"  
  • "Niel — sea caves & history"  
  • "Nisha — adventure beaches"
- "Builds on:" italic text in grey — 
  e.g. "Nisha's love of cliff jumping in Greece"
- Citation link: small grey text with external link icon — 
  "Source: [source name] ↗"

FOOTER of each card:
- "👍 Love it" button (outline teal)
- "👎 Not for us" button (outline grey)
- "Learn more ↗" link

At bottom of page:
"Ready to vote as a family? →" primary coral button

Use placeholder/mock data for now — wire to n8n webhook in Day 4.
```

---

## Colour palette reference
| Use | Colour |
|---|---|
| Primary CTA | Coral `#FF6B4A` |
| Accent / selected | Teal `#00B4A6` |
| Sharda avatar | Teal |
| Niel avatar | Coral |
| Nisha avatar | Gold `#F5C518` |
| Background | Light grey `#F5F5F5` |
| Cards | White `#FFFFFF` |
| Text primary | Dark `#1A1A2E` |

---

## Build order
```
Day 1 (Jun 15) ✅  Screen 1 + Screen 2
Day 2 (Jun 16) 🔲  Screen 3 + Screen 4
Day 3 (Jun 17) 🔲  Screen 5 + Screen 6 (with mock data)
Day 4 (Jun 18) 🔲  Wire n8n webhook → replace mock data with live results
Day 5 (Jun 19) 🔲  Polish + demo script
Day 6 (Jun 20) 🔲  Rehearsal + Vercel backup deploy
Day 7 (Jun 21) 🚀  Demo day
```
