# Landing de Alta Conversão — Glossio

Como a landing (`/`) foi estruturada e como estender ou trocar qualquer
parte dela sem reintroduzir os problemas que a versão anterior tinha
(rasa, sem prova de UI real, um único ponto de conversão mensurável).

## Estrutura

`src/pages/Landing/Landing.jsx` é só o orquestrador: importa cada seção de
`src/components/landing/<Nome>/`, decide a ordem, alterna o tom de fundo
(`surface`/`background`, calculado por ordem de renderização — não
hardcoded, então continua correto mesmo se uma seção some condicionalmente)
e centraliza os dois pontos de instrumentação (`handleCtaClick`,
`handleFaqOpen`). Cada seção abaixo do hero é passada como `children` de
`LandingSection` (`src/components/landing/LandingSection`), o equivalente
do `DashboardSection` (`src/components/home/DashboardSection`) usado no
dashboard — eyebrow + título + subtítulo opcional + tom de fundo.

O hero (`HeroSection`) é a exceção: layout próprio, não passa pelo
`LandingSection` (não tem o padrão eyebrow/título/tom que o resto da página
segue).

## Por que não há screenshots de verdade

Não havia ferramenta de captura de tela/browser disponível para gerar
screenshots fotográficos reais do app rodando. Em vez de um ícone genérico
de banco de imagens, `ProductPreviewSection` +
`src/components/landing/DeviceFrameMockup` recriam 3 telas reais
(lição, flashcard, dashboard) reaproveitando as classes/tokens de verdade
do design system (`.paper-ruled`, `.clickable-word--flash`, `.card--notch`)
— é a UI real, só que estática. Quando houver uma forma de gerar
screenshots reais, é só substituir o conteúdo de cada
`<DeviceFrameMockup>` por uma `<img>`; a legenda/estrutura acessível não
muda.

## Depoimentos

`TestimonialsSection` recebe `testimonials` e não renderiza nada se a lista
estiver vazia (`Landing.jsx` também pula a seção inteira, incluindo o
título, nesse caso) — não existe nenhum depoimento real ainda, e inventar
nome/citação seria conteúdo fabricado numa página cujo objetivo é gerar
confiança. Para publicar depoimentos reais: preencher o array
`TESTIMONIALS` em `Landing.jsx` com objetos `{ id, quote, name, context }`.

## Analytics (GA4)

Três eventos novos em `src/utils/analytics/analyticsEvents.js`, disparados
via `trackEvent` (`src/utils/analytics`) só a partir de `Landing.jsx` — as
seções filhas só chamam a prop/callback que recebem, nunca importam
`trackEvent` diretamente:

- `landing_cta_clicked` — `{ cta: "comecar_agora" | "criar_conta", location: "hero" | "final_cta" }`, disparado em `handleCtaClick` antes de navegar.
- `landing_scroll_depth` — `{ depth: 25 | 50 | 75 | 100 }`, disparado uma vez por marco por visita via `useScrollDepthTracking` (`src/hooks/useScrollDepthTracking.js`), que usa `IntersectionObserver` em 4 seções reais da página (não uma medição de % de altura de documento).
- `landing_faq_opened` — `{ question }`, disparado só ao abrir um item do FAQ (`FaqSection`), nunca ao fechar.

## Como adicionar uma seção nova

1. Criar `src/components/landing/<Nome>Section/<Nome>Section.jsx` (+ `.css`
   + `.test.jsx`) — componente de conteúdo puro, sem se preocupar com
   eyebrow/título/tom de fundo.
2. Em `Landing.jsx`, envolver com `<LandingSection eyebrow=... title=...
   tone={nextTone()}>` na posição desejada. Se a seção precisar ser um
   marco de scroll depth, passar também `sectionRef`.
3. Se a seção tiver um CTA que deve ser medido, passar um callback (não
   `trackEvent` direto) e disparar o evento em `Landing.jsx`, seguindo o
   padrão de `handleCtaClick`/`handleFaqOpen`.

## FAQ e SEO

As perguntas do FAQ vivem em `src/constants/landingFaqs.js` — única fonte,
usada tanto pelo accordion visível (`FaqSection`) quanto pelo JSON-LD
`FAQPage` (`buildFaqSchema`, `src/utils/seo/buildJsonLd.js`, combinado em
`Landing.jsx` via `combineSchemas`). Isso evita que os dados estruturados
fiquem desalinhados do que a página realmente mostra.
