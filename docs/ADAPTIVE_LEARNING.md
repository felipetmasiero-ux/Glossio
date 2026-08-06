# Aprendizado Adaptativo — Glossio

Como o Glossio decide o que recomendar na seção "Recomendado para você" do
dashboard, e como adicionar um novo tipo de recomendação sem tocar no que já
existe.

## Por que isso existe

O dashboard já tinha `getNextStep` (`src/utils/dashboard/getNextStep.js`) — um
único CTA priorizado ("o que fazer agora"), usado pelo `PrimaryActionCard`.
Isso continua exatamente como estava. O Aprendizado Adaptativo é um mecanismo
diferente e complementar: uma **lista** curta e priorizada de sugestões, cada
uma com um motivo explícito ("Você acertou apenas 45% nesta lição."), montada
sobre dados que o app já coleta — nenhum dado novo é persistido.

Também existe uma pasta `src/utils/recommendations/` mais antiga, que resolve
outra coisa (conteúdo relacionado por tópico, para vídeos/lições — veja
`getRelatedContent.js`). O código novo mora em `src/utils/adaptiveLearning/`
para não colidir com esse conceito diferente.

## Arquitetura

```
src/constants/adaptiveLearning.js        thresholds e tipos, num só lugar
src/hooks/useStudyHistory.js             hook faltante, mesmo padrão de useLessonProgress etc.

src/utils/adaptiveLearning/
 ├─ getLessonAccuracy.js                 helper: taxa de acerto por lição (a partir de eventos)
 ├─ getGenericRecommendations.js         fallback para quando não há dados suficientes
 ├─ generateRecommendations.js           orquestrador: roda os geradores, ordena, corta
 ├─ RecommendationEngine.js              fachada pública ({ generate })
 ├─ index.js                             barrel
 └─ generators/
     ├─ recommendWeakLessons.js          lições com taxa de acerto baixa
     ├─ recommendWeakTopics.js           tópicos que aparecem com frequência nos erros
     ├─ recommendOverdueFlashcards.js    flashcards atrasados na repetição espaçada
     ├─ recommendPendingFlashcards.js    flashcards nunca revisados
     ├─ recommendDifficultFlashcards.js  flashcards com histórico ruim (ease factor baixo)
     └─ recommendContinueModule.js       módulo em andamento (reaproveita getContinueLearning)

src/components/home/RecommendedForYouCard/   card que renderiza a lista no dashboard
```

Cada **gerador** é uma função pura: recebe um objeto com os dados já
carregados pelo dashboard (`language`, `completedLessons`, `flashcards`,
`studyHistory`, `events`) e devolve um array de recomendações (zero, uma, ou
mais). Isso segue o mesmo padrão já usado em
`src/utils/exercises/generators/*.js` — cada gerador não sabe nada sobre os
outros.

Cada recomendação tem este formato:

```js
{
    id: "weak-lesson-english-a1-greetings",
    type: "review-lesson",       // ver RECOMMENDATION_TYPES
    priority: 1,                 // menor = mais urgente
    title: "Revisar: Greetings",
    reason: "Você acertou apenas 45% nesta lição.",
    href: "/lessons/english-a1-greetings",
    icon: "book"                 // nome de ícone existente em components/common/Icon
}
```

O **orquestrador** (`generateRecommendations.js`) roda todos os geradores,
junta o resultado (`flatMap`), ordena por `priority` crescente, e corta em
`MAX_RECOMMENDATIONS` (6). Se a lista final vier vazia — usuário muito novo,
ou sem dados suficientes em nenhum critério — cai no fallback
`getGenericRecommendations` (sugere a próxima lição do curso e, se ainda não
fez, o teste de nivelamento).

**Não existe `RecommendationRepository`.** Nada aqui é persistido: toda
recomendação é recalculada a cada render, a partir de dados que os
providers já existentes (`EventProvider`, `FlashcardProvider`,
`LessonProgressProvider`, `StudyHistoryProvider`) já guardam. Criar um
repositório implicaria ter algo para ler/escrever em storage, o que não é o
caso — `RecommendationEngine` (fachada com um único método `generate`) já é
suficiente.

## De onde vêm os dados (sem duplicação)

Nenhum dos critérios abaixo introduz um novo lugar para guardar progresso —
tudo é derivado, na hora, dos dados que o dashboard já carrega:

