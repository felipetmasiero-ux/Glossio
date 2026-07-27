# Explore — Documento de Arquitetura

> Documento de design. Nenhum código de produto foi alterado por esta sprint — o objetivo é decidir a forma antes de construir.

## 1. Por que este documento existe

O Glossio hoje é um único modo de aprendizagem (**Learn**): cursos → módulos → lições → exercícios → flashcards, tudo estático e autoral (`src/data/courses`), lido por repositórios burros (`CourseRepository` → `ModuleRepository` → `LessonRepository`) e orquestrado por Context Providers que persistem em `localStorage`.

**Explore** adiciona um segundo modo — aprendizagem por imersão em conteúdo autêntico — sem criar um segundo backend, um segundo sistema de flashcards, ou um segundo dashboard. A regra que guia toda decisão abaixo é: **se já existe, estende-se; não se duplica.**

## 2. O que já existe e será 100% reaproveitado

Antes de desenhar qualquer coisa nova, isto é o que já está pronto e já é agnóstico de "Learn":

| Peça existente | Onde vive | Por que já serve o Explore sem mudança |
|---|---|---|
| `EventProvider` / `useEvents` | `src/contexts/EventProvider.jsx` | `logEvent(type, payload)` é genérico — já aceita qualquer `EVENT_TYPES` e qualquer payload. Nenhum acoplamento a Learn. |
| `FlashcardProvider` | `src/contexts/FlashcardProvider.jsx` | `addFlashcard`/`answerFlashcard` já são agnósticos de origem. O flashcard já tem `moduleId`/`lessonId` **opcionais** (`?? null`) — ou seja, já foi projetado para aceitar flashcards sem lição. |
| `DictionaryRepository` | `src/repositories/DictionaryRepository.js` | Já é indexado só por **idioma + palavra normalizada** (`normalizeWord`), nunca por lição/módulo. Uma palavra é a mesma entidade em Learn e em Explore. |
| `LastActivityProvider` | `src/contexts/LastActivityProvider.jsx` | Guarda um único ponteiro `{ type, ...,  updatedAt }`. Já suporta múltiplos `type` (`"exercise"`, `"flashcards"`) via `DashboardRepository.getContinueLastActivity`. Adicionar `"video"` é extensão, não reforma. |
| `StudyHistoryProvider` / `utils/study/*` | `src/contexts/StudyHistoryProvider.jsx` | Estatísticas de revisão (`getStreak`, `getStudyStats`, `getTodayReviews`) já operam sobre `flashcards`/`studyHistory` puros, sem noção de "de onde veio o card". |
| `DashboardRepository` | `src/utils/dashboard/DashboardRepository.js` | `getDashboardData({ language, completedLessons, flashcards, events, lastActivity })` já é um agregador puro sobre arrays — Explore só precisa **alimentar** esses mesmos arrays, não criar um dashboard paralelo. |

Conclusão prática: **nenhum desses seis módulos precisa de uma versão "Explore".** Eles já são a espinha dorsal compartilhada que o Learn usa hoje — Explore se conecta a ela, não a duplica.

## 3. O que é genuinamente novo

Só três coisas não existem ainda, porque são específicas de conteúdo audiovisual/textual:

1. **Conteúdo estático novo** (`Video`, `Transcript`) — equivalente a `src/data/courses/*` de hoje, mas para vídeos.
2. **Repositórios de leitura novos** (`VideoRepository`, e opcionalmente `TranscriptRepository`) — mesmo padrão burro de `LessonRepository`/`ModuleRepository`: funções puras sobre dados estáticos, sem estado.
3. **Um componente de interação novo** (`Interactive Transcript`) — não existe hoje um "clique na palavra dentro de um texto correndo no tempo".

Tudo o resto é reuso.

---

## 4. Modelo de dados

### 4.1 Video

```
Video
  id            string   // slug único, ex: "en-a1-cafe-order"
  title         string
  language      string   // mesma chave de idioma usada em ModuleRepository/DictionaryRepository ("english" | "portuguese" | "french")
  level         string   // mesma escala de nível já usada em lessons (ex: "A1")
  duration      number   // segundos
  creator       string | null   // atribuição da fonte (autenticidade > produção própria)
  thumbnail     string
  videoUrl      string
  transcript    Transcript   // ver 4.2 — embutida, não referenciada por id
```

