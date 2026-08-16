import { psychologyBlocks } from "../../../grammar/shared/english/c1/psychology";
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

export const psychologyLesson = {

    id: "english-c1-psychology",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "psychology",

    order: 9,

    title: "Psychology, Relationships & Human Behaviour",

    subtitle:
        "Discuta comportamento humano e relacionamentos com precisão emocional usando wishes e críticas retrospectivas avançadas.",

    description:
        "Desenvolva vocabulário sobre comportamento e emoções, e aprenda a expressar preferências sobre o comportamento alheio e críticas gentis ao passado.",

    cover: "/covers/psychology-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "psychology",
        "grammar",
        "relationships"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss behaviour, emotions and relationships with nuance",

        "Express wishes and preferences about someone else's behaviour",

        "Offer gentle, retrospective criticism using 'could/might have'",

        "Analyze interpersonal situations using psychological vocabulary"

    ],

    vocabulary: vocabulary([
        "self-sabotage",
        "come across as",
        "projection (psychological)",
        "confide in",
        "a coping mechanism",
        "resentment",
        "read someone",
        "on edge",
        "give someone space",
        "an underlying insecurity",
        "detach yourself from",
        "validate someone's feelings",
        "brood over",
        "a self-fulfilling prophecy",
        "nurse a grudge",
        "closure",
        "well-adjusted",
        "make peace with",
        "a toxic dynamic",
        "emotionally attuned"
    ]),

    blocks: [

        heading("Expressing Nuanced Wishes and Gentle Criticism"),

        paragraph(
            "Discussing relationships and behaviour with real precision means going beyond 'I wish' and 'you should have'. English has more specific structures for expressing preferences about someone else's actions and for softening criticism of the past."
        ),

        examples([
            {
                text: "I'd rather you hadn't confided that to her — it's clearly become a toxic dynamic now.",
                translation: "Eu preferia que você não tivesse confidenciado isso a ela — isso claramente virou uma dinâmica tóxica agora."
            },
            {
                text: "I'd rather you didn't brood over it all weekend; it's just going to feed the resentment.",
                translation: "Eu preferia que você não ficasse remoendo isso o fim de semana todo; isso só vai alimentar o ressentimento."
            },
            {
                text: "It's about time we had an honest conversation instead of this self-sabotage.",
                translation: "Já era hora de termos uma conversa honesta em vez dessa autossabotagem."
            },
            {
                text: "You could have at least validated her feelings before jumping straight to advice.",
                translation: "Você podia pelo menos ter validado os sentimentos dela antes de já sair dando conselhos."
            },
            {
                text: "He comes across as well-adjusted, but there's clearly an underlying insecurity there.",
                translation: "Ele parece ser uma pessoa equilibrada, mas claramente há uma insegurança de fundo ali."
            },
            {
                text: "You might have thought to give her some space instead of reading too much into it.",
                translation: "Você podia ter pensado em dar um espaço a ela em vez de interpretar demais a situação."
            }
        ]),

        dialogue([
            { speaker: "Maya", text: "You seem on edge today. Everything okay with your sister?" },
            { speaker: "Lucas", text: "Not really. I'd rather you hadn't brought it up, honestly, but yeah, it's been a toxic dynamic lately." },
            { speaker: "Maya", text: "Sorry. What happened?" },
            { speaker: "Lucas", text: "She confided something in me, and I think I came across as dismissive without meaning to." },
            { speaker: "Maya", text: "You could have at least given her space to explain herself first." },
            { speaker: "Lucas", text: "I know. I think it triggered an old resentment — probably a self-fulfilling prophecy at this point." },
            { speaker: "Maya", text: "Have you tried to make peace with how the conversation went?" },
              { speaker: "Lucas", text: "Trying to. It's about time I stopped brooding over it and just apologized properly." },
            { speaker: "Maya", text: "That sounds emotionally attuned, actually. Good instinct." },
            { speaker: "Lucas", text: "We'll see. I'd rather she didn't shut me out completely before I get the chance." }
        ]),

        grammar(psychologyBlocks[0].title, psychologyBlocks[0].text),

        list([

            "I'd rather + subject + past perfect — wish about someone else's past action",

            "I'd rather + subject + past simple — preference about future/general behaviour",

            "it's (about) time + past simple — something overdue",

            "could/might have — gentle, retrospective criticism"

        ]),

        tip(
            "Could Have vs Should Have",
            "'You should have called' can sound like a direct accusation. 'You could have called' or 'you might have called' softens the same criticism, implying a missed opportunity rather than a clear failure — useful for giving feedback without triggering defensiveness."
        ),

        culture(
            "Therapy-Speak in Everyday English",
            "Words like 'boundaries', 'validate', 'toxic' and 'self-sabotage' have moved from clinical psychology into everyday English conversation over the last decade, especially among younger speakers — recognizing this vocabulary helps you follow a huge amount of casual conversation about relationships and mental health."
        ),

        quiz(
            "Choose the correct structure for a wish about someone's past action.",
            [
                "I'd rather you don't tell him.",
                "I'd rather you didn't tell him.",
                "I'd rather you hadn't told him.",
                "I'd rather you won't tell him."
            ],
            2,
            "'I'd rather you hadn't told him' (past perfect) expresses a wish about a past action that already happened."
        ),

        quiz(
            "Which sentence offers the gentlest criticism?",
            [
                "You should have warned me.",
                "You could have at least warned me.",
                "Why didn't you warn me?",
                "You never warn me about anything."
            ],
            1,
            "'You could have at least warned me' softens the criticism compared to the more direct 'should have'."
        ),

        quiz(
            "What does it mean to 'nurse a grudge'?",
            ["to forgive someone quickly", "to hold onto negative feelings toward someone for a long time", "to apologize sincerely", "to avoid conflict entirely"],
            1,
            "'Nurse a grudge' means to hold onto resentment or negative feelings toward someone for an extended period."
        )

    ],

    summary: {

        tip:
            "Practice giving gentle, retrospective feedback about a real situation using 'could have' or 'might have' instead of 'should have'.",

        review: [

            "I'd rather + past perfect/past simple for wishes about others' behaviour",

            "it's (about) time + past simple for something overdue",

            "could/might have for gentle criticism",

            "self-sabotage, resentment, a coping mechanism, make peace with"

        ]

    }

};
