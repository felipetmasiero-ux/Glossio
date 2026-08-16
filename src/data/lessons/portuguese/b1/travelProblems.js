import { travelProblemsBlocks } from "../../../grammar/shared/portuguese/b1/travelProblems";
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

export const travelProblemsLesson = {

    id: "portuguese-b1-travel-problems",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "travel-problems",

    order: 5,

    title: "Viagens e Situações Inesperadas",

    subtitle:
        "Conte histórias de viagem e imprevistos combinando pretérito perfeito, imperfeito e conectores de sequência narrativa.",

    description:
        "Aprenda vocabulário de viagem e imprevistos, e como encadear ações no passado usando conectores como 'primeiro', 'de repente' e 'no final'.",

    cover: "/covers/travel-problems-pt.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "travel",
        "narração",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Falar sobre problemas de viagem e situações imprevistas",

        "Combinar o pretérito perfeito e o imperfeito para contar uma história completa",

        "Usar conectores de sequência narrativa",

        "Usar 'de repente' para um acontecimento inesperado"

    ],

    vocabulary: vocabulary([
        "roteiro",
        "conexão",
        "voo cancelado",
        "voo atrasado",
        "bagagem extraviada",
        "overbooking",
        "se queixar de",
        "com defeito",
        "preso",
        "desvio",
        "perder-se",
        "pedir informação sobre o caminho",
        "ficar sem",
        "preso no trânsito",
        "perder a conexão",
        "seguro viagem",
        "mochila",
        "viagem de carro",
        "imprevisto",
        "virar-se"
    ]),

    blocks: [

        heading("Contando um Perrengue de Viagem"),

        paragraph(
            "Para contar uma história completa, encadeamos as ações no pretérito perfeito sobre um fundo de imperfeito. E para não repetir sempre 'depois, depois, depois', usamos conectores de sequência: 'primeiro', 'em seguida', 'de repente', 'no final'."
        ),

        examples([
            { text: "Estávamos esperando no aeroporto quando anunciaram que o voo estava cancelado." },
            { text: "Primeiro perdemos a mala, depois, de repente, o táxi quebrou no meio do caminho." },
            { text: "O táxi se perdeu enquanto a gente tentava encontrar o hotel." },
            { text: "Fomos para Salvador no verão passado, e ficamos lá uma semana." },
            { text: "Tinha muitos turistas, e a gente não estava acostumado com isso." },
            { text: "Ficamos presos no aeroporto por seis horas por causa do atraso." },
            { text: "No final, encontramos nossas malas e conseguimos pegar o próximo voo." }
        ]),

        dialogue([
            { speaker: "Renata", text: "Você não vai acreditar no que aconteceu na minha última viagem." },
            { speaker: "Gustavo", text: "O que foi?" },
            { speaker: "Renata", text: "A gente estava fazendo o check-in quando disseram que o voo estava com overbooking!" },
            { speaker: "Gustavo", text: "Sério? E aí, o que vocês fizeram?" },
            { speaker: "Renata", text: "Tivemos que esperar o próximo voo. E enquanto esperávamos, ainda perderam nossa bagagem." },
            { speaker: "Gustavo", text: "Que horror! Vocês conseguiram recuperar?" },
            { speaker: "Renata", text: "No final, sim. Mas ficamos presos no aeroporto por quase seis horas." },
            { speaker: "Gustavo", text: "Nossa, deve ter sido estressante. Minha pior lembrança de viagem foi me perder dirigindo na serra." },
            { speaker: "Renata", text: "Sério? Como você se virou?" },
            { speaker: "Gustavo", text: "A gente pediu informação sobre o caminho pra umas pessoas da região. Elas nos ajudaram bastante." }
        ]),

        grammar(travelProblemsBlocks[0].title, travelProblemsBlocks[0].text),

        list([

            "primeiro / depois / em seguida — sequência",

            "de repente — acontecimento inesperado",

            "no final — conclusão",

            "perfeito + imperfeito para narrar"

        ]),

        tip(
            "Não Use o Imperfeito para uma Ação Rápida",
            "Não use o imperfeito para uma ação rápida e terminada — use o perfeito. 'Eu estava perdendo meu passaporte' está errado; diga 'Eu perdi meu passaporte.' O imperfeito é para ações contínuas, não eventos únicos e rápidos."
        ),

        culture(
            "Histórias de Viagem",
            "Contar 'as piores histórias de viagem' é um assunto de conversa muito comum no Brasil, especialmente entre pessoas que viajam bastante — é quase um ritual social conhecer alguém trocando essas histórias."
        ),

        quiz(
            "Escolha a frase correta.",
            [
                "Eu estava perdendo meu passaporte no aeroporto.",
                "Eu perdi meu passaporte no aeroporto.",
                "Eu estava perder meu passaporte.",
                "Eu tenho perdido meu passaporte ontem."
            ],
            1,
            "Para uma ação rápida e terminada, use o pretérito perfeito: 'Eu perdi meu passaporte.'"
        ),

        quiz(
            "Complete: \"Nós ___ jantando quando o alarme de incêndio tocou.\"",
            ["estávamos", "fomos", "temos estado", "estamos"],
            0,
            "O imperfeito ('estávamos jantando') descreve a ação em andamento que foi interrompida."
        ),

        quiz(
            "Qual conector indica algo inesperado?",
            ["primeiro", "depois", "de repente", "no final"],
            2,
            "'De repente' indica um acontecimento inesperado."
        )

    ],

    summary: {

        tip:
            "Pratique contando um perrengue de viagem, real ou inventado, usando conectores para organizar a sequência dos acontecimentos.",

        review: [

            "perfeito + imperfeito — contar uma história",

            "primeiro / depois / de repente / no final",

            "bagagem extraviada, voo cancelado, preso, desvio",

            "perder-se, virar-se, imprevisto"

        ]

    }

};
