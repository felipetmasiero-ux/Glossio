import { economicsBlocks } from "../../../grammar/shared/english/c1/economics";
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

export const economicsLesson = {

    id: "english-c1-economics",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "economics",

    order: 10,

    title: "Economics, Business & Decision-Making",

    subtitle:
        "Descreva tendências e avalie riscos usando complex noun phrases para precisão e aproximação.",

    description:
        "Discuta mercados, risco e comportamento do consumidor, aprendendo a construir frases nominais complexas como 'a sharp increase in' para descrever dados com formalidade.",

    cover: "/covers/economics-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "economics",
        "grammar",
        "business"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss economic trends and business decisions with precision",

        "Evaluate risk and interpret data using formal language",

        "Build complex noun phrases for approximation and quantification",

        "Explain financial decisions and their trade-offs clearly"

    ],

    vocabulary: vocabulary([
        "a downturn",
        "diversify",
        "a calculated risk",
        "volatile",
        "capitalize on",
        "a margin of error",
        "fall short of expectations",
        "a safety net",
        "in the red",
        "a viable option",
        "skimp on",
        "at a premium",
        "an incentive",
        "a hidden cost",
        "buoyant",
        "front-load",
        "a rule of thumb (finance)",
        "weigh up the trade-offs",
        "a shrewd decision",
        "come out even"
    ]),

    blocks: [

        heading("Describing Trends With Precision"),

        paragraph(
            "Business and economics English relies on complex noun phrases to summarize data formally and precisely, rather than simple verb-based sentences — essential for reading and producing reports, presentations and market analysis."
        ),

        examples([
            {
                text: "There's been a sharp downturn in consumer spending, which is putting several small businesses in the red.",
                translation: "Houve uma queda acentuada nos gastos do consumidor, o que está colocando várias pequenas empresas no vermelho."
            },
            {
                text: "A growing tendency to diversify has helped many investors weather this volatile market.",
                translation: "Uma tendência crescente de diversificar tem ajudado muitos investidores a enfrentar esse mercado volátil."
              },
            {
                text: "Roughly a third of respondents said the product fell short of expectations, despite a buoyant launch.",
                translation: "Aproximadamente um terço dos entrevistados disse que o produto ficou abaixo do esperado, apesar de um lançamento aquecido."
            },
            {
                text: "Skimping on quality control is rarely a shrewd decision, even when it looks like a calculated risk at first.",
                translation: "Economizar no controle de qualidade raramente é uma decisão astuta, mesmo quando parece um risco calculado no início."
            },
            {
                text: "With a margin of error this wide, it's hard to say whether we'll come out even this quarter.",
                translation: "Com uma margem de erro tão ampla, é difícil dizer se vamos empatar as contas neste trimestre."
            },
            {
                text: "A modest but steady increase in incentives helped the company capitalize on the demand.",
                translation: "Um aumento modesto, mas constante, nos incentivos ajudou a empresa a aproveitar a demanda."
            }
        ]),

        dialogue([
            { speaker: "Ruth", text: "How's the new product line performing?" },
            { speaker: "Adrian", text: "There's been a sharp increase in early sales, but honestly, it fell short of some internal projections." },
            { speaker: "Ruth", text: "Is that a hidden cost issue, or something else?" },
            { speaker: "Adrian", text: "A bit of both. We skimped on marketing at launch, which in hindsight wasn't a shrewd decision." },
            { speaker: "Ruth", text: "Did you weigh up the trade-offs beforehand?" },
              { speaker: "Adrian", text: "We did, but the margin of error in our forecast was wider than we thought." },
            { speaker: "Ruth", text: "Is it a viable option to front-load spending next quarter to catch up?" },
            { speaker: "Adrian", text: "That's the calculated risk we're weighing. If demand stays buoyant, we could come out even by year-end." },
            { speaker: "Ruth", text: "As a rule of thumb, I'd rather diversify than bet everything on one product." },
            { speaker: "Adrian", text: "Fair. We're not in the red yet, but it's worth capitalizing on this window while we can." }
        ]),

        grammar(economicsBlocks[0].title, economicsBlocks[0].text),

        list([

            "determiner + adjective + noun + in/towards/of — complex noun phrase for trends",

            "approximation: roughly, the vast majority of, a modest but steady",

            "a downturn, diversify, volatile, capitalize on, buoyant",

            "a safety net, in the red, a hidden cost, a shrewd decision"

        ]),

        tip(
            "Verb or Noun Phrase?",
            "In casual conversation, 'Prices went up a lot' is completely natural. In a report or presentation, 'There has been a sharp increase in prices' sounds far more professional — match the structure to the register you're in."
        ),

        culture(
            "Reading Business English",
            "Financial news outlets like the Financial Times or Bloomberg rely almost entirely on this complex-noun-phrase register ('a marked slowdown in', 'a modest uptick in') — recognizing this pattern is one of the fastest ways to read business English more fluently."
        ),

        quiz(
            "Choose the more formal, natural noun-phrase version of \"Prices went up a lot.\"",
            [
                "Prices went up.",
                "There has been a sharp increase in prices.",
                "Prices are increasing a lot currently.",
                "A lot happened to prices."
            ],
            1,
            "'There has been a sharp increase in prices' is the natural complex-noun-phrase version used in formal/business English."
        ),

        quiz(
            "What does 'in the red' mean?",
            ["making a large profit", "operating at a financial loss", "having very stable finances", "about to launch a new product"],
            1,
            "'In the red' means operating at a financial loss."
        ),

        quiz(
            "What does 'a calculated risk' mean?",
            ["a risk taken without any thought", "a risk taken after carefully weighing the potential outcomes", "an illegal financial decision", "a risk that is guaranteed to fail"],
            1,
            "'A calculated risk' is a risk taken deliberately, after weighing the likely costs and benefits."
        )

    ],

    summary: {

        tip:
            "Practice describing a real or imagined business trend using at least two complex noun phrases like 'a sharp rise in' or 'a growing tendency towards'.",

        review: [

            "complex noun phrases for describing trends and approximation",

            "a downturn, diversify, volatile, capitalize on, buoyant",

            "a safety net, in the red, a hidden cost, a shrewd decision"

        ]

    }

};
