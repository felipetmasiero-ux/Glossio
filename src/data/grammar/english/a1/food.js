import { foodBlocks } from "../../shared/english/food";

export const foodTopic = {

    id: "english-a1-food",

    language: "english",

    level: "A1",

    topic: "food",

    lessonId: "english-a1-food",

    title: "Some vs Any",

    summary: "Choose 'some' for affirmatives/offers and 'any' for negatives/questions.",

    explanation: foodBlocks,

    rules: [
    "Affirmative sentences: use 'some'.",
    "Negative sentences: use 'any'.",
    "Questions: use 'any' (except polite offers, which still use 'some')."
],

    examples: [
    "I want some bread.",
    "I don't have any coffee.",
    "Do you have any fruit?",
    "Would you like some water? (offer, still 'some')"
],

    notes: [
    "Both 'some' and 'any' work with countable and uncountable nouns."
],

    commonMistakes: [
    "Using 'some' in a question that isn't an offer: 'Do you have some fruit?' instead of 'Do you have any fruit?'."
],

    tips: [
    "Offers and polite requests are the one exception where a question still takes 'some'."
]

};
