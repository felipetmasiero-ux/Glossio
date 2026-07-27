# Glossio — Vision

> Este é o documento de topo. Responde "o que é o Glossio", não "como o Explore funciona" ou "qual é a cor de acento". Para profundidade, os outros documentos continuam sendo a referência: `PRODUCT.md` (brief de produto), `DESIGN.md` (sistema visual), `EXPLORE_ARCHITECTURE.md` (dados do Explore), `Learning Journey.md` (como os pilares se conectam), `EXPLORE_EXPERIENCE.md` (UX do Explore). Este documento não os substitui — ele diz por que eles existem e em que ordem devem ser lidos.

**Nota de reconciliação:** `PRODUCT.md` descreve hoje "quatro pilares" como flashcards, exercícios, lições niveladas e alfabetos — uma lista plana de *mecanismos*. Este documento redefine os quatro pilares como **Learn, Explore, Collect, Review** — uma divisão por *papel na jornada*, não por tela. Os mecanismos antigos não desaparecem: exercícios e alfabetos passam a viver dentro de Learn; flashcards passam a viver dentro de Review. `PRODUCT.md` continua correto como brief de produto (usuário, positioning, constraints); a lista de pilares nele é que fica subordinada ao modelo abaixo.

---

## 1. Missão

**Glossio existe para que um aprendiz autodidata sério trate aprender um idioma como estudo de verdade, não como hábito gamificado.** Isso significa combinar, num único lugar e sem fricção entre eles: conteúdo estruturado por nível (Learn), imersão em conteúdo autêntico (Explore), um acervo pessoal de vocabulário que cresce com o uso (Collect), e revisão espaçada que nunca deixa o que foi aprendido se perder (Review). O critério de sucesso não é tempo de tela — é retenção de vocabulário e avanço real por nível (CEFR: A1 → C2).

## 2. Os quatro pilares

```
        ┌─────────┐        ┌─────────┐
        │  LEARN  │        │ EXPLORE │
        │  (guia) │        │(imersão)│
        └────┬────┘        └────┬────┘
             │                  │
             └───────┬──────────┘
                      ▼
                ┌───────────┐
                │  COLLECT  │   ← visão futura
                │ (acervo)  │
                └─────┬─────┘
                      ▼
                ┌───────────┐
                │  REVIEW   │
                │ (retenção)│
                └───────────┘
```

### Learn — o caminho guiado
Cursos → módulos → lições → exercícios, nessa ordem, com progressão sequencial opcional (`ENABLE_LESSON_LOCKING`). É o pilar que responde "o que estudar hoje, na ordem certa" quando o aprendiz não quer decidir sozinho. Inclui o mecanismo de alfabetos (aprender scripts diferentes do próprio) como uma trilha estruturada equivalente, não um afterthought. **Já existe e é o pilar mais maduro do produto hoje** (inglês A1 completo com 12 lições; francês e português com conteúdo inicial).

### Explore — a imersão
Vídeos (e, na evolução natural, podcasts e artigos) com transcrição interativa: clicar numa palavra abre tradução sem interromper o conteúdo. É o pilar que responde "quero praticar com algo real, não mais um exercício". Especificado por completo em `EXPLORE_ARCHITECTURE.md` (dados) e `EXPLORE_EXPERIENCE.md` (experiência) — **ainda não implementado**, é a próxima fase.

### Collect — o acervo pessoal (visão futura, não implementar ainda)
A ideia de que palavras e frases aprendidas — venham de Learn ou de Explore — se acumulam num acervo pessoal organizado por contexto (Food, Travel, Family...), não numa lista plana. **Isto já tem uma semente real no produto hoje**: `/my-flashcards` já é uma lista pesquisável de todo o vocabulário salvo — é a versão embrionária de Collect, antes de ganhar agrupamento automático por tópico. `Learning Journey.md` §5 já especifica o mecanismo (Collections, derivado de `flashcards` + `topic` do dicionário, sem tabela nova) — o pilar existe como conceito e como caminho técnico, mas **entra no roadmap só na fase v1.0** (seção 5), não no Beta do Explore.

