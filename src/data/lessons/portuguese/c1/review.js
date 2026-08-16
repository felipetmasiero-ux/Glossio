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

export const c1ReviewLesson = {

    id: "portuguese-c1-review",

    language: "portuguese",

    level: "C1",

    category: "Review",

    topic: "review",

    order: 12,

    title: "Revisão C1 e Comunicação Avançada",

    subtitle:
        "Revise toda a gramática do módulo C1 em situações reais de negociação, debate e análise crítica.",

    description:
        "Uma revisão final combinando reformulação, nominalização, futuro do pretérito para informação não confirmada, concessão avançada, futuro do subjuntivo, orações reduzidas, construções passivas de atribuição, relativas formais, reprovação atenuada, estruturas nominais complexas e marcadores de nuance.",

    cover: "/covers/c1-review-pt.webp",

    estimatedTime: 17,

    difficulty: 5,

    xp: 60,

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

        "Revisar todos os pontos gramaticais do módulo C1",

        "Reconhecer e combinar múltiplas estruturas avançadas numa conversa real",

        "Testar-se com questões variadas de todas as lições",

        "Sentir-se pronto para se comunicar com precisão, nuance e fluência no nível C1"

    ],

    vocabulary: vocabulary([
        "numa encruzilhada",
        "em retrospecto",
        "colocar em xeque",
        "uma lacuna de conhecimento",
        "estar alinhado com",
        "parte interessada",
        "a ordem estabelecida",
        "um marco decisivo",
        "na vanguarda de",
        "uma zona cinzenta",
        "um alerta",
        "os sinais são claros",
        "desconfiar de algo",
        "uma intenção oculta",
        "um feito extraordinário",
        "emocionar profundamente",
        "aceitar uma situação difícil",
        "uma insegurança de fundo",
        "uma decisão sensata",
        "ponderar os prós e contras",
        "uma observação pertinente",
        "concordar em discordar"
    ]),

    blocks: [

        heading("Você Chegou ao Nível C1!"),

        paragraph(
            "Parabéns por terminar o módulo C1! Você aprendeu a discutir identidade, educação, liderança, sociedade, tecnologia, meio ambiente, mídia, cultura, psicologia, economia e argumentação com precisão, nuance e fluência de verdade. Esta lição reúne todas as estruturas juntas."
        ),

        examples([
            { text: "Eu vinha lidando com insegurança fazia anos — ou seja, eu precisava reencontrar o foco antes de chegar a esse marco decisivo." },
            { text: "Uma avaliação diferente é, sem dúvida, necessária, mas esse argumento continua condicionado a uma suposição mal fundamentada." },
            { text: "A diretoria tomaria essa decisão sem consultar as partes interessadas, mas nada ainda foi confirmado." },
            { text: "Por mais que a ordem estabelecida mudasse, alguns problemas estruturais provavelmente persistiriam." },
            { text: "Daqui a alguns anos, essa inovação na vanguarda da área provavelmente terá avançado sobre uma zona cinzenta ética." },
            { text: "Diante de um alerta tão claro, vários países finalmente começaram a conter suas emissões." },
            { text: "Foi dito que os números teriam sido selecionados convenientemente, então desconfio de tudo isso." },
            { text: "É um feito extraordinário sutil, o que realmente emocionou profundamente a crítica." },
            { text: "Não teria sido mais fácil me falar diretamente, em vez de remoer uma insegurança de fundo?" },
            { text: "Houve um aumento expressivo na demanda, mesmo que continuar cauteloso ainda seja uma decisão sensata por ora." },
            { text: "É uma observação pertinente, e até certo ponto concordo, mas é, sem dúvida, uma simplificação excessiva." }
        ]),

        dialogue([
            { speaker: "Letícia", text: "Faz tempo, hein! Como estão as coisas desde aquela encruzilhada ano passado?" },
            { speaker: "Gabriel", text: "Muito bem, na verdade. Em retrospecto, eu vinha lidando com bem mais insegurança do que percebia." },
            { speaker: "Letícia", text: "O que realmente mudou as coisas?" },
            { speaker: "Gabriel", text: "Sinceramente, um mentor apontou que todo o meu raciocínio estava condicionado a uma suposição mal fundamentada. Isso fez sentido de repente." },
            { speaker: "Letícia", text: "Raras são as pessoas que aceitam esse tipo de retorno tão bem." },
              { speaker: "Gabriel", text: "Tive ressalvas no início. Mas se eu não tivesse colocado isso em xeque, não estaria alinhado com meus objetivos hoje." },
            { speaker: "Letícia", text: "É uma observação pertinente. Passei por algo parecido no trabalho — estamos quase em conflito total sobre um novo projeto." },
            { speaker: "Gabriel", text: "Diante desse desacordo, qual é seu instinto?" },
            { speaker: "Letícia", text: "Até certo ponto, concordo com o outro lado, mas é, sem dúvida, uma simplificação excessiva do risco real." },
            { speaker: "Gabriel", text: "Parece um raciocínio bem construído. De fato, é exatamente esse tipo de nuance que eu tinha dificuldade de expressar antes." },
            { speaker: "Letícia", text: "Eu também. É um alerta real sobre como a precisão muda uma conversa." },
            { speaker: "Gabriel", text: "Totalmente de acordo. Considerando tudo, acho que a gente evoluiu bastante, os dois." }
        ]),

        list([

            "Reformulação e retomada textual: ou seja, isto é, em outras palavras",

            "Nominalização e registro acadêmico",

            "O futuro do pretérito para informação não confirmada",

            "Concessão avançada: por mais que, ainda que, não obstante",

            "Expressões de probabilidade avançada e o futuro do subjuntivo",

            "Orações reduzidas de gerúndio e particípio",

            "Construções passivas de atribuição: alega-se que, é apontado que",

            "Pronomes relativos formais: o qual, a qual, os quais",

            "Sugestão e reprovação atenuada",

            "Estruturas nominais complexas para descrever tendências",

            "Marcadores de nuance e atenuação argumentativa avançada"

        ]),

        quiz(
            "Qual marcador reformula a MESMA ideia com outras palavras?",
            ["por exemplo", "ou seja", "além disso", "por isso"],
            1,
            "'Ou seja' reformula a mesma ideia com outras palavras."
        ),

        quiz(
            "Escolha a versão nominalizada mais natural de \"Deveríamos avaliar os alunos de outro jeito.\"",
            ["Avaliamos os alunos de outro jeito.", "Uma avaliação diferente dos alunos é, sem dúvida, necessária.", "Avaliar os alunos de outro jeito é ruim.", "Os alunos são avaliados de outro jeito."],
            1,
            "Nominalizar 'avaliar' em 'avaliação' produz uma frase mais formal e acadêmica."
        ),

        quiz(
            "Qual frase relata uma informação não confirmada?",
            ["A empresa reduziu o quadro de funcionários.", "A empresa reduziria o quadro de funcionários.", "A empresa reduz o quadro de funcionários.", "A empresa vai reduzir o quadro de funcionários."],
            1,
            "O futuro do pretérito ('reduziria') sinaliza que a informação não está confirmada."
        ),

        quiz(
            "Complete: \"___ a cidade tenha investido muito, o problema persiste.\"",
            ["Apesar", "Por mais que", "Não obstante", "Por outro lado"],
            1,
            "'Por mais que' + subjuntivo enfatiza o esforço antes de contradizê-lo."
        ),

        quiz(
            "Complete: \"Quando essa tecnologia ___ acessível, tudo vai mudar.\" (se tornar)",
            ["se torna", "se tornar", "se tornará", "se tornaria"],
            1,
            "Depois de 'quando' referindo-se ao futuro, usamos o futuro do subjuntivo."
        ),

        quiz(
            "Escolha a oração reduzida correta.",
            ["Confrontado com a escassez, os governos agiram tarde.", "Confrontados com a escassez, os governos agiram tarde.", "Confrontando a escassez, os governos agiram tarde.", "Confronte a escassez, os governos agiram tarde."],
            1,
            "'Confrontados' concorda com o sujeito implícito plural 'os governos'."
        ),

        quiz(
            "Qual construção atribui uma informação sem citar a fonte?",
            ["Ela disse que sabia do problema.", "Alega-se que a empresa sabia do problema.", "A empresa sabia do problema.", "A empresa admitiu o problema."],
            1,
            "'Alega-se que' atribui a informação a uma fonte vaga, sem confirmá-la como fato."
        ),

        quiz(
            "Escolha a forma correta: \"a atriz ___ o filme se tornou famoso\".",
            ["ao qual", "pela qual", "ao quais", "pelo qual"],
            1,
            "'Pela qual' concorda no feminino singular com 'a atriz'."
        ),

        quiz(
            "Escolha a estrutura correta para uma reprovação atenuada.",
            ["Você tem que me avisar.", "Você podia ter ao menos me avisado.", "Me avisa da próxima vez!", "Você nunca avisa nada."],
            1,
            "'Você podia ter ao menos me avisado' é uma reprovação atenuada."
        ),

        quiz(
            "Escolha a versão nominal mais natural de \"Os preços subiram muito.\"",
            ["Os preços subiram.", "Houve um aumento expressivo dos preços.", "Os preços estão subindo muito agora.", "Muita coisa aconteceu com os preços."],
            1,
            "'Houve um aumento expressivo dos preços' é a estrutura nominal complexa do português formal/econômico."
        ),

        quiz(
            "Escolha a expressão que sinaliza concordância parcial antes de uma objeção.",
            ["Concordo totalmente.", "Até certo ponto, concordo, mas...", "Discordo completamente.", "Isso é obviamente errado."],
            1,
            "'Até certo ponto, concordo, mas...' sinaliza concordância parcial antes de uma objeção."
        ),

        tip(
            "Continue Praticando",
            "A melhor forma de consolidar a gramática do C1 é usá-la em argumentos e conversas reais. Tente discutir um assunto complexo e veja quantas dessas estruturas você consegue combinar naturalmente, com nuance e precisão."
        ),

        culture(
            "Chegando ao Nível C1",
            "O CEFR descreve o nível C1 como o do usuário proficiente: você consegue entender textos longos e exigentes, captar sentidos implícitos, se expressar com fluência e espontaneidade, e usar o idioma de forma flexível em contextos sociais, acadêmicos e profissionais. A partir daqui, o português se torna uma ferramenta de comunicação genuinamente versátil — não só para se fazer entender, mas para persuadir, analisar e se conectar com nuance real."
        )

    ],

    summary: {

        tip:
            "Muito bem! Revise os pontos de gramática que achou mais difíceis, e continue praticando com argumentos e conversas reais.",

        review: [

            "Você terminou 11 lições do módulo C1.",

            "Você consegue argumentar, negociar e analisar com muito mais precisão.",

            "Você combinou reformulação, futuro do pretérito para informação não confirmada, concessão avançada, discurso passivo e marcadores de nuance.",

            "Você atingiu o nível C1 — um usuário proficiente do português!"

        ]

    }

};
