import { scienceTechnologyBlocks } from "../../../grammar/shared/portuguese/c1/scienceTechnology";
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

export const scienceTechnologyLesson = {

    id: "portuguese-c1-science-technology",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "science-technology",

    order: 5,

    title: "Ciência, Tecnologia e Inovação",

    subtitle:
        "Especule sobre o futuro da ciência e tecnologia com expressões de probabilidade e o futuro do subjuntivo.",

    description:
        "Discuta descobertas científicas, IA e ética, aprendendo a calibrar seu grau de certeza e a usar o futuro do subjuntivo em cenários especulativos.",

    cover: "/covers/science-technology-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "science-technology",
        "grammar",
        "ética"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir possibilidades e consequências em ciência e tecnologia",

        "Especular sobre o futuro com graus de certeza calibrados",

        "Usar o futuro do subjuntivo em contextos especulativos naturais",

        "Avaliar dilemas éticos relacionados à inovação e à incerteza"

    ],

    vocabulary: vocabulary([
        "revolucionário",
        "um avanço de mão dupla",
        "consequências imprevistas",
        "na vanguarda de",
        "uma linha ética delicada",
        "escrutínio",
        "avançar sobre",
        "uma prova de conceito",
        "reforçar um ponto",
        "conter o avanço de",
        "uma zona cinzenta",
        "salvaguardar",
        "em desenvolvimento",
        "superar em muito",
        "ter um preço embutido",
        "de ponta",
        "uma lacuna regulatória",
        "precipitado",
        "um salto adiante",
        "intrínseco"
    ]),

    blocks: [

        heading("Especular com um Grau de Certeza Preciso"),

        paragraph(
            "Discutir ciência e tecnologia exige especular sobre resultados incertos. Expressões de probabilidade combinadas com o futuro do subjuntivo permitem calibrar exatamente o grau de certeza desejado."
        ),

        examples([
            { text: "É bem provável que essa pesquisa revolucionária mude a forma como trabalhamos daqui a uma década." },
            { text: "Não é de se descartar que esse avanço de mão dupla avance sobre uma zona cinzenta que ainda não exploramos." },
            { text: "Tudo indica que essa tecnologia de ponta vai continuar avançando rapidamente." },
            { text: "Quando essa tecnologia se tornar acessível, tudo vai mudar." },
            { text: "Se os resultados dessa prova de conceito se confirmarem, será um salto adiante enorme." },
            { text: "Esse benefício pode superar em muito os riscos, mas ainda é precipitado afirmar isso sem mais escrutínio." },
            { text: "Essa lacuna regulatória precisa ser resolvida antes que a tecnologia seja usada em larga escala." }
        ]),

        dialogue([
            { speaker: "Larissa", text: "O que você acha dessa pesquisa na vanguarda da IA?" },
            { speaker: "Davi", text: "Genuinamente revolucionária. Mas não é de se descartar que ela avance sobre uma zona cinzenta séria." },
            { speaker: "Larissa", text: "Tipo o quê?" },
            { speaker: "Davi", text: "Privacidade, principalmente. Faz sentido que uma coleta de dados dessas tenha um preço embutido." },
              { speaker: "Larissa", text: "Você acha que os benefícios vão superar os riscos?" },
            { speaker: "Davi", text: "É bem provável, sim — mas é precipitado afirmar sem mais escrutínio. Ainda existe uma lacuna regulatória clara." },
            { speaker: "Larissa", text: "Tem alguma coisa em desenvolvimento pra resolver isso?" },
            { speaker: "Davi", text: "Tem uma nova regulamentação sendo discutida. Quando ela se tornar realidade, tudo indica que vai mudar bastante coisa." },
            { speaker: "Larissa", text: "Espero que não fique tão atrasada em relação à tecnologia em si." }
        ]),

        grammar(scienceTechnologyBlocks[0].title, scienceTechnologyBlocks[0].text),

        list([

            "'é bem provável que' + subjuntivo — probabilidade alta",

            "'não é de se descartar que' + subjuntivo — possibilidade real, mas incerta",

            "futuro do subjuntivo em orações temporais/condicionais ('quando... se tornar')",

            "revolucionário, na vanguarda de, uma zona cinzenta, uma lacuna regulatória"

        ]),

        tip(
            "Futuro do Subjuntivo com 'Quando'",
            "Ao falar do futuro depois de 'quando', 'assim que' ou 'se', use o futuro do subjuntivo, não o presente: 'quando a tecnologia se tornar acessível' (correto), não 'quando a tecnologia se torna acessível'."
        ),

        culture(
            "O Brasil e a Regulação de IA",
            "O Brasil discute ativamente um marco regulatório para inteligência artificial no Congresso Nacional, buscando equilibrar inovação tecnológica com proteção de dados — um debate que ganhou força após a aprovação da LGPD (Lei Geral de Proteção de Dados)."
        ),

        quiz(
            "Complete: \"Quando essa tecnologia ___ acessível, tudo vai mudar.\" (se tornar)",
            ["se torna", "se tornar", "se tornará", "se tornaria"],
            1,
            "Depois de 'quando' referindo-se ao futuro, usamos o futuro do subjuntivo: 'se tornar'."
        ),

        quiz(
            "Qual expressão indica possibilidade real, mas incerta?",
            ["é certo que", "não é de se descartar que", "é óbvio que", "é evidente que"],
            1,
            "'Não é de se descartar que' indica uma possibilidade real, mas incerta."
        ),

        quiz(
            "O que significa 'uma lacuna regulatória'?",
            ["uma lei muito rígida", "a ausência de regulamentação sobre uma situação nova", "um tribunal vazio", "uma decisão judicial"],
            1,
            "'Uma lacuna regulatória' é a ausência de lei ou regulamentação sobre uma situação nova."
        )

    ],

    summary: {

        tip:
            "Pratique especulando sobre uma tecnologia que te interessa, usando pelo menos três graus de certeza diferentes.",

        review: [

            "expressões de probabilidade: é bem provável que, não é de se descartar que, tudo indica que",

            "futuro do subjuntivo em contextos especulativos",

            "revolucionário, na vanguarda de, uma zona cinzenta, uma lacuna regulatória"

        ]

    }

};
