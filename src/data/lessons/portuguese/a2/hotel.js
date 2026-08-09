import { hotelBlocks } from "../../../grammar/shared/portuguese/a2/hotel";
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

export const hotelLesson = {

    id: "portuguese-a2-hotel",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "hotel",

    order: 10,

    title: "Reservando um Hotel",

    subtitle:
        "Lide com imprevistos e situações hipotéticas simples.",

    description:
        "Aprenda a estrutura 'se + presente, + futuro' para lidar com situações reais e hipotéticas em um hotel.",

    cover: "/covers/hotel-a2.webp",

    estimatedTime: 10,

    difficulty: 2,

    xp: 35,

    tags: [
        "hotel",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Usar a estrutura 'se + presente, + futuro'",

        "Fazer o check-in e o check-out em um hotel",

        "Reclamar educadamente sobre um problema no quarto",

        "Descrever o tipo de quarto que você quer"

    ],

    vocabulary: vocabulary([
        "recepção",
        "fazer o check-in",
        "fazer o check-out",
        "quarto de casal",
        "vista para o mar",
        "reclamar",
        "barulho",
        "toalha",
        "vaga",
        "diária"
    ]),

    blocks: [

        heading("Se Tiver um Problema..."),

        paragraph(
            "Em uma viagem, é comum precisar resolver imprevistos: pedir mais uma toalha, reclamar de barulho ou perguntar sobre vaga em um hotel cheio. Para falar sobre isso, usamos a estrutura 'se + presente, + futuro'."
        ),

        examples([
            {
                text: "Se tiver barulho à noite, vou reclamar na recepção."
            },

            {
                text: "Se o quarto de casal não estiver pronto, esperaremos no saguão."
            },

            {
                text: "Se não houver vaga, procuraremos outro hotel na região."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Boa tarde, gostaria de fazer o check-in. Reservei um quarto de casal com vista para o mar." },
            { speaker: "Recepcionista", text: "Um momento... se o elevador estiver ocupado, vocês podem usar a escada até o segundo andar." },
            { speaker: "Marco", text: "Sem problema. E se precisarmos de mais uma toalha?" },
            { speaker: "Recepcionista", text: "Se precisarem de qualquer coisa, é só ligar para a recepção." }
        ]),

        grammar(hotelBlocks[0].title, hotelBlocks[0].text),

        list([

            "Se tiver barulho, vou reclamar na recepção.",

            "Se precisarem de algo, é só ligar.",

            "Se não houver vaga, procuraremos outro hotel.",

            "quarto de casal, vista para o mar, diária"

        ]),

        tip(
            "'Haver' no Lugar de 'Ter'",
            "Em contextos mais formais, como recepções de hotel, 'houver' (de 'haver') substitui 'ter' para dizer 'existir': 'Se não houver vaga...' em vez de 'Se não tiver vaga...'. As duas formas são entendidas, mas 'houver' soa mais formal."
        ),

        culture(
            "Diária e Café da Manhã",
            "No Brasil, é comum hotéis anunciarem o preço por 'diária' (uma noite de hospedagem), muitas vezes já incluindo o café da manhã - vale sempre confirmar isso na hora da reserva."
        ),

        quiz(
            "Qual frase usa a estrutura condicional corretamente?",
            ["Se tem barulho, eu reclamo.", "Se tiver barulho, vou reclamar.", "Se ter barulho, eu reclamarei.", "Se tinha barulho, eu reclamaria."],
            1,
            "A estrutura correta é 'se' + presente do indicativo + futuro: 'Se tiver barulho, vou reclamar.'"
        ),

        quiz(
            "O que significa 'diária' em um hotel?",
            ["O preço de uma noite de hospedagem", "O café da manhã", "A vista do quarto", "A recepção"],
            0,
            "'Diária' é o valor cobrado por cada noite de estadia."
        ),

        quiz(
            "No diálogo, o que a recepcionista sugere se o elevador estiver ocupado?",
            ["Esperar no saguão", "Usar a escada até o segundo andar", "Trocar de quarto", "Ligar para a recepção"],
            1,
            "A recepcionista disse: 'se o elevador estiver ocupado, vocês podem usar a escada até o segundo andar.'"
        )

    ],

    summary: {

        tip:
            "Imagine três imprevistos possíveis em uma viagem e diga em voz alta o que você faria, usando 'se + presente, + futuro'.",

        review: [

            "se + presente, + futuro",

            "fazer o check-in / fazer o check-out",

            "quarto de casal, vista para o mar, diária",

            "reclamar, barulho, toalha, vaga"

        ]

    }

};
