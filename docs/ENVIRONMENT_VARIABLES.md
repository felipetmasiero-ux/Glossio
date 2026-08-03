# Variáveis de ambiente

## Frontend (`.env`, ver `.env.example`)

Lidas em build-time pelo Vite (`import.meta.env.*`) — mudar uma variável exige um novo build/deploy, não só reiniciar.

| Variável | Obrigatória | Exemplo em produção | Descrição |
|---|---|---|---|
| `VITE_API_URL` | Não (tem fallback de dev) | `https://glossio-backend.onrender.com/api` | Base URL do backend. Sem ela, usa `http://localhost:4000/api` (só funciona em dev local). **Deve incluir `/api` no final.** |

## Backend (`backend/.env`, ver `backend/.env.example`)

Lidas em runtime, todas centralizadas em `backend/src/config/env.js` (nenhum outro arquivo do backend lê `process.env` diretamente, exceto esse módulo).

| Variável | Obrigatória | Exemplo em produção | Descrição |
|---|---|---|---|
| `DATABASE_URL` | **Sim** | fornecida automaticamente pelo Render (via `render.yaml`) | Connection string do Postgres. App recusa subir sem ela. |
| `JWT_SECRET` | **Sim** | gerado automaticamente pelo Render (`generateValue: true` no blueprint) | Segredo de assinatura dos tokens JWT. App recusa subir sem ele. **Nunca reusar o valor de dev/exemplo em produção.** |
| `JWT_EXPIRES_IN` | Não (padrão `7d`) | `7d` | Validade do token JWT. Aceita qualquer formato do `jsonwebtoken` (`"7d"`, `"1h"`, etc.). |
| `PORT` | Não (padrão `4000`) | fornecida automaticamente pelo Render | Porta em que o Express escuta. Render injeta essa variável sozinho — não precisa configurar manualmente. |
| `CORS_ORIGIN` | Não (padrão `http://localhost:5173`) | `https://glossio-abc123.vercel.app` | Lista separada por vírgula de origens permitidas. **Deve ser atualizada com a URL real da Vercel após o primeiro deploy do frontend** (ver `docs/DEPLOY.md`, Passo 3). Nunca usar `*`. |
| `NODE_ENV` | Não (padrão `development`) | `production` | Controla o nível de log padrão e os limites de rate limiting (limites de produção só valem com `NODE_ENV=production` — ver `backend/src/middlewares/rateLimiters.js`). |
| `LOG_LEVEL` | Não (padrão `info` em produção, `debug` fora) | `info` | Nível de verbosidade do logger (pino). |

## Onde cada uma é configurada em produção

- **Frontend**: painel da Vercel → Project → Settings → Environment Variables.
- **Backend**: painel do Render → Service → Environment. As marcadas como `generateValue`/`fromDatabase` no `render.yaml` são preenchidas automaticamente pelo Render no primeiro deploy via Blueprint; as demais podem ser editadas a qualquer momento (o serviço reinicia sozinho ao salvar).

## Segurança

- Nenhuma variável sensível (`JWT_SECRET`, `DATABASE_URL`) é commitada — os arquivos `.env`/`backend/.env` estão no `.gitignore`, só os `.env.example` (com placeholders) ficam versionados.
- `JWT_SECRET` é gerado pelo Render automaticamente no deploy via Blueprint — ninguém precisa (nem deve) digitar um valor manualmente.
