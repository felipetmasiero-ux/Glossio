# Checklist de produção — Glossio

Rodar esta lista inteira depois de qualquer deploy inicial (e revisitar antes de divulgar a URL amplamente). Preencha as URLs reais no lugar dos placeholders antes de começar.

```
FRONTEND_URL=https://glossio-abc123.vercel.app
BACKEND_URL=https://glossio-backend.onrender.com
```

## 1. Backend saudável

```bash
curl -i $BACKEND_URL/health
curl -i $BACKEND_URL/ready
curl -i $BACKEND_URL/metrics
```
- [ ] `/health` responde `200` imediatamente (não depende do banco).
- [ ] `/ready` responde `200` (confirma que consegue falar com o Postgres).
- [ ] `/metrics` responde `200` com contadores.

Se o serviço está no plano free do Render e ficou inativo, a **primeira** requisição pode demorar 30-50s (cold start) — isso é esperado, não é falha.

## 2. Login / Registro (fluxo real, ponta a ponta)

- [ ] Abrir `$FRONTEND_URL/register`, criar uma conta de teste real, confirmar que chega em `/home` (ou na escolha de idioma).
- [ ] Fazer logout, fazer login de novo com a mesma conta.
- [ ] Recarregar a página logado - sessão deve persistir (sem voltar pro login).

## 3. Cloud Sync

- [ ] Adicionar um flashcard logado em um navegador/aba.
- [ ] Logar com a mesma conta em uma aba anônima/outro navegador.
- [ ] Confirmar que o flashcard aparece do outro lado (pode levar até ~8s, o intervalo de flush do `useCloudSync`).

## 4. CORS definitivo

```bash
curl -i -H "Origin: https://um-site-qualquer-nao-autorizado.example" $BACKEND_URL/api/auth/me
```
- [ ] Resposta deve ser `403` (origem não permitida).
```bash
curl -i -H "Origin: $FRONTEND_URL" $BACKEND_URL/api/auth/me
```
- [ ] Resposta deve **não** ser `403` (a URL real do frontend deve estar liberada - confirma que `CORS_ORIGIN` no Render foi mesmo atualizado, ver `docs/DEPLOY.md` Passo 3).

## 5. CSP definitiva

- [ ] Abrir o DevTools (aba Console) em `$FRONTEND_URL` e navegar pelo app inteiro (Home, Explore, um vídeo, Search, Profile) - **nenhum** erro de `Content-Security-Policy` deve aparecer no console.
- [ ] Especificamente: um vídeo do Explore deve tocar (confirma que `frame-src`/`script-src` para YouTube está correto) e as fontes devem carregar (confirma `font-src`/`style-src` para Google Fonts).
- [ ] Confirmar que o `connect-src` no `vercel.json` foi mesmo trocado do placeholder pela URL real do backend (ver `docs/DEPLOY.md` Passo 4) - sem isso, toda chamada `fetch` para a API é bloqueada pelo próprio navegador.

## 6. HSTS

```bash
curl -sI $BACKEND_URL/health | grep -i strict-transport-security
```
- [ ] Header presente com `max-age=31536000; includeSubDomains`.

## 7. PWA instalável

- [ ] Abrir `$FRONTEND_URL` no Chrome desktop - ícone de "instalar" deve aparecer na barra de endereço.
- [ ] Instalar, abrir o app instalado, confirmar que abre sem a barra do navegador.
- [ ] Desligar a rede (modo avião/offline no DevTools) e recarregar uma rota já visitada - o app shell deve continuar funcionando (não uma tela de erro do navegador).

## 8. Backup configurado

- [ ] Confirmar no dashboard do Render se `glossio-db` está em plano pago com backup automático, **ou** que um processo de backup manual (`docs/BACKUP_RESTORE.md`) já foi executado ao menos uma vez com sucesso.
- [ ] Se ainda no plano free: anotar a data de criação do banco (expira em 30 dias sem aviso automático confiável - acompanhar manualmente).

## 9. Lighthouse em produção

```bash
npx lighthouse $FRONTEND_URL --preset=desktop --only-categories=performance,accessibility,best-practices --output=json --output-path=./lighthouse-prod.json
```
- [ ] Performance ≥ 95
- [ ] Accessibility ≥ 95
- [ ] Best Practices = 100

(Os mesmos alvos definidos na Sprint 43 - produção não deve regredir em relação ao que foi medido localmente.)

## 10. Playwright contra a URL real

⚠️ Isto cria contas de teste **reais** no banco de produção e exercita os rate limiters reais (5 logins/15min, 3 registros/hora). Rodar uma vez logo após o deploy é um smoke test válido; não rodar repetidamente contra produção com usuários reais já usando o app.

```bash
PLAYWRIGHT_BASE_URL=$FRONTEND_URL npx playwright test
```
- [ ] Suíte completa passa (ou as falhas são investigadas antes de considerar o deploy validado).

## 11. Monitoramento ativo

- [ ] Monitor do UptimeRobot criado para `$BACKEND_URL/health` (ver `docs/DEPLOY.md`).
- [ ] Monitor do UptimeRobot criado para `$FRONTEND_URL`.
- [ ] Contato de alerta configurado (e-mail, no mínimo).
