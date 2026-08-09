# Explore French — Solicitação de Dados Reais (status)

Documento temporário de trabalho, não é documentação permanente do projeto. Coordena a coleta de dados reais para o Explore French. **7 vídeos já foram integrados** a `src/data/videos/french/index.js` com dados reais fornecidos por você (título/canal via oEmbed, duração e transcript colados do "Mostrar transcrição" do YouTube). 3 candidatos anteriores seguem pendentes/descartados abaixo.

## ⚠️ Risco em aberto: licença de direitos autorais

Levantado em 2026-08-09: incorporar via player/embed do YouTube é coberto pelos Termos de Serviço do YouTube, mas **copiar o transcript com timestamps para o banco do Glossio é um ato de reprodução separado**, que a Licença Padrão do YouTube não cobre — só vídeos em Creative Commons (CC BY) ou com autorização explícita do criador têm base segura. Nenhum dos 7 vídeos abaixo teve a licença confirmada como CC BY (não há como verificar isso com as ferramentas de pesquisa disponíveis - o campo `license` não vem no `oEmbed` nem na página estática). Decisão registrada: manter os 7 integrados por enquanto, mas essa verificação continua pendente - checar o painel "Mostrar mais" de cada vídeo no YouTube (ou aguardar a YouTube Data API key para checagem automática) antes de considerar isso resolvido.

## Integrados (7) — licença NÃO verificada, ver aviso acima

| id | title | channel | topic | level | duration | licença |
|---|---|---|---|---|---|---|
| `fr-a1-market` | 10 Minutes de Conversation Française Simple (A1-A2) | Tephanie French Words | food | A1 | 8:11 | *não verificada* |
| `fr-a1-weather` | How to talk about the weather (A1), ep. 58 | Simply French Podcast \| Easy French | weather | A1 | 14:31 | *não verificada* |
| `fr-a1-introduction` | Learn French Absolute Beginners A1#1 "Introduction" | French Comprehensible Input | introductions | A1 | 3:51 | *não verificada* |
| `fr-a1-switzerland` | Learn French in 2026 A1#2 "En Suisse" | French Comprehensible Input | countries | A1 | 5:12 | *não verificada* |
| `fr-a1-my-favorites` | Learn French in 2026 A1#3 "J'aime bien..." | French Comprehensible Input | hobbies | A1 | 6:36 | *não verificada* |
| `fr-a1-michael-jordan` | Learn French in 2026 A1#4 "Vous aimez ce sportif ?" | French Comprehensible Input | hobbies | A1 | 5:00 | *não verificada* |
| `fr-a1-daily-routine` | Learn French in 2026 A1#5 "Une routine" | French Comprehensible Input | daily-routine | A1 | 4:21 | *não verificada* |

Todos validados estruturalmente (timestamps crescentes, `endTime > startTime`, último segmento batendo com a duração real, nenhum segmento vazio) e confirmados funcionando via `VideoRepository.getAll("french")` e `getRelatedContent`. Validação estrutural ≠ validação de licença - ver aviso acima.

## Próximos candidatos: exigem licença confirmada antes de integrar

A partir de agora, nenhum vídeo novo entra em `french/index.js` sem licença CC BY confirmada (com atribuição) ou autorização explícita do criador documentada. Você vai gerar uma YouTube Data API key para eu checar o campo `license` (e a duração) de forma confiável via `videos.list?part=status,contentDetails` - assim que tiver a chave, me envie (não vai para o repositório, uso só em consultas pontuais).

## Ainda pendentes / em aberto

| # | title | channel | url | topic | o que falta |
|---|---|---|---|---|---|
| 6 | Dialogue-Dans un Magasin de Vêtements \| DELF A1, A2 Production Orale | Learn French | https://www.youtube.com/watch?v=oePO79IREZE | shopping | duração confirmada (5:26), mas falta o timestamp real do primeiro segmento ("bonjour madame je peux vous"), que não veio marcado no transcript colado |
| — | Tous les jours fériés en France - Débutants de zéro - A1 - A2 | Français avec Fluidité débutants | https://www.youtube.com/watch?v=twrixdd6T9k | não definido | existe (confirmado via oEmbed), mas não decidimos ainda que tópico ele preenche nem recebemos transcript/duração |
| — | (link não verificado) | — | https://www.youtube.com/watch?v=92lf16Eix18 | — | `oEmbed` retornou 403 Forbidden e a busca não encontrou o vídeo — precisa de confirmação/correção do link |

## Descartados (não usar)

| title | channel | motivo |
|---|---|---|
| French Greetings (French Essentials Lesson 1) | Learn French With Alexa | transcript colado tinha fortes indícios de ser legenda traduzida automaticamente (não a fala original) |
| Family Words in French Part 1 | Learn French With Alexa | transcript colado estava inteiramente em inglês — vídeo narrado em inglês, não serve como conteúdo de imersão em francês |
| Conversations au Restaurant Français pour Débutants \| A1-A2 | Say French \| Dites français | nunca recebi transcript/duração; ficou sem uso enquanto os 7 outros candidatos avançaram |
| Dialogue-Dans un Magasin de Vêtements (ver acima) | Learn French | ainda não descartado, só incompleto (ver pendências) |
| 25 Minutes... Asking for Directions | Le Français Facile | nunca recebi transcript/duração |
| 30 Minutes... Travel | FrancoTalks | nunca recebi transcript/duração |
| 25 Minutes... Hobbies | FrancoTalks | nunca recebi transcript/duração (substituído pelos 2 vídeos de hobbies do French Comprehensible Input) |

## Formato aceito (mesmo de sempre)

```
VIDEO N
duration: mm:ss

mm:ss
texto do segmento...
mm:ss
texto do próximo segmento...
```

Uso exatamente os timestamps e o texto colados — sem normalizar, arredondar ou completar nada.
