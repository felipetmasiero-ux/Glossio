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

export const feelingsLesson = {

    id: "english-a2-feelings",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "feelings",

    order: 8,

    title: "Sentimentos e Emoções",

    subtitle:
        "Descreva como você se sente e o que causa esse sentimento, usando adjetivos -ed e -ing em inglês.",

    description:
        "Aprenda a descrever emoções e a diferença entre adjetivos -ed (como você se sente) e -ing (o que causa o sentimento).",

    cover: "/covers/feelings.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "feelings",
        "emotions",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Describe emotions with adjectives",

        "Understand the difference between -ed and -ing adjectives",

        "Say what makes you feel a certain way",

        "Ask how someone feels and why"

    ],

    vocabulary: vocabulary([
        "bored",
        "boring",
        "excited",
        "exciting",
        "embarrassed",
        "embarrassing",
        "confused",
        "confusing",
        "disappointed",
        "disappointing"
    ]),

    blocks: [

        heading("How Do You Feel?"),

        paragraph(
            "In English, adjectives ending in -ed describe how a person feels, while adjectives ending in -ing describe what causes that feeling. 'I'm bored' means you feel boredom; 'This movie is boring' means the movie causes that feeling."
        ),

        examples([
            {
                text: "I'm bored. This class is boring.",
                translation: "Estou entediado. Esta aula é entediante."
            },

            {
                text: "She's excited about the trip. It's an exciting trip.",
                translation: "Ela está animada com a viagem. É uma viagem empolgante."
            },

            {
                text: "The instructions were confusing, so I felt confused.",
                translation: "As instruções estavam confusas, então eu me senti confuso."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "Why do you look disappointed?" },
            { speaker: "Marco", text: "The movie was really disappointing. I expected something exciting." },
            { speaker: "Ana", text: "That's too bad. I was bored at home instead!" },
            { speaker: "Marco", text: "Ha! Let's do something less boring this weekend." }
        ]),

        grammar(
            "-ed vs -ing Adjectives",
            "-ed adjectives describe feelings: bored, excited, embarrassed, confused, disappointed. -ing adjectives describe the cause of the feeling: boring, exciting, embarrassing, confusing, disappointing. 'I am bored' (feeling) vs 'The book is boring' (cause)."
        ),

        list([

            "bored (feeling) — boring (cause)",

            "excited (feeling) — exciting (cause)",

            "embarrassed (feeling) — embarrassing (cause)",

            "confused (feeling) — confusing (cause)",

            "disappointed (feeling) — disappointing (cause)"

        ]),

        tip(
            "People Feel -ed, Things Are -ing",
            "A simple rule: people usually feel the -ed adjective ('I'm interested'), while things, situations or people that cause the feeling take -ing ('The book is interesting')."
        ),

        culture(
            "Talking About Feelings",
            "In casual English conversation, people often exaggerate feelings for emphasis, saying things like 'I'm SO bored' or 'That was SO embarrassing' to sound more expressive."
        ),

        quiz(
            "Which sentence describes how a person feels?",
            ["The movie is boring.", "I'm bored.", "The class is confusing.", "It's an exciting trip."],
            1,
            "'I'm bored' uses the -ed adjective to describe how the person feels."
        ),

        quiz(
            "Which adjective describes something that causes embarrassment?",
            ["embarrassed", "embarrassing", "embarrass", "embarrassment"],
            1,
            "'Embarrassing' describes the cause of the feeling: 'That was an embarrassing moment.'"
        ),

        quiz(
            "Which sentence is grammatically correct?",
            ["I'm exciting about the trip.", "I'm excited about the trip.", "The trip is excited.", "I feel exciting."],
            1,
            "To describe how you feel, use the -ed form: 'I'm excited about the trip.'"
        )

    ],

    summary: {

        tip:
            "Practice describing something that happened recently using both an -ed and an -ing adjective, like 'The test was confusing, so I felt confused.'",

        review: [

            "bored/boring, excited/exciting",

            "embarrassed/embarrassing",

            "confused/confusing",

            "disappointed/disappointing"

        ]

    }

};
