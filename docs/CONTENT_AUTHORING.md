# Autoria de Conteúdo — Glossio

Guia para quem vai criar ou editar cursos, módulos e lições. O objetivo é
que dar essa tarefa a alguém não exija entender o resto da arquitetura do
app — só este documento e os scripts abaixo.

## Estrutura de dados

```
Curso (src/data/courses/<language>.js)
 └─ Módulo (src/data/lessons/<language>/<level>/module.js)
     └─ Lição (src/data/lessons/<language>/<level>/<topic>.js)
         ├─ objectives: string[]
         ├─ vocabulary: string[]        ──┐  só palavras (strings) — a
         └─ blocks: Block[]               │  tradução/exemplos de cada uma
                                           │  vivem no dicionário, à parte
Dicionário (src/data/dictionary/<language>/<level>.js)
 └─ { word, translation, examples?, partOfSpeech?, topic? }
```

Três coisas importantes que não são óbvias olhando só um arquivo de lição:

1. **Vocabulário e dicionário são coisas separadas.** `lesson.vocabulary` é
   só uma lista de palavras (strings). Cada uma precisa ter uma entrada
   correspondente em `src/data/dictionary/<language>/*.js` — é de lá que
   vêm a tradução, os exemplos e a nota de uso mostrados na lição. Se a
   palavra não estiver lá, ela simplesmente não aparece (nem na lição, nem
   nos exercícios) — sem erro, sem aviso. **`npm run validate-content`
   pega isso.**
