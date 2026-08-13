import { newsStoriesBlocks } from "../../../grammar/shared/english/b1/newsStories";
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

export const newsStoriesLesson = {

    id: "english-b1-news-stories",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "news-stories",

    order: 11,

    title: "Stories, News & Unexpected Events",

    subtitle:
        "Reconte notícias e histórias em inglês usando o discurso indireto (reported speech) com 'said' e 'told'.",

    description:
        "Aprenda vocabulário de notícias e acontecimentos inesperados, e como usar o reported speech para contar o que alguém disse.",

    cover: "/covers/news-stories.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 40,

    tags: [
        "news",
        "reported-speech",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about news and unexpected events",

        "Retell what someone said using reported speech",

        "Know when to use 'said' and when to use 'told'",

        "Shift tenses correctly in reported speech"

    ],

    vocabulary: vocabulary([
        "headline",
        "breaking news",
        "eyewitness",
        "witness",
        "report",
        "incident",
        "coverage",
        "source",
        "rumor",
        "allegedly",
        "claim",
        "announce",
        "statement",
        "spokesperson",
        "unexpected",
        "out of the blue",
        "all of a sudden",
        "take place"
    ]),

    blocks: [

        heading("Retelling What Someone Said"),

        paragraph(
            "Reported speech lets us tell someone what another person said, without quoting them directly. The tense usually shifts one step back into the past, and pronouns and time expressions often change too."
        ),

        examples([
            {
                text: "The witness said (that) she had seen the whole incident.",
                translation: "A testemunha disse que tinha visto todo o incidente."
            },
            {
                text: "The spokesperson announced that the news was true.",
                translation: "O porta-voz anunciou que a notícia era verdadeira."
            },
            {
                text: "He told me he would call me back later.",
                translation: "Ele me disse que ligaria de volta mais tarde."
            },
            {
                text: "She said she was working on the story all night.",
                translation: "Ela disse que estava trabalhando na matéria a noite toda."
            },
            {
                text: "They claimed they didn't know anything about it.",
                translation: "Eles alegaram que não sabiam nada sobre isso."
            },
            {
                text: "The reporter said the event had taken place the day before.",
                translation: "O repórter disse que o evento tinha acontecido no dia anterior."
            }
        ]),

        dialogue([
            { speaker: "Ella", text: "Did you hear about the accident downtown?" },
            { speaker: "Sam", text: "Yeah, an eyewitness said she had seen the whole thing happen." },
            { speaker: "Ella", text: "Really? What did she say exactly?" },
            { speaker: "Sam", text: "She told the reporter that it happened all of a sudden — out of the blue." },
            { speaker: "Ella", text: "That's crazy. Did the spokesperson say anything official?" },
            { speaker: "Sam", text: "Yes, he announced that they were investigating the incident." },
            { speaker: "Ella", text: "Did they say when it took place?" },
            { speaker: "Sam", text: "They said it had happened early that morning, before rush hour." },
            { speaker: "Ella", text: "Well, at least no one got seriously hurt, from what I heard." }
        ]),

        grammar(newsStoriesBlocks[0].title, newsStoriesBlocks[0].text),

        list([

            "present simple → past simple",

            "present continuous → past continuous",

            "will → would / can → could",

            "said (no listener) vs told (with listener)"

        ]),

        tip(
            "Said vs Told",
            "Don't use 'say' directly with a listener: don't say 'She said me...'. Use 'told' instead: 'She told me...'. You can also say 'said to me', but never 'said me'."
        ),

        culture(
            "Retelling the News",
            "Casually retelling news or gossip using reported speech — 'She said that...', 'He told me...' — is extremely common in everyday English conversation, not just in journalism."
        ),

        quiz(
            "Choose the correct reported speech. Original: \"I am busy.\"",
            ["He said he is busy.", "He said he was busy.", "He said he busy.", "He say he was busy."],
            1,
            "The present simple 'am' shifts back to the past simple 'was' in reported speech."
        ),

        quiz(
            "Choose the correct sentence.",
            [
                "She said me she was tired.",
                "She told me she was tired.",
                "She told to me she was tired.",
                "She say me she was tired."
            ],
            1,
            "'Told' is used directly with a listener: 'She told me...'."
        ),

        quiz(
            "Original: \"I will call you.\" Choose the correct reported version.",
            ["He said he will call me.", "He said he would call me.", "He said he calls me.", "He said he calling me."],
            1,
            "'Will' shifts back to 'would' in reported speech."
        )

    ],

    summary: {

        tip:
            "Practice retelling a piece of news or something a friend told you recently, shifting the verbs one step back into the past.",

        review: [

            "present simple → past simple",

            "will → would, can → could",

            "said vs told",

            "eyewitness, breaking news, claim, announce"

        ]

    }

};
