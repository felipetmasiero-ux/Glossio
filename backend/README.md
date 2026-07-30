# Glossio Backend

Minimal Express + PostgreSQL (Prisma) + JWT auth service. Owns user accounts
only — no progress, flashcards, or video data yet. The frontend keeps using
`localStorage` for everything else; this backend is the seam that later
sprints will migrate features through.

## Setup

```
cp .env.example .env
docker compose up -d
npm install
npx prisma migrate dev --name init
npm run dev
```

Server listens on `PORT` (default `4000`). All routes are under `/api`.

## Endpoints

- `POST /api/auth/register` — `{ name, email, password, preferredLanguage? }` → `{ token, user }`
- `POST /api/auth/login` — `{ email, password }` → `{ token, user }`
- `GET /api/auth/me` — requires `Authorization: Bearer <token>` → `{ user }`
