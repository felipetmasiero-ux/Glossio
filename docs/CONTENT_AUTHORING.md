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
   viram "complete a frase"/"ordene a frase" (veja
   `src/utils/exercises/generateExercisesForLesson.js`). Escrever uma boa
   lição (quiz bem feito, exemplos completos, vocabulário correto) já
   produz bons exercícios de graça.
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
| `paragraph(text)` | `paragraph` | `text` |
| `quote(text)` | `quote` | `text` |
| `tip(title, text)` | `tip` | `title`, `text` |
| `grammar(title, text)` | `grammar` | `title`, `text` |
| `culture(title, text)` | `culture` | `title`, `text` |
| `examples([{text, translation}])` | `example` | ≥1 item, cada um com `text` (`translation` recomendado) |
| `dialogue([{speaker, text}])` | `dialogue` | ≥1 linha, cada uma com `speaker` e `text` |
| `list([items])` | `list` | ≥1 item, todos não vazios |
| `quiz(question, options, answerIndex, explanation)` | `quiz` | `question`, ≥2 `options` únicas, `answerIndex` dentro do intervalo, `explanation` recomendado |
| `step(title)` | `step` | `title` — divide a lição em passos/telas; nenhuma lição usa isso hoje (todas são uma tela só), mas o suporte já existe |

Todo esse mapeamento (tipo → validação → componente de renderização) tem
uma única fonte de verdade por camada: `BLOCK_TYPES`
(`src/constants/lessonBlocks.js`) para o que é válido, e o registro em
`src/components/lessons/blocks/index.js` para como renderizar. Um teste
(`src/components/lessons/blocks/index.test.js`) garante que os dois nunca
saem de sincronia.

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
| `block` | tipo existe, campos obrigatórios por tipo, opções de quiz únicas e não vazias, `answer` dentro do intervalo de `options` |
| `lesson` | campos obrigatórios presentes, `level` é um CEFR válido, `language` é suportado, tem ao menos 1 objetivo, tem ao menos 1 bloco |
| `module` / `course` | campos obrigatórios presentes, tem ao menos 1 lição/módulo |
| `id` | ids de curso/módulo/lição/bloco únicos (dentro do escopo e globalmente), lição prefixada pelo id do módulo, módulo prefixado pelo id do curso |
| `vocabulary` | palavra não vazia, não repetida na lição, existe no dicionário do idioma |
| `dictionary` | entrada tem `word`+`translation`, sem duas entradas colidindo no mesmo id normalizado |
| `asset` (só no script, não em `src/`) | todo `cover` (de curso ou lição) existe de fato em `public/` |

**Erro (✖)** = quebra alguma coisa de verdade (bloco não vai renderizar
direito, palavra vai sumir, id duplicado vai confundir progresso/URLs).
**Aviso (⚠)** = funciona, mas está incompleto (explicação de quiz faltando,
tópico sem rótulo, `order` fora de posição, capa quebrada).

Essas mesmas funções (`validateLesson`, `validateBlock`, etc.) são
importáveis e testadas isoladamente (`*.test.js` ao lado de cada uma) — dá
para escrever um teste específico para uma lição nova se fizer sentido, mas
não é obrigatório: os scripts já cobrem todo o conteúdo automaticamente.

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
- Rode `npm run validate-content` antes de abrir o PR, não depois.

## Checklist antes de abrir o PR

- [ ] Lição criada com `defineLesson` (ou objeto literal no mesmo formato)
- [ ] Todas as palavras de `vocabulary` existem no dicionário do idioma
- [ ] Lição adicionada ao array `lessons` do módulo certo
- [ ] `topic` tem entrada em `TOPIC_LABELS`
- [ ] Todo `quiz` tem `explanation`
- [ ] `npm run validate-content` sem erros (avisos pré-existentes de outras
      lições não são sua responsabilidade, mas não adicione novos)
- [ ] `npm run content-report` mostra a contagem esperada (uma lição a
      mais, N palavras a mais)
- [ ] `npx vitest run` continua passando

## Melhorias futuras

- Adicionar as imagens de capa que faltam (`public/covers/*.webp`) — hoje
  **nenhuma** existe; `npm run validate-content` lista todas.
- Um script `npm run new-lesson <language> <level> <topic>` que gera o
  arquivo de lição a partir de um template usando `defineLesson`.
- Expandir `validateContent` para cruzar `lesson.tags`/`skills` com uma
  lista canônica, do mesmo jeito que já é feito com `topic`.
- CI rodando `npm run validate-content` em todo PR que toque `src/data/`.