| Dado | Fonte |
|---|---|
| Taxa de acerto por lição/tópico | Eventos `QUIZ_COMPLETED`/`EXERCISE_COMPLETED` (`EventProvider`), via `getLessonAccuracy.js` |
| Flashcards atrasados/difíceis/pendentes | `flashcards` (`FlashcardProvider`) — campos de SM-2 já existentes: `nextReview`, `lastReviewedAt`, `easeFactor` |
| Histórico de revisão de um flashcard | `studyHistory` (`StudyHistoryProvider`) |
| Módulo em andamento | `completedLessons` (`LessonProgressProvider`), via o já existente `getContinueLearning` |
| Idioma de uma lição/módulo, sem precisar de campo extra | `getLanguageFromId(id)` — o próprio id já carrega o idioma (`"english-a1-greetings"`) |

## Critérios usados por recomendação

Todos os limiares abaixo estão centralizados em `src/constants/adaptiveLearning.js`.

- **Lição fraca** (`recommendWeakLessons`) — lições com pelo menos
  `MIN_ATTEMPTS_FOR_LESSON_ACCURACY` (3) tentativas e taxa de acerto abaixo de
  `LOW_ACCURACY_THRESHOLD` (70%). Prioridade 1 se abaixo de
  `CRITICAL_ACCURACY_THRESHOLD` (50%), senão 3. Limitado a
  `MAX_WEAK_LESSONS` (2) lições, as piores primeiro.
- **Tópico fraco** (`recommendWeakTopics`) — tópico (via
  `LessonRepository.getById(...).topic`) com pelo menos
  `MIN_MISTAKES_FOR_TOPIC` (3) respostas erradas somando todas as lições.
  Prioridade 2, aponta para `/my-flashcards`.
- **Flashcards atrasados** (`recommendOverdueFlashcards`) — cartão já
  revisado ao menos uma vez cujo `nextReview` está `OVERDUE_REVIEW_DAYS` (3)
  dias ou mais no passado. Prioridade 1 se atraso ≥ 7 dias, senão 2.
- **Flashcards pendentes** (`recommendPendingFlashcards`) — cartões com
  `lastReviewedAt === null` (nunca revisados). Prioridade 4.
- **Flashcards difíceis** (`recommendDifficultFlashcards`) — cartão com
  `easeFactor` abaixo de `DIFFICULT_CARD_EASE_FACTOR_THRESHOLD` (2.0) e pelo
  menos `MIN_REVIEWS_FOR_DIFFICULT_CARD` (2) revisões de baixa qualidade no
  `studyHistory`. Prioridade 2.
- **Continuar módulo** (`recommendContinueModule`) — reaproveita
  `getContinueLearning`; só gera recomendação quando há um módulo
  `in-progress`. Prioridade 5.
- **Genéricas** (`getGenericRecommendations`, fallback) — próxima lição do
  curso (prioridade 5) e teste de nivelamento se ainda não foi feito
  (prioridade 6).

Prioridade menor aparece primeiro na lista final; o corte em 6 itens acontece
depois da ordenação, então os mais urgentes nunca são cortados por causa de
um tipo de recomendação "barulhento".

## Como adicionar um novo tipo de recomendação

1. Crie `src/utils/adaptiveLearning/generators/recommendXyz.js`, exportando
   uma função `(input) => Recomendacao[]` — sem nenhuma dependência dos
   outros geradores.
2. Se precisar de um limiar novo, adicione a constante em
   `src/constants/adaptiveLearning.js` (e, se for um tipo novo de
   verdade, uma entrada em `RECOMMENDATION_TYPES`).
3. Registre a função no array `GENERATORS` em
   `src/utils/adaptiveLearning/generateRecommendations.js`.
4. Escreva o teste do gerador (`recommendXyz.test.js`), cobrindo: caso com
   dado suficiente, caso sem dado suficiente (array vazio), e
   compatibilidade com usuário novo (inputs vazios/undefined não devem
   lançar erro).
5. Pronto — não é preciso mudar `RecommendationEngine`,
   `RecommendedForYouCard` nem nenhum gerador existente. O orquestrador já
   ordena por `priority` e aplica o corte de `MAX_RECOMMENDATIONS`
   automaticamente.

## Testes

- `getLessonAccuracy.test.js`, um teste por gerador, `getGenericRecommendations.test.js` —
  cobrem o cálculo de cada critério isoladamente.
- `generateRecommendations.test.js` — orquestração: ordenação por
  prioridade, corte em `MAX_RECOMMENDATIONS`, todo item tem `reason` não
  vazio, compatibilidade com usuário novo (sem progresso/flashcards/eventos),
  fallback genérico quando não há curso para o idioma pedido.
- `RecommendationEngine.test.js` — smoke test confirmando que `.generate`
  delega corretamente.
- `useDashboardData.test.jsx` — confirma que `recommendations` aparece no
  retorno do hook e é compatível com um usuário totalmente novo.
- `RecommendedForYouCard.test.jsx` — não renderiza nada com lista vazia,
  renderiza título/motivo/link de cada recomendação.
