-- ============================================================
-- HappyTravelsAI — Demo Seed Data (FAM-DEMO)
-- Run this AFTER supabase_schema.sql
-- This is DEV data — demo environment starts empty
-- ============================================================

-- ── MEMBERS ──────────────────────────────────────────────────

insert into members (family_id, member_id, name, age, member_role, travel_style, dietary_restrictions, mobility_constraints)
values
  ('FAM-DEMO', 'MEM-001', 'Sharda', 45, 'planner',
   'Culture-first traveller. Loves scenic moments, exceptional food scenes, architectural beauty, and boat experiences.',
   'none', 'none'),

  ('FAM-DEMO', 'MEM-002', 'Niel', 44, 'partner',
   'History and water activities with a strong food scene. Drawn to iconic landmarks, sea caves, and hidden gems.',
   'none', 'none'),

  ('FAM-DEMO', 'MEM-003', 'Nisha', 20, 'adult_child',
   'Adventure and beach. Wants unique landscapes, cliff jumping, nightlife, local food, and social atmosphere.',
   'none', 'none');

-- ── PREFERENCES ──────────────────────────────────────────────

-- Sharda
insert into preferences (member_id, tag) values
  ('MEM-001', 'culture'),
  ('MEM-001', 'food'),
  ('MEM-001', 'history'),
  ('MEM-001', 'architecture'),
  ('MEM-001', 'beach'),
  ('MEM-001', 'photography'),
  ('MEM-001', 'relaxation');

-- Niel
insert into preferences (member_id, tag) values
  ('MEM-002', 'history'),
  ('MEM-002', 'food'),
  ('MEM-002', 'culture'),
  ('MEM-002', 'adventure'),
  ('MEM-002', 'hiking'),
  ('MEM-002', 'beach'),
  ('MEM-002', 'nature'),
  ('MEM-002', 'photography');

-- Nisha
insert into preferences (member_id, tag) values
  ('MEM-003', 'beach'),
  ('MEM-003', 'adventure'),
  ('MEM-003', 'nightlife'),
  ('MEM-003', 'food'),
  ('MEM-003', 'island'),
  ('MEM-003', 'nature'),
  ('MEM-003', 'city_life');

-- ── TRAVEL HISTORY ───────────────────────────────────────────

-- TRIP 1: Greece 2025

insert into travel_history (
  family_id, member_id, trip_id, year, destination, region,
  activities, activity_ratings, overall_satisfaction,
  highlight, would_return, what_worked, what_to_avoid
) values

-- Sharda — Greece
('FAM-DEMO', 'MEM-001', 'TRIP-001', 2025,
 'Greece (Athens, Santorini, Milos)', 'Mediterranean Europe',
 '["boat trips", "caldera sunsets", "food scene", "beaches", "museums"]',
 '{"boat_trips": 9, "caldera_sunsets": 10, "food_scene": 9, "beaches": 8, "museums": 7}',
 9,
 'Santorini caldera at sunset — nothing like it',
 'yes',
 'Island diversity — each island had a distinct character. Food scene across all three was exceptional. Boat trips connected everything.',
 'Peak tourist crowds in Santorini — go shoulder season or prioritise less-visited islands like Milos'),

-- Niel — Greece
('FAM-DEMO', 'MEM-002', 'TRIP-001', 2025,
 'Greece (Athens, Santorini, Milos)', 'Mediterranean Europe',
 '["boat trips", "sea caves", "food scene", "beaches", "island exploration"]',
 '{"boat_trips": 9, "sea_caves": 9, "food_scene": 9, "beaches": 7, "island_exploration": 8}',
 9,
 'Sea caves in Milos — completely unexpected and spectacular',
 'yes',
 'Island diversity — each island had a distinct character. Food scene across all three was exceptional. Boat trips connected everything.',
 'Peak tourist crowds in Santorini — go shoulder season or prioritise less-visited islands like Milos'),

-- Nisha — Greece
('FAM-DEMO', 'MEM-003', 'TRIP-001', 2025,
 'Greece (Athens, Santorini, Milos)', 'Mediterranean Europe',
 '["beaches", "cliff jumping", "Sarakiniko volcanic rocks", "local food", "boat trips"]',
 '{"cliff_jumping": 10, "sarakiniko_beach": 10, "local_food": 9, "boat_trips": 8, "beaches": 9}',
 9,
 'Cliff jumping at Sarakiniko — the white volcanic rocks are surreal',
 'yes',
 'Island diversity — each island had a distinct character. Food scene across all three was exceptional. Boat trips connected everything.',
 'Peak tourist crowds in Santorini — go shoulder season or prioritise less-visited islands like Milos'),

-- TRIP 2: India 2023

-- Sharda — India
('FAM-DEMO', 'MEM-001', 'TRIP-002', 2023,
 'India (Delhi, Agra, Goa, Hyderabad)', 'South Asia',
 '["forts and culture", "food scene", "beach walks", "shopping", "family visits"]',
 '{"forts_culture": 9, "food_scene": 10, "beach_walks": 7, "shopping": 8, "family_visits": 9}',
 8,
 'Food across all four cities — Hyderabad biryani, Delhi street food, Goa seafood',
 'yes',
 'Food diversity across cities was exceptional. Heritage and beach combination gave everyone something. Family connection was a highlight.',
 'Delhi heat in summer — plan Oct-Feb. Agra can be done as a day trip, does not need overnight.'),

-- Niel — India
('FAM-DEMO', 'MEM-002', 'TRIP-002', 2023,
 'India (Delhi, Agra, Goa, Hyderabad)', 'South Asia',
 '["Taj Mahal", "Delhi forts", "food scene", "beaches", "hiking"]',
 '{"taj_mahal": 10, "delhi_forts": 8, "food_scene": 9, "beaches": 7, "hiking": 7}',
 8,
 'Taj Mahal at sunrise — worth every cliche',
 'yes',
 'Food diversity across cities was exceptional. Heritage and beach combination gave everyone something.',
 'Delhi heat in summer — plan Oct-Feb. Agra can be done as a day trip, does not need overnight.'),

-- Nisha — India
('FAM-DEMO', 'MEM-003', 'TRIP-002', 2023,
 'India (Delhi, Agra, Goa, Hyderabad)', 'South Asia',
 '["Goa beaches", "clubs and nightlife", "food scene", "music scene", "shopping"]',
 '{"goa_beaches": 9, "clubs_nightlife": 9, "food_scene": 9, "music_scene": 8, "shopping": 7}',
 8,
 'Goa beach clubs — the vibe is unlike anywhere else',
 'maybe',
 'Food diversity across cities was exceptional. Goa had a great social atmosphere.',
 'Delhi heat in summer — plan Oct-Feb.');

-- ── TRIP PARAMETERS ──────────────────────────────────────────

insert into trips (family_id, budget_usd, travel_month, duration_days)
values ('FAM-DEMO', 7000, 'September', 6);

-- ── VERIFY SEED ──────────────────────────────────────────────
-- Run these selects to confirm data loaded correctly:

-- select count(*) from members where family_id = 'FAM-DEMO';         -- expect 3
-- select count(*) from preferences where member_id like 'MEM-0%';    -- expect 22
-- select count(*) from travel_history where family_id = 'FAM-DEMO';  -- expect 6
-- select * from trips where family_id = 'FAM-DEMO';                  -- expect 1 row
