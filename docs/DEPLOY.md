# Deploy — Glossio em produção

Guia passo a passo para colocar o Glossio no ar: frontend na Vercel, backend + Postgres no Render.

Como Vercel e Render não sabem a URL um do outro antes de existirem, o deploy acontece em **duas passadas**: primeiro o backend (para ter uma URL), depois o frontend apontando para ela, e por fim uma volta ao backend para liberar o CORS para a URL real do frontend.

## Pré-requisitos

- Repositório no GitHub com este código já enviado (`git push`).
- Conta na [Vercel](https://vercel.com) (login com GitHub é o mais simples).
- Conta no [Render](https://render.com) (login com GitHub também).

## Passo 1 — Backend + Postgres no Render

O arquivo [`render.yaml`](../render.yaml) na raiz do repositório já descreve os dois recursos (web service + banco). Usar o Blueprint é o caminho mais rápido:

1. No dashboard do Render, **New > Blueprint**.
2. Conecte o repositório GitHub do Glossio.
3. Render lê `render.yaml` e propõe criar:
   - `glossio-db` — Postgres gerenciado (plano free).
   - `glossio-backend` — Web Service Node, com `rootDir: backend`.
4. Antes de confirmar, Render vai pedir o valor de `CORS_ORIGIN` (marcado como `sync: false` no blueprint, ou seja, não tem valor automático). Deixe como `http://localhost:5173` por enquanto — **você volta aqui no Passo 3** para trocar pela URL real da Vercel.
5. Confirme. Render vai:
   - Provisionar o Postgres.
   - Rodar `npm install && npx prisma generate` (build).
   - Rodar `npx prisma migrate deploy && npm start` (start) — isso aplica todas as migrations existentes no banco novo.
6. Quando o serviço subir, copie a URL pública (algo como `https://glossio-backend.onrender.com`).
7. Valide que subiu corretamente:
   ```bash
   curl https://glossio-backend.onrender.com/health
   curl https://glossio-backend.onrender.com/ready
   ```
   Ambos devem responder `200` com um JSON de status.

> **Nota sobre o plano free do Render**: web services free "dormem" após 15 minutos sem tráfego e levam ~30-50s para acordar na primeira requisição depois disso. Isso é esperado e não é um bug — veja `docs/PRODUCTION_CHECKLIST.md` para o que isso significa na prática (e considere um plano pago antes de divulgar a URL amplamente, se a latência de "acordar" for um problema).

## Passo 2 — Frontend na Vercel

1. No dashboard da Vercel, **Add New > Project**.
2. Conecte o mesmo repositório GitHub.
3. Vercel detecta Vite automaticamente; o [`vercel.json`](../vercel.json) na raiz já define `buildCommand`/`outputDirectory`/rewrites/headers explicitamente, então não precisa mexer nos campos de build na UI.
4. Em **Environment Variables**, adicione:
   | Nome | Valor |
   |---|---|
   | `VITE_API_URL` | `https://glossio-backend.onrender.com/api` (a URL do Passo 1, **com** `/api` no final) |
5. Deploy. Quando terminar, Vercel te dá uma URL (`https://glossio-<algo>.vercel.app` ou o nome do projeto).

## Passo 3 — Fechar o CORS (volta ao Render)

Agora que a URL da Vercel existe:

1. No Render, abra o serviço `glossio-backend` → **Environment**.
2. Edite `CORS_ORIGIN` para a URL real da Vercel, por exemplo:
   ```
   CORS_ORIGIN=https://glossio-abc123.vercel.app
   ```
   (Se depois adicionar um domínio próprio, é só colocar os dois separados por vírgula: `CORS_ORIGIN=https://glossio-abc123.vercel.app,https://glossio.com` — o código já suporta lista.)
3. Salvar reinicia o serviço automaticamente.

## Passo 4 — Ajustar a CSP definitiva do frontend

O `vercel.json` já vem com uma Content-Security-Policy completa, mas com um placeholder no `connect-src`:

1. Abra `vercel.json` neste repositório.
2. Troque `https://REPLACE-WITH-YOUR-RENDER-BACKEND-URL.onrender.com` pela URL real do Passo 1.
3. Commit + push — a Vercel re-deploya automaticamente a cada push no branch conectado.

## Passo 5 — Validar tudo

Siga o [`docs/PRODUCTION_CHECKLIST.md`](./PRODUCTION_CHECKLIST.md) na íntegra. Resumo rápido:

```bash
# Lighthouse contra a URL real da Vercel
npx lighthouse https://glossio-abc123.vercel.app --preset=desktop --only-categories=performance,accessibility,best-practices

# Playwright contra a URL real (cria contas de teste reais - ver aviso no arquivo)
PLAYWRIGHT_BASE_URL=https://glossio-abc123.vercel.app npx playwright test
```

## HTTPS

Automático nos dois lados — Vercel e Render emitem/renovam certificados TLS (Let's Encrypt) para seus domínios `*.vercel.app`/`*.onrender.com` sem nenhuma configuração. Se um domínio próprio for adicionado depois, ambas as plataformas emitem o certificado automaticamente assim que o DNS aponta corretamente (nenhum passo manual de certificado é necessário).

## Domínio próprio (quando decidir usar um)

Esta sprint ficou com subdomínios de plataforma (`*.vercel.app` / `*.onrender.com`) por decisão explícita. Quando houver um domínio:

1. **Frontend**: Vercel → projeto → **Settings > Domains** → adicionar o domínio. Vercel mostra os registros DNS exatos (normalmente um `CNAME` para `cname.vercel-dns.com` ou registros `A`/`AAAA` se for o domínio raiz).
2. **Backend** (se quiser um subdomínio tipo `api.seudominio.com`): Render → serviço → **Settings > Custom Domains**, mesmo princípio (`CNAME` apontando para o hostname que o Render fornece).
3. Depois de propagado, repita o Passo 3 (CORS) e o Passo 4 (CSP) trocando as URLs de plataforma pelas do domínio novo.

## Monitoramento (UptimeRobot)

1. Crie uma conta gratuita em [uptimerobot.com](https://uptimerobot.com).
2. **Add New Monitor** → HTTP(s) → URL: `https://glossio-backend.onrender.com/health`, intervalo de 5 minutos.
3. Repita para o frontend: URL da Vercel, path `/`.
4. Configure um contato de alerta (e-mail é suficiente para começar).

> No plano free do Render, um ping a cada 5 minutos no `/health` também tem o efeito colateral de manter o serviço "acordado" (evita o cold-start de 30-50s mencionado no Passo 1) — dois problemas resolvidos pela mesma configuração.

## Sentry

Não configurado nesta sprint (decisão explícita — ver `docs/PRODUCTION_CHECKLIST.md`). Para adicionar depois, sem precisar repetir nenhum passo deste guia: criar conta em sentry.io, gerar um DSN por projeto (frontend e backend são projetos separados no Sentry), adicionar `@sentry/react`/`@sentry/node` e inicializar com o DSN via variável de ambiente (`VITE_SENTRY_DSN` / `SENTRY_DSN`).
