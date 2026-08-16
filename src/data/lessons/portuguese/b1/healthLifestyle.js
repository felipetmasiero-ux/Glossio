import { healthLifestyleBlocks } from "../../../grammar/shared/portuguese/b1/healthLifestyle";
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

export const healthLifestyleLesson = {

    id: "portuguese-b1-health-lifestyle",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "health-lifestyle",

    order: 6,

    title: "Saúde, Hábitos e Estilo de Vida",

    subtitle:
        "Dê conselhos de saúde e estilo de vida usando o imperativo afirmativo e negativo.",

    description:
        "Aprenda vocabulário de saúde e estilo de vida, e como usar o imperativo para dar conselhos e recomendações diretas.",

    cover: "/covers/health-lifestyle-pt.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "health",
        "imperativo",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Falar sobre hábitos e bem-estar",

        "Usar o imperativo afirmativo para dar conselhos",

        "Usar o imperativo negativo para recomendar o que evitar",

        "Discutir estresse, sono e hábitos saudáveis"

    ],

    vocabulary: vocabulary([
        "estilo de vida",
        "alimentação equilibrada",
        "comida industrializada",
        "fazer exercício",
        "manter-se em forma",
        "estresse",
        "estressado",
        "esgotamento",
        "privação de sono",
        "reduzir o consumo de",
        "parar de fumar",
        "dormir o suficiente",
        "saúde mental",
        "bem-estar",
        "em forma",
        "fora de forma",
        "fazer uma pausa",
        "cuidar de si mesmo",
        "hábito saudável",
        "mudança de hábito"
    ]),

    blocks: [

        heading("Dando Conselhos de Saúde"),

        paragraph(
            "O imperativo é a forma mais direta de dar um conselho ou uma instrução em português. Com 'você', ele usa a mesma forma do presente do subjuntivo, tanto na afirmativa quanto na negativa."
        ),

        examples([
            { text: "Durma mais, sério, senão você vai se esgotar." },
            { text: "Coma de forma equilibrada para se manter em forma." },
            { text: "Não pule o café da manhã de novo — você sempre fica tonto depois." },
            { text: "Faça uma pausa de vez em quando." },
            { text: "Não trabalhe tanto sem descansar." },
            { text: "Beba bastante água ao longo do dia." },
            { text: "Cuide de si mesmo, você merece." }
        ]),

        dialogue([
            { speaker: "Sabrina", text: "Você está com uma cara cansada ultimamente." },
            { speaker: "Igor", text: "É, tenho andado bem estressado no trabalho. Acho que estou com privação de sono." },
            { speaker: "Sabrina", text: "Durma mais, sério — isso faz muita diferença." },
            { speaker: "Igor", text: "Eu sei, eu sei. Mas meu estilo de vida anda tão corrido." },
            { speaker: "Sabrina", text: "Então diminua o ritmo, senão você vai acabar ficando doente. Reduza também o consumo de café, talvez." },
            { speaker: "Igor", text: "Você tem razão. Acho que preciso cuidar mais de mim mesmo." },
            { speaker: "Sabrina", text: "Exatamente. E faça um pouco de exercício também — ajuda muito contra o estresse." },
            { speaker: "Igor", text: "Combinado. Vou tentar fazer uma pausa todo dia, pelo menos." }
        ]),

        grammar(healthLifestyleBlocks[0].title, healthLifestyleBlocks[0].text),

        list([

            "imperativo afirmativo (você) — forma do subjuntivo",

            "imperativo negativo — sempre subjuntivo",

            "durma, coma, beba, cuide-se",

            "estressado, esgotamento, bem-estar"

        ]),

        tip(
            "Mesma Forma do Subjuntivo",
            "O imperativo com 'você' usa a mesma forma do presente do subjuntivo, não do presente do indicativo. Não diga 'Você dorme mais' como conselho direto — diga 'Durma mais'."
        ),

        culture(
            "Conselhos de Saúde no Brasil",
            "No Brasil, é comum que até amigos próximos deem conselhos de saúde de forma bem direta — 'vai no médico' é uma frase corriqueira entre amigos, não só algo que um profissional diria."
        ),

        quiz(
            "Escolha a forma correta do imperativo: \"Não ___ tão tarde.\" (dormir)",
            ["dorme", "durma", "dormiu", "dormia"],
            1,
            "O imperativo negativo usa o presente do subjuntivo: 'não durma'."
        ),

        quiz(
            "Qual modo o imperativo com \"você\" usa?",
            ["indicativo", "subjuntivo", "condicional", "infinitivo"],
            1,
            "O imperativo com 'você' usa a mesma forma do presente do subjuntivo."
        ),

        quiz(
            "Escolha a frase no imperativo afirmativo.",
            ["Você bebe mais água.", "Beba mais água.", "Você bebeu mais água.", "Beber mais água."],
            1,
            "'Beba mais água' é a forma correta do imperativo afirmativo com 'você'."
        )

    ],

    summary: {

        tip:
            "Pratique dando conselhos de saúde a um amigo usando o imperativo: 'Durma mais', 'Não fume', 'Cuide-se'.",

        review: [

            "imperativo afirmativo e negativo — forma do subjuntivo",

            "durma, coma, beba, cuide-se",

            "estressado, esgotamento, bem-estar",

            "reduzir o consumo de, fazer uma pausa"

        ]

    }

};
