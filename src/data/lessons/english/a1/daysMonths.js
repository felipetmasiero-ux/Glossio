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

export const daysMonthsLesson = {

    id: "english-a1-days-months",

    language: "english",

    level: "A1",

    category: "Basics",

    order: 5,

    title: "Days & Months",

    subtitle:
        "Talk about the days of the week, the months and dates.",

    description:
        "Learn the days of the week, the months of the year, and how to talk about dates and plans.",

    cover: "/covers/days-months.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 25,

    tags: [
        "calendar",
        "vocabulary",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary"
    ],

    objectives: [

        "Name the days of the week",

        "Name the months of the year",

        "Say today's date",

        "Talk about weekly plans"

    ],

    vocabulary: vocabulary([
        "Monday",
        "Friday",
        "weekend",
        "January",
        "December",
        "today",
        "tomorrow",
        "yesterday",
        "What day is it?"
    ]),

    blocks: [

        heading("Days of the Week"),

        paragraph(
            "The week in English starts on Sunday for many calendars, but in conversation people often think of Monday as the first day of the working week. All days and months are always capitalized in English."
        ),

        list([

            "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"

        ]),

        examples([
            {
                text: "Today is Monday.",
                translation: "Hoje é segunda-feira."
            },

            {
                text: "I have English class on Tuesdays and Thursdays.",
                translation: "Eu tenho aula de inglês às terças e quintas."
            },

            {
                text: "See you on Friday!",
                translation: "Te vejo na sexta-feira!"
            }
        ]),

        heading("Months of the Year"),

        list([

            "January, February, March, April, May, June",

            "July, August, September, October, November, December"

        ]),

        examples([
            {
                text: "My birthday is in July.",
                translation: "Meu aniversário é em julho."
            },

            {
                text: "We start school in September.",
                translation: "Nós começamos a escola em setembro."
            }
        ]),

        grammar(
            "On vs In",
            "Use 'on' with days: 'on Monday', 'on Fridays'. Use 'in' with months and years: 'in July', 'in 2024'. Use 'at' with specific times of the day: 'at night'."
        ),

        dialogue([
            { speaker: "Marco", text: "What are you doing this weekend?" },
            { speaker: "Sofia", text: "I'm free on Saturday, but I'm busy on Sunday." },
            { speaker: "Marco", text: "Great, let's meet on Saturday then!" },
            { speaker: "Sofia", text: "Sounds good. What time?" }
        ]),

        tip(
            "Ordinal Dates",
            "Dates use ordinal numbers: 'the first of July', 'July 1st'. In American English, the month usually comes first: 07/01 means July 1st, not January 7th."
        ),

        culture(
            "Different Calendars",
            "Some countries start the week on Sunday, others on Monday. Digital calendars often let you choose, so don't be surprised if a schedule looks 'shifted' compared to what you're used to."
        ),

        quiz(
            "Which day comes after Wednesday?",
            ["Monday", "Friday", "Thursday", "Tuesday"],
            2,
            "The order is Monday, Tuesday, Wednesday, Thursday, Friday."
        ),

        quiz(
            "Which preposition is correct: '___ July'?",
            ["on", "at", "for", "in"],
            3,
            "Use 'in' with months: 'in July'."
        ),

        quiz(
            "Which preposition is correct: '___ Monday'?",
            ["on", "in", "at", "by"],
            0,
            "Use 'on' with days of the week: 'on Monday'."
        )

    ],

    summary: {

        tip:
            "Try saying today's full date out loud: the day of the week, the day of the month and the month.",

        review: [

            "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",

            "January to December",

            "on + day, in + month",

            "today, tomorrow, yesterday"

        ]

    }

};
