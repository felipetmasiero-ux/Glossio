# Learning Journey — Documento de Arquitetura

> Documento de design. Nenhuma interface foi implementada por esta sprint. Complementa [`EXPLORE_ARCHITECTURE.md`](EXPLORE_ARCHITECTURE.md) — aquele documento definiu *o que* é o Explore; este define *como* Learn, Explore e Review se encaixam em uma única jornada.

## 0. Sobre a observação estratégica

Concordo com o diagnóstico, e ele tem uma consequência prática direta neste documento: até aqui, cada pilar (`Learn`, `Explore`) foi desenhado para **não duplicar infraestrutura** (mesmo `FlashcardProvider`, mesmo `DictionaryRepository`, mesmo `DashboardRepository`). Isso resolve o problema técnico de duplicação, mas não resolve sozinho o problema de **produto**: hoje, tecnicamente integrado não é o mesmo que *vivido como uma jornada única* pelo usuário. `Home.jsx` hoje é uma lista de cards independentes (Hero, Continue Learning, Daily Goal, Reviews, Courses, Quick Stats, Achievement, Resume Activity) — cada um correto isoladamente, nenhum deles decide "e agora, o quê?". Esse é exatamente o gap que as seções 3 e 7 fecham: introduzir uma decisão única (`nextStep`) e estados de Home nomeados, para que a experiência pare de ser "uma tela com vários widgets" e passe a ser "o app me diz o próximo passo certo".

---

## 1. A jornada do usuário novo (primeiro acesso → primeiro módulo concluído)

Passo a passo, ancorado nas rotas e componentes que já existem hoje:

1. **`/`** (`LanguageSelection`) — usuário escolhe idioma. `setLanguage` grava em `localStorage` (`App.jsx`). Não há conta, não há mais nenhuma decisão nesse passo.
2. **`/home`** — primeira visita. Todo estado do dashboard está vazio (`completedLessons: []`, `flashcards: []`, `events: []`, `lastActivity: null`). Concretamente, com os dados de hoje:
   - `HeroCard` — saudação + bandeira do idioma. Sempre renderiza, não depende de progresso.
   - `ContinueLearningCard` — `getContinueLearning` já resolve isso sem nenhum estado especial de "novo usuário": como `completedLessons` está vazio, `nextLesson` é a primeira lição do primeiro módulo (`greetingsLesson`, `order: 1`). O card já aponta direto para `/lessons/english-a1-greetings`. **Não precisa de um "modo onboarding" separado** — o mesmo código que serve um usuário no meio do curso já serve o primeiro acesso corretamente.
   - `ReviewsCard` — `hasReviews: false` → estado "Tudo em dia!" (não existem flashcards ainda).
   - `AchievementCard` — estado vazio ("Complete um módulo para desbloquear sua primeira conquista").
   - `ResumeActivityCard` — não renderiza (`lastActivity` é `null`).
3. Usuário clica **Continuar** → `/lessons/english-a1-greetings` (`LessonPage`). A lição renderiza seus blocos (`heading`, `dialogue`, `vocabulary`, `quiz`, etc. via `src/components/lessons/blocks/index.js`).
4. Dentro da lição, ao clicar numa palavra do vocabulário (`VocabularyCard` → `useWordPopup.openWord`), o sistema:
   - loga `WORD_VIEWED` (`useWordPopup.js:53`);
   - abre `WordPopup`, que oferece **Adicionar** → `addFlashcard(word, language)` (`WordPopup.jsx:29`), já carregando `lessonId`/`moduleId`/`category` (`useWordPopup.js:20-34`).
   - Esse é o primeiro flashcard do usuário. A partir daqui, `reviews.hasReviews` eventualmente vira `true` quando o SM-2 (`scheduleCard`) marcar a próxima revisão como vencida.
