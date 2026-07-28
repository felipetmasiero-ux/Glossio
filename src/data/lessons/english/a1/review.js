import {
    heading,
    paragraph,
    tip,
    culture,
    list,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const reviewLesson = {

    id: "english-a1-review",

    language: "english",

    level: "A1",

    category: "Review",

    topic: "review",

    order: 12,

    title: "A1 Module Review",

    subtitle:
        "Review everything you've learned in the A1 module.",

    description:
        "A final review of greetings, introductions, countries, numbers, family, jobs, present simple, routines, food and restaurants.",

    cover: "/covers/review.webp",

    estimatedTime: 12,

    difficulty: 2,

    xp: 40,

    tags: [
        "review",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Review key vocabulary from every A1 lesson",

        "Review the present simple tense",

        "Test yourself with questions from every topic",

        "Feel confident to move on to A2"

    ],

    vocabulary: vocabulary([]),

    blocks: [

        heading("You've Made It!"),

        paragraph(
            "Congratulations on reaching the end of the A1 module! You've learned how to greet people, introduce yourself, talk about countries, numbers, dates, family, jobs, routines, food and restaurants. This review brings it all together."
        ),

        list([

            "Greetings: Hello, Hi, Good morning/afternoon/evening/night",

            "Introductions: My name is..., Where are you from?",

            "Countries: Brazil → Brazilian, France → French",

            "Numbers: one to one hundred, twenty-one, thirty-five",

            "Days & Months: Monday-Sunday, January-December",

            "Family: mother, father, siblings, possessive 's",

            "Jobs: What do you do? I'm a/an...",

            "Present Simple: I work, she works, do/does",

            "Daily Routine: wake up, have breakfast, go to work",

            "Food: I'd like..., some/any",

            "Restaurant: Can I have..., the bill please"

        ]),

        quiz(
            "Which greeting is used before noon?",
            ["Good morning", "Good afternoon", "Good evening", "Good night"],
            0,
            "'Good morning' is used from early morning until around noon."
        ),

        quiz(
            "How do you politely reply to 'Nice to meet you'?",
            ["Please.", "Likewise.", "Thanks.", "Bye."],
            1,
            "'Likewise.' is a short, polite way to say 'Nice to meet you too.'"
        ),

        quiz(
            "What is the nationality for someone from France?",
            ["France", "Frenchy", "French", "Franch"],
            2,
            "The nationality adjective for France is 'French'."
        ),

        quiz(
            "How do you write 42 in words?",
            ["Four-two", "Fourty-two", "Forty two two", "Forty-two"],
            3,
            "Numbers 21-99 combine tens and units with a hyphen: forty-two."
        ),

        quiz(
            "Which preposition completes '___ Monday'?",
            ["on", "in", "at", "for"],
            0,
            "Use 'on' with days of the week: 'on Monday'."
        ),

        quiz(
            "What do you call a brother or a sister?",
            ["Parent", "Sibling", "Cousin", "Relative"],
            1,
            "'Sibling' is the gender-neutral word for brother or sister."
        ),

        quiz(
            "Which question asks about someone's occupation?",
            ["How old are you?", "Where are you from?", "What do you do?", "How are you?"],
            2,
            "'What do you do?' is the natural way to ask about someone's job."
        ),

        quiz(
            "Which sentence is correct?",
            ["She work here.", "She working here.", "She do work here.", "She works here."],
            3,
            "Third person singular (she) needs -s: 'She works here.'"
        ),

        quiz(
            "What is the correct order for a morning routine?",
            ["Wake up, get up, have breakfast", "Have breakfast, wake up, get up", "Get up, have breakfast, wake up", "Have breakfast, get up, wake up"],
            0,
            "The natural order is: wake up, get up, then have breakfast."
        ),

        quiz(
            "Which word completes 'Do you have ___ bread?'",
            ["some", "any", "a", "the"],
            1,
            "Use 'any' in questions: 'Do you have any bread?'"
        ),

        quiz(
            "What do you say to ask for the check at a restaurant?",
            ["The menu, please.", "The table, please.", "The bill, please.", "The tip, please."],
            2,
            "'The bill, please.' is how you ask to pay at the end of a meal."
        ),

        tip(
            "Keep Practicing",
            "The best way to remember everything from this module is to use it: greet someone, describe your day, or order food out loud, even if you're just practicing alone."
        ),

        culture(
            "Your Learning Journey",
            "Every A1 learner started exactly where you are now. Consistency matters more than speed — a little practice every day will take you further than a single long study session."
        )

    ],

    summary: {

        tip:
            "Well done! Try reviewing any topic you found difficult one more time before moving on to the A2 module.",

        review: [

            "You've completed 11 lessons in the A1 module.",

            "You can greet people, introduce yourself and talk about your daily life.",

            "You understand the present simple tense.",

            "You're ready to start the A2 module!"

        ]

    }

};
