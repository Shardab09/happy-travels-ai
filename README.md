# HappyTravelsAI

AI-powered family vacation planner — recommends destinations every family member will love, grounded in preferences and real travel history.

## Project structure

```
happy-travels-ai/
├── ui/              # Lovable-generated React/Next.js frontend (deployed to Netlify)
├── workflows/n8n/   # n8n workflow exports (recommendation engine orchestration)
├── demo_seed/       # Demo family data, Supabase schema/seed SQL, Lovable screen prompts
├── eval_dataset/    # Synthetic eval corpus (100 families) + HHH rubric scorer + failure analysis
└── docs/            # PRD and session log
```

## Stack

- **UI:** Lovable (Next.js) → Netlify
- **Orchestration:** n8n (cloud)
- **Database:** Supabase (PostgreSQL)
- **LLM:** Claude (Anthropic API)
- **Web search / citations:** Tavily

## Status

MVP UI build complete (6 screens). n8n workflow + Supabase wiring in progress.

See [docs/SESSION_LOG.md](docs/SESSION_LOG.md) for full build history.