5. Usuário completa a lição → (fluxo existente, fora do escopo deste documento) `LessonProgressProvider.completeLesson(lessonId)` loga `LESSON_COMPLETED`.
6. Usuário é direcionado aos exercícios da lição (`/exercises/english-a1-greetings`) → ao terminar (`finished` em `useExerciseSession`), `practiceLesson(lesson.id)` é chamado (`useExerciseSession.js:83-87`), marcando a lição como praticada em `ExerciseProgressProvider`.
7. Passos 3–6 se repetem para as 12 lições de `englishA1Module` (`greetings → introductions → countries → numbers → daysMonths → family → jobs → presentSimple → dailyRoutine → food → restaurant → review`).
8. Ao completar a última lição (`reviewLesson`), `ModuleRepository.isLastLessonInModule` retorna `true`. Na próxima visita à Home:
   - `getRecentAchievement` encontra o evento `LESSON_COMPLETED` dessa lição e retorna `"Módulo concluído: English A1"` (`getRecentAchievement.js:20-27`) → `AchievementCard` sai do estado vazio.
   - `getContinueLearning` não encontra mais `nextLesson` → `status: "finished"` → `ContinueLearningCard` mostra "Você concluiu todo o conteúdo disponível!" (correto hoje, porque só existe um módulo por idioma; ver seção 7, estado "Concluiu um módulo/nível").

**Fim da jornada de onboarding = módulo A1 completo.** O importante a registrar: **nenhum passo acima exige um "modo onboarding" especial** — o dashboard e as páginas já são corretas por construção para `completedLessons: []`. O que falta (seção 3) é uma camada de **priorização explícita** por cima desses mesmos dados, e não um fluxo paralelo.

---

## 2. Como Learn e Explore conversam

Hoje, a única ponte entre os dois mundos é a que o `EXPLORE_ARCHITECTURE.md` já garante por construção: uma palavra vira flashcard do mesmo jeito não importa se veio de `WordPopup` (Learn) ou do popover do `InteractiveTranscript` (Explore), porque ambos chamam `addFlashcard` e ambos resolvem a palavra via o mesmo `DictionaryRepository`. Isso resolve "palavras aprendidas aparecem nos dois modos" — mas não resolve **recomendação de conteúdo cruzado** ("terminar uma lição recomenda vídeos relacionados"), que exige uma coisa que não existe ainda: **um vocabulário de tópicos compartilhado entre lição e vídeo.**

### 2.1 O elo que falta: `topic`

Hoje `lesson.category` (`src/data/lessons/english/a1/*.js`) é grosso demais para recomendação — `"Basics"` agrupa `greetings`, `family`, `numbers`, `jobs` e `countries`, que são temas completamente diferentes para fins de recomendação de vídeo. O que já existe, sem estar formalizado como dado, é que **o título de cada lição já é um tópico** (`Food`, `Family`, `Restaurant`, `Jobs`, `Countries`...).

Proposta: adicionar um campo `topic` (slug, ex: `"food"`, `"family"`, `"restaurant"`) — distinto de `category` — em três lugares que hoje não conversam entre si:

| Entidade | Campo novo | Custo de backfill |
|---|---|---|
| `Lesson` (`src/data/lessons/**/*.js`) | `topic: "food"` | 1 campo por lição já existente (12 hoje) — geralmente igual ao slug do título |
| `Video` (schema definido em `EXPLORE_ARCHITECTURE.md` §4.1) | `topic: "food"` | autoral, no momento de cadastrar cada vídeo |
| Entrada de `DictionaryRepository` (`src/data/dictionary/**/*.js`) | `topic: "food"` (opcional) | ver seção 5 — mesma taxonomia, reusada para Collections |

Esse `topic` é a **mesma taxonomia** usada em três lugares (lição, vídeo, palavra) — não são três sistemas de categorização, é um enum compartilhado. Isso é o que faz "lição de Food recomenda vídeo de Food" e "vídeo de Food agrupa a palavra 'bread' na Collection Food" serem o mesmo mecanismo visto de dois ângulos, em vez de duas features separadas.

### 2.2 As três direções de conversa

