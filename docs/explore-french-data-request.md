# Explore French — Encerrado (removido por risco de direitos autorais)

Documento temporário de trabalho, não é documentação permanente do projeto. Registra o histórico da tentativa de popular o Explore French e por que foi revertida.

## Decisão (2026-08-10): remover os 7 vídeos, pausar o Explore como prioridade

O usuário checou manualmente a descrição ("Mostrar mais") de cada um dos 7 vídeos integrados e não encontrou nenhuma menção a Creative Commons — ou seja, todos estão sob a Licença Padrão do YouTube por padrão. Incorporar via player é coberto pelos Termos de Serviço do YouTube, mas o Glossio armazenava o **transcript com timestamps** no próprio banco (necessário para a busca de palavra clicável/dicionário/flashcard) — isso é um ato de reprodução separado, que a Licença Padrão não cobre.

Decisão tomada em conjunto: **remover os 7 vídeos** (`src/data/videos/french/index.js` voltou a `[]]`) e **não investir mais esforço no Explore por enquanto** - não só pelo risco jurídico, mas porque o produto está em estágio de validação (poucos usuários reais) e não há evidência ainda de que o Explore gera retenção o suficiente para justificar o esforço de curadoria + verificação de licença por vídeo.

Nota registrada durante essa decisão: a mesma pergunta de licença (transcript armazenado = reprodução, não coberta por embed) se aplicava, em teoria, aos 31 vídeos de English já existentes no catálogo antes desta sessão - eles nunca tinham sido auditados quanto a isso.

## Atualização (2026-08-10): English resolvido também

Em vez de deixar essa nota como pendência em aberto, o campo `transcript` dos 31 vídeos de English foi zerado (`transcript: []` em `src/data/videos/english/index.js`), mesma solução aplicada ao francês antes de removê-lo: mantém o vídeo, o embed, a curadoria (título/nível/tópico/descrição) e a contagem pra streak/dashboard, só sem a reprodução do texto do transcript. `InteractiveTranscript` já tratava `transcript: []` como estado válido antes dessa mudança (mostra "Transcrição indisponível"), então nenhum componente foi alterado - só o dado. Nenhum outro trecho do app lê `video.transcript` além de `InteractiveTranscript`/`normalizeVideo.js` (confirmado por busca global), então a mudança é isolada por construção.

Com isso, o problema de transcript/licenciamento está **encerrado** para os dois idiomas - não é mais uma pendência em aberto.

## Vídeos removidos (7)

| id | title | channel | motivo da remoção |
|---|---|---|---|
| `fr-a1-market` | 10 Minutes de Conversation Française Simple (A1-A2) | Tephanie French Words | licença não-CC confirmada (Standard License) |
| `fr-a1-weather` | How to talk about the weather (A1), ep. 58 | Simply French Podcast \| Easy French | licença não-CC confirmada |
| `fr-a1-introduction` | Learn French Absolute Beginners A1#1 "Introduction" | French Comprehensible Input | licença não-CC confirmada |
| `fr-a1-switzerland` | Learn French in 2026 A1#2 "En Suisse" | French Comprehensible Input | licença não-CC confirmada |
| `fr-a1-my-favorites` | Learn French in 2026 A1#3 "J'aime bien..." | French Comprehensible Input | licença não-CC confirmada |
| `fr-a1-michael-jordan` | Learn French in 2026 A1#4 "Vous aimez ce sportif ?" | French Comprehensible Input | licença não-CC confirmada |
| `fr-a1-daily-routine` | Learn French in 2026 A1#5 "Une routine" | French Comprehensible Input | licença não-CC confirmada |

Se o Explore French for retomado no futuro, esses 7 continuam sendo candidatos de conteúdo válidos (transcript/timestamps já processados, ver histórico deste arquivo no git) - só falta autorização explícita do criador ou confirmação real de CC BY antes de reintegrar.

## Candidatos nunca integrados (mantidos como referência, mesmo status de antes)

| # | title | channel | url | pendência |
|---|---|---|---|---|
| — | Dialogue-Dans un Magasin de Vêtements \| DELF A1, A2 Production Orale | Learn French | https://www.youtube.com/watch?v=oePO79IREZE | além da licença, faltava o timestamp do primeiro segmento |
| — | Tous les jours fériés en France - Débutants de zéro - A1 - A2 | Français avec Fluidité débutants | https://www.youtube.com/watch?v=twrixdd6T9k | tópico não definido, sem transcript/duração |
| — | (link não verificado) | — | https://www.youtube.com/watch?v=92lf16Eix18 | `oEmbed` retornou 403, vídeo não confirmado |

## Se o Explore French for retomado

Não integrar nenhum vídeo novo sem licença CC BY confirmada (com atribuição) ou autorização explícita do criador documentada aqui. A YouTube Data API key mencionada em versões anteriores deste documento nunca chegou a ser gerada - continua sendo o caminho mais confiável para checar o campo `license` de forma sistemática, caso essa iniciativa volte a ser prioridade.
