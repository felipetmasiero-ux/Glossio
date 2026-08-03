# Arquitetura — Glossio

## Visão geral

```
┌─────────────────────┐         HTTPS/JSON         ┌──────────────────────┐         ┌──────────────┐
│   Frontend (SPA)     │ ─────────────────────────▶ │   Backend (API)      │ ───────▶│  PostgreSQL   │
│   React 19 + Vite    │ ◀───────────────────────── │   Node + Express     │ ◀───────│  (Render)     │
│   Vercel              │                            │   Render             │         │  gerenciado   │
└─────────────────────┘                            └──────────────────────┘         └──────────────┘
        │
        ▼
  localStorage
  (fonte de verdade local: flashcards, progresso,
   eventos, metas — sincronizado com o backend)
```

- **Frontend**: SPA React 19 (Vite), PWA instalável (service worker via `vite-plugin-pwa`, estratégia `injectManifest`), roteamento client-side (`react-router-dom`), hospedado como site estático na Vercel.
- **Backend**: API JSON stateless (Express), autenticação via JWT, hospedado como Web Service no Render.
- **Banco**: PostgreSQL gerenciado pelo Render, acessado via Prisma ORM.

Não há SSR, não há sessão server-side, não há upload de arquivos — cada requisição HTTP é independente e autenticada só pelo header `Authorization: Bearer <jwt>`.

## Por que "local-first, sync no fundo"

O dado do usuário (flashcards, progresso de lições, eventos de estudo, metas) vive primeiro no `localStorage` do navegador — toda leitura/escrita da UI é instantânea e funciona offline. O hook `useCloudSync` (`src/hooks/useCloudSync.js`) roda em segundo plano, sincronizando com o backend:

- **Hydrate** (ao logar/recarregar): busca o estado do servidor e mescla com o local, usando um marcador (`cloudSyncSynced` no localStorage) para nunca sobrescrever uma edição local ainda não enviada.
- **Flush** (a cada 8s e no `pagehide`): envia para o servidor qualquer coisa que mudou localmente desde o último sync confirmado.

Essa escolha é o que torna a PWA funcional offline e o app "instantâneo" mesmo em conexão ruim — o servidor é a fonte de verdade *entre dispositivos*, não a fonte de verdade de cada interação individual.

## Autenticação

- JWT assinado com `HS256` (algoritmo fixado nos dois lados — sign e verify — para fechar ataques de confusão de algoritmo), expiração configurável (`JWT_EXPIRES_IN`, padrão 7 dias).
- Sem refresh token: o token simplesmente expira e o usuário loga de novo. Sem sessão server-side (sem blocklist de token) — logout é client-side (remove o token do `localStorage`) e agora também se propaga entre abas do mesmo navegador via evento `storage` (ver `AuthProvider.jsx`).
- Toda rota autenticada usa `req.userId`, que só é populado pelo middleware `auth` a partir do JWT verificado — nenhum endpoint aceita um id de usuário vindo do corpo/query da requisição.

## Camadas do backend

```
routes/         → só declara path + middleware (auth, rate limit) + qual controller chama
controllers/     → parseia req/res, delega tudo ao service, nunca tem lógica de negócio
services/        → validação de entrada + acesso ao Prisma + regras de negócio
middlewares/     → auth, rate limiting, request-id/logging, error handler central
utils/           → validators, JWT, logger, métricas, HttpError
config/          → env.js (única porta de entrada para variáveis de ambiente), prisma.js
```

Todo erro passa por um único `errorHandler` (`middlewares/errorHandler.js`) — garante que nenhuma exceção não tratada (erro do Prisma, stack trace, mensagem interna) vaze para o cliente; sempre uma mensagem genérica + log interno.

## Camadas do frontend

```
pages/           → uma página por rota, compõe hooks + componentes
components/      → componentes de UI, organizados por domínio (flashcards, explore, lessons, ...)
contexts/        → Providers (Auth, Flashcard, Event, LessonProgress, ...) - estado global via Context
hooks/           → um hook por "caso de uso" (useDashboardData, useStatistics, useCloudSync, ...)
repositories/    e utils/*Repository.js → leitura de conteúdo estático (cursos, vídeos, dicionário, gramática)
utils/           → lógica pura (cálculo de estatísticas, SM-2, busca, metas), sem estado React
data/            → conteúdo estático autoral (lições, vídeos, dicionário, gramática) por idioma
```

Conteúdo (`data/`) é 100% estático e versionado no repositório — não existe CMS nem edição em produção. Adicionar/editar uma lição é um commit.

## Infraestrutura de produção

| Peça | Onde | Observação |
|---|---|---|
| Frontend estático + CDN | Vercel | Deploy automático a cada push no branch conectado |
| Backend (Node/Express) | Render Web Service | `render.yaml` na raiz descreve o serviço |
| Banco (Postgres) | Render managed database | Backups automáticos no plano pago (ver `BACKUP_RESTORE.md`) |
| HTTPS | Automático (Vercel + Render) | Certificados Let's Encrypt geridos pela plataforma |
| Monitoramento | UptimeRobot (externo) | Ping em `/health` a cada 5min |
| Observabilidade interna | `/health`, `/ready`, `/metrics` | Ver `backend/src/controllers/healthController.js` |
| Rastreamento de erros | Não configurado | Sentry deixado como próximo passo opcional (ver `DEPLOY.md`) |

Veja `docs/ENVIRONMENT_VARIABLES.md` para a lista completa de variáveis e `docs/DEPLOY.md` para o passo a passo de deploy.