```
Lição concluída  →  vídeos relacionados     (mesmo language + mesmo topic, não assistidos)
Vídeo concluído  →  lições relacionadas     (mesmo language + mesmo topic, não concluídas)
Palavra aprendida → aparece nos dois modos  (já garantido por construção, ver EXPLORE_ARCHITECTURE.md §4.3 e §11)
```

As duas primeiras são **a mesma função, com os papéis invertidos** — ver seção 4 (`getRelatedContent`), para não implementar duas funções redundantes.

### 2.3 Onde essa conversa aparece na UI (sem implementar agora)

- Ao final de uma lição (tela de conclusão, hoje inexistente como tela dedicada — ver `ModuleCompletePage` para o equivalente de módulo): seção "Pratique isso em contexto" com 1–2 vídeos do mesmo `topic`.
- Ao final de um vídeo (`ExploreVideoPage`, quando existir): seção "Aprenda a gramática por trás" com 1–2 lições do mesmo `topic`.
- Na Home, quando aplicável, como parte do `nextStep` (seção 3) — não como uma seção nova e independente, para não competir com o próprio `nextStep` por atenção.

---

## 3. Como o Dashboard decide o próximo passo

Hoje `DashboardRepository.getDashboardData` retorna **vários fatos** (`continueLearning`, `reviews`, `lastActivity`, ...) e a Home simplesmente renderiza um card para cada um, sempre, na mesma ordem visual fixa. Isso funciona como "central de informação", mas não responde "o que eu devo fazer agora" — dois cards (`ContinueLearningCard` e `ResumeActivityCard`) podem inclusive sugerir ações concorrentes ao mesmo tempo.

**Proposta:** um campo novo, computado, `nextStep`, adicionado ao objeto que `getDashboardData` já retorna (mesma função, mesmo formato de fatos que ela já agrega — não é um sistema paralelo). `nextStep` segue a mesma forma que `getContinueLastActivity` já usa (`{ type, label, href, meta }`), só que decide **entre** as fontes já existentes em vez de dentro de uma só.

### 3.1 Ordem de prioridade

1. **Revisões vencidas** (`reviews.hasReviews === true`) — sempre primeiro. Esquecer uma revisão tem custo (o SM-2 penaliza o intervalo); esperar o usuário lembrar sozinho vai contra o próprio mecanismo de espaçamento que o app promete.
2. **Continuar a última atividade em andamento** (`lastActivity !== null`, isto é, exercício ou vídeo com progresso salvo mas não finalizado) — trabalho começado e não terminado tem prioridade sobre trabalho novo.
3. **Continuar a última lição** (`continueLearning.status === "in-progress"`) — o caminho estruturado padrão.
4. **Recomendar Explore** (via `getRelatedContent`, seção 2.3) — só quando não há revisão pendente, nem atividade em aberto, nem lição pendente óbvia (ex: o usuário acabou de terminar uma lição/módulo e ainda não voltou a estudar).
5. **Sugerir novo módulo/nível** (`continueLearning.status === "finished"`, via `getNextLevel`) — último degrau, quando o conteúdo estruturado atual acabou.

```js
function getNextStep({ reviews, lastActivity, continueLearning, relatedContent, nextLevel }) {

    if (reviews.hasReviews) {
        return { type: "review", label: "Revisar agora", href: "/flashcards", priority: 1 };
    }

    if (lastActivity) {
        return { type: lastActivity.type, label: lastActivity.label, href: lastActivity.href, priority: 2 };
    }

    if (continueLearning.status === "in-progress") {
        return { type: "lesson", label: "Continuar lição", href: continueLearning.href, priority: 3 };
    }

    if (relatedContent) {
        return { type: "explore", label: "Explorar conteúdo relacionado", href: relatedContent.href, priority: 4 };
    }

    if (continueLearning.status === "finished") {
        return { type: "next-level", label: nextLevel ? `Começar nível ${nextLevel}` : "Revisar módulos concluídos", href: "/lessons", priority: 5 };
    }

    return null;

}
```

### 3.2 O que muda na Home, o que não muda

