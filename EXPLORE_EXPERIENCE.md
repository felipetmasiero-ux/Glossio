# Explore Experience — Documento de UX

> Este documento não é sobre arquitetura nem sobre componentes React. `EXPLORE_ARCHITECTURE.md` já decidiu os dados (`Video`, `Transcript`, `Token`); `Learning Journey.md` já decidiu como o Explore se conecta ao resto do app (`topic`, `nextStep`, Collections). Este documento decide **o que a pessoa sente e faz na tela**, momento a momento. Nada aqui é implementado nesta sprint.

## 0. Comentário estratégico — a regra de priorização

Adoto a regra proposta: **toda decisão de UX abaixo existe para tornar Learn → Explore → Review mais eficiente e natural, não para adicionar superfície.** Onde uma ideia comum de "app de vídeo" (grade de thumbnails, player cheio de botões, popup que trava a tela) entraria em conflito com isso, escolho o caminho mais contido — mesmo que pareça "menos feature". Isso está registrado explicitamente em cada seção onde a tentação óbvia seria copiar o padrão de YouTube/Netflix.

---

## 1. Como é a tela do Explore (o hub)

**Não é uma grade de thumbnails.** Uma grade de cards do mesmo tamanho já é o padrão que o `DESIGN.md` proíbe explicitamente para navegação primária ("Don't reintroduce a same-size icon+heading+text card grid") — e é também o padrão visual mais associado a "app de vídeo casual", o oposto do posicionamento do Glossio ("Depth over dopamine").

Em vez disso, o Explore usa **a mesma linha-índice que já organiza módulos e lições** (`/lessons`, `/lessons/module/:id`): cada vídeo é uma linha, não um cartão. A diferença em relação a uma lição é que aqui a miniatura carrega informação real (é o único frame que representa o conteúdo), então ela substitui o marcador numérico mono que uma linha de lição usaria — mas o resto da anatomia da linha é idêntico: miniatura pequena → título + tópico + criador → tags de nível e duração em mono (`--font-mono`, porque duração é literalmente um número) → chevron. Isso faz o Explore parecer "mais uma seção do mesmo livro", não um app diferente colado ao lado.

No topo do hub, um filtro por **idioma (herdado, não escolhido aqui) → nível → tópico** — os mesmos três eixos que já governam a recomendação (`Learning Journey.md` §4). O filtro é sempre visível, não escondido atrás de um menu, porque decidir "o que assistir" é a única tarefa dessa tela.

**O que não existe nesta tela:** contador de visualizações, "em alta", autoplay do próximo vídeo ao passar o mouse, qualquer sinal de engajamento social. Ferramentas de estudo sério não competem por atenção com esse vocabulário.

---

## 2. Como um vídeo é apresentado (a página do vídeo)

Layout de duas zonas, empilhadas no mobile e lado a lado em telas largas (mesmo container `--content-width-lg`, 960px, que a leitura de lição já usa por ser "conteúdo aninhado denso"):

- **Zona do player** — o vídeo, com metadados mínimos acima (título, criador, nível, tópico como tags mono/badge — não como texto solto).
- **Zona da transcrição** — o Interactive Transcript, descrito na seção 4.

A hierarquia visual não coloca o player como "o conteúdo" e a transcrição como "legenda secundária" — as duas são igualmente o produto. Um usuário que prefere ler mais do que assistir (comum em quem estuda idioma) deve conseguir tratar a transcrição como a superfície principal e o vídeo como acompanhamento sonoro, sem que o layout brigue com essa escolha.

---

## 3. Como funciona o player

O player **não tem a skin de um player de vídeo genérico** (barra de progresso vermelha, botão de tela cheia gigante, volume à direita, tudo em branco sobre preto puro estilo YouTube). Ele segue o vocabulário visual do resto do app:

- Controles em ink-blue (`--color-primary`) — o único acento interativo do sistema, mesma regra que rege botões e links em qualquer outra tela ("The One Ink Rule").
- Tempo atual / duração em mono (`0:42 / 3:15`) — é dado numérico real, mesma regra que já rege contadores de página/capítulo.
- Sem shadow decorativo nos controles; a única elevação (`--shadow-md`) aparece no hover, como qualquer outro elemento interativo do app.
- Velocidade de reprodução (0.75x / 1x) é um controle de primeira classe, não escondido em um menu de engrenagem — é a ferramenta mais usada por quem estuda por imersão, mais do que qualidade de vídeo ou legendas on/off (que aqui nem existem como opção, porque a transcrição *é* a legenda, sempre visível — ver seção 4).

A barra de progresso do vídeo é também clicável pela transcrição (ver seção 4) — não existem duas formas de navegar no tempo que não se falam.

---

## 4. Como o transcript aparece

