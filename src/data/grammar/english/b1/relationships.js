import { relationshipsBlocks } from "../../shared/english/b1/relationships";

export const relationshipsTopic = {

    id: "english-b1-relationships",

    language: "english",

    level: "B1",

    topic: "relationships",

    lessonId: "english-b1-relationships",

    title: "Defining Relative Clauses",

    summary: "Use 'who', 'which'/'that' and 'where' to give essential information about people, things and places, without commas.",

    explanation: relationshipsBlocks,

    rules: [
        "who for people, which/that for things, where for places.",
        "No comma before a defining relative clause.",
        "The relative pronoun can be dropped when it's the object of the clause."
    ],

    examples: [
        "She's the friend who always helps me.",
        "That's the café where we met.",
        "He's the kind of person that everyone likes.",
        "The book I told you about is amazing."
    ],

    notes: [
        "Non-defining relative clauses (with commas) add extra, non-essential information and are usually introduced at a higher level."
    ],

    commonMistakes: [
        "Adding a comma before a defining relative clause: 'She's the friend, who always helps me' instead of 'She's the friend who always helps me'."
    ],

    tips: [
        "If removing the clause would leave you unsure who or what is being talked about, it's a defining clause — no comma."
    ]

};
