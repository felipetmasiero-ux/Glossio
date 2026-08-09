import { healthBlocks } from "../../../grammar/shared/portuguese/a2/health";
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

export const healthLesson = {

    id: "portuguese-a2-health",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "health",

    order: 3,

    title: "Saúde e Bem-estar",

    subtitle:
        "Descreva sintomas e dê conselhos de saúde.",

    description:
        "Aprenda a falar sobre sintomas comuns e a dar conselhos usando 'dever + infinitivo'.",

    cover: "/covers/health-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "health",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Descrever sintomas comuns",

        "Usar 'dever + infinitivo' para dar conselhos",

        "Marcar uma consulta médica",

        "Pedir remédio na farmácia"

    ],

    vocabulary: vocabulary([
        "dor de cabeça",
        "dor de garganta",
        "febre",
        "gripe",
        "remédio",
        "farmácia",
        "consultório",
        "marcar uma consulta",
        "dever",
        "descansar"
    ]),

    blocks: [

        heading("O Que Você Deve Fazer?"),

        paragraph(
            "Todo mundo precisa falar sobre saúde de vez em quando - descrever um sintoma, pedir remédio na farmácia ou dar um conselho para um amigo doente. O verbo 'dever' é a forma mais comum de dar conselhos em português."
        ),

        examples([
            {
                text: "Estou com dor de cabeça e dor de garganta desde ontem."
            },

            {
                text: "Você deve descansar e beber bastante água."
            },

            {
                text: "Se a febre não passar, você deve marcar uma consulta."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Estou com febre e dor de garganta. Acho que peguei uma gripe." },
            { speaker: "Marco", text: "Você deve descansar hoje e não deve ir trabalhar." },
            { speaker: "Anna", text: "Tem razão. Vou passar na farmácia comprar um remédio." },
            { speaker: "Marco", text: "Boa ideia. E se não melhorar amanhã, você deve marcar uma consulta." }
        ]),

        grammar(healthBlocks[0].title, healthBlocks[0].text),

        list([

            "Você deve descansar.",

            "Você não deve trabalhar hoje.",

            "Ele deve beber água.",

            "Nós devemos marcar uma consulta."

        ]),

        tip(
            "'Estar com' + Sintoma",
            "Para descrever sintomas, use 'estar com': 'Estou com dor de cabeça.' / 'Estou com febre.' Não diga 'Eu tenho dor de cabeça agora' - 'estar com' é a forma natural para sintomas temporários."
        ),

        culture(
            "Farmácias no Brasil",
            "No Brasil, farmácias costumam ter um farmacêutico disponível para orientar sobre remédios simples, e é comum comprar analgésicos e outros medicamentos sem receita médica para sintomas leves."
        ),

        quiz(
            "Qual frase dá um conselho corretamente?",
            ["Você deveria de descansar.", "Você deve descansar.", "Você deve a descansar.", "Você deve descansando."],
            1,
            "'Dever' é seguido diretamente pelo infinitivo, sem preposição: 'Você deve descansar.'"
        ),

        quiz(
            "Como se descreve um sintoma em português?",
            ["Eu tenho com dor de cabeça.", "Eu sou com febre.", "Eu estou com dor de garganta.", "Eu faço febre."],
            2,
            "Sintomas usam 'estar com': 'Eu estou com dor de garganta.'"
        ),

        quiz(
            "No diálogo, o que Marco sugere que Anna faça se não melhorar?",
            ["Ir trabalhar mesmo assim", "Marcar uma consulta", "Tomar mais remédio sem parar", "Ignorar a febre"],
            1,
            "Marco disse: 'Se não melhorar amanhã, você deve marcar uma consulta.'"
        )

    ],

    summary: {

        tip:
            "Descreva um sintoma em voz alta e dê um conselho usando 'dever + infinitivo' para resolver o problema.",

        review: [

            "estar com + sintoma (dor de cabeça, febre, gripe)",

            "dever + infinitivo (Você deve descansar.)",

            "remédio, farmácia, consultório",

            "marcar uma consulta"

        ]

    }

};