**Decisão:** `transcript` fica **embutida** dentro do `Video`, do mesmo jeito que `lesson.blocks` já é embutido em `Lesson` hoje (`normalizeLesson.js`). Não criamos uma tabela/arquivo separado de transcrições referenciado por `transcriptId` — isso só adicionaria um join sem necessidade real, já que um vídeo sempre tem exatamente uma transcrição. `TranscriptRepository`, se existir, é uma fachada fina (`TranscriptRepository.getByVideo(video)`), não um repositório com storage próprio — o mesmo papel que `ModuleRepository.getByLesson` já cumpre para módulos.

### 4.2 Transcript

```
Transcript = TranscriptSegment[]

TranscriptSegment
  startTime   number   // segundos
  endTime     number   // segundos
  text        string   // texto completo da legenda, para exibição/acessibilidade
  tokens      Token[]  // ver 4.3
```

### 4.3 Token — a decisão mais importante do documento

O rascunho original propõe:

```
Token
  word           string
  normalized     string
  dictionaryId   string
  clickable      boolean
  known          boolean
```

**Recomendação: não autorar `dictionaryId`, `clickable` nem `known`.** Eles devem ser **derivados em tempo de renderização**, não escritos à mão em cada palavra de cada legenda de cada vídeo. Motivo:

- Quem for transcrever/anotar vídeos teria que marcar manualmente, palavra por palavra, se ela é clicável e se já é "conhecida" — isso não escala e fica desatualizado no instante em que o usuário salva um novo flashcard (o `known` mudaria sem que o conteúdo estático mudasse).
- Toda a informação para derivar os três campos **já existe** em outro lugar: `DictionaryRepository.hasWord`/`getEntry` (para `clickable`/`dictionaryId`) e `FlashcardProvider.flashcards` (para `known`).

Autoria mínima do Token:

```
Token
  word         string   // forma exata como aparece na legenda ("Café,")
  normalized   string   // normalizeWord(word) — chave de lookup, já existe em src/repositories/normalizeWord.js
```

Derivado em runtime pelo componente que renderiza (não persistido):

```
clickable = DictionaryRepository.hasWord(language, token.normalized)
entry     = DictionaryRepository.getEntry(language, token.normalized)   // substitui "dictionaryId" — sempre fresco
known     = flashcards.some(card =>
              card.language === language &&
              normalizeWord(card.word) === token.normalized
            )
```

Isso também é o que já garante o requisito do briefing — "uma palavra aprendida no Learn é reconhecida automaticamente no Explore" — de graça: `known` não pergunta "essa palavra veio de Explore ou Learn?", pergunta apenas "existe um flashcard com essa palavra normalizada, nesse idioma?". A origem do flashcard é irrelevante por construção.

---

## 5. Fluxo de interação do usuário

```
Assistindo vídeo
  ↓
<video> dispara timeupdate → currentTime
  ↓
Interactive Transcript encontra o TranscriptSegment ativo (startTime ≤ currentTime < endTime)
  ↓
Renderiza os tokens do segmento ativo; cada token clicável é resolvido via DictionaryRepository
  ↓
Usuário clica em um token
  ↓
Popover mostra DictionaryRepository.getEntry(language, token.normalized)
  ↓
Botão "Salvar" → FlashcardProvider.addFlashcard(entry, language)   ← MESMA função que Learn já usa
  ↓
Flashcard entra na mesma fila de revisão SM-2 (scheduleCard) que os flashcards criados em Learn
```

Não existe um "ExploreFlashcardProvider" nem um "ExploreDictionaryRepository" nesse fluxo — o popover de Explore chama exatamente as mesmas funções que a página de lição já chama hoje quando o usuário clica numa palavra do vocabulário (ver `PRODUCT.md`: "AI-assisted click-to-translate vocabulary" já é um pilar declarado do produto, não uma ideia nova — Explore é a expansão desse pilar para vídeo).

### `addFlashcard` — único ajuste necessário

