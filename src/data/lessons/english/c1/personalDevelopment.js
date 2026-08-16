import { personalDevelopmentBlocks } from "../../../grammar/shared/english/c1/personalDevelopment";
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

export const personalDevelopmentLesson = {

    id: "english-c1-personal-development",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "personal-development",

    order: 1,

    title: "Identity, Change & Personal Development",

    subtitle:
        "Reflita sobre mudanças de identidade e crescimento pessoal usando o future in the past e o past perfect continuous com precisão.",

    description:
        "Aprenda a narrar mudanças de vida com nuance, combinando 'was going to' / 'was about to' com o past perfect continuous para descrever contexto e momentum.",

    cover: "/covers/personal-development-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "personal-development",
        "grammar",
        "identity"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Reflect on identity, change and personal growth with nuance",

        "Narrate life decisions using future in the past structures",

        "Use the past perfect continuous to describe background momentum",

        "Discuss values, resilience and turning points with precision"

    ],

    vocabulary: vocabulary([
        "self-actualization",
        "come into your own",
        "formative",
        "grapple with",
        "reckon with",
        "unravel",
        "recalibrate",
        "at a crossroads",
        "come full circle",
        "self-doubt",
        "gut feeling",
        "come to grips with",
        "a far cry from",
        "underlying",
        "reclaim",
        "in retrospect",
        "hit home",
        "steer clear of",
        "reservations about",
        "come around to"
    ]),

    blocks: [

        heading("Narrating Change With Nuance"),

        paragraph(
            "Telling a sophisticated story about personal change requires more than the simple past. English uses 'was going to' and 'was about to' for plans that were interrupted, and the past perfect continuous for the background situation that explains why change happened."
        ),

        examples([
            {
                text: "I was about to give up on the whole idea when something finally clicked.",
                translation: "Eu estava prestes a desistir de toda a ideia quando finalmente algo fez sentido."
            },
            {
                text: "I'd been grappling with self-doubt for years before I finally reclaimed my confidence.",
                translation: "Eu vinha lidando com a insegurança havia anos antes de finalmente reconquistar minha confiança."
            },
            {
                text: "In retrospect, that formative experience was a far cry from what I expected at the time.",
                translation: "Em retrospecto, aquela experiência formadora foi bem diferente do que eu esperava na época."
            },
            {
                text: "She was going to quit, but a gut feeling told her to stay a little longer.",
                translation: "Ela ia desistir, mas um pressentimento disse a ela para ficar um pouco mais."
            },
            {
                text: "I've finally come to grips with the fact that not every plan unravels the way you expect.",
                translation: "Eu finalmente aceitei o fato de que nem todo plano se desenrola como você espera."
            },
            {
                text: "We'd been recalibrating our priorities for months before the decision hit home.",
                translation: "A gente vinha recalibrando nossas prioridades havia meses antes de a decisão realmente fazer sentido."
            },
            {
                text: "At a crossroads like that, it's tempting to steer clear of any real decision at all.",
                translation: "Numa encruzilhada dessas, é tentador evitar qualquer decisão de verdade."
            }
        ]),

        dialogue([
            { speaker: "Isla", text: "You seem different lately. More settled, somehow." },
            { speaker: "Marcus", text: "I've been grappling with a lot of self-doubt this year, actually. But I think I've finally come to grips with it." },
            { speaker: "Isla", text: "What changed?" },
            { speaker: "Marcus", text: "Honestly, I was about to walk away from the whole project when a mentor said something that really hit home." },
            { speaker: "Isla", text: "What did she say?" },
            { speaker: "Marcus", text: "That growth is rarely linear — you come into your own gradually, not overnight. In retrospect, I had reservations about the whole thing from the start." },
            { speaker: "Isla", text: "I get that. I was at a crossroads myself last year." },
            { speaker: "Marcus", text: "What did you do?" },
            { speaker: "Isla", text: "I stopped trying to steer clear of the discomfort and just reckoned with it head-on. Felt like coming full circle, honestly." },
            { speaker: "Marcus", text: "That's exactly it. Sometimes you have to unravel a little before you can recalibrate." }
        ]),

        grammar(personalDevelopmentBlocks[0].title, personalDevelopmentBlocks[0].text),

        list([

            "was/were going to, was/were about to — an imminent or interrupted past plan",

            "had been + verb-ing — background momentum before another past event",

            "self-actualization, formative, recalibrate, come to grips with",

            "at a crossroads, come full circle, in retrospect"

        ]),

        tip(
            "Was Going To vs Would",
            "Both 'was going to' and 'would' can describe a future-in-the-past plan, but 'was going to' more strongly implies the plan was disrupted or changed: 'I was going to quit, but then...' 'Would' is more neutral and common in reported speech: 'She said she would call.'"
        ),

        culture(
            "The 'Reinvention' Narrative",
            "In English-speaking cultures, especially in the US, personal narratives about 'reinventing yourself' or 'finding your true self' are extremely common in memoirs, interviews and self-help media — often more emphasized than in cultures that value continuity and stability over dramatic personal change."
        ),

        quiz(
            "Choose the sentence describing an interrupted past plan.",
            ["I quit my job.", "I was about to quit my job when I got a promotion.", "I had quit my job.", "I quit my job because I got a promotion."],
            1,
            "'Was about to' describes a plan that was interrupted by something else happening."
        ),

        quiz(
            "\"I ___ with self-doubt for years before I finally reclaimed my confidence.\" Choose the best form.",
            ["grappled", "had grappled", "'d been grappling", "grapple"],
            2,
            "The past perfect continuous ('had been grappling') shows the ongoing background situation before the main past event."
        ),

        quiz(
            "What does 'come to grips with' something mean?",
            ["to avoid something completely", "to finally accept or understand something difficult", "to celebrate an achievement", "to forget about something"],
            1,
            "'Come to grips with' means to finally accept or understand something difficult, often after a period of struggle."
        )

    ],

    summary: {

        tip:
            "Practice narrating a personal change using 'was about to' for the interrupted plan and 'had been' for the background momentum.",

        review: [

            "future in the past: was/were going to, was/were about to",

            "past perfect continuous for background momentum",

            "self-actualization, formative, recalibrate, come to grips with",

            "at a crossroads, come full circle, in retrospect"

        ]

    }

};
