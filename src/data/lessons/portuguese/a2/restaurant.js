import { restaurantBlocks } from "../../../grammar/shared/portuguese/a2/restaurant";
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

export const restaurantLesson = {

    id: "portuguese-a2-restaurant",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "restaurant",

    order: 9,

    title: "No Restaurante",

    subtitle:
        "Faça pedidos educados e peça recomendações.",

    description:
        "Aprenda a usar 'poderia' para pedidos educados e o vocabulário essencial para pedir comida em um restaurante.",

    cover: "/covers/restaurant-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "restaurant",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Fazer pedidos educados usando 'poderia'",

        "Pedir recomendações ao garçom",

        "Pedir a conta e falar sobre gorjeta",

        "Descrever como você quer que a comida seja preparada"

    ],

    vocabulary: vocabulary([
        "poderia",
        "cardápio",
        "garçom",
        "recomendar",
        "a conta, por favor",
        "gorjeta",
        "sobremesa",
        "ao ponto",
        "sem gelo",
        "trazer"
    ]),

    blocks: [

        heading("Poderia Me Trazer o Cardápio?"),

        paragraph(
            "No A1, você aprendeu 'eu gostaria' para pedir algo. Agora vamos usar 'poderia' para fazer pedidos ainda mais educados, e o vocabulário necessário para pedir comida em um restaurante."
        ),

        examples([
            {
                text: "Poderia me trazer o cardápio, por favor?"
            },

            {
                text: "O que você recomenda? Eu gostaria de algo com peixe."
            },

            {
                text: "A carne, por favor, ao ponto, e a água sem gelo."
            }
        ]),

        dialogue([
            { speaker: "Garçom", text: "Boa noite! Aqui está o cardápio. O que vão pedir?" },
            { speaker: "Anna", text: "Poderia recomendar um prato principal?" },
            { speaker: "Garçom", text: "O peixe grelhado está ótimo hoje. E para beber?" },
            { speaker: "Marco", text: "Duas águas, uma delas sem gelo, por favor. E poderia trazer a conta com a sobremesa?" }
        ]),

        grammar(restaurantBlocks[0].title, restaurantBlocks[0].text),

        list([

            "Poderia me trazer o cardápio?",

            "Poderia recomendar um prato?",

            "A conta, por favor.",

            "ao ponto / sem gelo"

        ]),

        tip(
            "Gorjeta no Brasil",
            "Em muitos restaurantes brasileiros, a gorjeta de 10% (a 'taxa de serviço') já vem incluída na conta. Ainda assim, é comum perguntar 'A taxa de serviço está incluída?' antes de decidir se vai deixar mais."
        ),

        culture(
            "Refeições Sem Pressa",
            "No Brasil, é comum a refeição em um restaurante durar bastante tempo - pedir a conta rápido demais pode até parecer estranho. O garçom normalmente espera você pedir a conta, em vez de trazê-la sem perguntar."
        ),

        quiz(
            "Qual é a forma mais educada de pedir algo?",
            ["Traz o cardápio.", "Pode trazer o cardápio?", "Poderia trazer o cardápio?", "Traga cardápio!"],
            2,
            "'Poderia' é a forma mais educada e formal para fazer um pedido."
        ),

        quiz(
            "Como se pede um bife médio, nem muito cru nem muito passado?",
            ["mal passado", "ao ponto", "bem passado", "sem gelo"],
            1,
            "'Ao ponto' é o termo para um bife no ponto médio de cozimento."
        ),

        quiz(
            "No diálogo, o que o garçom recomenda?",
            ["A sobremesa", "O peixe grelhado", "A água sem gelo", "O cardápio inteiro"],
            1,
            "O garçom disse: 'O peixe grelhado está ótimo hoje.'"
        )

    ],

    summary: {

        tip:
            "Pratique um pedido completo em um restaurante em voz alta: cumprimente o garçom, peça uma recomendação e peça a conta usando 'poderia'.",

        review: [

            "Poderia + infinitivo (pedido educado)",

            "cardápio, garçom, recomendar",

            "a conta, por favor · gorjeta",

            "ao ponto, sem gelo, sobremesa"

        ]

    }

};