Hoje `createFlashcard`/`normalizeFlashcard` aceitam `moduleId`/`lessonId` opcionais para rastrear origem dentro de Learn. Para Explore, a extensão natural (não uma reforma) é aceitar também `videoId` opcional no mesmo objeto — mesmo padrão, mais uma chave nullable, zero mudança estrutural:

```
createFlashcard({ word, translation, language, moduleId = null, lessonId = null, videoId = null, category = null })
```

---

## 6. Eventos e progresso

### 6.1 Novos `EVENT_TYPES`

O rascunho pede `VIDEO_STARTED`, `VIDEO_FINISHED`, `WORD_CLICKED`, `WORD_SAVED`, `VIDEO_COMPLETED`. Cruzando com o que já existe em `src/constants/events.js`:

```js
export const EVENT_TYPES = {
    WORD_VIEWED: "WORD_VIEWED",
    VOCABULARY_ADDED: "VOCABULARY_ADDED",
    QUIZ_COMPLETED: "QUIZ_COMPLETED",
    LESSON_COMPLETED: "LESSON_COMPLETED",
    FLASHCARD_REVIEWED: "FLASHCARD_REVIEWED",
    EXERCISE_COMPLETED: "EXERCISE_COMPLETED"
};
```

- **`WORD_SAVED` não deve ser um evento novo.** Salvar uma palavra em Explore é literalmente o mesmo `addFlashcard` de sempre, que já loga `VOCABULARY_ADDED`. Criar `WORD_SAVED` seria duplicar o mesmo fato sob dois nomes — a distinção "veio de onde" já é resolvida pelo payload (`videoId` vs `lessonId`), não pelo tipo do evento.
- **`VIDEO_FINISHED` e `VIDEO_COMPLETED` são o mesmo conceito** — o padrão já estabelecido no enum é `<COISA>_COMPLETED` (`LESSON_COMPLETED`, `EXERCISE_COMPLETED`). Ficamos só com `VIDEO_COMPLETED`.
- **`WORD_CLICKED` é genuinamente novo** — não existe hoje um evento de "olhei o significado mas não necessariamente salvei". Vale a pena manter separado de `VOCABULARY_ADDED` porque é um sinal de intenção mais fraco (métrica futura: quais palavras são muito clicadas mas nunca salvas → candidatas a reforço).
- **`VIDEO_STARTED`** é novo e legítimo — não há equivalente em Learn hoje (Learn não loga "abriu a lição", só "completou").

Proposta final de adição a `constants/events.js`:

```js
VIDEO_STARTED: "VIDEO_STARTED",
VIDEO_COMPLETED: "VIDEO_COMPLETED",
WORD_CLICKED: "WORD_CLICKED",
```

(`VOCABULARY_ADDED` já cobre "salvou".)

### 6.2 Progresso "assistido"

Learn tem dois providers de progresso paralelos hoje: `LessonProgressProvider` (lições completadas) e `ExerciseProgressProvider` (lições praticadas). Ambos são o mesmíssimo formato — uma lista de ids + `completeX`/`isXCompleted`. Explore precisa do equivalente para vídeos assistidos.

**Decisão:** criar `ContentProgressProvider` (ou, para não reformar Learn agora, um `VideoProgressProvider` isolado seguindo exatamente o template de `ExerciseProgressProvider`) em vez de tentar unificar os três providers de progresso numa única abstração genérica agora. Unificar os três é uma refatoração legítima e desejável no futuro, mas é ortogonal a entregar Explore — fazer isso agora seria escopo além do necessário para esta sprint de arquitetura. O contrato do novo provider é intencionalmente idêntico ao de `ExerciseProgressProvider`:

```js
loadVideoProgress() / saveVideoProgress(watchedVideoIds)
watchVideo(videoId)
isVideoWatched(videoId)
```

### 6.3 Extensões no `DashboardRepository`

Dois pontos de extensão, ambos aditivos:

```js
// constants/dashboard.js
export const ACTIVITY_EVENT_TYPES = [
    EVENT_TYPES.LESSON_COMPLETED,
    EVENT_TYPES.QUIZ_COMPLETED,
    EVENT_TYPES.EXERCISE_COMPLETED,
    EVENT_TYPES.FLASHCARD_REVIEWED,
    EVENT_TYPES.VIDEO_COMPLETED   // ← novo
];
```

