import { makingPlansBlocks } from "../../../grammar/shared/portuguese/a2/makingPlans";
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

export const makingPlansLesson = {

    id: "portuguese-a2-making-plans",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "plans",

    order: 11,

    title: "Fazendo Planos",

    subtitle:
        "Convide, combine e expresse intenção futura.",

    description:
        "Aprenda a convidar alguém, combinar planos e expressar intenção futura com 'pretender' e 'estar pensando em'.",

    cover: "/covers/making-plans-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "plans",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Convidar alguém para um evento ou atividade",

        "Expressar intenção futura com 'pretender' e 'estar pensando em'",

        "Combinar detalhes de um plano (dia, hora, lugar)",

        "Confirmar ou cancelar um plano"

    ],

    vocabulary: vocabulary([
        "pretender",
        "estar pensando em",
        "convidar",
        "combinar",
        "marcar",
        "topar",
        "tanto faz",
        "confirmar",
        "cancelar",
        "ficou combinado"
    ]),

    blocks: [

        heading("Vamos Combinar Alguma Coisa?"),

        paragraph(
            "Combinar planos com amigos é uma das situações mais comuns do dia a dia. Vamos aprender a convidar, aceitar, e expressar intenções futuras de forma natural."
        ),

        examples([
            {
                text: "Estou pensando em marcar um jantar no sábado. Você topa?"
            },

            {
                text: "Eu pretendo viajar no próximo feriado, ainda não decidi para onde."
            },

            {
                text: "Vamos combinar o horário depois - por mim, tanto faz de manhã ou à tarde."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Estou pensando em convidar a turma para um jantar. Você topa?" },
            { speaker: "Marco", text: "Topo! Que dia você está pensando?" },
            { speaker: "Anna", text: "Sábado à noite. Posso marcar num restaurante perto da sua casa." },
            { speaker: "Marco", text: "Perfeito, então ficou combinado. Se algo mudar, eu confirmo com você antes." }
        ]),

        grammar(makingPlansBlocks[0].title, makingPlansBlocks[0].text),

        list([

            "pretender + infinitivo → Pretendo viajar.",

            "estar pensando em + infinitivo → Estou pensando em viajar.",

            "combinar / marcar → combinar um jantar, marcar um horário",

            "confirmar / cancelar um plano"

        ]),

        tip(
            "'Topar' é Informal",
            "'Topar' é uma forma informal e muito comum de aceitar um convite: 'Você topa ir ao cinema?' - 'Topo!' Evite usar em situações formais; nesses casos, prefira 'aceitar' ou 'concordar'."
        ),

        culture(
            "Combinar Sem Hora Marcada",
            "Em encontros informais entre amigos no Brasil, é comum combinar 'mais ou menos' um horário e confirmar os detalhes finais por mensagem no mesmo dia, em vez de marcar tudo com muita antecedência."
        ),

        quiz(
            "Qual frase expressa uma intenção ainda não decidida?",
            ["Eu pretendo viajar em julho.", "Estou pensando em viajar.", "Eu vou viajar em julho.", "Eu viajei em julho."],
            1,
            "'Estar pensando em' expressa uma ideia ainda incerta, diferente de 'pretender', que é mais firme."
        ),

        quiz(
            "Como se aceita um convite de forma informal?",
            ["Concordo.", "Topo!", "Confirmo.", "Cancelo."],
            1,
            "'Topar' é a forma informal e comum de aceitar um convite entre amigos."
        ),

        quiz(
            "No diálogo, o que Anna está pensando em fazer?",
            ["Cancelar o jantar", "Convidar a turma para um jantar", "Viajar no fim de semana", "Marcar uma consulta"],
            1,
            "Anna disse: 'Estou pensando em convidar a turma para um jantar.'"
        )

    ],

    summary: {

        tip:
            "Convide um amigo imaginário para algo em voz alta, usando 'estar pensando em' e combine o dia e o horário.",

        review: [

            "pretender + infinitivo (intenção firme)",

            "estar pensando em + infinitivo (ideia incerta)",

            "convidar, combinar, marcar",

            "topar, confirmar, cancelar"

        ]

    }

};
