import {
    heading,
    paragraph,
    examples,
    dialogue,
    tip,
    culture,
    list,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const b2ReviewLesson = {

    id: "portuguese-b2-review",

    language: "portuguese",

    level: "B2",

    category: "Review",

    topic: "review",

    order: 12,

    title: "Revisão B2 e Comunicação Real",

    subtitle:
        "Revise toda a gramática do módulo B2 em situações reais de argumentação, negociação e análise crítica.",

    description:
        "Uma revisão final combinando arrependimento no passado, voz passiva com 'se', hipóteses irreais, conectores de concessão e causa, discurso indireto avançado, ênfase, negociação, proporcionalidade e modalização.",

    cover: "/covers/b2-review-pt.webp",

    estimatedTime: 16,

    difficulty: 5,

    xp: 55,

    tags: [
        "review",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Revisar todos os pontos gramaticais do módulo B2",

        "Reconhecer e combinar múltiplas estruturas avançadas numa conversa real",

        "Testar-se com questões variadas de todas as lições",

        "Sentir-se pronto para se comunicar com sofisticação e precisão no nível B2"

    ],

    vocabulary: vocabulary([
        "reinventar-se",
        "abrir mão de",
        "grade curricular",
        "capacitação",
        "espírito de equipe",
        "burnout",
        "disparidade social",
        "engajamento cívico",
        "aprendizado de máquina",
        "dilema ético",
        "crise climática",
        "transição energética",
        "desinformação",
        "senso crítico",
        "protagonista",
        "impacto duradouro",
        "chegar a um consenso",
        "vínculo",
        "poder de compra",
        "planejamento financeiro",
        "argumento sólido",
        "matizar uma opinião"
    ]),

    blocks: [

        heading("Você Chegou ao Nível B2!"),

        paragraph(
            "Parabéns por terminar o módulo B2! Você aprendeu a discutir desenvolvimento pessoal, educação, carreira, sociedade, tecnologia, meio ambiente, mídia, cultura, relacionamentos, economia e argumentação com muito mais precisão e nuance. Esta lição reúne todas as estruturas juntas."
        ),

        examples([
            { text: "Se eu tivesse me reinventado antes, teria evitado esse burnout." },
            { text: "Discute-se muito sobre disparidade social, mas é preciso que a gente aja de verdade." },
            { text: "Se o aprendizado de máquina avançasse rápido demais, criaria um dilema ético sério." },
            { text: "Já que a crise climática é real, a transição energética é uma medida urgente." },
            { text: "O especialista alegou que a desinformação tinha aumentado nos últimos meses." },
            { text: "Foi aquele protagonista que deu um impacto duradouro à história." },
            { text: "Que tal chegarmos a um consenso antes de romper esse vínculo?" },
            { text: "Quanto mais planejamos nosso orçamento, mais nosso poder de compra melhora." },
            { text: "Por um lado, esse argumento é sólido; por outro lado, é bem possível que exista uma exceção." },
            { text: "Prefiro matizar minha opinião a fazer uma generalização precipitada." },
            { text: "Embora tenhamos discordado no início, o senso crítico de todos ajudou a chegar a uma conclusão melhor." }
        ]),

        dialogue([
            { speaker: "Juliana", text: "Faz tempo que a gente não se via! Como estão as coisas desde que você se reinventou profissionalmente?" },
            { speaker: "Marcelo", text: "Muito melhor. Se eu tivesse esperado mais um ano, acho que teria tido um burnout de verdade." },
            { speaker: "Juliana", text: "Imagino. E como está a nova empresa? Tem mais espírito de equipe?" },
            { speaker: "Marcelo", text: "Tem sim. Embora a hierarquia ainda exista, discute-se muito mais sobre feedback construtivo por lá." },
            { speaker: "Juliana", text: "Que bom. Eu ando lendo bastante sobre aprendizado de máquina — é bem possível que mude tudo na nossa área em poucos anos." },
              { speaker: "Marcelo", text: "Concordo, mas ainda existe um dilema ético grande por trás disso. Até onde eu sei, a regulamentação está bem atrasada." },
            { speaker: "Juliana", text: "Verdade. Por outro lado, se não houvesse inovação nenhuma, muita coisa boa também não teria acontecido." },
            { speaker: "Marcelo", text: "Justo. E você, continua engajada naquele projeto sobre crise climática?" },
            { speaker: "Juliana", text: "Continuo. Já que a transição energética é urgente, acho que cada engajamento cívico conta." },
            { speaker: "Marcelo", text: "Com certeza. Foi essa sua dedicação que sempre me impressionou em você." },
            { speaker: "Juliana", text: "Que gentil. Na verdade, acho que chegamos a um consenso: ainda temos muito trabalho pela frente, mas estamos no caminho certo." }
        ]),

        list([

            "Futuro do pretérito composto e imperfeito do subjuntivo para arrependimento",

            "A voz passiva com 'se' e construções impessoais",

            "Futuro do pretérito composto para hipóteses no passado e registro profissional",

            "Conectores de concessão e oposição: embora, apesar de, ao passo que",

            "Período hipotético irreal: se + imperfeito do subjuntivo, futuro do pretérito",

            "Conectores de causa e consequência: já que, por isso, de modo que",

            "Discurso indireto avançado e verbos de elocução",

            "Estruturas de ênfase: foi... que, o que... é",

            "Linguagem de negociação e sugestão em conflitos",

            "Comparações avançadas e proporcionalidade",

            "Marcadores discursivos e modalização"

        ]),

        quiz(
            "Complete: \"Se eu ___ sabido, teria feito diferente.\" (ter)",
            ["tenho", "tivesse", "tiver", "teria"],
            1,
            "Numa hipótese sobre o passado, usamos o imperfeito do subjuntivo ('tivesse') na oração com 'se'."
        ),

        quiz(
            "Escolha a frase na voz passiva com 'se'.",
            ["Os professores ensinam teoria.", "Ensina-se muita teoria.", "A teoria foi ensinada.", "Alguém ensina teoria."],
            1,
            "'Ensina-se muita teoria' usa a partícula apassivadora 'se'."
        ),

        quiz(
            "Complete: \"Eu ___ aceitado a proposta, mas o salário era baixo.\" (aceitar)",
            ["aceitaria", "teria", "tinha aceitado", "teria aceitado"],
            3,
            "O futuro do pretérito composto ('teria aceitado') descreve uma hipótese sobre uma decisão que já passou."
        ),

        quiz(
            "Qual opção completa: \"___ a cidade tenha crescido, a desigualdade continua.\"",
            ["Apesar de", "Embora", "Por outro lado", "Ao passo que"],
            1,
            "'Embora' + subjuntivo introduz uma concessão."
        ),

        quiz(
            "Complete: \"Se a IA ___ todos os empregos, o que faríamos?\" (substituir)",
            ["substitui", "substituir", "substituísse", "substituiria"],
            2,
            "No período hipotético irreal, usamos o imperfeito do subjuntivo ('substituísse')."
        ),

        quiz(
            "Qual conector apresenta uma causa já conhecida?",
            ["por isso", "de modo que", "já que", "portanto"],
            2,
            "'Já que' apresenta uma causa já conhecida, geralmente no início da frase."
        ),

        quiz(
            "Discurso direto: \"Estou pronto.\" Qual é a versão no discurso indireto (verbo no passado)?",
            ["Ele disse que está pronto.", "Ele disse que estava pronto.", "Ele disse que esteve pronto.", "Ele diz que estava pronto."],
            1,
            "O presente vira imperfeito no discurso indireto quando o verbo introdutório está no passado."
        ),

        quiz(
            "Complete a estrutura de ênfase: \"___ aquele livro ___ mudou minha visão de mundo.\"",
            ["Foi / que", "É / que", "Foi / o que", "Era / que"],
            0,
            "'Foi + elemento destacado + que' é a estrutura correta de ênfase."
        ),

        quiz(
            "Qual frase sugere uma alternativa de forma colaborativa?",
            ["Você sempre faz errado.", "E se a gente dividisse as tarefas de outro jeito?", "Isso é culpa sua.", "Eu não vou mudar nada."],
            1,
            "'E se a gente...' propõe uma alternativa sem acusar ninguém."
        ),

        quiz(
            "Complete: \"___ os preços sobem, o consumo tende a cair.\"",
            ["Quanto", "À medida que", "Apesar de", "Embora"],
            1,
            "'À medida que' indica uma mudança gradual e proporcional."
        ),

        quiz(
            "Qual expressão indica maior grau de certeza?",
            ["é bem possível que", "talvez", "não há dúvida de que", "pode ser que"],
            2,
            "'Não há dúvida de que' + indicativo expressa o maior grau de certeza."
        ),

        tip(
            "Continue Praticando",
            "A melhor forma de consolidar a gramática do B2 é usá-la em argumentos e conversas reais. Tente discutir um assunto complexo e veja quantas dessas estruturas você consegue combinar naturalmente, com nuance e precisão."
        ),

        culture(
            "Chegando ao Nível B2",
            "O CEFR descreve o nível B2 como o do usuário independente avançado: você consegue entender textos complexos, argumentar sobre temas abstratos, interagir com fluência em situações profissionais e defender um ponto de vista com precisão. É um marco importante — a partir daqui, você está pronto para se comunicar com muito mais autonomia em português."
        )

    ],

    summary: {

        tip:
            "Muito bem! Revise os pontos de gramática que achou mais difíceis, e continue praticando com argumentos e conversas reais.",

        review: [

            "Você terminou 11 lições do módulo B2.",

            "Você consegue argumentar, negociar e analisar criticamente com mais precisão.",

            "Você combinou arrependimento, voz passiva com 'se', hipóteses irreais, discurso indireto avançado, ênfase e modalização.",

            "Você atingiu o nível B2 — o de usuário independente avançado do português!"

        ]

    }

};