2. **Exercícios não são escritos à mão.** As telas de prática
   (`/exercises/...`) geram os exercícios automaticamente a partir da
   própria lição: blocos `quiz` viram múltipla escolha, o vocabulário vira
   "escolha a palavra"/"associe a tradução", frases de `example`/`dialogue`
   viram "complete a frase"/"ordene a frase"/**listening** (veja
   `src/utils/exercises/generateExercisesForLesson.js`). Escrever uma boa
   lição (quiz bem feito, exemplos completos, vocabulário correto) já
   produz bons exercícios de graça — inclusive de listening, sem escrever
   nenhum áudio à mão (veja a seção **Listening** abaixo).
3. **O id de cada lição/módulo carrega o idioma.** `"english-a1-greetings"`
   é `{language}-{level}-{topic}`, e `"english-a1"` é `{courseId}-{level}`.
   Isso não é só estética — é o que permite abrir uma lição publicamente
   (sem login) sem depender do idioma "ativo" do usuário (veja
   `getLanguageFromId`). Use `defineLesson`/`defineModule` (abaixo) para
   nunca errar esse formato à mão.

## Como adicionar uma nova lição

Passo a passo para uma lição `technology` em inglês A1 (assumindo que o
módulo `english-a1` já existe):

**1. Crie o arquivo da lição** (`src/data/lessons/english/a1/technology.js`):

```js
import { heading, paragraph, examples, dialogue, quiz } from "../../../../utils/lessons/builders";
import { defineLesson } from "../../../../utils/content/authoring";

export const technologyLesson = defineLesson({

    language: "english",
    level: "A1",
    topic: "technology",       // precisa existir em src/constants/topics.js (TOPIC_LABELS)
    category: "Daily Life",
    order: 13,                  // posição dentro do módulo

    title: "Technology",
    subtitle: "Talk about the devices you use every day.",
    description: "Learn vocabulary and phrases to talk about phones, computers and the internet.",

    objectives: [
        "Name common electronic devices.",
        "Talk about how often you use technology."
    ],

    vocabulary: ["phone", "computer", "internet"], // cada uma precisa existir no dicionário (passo 2)

    blocks: [
        heading("Everyday Devices"),
        paragraph("Technology is part of daily life..."),
        examples([{ text: "I use my phone every day.", translation: "Eu uso meu celular todos os dias." }]),
        dialogue([
            { speaker: "Ana", text: "Do you have a computer?" },
            { speaker: "Leo", text: "Yes, I use it for work." }
        ]),
        quiz(
            "Which word means 'celular'?",
            ["Computer", "Phone", "Internet"],
            1,
            "'Phone' is the word for 'celular'."
        )
    ],

    summary: {
        tip: "Practice naming the devices you see around you right now.",
        review: ["phone = celular", "computer = computador", "internet = internet"]
    }

});
```

`defineLesson` (em `src/utils/content/authoring`) monta o objeto final e
calcula o `id` (`english-a1-technology`) — o mesmo formato usado por toda
lição existente. Arquivos de lição antigos (objeto literal direto, sem
`defineLesson`) continuam funcionando exatamente como antes; não é preciso
migrar nada.

**2. Adicione as palavras novas ao dicionário**
(`src/data/dictionary/english/a1.js`):

```js
{ word: "phone", translation: "celular", examples: ["I lost my phone."], topic: "technology" },
{ word: "computer", translation: "computador", partOfSpeech: "noun", topic: "technology" },
{ word: "internet", translation: "internet", partOfSpeech: "noun", topic: "technology" },
```

**3. Registre a lição no módulo**
(`src/data/lessons/english/a1/module.js`):

```js
import { technologyLesson } from "./technology";
// ...
lessons: [
    // ... lições existentes,
    technologyLesson
]
```

**4. Valide.**

```bash
npm run validate-content
```

Se aparecer algo em vermelho (erro), a lição não deve ser mergeada até
corrigir. Avisos (⚠) são sinal de qualidade, não bloqueiam.

Um módulo novo (`defineModule`) ou curso novo (`defineCourse`) seguem o
mesmo padrão — veja as assinaturas em `src/utils/content/authoring/`.

## Blocos disponíveis

Todo bloco é criado por uma função em `src/utils/lessons/builders` (nunca
escreva `{ type: "...", ... }` à mão — os builders geram o `id` e mantêm o
formato consistente).

| Builder | Tipo | Campos obrigatórios |
|---|---|---|
| `heading(text)` | `heading` | `text` |
| `paragraph(text, audio?)` | `paragraph` | `text` |
| `quote(text, audio?)` | `quote` | `text` |
| `tip(title, text, audio?)` | `tip` | `title`, `text` |
| `grammar(title, text, audio?)` | `grammar` | `title`, `text` |
| `culture(title, text, audio?)` | `culture` | `title`, `text` |
| `examples([{text, translation, audio?}])` | `example` | ≥1 item, cada um com `text` (`translation` recomendado) |
| `dialogue([{speaker, text, audio?}])` | `dialogue` | ≥1 linha, cada uma com `speaker` e `text` |
| `list([items])` | `list` | ≥1 item, todos não vazios |
| `quiz(question, options, answerIndex, explanation, feedback)` | `quiz` | `question`, ≥2 `options` únicas, `answerIndex` dentro do intervalo, `explanation` recomendado, `feedback` opcional (veja a seção Feedback educativo) |
| `step(title)` | `step` | `title` — divide a lição em passos/telas; nenhuma lição usa isso hoje (todas são uma tela só), mas o suporte já existe |

Todo esse mapeamento (tipo → validação → componente de renderização) tem
uma única fonte de verdade por camada: `BLOCK_TYPES`
(`src/constants/lessonBlocks.js`) para o que é válido, e o registro em
`src/components/lessons/blocks/index.js` para como renderizar. Um teste
(`src/components/lessons/blocks/index.test.js`) garante que os dois nunca
saem de sincronia.

## Feedback educativo

Qualquer bloco `quiz` pode, opcionalmente, ensinar mais do que "certo" ou
"errado". Isso vale tanto para o quiz dentro da lição (`QuizCard`, durante a
leitura) quanto para o exercício de múltipla escolha gerado a partir dele
(`/exercises/...`) — os dois usam o mesmo componente de renderização
(`ExerciseFeedback`), então o que você escreve aparece nos dois lugares
automaticamente.

### Os 6 tipos de feedback

| Campo | Builder | Aparece quando... |
|---|---|---|
| Explicação | 4º argumento de `quiz(...)` (já existia) | Sempre que existir, certo ou errado |
| Regra gramatical | `grammarNote(texto)` | Sempre que existir, certo ou errado |
| Exemplo adicional | `extraExample(texto)` | Sempre que existir, certo ou errado |
| Curiosidade | `funFact(texto)` | Só quando a resposta está **certa** |
| Dica para lembrar | `hint(texto)` | Só quando a resposta está **errada** |
| Erro comum | `commonMistake(texto)` | Só quando a resposta está **errada** |

Todos são opcionais e independentes — escreva só os que fizerem sentido para
aquela pergunta.

### Como usar

```js
import { heading, quiz, feedback, hint, commonMistake, funFact, grammarNote, extraExample }
    from "../../../../utils/lessons/builders";

quiz(
    "She ___ at a hospital.",
    ["work", "works", "working", "worked"],
    1,
    "Com he/she/it no presente simples, o verbo recebe -s.", // explicação (já existia)
    feedback(
        grammarNote("3ª pessoa do singular no presente simples sempre leva -s: he/she/it + verbo-s."),
        commonMistake("Muita gente esquece o -s com he/she/it."),
        hint("Pergunte: é 'ele/ela faz' ou 'eles fazem'? Se for ele/ela, o verbo ganha -s."),
        funFact("O inglês só marca a 3ª pessoa do singular no presente — nas outras pessoas o verbo não muda.")
    )
)
```

`feedback(...)` aceita quantas partes fizerem sentido, em qualquer ordem —
`feedback(hint("..."))` sozinho é perfeitamente válido.

### Compatibilidade

`feedback` é o 5º argumento de `quiz(...)` — todo quiz existente (que só
passa 4 argumentos) continua funcionando exatamente como antes, sem
`feedback` nenhum. Nenhum outro tipo de exercício (escolha de palavra,
complete a frase, associe a tradução, ordene a frase) tem um feedback
autorado hoje — eles são gerados em massa a partir do vocabulário/frases da
lição, sem um bloco individual para anexar feedback (veja "Melhorias
futuras"). `ExerciseShell`/`ExerciseFeedback` já sabem renderizar feedback
para qualquer tipo de exercício que venha a ganhar essa fonte de dado no
futuro — não vai ser preciso mexer na UI de novo.

## Áudio

Palavras de vocabulário, exemplos, linhas de diálogo, blocos de texto
(`paragraph`/`quote`/`tip`/`grammar`/`culture`) e cada campo de `feedback()`
podem, opcionalmente, ter áudio. Onde quer que apareça, o mesmo componente
(`AudioButton`) cuida de tocar — nada disso é escrito por lição; é a mesma
peça reutilizada em todo lugar.

### Como usar

```js
import { paragraph, examples, dialogue, quiz, feedback, hint, audio }
    from "../../../../utils/lessons/builders";

paragraph("Technology is part of daily life...", audio("/audio/english/a1/technology-intro.mp3")),

examples([
    { text: "I use my phone every day.", translation: "Eu uso meu celular todos os dias.", audio: audio("/audio/english/a1/phone-example.mp3") }
]),

dialogue([
    { speaker: "Ana", text: "Do you have a computer?", audio: audio("/audio/english/a1/ana-computer.mp3") },
    { speaker: "Leo", text: "Yes, I use it for work." } // sem áudio - tudo bem, é sempre opcional
]),

quiz(
    "Which word means 'celular'?",
    ["Computer", "Phone", "Internet"],
    1,
    "'Phone' is the word for 'celular'.",
    feedback(hint("Think of what you carry in your pocket.", audio("/audio/english/a1/phone-hint.mp3")))
)
```

E no dicionário (`src/data/dictionary/english/a1.js`):

```js
{ word: "phone", translation: "celular", audio: { file: "/audio/english/a1/phone.mp3" }, topic: "technology" },
```

### Arquivo gravado ou TTS

`audio(file)` aceita um caminho (mesma convenção do `cover`: absoluto a
partir de `public/`, ex. `/audio/english/a1/phone.mp3`) **ou nenhum
argumento**:

```js
audio("/audio/english/a1/phone.mp3")  // toca o arquivo gravado
audio()                                // sem arquivo ainda - toca por
                                        // texto-para-fala (TTS) no navegador
```

Isso é o que "preparar para dois provedores" significa na prática: você
nunca escreve qual provedor usar — só diz se já existe um arquivo gravado
ou não. Quem decide como tocar é uma única função,
`resolveAudioSource()` (`src/utils/audio/resolveAudioSource.js`) — trocar
de "ainda não gravamos" para "já gravamos" é só adicionar o caminho do
arquivo dentro do mesmo `audio(...)`, em um lugar só, sem tocar em nenhum
componente.

### Compatibilidade

`audio`/`audio()` são sempre opcionais. Nenhuma lição, exemplo, diálogo,
bloco ou entrada de dicionário existente tem isso hoje - e sem essa
referência, `AudioButton` simplesmente não renderiza nada (nenhum botão
vazio, nenhum erro). Toda entrada de dicionário já ganhou um `audio: null`
no mesmo lugar onde já existia `pronunciation: null` (um placeholder que já
existia, sem uso ainda) - `null` e "campo nunca declarado" significam a
mesma coisa para a validação e para o player.

### Onde o áudio é tocado

Um único serviço (`src/utils/audio/`) é o único lugar do app que encosta em
`Audio()`/`speechSynthesis` - nenhum componente faz isso diretamente:

- `resolveAudioSource.js` — decide arquivo vs. TTS (pura, sem tocar nada).
- `AudioPlaybackService.js` — de fato toca (`HTMLAudioElement` ou
  `SpeechSynthesisUtterance`), reportando `idle`/`loading`/`playing`/
  `ended`/`error`. Na hora de falar por TTS, também escolhe a melhor voz
  disponível no navegador para o idioma (`selectVoice.js`) — sem isso, o
  navegador usa a voz padrão dele para aquele idioma, que em alguns
  sistemas é bem ruim mesmo com vozes melhores instaladas. Continua sendo
  só a Web Speech API nativa do navegador — nenhum provedor de TTS pago
  foi integrado, só uma escolha melhor entre as vozes que já existem.
- `useAudioPlayer` (hook, `src/hooks/audio/`) — conecta os dois acima ao
  React.
- `AudioButton` (`src/components/common/AudioButton/`) — o player visível,
  com play/pause/loading/replay, `aria-label` dinâmico e totalmente
  operável por teclado (é um `<button>` de verdade). É o único componente
  que qualquer tela usa para tocar áudio.

O áudio só é buscado quando o usuário aperta o botão - nada é pré-carregado
("carregar sob demanda", ver seção Performance da sprint original).

## Listening

Exercício de "ouça e escolha a frase certa" — o aluno aperta play, ouve uma
frase e escolhe entre 4 opções qual delas é a que tocou. **Não é um bloco
de conteúdo autorado**: como todo `exercise.type` gerado
(`generateExercisesForLesson.js`), listening nasce automaticamente a
partir de blocos `examples([...])` que já existem na lição — nada para
escrever, nenhum novo builder de autoria.

### Como é gerado

`src/utils/exercises/generators/generateListening.js` percorre todos os
blocos `example` da lição, e para cada frase-alvo:

1. Monta um banco de distractors com as outras frases da própria lição
   (outros `examples()` + linhas de `dialogue()`) e escolhe 3 com
   `pickDistractors` — o mesmo utilitário que `select-word`/`fill-blank`
   já usam para não duplicar/ambiguar respostas.
2. Se não achar 3 distractors distintos, **pula essa frase** (a lição
   simplesmente gera menos exercícios de listening, nunca um exercício mal
   formado).
3. Distractors são sempre outras frases reais da lição — nunca uma
   variação gramatical automática da frase certa (tipo "she work"/"she
   works"/"she working"). Gerar esse tipo de variação exigiria um
   gerador com consciência de gramática que o projeto não tem hoje, e o
   risco de criar sem querer uma segunda resposta "também certa" (ou
   ambígua) é alto — mais seguro usar frases já revisadas pelo autor da
   lição.
4. Até 4 exercícios de listening por lição (mesma ordem de grandeza dos
   outros generators).

Nenhuma lição precisa de conteúdo novo — qualquer lição com `examples()`
suficientes já passa a ter listening automaticamente.

### Como o TTS é usado

Cada exercício de listening carrega `audio: example.audio ?? audio()` —
usa o áudio gravado se a frase já tiver um (`audio("/....mp3")`), ou cai
para TTS (`audio()`) quando não tiver, exatamente a mesma regra de
`resolveAudioSource()` que todo o resto do app já segue (veja a seção
Áudio acima). Isso significa: **no dia em que existirem arquivos de áudio
reais para essas frases, `generateListening.js` não precisa de nenhuma
mudança** — é só adicionar `audio("/caminho.mp3")` no `examples([...])` da
lição.

O botão de play é o `AudioButton` de sempre — o exercício de listening não
tem nenhum player próprio.

### Quando autorar um listening específico

Nesta primeira versão (v1), listening é sempre derivado — não existe forma
de escrever um exercício de listening específico à mão. Se um dia fizer
sentido ter um exercício de listening desenhado especificamente para uma
lição (não apenas derivado de uma frase de exemplo), o próximo passo
natural é um bloco de conteúdo novo (`BLOCK_TYPES.LISTENING`, um builder
`listening(...)`, um validator em `validateBlock.js`) que
`generateListening.js` passaria a priorizar sobre a derivação automática —
mas isso não existe ainda, e não é necessário para a v1.

### Exemplo

```js
examples([
    { text: "She works at a hospital.", translation: "Ela trabalha em um hospital." }
])
```

vira, automaticamente, um exercício de listening com essa frase como
resposta certa, 3 distractors de outras frases da lição, e a tradução
mostrada como explicação depois de responder.

## Vocabulário e dicionário

- `lesson.vocabulary` é sempre um array de strings — as mesmas palavras que
  aparecem nos blocos `example`/`dialogue`, idealmente.
- Cada palavra precisa de uma entrada em
  `src/data/dictionary/<language>/<level ou phrases ou contractions>.js`
  com pelo menos `word` e `translation`.
- O `id` de cada entrada do dicionário é derivado automaticamente de
  `word` (não precisa declarar) — mas isso também significa que duas
  entradas com o mesmo texto (ex.: "Hello" e "hello") colidem: a segunda é
  **silenciosamente ignorada**. `npm run validate-content` detecta isso.
- Não repita uma palavra dentro do `vocabulary` da mesma lição.
- `audio` é opcional (veja a seção Áudio acima) — `{ file: "..." }` para um
  áudio gravado, `{}` para TTS, `null` (o padrão) para nenhum.

## Tópicos (`topic`)

`lesson.topic` (ex.: `"greetings"`) precisa ter uma entrada em
`src/constants/topics.js` (`TOPIC_LABELS`) — é o que dá o rótulo em
português mostrado na UI (cards de recomendação, filtros do Explore, busca)
e o que conecta lições/vídeos do mesmo assunto nas recomendações
(`getRelatedContent`). Um tópico sem rótulo não quebra nada — a UI cai para
mostrar o slug em inglês — mas é sempre um sinal de que algo foi esquecido.

## Validação automática

```bash
npm run validate-content   # verificação — sai com código 1 se houver erro
npm run content-report     # retrato do conteúdo: contagens + os mesmos problemas
```

O que cada um verifica (arquivos em `src/utils/content/validation/`):

| Categoria | Verificações |
|---|---|
| `block` | tipo existe, campos obrigatórios por tipo, opções de quiz únicas e não vazias, `answer` dentro do intervalo de `options`, `feedback` (quando existir) só com campos válidos (`hint`, `commonMistake`, `funFact`, `grammarNote`, `extraExample`) e não vazio |
| `lesson` | campos obrigatórios presentes, `level` é um CEFR válido, `language` é suportado, tem ao menos 1 objetivo, tem ao menos 1 bloco |
| `module` / `course` | campos obrigatórios presentes, tem ao menos 1 lição/módulo |
| `id` | ids de curso/módulo/lição/bloco únicos (dentro do escopo e globalmente), lição prefixada pelo id do módulo, módulo prefixado pelo id do curso |
| `vocabulary` | palavra não vazia, não repetida na lição, existe no dicionário do idioma |
| `dictionary` | entrada tem `word`+`translation`, sem duas entradas colidindo no mesmo id normalizado, `audio` (quando existir) é válido |
| `audio` | onde quer que apareça (bloco, exemplo, diálogo, campo de feedback, entrada de dicionário): é um objeto (`audio()`), só com o campo `file`, não vazio quando presente |
| `asset` (só no script, não em `src/`) | todo `cover` **e todo `audio.file`** (de bloco, exemplo, diálogo, feedback ou dicionário) existe de fato em `public/` |

**Erro (✖)** = quebra alguma coisa de verdade (bloco não vai renderizar
direito, palavra vai sumir, id duplicado vai confundir progresso/URLs).
**Aviso (⚠)** = funciona, mas está incompleto (explicação de quiz faltando,
tópico sem rótulo, `order` fora de posição, capa quebrada).

Essas mesmas funções (`validateLesson`, `validateBlock`, etc.) são
importáveis e testadas isoladamente (`*.test.js` ao lado de cada uma) — dá
para escrever um teste específico para uma lição nova se fizer sentido, mas
não é obrigatório: os scripts já cobrem todo o conteúdo automaticamente.

Sem linha própria na tabela: **listening**. Por ser 100% derivado de
`example`/`dialogue` já validados (veja a seção Listening acima), não
introduz nenhum formato de conteúdo novo para validar — a validação que já
existe para `example`/`dialogue` já é a validação do listening.

## Boas práticas

- Sempre use os `builders` para blocos e `defineLesson`/`defineModule`/
  `defineCourse` para o objeto de nível superior — nunca escreva os campos
  calculados (`id`, `type`) à mão.
- Adicione a palavra ao dicionário **antes** (ou junto) de referenciá-la em
  `vocabulary` — é fácil esquecer o segundo passo depois.
- Prefira reaproveitar um `topic` existente (veja `TOPIC_LABELS`) a criar
  um novo; se criar um novo, adicione o rótulo em `topics.js` no mesmo PR.
- Todo `quiz` deve ter uma `explanation` — mesmo que pareça óbvia, ela é o
  que aparece depois que o usuário responde.
- Use `feedback()` nas perguntas em que os alunos costumam errar — é
  exatamente aí que uma dica ou um "erro comum" bem escrito vira
  aprendizado de verdade, em vez de só um "Incorreto".
- Priorize áudio no vocabulário primeiro (é o que mais se repete pelo app -
  card de vocabulário, popup de palavra, exercícios) antes de blocos de
  texto inteiros.
- Sem arquivo gravado ainda? Use `audio()` mesmo assim - TTS funciona hoje,
  e trocar para um arquivo de verdade depois é uma mudança de uma linha.
- Rode `npm run validate-content` antes de abrir o PR, não depois.

## Checklist antes de abrir o PR

- [ ] Lição criada com `defineLesson` (ou objeto literal no mesmo formato)
- [ ] Todas as palavras de `vocabulary` existem no dicionário do idioma
- [ ] Lição adicionada ao array `lessons` do módulo certo
- [ ] `topic` tem entrada em `TOPIC_LABELS`
- [ ] Todo `quiz` tem `explanation`
- [ ] Nos `quiz` mais difíceis, considere adicionar `feedback()` (dica, erro
      comum, regra gramatical, exemplo extra ou curiosidade)
- [ ] Considere adicionar `audio()` no vocabulário novo (arquivo gravado, ou
      `audio()` sem argumento para TTS)
- [ ] `npm run validate-content` sem erros (avisos pré-existentes de outras
      lições não são sua responsabilidade, mas não adicione novos)
- [ ] `npm run content-report` mostra a contagem esperada (uma lição a
      mais, N palavras a mais)
- [ ] `npx vitest run` continua passando

## Como integrar um serviço de Text-to-Speech de verdade

Hoje, quando um `audio()` não tem `file`, `AudioPlaybackService.js` usa o
Web Speech API do navegador (`window.speechSynthesis` +
`SpeechSynthesisUtterance`) - funciona sem custo e sem configuração, mas a
qualidade da voz varia por navegador/SO. Trocar para um serviço de TTS de
verdade (ex.: Google Cloud TTS, Amazon Polly, ElevenLabs) é uma mudança
contida a **um arquivo só**: a função `playTts()` dentro de
`src/utils/audio/AudioPlaybackService.js`. Em vez de chamar
`speechSynthesis.speak(...)`, ela passaria a:

1. Chamar um endpoint do backend (ex.: `POST /api/tts { text, language }`)
   que devolve uma URL de áudio (idealmente cacheada - o mesmo texto não
   precisa ser sintetizado duas vezes).
2. Tocar essa URL exatamente como `playFile()` já faz hoje.

Nada em `resolveAudioSource.js`, `useAudioPlayer.js`, `AudioButton` ou em
qualquer lição precisaria mudar - eles só sabem que existe um "provedor
TTS", não como ele funciona por baixo. É essa a fronteira que "a troca
acontece em um lugar só" protege.

## Melhorias futuras

- Adicionar as imagens de capa que faltam (`public/covers/*.webp`) — hoje
  **nenhuma** existe; `npm run validate-content` lista todas.
- Um script `npm run new-lesson <language> <level> <topic>` que gera o
  arquivo de lição a partir de um template usando `defineLesson`.
- Expandir `validateContent` para cruzar `lesson.tags`/`skills` com uma
  lista canônica, do mesmo jeito que já é feito com `topic`.
- CI rodando `npm run validate-content` em todo PR que toque `src/data/`.
- Estender `feedback` para os outros tipos de exercício (escolha de
  palavra, complete a frase, associe a tradução), anexando-o à entrada do
  dicionário em vez de a um bloco — a UI (`ExerciseShell`/
  `ExerciseFeedback`) já está pronta para isso, falta só a fonte de dado.
- Um relatório de "perguntas mais erradas" (a partir dos eventos de
  exercício já registrados) para saber quais `quiz` mais se beneficiariam
  de um `feedback()` bem escrito.
- Gravar os primeiros áudios de verdade (começando pelo vocabulário A1, que
  é reutilizado em mais lugares) e trocar `audio()` de TTS para arquivo
  lição por lição.
- Trocar o Web Speech API por um provedor de TTS de verdade (veja a seção
  acima) - principalmente para francês/português, onde a qualidade de voz
  varia mais entre navegadores.
- Cachear os arquivos de TTS gerados (mesmo texto + idioma = mesmo áudio),
  em vez de sintetizar de novo a cada play().
- `npm run content-report` já conta referências de áudio - dá pra somar um
  "% do vocabulário A1 com áudio" por idioma, para acompanhar o progresso
  da gravação.
