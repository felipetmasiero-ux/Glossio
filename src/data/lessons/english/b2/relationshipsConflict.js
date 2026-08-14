import { relationshipsConflictBlocks } from "../../../grammar/shared/english/b2/relationshipsConflict";
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

export const relationshipsConflictLesson = {

    id: "english-b2-relationships-conflict",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "relationships-conflict",

    order: 9,

    title: "Communication, Relationships & Conflict",

    subtitle:
        "Expresse arrependimentos e frustrações em inglês usando 'wish' e 'if only' para falar sobre comunicação e conflitos.",

    description:
        "Aprenda vocabulário sobre comunicação interpessoal e resolução de conflitos, e como usar 'wish' e 'if only' para expressar desejos, arrependimentos e frustração.",

    cover: "/covers/relationships-conflict.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "relationships",
        "wish",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss communication, misunderstandings and conflict",

        "Use 'wish'/'if only' + past simple for present wishes",

        "Use 'wish'/'if only' + past perfect for past regrets",

        "Use 'wish' + 'would' to express frustration about others"

    ],

    vocabulary: vocabulary([
        "misunderstanding",
        "miscommunication",
        "resolve a conflict",
        "compromise",
        "reconcile",
        "hold a grudge",
        "bottle up",
        "open up to",
        "see eye to eye",
        "get through to someone",
        "read the room",
        "tension",
        "defuse a situation",
        "empathize with",
        "active listening",
        "assertive",
        "passive-aggressive",
        "address an issue",
        "mend a relationship",
        "give someone the benefit of the doubt"
    ]),

    blocks: [

        heading("Wishes, Regrets and Frustration"),

        paragraph(
            "When we talk about relationships and conflict, we often reflect on what we wish were different — right now, in the past, or about someone else's behavior. English uses 'wish' and 'if only' with different tenses to express each of these."
        ),

        examples([
            {
                text: "I wish we communicated better — we always seem to misunderstand each other.",
                translation: "Eu queria que a gente se comunicasse melhor — sempre parece que nos entendemos mal."
            },
            {
                text: "If only I hadn't said that during the argument.",
                translation: "Eu queria não ter dito aquilo durante a discussão."
            },
            {
                text: "I wish you would listen to me more instead of getting defensive.",
                translation: "Eu queria que você me escutasse mais em vez de ficar na defensiva."
            },
            {
                text: "She wishes she had handled the conflict differently.",
                translation: "Ela gostaria de ter lidado com o conflito de outra forma."
            },
            {
                text: "I wish I could read the room better in tense situations.",
                translation: "Eu queria conseguir perceber melhor o clima em situações tensas."
            },
            {
                text: "If only we'd talked about this sooner, we could have avoided the whole misunderstanding.",
                translation: "Se a gente tivesse conversado sobre isso antes, poderíamos ter evitado todo o mal-entendido."
            }
        ]),

        dialogue([
            { speaker: "Yara", text: "You seem a little off today. Did something happen with Alex?" },
            { speaker: "Ben", text: "Yeah, we had a pretty tense conversation last night. I wish I'd handled it better." },
            { speaker: "Yara", text: "What happened?" },
            { speaker: "Ben", text: "I got defensive instead of just listening. If only I hadn't reacted that way." },
            { speaker: "Yara", text: "That happens to everyone. Have you talked since then?" },
            { speaker: "Ben", text: "Not yet. I wish we communicated better in general — we always seem to misunderstand each other over small things." },
            { speaker: "Yara", text: "Maybe try opening up about how you actually felt, instead of bottling it up." },
            { speaker: "Ben", text: "You're right. I wish I could read the room better in the moment, instead of realizing afterward." },
            { speaker: "Yara", text: "Honestly, that's a skill everyone's still working on. Just don't hold onto it — reach out before it turns into a bigger issue." },
            { speaker: "Ben", text: "Good advice. I'll talk to her tonight." }
        ]),

        grammar(relationshipsConflictBlocks[0].title, relationshipsConflictBlocks[0].text),

        list([

            "wish/if only + past simple — present wish",

            "wish/if only + past perfect — past regret",

            "wish + would — frustration about someone else",

            "misunderstanding, compromise, reconcile, tension"

        ]),

        tip(
            "Wish + Would Is Only for Others",
            "'Wish + would' is only for other people's actions or things you can't control, not your own actions. 'I wish you would listen' is correct, but 'I wish I would listen' sounds strange. For your own actions, use 'I wish I listened more' or a real intention instead."
        ),

        culture(
            "Emotional Vocabulary in English",
            "English speakers, especially influenced by therapy-style language that has become common in everyday speech, often use fairly direct emotional vocabulary — 'I feel unheard', 'I need space', 'let's take a step back' — aimed at de-escalating conflict rather than avoiding the topic."
        ),

        quiz(
            "Choose the sentence expressing a present wish.",
            [
                "I wish I had called her.",
                "I wish I called her tomorrow.",
                "I wish I could call her right now.",
                "I wish I call her."
            ],
            2,
            "'Wish' + past simple/could expresses a wish about the present situation."
        ),

        quiz(
            "Choose the sentence expressing regret about the past.",
            ["I wish I spoke up.", "If only I had spoken up.", "I wish I speak up.", "If only I speak up."],
            1,
            "'If only' + past perfect expresses regret about something in the past."
        ),

        quiz(
            "Choose the correct use of \"wish + would\".",
            [
                "I wish I would try harder.",
                "I wish you would try harder.",
                "I wish you would tried harder.",
                "I wish you will try harder."
            ],
            1,
            "'Wish + would' expresses frustration about someone else's behavior, not your own."
        )

    ],

    summary: {

        tip:
            "Practice expressing a present wish, a past regret, and a frustration about someone else's behavior, each with the correct structure.",

        review: [

            "wish/if only + past simple — present wish",

            "wish/if only + past perfect — past regret",

            "wish + would — frustration about others",

            "misunderstanding, compromise, tension, empathize with"

        ]

    }

};
