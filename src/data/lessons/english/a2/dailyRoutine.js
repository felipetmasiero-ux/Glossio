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

export const dailyRoutineA2Lesson = {

    id: "english-a2-daily-routine",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "daily-routine",

    order: 1,

    title: "Daily Routine",

    subtitle:
        "Talk about how often you do things, and describe your habits in more detail.",

    description:
        "Go beyond simple daily routine phrases and learn to describe how often you do things using adverbs of frequency.",

    cover: "/covers/daily-routine-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "daily routine",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Use adverbs of frequency correctly",

        "Ask and answer 'How often...?'",

        "Describe a morning and evening routine in detail",

        "Talk about chores and housework"

    ],

    vocabulary: vocabulary([
        "often",
        "rarely",
        "hardly ever",
        "get dressed",
        "brush your teeth",
        "take a shower",
        "commute",
        "chores",
        "housework",
        "routine"
    ]),

    blocks: [

        heading("How Often Do You...?"),

        paragraph(
            "In A1, you learned simple daily routine phrases like 'wake up' and 'have breakfast'. Now let's talk about how often you do things, using adverbs of frequency: always, usually, often, sometimes, rarely, hardly ever, never."
        ),

        examples([
            {
                text: "I always brush my teeth after breakfast.",
                translation: "Eu sempre escovo os dentes depois do café da manhã."
            },

            {
                text: "She rarely does the housework on weekends.",
                translation: "Ela raramente faz os afazeres domésticos nos fins de semana."
            },

            {
                text: "We often commute together by train.",
                translation: "Nós frequentemente vamos trabalhar juntos de trem."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "How often do you do the chores at home?" },
            { speaker: "Marco", text: "I usually clean the kitchen, but I hardly ever do the laundry." },
            { speaker: "Ana", text: "What's your morning routine like?" },
            { speaker: "Marco", text: "I get dressed, take a shower, and then commute to work." }
        ]),

        grammar(
            "Adverbs of Frequency",
            "Adverbs of frequency (always, usually, often, sometimes, rarely, hardly ever, never) go before the main verb, but after the verb 'to be': 'I often walk to work.' / 'She is usually tired after work.' Use 'How often...?' to ask about frequency: 'How often do you exercise?'"
        ),

        list([

            "always (100%) → usually → often → sometimes → rarely → hardly ever → never (0%)",

            "How often do you...? — I usually... / I hardly ever...",

            "get dressed, take a shower, brush your teeth",

            "chores, housework, routine"

        ]),

        tip(
            "Position Matters",
            "Don't say 'I go often to the gym.' The adverb goes before the main verb: 'I often go to the gym.' With 'to be', it comes right after: 'He is always late.'"
        ),

        culture(
            "Routines Around the World",
            "Daily routines vary a lot between cultures — some countries have a long midday break for lunch and rest, while others eat a quick lunch and work straight through the afternoon."
        ),

        quiz(
            "Which sentence uses the adverb of frequency correctly?",
            ["I often go to the gym.", "I go often to the gym.", "Often I go to the gym.", "I go to the gym often always."],
            0,
            "Adverbs of frequency go before the main verb: 'I often go to the gym.'"
        ),

        quiz(
            "Where does the adverb of frequency go with the verb 'to be'?",
            ["Before 'to be'", "After 'to be'", "At the end of the sentence only", "It never combines with 'to be'"],
            1,
            "With 'to be', the adverb comes right after: 'She is usually tired.'"
        ),

        quiz(
            "Which question asks about frequency?",
            ["What do you do?", "How often do you exercise?", "Where do you exercise?", "Why do you exercise?"],
            1,
            "'How often...?' is the question used to ask about frequency."
        )

    ],

    summary: {

        tip:
            "Describe your own daily routine out loud using at least three different adverbs of frequency.",

        review: [

            "always, usually, often, sometimes, rarely, hardly ever, never",

            "How often do you...?",

            "get dressed, take a shower, brush your teeth",

            "chores, housework, commute"

        ]

    }

};
