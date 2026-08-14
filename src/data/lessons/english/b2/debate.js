import { debateBlocks } from "../../../grammar/shared/english/b2/debate";
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

export const debateLesson = {

    id: "english-b2-debate",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "debate",

    order: 11,

    title: "Ideas, Debate & Critical Thinking",

    subtitle:
        "Construa argumentos com precisão em inglês usando discourse markers e hedging language para soar cuidadoso e credível.",

    description:
        "Aprenda vocabulário para argumentar e debater, e como usar discourse markers e hedging language para estruturar e qualificar suas afirmações.",

    cover: "/covers/debate.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "debate",
        "discourse-markers",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Build and structure an argument step by step",

        "Use discourse markers to organize a discussion",

        "Use hedging language to qualify claims appropriately",

        "Present different perspectives and weigh evidence"

    ],

    vocabulary: vocabulary([
        "assumption",
        "underlying assumption",
        "evidence",
        "compelling",
        "flawed",
        "counterargument",
        "play devil's advocate",
        "draw a conclusion",
        "jump to conclusions",
        "weigh the pros and cons",
        "take something into account",
        "on balance",
        "to some extent",
        "arguably",
        "valid",
        "subjective",
        "objective",
        "nuance",
        "rational",
        "one-sided"
    ]),

    blocks: [

        heading("Structuring an Argument Carefully"),

        paragraph(
            "Building a careful, credible argument means organizing your points clearly with discourse markers, and qualifying claims that aren't absolute with hedging language."
        ),

        examples([
            {
                text: "To begin with, we should consider the actual evidence, not just assumptions.",
                translation: "Antes de mais nada, deveríamos considerar as evidências reais, não só suposições."
            },
            {
                text: "That said, I understand why some people disagree.",
                translation: "Dito isso, entendo por que algumas pessoas discordam."
            },
            {
                text: "This approach tends to work better in smaller communities.",
                translation: "Essa abordagem tende a funcionar melhor em comunidades menores."
            },
            {
                text: "Arguably, the risks outweigh the benefits in this case.",
                translation: "Pode-se argumentar que os riscos superam os benefícios nesse caso."
            },
            {
                text: "On balance, I think the evidence supports this conclusion, to some extent.",
                translation: "No fim das contas, acho que as evidências sustentam essa conclusão, até certo ponto."
            },
            {
                text: "Having said that, we shouldn't jump to conclusions based on a single study.",
                translation: "Dito isso, não deveríamos tirar conclusões precipitadas baseadas num único estudo."
            }
        ]),

        dialogue([
            { speaker: "Fatima", text: "I've been reading a lot about this topic, and to begin with, I think the evidence is more compelling than people realize." },
            { speaker: "Carlos", text: "That's a fair point. That said, I think we need to question some of the underlying assumptions in that research." },
            { speaker: "Fatima", text: "Sure, to some extent. But arguably, even a flawed study can point us toward the right questions." },
            { speaker: "Carlos", text: "I see what you mean. On balance, though, I'd want to see a counterargument before fully agreeing." },
            { speaker: "Fatima", text: "That's reasonable. It's worth noting this tends to be a controversial topic precisely because the evidence isn't black and white." },
            { speaker: "Carlos", text: "Exactly. Having said that, I appreciate you playing devil's advocate here — it helps me think it through more carefully." },
            { speaker: "Fatima", text: "That's the goal. We don't have to see eye to eye, but at least we're weighing the pros and cons properly." },
            { speaker: "Carlos", text: "Agreed. Let's take everything into account before drawing a final conclusion." }
        ]),

        grammar(debateBlocks[0].title, debateBlocks[0].text),

        list([

            "to begin with, that said, having said that, on balance",

            "tend to, arguably, to some extent — hedging",

            "assumption, evidence, counterargument, nuance",

            "weigh the pros and cons, draw a conclusion"

        ]),

        tip(
            "Hedging Sounds More Credible, Not Less",
            "Hedging isn't about sounding unsure or weak — it's about being appropriately careful with claims that aren't 100% certain. In academic and professional English, an overly confident claim without hedging can actually sound less credible, not more."
        ),

        culture(
            "Academic Hedging",
            "Academic and journalistic English relies heavily on hedging language — 'tends to', 'may suggest', 'arguably' — because absolute claims are rarely defensible. This is considered a sign of rigor, not weakness, in English-language argumentation."
        ),

        quiz(
            "Choose the discourse marker used to introduce the first point.",
            ["on balance", "to begin with", "that said", "arguably"],
            1,
            "'To begin with' introduces the first point in a discussion."
        ),

        quiz(
            "Choose the best hedging language for an uncertain claim.",
            [
                "This definitely proves...",
                "This clearly shows...",
                "This tends to suggest...",
                "This is obviously true because..."
            ],
            2,
            "'Tends to suggest' is appropriately hedged for a claim that isn't absolute."
        ),

        quiz(
            "What does \"that said\" signal?",
            ["Adding a new topic", "A contrast or qualification to what was just said", "Ending the discussion", "Strong agreement"],
            1,
            "'That said' introduces a contrast or qualification to the previous point."
        )

    ],

    summary: {

        tip:
            "Practice structuring an opinion on a topic you care about, using at least one discourse marker and one hedging phrase.",

        review: [

            "to begin with, that said, on balance",

            "tend to, arguably, to some extent",

            "assumption, evidence, counterargument",

            "weigh the pros and cons, nuance"

        ]

    }

};
