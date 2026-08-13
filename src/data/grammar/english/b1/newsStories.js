import { newsStoriesBlocks } from "../../shared/english/b1/newsStories";

export const newsStoriesTopic = {

    id: "english-b1-news-stories",

    language: "english",

    level: "B1",

    topic: "news-stories",

    lessonId: "english-b1-news-stories",

    title: "Reported Speech",

    summary: "Shift the tense one step back into the past to report what someone said, and choose between 'said' and 'told'.",

    explanation: newsStoriesBlocks,

    rules: [
        "present simple → past simple; present continuous → past continuous.",
        "will → would; can → could.",
        "said with no listener mentioned; told with a listener."
    ],

    examples: [
        "\"I'm tired.\" → She said she was tired.",
        "\"I will help.\" → He said he would help.",
        "\"I'm working.\" → She said she was working.",
        "He told me he was busy."
    ],

    notes: [
        "Time expressions often change too: 'today' → 'that day', 'tomorrow' → 'the next day', 'yesterday' → 'the day before'."
    ],

    commonMistakes: [
        "Using 'said' directly with a listener: 'She said me...' instead of 'She told me...'."
    ],

    tips: [
        "If there's a listener right after the verb, use 'told'. If not, use 'said' (with or without 'to someone')."
    ]

};
