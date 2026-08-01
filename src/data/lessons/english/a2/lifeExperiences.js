import { lifeExperiencesBlocks } from "../../../grammar/shared/english/lifeExperiences";
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

export const lifeExperiencesLesson = {

    id: "english-a2-life-experiences",

    language: "english",

    level: "A2",

    category: "Grammar",

    topic: "life-experiences",

    order: 12,

    title: "Life Experiences",

    subtitle:
        "Talk about things you have and haven't done in your life using the present perfect.",

    description:
        "Learn how to talk about life experiences using the present perfect with 'ever', 'never', 'already' and 'yet'.",

    cover: "/covers/life-experiences.webp",

    estimatedTime: 10,

    difficulty: 2,

    xp: 40,

    tags: [
        "grammar",
        "vocabulary",
        "review"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Use the present perfect to talk about experiences",

        "Ask 'Have you ever...?'",

        "Use 'already' and 'yet' correctly",

        "Talk about achievements and challenges in your life"

    ],

    vocabulary: vocabulary([
        "experience",
        "achievement",
        "abroad",
        "adventure",
        "challenge",
        "accomplish",
        "career",
        "milestone",
        "ever",
        "already"
    ]),

    blocks: [

        heading("Have You Ever...?"),

        paragraph(
            "The present perfect (have/has + past participle) is used to talk about life experiences, without saying exactly when they happened. It's perfect for talking about achievements, adventures and challenges."
        ),

        examples([
            {
                text: "Have you ever traveled abroad?",
                translation: "Você já viajou para o exterior alguma vez?"
            },

            {
                text: "I've already had many challenges in my career.",
                translation: "Eu já tive muitos desafios na minha carreira."
            },

            {
                text: "She hasn't accomplished that goal yet, but it's a big milestone for her.",
                translation: "Ela ainda não alcançou esse objetivo, mas é um grande marco para ela."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "Have you ever had an adventure abroad?" },
            { speaker: "Marco", text: "Yes, I've already traveled to three countries." },
            { speaker: "Ana", text: "That's a great experience! Any big challenges?" },
            { speaker: "Marco", text: "Definitely. But it's one of my proudest achievements." }
        ]),

        grammar(lifeExperiencesBlocks[0].title, lifeExperiencesBlocks[0].text),

        list([

            "Have you ever...? — Yes, I have. / No, I haven't.",

            "I have never... / I have already...",

            "Have you finished yet? — Not yet.",

            "experience, achievement, adventure, challenge, milestone"

        ]),

        tip(
            "Already vs Yet",
            "'Already' usually goes in the middle of the sentence in affirmatives: 'I have already finished.' 'Yet' usually goes at the end, in questions and negatives: 'Have you finished yet?' / 'I haven't finished yet.'"
        ),

        culture(
            "Talking About Achievements",
            "In many English-speaking cultures, it's common and encouraged to talk openly about personal achievements and milestones, like graduating, traveling abroad, or reaching a career goal."
        ),

        quiz(
            "Which question asks about a life experience?",
            ["Do you ever travel abroad?", "Have you ever traveled abroad?", "Did you ever travel abroad?", "Will you ever travel abroad?"],
            1,
            "'Have you ever...?' + past participle asks about life experiences."
        ),

        quiz(
            "Which word goes with a negative experience?",
            ["ever", "never", "already", "yet"],
            1,
            "'Never' is used for something that hasn't happened at any point: 'I have never been to Japan.'"
        ),

        quiz(
            "Where does 'yet' usually go in a negative sentence?",
            ["At the beginning", "Right after 'have'", "At the end", "Before the past participle"],
            2,
            "'Yet' usually goes at the end of negative sentences and questions: 'I haven't finished yet.'"
        )

    ],

    summary: {

        tip:
            "Practice talking about three life experiences using 'I have already...' and one thing you 'have never' done.",

        review: [

            "Have you ever...? / I have never...",

            "I have already... / not yet",

            "experience, achievement, adventure, challenge",

            "career, milestone, accomplish, abroad"

        ]

    }

};
