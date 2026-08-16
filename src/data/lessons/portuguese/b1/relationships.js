import { relationshipsBlocks } from "../../../grammar/shared/portuguese/b1/relationships";
import {
    heading,
    paragraph,
    examples,
    dialogue,
    grammar,
    tip,
    culture,
    list,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const relationshipsLesson = {

    id: "portuguese-b1-relationships",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "relationships",

    order: 3,

    title: "Pessoas, Personalidade e Relacionamentos",

    subtitle:
        "Descreva pessoas e relacionamentos usando os pronomes relativos que, quem, onde e cujo.",

    description:
        "Aprenda vocabulário de personalidade e relacionamentos, e como usar os pronomes relativos que, quem, onde e cujo para descrever pessoas, lugares e posse.",

    cover: "/covers/relationships-pt.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 35,

    tags: [
        "relationships",
        "personality",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Descrever a personalidade de alguém em detalhes",

        "Falar sobre amizades e relacionamentos",

        "Usar os pronomes relativos que, quem, onde e cujo",

        "Escolher o pronome relativo certo conforme a função na frase"

    ],

    vocabulary: vocabulary([
        "personalidade",
        "confiável",
        "extrovertido",
        "fácil de conviver",
        "teimoso",
        "dar-se bem com",
        "amigo próximo",
        "conhecido",
        "confiar em",
        "briga",
        "reconciliar-se",
        "estar num relacionamento",
        "terminar um relacionamento",
        "tirar alguém do sério",
        "solidário",
        "honesto",
        "senso de humor",
        "rancoroso",
        "cúmplice",
        "companheiro"
    ]),

    blocks: [

        heading("Descrevendo Pessoas e Relações"),

        paragraph(
            "Para descrever uma pessoa, um lugar ou uma coisa com mais precisão, usamos os pronomes relativos: 'que' para pessoas ou coisas, 'quem' para pessoas (geralmente após preposição), 'onde' para lugares, e 'cujo/cuja' para indicar posse."
        ),

        examples([
            { text: "É a amiga que sempre me faz rir, mesmo nos momentos difíceis." },
            { text: "É o café onde a gente se conheceu pela primeira vez." },
            { text: "Não confio em pessoas que nunca admitem seus erros." },
            { text: "É a pessoa com quem eu mais converso sobre tudo." },
            { text: "Tivemos uma briga que durou o fim de semana inteiro." },
            { text: "É o colega cuja opinião eu mais respeito no trabalho." },
            { text: "É o tipo de pessoa que todo mundo gosta." }
        ]),

        dialogue([
            { speaker: "Bianca", text: "Você conheceu a namorada nova do Bruno?" },
            { speaker: "Thiago", text: "Conheci sim, ela é bem extrovertida. É o tipo de pessoa que conversa com todo mundo numa festa." },
            { speaker: "Bianca", text: "É verdade! O Bruno costuma ser tímido, mas ela traz um lado diferente dele." },
            { speaker: "Thiago", text: "Eles se conheceram naquele café onde a gente sempre vai estudar, sabia?" },
            { speaker: "Bianca", text: "Sério? Mundo pequeno! Espero que eles se deem bem — o Bruno pode ser meio teimoso às vezes." },
            { speaker: "Thiago", text: "É verdade, mas ele também é uma das pessoas mais honestas e confiáveis que eu conheço." },
            { speaker: "Bianca", text: "Concordo total. Só espero que eles não tenham muitas brigas por besteira." },
            { speaker: "Thiago", text: "Tenho certeza que vai dar tudo certo. Eles parecem se dar muito bem." }
        ]),

        grammar(relationshipsBlocks[0].title, relationshipsBlocks[0].text),

        list([

            "que — pessoas ou coisas",

            "quem — pessoas, geralmente após preposição",

            "onde — lugares",

            "cujo/cuja — posse, concorda com a coisa possuída"

        ]),

        tip(
            "Cujo Concorda com a Coisa Possuída",
            "'Cujo' concorda em gênero e número com a coisa possuída, não com o dono: 'o amigo cuja irmã...' (irmã é feminino, então 'cuja'), mesmo que 'amigo' seja masculino. É um erro comum até para brasileiros."
        ),

        culture(
            "Descrever Pessoas com Sinceridade",
            "Entre amigos próximos no Brasil, descrever a personalidade de alguém com sinceridade — mesmo mencionando um defeito como 'teimoso' — geralmente é visto como sinal de carinho, não de maldade."
        ),

        quiz(
            "Escolha o pronome certo: \"É a pessoa ___ me ajudou ano passado.\"",
            ["quem", "que", "onde", "cujo"],
            1,
            "'Que' é usado como sujeito da oração: 'que me ajudou'."
        ),

        quiz(
            "Escolha a frase correta.",
            [
                "É o restaurante que a gente jantou.",
                "É o restaurante onde a gente jantou.",
                "É o restaurante quem a gente jantou.",
                "É o restaurante cujo a gente jantou."
            ],
            1,
            "'Onde' introduz um lugar: 'o restaurante onde a gente jantou'."
        ),

        quiz(
            "Qual pronome indica posse?",
            ["que", "quem", "onde", "cujo"],
            3,
            "'Cujo' indica posse e concorda com a coisa possuída."
        )

    ],

    summary: {

        tip:
            "Pratique descrevendo pessoas que você conhece com 'que', lugares com 'onde', e pessoas de quem você fala com 'quem'.",

        review: [

            "que / quem / onde / cujo",

            "que = pessoas ou coisas; quem = pessoas (após preposição)",

            "confiável, extrovertido, teimoso, solidário",

            "dar-se bem com, terminar, reconciliar-se"

        ]

    }

};
