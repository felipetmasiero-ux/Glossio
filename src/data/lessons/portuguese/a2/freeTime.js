import {
    heading,
    paragraph,
    examples,
    dialogue,
    grammar,
    list,
    tip,
    culture,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const freeTimeLesson = {

    id: "portuguese-a2-free-time",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "hobbies",

    order: 7,

    title: "Tempo Livre",

    subtitle:
        "Expresse vontades e preferências com mais nuance.",

    description:
        "Aprenda a expressar vontade e preferência com 'ter vontade de', 'estar a fim de' e 'preferir', e a contrastar hábitos passados com eventos únicos.",

    cover: "/covers/free-time-a2.webp",

    estimatedTime: 10,

    difficulty: 2,

    xp: 35,

    tags: [
        "hobbies",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Expressar vontade com 'ter vontade de' e 'estar a fim de'",

        "Expressar preferência com 'preferir'",

        "Contrastar um hábito antigo com uma mudança recente",

        "Falar sobre como você gosta de passar o tempo livre"

    ],

    vocabulary: vocabulary([
        "ter vontade de",
        "estar a fim de",
        "preferir",
        "ao ar livre",
        "relaxar",
        "maratona de séries",
        "passatempo",
        "me divertir",
        "entediado",
        "praticar"
    ]),

    blocks: [

        heading("O Que Você Tem Vontade de Fazer?"),

        paragraph(
            "No A1, você aprendeu 'gostar de' para hobbies. Agora vamos expressar vontade e preferência de forma mais natural, do jeito que os brasileiros realmente falam no dia a dia."
        ),

        examples([
            {
                text: "Hoje eu não estou a fim de sair. Prefiro ficar em casa e assistir a uma maratona de séries."
            },

            {
                text: "Estou com vontade de praticar um esporte ao ar livre neste fim de semana."
            },

            {
                text: "Antigamente eu jogava futebol toda semana, mas agora prefiro relaxar em casa."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Estou entediada. Você está a fim de fazer alguma coisa hoje?" },
            { speaker: "Marco", text: "Estou com vontade de praticar algo ao ar livre. Que tal andar de bicicleta?" },
            { speaker: "Anna", text: "Prefiro um passatempo mais tranquilo, sinceramente. Que tal só relaxar no parque?" },
            { speaker: "Marco", text: "Combinado! Assim a gente se diverte sem se cansar demais." }
        ]),

        grammar(
            "Ter Vontade De / Estar a Fim De / Preferir",
            "'Ter vontade de' + infinitivo expressa desejo: 'Tenho vontade de viajar.' 'Estar a fim de' + infinitivo é mais informal, comum na fala: 'Estou a fim de sair.' 'Preferir' + infinitivo ou substantivo compara opções: 'Prefiro relaxar em casa.' / 'Prefiro chá a café.'"
        ),

        list([

            "ter vontade de + infinitivo → Tenho vontade de viajar.",

            "estar a fim de + infinitivo → Estou a fim de sair.",

            "preferir + infinitivo/substantivo → Prefiro relaxar.",

            "ficar entediado → Estou entediado."

        ]),

        tip(
            "Vontade vs. Fim",
            "'Ter vontade de' funciona em qualquer contexto, formal ou informal. 'Estar a fim de' é mais informal e comum entre amigos - evite usar em uma conversa formal ou profissional."
        ),

        culture(
            "Fim de Semana ao Ar Livre",
            "Em cidades como Rio de Janeiro, passar o fim de semana ao ar livre - na praia, em um parque ou fazendo esporte - é parte importante da cultura local, mesmo entre quem trabalha a semana toda."
        ),

        quiz(
            "Qual frase expressa vontade de forma correta?",
            ["Tenho vontade viajar.", "Tenho vontade de viajar.", "Tenho vontade para viajar.", "Tenho vontade viajando."],
            1,
            "'Ter vontade de' é sempre seguido pela preposição 'de' antes do infinitivo."
        ),

        quiz(
            "Qual expressão é mais informal, usada entre amigos?",
            ["ter vontade de", "estar a fim de", "preferir", "gostar de"],
            1,
            "'Estar a fim de' é uma expressão informal, típica da fala do dia a dia."
        ),

        quiz(
            "No diálogo, o que Anna prefere fazer?",
            ["Andar de bicicleta", "Um passatempo mais tranquilo, como relaxar no parque", "Ficar em casa sozinha", "Praticar um esporte competitivo"],
            1,
            "Anna disse: 'Prefiro um passatempo mais tranquilo, sinceramente.'"
        )

    ],

    summary: {

        tip:
            "Diga em voz alta três coisas que você tem vontade de fazer neste fim de semana, usando 'ter vontade de' e 'preferir'.",

        review: [

            "ter vontade de + infinitivo",

            "estar a fim de + infinitivo (informal)",

            "preferir + infinitivo/substantivo",

            "ao ar livre, relaxar, praticar"

        ]

    }

};
