import { pastWeekendBlocks } from "../../../grammar/shared/portuguese/a2/pastWeekend";
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

export const pastWeekendLesson = {

    id: "portuguese-a2-past-weekend",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "daily-routine",

    order: 1,

    title: "O Fim de Semana Passado",

    subtitle:
        "Conte o que você fez ontem e no fim de semana passado.",

    description:
        "Aprenda a narrar eventos passados com o pretérito perfeito, a estrutura mais importante para conversas do dia a dia em português.",

    cover: "/covers/past-weekend-a2.webp",

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

        "Conjugar verbos regulares no pretérito perfeito",

        "Usar as formas irregulares de 'ir', 'ser' e 'ter' no passado",

        "Contar o que aconteceu ontem ou na semana passada",

        "Perguntar a alguém sobre o fim de semana"

    ],

    vocabulary: vocabulary([
        "ontem",
        "semana passada",
        "fim de semana passado",
        "fiquei em casa",
        "saí",
        "assisti a",
        "viajei",
        "conheci",
        "aconteceu",
        "foi ótimo"
    ]),

    blocks: [

        heading("O Que Você Fez Ontem?"),

        paragraph(
            "No A1, você aprendeu a falar sobre o presente. Agora é hora de contar o que já aconteceu, usando o pretérito perfeito - o tempo verbal que os brasileiros mais usam no dia a dia para falar do passado."
        ),

        examples([
            {
                text: "Ontem eu acordei cedo e fui para o trabalho de bicicleta."
            },

            {
                text: "No fim de semana passado, nós viajamos para a praia e conhecemos uma cidade nova."
            },

            {
                text: "Ela ficou em casa e assistiu a um filme a noite toda."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "O que você fez no fim de semana passado?" },
            { speaker: "Marco", text: "Eu viajei para a praia com uns amigos. E você?" },
            { speaker: "Anna", text: "Eu fiquei em casa e assisti a uma série nova." },
            { speaker: "Marco", text: "Nossa, parece relaxante! Você saiu para algum lugar?" },
            { speaker: "Anna", text: "Só saí no domingo à noite para jantar. Foi ótimo!" }
        ]),

        grammar(pastWeekendBlocks[0].title, pastWeekendBlocks[0].text),

        list([

            "falar → falei, falou, falamos, falaram",

            "comer → comi, comeu, comemos, comeram",

            "ir / ser → fui, foi, fomos, foram",

            "ter → tive, teve, tivemos, tiveram"

        ]),

        tip(
            "'Ir' e 'Ser' Têm a Mesma Forma",
            "No pretérito perfeito, 'ir' e 'ser' se conjugam exatamente igual: 'fui, foi, fomos, foram'. O contexto que diz qual é qual: 'Fui à praia' (ir) vs. 'Fui estudante nessa escola' (ser)."
        ),

        culture(
            "Domingo em Família",
            "No Brasil, o domingo costuma ser reservado para a família - almoços longos, muitas vezes com churrasco, são uma tradição comum em várias regiões do país."
        ),

        quiz(
            "Qual é a forma correta de 'viajar' na primeira pessoa do pretérito perfeito?",
            ["viajei", "viajo", "viajarei", "viajava"],
            0,
            "'Viajar' é regular: eu viajei, você viajou, nós viajamos, eles viajaram."
        ),

        quiz(
            "Como se diz 'we went' em português?",
            ["fomos", "fui", "foi", "vamos"],
            0,
            "'Fomos' é a forma de 'nós' do pretérito perfeito de 'ir' (e também de 'ser')."
        ),

        quiz(
            "No diálogo, o que Anna fez no fim de semana passado?",
            ["Ficou em casa e assistiu a uma série", "Viajou para a praia", "Foi trabalhar", "Foi para a escola"],
            0,
            "Anna disse: 'Eu fiquei em casa e assisti a uma série nova.'"
        )

    ],

    summary: {

        tip:
            "Conte em voz alta o que você fez ontem e no fim de semana passado, usando pelo menos três verbos no pretérito perfeito.",

        review: [

            "falar → falei, falou, falamos, falaram",

            "ir / ser → fui, foi, fomos, foram",

            "ter → tive, teve, tivemos, tiveram",

            "ontem, semana passada, fim de semana passado"

        ]

    }

};