### Review — a retenção
O motor de repetição espaçada (SM-2 simplificado: `scheduleCard`, qualidade again/good/easy) e a sessão de estudo (`/flashcards`). É o pilar que garante que o que Learn ensinou e Explore expôs não seja esquecido — e é deliberadamente **o único pilar que não pertence a Learn nem a Explore**: um flashcard criado assistindo um vídeo entra na mesma fila que um criado numa lição, porque a origem nunca importa para o agendamento de revisão (`EXPLORE_ARCHITECTURE.md` §11). **Já existe e já é compartilhado por construção.**

### Por que quatro, e por que essa ordem
Learn e Explore são as duas *fontes* de vocabulário (guiada e livre); Collect é *onde* esse vocabulário se organiza; Review é *o que* garante que ele fique. Um pilar novo não deveria nunca duplicar essa cadeia — deveria alimentar uma dessas quatro caixas, nunca criar uma quinta.

---

## 3. Princípios de UX

Cada princípio abaixo já foi decidido e registrado em outro documento — aqui eles são consolidados como a lista curta que qualquer decisão nova deveria respeitar.

- **Depth over dopamine** (`PRODUCT.md`) — a linguagem visual e de interação é a de uma ferramenta de estudo séria, não de um app gamificado. Streaks e metas existem porque ajudam retenção, não como mecânica de engajamento por si.
- **The One Ink Rule** (`DESIGN.md`) — ink-blue é o único acento interativo do sistema inteiro. Verde/vermelho existem só para certo/errado. Nenhuma feature nova ganha uma cor própria para se destacar — se precisa de destaque, usa o mesmo acento; se precisa de dois estados, a diferença é presença/ausência do acento, não uma cor nova (`EXPLORE_EXPERIENCE.md` §6 é o exemplo mais recente disso).
- **Aprendizado sem interrupções** (`EXPLORE_EXPERIENCE.md` §5, §7, §10) — nenhuma ação de baixo custo cognitivo (salvar uma palavra, olhar uma tradução) deveria custar a atenção contínua de quem está assistindo, lendo ou ouvindo. Interromper é reservado para transições que o próprio aprendiz decide (fim de um vídeo, fim de uma lição) — nunca para uma sugestão não pedida.
- **Um único ecossistema, nunca dois sistemas** (`EXPLORE_ARCHITECTURE.md` §1) — todo pilar novo se conecta ao `EventProvider`, `FlashcardProvider`, `DictionaryRepository`, `DashboardRepository` já existentes. Nenhum pilar cria seu próprio provider de flashcards, dicionário ou dashboard.
- **Derivar, não duplicar dado** — recorrente em todos os documentos: `Token.known` (Explore), Collections (Learning Journey), `isPhrase` (Learning Journey) são todos calculados a partir de dado que já existe, nunca autorados ou persistidos separadamente. Antes de adicionar um campo novo a qualquer entidade, a pergunta é "isso não pode ser derivado do que já temos?".
- **Recomendação sem IA** (`Learning Journey.md` §4) — toda sugestão de conteúdo é filtro + interseção de conjuntos sobre `language`/`level`/`topic`/progresso. Isso não é uma limitação temporária a ser substituída por IA assim que possível — é uma escolha de transparência: o aprendiz deveria conseguir entender por que algo foi recomendado.

---

## 4. A jornada completa do usuário

Versão condensada — `Learning Journey.md` tem o detalhe completo, incluindo os estados de Home e a lógica de priorização do dashboard.

1. **Escolhe o idioma** (`/`) — decisão única, persiste, molda todo o resto do app.
2. **Aprende de forma guiada** (Learn): lição → vocabulário clicável → flashcard salvo → exercícios da lição → próxima lição. Repete até o módulo (e eventualmente o nível) se completar.
3. **A cada visita à Home, o dashboard decide um próximo passo só**, nesta ordem: revisão vencida > atividade em aberto > próxima lição > conteúdo do Explore relacionado > próximo módulo/nível. Os cards de apoio (streak, meta diária, conquista recente) continuam visíveis, mas não competem pela decisão.
4. **Quando quer praticar livremente** (Explore): assiste/lê conteúdo real do mesmo idioma e nível, clica em palavras novas sem sair do fluxo, acumula flashcards do mesmo jeito que em Learn.
5. **O vocabulário se acumula num acervo pessoal** (Collect, hoje só `/my-flashcards`; no futuro, agrupado por tópico) — não importa se veio de uma lição ou de um vídeo.
6. **A revisão espaçada (Review) fecha o ciclo**: os flashcards voltam na hora certa, e voltar para estudá-los é sempre a prioridade máxima do próximo passo sugerido — o app nunca deixa o aprendiz esquecer o que já pagou o custo de aprender.
7. **Learn e Explore se recomendam mutuamente** pelo mesmo `topic`: terminar uma lição de "Food" sugere vídeos de "Food"; terminar um vídeo de "Travel" sugere a lição de "Travel", se existir.

