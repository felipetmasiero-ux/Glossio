import {
    heading,
    paragraph,
    examples,
    dialogue,
    tip,
    culture,
    list,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const b1ReviewLesson = {

    id: "english-b1-review",

    language: "english",

    level: "B1",

    category: "Review",

    topic: "review",

    order: 12,

    title: "B1 Review & Real-Life Communication",

    subtitle:
        "Revise toda a gramática do módulo B1 em situações reais de comunicação, combinando present perfect, condicionais, voz passiva e muito mais.",

    description:
        "Uma revisão final combinando present perfect, future forms, relative clauses, modal verbs, narrative tenses, gerúndio/infinitivo, linking words, first conditional, voz passiva e reported speech.",

    cover: "/covers/b1-review.webp",

    estimatedTime: 14,

    difficulty: 3,

    xp: 45,

    tags: [
        "review",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Review every grammar point from the B1 module",

        "Recognize and combine multiple structures in real conversation",

        "Test yourself with mixed questions from every lesson",

        "Feel ready to communicate confidently at B1 level"

    ],

    vocabulary: vocabulary([
        "turning point",
        "unforgettable",
        "ambitious",
        "motivated",
        "trustworthy",
        "get along with",
        "colleague",
        "promotion",
        "itinerary",
        "delayed flight",
        "stressed out",
        "burnout",
        "screen time",
        "addicted to",
        "in my opinion",
        "on the contrary",
        "sustainable",
        "climate change",
        "thought-provoking",
        "headline",
        "out of the blue"
    ]),

    blocks: [

        heading("You've Reached B1!"),

        paragraph(
            "Congratulations on completing the B1 module! You've learned to talk about experiences, plans, relationships, work, travel, health, technology, opinions, the environment, media and news. This lesson brings every structure together in real, natural conversation."
        ),

        examples([
            {
                text: "I've just finished a course that I'm really proud of.",
                translation: "Acabei de terminar um curso do qual estou muito orgulhoso."
            },
            {
                text: "I'm going to apply for a promotion next month.",
                translation: "Vou me candidatar a uma promoção no mês que vem."
            },
            {
                text: "My colleague who sits next to me said I should go for it.",
                translation: "Meu colega que senta ao meu lado disse que eu deveria tentar."
            },
            {
                text: "While I was preparing for the interview, I felt a bit stressed out.",
                translation: "Enquanto eu estava me preparando para a entrevista, fiquei um pouco estressado."
            },
            {
                text: "You'd better prepare well, or you'll regret it.",
                translation: "É melhor você se preparar bem, ou vai se arrepender."
            },
            {
                text: "I've decided to stop worrying so much about screen time and focus on my goals instead.",
                translation: "Decidi parar de me preocupar tanto com tempo de tela e focar nas minhas metas."
            },
            {
                text: "If I get the promotion, I'll finally feel like all my hard work paid off.",
                translation: "Se eu conseguir a promoção, finalmente vou sentir que todo meu esforço valeu a pena."
            },
            {
                text: "The interview was recorded, and I was told the results would be announced soon.",
                translation: "A entrevista foi gravada, e me disseram que os resultados seriam anunciados em breve."
            }
        ]),

        dialogue([
            { speaker: "Sofia", text: "Hey! I haven't seen you since you got back from your trip. What have you been up to?" },
            { speaker: "Lucas", text: "A lot! I've just finished a course in project management, actually." },
            { speaker: "Sofia", text: "Wow, congratulations! Are you going to look for a new job?" },
            { speaker: "Lucas", text: "Yes, I'm going to apply for a promotion at my company first. If I get it, I'll be leading my own team." },
            { speaker: "Sofia", text: "That's amazing. You should definitely go for it — you're one of the most reliable people I know." },
            { speaker: "Lucas", text: "Thanks! I was really nervous about the interview, though. While I was preparing, I barely slept." },
            { speaker: "Sofia", text: "I get that. You'd better rest this weekend, or you'll be exhausted." },
            { speaker: "Lucas", text: "You're right. By the way, have you heard the news about our old colleague?" },
            { speaker: "Sofia", text: "No, what happened?" },
            { speaker: "Lucas", text: "Apparently, she was offered a job abroad. She told me she was thinking about moving overseas." },
            { speaker: "Sofia", text: "Wow, that's a huge decision. Well, in my opinion, if it's the right opportunity, she should take it." },
            { speaker: "Lucas", text: "I agree. To sum up, it looks like everyone's making big changes this year — including me!" }
        ]),

        list([

            "Present Perfect vs Past Simple — ever/never/already/yet/just",

            "Future forms — will / going to / present continuous",

            "Defining relative clauses — who / which / that / where",

            "Modal verbs — must/have to/mustn't/should/can/could",

            "Narrative tenses — past continuous + past simple",

            "should / ought to / had better",

            "Gerunds and infinitives",

            "Linking words for opinions and arguments",

            "First conditional",

            "Passive voice",

            "Reported speech"

        ]),

        quiz(
            "Which sentence correctly uses the present perfect?",
            [
                "I have seen that movie yesterday.",
                "I have never seen that movie.",
                "I have seeing that movie.",
                "I have see that movie."
            ],
            1,
            "'I have never seen that movie' correctly uses the present perfect to talk about experience with no specific time."
        ),

        quiz(
            "Choose the sentence describing an already-decided plan.",
            [
                "I'll probably go.",
                "I'm going to go — I already bought the ticket.",
                "I go there sometimes.",
                "I went there once."
            ],
            1,
            "'Going to' is used for plans decided before the moment of speaking."
        ),

        quiz(
            "Choose the correct relative clause.",
            [
                "She's the friend which helps me.",
                "She's the friend who helps me.",
                "She's the friend where helps me.",
                "She's the friend whom helps me."
            ],
            1,
            "'Who' is used for people in a defining relative clause."
        ),

        quiz(
            "Choose the correct modal for prohibition.",
            ["don't have to", "mustn't", "should", "could"],
            1,
            "'Mustn't' expresses prohibition — something that is not allowed."
        ),

        quiz(
            "Choose the correct sentence combining two past actions.",
            [
                "I watched TV when she was calling me.",
                "I was watching TV when she called me.",
                "I watch TV when she call me.",
                "I have watched TV when she called me."
            ],
            1,
            "The past continuous sets the scene ('I was watching TV'), and the past simple shows the interrupting action ('she called me')."
        ),

        quiz(
            "Choose the stronger warning.",
            ["You should rest.", "You could rest.", "You'd better rest, or you'll get sick.", "You may rest."],
            2,
            "'Had better' warns about a real negative consequence, making it stronger than 'should' or 'could'."
        ),

        quiz(
            "Choose the correct form: \"She avoids ___ junk food.\"",
            ["eat", "to eat", "eating", "ate"],
            2,
            "'Avoid' is followed by the gerund: 'avoids eating'."
        ),

        quiz(
            "Choose the correct linking word for contrast.",
            ["because", "however", "therefore", "since"],
            1,
            "'However' is used to introduce a contrasting idea."
        ),

        quiz(
            "Choose the correct first conditional sentence.",
            [
                "If it will rain, we'll stay home.",
                "If it rains, we'll stay home.",
                "If it rain, we'll stay home.",
                "If it raining, we'll stay home."
            ],
            1,
            "The if-clause uses the present simple, not 'will': 'If it rains, we'll stay home.'"
        ),

        quiz(
            "Choose the correct passive sentence.",
            [
                "The movie directed by her.",
                "The movie was directed by her.",
                "The movie directs by her.",
                "The movie is direct by her."
            ],
            1,
            "The passive needs 'be' + past participle: 'was directed'."
        ),

        quiz(
            "Choose the correct reported speech. Original: \"I am tired.\"",
            ["She said she is tired.", "She said she was tired.", "She said she tired.", "She say she was tired."],
            1,
            "The present simple 'am' shifts back to the past simple 'was' in reported speech."
        ),

        tip(
            "Keep Practicing With Real Conversations",
            "The best way to consolidate B1 grammar is to use it in real conversations. Try telling a friend about your week and see how many of these structures you can naturally combine — present perfect, conditionals, modals and more."
        ),

        culture(
            "Reaching B1: An Independent User",
            "Reaching B1 means you can handle most everyday situations while traveling, describe experiences and opinions, and explain your reasoning on familiar topics. The CEFR calls this level an 'independent user' — a major milestone in your learning journey."
        )

    ],

    summary: {

        tip:
            "Well done! Try reviewing any grammar point you found difficult one more time, then keep practicing with real conversations.",

        review: [

            "You've completed 11 lessons in the B1 module.",

            "You can talk about experiences, plans, relationships, work and more.",

            "You've combined present perfect, conditionals, modals, passive and reported speech.",

            "You're ready to keep building fluency at B1 and beyond!"

        ]

    }

};
