import { weatherForecastBlocks } from "../../../grammar/shared/portuguese/a2/weatherForecast";
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

export const weatherForecastLesson = {

    id: "portuguese-a2-weather-forecast",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "weather",

    order: 4,

    title: "Previsão do Tempo",

    subtitle:
        "Faça previsões e planeje em função do clima.",

    description:
        "Aprenda o futuro do presente simples para fazer previsões do tempo e planos futuros.",

    cover: "/covers/weather-forecast-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "weather",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Conjugar verbos regulares no futuro do presente",

        "Fazer previsões sobre o tempo",

        "Descrever condições climáticas com mais detalhe",

        "Falar sobre planos que dependem do clima"

    ],

    vocabulary: vocabulary([
        "previsão do tempo",
        "temperatura",
        "grau",
        "ensolarado",
        "nublado",
        "tempestade",
        "neblina",
        "amanhã",
        "na próxima semana",
        "provavelmente"
    ]),

    blocks: [

        heading("Como Vai Estar o Tempo?"),

        paragraph(
            "No A1, você aprendeu a descrever o tempo agora: 'está chovendo', 'está frio'. Agora vamos falar sobre o futuro, usando o futuro do presente simples - útil para previsões e planos."
        ),

        examples([
            {
                text: "Amanhã provavelmente choverá na parte da manhã."
            },

            {
                text: "Segundo a previsão do tempo, a temperatura estará mais baixa na próxima semana."
            },

            {
                text: "O fim de semana será ensolarado, mas pode ter neblina de manhã."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Você viu a previsão do tempo para amanhã?" },
            { speaker: "Marco", text: "Vi. Vai ter tempestade de manhã, mas à tarde ficará ensolarado." },
            { speaker: "Anna", text: "E a temperatura? Estará muito fria?" },
            { speaker: "Marco", text: "Não muito - uns 18 graus. Provavelmente dará para sair sem casaco." }
        ]),

        grammar(weatherForecastBlocks[0].title, weatherForecastBlocks[0].text),

        list([

            "chover → choverá",

            "estar → estarei, estará, estaremos, estarão",

            "ser → serei, será, seremos, serão",

            "fazer → farei, fará, faremos, farão"

        ]),

        tip(
            "Futuro Simples vs 'Vai + Infinitivo'",
            "No A1 você aprendeu 'vai chover' (ir + infinitivo), usado na fala do dia a dia. O futuro simples ('choverá') é mais comum em previsões formais, notícias e textos escritos - as duas formas significam a mesma coisa."
        ),

        culture(
            "Clima Tropical",
            "Grande parte do Brasil tem clima tropical, com poucas variações de temperatura ao longo do ano - mas fortes chuvas de verão e neblina no inverno em regiões de serra são bem comuns."
        ),

        quiz(
            "Qual é a forma correta do futuro para 'nós estaremos'?",
            ["nós estamos", "nós estaremos", "nós estávamos", "nós estaríamos"],
            1,
            "'Estar' no futuro do presente: estarei, estará, estaremos, estarão."
        ),

        quiz(
            "Qual frase faz uma previsão sobre amanhã?",
            ["Amanhã choveu bastante.", "Amanhã provavelmente choverá.", "Amanhã está chovendo.", "Amanhã chovia sempre."],
            1,
            "'Choverá' é a forma do futuro do presente, usada para previsões."
        ),

        quiz(
            "No diálogo, como estará o tempo à tarde?",
            ["Vai ter tempestade", "Ficará ensolarado", "Vai nevar", "Ficará nublado o dia todo"],
            1,
            "Marco disse: 'à tarde ficará ensolarado.'"
        )

    ],

    summary: {

        tip:
            "Faça três previsões sobre o tempo de amanhã ou da próxima semana, usando o futuro do presente simples.",

        review: [

            "chover → choverá · estar → estará · ser → será",

            "previsão do tempo, temperatura, grau",

            "ensolarado, nublado, tempestade, neblina",

            "amanhã, na próxima semana, provavelmente"

        ]

    }

};