```js
// getContinueLastActivity — mais um case, mesmo formato dos dois que já existem
if (lastActivity.type === "video") {
    return {
        type: "video",
        label: "Continuar assistindo",
        remaining: lastActivity.remaining,   // segundos restantes, por ex.
        href: `/explore/${lastActivity.videoId}`
    };
}
```

Nenhuma outra mudança no `DashboardRepository` é necessária — `getReviewSummary`, `getQuickStats`, `getWordsLearnedCount` etc. já operam sobre `flashcards`/`events` puros e automaticamente passam a contar atividade de Explore assim que ela alimenta os mesmos arrays.

---

## 7. Estrutura de pastas

O rascunho original sugere mover tudo para `src/modules/learn/` e `src/modules/explore/`. **Recomendação: não fazer esse reorg agora.** Mover todo o Learn existente para dentro de `modules/learn/` é uma migração mecânica grande, de alto risco e zero valor imediato — não é isso que desbloqueia o Explore. O que desbloqueia o Explore é só adicionar as pastas novas, ao lado das existentes, seguindo a mesma convenção que `pages/`, `components/`, `utils/`, `repositories/` já usam:

```
src/
  data/
    videos/
      english/index.js       # array de Video (mesmo padrão de data/courses/english.js)
      french/index.js
      portuguese/index.js

  repositories/
    VideoRepository.js        # getAll(language), getById(language, id) — mesmo shape de LessonRepository
    DictionaryRepository.js   # já existe, reaproveitado sem mudança
    normalizeWord.js          # já existe, reaproveitado sem mudança

  contexts/
    VideoProgressProvider.jsx # novo, clone estrutural de ExerciseProgressProvider
    FlashcardProvider.jsx     # já existe, reaproveitado sem mudança
    LastActivityProvider.jsx  # já existe, +1 case de "type"
    EventProvider.jsx         # já existe, reaproveitado sem mudança

  hooks/
    explore/
      useVideoSession.js       # equivalente a useExerciseSession.js: current segment, handlers de progresso
    useVideoProgress.js

  components/
    transcript/
      InteractiveTranscript/   # ver seção 8 — o componente-chave
    video/
      VideoPlayer/

  pages/
    Explore/                   # lista/hub de vídeos, espelha pages/Exercises
    ExploreVideoPage/          # player + transcript, espelha pages/ExerciseSessionPage

  constants/
    events.js                  # +3 tipos (ver 6.1)
    dashboard.js                # +1 ACTIVITY_EVENT_TYPES (ver 6.3)
```

Se algum dia fizer sentido unificar Learn e Explore sob `modules/`, isso vira uma sprint de refatoração dedicada e isolada — não um pré-requisito para o Explore existir.

---

## 8. Componente-chave: Interactive Transcript

Não será implementado nesta sprint — só especificado, porque é o próximo passo depois deste documento.

**Por que ele não deve depender de `<video>`:** o objetivo declarado é reusar o mesmo componente em vídeo, podcast, notícia, artigo e ebook. Nem todo esse conteúdo tem um elemento `<video>`, e nem todo tem um "tempo" real (um artigo não tem `currentTime`). Portanto o contrato do componente não deve assumir um player de vídeo — deve assumir apenas um **driver de posição**, que cada tipo de mídia fornece do seu jeito:

```
<InteractiveTranscript
  segments={transcript}
  activeSegmentIndex={index}   // fornecido por quem envolve o componente
  onTokenClick={(token) => ...}
  knownWords={Set<string>}     // normalized words já em flashcards — calculado uma vez pelo pai, não por token
/>
```

- **Vídeo/podcast:** o pai escuta `timeupdate` do `<video>`/`<audio>` e calcula `activeSegmentIndex` a partir de `currentTime`.
- **Artigo/notícia/ebook:** não há timeline real — o pai pode tratar cada parágrafo como um "segmento" sempre ativo (sem destaque de progressão), ou usar scroll-position como driver. O `InteractiveTranscript` não precisa saber a diferença; ele só recebe `activeSegmentIndex`.

Essa inversão de controle (driver de posição fica de fora, o componente só sabe renderizar segmentos+tokens e emitir cliques) é o que faz o mesmo componente servir vídeo hoje e texto estático amanhã sem reescrita.