`nextStep` **não substitui** os outros cards — `DailyGoalCard`, `QuickStatsCard`, `CourseCard`, `AchievementCard` continuam existindo como painel de contexto/progresso. O que muda é que existe agora **um** slot de destaque (mesma posição do `HeroCard`/`ContinueLearningCard` hoje) que resolve a pergunta "o que fazer agora", e `ResumeActivityCard`/`ContinueLearningCard`/`ReviewsCard` deixam de competir entre si por serem a "ação principal" — eles continuam existindo, mas como confirmação secundária do que `nextStep` já decidiu, não como três sugestões paralelas.

---

## 4. Como o sistema recomenda conteúdo (sem IA)

Toda recomendação usa apenas os sinais que já existem como dado estruturado: `language`, `level`/`topic`, palavras aprendidas (`flashcards`), módulos concluídos (`completedLessons`), vídeos assistidos (`watchedVideos`, seção correspondente do `EXPLORE_ARCHITECTURE.md` §6.2).

### 4.1 `getRelatedContent` — a mesma função nos dois sentidos

```js
function getRelatedContent({ source, candidates, language, completedIds = [] }) {

    // source: a lição concluída OU o vídeo concluído — ambos já têm { language, topic }
    // candidates: vídeos (quando source é lição) OU lições (quando source é vídeo)

    return candidates
        .filter(item => item.language === language)
        .filter(item => !completedIds.includes(item.id))
        .filter(item => item.topic === source.topic)
        .slice(0, 2);

}
```

Regra de fallback, quando não existe candidato com o mesmo `topic` (comum enquanto o catálogo de vídeos for pequeno): relaxar para mesmo `language` + mesmo `level`, ordenado por proximidade de nível. Nunca cruzar `language` — recomendar um vídeo em francês para quem estuda inglês não é recomendação, é ruído.

### 4.2 Sinal secundário (opcional, v2): densidade de vocabulário conhecido

Sem precisar de IA, é possível ordenar candidatos de Explore por **quanto do vídeo já é compreensível** — um proxy direto do princípio de "input compreensível" (i+1):

```js
knownWordDensity(video, knownNormalizedWords) =
    count(tokens do vídeo cujo normalized ∈ knownNormalizedWords) / total de tokens do vídeo
```

Isso é só uma interseção de conjuntos (`flashcards` normalizados × `tokens` do vídeo, ambos já existentes), não um modelo de linguagem. Vale registrar como critério de desempate entre candidatos do mesmo `topic`/`level`, não como filtro primário — filtro primário continua sendo `language` + `topic`/`level`.

### 4.3 Onde isso NÃO deve ir

Nenhuma dessas funções precisa de um novo Provider ou de persistência nova — `getRelatedContent` é uma função pura em `src/utils/`, do mesmo jeito que `getContinueLearning`/`getCoursesOverview` já são. Ela recebe dados que os Providers existentes já expõem.

---

## 5. Collections — agrupamento automático de palavras por contexto

### 5.1 Por que isso não é uma nova entidade persistida

Seguindo o mesmo princípio que decidiu `Token.known` em `EXPLORE_ARCHITECTURE.md` §4.3 (derivar em vez de autorar/persistir): uma Collection **não é salva em lugar nenhum**. Ela é uma projeção, calculada a partir de dados que já existem — `flashcards` (já persistido) + o novo campo `topic` na entrada do dicionário (seção 2.1). Isso significa: nenhuma tabela nova, nenhum provider novo, nenhuma ação de "mover card para uma coleção" — a coleção de um card é sempre a mesma pergunta, respondida em tempo de leitura: *"qual é o `topic` da entrada do dicionário para esta palavra, neste idioma?"*

```js
function getCollections(flashcards, language) {

    const groups = new Map();

    flashcards
        .filter(card => card.language === language)
        .forEach(card => {

            const entry = DictionaryRepository.getEntry(language, card.word);

            const topic = entry?.topic ?? "uncategorized";

            if (!groups.has(topic)) groups.set(topic, []);

            groups.get(topic).push(card);

        });

    return Array.from(groups.entries()).map(([topic, cards]) => ({
        topic,
        label: TOPIC_LABELS[topic] ?? "Sem categoria",
        cards,
        dueCount: cards.filter(card => card.nextReview <= Date.now()).length
    }));

}
```

