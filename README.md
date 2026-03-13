# MADE by Meti

Gallery-first Vite and React starter for presenting artwork, process films, exhibitions, and journal entries.

## Run locally

```sh
npm install
npm run dev
```

The site will run without Supabase. In that mode it uses static journal content and disables auth-backed features like comments, login, and newsletter signup.

If you want those features, create a `.env` file from `.env.example` and add your Supabase project values:

```sh
cp .env.example .env
```

## Key routes

- `/` gallery landing page
- `/artworks` artwork grid
- `/process` process and studio films
- `/exhibitions` exhibitions and installation schedule
- `/journal` editorial updates
- `/about` MADE / Meti overview

Legacy routes from the original template are still mapped for compatibility.

## Notes

- `.codex/lovable-plan.md` contains the migrated planning note from the old `.lovable` directory.
- Supabase migrations live in [`supabase/migrations`](./supabase/migrations).
