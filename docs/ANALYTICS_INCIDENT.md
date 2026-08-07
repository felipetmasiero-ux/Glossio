# Incidente: nenhum hit chegava ao GA4 — causa raiz e correção

## Sintomas observados

- `https://www.googletagmanager.com/gtag/js?id=G-TMYLR491T1` carregava normalmente (200 OK).
- `window.dataLayer` existia e recebia os comandos (`app_open`, `page_view`, `landing_scroll_depth` apareciam nele).
- `initAnalytics()` rodava sem erro.
- `fetch` manual para `https://www.google-analytics.com/g/collect` retornava 204.
- A CSP não bloqueava `google-analytics.com`.
- Measurement ID, propriedade GA4 e variável de ambiente estavam corretos.
- **Porém**: nenhum hit automático era enviado, `document.cookie` nunca ganhava `_ga`, e `typeof window.gtag` era `"undefined"`.

## Causa raiz

`src/utils/analytics/gtag.js` nunca definia `window.gtag`. `pushToDataLayer`
empurrava os comandos direto para `window.dataLayer.push(args)`, pulando
`window.gtag` inteiramente:

```js
// ANTES
export function pushToDataLayer(...args) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
}
```

O snippet oficial do Google (https://developers.google.com/tag-platform/gtagjs/install) é:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

A diferença não é estética. `window.gtag` **não é algo que o script remoto
cria** — é o contrário: é o ponto de integração que o *próprio site* precisa
criar primeiro, de forma síncrona, antes (ou independente de quando) o
script remoto termina de carregar. O trabalho do script remoto, uma vez
carregado (ele é `async`, então isso pode levar de alguns milissegundos a
alguns segundos), é:

1. Encontrar o `window.gtag` que o site já criou.
2. Substituir a implementação dele pela implementação real — a parte que
   de fato abre uma conexão, envia o hit e grava o cookie `_ga`.
3. Reprocessar (fazer replay de) tudo que já tinha sido enfileirado em
   `dataLayer` enquanto o script ainda estava carregando.

Sem `window.gtag` existir primeiro, o script remoto não tem a que se
"agarrar" — ele carrega, mas nunca ativa. Empurrar arrays crus direto pra
`dataLayer` (pulando `window.gtag`) parece funcionar, porque o array
realmente enche exatamente como o esperado — mas não há absolutamente
nada do outro lado ouvindo esse array.

## Por que cada sintoma acontecia exatamente assim

1. **`window.dataLayer` existia e enchia** — `pushToDataLayer` criava e
   populava o array manualmente, sem depender de nada do Google. Isso
   nunca dependeu do script remoto ter carregado ou não.
2. **`typeof window.gtag === "undefined"`** — porque, de fato, nada no
   projeto nunca definia essa função. O script remoto também não a cria
   "do nada" — ele só sabe *assumir* uma função `gtag` que já exista.
3. **Nenhum hit era enviado, nenhum `_ga` era criado** — a lógica real de
   envio (a que efetivamente faz `fetch`/`sendBeacon` pro endpoint de
   collect e grava o cookie) só é ativada quando o script remoto consegue
   tomar posse de `window.gtag`. Como isso nunca aconteceu, o script ficou
   carregado só que **inerte** — puro JavaScript parado, sem nunca
   processar o que estava (e continuava se acumulando) em `dataLayer`.
4. **O `fetch` manual pro endpoint de collect retornava 204** — isso só
   prova que a conectividade, o Measurement ID e a CSP estavam corretos
   (o que o time já tinha confirmado). Não prova nada sobre se o SDK do
   gtag.js em si estava ativo — são duas coisas completamente
   independentes, e é exatamente por isso que esse teste manual passava
   enquanto o app real continuava silencioso.
5. **`initAnalytics()` "rodava sem erro"** — porque não havia nenhum erro
   pra rodar: `pushToDataLayer` é uma função simples que só mexe num
   array; ela nunca tinha motivo pra lançar exceção. O bug não era um
   crash, era a ausência de um efeito colateral que deveria ter
   acontecido (o script remoto se conectar ao próprio `dataLayer`).

Havia inclusive uma pista enganosa já no código: um comentário em
`initAnalytics.js` especulava que a causa desse mesmo sintoma
("dataLayer enche, mas nenhum hit sai, nenhum `_ga` é criado") seria o
Consent Mode do GA4 reter `analytics_storage` por padrão — daí o
`pushToDataLayer("consent", "default", {...})` já existente. Essa é uma
salvaguarda real e independente (mantida na correção), mas não era a causa
deste incidente: mesmo com o consentimento concedido, sem `window.gtag`
existir não há absolutamente nada rodando para consultar esse
consentimento.

## A correção

`gtag.js` agora segue o bootstrap oficial ao pé da letra —
`window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); }`
— criado antes de qualquer comando ser enfileirado, e **todo** comando
(`consent`, `js`, `config`, `event`) passa a ser enviado através de
`window.gtag(...)`, nunca mais via `dataLayer.push` direto:

```js
function ensureGtagBootstrap() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments);
    };
}

export function loadGtagScript(measurementId) {
    ensureGtagBootstrap();
    // ... injeta o <script async> (inalterado) ...
}

export function pushToDataLayer(...args) {
    ensureGtagBootstrap();
    window.gtag(...args);
}
```

`ensureGtagBootstrap()` é chamada tanto em `loadGtagScript` quanto em
`pushToDataLayer`, e é idempotente (`window.gtag || ...`) — não importa
qual dos dois roda primeiro, e uma vez que o script remoto de verdade
substitua `window.gtag` pela implementação real, nosso código nunca mais
sobrescreve essa referência.

## Por que isso resolve definitivamente

Com essa mudança, o comportamento do app passa a ser estruturalmente
idêntico ao snippet oficial: `window.gtag` existe de forma síncrona antes
de qualquer comando ser enfileirado, cada comando passa por ele (não por
um atalho pro array), e o script remoto — quando terminar de carregar,
independente de quanto tempo isso leve — encontra exatamente o que espera
encontrar e assume o controle normalmente. Não é um workaround em cima do
sintoma (como seria, por exemplo, forçar manualmente um `fetch` pro
endpoint de collect) — é a implementação do contrato real que o gtag.js
depende para funcionar.

## Escopo da correção

Only `src/utils/analytics/gtag.js` mudou de fato (mais um comentário
corrigido em `initAnalytics.js`, sem mudança de comportamento). Revisão
completa do resto da camada de analytics, sem achados:

- **`config.js`** — getters de env puros, sem problema.
- **`initAnalytics.js`** — ordem de inicialização já estava correta
  (carrega o script, depois enfileira `consent`/`js`/`config`, tudo
  síncrono, exatamente como o snippet oficial faz com as duas tags de
  script). Nenhuma mudança de comportamento.
- **`trackEvent.js`** / **`trackPageView.js`** — só chamam
  `pushToDataLayer`, nunca tocam `window.gtag`/`dataLayer` diretamente.
  Nenhuma mudança necessária.
- **`AnalyticsRouteTracker.jsx`** — chama `initAnalytics()` e
  `trackEvent(APP_OPEN)` na mesma ordem, no mesmo efeito; `trackPageView`
  num efeito separado, reagindo à rota. Nenhum problema de ordem/corrida
  encontrado.

A API pública de todos os módulos permanece exatamente igual —
`loadGtagScript(measurementId)`, `pushToDataLayer(...args)`,
`initAnalytics()`, `trackEvent(name, params)`, `trackPageView(path)` têm a
mesma assinatura de antes. Nenhum teste existente precisou mudar (todos
mockam `./gtag` inteiro); `gtag.test.js` é novo, cobrindo especificamente
o bootstrap que faltava.
