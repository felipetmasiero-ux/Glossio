import { technologyHabitsBlocks } from "../../../grammar/shared/english/b1/technologyHabits";
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

export const technologyHabitsLesson = {

    id: "english-b1-technology-habits",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "technology-habits",

    order: 7,

    title: "Technology & Communication",

    subtitle:
        "Fale sobre hábitos digitais em inglês usando gerúndio e infinitivo depois de verbos como 'enjoy', 'decide', 'avoid' e 'stop'.",

    description:
        "Aprenda vocabulário de tecnologia e redes sociais, e quando usar o gerúndio (-ing) ou o infinitivo (to + verbo) depois de certos verbos.",

    cover: "/covers/technology-habits.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 40,

    tags: [
        "technology",
        "gerunds-infinitives",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about technology habits and digital communication",

        "Use the gerund (-ing) after verbs like 'avoid', 'enjoy' and 'keep'",

        "Use the infinitive (to + verb) after verbs like 'decide', 'want' and 'plan'",

        "Understand how 'stop' changes meaning with -ing vs to + verb"

    ],

    vocabulary: vocabulary([
        "screen time",
        "addicted to",
        "notification",
        "multitasking",
        "productivity app",
        "video call",
        "cloud storage",
        "artificial intelligence",
        "cybersecurity",
        "online privacy",
        "digital detox",
        "keep in touch",
        "stay connected",
        "influencer",
        "go viral",
        "post",
        "scroll through",
        "unplug"
    ]),

    blocks: [

        heading("Gerund or Infinitive?"),

        paragraph(
            "When one verb follows another in English, the second verb is often a gerund (-ing) or an infinitive (to + verb), depending on the first verb. There's no simple rule — it's about learning common patterns."
        ),

        examples([
            {
                text: "I've decided to reduce my screen time this month.",
                translation: "Decidi reduzir meu tempo de tela este mês."
            },
            {
                text: "She avoids checking her phone right before bed.",
                translation: "Ela evita checar o celular logo antes de dormir."
            },
            {
                text: "We need to talk about online privacy more seriously.",
                translation: "Precisamos falar sobre privacidade online mais seriamente."
            },
            {
                text: "I stopped scrolling through social media and finally finished my book.",
                translation: "Parei de rolar as redes sociais e finalmente terminei meu livro."
            },
            {
                text: "He plans to try a digital detox next weekend.",
                translation: "Ele planeja fazer uma desintoxicação digital no próximo fim de semana."
            },
            {
                text: "I stopped to answer a video call in the middle of my walk.",
                translation: "Parei para atender uma chamada de vídeo no meio da minha caminhada."
            }
        ]),

        dialogue([
            { speaker: "Nina", text: "I've decided to try a digital detox this weekend." },
            { speaker: "Tom", text: "Really? No phone at all?" },
            { speaker: "Nina", text: "I'm going to try to avoid checking social media, at least. I'm addicted to scrolling through it every five minutes." },
            { speaker: "Tom", text: "I get that. I keep getting notifications from every app — it's exhausting." },
            { speaker: "Nina", text: "Exactly. I want to spend more time actually talking to people instead of just texting." },
            { speaker: "Tom", text: "That's a good idea. I should probably stop posting so much too." },
            { speaker: "Nina", text: "We could try to unplug together on Saturday, if you want." },
            { speaker: "Tom", text: "I'd love to. Let's plan to meet up in person instead — no screens allowed!" }
        ]),

        grammar(technologyHabitsBlocks[0].title, technologyHabitsBlocks[0].text),

        list([

            "avoid / enjoy / keep / mind + -ing",

            "decide / want / need / plan + to + verb",

            "stop + -ing (end a habit) vs stop + to + verb (pause for a purpose)",

            "screen time, notification, digital detox, unplug"

        ]),

        tip(
            "Stop + -ing vs Stop + To + Verb",
            "'Stop' changes meaning depending on what follows. 'Stop doing something' means ending a habit: 'I stopped checking my phone at night.' 'Stop to do something' means pausing another activity in order to do it: 'I stopped to check my phone.' This is a common trap even at this level."
        ),

        culture(
            "Digital Detox Culture",
            "The idea of a 'digital detox' — deliberately disconnecting from devices for a period of time — has become a popular trend in English-speaking countries, with some hotels and retreats even offering phone-free packages."
        ),

        quiz(
            "Choose the correct form: \"I enjoy ___ with old friends online.\"",
            ["to chat", "chatting", "chat", "chatted"],
            1,
            "'Enjoy' is followed by the gerund (-ing): 'I enjoy chatting.'"
        ),

        quiz(
            "Choose the correct form: \"She decided ___ her screen time.\"",
            ["reducing", "reduce", "to reduce", "reduces"],
            2,
            "'Decide' is followed by the infinitive: 'She decided to reduce her screen time.'"
        ),

        quiz(
            "Which sentence means 'he paused walking in order to answer the phone'?",
            [
                "He stopped answering his phone.",
                "He stopped to answer his phone.",
                "He stops answer his phone.",
                "He is stopping answer his phone."
            ],
            1,
            "'Stop to do something' means pausing another activity in order to do it."
        )

    ],

    summary: {

        tip:
            "Practice describing your own tech habits: 'I enjoy...', 'I've decided to...', 'I avoid...', and pay attention to which form follows each verb.",

        review: [

            "avoid/enjoy/keep + -ing",

            "decide/want/plan + to + verb",

            "stop + -ing vs stop + to + verb",

            "screen time, digital detox, addicted to, unplug"

        ]

    }

};
