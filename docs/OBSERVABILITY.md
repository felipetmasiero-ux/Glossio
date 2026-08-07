# Observabilidade — Glossio

Como o Glossio captura erros, mede performance real de usuário e loga
diagnósticos, e como isso se liga (ou não) a serviços externos.

## Arquitetura

Réplica direta do padrão já usado por `src/utils/analytics/`: um
`config.js` só de getters de variável de ambiente, um único arquivo "porta
de entrada" pro SDK de terceiro, um `init*.js` idempotente, e uma função
única que todo call-site usa.

```
src/utils/logger/logger.js              logging estruturado (sem depender de mais nada)

src/utils/errorTracking/
 ├─ config.js                           getSentryDsn/hasSentryDsn/isErrorTrackingEnabled/isDebugMode
 ├─ sentryClient.js                     única porta pro window.Sentry (injeta o <script>)
 ├─ initErrorTracking.js                idempotente: listeners globais + (se habilitado) Sentry
 ├─ captureException.js                 função única que todo call-site usa
 └─ index.js

src/utils/webVitals/reportWebVitals.js  Core Web Vitals -> trackEvent (GA4)

src/components/common/
 ├─ ErrorBoundary/ErrorBoundary.jsx     boundary global (montado em main.jsx)
 └─ WebVitalsReporter/WebVitalsReporter.jsx   dispara reportWebVitals() uma vez (montado em App.jsx)
```

## Captura de erros

Três mecanismos, cobrindo os três lugares onde um erro pode acontecer numa
SPA React (nenhum dos três cobre os outros dois):

1. **`ErrorBoundary`** (`src/components/common/ErrorBoundary`) — captura
   erros durante o render/lifecycle do React. Montado uma única vez, no
   nível mais alto possível (`main.jsx`, envolvendo
   `<BrowserRouter><App /></BrowserRouter>`) — um boundary só dentro de
   `App.jsx` não pegaria um erro lançado por um dos providers de contexto,
   que também renderizam dentro da árvore do `App`. Ao capturar, mostra um
   fallback amigável (reaproveita `EmptyState`,
   `src/components/common/EmptyState`) com duas ações: "Recarregar página"
   (`window.location.reload()`) e "Voltar ao início" (navegação dura pra
   `/`, não client-side — depois de uma árvore quebrada, isso evita cair de
   novo na mesma árvore).
2. **`window.addEventListener("error", ...)`** — captura exceções fora do
   ciclo de render (event handlers, timers, código de terceiro). Registrado
   em `initErrorTracking()`.
3. **`window.addEventListener("unhandledrejection", ...)`** — captura
   promises rejeitadas sem `.catch`. Também registrado em
   `initErrorTracking()`.

Os três, no fim, chamam a mesma função: `captureException(error, context)`
(`src/utils/errorTracking/captureException.js`) — **nenhum outro lugar do
app deve chamar `window.Sentry` ou `logger.error` diretamente pra reportar
um erro**, sempre passar por `captureException`.

`captureException` faz duas coisas, nessa ordem, e nunca lança:
1. `logger.error(...)` — sempre, incondicionalmente.
2. Encaminha pro Sentry, só se o SDK estiver carregado (nunca lança mesmo
   que o Sentry em si esteja quebrado).

## Sentry: arquitetura pronta, sem depender de credenciais

Igual ao GA4 (`src/utils/analytics/gtag.js`): o SDK do Sentry **não é uma
dependência do `package.json`** — é carregado via `<script>` injetado em
runtime (`sentryClient.js`), só quando `isErrorTrackingEnabled()` é
verdadeiro (produção **e** `VITE_SENTRY_DSN` configurado). Sem a env var,
ou em dev, o app funciona exatamente igual — captura automática de
exceção/rejeição continua funcionando (loga estruturado no console), só não
encaminha pro Sentry.

**Para ligar o Sentry de verdade**, quando houver uma conta/projeto:
1. Setar `VITE_SENTRY_DSN` no ambiente de produção (Vercel).
2. Opcionalmente, `VITE_SENTRY_DEBUG=true` em qualquer ambiente pra ver o
   log de inicialização no console.
3. Nenhuma outra mudança de código é necessária.

A versão do SDK carregado é fixa (`SENTRY_SDK_VERSION` em
`sentryClient.js`), não `latest` — um upgrade é uma mudança deliberada e
revisada, não algo que muda sozinho em produção.

**CSP**: `vercel.json` já libera os domínios do Sentry
(`https://browser.sentry-cdn.com` em `script-src`, `https://*.sentry.io`
em `connect-src`) — sem isso, o script seria bloqueado silenciosamente
mesmo com um DSN válido configurado.

## Web Vitals

`reportWebVitals()` (`src/utils/webVitals/reportWebVitals.js`) usa a
biblioteca oficial `web-vitals` (Google, a mesma fonte de número do
PageSpeed Insights/Search Console) pra medir LCP, CLS, INP, FCP e TTFB.
Cada métrica é reportada pelo canal de analytics **já existente**
(`trackEvent`, evento `web_vital_measured`, params `{metric_name, value,
rating, id}`) — não é um canal novo, é o mesmo GA4 que o resto do produto
já usa, herdando automaticamente as mesmas garantias (só envia em produção,
com `VITE_GA_MEASUREMENT_ID` configurado). **Onde ver os números**: GA4,
como evento customizado `web_vital_measured`.

`value` de CLS é multiplicado por 1000 antes de arredondar (CLS é uma nota
pequena sem unidade, tipo `0.031`; todo o resto aqui é milissegundo) — sem
isso, a maioria das medições de CLS viraria `0` depois do arredondamento.

## Logging estruturado

`logger.info/warn/error(message, context)` (`src/utils/logger/logger.js`)
sempre produz um objeto — `{level, message, context, timestamp}` — em vez
de uma string solta, via `console.info/warn/error`. **Escopo honesto**: não
existe hoje uma pipeline de agregação de log (nenhum backend recebendo
isso) — o que existe é a camada de captura estruturada, inspecionável no
console do navegador e pronta para virar uma chamada de rede pra um backend
de log depois, trocando só o corpo de `logger.js`, sem mudar nenhum
call-site que já usa `logger`.

## Como adicionar um novo ponto de captura

Em qualquer lugar novo do código que precise reportar um erro
manualmente (fora do que os três mecanismos automáticos já cobrem):

```js
import { captureException } from "src/utils/errorTracking";

try {
    doSomethingRisky();
} catch (error) {
    captureException(error, { feature: "nome-do-recurso" });
}
```

Nunca importar `window.Sentry` ou `logger` diretamente pra esse fim —
sempre `captureException`, que já garante o log estruturado e o
encaminhamento condicional pro Sentry.

## Compatibilidade

- **Analytics**: nada em `utils/analytics/` foi alterado; Web Vitals só
  adiciona um evento novo (`WEB_VITAL_MEASURED`) reusando `trackEvent`.
- **PWA**: `vite-plugin-pwa`/`sw.js`/manifest não foram tocados. O script
  do Sentry é um recurso externo (CDN), não faz parte do build local nem do
  precache do service worker.
- **SEO**: `Seo`/`buildJsonLd`/sitemap não foram tocados. O fallback do
  `ErrorBoundary` não é uma rota/URL própria — ele substitui o que estava
  na tela no momento do erro, então não precisa de meta tags/indexação
  próprias.
