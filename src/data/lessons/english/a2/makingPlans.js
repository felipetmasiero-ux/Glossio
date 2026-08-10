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

export const makingPlansLesson = {

    id: "english-a2-making-plans",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "plans",

    order: 11,

    title: "Fazendo Planos",

    subtitle:
        "Combine encontros com amigos e fale sobre planos futuros usando o presente contínuo em inglês.",

    description:
        "Aprenda a fazer, confirmar e cancelar planos, e use o presente contínuo para falar de eventos futuros já combinados.",

    cover: "/covers/making-plans.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "plans",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Make, confirm and cancel plans",

        "Use the present continuous for future arrangements",

        "Ask if someone is free or busy",

        "Invite someone to get together"

    ],

    vocabulary: vocabulary([
        "plan",
        "schedule",
        "available",
        "busy",
        "cancel",
        "postpone",
        "confirm",
        "invite",
        "get together",
        "hang out"
    ]),

    blocks: [

        heading("Are You Free This Weekend?"),

        paragraph(
            "When we talk about arranged plans in the future — things already decided, like a meeting or a trip — we usually use the present continuous, not 'will'."
        ),

        examples([
            {
                text: "I'm meeting my friend on Saturday.",
                translation: "Eu vou me encontrar com meu amigo no sábado."
            },

            {
                text: "We're hanging out this weekend if you're available.",
                translation: "Nós vamos sair juntos neste fim de semana, se você estiver disponível."
            },

            {
                text: "She's postponing the meeting because she's busy.",
                translation: "Ela está adiando a reunião porque está ocupada."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "Are you available this weekend? Let's get together." },
            { speaker: "Marco", text: "I'm actually busy on Saturday, but I'm free on Sunday." },
            { speaker: "Ana", text: "Great, let's confirm Sunday then. I'll invite Sofia too." },
            { speaker: "Marco", text: "Perfect. Please don't cancel this time!" }
        ]),

        grammar(
            "Present Continuous for Future Plans",
            "Use the present continuous (am/is/are + verb-ing) to talk about arranged plans in the future: 'I'm meeting Ana on Friday.' This is different from 'will', which is for predictions, not fixed plans."
        ),

        list([

            "I'm meeting.../We're hanging out... (arranged plans)",

            "Are you available/busy...?",

            "plan, schedule, confirm, cancel, postpone",

            "invite, get together, hang out"

        ]),

        tip(
            "Will vs Present Continuous",
            "Use 'will' for predictions or decisions made at the moment of speaking: 'I think it will rain.' Use the present continuous for plans already arranged: 'I'm having dinner with my parents tonight.'"
        ),

        culture(
            "Making Plans in Advance",
            "In many English-speaking cultures, it's common and polite to check someone's schedule and confirm plans a few days in advance, rather than inviting someone at the last minute."
        ),

        quiz(
            "Which sentence talks about an arranged plan?",
            ["I will meet her tomorrow.", "I'm meeting her tomorrow.", "I meet her tomorrow always.", "I meeting her tomorrow."],
            1,
            "Arranged future plans use the present continuous: 'I'm meeting her tomorrow.'"
        ),

        quiz(
            "Which word means 'to move an event to a later time'?",
            ["cancel", "confirm", "postpone", "invite"],
            2,
            "'Postpone' means to move something to a later time."
        ),

        quiz(
            "How do you ask if someone is free to meet?",
            ["Are you available this weekend?", "Are you cancelling this weekend?", "Are you scheduling this weekend?", "Are you postponing this weekend?"],
            0,
            "'Are you available...?' asks if someone is free to meet."
        )

    ],

    summary: {

        tip:
            "Practice inviting a friend to hang out this weekend, using the present continuous for your plan.",

        review: [

            "I'm meeting.../We're hanging out... (arranged plans)",

            "Are you available/busy?",

            "plan, schedule, confirm, cancel, postpone",

            "invite, get together, hang out"

        ]

    }

};