O ciclo não tem um fim — ele se repete em espiral, subindo de nível (A1 → A2 → ...) conforme o conteúdo estruturado cresce.

---

## 5. Roadmap por fases

### MVP — hoje (consolidação, não construção nova)
O que já existe e funciona: Learn completo (cursos → módulos → lições → exercícios, com bloqueio sequencial opcional), Review completo (flashcards com SM-2, sessão de estudo, atalhos de teclado), `/my-flashcards` (semente de Collect), Home com cards de progresso, Perfil básico. Persistência 100% `localStorage`, sem contas.

O único item de consolidação pendente antes do Beta é fechar a lacuna que `Learning Journey.md` §3 identificou: o dashboard tem os dados certos, mas ainda não decide um `nextStep` único — hoje `ContinueLearningCard` e `ResumeActivityCard` podem sugerir coisas diferentes ao mesmo tempo. Fechar isso é barato e deveria vir **antes** do Explore, porque o Explore vai se conectar exatamente a essa decisão (seção 3 de `Learning Journey.md`, item 4 da priorização).

### Beta — Explore v1
Escopo: vídeo como único tipo de conteúdo (podcast/artigo ficam para v1.0). Entrega o ciclo completo já especificado: `InteractiveTranscript` não-bloqueante, popup ancorado, indicação de palavra conhecida/nova, ponte Learn↔Explore via `topic` compartilhado, `nextStep` do dashboard já contemplando "continuar vídeo" e "explorar relacionado". **Não entra**: Collections visuais, tokenizador de frases em texto corrido, podcast, artigo — cada um é aditivo depois, não bloqueia o Beta.

### v1.0 — ecossistema maduro
Três frentes, nenhuma dependente das outras: (a) Collect ganha forma própria — Collections visuais por tópico evoluindo de `/my-flashcards`; (b) tokenizador longest-match em `TextRenderer`/`InteractiveTranscript`, habilitando frases clicáveis em texto corrido (`Learning Journey.md` §6); (c) Explore ganha podcast e artigo como tipos de conteúdo, reaproveitando o mesmo componente de transcrição. Também é quando os estados de Home completos (módulo/nível concluído) se justificam — só valem a pena quando há conteúdo suficiente (A2+) para "concluir um nível" ser um evento real, não hipotético.

### Comercial — fundação para escala
Backend real e contas de usuário (`PRODUCT.md` já registra login como V2) — todo o desenho de dados até aqui foi feito exatamente para essa transição custar pouco: cada `load*/save*` que hoje aponta para `localStorage` é o ponto de corte para apontar para uma API, sem mudar a superfície que os componentes consomem (`EXPLORE_ARCHITECTURE.md` §10). Sincronização entre dispositivos, expansão de conteúdo (mais níveis, mais idiomas), e qualquer decisão de monetização vivem aqui — nenhuma delas é um pré-requisito de UX ou arquitetura, são decisões de negócio que a base técnica já suporta quando chegar a hora.

---

## 6. Como usar este documento

Toda ideia nova passa por uma pergunta antes de virar tarefa: **ela fortalece um dos quatro pilares (Learn, Explore, Collect, Review) e o ciclo entre eles, ou só adiciona superfície?** Se a resposta exigir inventar um quinto pilar, um provider paralelo, uma cor de acento nova, ou um dado persistido que já poderia ser derivado — o princípio errado foi violado antes mesmo de a ideia ser boa ou ruim. Adiar é a resposta correta até a ideia se encaixar em uma das quatro caixas.