O transcript não é uma caixa de legenda sobreposta ao vídeo (estilo CC) — é um painel de leitura full-height ao lado/abaixo do player, no texto serif de leitura (`Source Serif 4`), do mesmo tamanho e ritmo (`1.0625rem/1.75`) que qualquer outro texto longo do app (lição, verbete de dicionário). Ler a transcrição de um vídeo deve parecer, tipograficamente, a mesma atividade que ler uma lição — só o conteúdo muda.

Comportamento:

- **Segmento ativo** ganha o mesmo tratamento visual que o "grifo" de vocabulário já usa em lições: fundo `ink-primary-light`, texto na cor normal — não negrito, não uma cor nova. Segmentos passados e futuros ficam em `ink-text-secondary` (mais claros), para que o olho encontre o segmento atual sem esforço, como um teleprompter.
- **Auto-scroll** mantém o segmento ativo numa zona fixa de leitura (por exemplo, sempre no terço superior do painel) — a pessoa nunca precisa rolar manualmente para acompanhar.
- **Clicar em qualquer segmento (passado ou futuro) pula o vídeo para lá.** A transcrição não é passiva — é também o índice/scrubber do vídeo, reforçando que ler e assistir são a mesma navegação, não duas.
- **Rolar manualmente para cima** (para reler algo) pausa o auto-scroll sem pausar o vídeo — ele volta a seguir o áudio assim que a pessoa para de interagir. Rolar não deveria custar o lugar onde se estava assistindo.

---

## 5. Como o popup de palavras se comporta

Este é o ponto onde a experiência de Explore **precisa divergir** da experiência já existente em Learn, e a razão é UX, não técnica: o `WordPopup` de lições hoje é um overlay central que cobre a tela (correto lá, porque ler uma lição já é uma atividade de pausa-e-retomada). Um vídeo é uma atividade de atenção contínua — qualquer coisa que "trave a tela" quebra a imersão que é a proposta de valor inteira do Explore.

Regras:

- **O vídeo nunca pausa automaticamente ao clicar numa palavra.** Esse é o requisito não-negociável desta seção.
- O popup é um **balão ancorado à palavra clicada**, não um overlay central — aparece perto de onde o dedo/cursor está, como um tooltip rico, some ao tocar em qualquer outro lugar ou ao esperar alguns segundos sem interação.
- Conteúdo do balão é deliberadamente mais enxuto que o `WordPopup` de Learn: palavra + tradução + um único botão de ação (adicionar aos flashcards). Frase de exemplo e nota gramatical (que o `WordPopup` de Learn mostra) ficam atrás de um "ver mais" opcional dentro do próprio balão — não abrem uma tela nova. Ler uma explicação completa pode esperar; continuar assistindo, não.
- **Adicionar aos flashcards é uma ação de um toque**, sem confirmação, sem navegação. Um retorno visual discreto (o botão vira um check por um instante) é suficiente — não um toast que empurra o layout, não um modal de sucesso.
- Se a pessoa clica em várias palavras em sequência rápida (comum quando uma frase tem 2–3 palavras novas), cada clique deve poder abrir seu próprio balão sem fechar o anterior de forma abrupta — a leitura de uma frase densa em vocabulário novo não deveria virar uma sequência de cliques cancelando cliques.

---

## 6. Como o sistema indica palavras já conhecidas

A tentação óbvia é inventar uma segunda cor (ex: verde para "conhecida", azul para "nova") — isso quebraria a "One Ink Rule" do `DESIGN.md`, que reserva verde/vermelho estritamente para certo/errado em exercícios, nunca para categorização de vocabulário. A solução correta usa **presença/ausência do único acento**, não uma segunda cor:

- **Palavra clicável e ainda não aprendida** (existe no dicionário, não existe em nenhum flashcard do usuário): sublinhado pontilhado ink-blue — exatamente o `clickable-word` que já existe em `TextRenderer`. É o convite visual: "isto é novo, olhe aqui".
- **Palavra já aprendida** (existe um flashcard correspondente): continua clicável (pode reabrir o balão, pode revisar a tradução), mas **perde o sublinhado** e lê como texto comum. A leitura fica mais limpa à medida que o vocabulário do usuário cresce — o transcript de um vídeo revisitado depois de semanas de estudo deve visualmente "acalmar", com cada vez menos palavras destacadas, um sinal de progresso que não precisa de um contador numérico para ser sentido.
- **Palavra sem entrada no dicionário** (nomes próprios, gírias não catalogadas): texto comum, sem sublinhado — visualmente indistinguível de uma palavra já aprendida. Isso é intencional: o único sinal que existe na tela é "isto é aprendível agora", nunca "isto não existe" — a ausência de destaque nunca deveria parecer um erro ou uma lacuna.

Esse é o mesmo campo `known` que `EXPLORE_ARCHITECTURE.md` já definiu como **derivado**, nunca autorado — aqui só se decide como ele se traduz visualmente.

---

## 7. Como o usuário adiciona um flashcard sem interromper o vídeo

