import { scienceTechnologyBlocks } from "../../../grammar/shared/english/c1/scienceTechnology";
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

    id: "english-c1-science-technology",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "science-technology",

    order: 5,

    title: "Science, Technology & Ethics",

    subtitle:
        "Especule sobre o futuro da ciência e tecnologia usando modais avançados de especulação.",

    description:
        "Discuta descobertas científicas, IA e ética, aprendendo a calibrar seu grau de confiança com expressões como 'bound to' e 'stands to reason that'.",

    cover: "/covers/science-technology-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "science-technology",
        "grammar",
        "ethics"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss possibilities and consequences in science and technology",

        "Speculate about the present and future with calibrated confidence",

        "Use advanced modal expressions of speculation naturally",

        "Evaluate ethical dilemmas around innovation and uncertainty"

    ],

    vocabulary: vocabulary([
        "trailblazing",
        "a double-edged breakthrough",
        "unforeseen consequences",
        "at the forefront of",
        "a slippery ethical line",
        "scrutiny",
        "encroach on",
        "a proof of concept",
        "underscore",
        "curb (technology)",
        "a gray area",
        "safeguard",
        "in the pipeline",
        "far outweigh",
        "come at a cost",
        "at the bleeding edge",
        "accountability gap",
        "premature",
        "a leap forward",
        "hard-wired"
    ]),

    blocks: [

        heading("Speculating With Calibrated Confidence"),

        paragraph(
            "Discussing science, technology and ethics requires speculating about outcomes that are inherently uncertain. C1 English uses a range of expressions that let you signal exactly how confident you are, rather than defaulting to a flat 'will' or 'might'."
        ),

        examples([
            {
                text: "This trailblazing research is bound to raise questions it can't yet answer.",
                translation: "Essa pesquisa pioneira certamente vai levantar perguntas que ainda não pode responder."
            },
            {
                text: "There's every chance this breakthrough will encroach on a gray area we haven't fully mapped out ethically.",
                translation: "Há grandes chances de que essa descoberta avance sobre uma zona cinzenta que ainda não mapeamos totalmente do ponto de vista ético."
            },
            {
                text: "It stands to reason that any technology at the forefront of its field comes at a cost.",
                translation: "Faz sentido que qualquer tecnologia na vanguarda de sua área tenha um custo."
            },
            {
                text: "The benefits could conceivably far outweigh the risks, but that's premature to say without more scrutiny.",
                translation: "Os benefícios poderiam, em tese, superar em muito os riscos, mas é prematuro afirmar isso sem mais escrutínio."
            },
            {
                text: "This accountability gap is unlikely to close without stronger safeguards in the pipeline.",
                translation: "Essa lacuna de responsabilização dificilmente vai se fechar sem salvaguardas mais fortes a caminho."
            },
            {
                text: "Some of this bias might well be hard-wired into the system from the start.",
                translation: "Parte desse viés pode muito bem estar programado no sistema desde o início."
            }
        ]),

        dialogue([
            { speaker: "Sofia", text: "What do you make of this new AI research at the forefront of the field?" },
            { speaker: "Nathan", text: "It's genuinely trailblazing. But there's every chance it'll encroach on some serious gray areas." },
            { speaker: "Sofia", text: "Like what?" },
            { speaker: "Nathan", text: "Privacy, mostly. It stands to reason that this much data collection comes at a cost." },
            { speaker: "Sofia", text: "Do you think the benefits far outweigh the risks?" },
            { speaker: "Nathan", text: "Could conceivably, yes — but it's premature to say without more scrutiny. There's clearly an accountability gap right now." },
            { speaker: "Sofia", text: "Is there anything in the pipeline to safeguard against that?" },
              { speaker: "Nathan", text: "There's talk of new regulation, but it's bound to lag behind the technology itself." },
            { speaker: "Sofia", text: "So the unforeseen consequences are unlikely to be fully known for years." },
            { speaker: "Nathan", text: "Exactly. Some of this bias might well be hard-wired in already, honestly." }
        ]),

        grammar(scienceTechnologyBlocks[0].title, scienceTechnologyBlocks[0].text),

        list([

            "bound to — near certainty",

            "there's every chance that — strong likelihood",

            "stands to reason that — logical conclusion",

            "could conceivably / unlikely to — possibility or low probability"

        ]),

        tip(
            "Match Your Confidence",
            "Using 'bound to' for something merely possible overstates your certainty, while using 'could conceivably' for something near-certain undersells it. Pick the expression that actually matches how sure you are."
        ),

        culture(
            "Hedging in Science Journalism",
            "Responsible English-language science journalism almost always hedges speculative claims about new research — phrases like 'could potentially' or 'early evidence suggests' are the norm, precisely because overstating preliminary findings has repeatedly damaged public trust in science reporting."
        ),

        quiz(
            "Choose the expression showing near certainty.",
            ["could conceivably", "is bound to", "there's a slim chance", "it's unlikely to"],
            1,
            "'Is bound to' expresses near certainty about a future outcome."
        ),

        quiz(
            "What does 'a gray area' mean?",
            ["a clearly illegal action", "a situation that is ambiguous or unclear, ethically or legally", "a scientific breakthrough", "a well-regulated industry"],
            1,
            "'A gray area' refers to a situation that is ambiguous, not clearly right or wrong, legal or illegal."
        ),

        quiz(
            "Choose the sentence expressing a logical conclusion.",
            [
                "It might rain tomorrow.",
                "It stands to reason that more testing leads to safer products.",
                "It could conceivably rain tomorrow.",
                "There's a small chance it rains tomorrow."
            ],
            1,
            "'It stands to reason that' introduces a logical conclusion drawn from known facts."
        )

    ],

    summary: {

        tip:
            "Practice speculating about a technology you're curious about, using at least three different degrees of confidence.",

        review: [

            "advanced modals of speculation: bound to, there's every chance, stands to reason",

            "trailblazing, scrutiny, a gray area, safeguard",

            "accountability gap, far outweigh, come at a cost"

        ]

    }

};
