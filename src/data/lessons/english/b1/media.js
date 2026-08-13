import { mediaBlocks } from "../../../grammar/shared/english/b1/media";
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

export const mediaLesson = {

    id: "english-b1-media",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "media",

    order: 10,

    title: "Media, Entertainment & Culture",

    subtitle:
        "Descreva e avalie filmes, livros e séries em inglês usando a voz passiva (passive voice).",

    description:
        "Aprenda vocabulário de cinema, livros e séries, e como usar a voz passiva para descrever e avaliar produtos culturais.",

    cover: "/covers/media.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 40,

    tags: [
        "media",
        "passive-voice",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about films, books, music and shows",

        "Write and give reviews using appropriate vocabulary",

        "Use the passive voice to describe cultural products",

        "Know when to include or omit 'by + agent'"

    ],

    vocabulary: vocabulary([
        "review",
        "plot",
        "character",
        "soundtrack",
        "blockbuster",
        "bestseller",
        "subtitles",
        "streaming service",
        "box office",
        "critically acclaimed",
        "overrated",
        "underrated",
        "gripping",
        "thought-provoking",
        "adaptation",
        "release",
        "cast",
        "worth watching"
    ]),

    blocks: [

        heading("Describing Films, Books and Shows"),

        paragraph(
            "The passive voice is everywhere in reviews and descriptions of films, books and shows, because the focus is usually on the thing itself, not on who made it: subject + be + past participle."
        ),

        examples([
            {
                text: "The movie was directed by a young filmmaker who's only 28 years old.",
                translation: "O filme foi dirigido por um jovem cineasta que tem apenas 28 anos."
            },
            {
                text: "The book has been translated into more than twenty languages.",
                translation: "O livro foi traduzido para mais de vinte idiomas."
            },
            {
                text: "The soundtrack was composed specially for the film.",
                translation: "A trilha sonora foi composta especialmente para o filme."
            },
            {
                text: "This series is watched by millions of people every week.",
                translation: "Essa série é assistida por milhões de pessoas toda semana."
            },
            {
                text: "The ending was criticized by a lot of fans.",
                translation: "O final foi criticado por muitos fãs."
            },
            {
                text: "A sequel is being planned for next year.",
                translation: "Uma sequência está sendo planejada para o ano que vem."
            }
        ]),

        dialogue([
            { speaker: "Aiden", text: "Have you seen that new series everyone's talking about?" },
            { speaker: "Zoe", text: "Yes! It's actually based on a bestseller. The book was written years ago." },
            { speaker: "Aiden", text: "Really? I didn't know that. Is it any good?" },
            { speaker: "Zoe", text: "It's amazing. The plot is so gripping, and the soundtrack was composed by a famous composer." },
            { speaker: "Aiden", text: "I've heard the ending is a bit controversial, though." },
            { speaker: "Zoe", text: "It is — it was criticized by some fans, but I actually loved it." },
            { speaker: "Aiden", text: "I might give it a try this weekend, then. Is it available on all streaming services?" },
            { speaker: "Zoe", text: "I think it's only shown on one platform right now, but a second season is already being planned." }
        ]),

        grammar(mediaBlocks[0].title, mediaBlocks[0].text),

        list([

            "subject + be + past participle",

            "+ by + agent (only when relevant)",

            "very common in reviews and descriptions",

            "gripping, overrated, critically acclaimed"

        ]),

        tip(
            "Only Add 'By' When It Matters",
            "Use the passive when the focus is on the thing being acted on, not who did it: 'The movie was released in 2023' sounds more natural than always naming who released it. Only add 'by...' when it adds real, useful information."
        ),

        culture(
            "Reviews and Ratings",
            "In English-speaking media culture, both professional critics and everyday viewers post detailed reviews online, and words like 'critically acclaimed', 'overrated' and 'underrated' are extremely common in these discussions."
        ),

        quiz(
            "Choose the correct passive sentence.",
            [
                "The movie directed by a young filmmaker.",
                "The movie was directed by a young filmmaker.",
                "The movie is direct by a young filmmaker.",
                "The movie directs by a young filmmaker."
            ],
            1,
            "The passive voice needs 'be' + past participle: 'was directed'."
        ),

        quiz(
            "Choose the correct sentence.",
            [
                "The book was write years ago.",
                "The book was written years ago.",
                "The book written years ago.",
                "The book is wrote years ago."
            ],
            1,
            "'Written' is the past participle of 'write', used after 'was' in the passive."
        ),

        quiz(
            "When do we usually add 'by + agent' in the passive?",
            ["Always", "Never", "Only when it adds useful information", "Only in questions"],
            2,
            "'By + agent' is only added when knowing who did the action adds useful information."
        )

    ],

    summary: {

        tip:
            "Practice writing a short review of a film or show you like, using the passive voice to describe how it was made.",

        review: [

            "subject + be + past participle",

            "by + agent — only when relevant",

            "gripping, critically acclaimed, overrated",

            "plot, cast, soundtrack, adaptation"

        ]

    }

};
