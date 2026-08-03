# Glossio Backend

Express + PostgreSQL (Prisma) + JWT auth service. Owns user accounts and
syncs progress, flashcards, video/lesson progress, study events, and study
goals for logged-in users — the frontend still works fully offline-first via
`localStorage`; this backend is the cross-device sync layer on top of that.

## Starting the server

```
cp .env.example .env
docker compose up -d          # starts local Postgres
npm install
npx prisma migrate dev --name init
npm run dev                   # nodemon, auto-restarts on file changes
```

`npm start` runs the same thing without nodemon (what a real deployment
uses). The server listens on `PORT` (default `4000`); all application routes
are under `/api`, except the observability endpoints below, which are
intentionally at the root.

## Required environment variables

The process fails immediately on startup (before it ever binds a port) if
either is missing — see `src/config/env.js`, the single place that reads
`process.env` in this codebase.

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | yes | Postgres connection string |
| `JWT_SECRET` | yes | Long random string; signs and verifies every token |
| `PORT` | no | Defaults to `4000` |
| `CORS_ORIGIN` | no | Comma-separated allowlist, e.g. `http://localhost:5173,https://app.glossio.com`. Defaults to `http://localhost:5173`. Never `*`. |
| `JWT_EXPIRES_IN` | no | Defaults to `7d` |
| `LOG_LEVEL` | no | `debug`\|`info`\|`warn`\|`error`. Defaults to `debug` outside production, `info` in it |
| `NODE_ENV` | no | `production` unlocks the real (strict) rate limits — see below |

## Observability

### `GET /health` — liveness
No database call, responds in milliseconds. For an orchestrator's liveness
probe ("is the process alive"):
```json
{ "status": "ok", "uptime": 12.3, "timestamp": "2026-08-02T15:58:47.603Z", "version": "0.0.0" }
```

### `GET /ready` — readiness
Does a real `SELECT 1` through Prisma. For an orchestrator's readiness probe
("can this instance actually serve traffic"):
```json
{ "status": "ready" }
```
Returns `503 { "status": "not_ready" }` if Postgres isn't reachable.

### `GET /metrics` — in-memory metrics
No Prometheus/StatsD/external collector — just the current process's own
counters, reset on restart:
```json
{
  "uptime": 12.3,
  "memory": { "rss": 0, "heapTotal": 0, "heapUsed": 0, "external": 0, "arrayBuffers": 0 },
  "cpu": { "user": 0, "system": 0 },
  "requests": { "total": 0, "2xx": 0, "4xx": 0, "5xx": 0, "averageResponseTimeMs": 0 }
}
```
Not authenticated (matches `/health`/`/ready`) — in a real deployment, put
this behind the reverse proxy/firewall for internal monitoring only, not the
public internet.

### Logs
Structured JSON via `pino` (`src/utils/logger.js`). Every request gets an
automatic line - method, route, status, response time, and a `requestId`
(also echoed back as the `X-Request-ID` response header, so a user-reported
error can be traced to its exact log line). Security/audit events (login,
registro, troca de senha, 401/403/429/500) carry the same `requestId`.
`password`, `newPassword`, `currentPassword`, `passwordHash`, `token`, and
`Authorization` are redacted at the logger level - never written to a log
line even if a future call site accidentally passes one in.

### Shutdown
`SIGINT`/`SIGTERM` (and, as a crash-recovery path, `uncaughtException`/
`unhandledRejection`) trigger the same controlled sequence in
`src/lifecycle.js`: stop accepting new connections, let in-flight requests
finish, disconnect Prisma, then exit - with a 10s force-exit timer as a
safety net if something hangs.

## Rate limiting

`/auth/login` (5/15min), `/auth/register` (3/hour), and `/user/password`
(5/30min) have their own stricter limiters on top of general per-method
baselines (100 GET / 60 PUT / 40 POST per minute). These are the real
production numbers; outside `NODE_ENV=production` they're scaled up so a
local dev server (or the E2E suite, which registers a disposable user per
test) doesn't lock itself out — see `src/middlewares/rateLimiters.js`.

## API endpoints

- `POST /api/auth/register` — `{ name, email, password, preferredLanguage? }` → `{ token, user }`
- `POST /api/auth/login` — `{ email, password }` → `{ token, user }`
- `GET /api/auth/me` — requires `Authorization: Bearer <token>` → `{ user }`
- `GET /api/user` / `PUT /api/user` / `PUT /api/user/password`
- `GET /api/progress` / `PUT /api/progress`
- `GET /api/flashcards` / `PUT /api/flashcards`
- `GET /api/lesson-progress` / `PUT /api/lesson-progress`
- `GET /api/video-progress` / `PUT /api/video-progress`
- `GET /api/events` / `POST /api/events`

## Tests

```
npm test
```

Runs against the real database with disposable per-test users (see
`tests/helpers.js`) - no Prisma mocking.
