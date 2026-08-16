import { mediaNewsBlocks } from "../../../grammar/shared/english/c1/mediaNews";
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

export const mediaNewsLesson = {

    id: "english-c1-media-news",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "media-news",

    order: 7,

    title: "Media, Information & Influence",

    subtitle:
        "Resuma e avalie informações de mídia usando reported speech avançado e estruturas passivas de atribuição.",

    description:
        "Discuta jornalismo, desinformação e influência da mídia, aprendendo estruturas como 'it is believed that' e 'is said to have' para atribuir informação com cautela.",

    cover: "/covers/media-news-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "media-news",
        "grammar",
        "journalism"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Summarize and paraphrase information from the media",

        "Evaluate sources for tone, bias and credibility",

        "Use passive reporting structures to attribute information carefully",

        "Distinguish fact, opinion and interpretation in news coverage"

    ],

    vocabulary: vocabulary([
        "spin (noun)",
        "at face value",
        "sensationalize",
        "an echo chamber",
        "discredit",
        "a smear campaign",
        "vested interest (media)",
        "cherry-pick",
        "a grain of truth",
        "skew",
        "under scrutiny",
        "peddle (misinformation)",
        "take something with a grain of salt",
        "a media outlet",
        "clout",
        "objectivity",
        "amplify",
        "a hidden agenda",
        "corroborate",
        "connect the dots"
    ]),

    blocks: [

        heading("Reporting Information Carefully"),

        paragraph(
            "Careful journalism and formal English use passive reporting structures to attribute claims without stating them as confirmed fact — essential when discussing sources, bias, and unverified information."
        ),

        examples([
            {
                text: "The outlet is said to have peddled misinformation for months before it came under scrutiny.",
                translation: "Diz-se que o veículo espalhou desinformação por meses antes de entrar sob escrutínio."
            },
            {
                text: "It is widely believed that the campaign was designed to discredit her, though nothing has been corroborated.",
                translation: "Acredita-se amplamente que a campanha foi criada para desacreditá-la, embora nada tenha sido confirmado."
            },
            {
                text: "The figures are reported to have been cherry-picked to skew public opinion.",
                translation: "Diz-se que os números foram selecionados de forma conveniente para distorcer a opinião pública."
            },
            {
                text: "Don't take it at face value — there's clearly a hidden agenda amplifying this particular story.",
                translation: "Não aceite pelo valor aparente — claramente há uma intenção oculta amplificando essa história específica."
            },
            {
                text: "This outlet is alleged to have a vested interest, which is worth taking with a grain of salt.",
                translation: "Diz-se que esse veículo tem um interesse pessoal envolvido, o que vale a pena não levar totalmente a sério."
            },
            {
                text: "There's a grain of truth here, but the story has clearly been sensationalized for clout.",
                translation: "Há um fundo de verdade aqui, mas a história claramente foi sensacionalizada em busca de repercussão."
            }
        ]),

        dialogue([
            { speaker: "Zara", text: "Did you see that story going around about the CEO?" },
            { speaker: "Ethan", text: "I did. It's said to have started as a smear campaign, actually." },
            { speaker: "Zara", text: "Really? I took it at face value at first." },
              { speaker: "Ethan", text: "I get it — the outlet has some clout, but they're also alleged to have a vested interest here." },
            { speaker: "Zara", text: "So is any of it true?" },
            { speaker: "Ethan", text: "There's probably a grain of truth, but the numbers are reported to have been cherry-picked to skew the story." },
            { speaker: "Zara", text: "That's frustrating. How do you even connect the dots at that point?" },
            { speaker: "Ethan", text: "You corroborate with other sources before you amplify anything yourself. Otherwise you're just feeding the echo chamber." },
            { speaker: "Zara", text: "Fair. I'll take the whole thing with a grain of salt for now." }
        ]),

        grammar(mediaNewsBlocks[0].title, mediaNewsBlocks[0].text),

        list([

            "it is/was + believed/said/reported/alleged + that...",

            "subject + is/was + reporting verb + to have + past participle",

            "spin, sensationalize, discredit, cherry-pick, skew",

            "at face value, a grain of truth, take with a grain of salt"

        ]),

        tip(
            "Distancing Language",
            "Passive reporting structures ('is said to have', 'is alleged to') let you report a claim while explicitly distancing yourself from confirming it — extremely useful when discussing unverified news without accidentally repeating it as fact."
        ),

        culture(
            "Media Literacy Vocabulary",
            "Terms like 'echo chamber', 'clout' and 'cherry-pick' have become part of everyday English specifically because of ongoing public conversations about social media and misinformation — this vocabulary didn't exist in common use a generation ago in quite the same way."
        ),

        quiz(
            "Choose the correct passive reporting structure.",
            [
                "The company said to have known about it.",
                "The company is said to have known about it.",
                "The company is said know about it.",
                "The company said that known about it."
            ],
            1,
            "'Is said to have known' is the correct passive reporting structure for a past claim."
        ),

        quiz(
            "What does it mean to 'cherry-pick' data?",
            ["to collect all available data fairly", "to select only the data that supports your point, ignoring the rest", "to double-check data for accuracy", "to publish data anonymously"],
            1,
            "'Cherry-pick' means to select only the information that supports your argument while ignoring contradicting evidence."
        ),

        quiz(
            "What does 'take something with a grain of salt' mean?",
            ["to believe something completely", "to be skeptical and not fully trust something", "to add extra evidence to a claim", "to reject something immediately"],
            1,
            "'Take something with a grain of salt' means to be skeptical of a claim rather than accepting it fully."
        )

    ],

    summary: {

        tip:
            "Practice summarizing a news story using at least two passive reporting structures ('is said to have', 'it is believed that').",

        review: [

            "passive reporting structures for attributing unverified information",

            "spin, sensationalize, discredit, cherry-pick, skew",

            "at face value, a grain of truth, take with a grain of salt"

        ]

    }

};