### 5.2 Compatibilidade com dados de hoje

Como nenhuma entrada do dicionário tem `topic` ainda, todo flashcard cairia em `"uncategorized"` no dia 1 — **não é um estado de erro**, é o estado inicial esperado, e desaparece organicamente conforme entradas ganham `topic` (backfill incremental, não é bloqueante para nenhuma outra feature). `TOPIC_LABELS` é um dicionário simples `topic → rótulo em pt-BR` (`"food" → "Comida"`, `"travel" → "Viagem"`, `"family" → "Família"`), a única tabela de fato nova neste documento — e é estática, não precisa de backend.

### 5.3 Uso pretendido (não implementado agora)

Uma tela de revisão poderia permitir "revisar só a Collection Food" filtrando `getDueCards` (já existente em `src/utils/study/session/getDueCards.js`) pelo subconjunto de `cards` de uma Collection antes de passar para a sessão de estudo — nenhuma mudança na máquina de estudo (`useStudySession`/`scheduleCard`) é necessária, só um filtro aplicado antes de `startSession`.

---

## 6. Preparando a evolução para "Phrases"

### 6.1 O achado principal: o schema já suporta frases — hoje

Inspecionando `src/data/dictionary/english/a1.js`, entradas como `{ word: "My name is", translation: "Meu nome é" }` e `{ word: "Good morning", ... }` **já existem e já funcionam** como flashcards de frase completa, porque `Flashcard.word`, `DictionaryRepository` e `normalizeWord` sempre trataram `word` como uma string livre, nunca assumiram "uma palavra = um token". `Phrases` não é uma migração de schema — é reconhecer que o schema já não distingue os dois casos, e não deveria passar a distinguir agora.

Consequência direta para Collections (seção 5) e para tudo mais neste documento: uma Collection agrupa frases e palavras exatamente do mesmo jeito, porque `getEntry`/`topic` não sabem (nem precisam saber) se `card.word` é `"bread"` ou `"I would like some bread"`.

### 6.2 O gap real (e é só um): busca de frase em texto corrido

O único lugar onde "frase" e "palavra" **não** são tratadas da mesma forma hoje é a interação de clique em texto livre: `TextRenderer.jsx:15` tokeniza com `text.match(/[\p{L}\p{N}'’]+|.../)`, ou seja, separa o texto em tokens de uma palavra só, e cada token é verificado individualmente contra `DictionaryRepository.hasWord`. Uma entrada como `"Good morning"` nunca fica clicável dentro de um parágrafo corrido — só aparece hoje via `VocabularySection`, que casa a lista curada `lesson.vocabulary` contra o dicionário por string exata, não por varredura de texto.

Esse mesmo ponto se repete no `InteractiveTranscript` do Explore (`EXPLORE_ARCHITECTURE.md` §8), que também precisará tokenizar legendas em tempo real — herdaria a mesma limitação se copiar a lógica do `TextRenderer` sem ajuste.

**Correção proposta (futura, não desta sprint):** trocar o casamento de token único por um **casador de maior sequência (longest-match)** — para cada posição do texto, tentar casar 3, depois 2, depois 1 palavra consecutiva contra `DictionaryRepository` antes de desistir e tratar como texto comum. Isso é uma mudança confinada a `TextRenderer` e (quando existir) `InteractiveTranscript` — nenhuma mudança em `Flashcard`, `DictionaryRepository`, `Collection` ou eventos.

### 6.3 Distinguir palavra de frase, quando precisar (também derivado)

Se algum dia a UI quiser tratar frases de forma visualmente diferente (badge, contagem separada nas estatísticas), isso também não precisa de um campo novo:

```js
const isPhrase = card.word.trim().includes(" ");
```

### 6.4 Resumo

