import { pastHabitsBlocks } from "../../../grammar/shared/portuguese/a2/pastHabits";
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

export const pastHabitsLesson = {

    id: "portuguese-a2-past-habits",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "past-habits",

    order: 6,

    title: "Antigamente",

    subtitle:
        "Fale sobre como as coisas eram e o que você costumava fazer.",

    description:
        "Aprenda o pretérito imperfeito para descrever hábitos passados e como as coisas costumavam ser.",

    cover: "/covers/past-habits-a2.webp",

    estimatedTime: 10,

    difficulty: 2,

    xp: 35,

    tags: [
        "grammar",
        "past tense",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Conjugar verbos regulares no pretérito imperfeito",

        "Descrever hábitos e rotinas do passado",

        "Comparar o presente com o passado",

        "Diferenciar quando usar o pretérito perfeito e o imperfeito"

    ],

    vocabulary: vocabulary([
        "antigamente",
        "quando eu era criança",
        "costumava",
        "morava",
        "brincava",
        "estudava",
        "não tinha",
        "tudo era diferente",
        "mudou",
        "bairro"
    ]),

    blocks: [

        heading("Como Era Antes"),

        paragraph(
            "Na lição anterior você aprendeu a narrar um evento único no passado (o pretérito perfeito). Agora vamos falar de hábitos e situações repetidas no passado, usando o pretérito imperfeito - por exemplo, como era a sua infância."
        ),

        examples([
            {
                text: "Quando eu era criança, eu morava em um bairro pequeno e brincava na rua todo dia."
            },

            {
                text: "Antigamente, as pessoas não tinham celular e escreviam cartas."
            },

            {
                text: "Eu estudava à noite, mas isso mudou depois que comecei a trabalhar de manhã."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Como era o seu bairro quando você era criança?" },
            { speaker: "Marco", text: "Antigamente era bem tranquilo. Eu brincava na rua com os vizinhos todo dia." },
            { speaker: "Anna", text: "E hoje? Ainda é assim?" },
            { speaker: "Marco", text: "Não, tudo mudou. Hoje tem muito mais carros, e as crianças não brincam tanto na rua." }
        ]),

        grammar(pastHabitsBlocks[0].title, pastHabitsBlocks[0].text),

        list([

            "morar → morava, morava, morávamos, moravam",

            "comer → comia, comia, comíamos, comiam",

            "ser → era, era, éramos, eram",

            "ter → tinha, tinha, tínhamos, tinham"

        ]),

        tip(
            "Perfeito vs. Imperfeito",
            "Use o pretérito perfeito para um evento único ('Ontem eu fui à praia') e o imperfeito para um hábito repetido ('Antigamente eu ia à praia todo fim de semana'). Compare: 'mudou' (um momento específico) vs. 'costumava mudar' (um hábito)."
        ),

        culture(
            "A Rua Como Espaço de Infância",
            "Muitos brasileiros que cresceram nas décadas de 1980 e 1990 lembram de brincar na rua com vizinhos - um hábito que se tornou menos comum nas grandes cidades por causa do trânsito e da segurança."
        ),

        quiz(
            "Qual frase descreve um hábito do passado corretamente?",
            ["Ontem eu brincava na rua.", "Quando eu era criança, eu brincava na rua.", "Amanhã eu brincava na rua.", "Eu brinco na rua ontem."],
            1,
            "O imperfeito é usado para hábitos repetidos, como 'Quando eu era criança, eu brincava na rua.'"
        ),

        quiz(
            "Qual é a forma de 'ter' no imperfeito para 'nós'?",
            ["temos", "tivemos", "tínhamos", "teremos"],
            2,
            "'Ter' no imperfeito: tinha, tinha, tínhamos, tinham."
        ),

        quiz(
            "No diálogo, o que mudou no bairro de Marco, segundo ele?",
            ["Agora tem mais carros e menos crianças brincando na rua", "Agora é mais tranquilo do que antes", "Não mudou nada", "Agora tem menos carros"],
            0,
            "Marco disse: 'Hoje tem muito mais carros, e as crianças não brincam tanto na rua.'"
        )

    ],

    summary: {

        tip:
            "Descreva em voz alta como era a sua rotina quando você era criança, usando pelo menos três verbos no imperfeito.",

        review: [

            "morar → morava, morava, morávamos, moravam",

            "ser → era, era, éramos, eram",

            "ter → tinha, tinha, tínhamos, tinham",

            "perfeito (evento único) vs. imperfeito (hábito repetido)"

        ]

    }

};
