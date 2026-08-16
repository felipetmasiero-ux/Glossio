import { educationBlocks } from "../../shared/english/c1/education";

export const educationTopic = {

    id: "english-c1-education",

    language: "english",

    level: "C1",

    topic: "education",

    lessonId: "english-c1-education",

    title: "Nominalisation and Academic Hedging",

    summary: "Turn verbs and adjectives into abstract nouns for a more formal, academic tone, and soften claims with hedging language like 'arguably' and 'tends to'.",

    explanation: educationBlocks,

    rules: [
        "nominalisation turns a verb/adjective into a noun: 'implement' → 'the implementation of'.",
        "hedging expressions soften a claim: 'arguably', 'tends to', 'it could be said that', 'to some extent'.",
        "mix nominalised and direct sentences — overusing nominalisation sounds stiff."
    ],

    examples: [
        "A less rigid assessment of students is arguably overdue.",
        "The implementation of this policy tends to be more difficult than it sounds.",
        "There's growing awareness of the limits of rote learning.",
        "To some extent, standardized testing measures the wrong thing."
    ],

    notes: [
        "Academic English uses nominalisation heavily, but everyday spoken English prefers the direct verb — match your register to the context."
    ],

    commonMistakes: [
        "Nominalising every single sentence, which produces unnatural, overly dense academic writing instead of clear communication."
    ],

    tips: [
        "If a sentence sounds like a research abstract when you're just chatting, you've probably over-nominalised — switch back to the verb."
    ]

};
