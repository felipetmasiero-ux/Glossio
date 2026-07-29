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

export const hobbiesLesson = {

    id: "english-a2-hobbies",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "hobbies",

    order: 7,

    title: "Hobbies",

    subtitle:
        "Talk about your free time activities using gerunds after 'like', 'love' and 'be interested in'.",

    description:
        "Learn hobby vocabulary and how to use the -ing form after verbs like 'enjoy' and expressions like 'be interested in'.",

    cover: "/covers/hobbies.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "hobbies",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Talk about hobbies and free time activities",

        "Use the -ing form after 'like/love/hate/enjoy'",

        "Use 'be interested in' + -ing",

        "Ask about someone's hobbies"

    ],

    vocabulary: vocabulary([
        "hobby",
        "paint",
        "draw",
        "collect",
        "photography",
        "gardening",
        "hiking",
        "puzzle",
        "chess",
        "free time"
    ]),

    blocks: [

        heading("What Do You Do in Your Free Time?"),

        paragraph(
            "After verbs like 'like', 'love', 'hate' and 'enjoy', and after expressions like 'be interested in', we use the -ing form of the verb (the gerund), not the base form."
        ),

        examples([
            {
                text: "I enjoy painting in my free time.",
                translation: "Eu gosto de pintar no meu tempo livre."
            },

            {
                text: "She loves collecting old coins.",
                translation: "Ela adora colecionar moedas antigas."
            },

            {
                text: "I'm interested in photography and hiking.",
                translation: "Eu me interesso por fotografia e trilhas."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "What's your hobby?" },
            { speaker: "Marco", text: "I love drawing. What about you?" },
            { speaker: "Ana", text: "I'm interested in gardening, and I enjoy playing chess too." },
            { speaker: "Marco", text: "That's nice. I hate doing puzzles, though!" }
        ]),

        grammar(
            "Gerunds After Like/Love/Hate/Enjoy",
            "Use verb + -ing after 'like', 'love', 'hate' and 'enjoy': 'I like drawing.' / 'She hates doing puzzles.' Also use -ing after 'be interested in': 'I'm interested in painting.'"
        ),

        list([

            "like / love / enjoy / hate + verb-ing",

            "be interested in + verb-ing",

            "hobby, free time, painting, drawing, collecting",

            "What's your hobby? — I enjoy...",

        ]),

        tip(
            "Not the Infinitive",
            "Don't say 'I enjoy to paint.' After 'enjoy', always use the -ing form: 'I enjoy painting.' This is different from verbs like 'want', which use 'to + verb'."
        ),

        culture(
            "Hobbies and Community",
            "In many English-speaking countries, hobby clubs are very common — chess clubs, hiking groups and photography meetups are popular ways to make friends who share the same interests."
        ),

        quiz(
            "Which sentence is grammatically correct?",
            ["I enjoy to paint.", "I enjoy painting.", "I enjoy paint.", "I enjoy painted."],
            1,
            "After 'enjoy', use the -ing form: 'I enjoy painting.'"
        ),

        quiz(
            "Which form follows 'be interested in'?",
            ["the base verb", "to + verb", "verb + -ing", "verb + -ed"],
            2,
            "'Be interested in' is followed by the -ing form: 'I'm interested in hiking.'"
        ),

        quiz(
            "Which hobby involves taking pictures?",
            ["gardening", "photography", "chess", "knitting"],
            1,
            "'Photography' is the hobby of taking pictures."
        )

    ],

    summary: {

        tip:
            "Practice describing your own hobbies using 'I enjoy...', 'I love...' and 'I'm interested in...'.",

        review: [

            "like / love / enjoy / hate + verb-ing",

            "be interested in + verb-ing",

            "hobby, free time, painting, drawing",

            "photography, gardening, hiking, chess"

        ]

    }

};
