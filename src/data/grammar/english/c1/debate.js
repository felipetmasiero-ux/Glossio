import { debateBlocks } from "../../shared/english/c1/debate";

export const debateTopic = {

    id: "english-c1-debate",

    language: "english",

    level: "C1",

    topic: "debate",

    lessonId: "english-c1-debate",

    title: "Hedging, Stance and Qualification in Extended Argument",

    summary: "Signal exactly how confident you are and where you partially agree using expressions like 'it could be argued that', 'that said', and 'insofar as'.",

    explanation: debateBlocks,

    rules: [
        "'it could be argued that' / 'there is some evidence to suggest' — hedge a claim without full commitment.",
        "'to some extent, I agree, but...' — signal partial agreement before a counterpoint.",
        "'that said' / 'admittedly' — acknowledge a valid point from the other side.",
        "'insofar as' — limit a claim to a specific respect."
    ],

    examples: [
        "It could be argued that the policy simply hasn't had enough time to work.",
        "There is some evidence to suggest that remote work improves productivity.",
        "To some extent, I agree, but I don't think that covers every case.",
        "The policy works, insofar as it reduces costs — but it does little for quality."
    ],

    notes: [
        "Combining hedging with partial agreement ('admittedly... that said...') is what makes an argument sound considered rather than one-sided."
    ],

    commonMistakes: [
        "Overcommitting to a claim with 'definitely' or 'obviously' when the evidence is actually mixed — hedging language exists precisely to avoid this."
    ],

    tips: [
        "Before stating an opinion, ask how confident you really are — then pick the hedging expression that matches, rather than defaulting to a flat statement."
    ]

};
