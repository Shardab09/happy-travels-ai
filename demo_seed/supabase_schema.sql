-- ============================================================
-- HappyTravelsAI — Supabase Schema (MVP)
-- Run this first in Supabase SQL Editor
-- ============================================================

-- Members table
create table if not exists members (
  id            serial primary key,
  family_id     text not null,
  member_id     text not null unique,
  name          text not null,
  age           int  not null,
  member_role   text not null,  -- planner | partner | adult_child | child | teen
  travel_style  text,
  dietary_restrictions text default 'none',
  mobility_constraints text default 'none',
  created_at    timestamptz default now()
);

-- Preferences table (one row per member per tag)
create table if not exists preferences (
  id        serial primary key,
  member_id text not null references members(member_id),
  tag       text not null
);

-- Travel history table
create table if not exists travel_history (
  id                    serial primary key,
  family_id             text not null,
  member_id             text not null references members(member_id),
  trip_id               text not null,
  year                  int  not null,
  destination           text not null,
  region                text,
  activities            jsonb,   -- array of activity names
  activity_ratings      jsonb,   -- { activity_name: rating (1-10) }
  overall_satisfaction  int,     -- 1-10
  highlight             text,
  would_return          text,    -- yes | no | maybe
  what_worked           text,
  what_to_avoid         text,
  created_at            timestamptz default now()
);

-- Trips table (one row per planning session)
create table if not exists trips (
  id             serial primary key,
  family_id      text not null,
  budget_usd     int,
  travel_month   text,
  duration_days  int,
  created_at     timestamptz default now()
);

-- Recommendations table (stores LLM output per session)
create table if not exists recommendations (
  id             serial primary key,
  family_id      text not null,
  trip_id        int  references trips(id),
  destination    text,
  rationale      text,
  addresses_member text,
  builds_on_history text,
  source_url     text,
  source_type    text,  -- reddit | niche_blog | mainstream_review | travel_community
  advisory_level int,
  mainstream_or_offpath text,  -- mainstream | off_beaten_path
  created_at     timestamptz default now()
);

-- Indexes for common queries
create index if not exists idx_members_family      on members(family_id);
create index if not exists idx_preferences_member  on preferences(member_id);
create index if not exists idx_history_family      on travel_history(family_id);
create index if not exists idx_history_member      on travel_history(member_id);
create index if not exists idx_trips_family        on trips(family_id);
