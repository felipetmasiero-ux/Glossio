import { directionsBlocks } from "../../../grammar/shared/portuguese/a2/directions";
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

export const directionsLesson = {

    id: "portuguese-a2-directions",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "transportation",

    order: 5,

    title: "Como Chegar Lá",

    subtitle:
        "Peça e dê direções, e use o transporte público.",

    description:
        "Aprenda a pedir e dar direções usando o imperativo, e o vocabulário essencial de transporte urbano.",

    cover: "/covers/directions-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "transportation",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Pedir direções na rua",

        "Dar direções usando o imperativo",

        "Usar vocabulário de transporte público",

        "Entender instruções de como chegar a um lugar"

    ],

    vocabulary: vocabulary([
        "atravessar",
        "virar",
        "quadra",
        "esquina",
        "pegar o ônibus",
        "descer",
        "metrô",
        "ponto de ônibus",
        "siga",
        "vá"
    ]),

    blocks: [

        heading("Onde Fica Isso?"),

        paragraph(
            "Pedir e entender direções é essencial quando você está em uma cidade nova. Para dar instruções diretas, o português usa o imperativo - a forma de comando dos verbos."
        ),

        examples([
            {
                text: "Vá em frente por duas quadras e vire à direita na esquina."
            },

            {
                text: "Atravesse a rua e o ponto de ônibus fica do outro lado."
            },

            {
                text: "Pegue o metrô até a estação central e desça lá."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Com licença, como faço para chegar à estação de metrô?" },
            { speaker: "Marco", text: "Siga em frente por uma quadra e vire à esquerda na esquina." },
            { speaker: "Anna", text: "Certo. E depois?" },
            { speaker: "Marco", text: "Atravesse a rua - a entrada do metrô fica bem ali, do lado do ponto de ônibus." }
        ]),

        grammar(directionsBlocks[0].title, directionsBlocks[0].text),

        list([

            "ir → vá",

            "seguir → siga",

            "virar → vire",

            "atravessar → atravesse",

            "pegar → pegue",

            "descer → desça"

        ]),

        tip(
            "Contando Quadras",
            "No Brasil, direções costumam ser dadas contando 'quadras' (o espaço entre duas ruas): 'Ande duas quadras e vire à direita' é uma forma muito comum de explicar um trajeto curto a pé."
        ),

        culture(
            "Transporte nas Grandes Cidades",
            "Em cidades grandes como São Paulo e Rio de Janeiro, o metrô é considerado o transporte mais rápido e confiável nos horários de pico, enquanto o ônibus cobre rotas mais variadas pela cidade."
        ),

        quiz(
            "Qual é a forma correta do imperativo de 'virar' com 'você'?",
            ["vira", "vire", "virou", "virando"],
            1,
            "Verbos -ar formam o imperativo com 'você' terminando em -e: virar → vire."
        ),

        quiz(
            "Como se diz 'get off' (do ônibus/metrô) em português?",
            ["subir", "pegar", "descer", "virar"],
            2,
            "'Descer' é usado para sair de um ônibus, trem ou metrô."
        ),

        quiz(
            "No diálogo, onde fica a entrada do metrô, segundo Marco?",
            ["Do lado do ponto de ônibus, depois de atravessar a rua", "Direto em frente, sem atravessar nada", "Duas quadras depois da esquina", "Perto da estação de trem"],
            0,
            "Marco disse: 'Atravesse a rua - a entrada do metrô fica bem ali, do lado do ponto de ônibus.'"
        )

    ],

    summary: {

        tip:
            "Explique em voz alta o caminho da sua casa até um lugar próximo, usando pelo menos três verbos no imperativo.",

        review: [

            "ir → vá · seguir → siga · virar → vire",

            "atravessar → atravesse · pegar → pegue · descer → desça",

            "quadra, esquina, ponto de ônibus, metrô"

        ]

    }

};
