import { environmentBlocks } from "../../../grammar/shared/english/b1/environment";
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

export const environmentLesson = {

    id: "english-b1-environment",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "environment",

    order: 9,

    title: "Environment & Everyday Choices",

    subtitle:
        "Fale sobre meio ambiente e escolhas do dia a dia em inglês usando o first conditional (if + presente, will + verbo).",

    description:
        "Aprenda vocabulário sobre meio ambiente e sustentabilidade, e como usar o first conditional para falar de causas e consequências reais.",

    cover: "/covers/environment.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 40,

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

        "Talk about environmental issues and sustainable choices",

        "Use the first conditional to describe real future possibilities",

        "Use 'unless' as a negative condition",

        "Discuss causes and consequences related to the environment"

    ],

    vocabulary: vocabulary([
        "climate change",
        "global warming",
        "pollution",
        "recycle",
        "reduce waste",
        "renewable energy",
        "carbon footprint",
        "sustainable",
        "eco-friendly",
        "single-use plastic",
        "endangered species",
        "deforestation",
        "greenhouse gas",
        "reusable",
        "turn off the lights",
        "save energy",
        "public transport",
        "take shorter showers"
    ]),

    blocks: [

        heading("Real Choices, Real Consequences"),

        paragraph(
            "The first conditional connects a realistic future condition to its likely result: if + present simple, ... will + verb. It's the natural structure for talking about the consequences of everyday choices."
        ),

        examples([
            {
                text: "If we don't reduce our carbon footprint, climate change will get worse.",
                translation: "Se não reduzirmos nossa pegada de carbono, a mudança climática vai piorar."
            },
            {
                text: "We'll save a lot of energy if we turn off the lights when we leave a room.",
                translation: "Vamos economizar muita energia se apagarmos as luzes quando sairmos de um cômodo."
            },
            {
                text: "If more people use public transport, there will be less pollution in the city.",
                translation: "Se mais pessoas usarem transporte público, vai haver menos poluição na cidade."
            },
            {
                text: "Unless we stop using so much single-use plastic, the oceans will keep filling up with waste.",
                translation: "A menos que paremos de usar tanto plástico de uso único, os oceanos vão continuar se enchendo de lixo."
            },
            {
                text: "If everyone recycles a little more, it will make a real difference.",
                translation: "Se todo mundo reciclar um pouco mais, isso vai fazer uma diferença real."
            },
            {
                text: "I'll switch to renewable energy if it becomes more affordable.",
                translation: "Vou mudar para energia renovável se ficar mais acessível."
            }
        ]),

        dialogue([
            { speaker: "Priya", text: "Have you thought about switching to reusable bags?" },
            { speaker: "Jack", text: "Honestly, not really. Does it make that much of a difference?" },
            { speaker: "Priya", text: "It does! If everyone uses reusable bags, we'll reduce a huge amount of plastic waste." },
            { speaker: "Jack", text: "That makes sense. What else can we do?" },
            { speaker: "Priya", text: "Well, if you take shorter showers, you'll save a lot of water too." },
            { speaker: "Jack", text: "I could try that. What about transportation?" },
            { speaker: "Priya", text: "If you take public transport instead of driving, your carbon footprint will be much smaller." },
            { speaker: "Jack", text: "Unless it's really far, I think I can start doing that. Small changes, right?" },
            { speaker: "Priya", text: "Exactly! If we all make small changes, it will add up to something big." }
        ]),

        grammar(environmentBlocks[0].title, environmentBlocks[0].text),

        list([

            "if + present simple, ... will + verb",

            "will + verb if + present simple (no comma)",

            "unless = if not",

            "carbon footprint, sustainable, renewable energy"

        ]),

        tip(
            "Don't Use 'Will' in the If-Clause",
            "Don't say 'If it will rain, we'll stay home.' The if-clause always uses the present simple, even though it talks about the future: 'If it rains, we'll stay home.'"
        ),

        culture(
            "Everyday Environmentalism",
            "In many English-speaking countries, small everyday environmental habits — recycling, reusable bags, reducing meat consumption — are widely discussed and often a normal topic of conversation, not just a political issue."
        ),

        quiz(
            "Choose the correct sentence.",
            [
                "If it will rain, we'll stay home.",
                "If it rains, we'll stay home.",
                "If it rain, we'll stay home.",
                "If it raining, we'll stay home."
            ],
            1,
            "The if-clause uses the present simple, not 'will': 'If it rains, we'll stay home.'"
        ),

        quiz(
            "Choose the correct meaning of 'unless'.",
            ["if", "if not", "when", "because"],
            1,
            "'Unless' means 'if not': 'Unless we act now' = 'If we don't act now.'"
        ),

        quiz(
            "Complete: \"If more people ___ public transport, there will be less pollution.\"",
            ["use", "will use", "used", "using"],
            0,
            "The if-clause takes the present simple: 'If more people use public transport...'"
        )

    ],

    summary: {

        tip:
            "Practice making first conditional sentences about your own daily choices — recycling, energy use, transportation — and their real consequences.",

        review: [

            "if + present simple, ... will + verb",

            "unless = if not",

            "carbon footprint, sustainable, renewable energy",

            "recycle, reduce waste, eco-friendly"

        ]

    }

};