Consolidando as seções 3–6: o caminho completo é *ver a palavra sublinhada → tocar → balão aparece ancorado, vídeo continua → tocar em "adicionar" → balão confirma com um check → balão some sozinho ou ao próximo toque fora dele.* Em nenhum ponto desse caminho o vídeo pausa, a tela escurece, ou a pessoa é tirada da página do vídeo. O único estado persistente que muda é silencioso: na próxima vez que a palavra aparecer (neste vídeo ou em qualquer outro), ela já não terá mais o sublinhado.

---

## 8. Como é a transição entre vídeo e revisão

Ao final do vídeo (ou ao sair antes do fim, se houver progresso salvo o suficiente), aparece uma tela de conclusão — não uma tela nova inventada, mas **o mesmo padrão visual que a conclusão de exercícios já usa** (selo/carimbo de check, estatísticas em números mono, ação primária + link secundário). Reaproveitar esse padrão é o que faz "terminei um vídeo" e "terminei uma sessão de exercícios" parecerem o mesmo tipo de conquista, e não dois produtos diferentes.

Conteúdo da tela:

- Estatística central: quantas palavras foram clicadas e quantas foram salvas neste vídeo (não "tempo assistido" ou "vídeos completados hoje" — o valor de estudar não é consumir, é aprender vocabulário).
- **Ação primária depende de estado real, não é sempre a mesma:** se alguma das palavras salvas (aqui ou antes) já está vencida para revisão, a ação primária é "Revisar agora"; caso contrário, é "Continuar explorando" para um vídeo relacionado (`Learning Journey.md` §2/§4). Isso é a mesma regra de prioridade do `nextStep` do dashboard, só que aplicada no momento exato em que a pessoa acabou de estudar — o instante de maior disposição para continuar, não para decidir sozinha o que fazer.
- Ação secundária: link de volta ao hub do Explore, e (quando existir uma lição do mesmo tópico) um link discreto "aprenda a gramática por trás" — a ponte Explore → Learn descrita em `Learning Journey.md` §2.3, oferecida aqui, não empurrada.

---

## 9. Como essa experiência funciona igualmente para vídeos, podcasts e artigos

A resposta curta: **a superfície de leitura (texto + palavras clicáveis + sublinhado de "novo" + balão) é idêntica nos três; o que muda é só o que existe acima dela.**

| | Vídeo | Podcast | Artigo |
|---|---|---|---|
| O que ocupa a zona superior | Player de vídeo (seção 3) | Uma barra de áudio fina — sem quadro, sem imagem de capa dominante | Nada — não existe zona superior |
| O que dirige o segmento ativo | Tempo do vídeo | Tempo do áudio | Nenhum — não há "tempo"; o texto inteiro está igualmente disponível, sem destaque de progresso |
| Papel da transcrição | Acompanha o vídeo, também é scrubber | **É a tela principal** — sem imagem para competir por atenção, o texto ocupa o espaço que o vídeo ocuparia | É a tela inteira — mesma superfície `.paper-ruled` que uma lição já usa hoje |
| Como a pessoa "navega no tempo" | Toca no vídeo ou na transcrição | Toca na transcrição (não há quadro para tocar) | Não navega — rola como leitura comum |
| Popup de palavra, indicação de conhecida | Idêntico em todos — seções 5 e 6 não mudam uma linha |

O motivo disso funcionar é a decisão já tomada em `EXPLORE_ARCHITECTURE.md` §8: o componente de transcrição nunca depende de um elemento `<video>`, só de "qual é o trecho ativo agora" — para artigo, a resposta é simplesmente "todos, sempre". Um artigo, nesta lente, não é uma versão reduzida do Explore — é a versão do Explore sem relógio, e por isso deveria parecer, visualmente, indistinguível de uma lição de Learn sendo lida. Essa semelhança é proposital: reforça que Explore e Learn sempre foram o mesmo ato de ler e clicar em palavras, só com fontes de conteúdo diferentes.

---

## 10. O que esta experiência recusa (e por quê)

Uma lista curta e deliberada, porque é mais fácil manter disciplina de UX nomeando o que não entra:

- **Sem gamificação de consumo** (contadores de visualização, streaks de "dias assistindo vídeo" separados do streak de estudo já existente, badges de "maratonista"). O streak é um só, e já existe.
- **Sem autoplay entre vídeos.** A pessoa escolhe o próximo passo — mesmo que a sugestão certa esteja a um toque de distância (seção 8), o toque é dela.
- **Sem uma segunda cor de destaque.** Palavra clicável usa ink-blue; nada mais precisa de acento neste fluxo.
- **Sem interromper o vídeo para qualquer ação que não seja explicitamente pedida pela pessoa** (nem para "sugerir revisão", nem para pop-ups de progresso). O único momento de transição intencional é o fim do conteúdo (seção 8).
