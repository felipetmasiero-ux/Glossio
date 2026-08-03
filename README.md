# Glossio

Aprenda idiomas de verdade: lições estruturadas (Learn), conteúdo autêntico com tradução instantânea (Explore), um acervo pessoal de vocabulário (Collect) e revisão espaçada (Review) — inglês, francês e português.

React 19 + Vite no frontend, Node/Express + PostgreSQL (Prisma) no backend, PWA instalável, sincronização em nuvem entre dispositivos.

## Rodando localmente

**Backend** (precisa de um Postgres local - `backend/docker-compose.yml` sobe um):
```bash
cd backend
cp .env.example .env    # ajuste se necessário
docker compose up -d
npm install
npx prisma migrate dev
npm run dev              # http://localhost:4000
```

**Frontend**:
```bash
cp .env.example .env      # aponta para http://localhost:4000/api por padrão
npm install
npm run dev               # http://localhost:5173
```

## Testes

```bash
npx vitest run                        # frontend
cd backend && npm test                # backend (precisa do Postgres local rodando)
npx playwright test                   # e2e (builda o frontend e sobe os dois servidores sozinho)
npx eslint .                          # lint (frontend + backend)
```

## Deploy

Ver [`docs/DEPLOY.md`](docs/DEPLOY.md) para o passo a passo completo (Vercel + Render). Documentação relacionada:

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — como as peças se encaixam
- [`docs/ENVIRONMENT_VARIABLES.md`](docs/ENVIRONMENT_VARIABLES.md) — toda variável de ambiente, o que faz e onde configurar
- [`docs/BACKUP_RESTORE.md`](docs/BACKUP_RESTORE.md) — backup e restore do Postgres
- [`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md) — checklist de validação pós-deploy

Outros documentos de produto/design: [`PRODUCT.md`](PRODUCT.md), [`VISION.md`](VISION.md), [`DESIGN.md`](DESIGN.md), [`EXPLORE_ARCHITECTURE.md`](EXPLORE_ARCHITECTURE.md).
