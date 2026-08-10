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

export const technologyLesson = {

    id: "english-a2-technology",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "technology",

    order: 6,

    title: "Tecnologia",

    subtitle:
        "Fale sobre aparelhos e aplicativos, e descreva como a tecnologia mudou usando 'used to' em inglês.",

    description:
        "Aprenda vocabulário de tecnologia e como contrastar hábitos do passado com o presente usando 'used to'.",

    cover: "/covers/technology.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "technology",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Talk about everyday devices and apps",

        "Use 'used to' to describe past habits",

        "Contrast the past with the present",

        "Understand basic tech problems"

    ],

    vocabulary: vocabulary([
        "smartphone",
        "laptop",
        "wifi",
        "battery",
        "charger",
        "screen",
        "app",
        "update",
        "device",
        "download"
    ]),

    blocks: [

        heading("Life Before Smartphones"),

        paragraph(
            "Technology changes fast! To talk about things that were true in the past but aren't true now, we use 'used to' + base verb."
        ),

        examples([
            {
                text: "People used to write letters, but now they send messages on their smartphone.",
                translation: "As pessoas costumavam escrever cartas, mas agora enviam mensagens pelo smartphone."
            },

            {
                text: "I used to have a small screen, but now my laptop has a big one.",
                translation: "Eu costumava ter uma tela pequena, mas agora meu notebook tem uma grande."
            },

            {
                text: "My battery didn't use to last this long.",
                translation: "Minha bateria não costumava durar tanto tempo."
            }
        ]),

        dialogue([
            { speaker: "Grandson", text: "Did you use to have a smartphone when you were young?" },
            { speaker: "Grandmother", text: "No, we didn't. We used to write letters instead." },
            { speaker: "Grandson", text: "That's so different! Now I download every app I need." },
            { speaker: "Grandmother", text: "I know. Technology used to be so much simpler." }
        ]),

        grammar(
            "Used To",
            "Use 'used to' + base verb for past habits or states that are no longer true: 'I used to have a flip phone.' Negative: 'I didn't use to have wifi at home.' Question: 'Did you use to text on a small screen?'"
        ),

        list([

            "used to + base verb (past habit, not true now)",

            "Did you use to...? — Yes, I used to. / No, I didn't use to.",

            "smartphone, laptop, wifi, battery, charger",

            "download an app / update the app / charge the battery"

        ]),

        tip(
            "Used To vs Use To",
            "'Used to' is for statements: 'I used to...'. In negatives and questions, drop the 'd': 'I didn't use to...' / 'Did you use to...?' This is a very common mistake, even for advanced learners."
        ),

        culture(
            "How Fast Technology Changes",
            "Many people who grew up before smartphones remember using landline phones, physical maps and paper letters — habits that have almost disappeared for younger generations."
        ),

        quiz(
            "Which sentence correctly uses 'used to'?",
            ["I use to have a flip phone.", "I used to have a flip phone.", "I used having a flip phone.", "I am used to have a flip phone."],
            1,
            "'Used to' + base verb describes a past habit: 'I used to have a flip phone.'"
        ),

        quiz(
            "Which is the correct negative form?",
            ["I didn't used to have wifi.", "I didn't use to have wifi.", "I don't used to have wifi.", "I not used to have wifi."],
            1,
            "In negatives, 'used' loses the '-d': 'I didn't use to have wifi.'"
        ),

        quiz(
            "What do you call the part of a laptop that shows images?",
            ["battery", "charger", "screen", "device"],
            2,
            "The 'screen' is the part of a device that displays images and text."
        )

    ],

    summary: {

        tip:
            "Practice describing something you used to do before you had a smartphone.",

        review: [

            "used to + base verb (past habits)",

            "Did you use to...? / I didn't use to...",

            "smartphone, laptop, wifi, battery, charger",

            "download, update, device, screen"

        ]

    }

};