---

## 9. Conteúdo "autêntico" além de vídeo

A ideia de expandir de "vídeos com legenda" para "qualquer conteúdo autêntico" é boa, mas **não exige desenhar um schema polimórfico `ContentItem` agora** — isso seria generalizar para tipos de conteúdo que ainda não existem (YAGNI). A generalização real e suficiente já está feita na seção 8: `Transcript`/`Token`/`InteractiveTranscript` não referenciam nenhum campo de `Video` (não sabem o que é `videoUrl` ou `duration`). Isso já é o suficiente para que, quando um podcast ou artigo forem implementados de fato, cada um ganhe seu próprio tipo fino (`Podcast`, `Article`) que carrega sua própria `transcript`/`tokens` e reusa o mesmo componente de renderização — sem que `Video` precise virar uma superclasse abstrata hoje.

---

## 10. O que será persistido no backend (futuro)

Hoje o projeto inteiro roda sem backend (`localStorage`, ver `PRODUCT.md` § Capabilities and Constraints) — Explore não muda essa postura. Quando um backend existir, a divisão natural (mesma que já vale para Learn) é:

- **Conteúdo autoral, versionado com o app** (não muda por usuário): `Video`/`Transcript` — hoje `src/data/videos/*`, no futuro provavelmente uma tabela/CMS espelhando o mesmo formato, do mesmo jeito que `src/data/courses/*` migraria para uma tabela de cursos.
- **Estado do usuário** (já no formato certo para sincronizar): `flashcards`, `events`, `studyHistory`, progresso (`completedLessons`, `practicedLessons`, futuramente `watchedVideos`), `lastActivity` — todos já são arrays/objetos serializáveis por usuário, já isolados por provider, já com uma função `load*`/`save*` que hoje aponta para `localStorage` e no futuro aponta para uma API sem mudar a superfície que os componentes consomem.

Nenhum dado novo de Explore quebra esse contrato — `watchedVideos` é estruturalmente idêntico a `practicedLessons`, e os flashcards/eventos de Explore são linhas a mais nas mesmas tabelas que já existem para Learn.

---

## 11. Checklist de coerência (voltando ao objetivo original)

| Garantia pedida | Como é cumprida | Por construção ou por trabalho extra? |
|---|---|---|
| Palavra aprendida no Learn é reconhecida no Explore | `known` é derivado por `(language, normalizeWord(word))` batendo contra `flashcards`, nunca por origem | **Por construção** (seção 4.3) |
| Flashcards compartilhados | Mesmo `FlashcardProvider`, mesmo `addFlashcard`, `videoId` é só mais um campo opcional | **Por construção** (seção 5) |
| Estatísticas compartilhadas | `StudyHistoryProvider`/`utils/study/*` já operam sobre cards puros, agnósticos de origem | **Por construção** (seção 2) |
| Dashboard compartilhado | `DashboardRepository.getDashboardData` já é um agregador puro sobre arrays; só ganha mais eventos/flashcards entrando nesses arrays | **Por construção**, + 2 extensões pontuais (seção 6.3) |

---

## 12. Resumo do que precisa ser criado (quando a implementação começar)

Novo, de verdade:
- `src/data/videos/<language>/index.js` (conteúdo estático)
- `VideoRepository.js`
- `VideoProgressProvider.jsx` (clone de `ExerciseProgressProvider`)
- `useVideoSession.js` (clone conceitual de `useExerciseSession.js`)
- `InteractiveTranscript` (componente-chave, próxima sprint)
- `VideoPlayer`, `pages/Explore`, `pages/ExploreVideoPage`
- 3 entradas em `EVENT_TYPES`, 1 entrada em `ACTIVITY_EVENT_TYPES`, 1 case em `getContinueLastActivity`, 1 campo opcional (`videoId`) em `createFlashcard`/`normalizeFlashcard`

Reaproveitado sem nenhuma mudança:
- `DictionaryRepository`, `normalizeWord`, `FlashcardProvider`, `EventProvider`, `StudyHistoryProvider`, `DashboardRepository` (quase inteiro), `LastActivityProvider` (estrutura inalterada, só +1 `type`)