| Camada | Já suporta frases? | Mudança necessária |
|---|---|---|
| `Flashcard` / `normalizeFlashcard` | Sim | Nenhuma |
| `DictionaryRepository` / `normalizeWord` | Sim | Nenhuma |
| Collections (§5) | Sim (herda do dicionário) | Nenhuma |
| `VocabularySection` (lista curada) | Sim | Nenhuma |
| `TextRenderer` (texto corrido, Learn) | **Não** | Tokenizador longest-match |
| `InteractiveTranscript` (Explore, ainda não implementado) | Depende de nascer já certo | Especificar com o mesmo tokenizador desde o início |

---

## 7. Estados da Home

Hoje a Home não tem "estados" nomeados — ela sempre renderiza os mesmos 8 cards, cada um com seu próprio estado vazio/preenchido isolado. A proposta abaixo não substitui os cards existentes; nomeia **qual `nextStep` (seção 3) domina em cada situação**, para que o mesmo conjunto de cards se sinta como respostas diferentes em vez de sempre a mesma tela.

| Estado | Condição (dado real) | `nextStep` dominante | Cards existentes reaproveitados | Novo? |
|---|---|---|---|---|
| **Novo usuário** | `completedLessons.length === 0 && flashcards.length === 0` | Continuar 1ª lição | `ContinueLearningCard` (já resolve sozinho, seção 1), `AchievementCard`/`ReviewsCard` em estado vazio | Não |
| **Revisões pendentes** | `reviews.hasReviews === true` | Revisar agora | `ReviewsCard` | Não |
| **Terminou uma lição** | evento `LESSON_COMPLETED` mais recente que qualquer `EXERCISE_COMPLETED` para a mesma lição | Fazer os exercícios daquela lição | `ContinueLearningCard`/`ResumeActivityCard` | Não — é o que `useExerciseSession` já resolveria se o usuário navegasse manualmente; o ganho aqui é a Home **sugerir** esse link em vez de depender do usuário lembrar |
| **Terminou um vídeo** | evento `VIDEO_COMPLETED` mais recente, sem revisão pendente | Lição relacionada (`getRelatedContent`, §2.3) | — | Sim: seção "Aprenda a gramática por trás" |
| **Concluiu um módulo** | `isLastLessonInModule` true + lição concluída | Achievement + vídeos relacionados ao(s) `topic`(s) do módulo | `AchievementCard` (já existe) | Sim: ligação para Explore |
| **Concluiu um nível** | último módulo do nível atual concluído (hoje: único módulo A1) | `getNextLevel` — se existir próximo nível com conteúdo, sugerir; senão, estado "nível dominado, revise ou explore" | `ContinueLearningCard` (`status: "finished"` já existe) | Sim: distinguir "acabou o módulo" de "acabou o nível" — hoje os dois caem no mesmo `status: "finished"` |

Ponto importante de honestidade arquitetural: os estados "novo usuário" e "revisões pendentes" **já funcionam hoje** com o código existente — o valor desta seção está em nomear e priorizar via `nextStep` (seção 3), não em reescrever o que já está correto.

---

## 8. Princípios que orientam qualquer implementação futura desta jornada

1. **Um `topic` compartilhado** (lição, vídeo, palavra) é o elo que conecta Learn ↔ Explore ↔ Collections — não são três taxonomias, é uma.
2. **`nextStep` é uma decisão, não um card novo** — os cards existentes continuam a fonte da verdade visual; `nextStep` só escolhe qual é a ação primária entre eles.
3. **Nada nesta jornada é IA** — toda recomendação é filtro + interseção de conjuntos sobre dados que o app já coleta (`language`, `level`, `topic`, `flashcards`, `completedLessons`, `watchedVideos`).
4. **Collections e Phrases são camadas de leitura, não de escrita** — nenhuma das duas introduz uma tabela/provider novo; ambas derivam de `flashcards` + `DictionaryRepository`, exatamente como `Token.known` já faz no Explore.
5. **Nenhum estado novo de Home substitui um estado que já funciona** — a seção 7 é sobre nomear e priorizar, não sobre reescrever `ContinueLearningCard`/`ReviewsCard`/`AchievementCard`.
