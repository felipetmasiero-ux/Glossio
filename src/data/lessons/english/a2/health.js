import { healthBlocks } from "../../../grammar/shared/english/health";
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

export const healthLesson = {

    id: "english-a2-health",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "health",

    order: 3,

    title: "Saúde",

    subtitle:
        "Descreva sintomas, peça conselhos e fale sobre ir ao médico em inglês.",

    description:
        "Aprenda a descrever como você se sente, sintomas e doenças comuns, e como dar e pedir conselhos usando 'should'.",

    cover: "/covers/health.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "health",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Describe common symptoms and illnesses",

        "Give and ask for advice using 'should'",

        "Make a doctor's appointment",

        "Talk about medicine and the pharmacy"

    ],

    vocabulary: vocabulary([
        "headache",
        "stomachache",
        "fever",
        "cough",
        "sore throat",
        "dizzy",
        "medicine",
        "pharmacy",
        "appointment",
        "symptom"
    ]),

    blocks: [

        heading("How Are You Feeling?"),

        paragraph(
            "Being able to describe symptoms is one of the most useful skills in English, whether you're at the pharmacy or the doctor's office. We often use 'should' to give or ask for advice about health."
        ),

        examples([
            {
                text: "I have a headache and a sore throat.",
                translation: "Estou com dor de cabeça e dor de garganta."
            },

            {
                text: "You should see a doctor if the fever doesn't go away.",
                translation: "Você deveria consultar um médico se a febre não passar."
            },

            {
                text: "She feels dizzy, so she made an appointment.",
                translation: "Ela está sentindo tontura, então marcou uma consulta."
            }
        ]),

        dialogue([
            { speaker: "Patient", text: "I have a bad cough and I feel dizzy." },
            { speaker: "Doctor", text: "Do you have a fever too?" },
            { speaker: "Patient", text: "Yes, since yesterday." },
            { speaker: "Doctor", text: "You should rest and take this medicine twice a day." }
        ]),

        grammar(healthBlocks[0].title, healthBlocks[0].text),

        list([

            "headache, stomachache, fever, cough, sore throat",

            "You should... / You shouldn't...",

            "Should I...? — Yes, you should. / No, you shouldn't.",

            "medicine, pharmacy, appointment, symptom"

        ]),

        tip(
            "Should vs Have To",
            "'Should' is advice, not an obligation: 'You should rest' is a suggestion. 'You have to rest' sounds like a rule or a doctor's order. Choose 'should' when you're just recommending something."
        ),

        culture(
            "Pharmacies Abroad",
            "In many English-speaking countries, pharmacists can give basic health advice and recommend over-the-counter medicine for minor symptoms, so you don't always need to see a doctor first."
        ),

        quiz(
            "Which sentence correctly gives advice?",
            ["You should to rest.", "You should rest.", "You should resting.", "You are should rest."],
            1,
            "'Should' is followed by the base verb, with no 'to': 'You should rest.'"
        ),

        quiz(
            "How do you ask for advice about health?",
            ["Should I see a doctor?", "I should see a doctor?", "Do I should see a doctor?", "Am I should see a doctor?"],
            0,
            "Questions with 'should' invert the subject: 'Should I see a doctor?'"
        ),

        quiz(
            "Which word describes feeling like everything is spinning?",
            ["fever", "cough", "dizzy", "symptom"],
            2,
            "'Dizzy' describes the feeling of everything spinning or being unsteady."
        )

    ],

    summary: {

        tip:
            "Practice describing a symptom and giving advice using 'should', like 'I have a headache. You should rest.'",

        review: [

            "headache, stomachache, fever, cough, sore throat, dizzy",

            "You should... / You shouldn't...",

            "Should I...?",

            "medicine, pharmacy, appointment, symptom"

        ]

    }

};
