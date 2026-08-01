import { presentSimpleBlocks } from "../../../grammar/shared/english/presentSimple";
import {
    heading,
    paragraph,
    examples,
    dialogue,
    grammar,
    tip,
    list,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const presentSimpleLesson = {

    id: "english-a1-present-simple",

    language: "english",

    level: "A1",

    category: "Grammar",

    topic: "present-simple",

    order: 8,

    title: "Present Simple",

    subtitle:
        "Talk about habits, routines and facts.",

    description:
        "Learn how to form the present simple tense in English and use it to talk about habits, routines and general facts.",

    cover: "/covers/present-simple.webp",

    estimatedTime: 10,

    difficulty: 2,

    xp: 35,

    tags: [
        "grammar",
        "present simple",
        "verbs"
    ],

    skills: [
        "grammar",
        "reading"
    ],

    objectives: [

        "Form affirmative present simple sentences",

        "Add -s for he/she/it",

        "Form questions and negatives with do/does",

        "Use the present simple for habits and facts"

    ],

    vocabulary: vocabulary([
        "work",
        "live",
        "study",
        "like",
        "go",
        "have",
        "every day",
        "usually",
        "always",
        "never"
    ]),

    blocks: [

        heading("Forming the Present Simple"),

        paragraph(
            "The present simple is used for habits, routines and general facts — things that are true in general, not just happening right now. For most subjects, use the base form of the verb: I work, you work, we work, they work."
        ),

        examples([
            {
                text: "I live in Brazil.",
                translation: "Eu moro no Brasil."
            },

            {
                text: "They study English every day.",
                translation: "Eles estudam inglês todo dia."
            },

            {
                text: "She works at a hospital.",
                translation: "Ela trabalha em um hospital."
            },

            {
                text: "The sun rises in the east.",
                translation: "O sol nasce no leste."
            }
        ]),

        grammar(presentSimpleBlocks[0].title, presentSimpleBlocks[0].text),

        dialogue([
            { speaker: "Interviewer", text: "What do you do every day?" },
            { speaker: "Lucas", text: "I wake up at 7, I work from 9 to 5, and I study English at night." },
            { speaker: "Interviewer", text: "Does your sister study English too?" },
            { speaker: "Lucas", text: "No, she doesn't. She prefers French." }
        ]),

        grammar(presentSimpleBlocks[1].title, presentSimpleBlocks[1].text),

        list([

            "I / you / we / they + verb",

            "he / she / it + verb-s",

            "Do you...? / Does she...?",

            "I don't... / She doesn't..."

        ]),

        tip(
            "Common Mistake",
            "Don't forget the -s in the third person: 'She work here' is incorrect. The correct form is 'She works here.'"
        ),

        quiz(
            "Which sentence is correct?",
            ["She work at a bank.", "She working at a bank.", "She do work at a bank.", "She works at a bank."],
            3,
            "Third person singular (she) needs -s: 'She works at a bank.'"
        ),

        quiz(
            "How do you make this sentence negative? 'He likes pizza.'",
            ["He doesn't like pizza.", "He no likes pizza.", "He not like pizza.", "He don't likes pizza."],
            0,
            "Use 'doesn't' + base verb for he/she/it negatives: 'He doesn't like pizza.'"
        ),

        quiz(
            "Which question is correctly formed?",
            ["Do she work here?", "Does she work here?", "Does she works here?", "Is she work here?"],
            1,
            "Use 'does' + base verb (no -s) for questions with he/she/it: 'Does she work here?'"
        ),

        quiz(
            "Which verb form is correct for 'go' with 'he'?",
            ["he go", "he goed", "he goes", "he going"],
            2,
            "'Go' ends in -o, so it takes -es in the third person: 'he goes'."
        )

    ],

    summary: {

        tip:
            "Whenever you talk about a routine or a fact, check: does the subject need an -s? Do I need 'do' or 'does' for the question or negative?",

        review: [

            "I/you/we/they + base verb",

            "he/she/it + verb-s (or -es)",

            "Do you...? / Does he...?",

            "I don't... / She doesn't...",

            "Used for habits, routines and facts"

        ]

    }

};
