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

export const feelingsLesson = {

    id: "portuguese-a2-feelings",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "feelings",

    order: 8,

    title: "Como Você Está Se Sentindo",

    subtitle:
        "Expresse emoções e mudanças de estado.",

    description:
        "Aprenda a usar 'ficar + adjetivo' para descrever mudanças de estado emocional, e o superlativo com '-íssimo'.",

    cover: "/covers/feelings-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "feelings",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Usar 'ficar + adjetivo' para mudanças de estado emocional",

        "Diferenciar 'ficar' de 'estar' e 'ser'",

        "Usar o superlativo com '-íssimo'",

        "Descrever reações a situações do dia a dia"

    ],

    vocabulary: vocabulary([
        "ficar feliz",
        "ficar triste",
        "ficar nervoso",
        "ficar surpreso",
        "animado",
        "preocupado",
        "aliviado",
        "com raiva",
        "felizíssimo",
        "do nada"
    ]),

    blocks: [

        heading("Fiquei Muito Feliz!"),

        paragraph(
            "Em português, 'ficar' é usado com adjetivos para mostrar uma mudança de estado - uma reação a algo que aconteceu. É diferente de 'estar' (um estado atual) e 'ser' (uma característica permanente)."
        ),

        examples([
            {
                text: "Quando recebi a notícia, fiquei felizíssimo!"
            },

            {
                text: "Ela ficou preocupada quando o filho não atendeu o telefone."
            },

            {
                text: "Do nada, ele ficou com raiva e saiu da sala."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Você parece animado hoje! Aconteceu alguma coisa?" },
            { speaker: "Marco", text: "Fiquei felizíssimo! Passei na entrevista de emprego." },
            { speaker: "Anna", text: "Que ótimo! Você não estava nervoso antes?" },
            { speaker: "Marco", text: "Estava muito nervoso, mas agora estou aliviado que acabou." }
        ]),

        grammar(
            "Ficar + Adjetivo",
            "'Ficar' + adjetivo mostra uma mudança de estado, uma reação: 'Fiquei feliz com a notícia' (antes eu não estava feliz, algo mudou isso). Compare com 'estar' (estado atual, sem foco na mudança) e 'ser' (característica permanente): 'Ele é tímido' (característica) vs. 'Ele ficou tímido na frente de todos' (reação)."
        ),

        list([

            "ficar feliz / triste / nervoso / surpreso",

            "ficar com raiva",

            "felizíssimo, tristíssimo (superlativo: -íssimo)",

            "do nada → sem motivo aparente"

        ]),

        tip(
            "Superlativo com -íssimo",
            "Para dizer 'muito feliz' de forma mais expressiva, use o sufixo '-íssimo': feliz → felizíssimo, triste → tristíssimo. É mais forte e mais natural do que dizer 'muito muito feliz'."
        ),

        culture(
            "Expressando Emoções Abertamente",
            "Em muitas regiões do Brasil, é comum e bem visto expressar emoções abertamente - abraçar, comemorar em voz alta ou mostrar tristeza sem tentar esconder, diferente de culturas mais reservadas."
        ),

        quiz(
            "Qual frase mostra uma mudança de estado emocional?",
            ["Ele é feliz.", "Ele ficou feliz com a notícia.", "Ele está de feliz.", "Ele faz feliz."],
            1,
            "'Ficar + adjetivo' indica uma mudança, uma reação a algo que aconteceu."
        ),

        quiz(
            "Qual é o superlativo de 'triste'?",
            ["mais triste", "tristessímo", "tristíssimo", "muito triste"],
            2,
            "O sufixo '-íssimo' se junta ao radical do adjetivo: triste → tristíssimo."
        ),

        quiz(
            "No diálogo, por que Marco ficou felizíssimo?",
            ["Porque encontrou um amigo", "Porque passou na entrevista de emprego", "Porque ganhou um presente", "Porque tirou férias"],
            1,
            "Marco disse: 'Passei na entrevista de emprego.'"
        )

    ],

    summary: {

        tip:
            "Conte uma situação recente em que você ficou feliz, surpreso ou nervoso, usando 'ficar + adjetivo'.",

        review: [

            "ficar + adjetivo (mudança de estado)",

            "ficar vs. estar vs. ser",

            "feliz → felizíssimo (superlativo -íssimo)",

            "animado, preocupado, aliviado, com raiva"

        ]

    }

};
