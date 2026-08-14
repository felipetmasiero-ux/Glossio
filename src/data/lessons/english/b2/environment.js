import { environmentB2Blocks } from "../../../grammar/shared/english/b2/environment";
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

export const environmentB2Lesson = {

    id: "english-b2-environment",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "environment",

    order: 6,

    title: "Environment & Climate",

    subtitle:
        "Reflita sobre decisões ambientais do passado em inglês usando o third conditional para imaginar resultados diferentes.",

    description:
        "Aprenda vocabulário mais avançado sobre meio ambiente, e como usar o third conditional para refletir sobre causas, consequências e decisões passadas.",

    cover: "/covers/environment-b2.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "environment",
        "conditionals",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss environmental causes, consequences and policy",

        "Use the third conditional to imagine a different past",

        "Express regret about past environmental decisions",

        "Distinguish the third conditional from the second conditional"

    ],

    vocabulary: vocabulary([
        "ecosystem",
        "biodiversity",
        "habitat",
        "consumption",
        "overconsumption",
        "natural resources",
        "resource depletion",
        "offset",
        "carbon offsetting",
        "tipping point",
        "irreversible",
        "mitigate",
        "adapt to",
        "policy",
        "regulation",
        "enforce",
        "incentive",
        "phase out",
        "consequence"
    ]),

    blocks: [

        heading("Reflecting on the Past"),

        paragraph(
            "When we reflect on environmental decisions that already happened, we often imagine how things could have been different. The third conditional is the structure for exactly that — an unreal past."
        ),

        examples([
            {
                text: "If governments had acted sooner, the damage would have been much smaller.",
                translation: "Se os governos tivessem agido antes, o dano teria sido muito menor."
            },
            {
                text: "We wouldn't have lost so much biodiversity if the habitat hadn't been destroyed.",
                translation: "Não teríamos perdido tanta biodiversidade se o habitat não tivesse sido destruído."
            },
            {
                text: "If more people had recycled, there would have been less waste in landfills.",
                translation: "Se mais pessoas tivessem reciclado, teria havido menos lixo nos aterros."
            },
            {
                text: "The company wouldn't have faced backlash if it had been more transparent about its emissions.",
                translation: "A empresa não teria enfrentado uma reação negativa se tivesse sido mais transparente sobre suas emissões."
            },
            {
                text: "If we hadn't reached that tipping point, the consequences wouldn't have been irreversible.",
                translation: "Se não tivéssemos alcançado aquele ponto crítico, as consequências não teriam sido irreversíveis."
            },
            {
                text: "Would the policy have worked if it had been enforced properly?",
                translation: "A política teria funcionado se tivesse sido aplicada corretamente?"
            }
        ]),

        dialogue([
            { speaker: "Priya", text: "Did you read that report about the wildfires last year?" },
            { speaker: "Jack", text: "Yeah, it was devastating. If governments had acted sooner on climate policy, the damage would have been much smaller." },
            { speaker: "Priya", text: "Definitely. And honestly, if more industries had adopted renewable energy earlier, we wouldn't be in this position now." },
            { speaker: "Jack", text: "True. It makes you wonder — would things have been different if there'd been stronger regulations decades ago?" },
            { speaker: "Priya", text: "Almost certainly. We wouldn't have reached that tipping point if we'd taken the warnings seriously." },
            { speaker: "Jack", text: "It's frustrating, because in hindsight, so much of this was preventable." },
            { speaker: "Priya", text: "Exactly. If only more people had understood the consequences back then." },
            { speaker: "Jack", text: "Well, we can't change the past, but we can make sure we don't repeat the same mistakes." },
            { speaker: "Priya", text: "Agreed. On balance, I think there's still time to mitigate the worst outcomes." }
        ]),

        grammar(environmentB2Blocks[0].title, environmentB2Blocks[0].text),

        list([

            "if + past perfect, ... would have + past participle",

            "imagines a different result for something already finished",

            "often expresses regret or reflection",

            "ecosystem, biodiversity, mitigate, irreversible"

        ]),

        tip(
            "Don't Mix Conditionals by Accident",
            "Keep both parts of the third conditional in the past: 'If I had studied, I would have become a doctor.' Mixing a past condition with a present result ('If I had studied, I would be a doctor now') is a different, more advanced structure called a mixed conditional — useful to recognize, but not the focus here."
        ),

        culture(
            "Climate Regret in Public Discourse",
            "Phrases like 'if only we had acted sooner' or 'in hindsight, this was preventable' are common in English-language climate journalism and public debate — expressing regret about missed opportunities is a recurring pattern in this kind of discussion."
        ),

        quiz(
            "Choose the correct third conditional sentence.",
            [
                "If we had acted sooner, the damage would be smaller.",
                "If we had acted sooner, the damage would have been smaller.",
                "If we acted sooner, the damage would have been smaller.",
                "If we have acted sooner, the damage would have been smaller."
            ],
            1,
            "The third conditional keeps both parts in the past: if + past perfect, ... would have + past participle."
        ),

        quiz(
            "What does the third conditional describe?",
            [
                "A realistic future possibility",
                "A hypothetical present situation",
                "An imagined different result for something that already happened",
                "A general truth"
            ],
            2,
            "The third conditional imagines a different result for something in the past that cannot be changed."
        ),

        quiz(
            "Choose the correct sentence.",
            ["If only I studied harder.", "If only I had studied harder.", "If only I study harder.", "If only I would study harder."],
            1,
            "'If only' + past perfect expresses regret about the past, just like the third conditional."
        )

    ],

    summary: {

        tip:
            "Practice reflecting on a past environmental decision — real or hypothetical — using the third conditional to imagine a different outcome.",

        review: [

            "if + past perfect, ... would have + past participle",

            "imagined different result for the past",

            "ecosystem, biodiversity, mitigate, tipping point",

            "irreversible, natural resources, regulation"

        ]

    }

};
