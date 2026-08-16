import { environmentBlocks } from "../../../grammar/shared/english/c1/environment";
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

export const environmentC1Lesson = {

    id: "english-c1-environment",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "environment",

    order: 6,

    title: "Environment, Sustainability & Global Challenges",

    subtitle:
        "Argumente sobre desafios ambientais globais usando participle clauses para condensar suas ideias.",

    description:
        "Discuta sustentabilidade e desafios globais, aprendendo a reduzir orações adverbiais completas em participle clauses mais fluentes e formais.",

    cover: "/covers/environment-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "environment",
        "grammar",
        "sustainability"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss complex environmental problems and global challenges",

        "Evaluate solutions and compare perspectives with nuance",

        "Use participle clauses to condense adverbial clauses fluently",

        "Build formal arguments about sustainability and resources"

    ],

    vocabulary: vocabulary([
        "unsustainable",
        "dwindling",
        "at a tipping point",
        "curb emissions",
        "a stopgap measure",
        "far-reaching consequences",
        "offset (verb)",
        "encroachment",
        "a drop in the ocean",
        "wind down",
        "at the mercy of",
        "resilience (environmental)",
        "unfold",
        "a wake-up call",
        "irreversibly",
        "a double-edged solution",
        "compounding",
        "band-aid solution",
        "outpace",
        "the writing is on the wall"
    ]),

    blocks: [

        heading("Condensing Arguments With Participle Clauses"),

        paragraph(
            "Formal discussion of environmental issues often uses participle clauses to pack cause, condition or sequence into fewer words, which sounds more fluent and less repetitive than a string of full adverbial clauses."
        ),

        examples([
            {
                text: "Faced with dwindling resources, several countries are finally phasing out unsustainable practices.",
                translation: "Diante de recursos cada vez mais escassos, vários países finalmente estão eliminando práticas insustentáveis."
            },
            {
                text: "Having offset only a fraction of its emissions, the industry is still far from meeting its targets.",
                translation: "Tendo compensado apenas uma fração de suas emissões, a indústria ainda está longe de cumprir suas metas."
            },
            {
                text: "Left unaddressed, encroachment on protected land will have far-reaching consequences.",
                translation: "Se não for enfrentada, a invasão de áreas protegidas terá consequências de longo alcance."
            },
            {
                text: "Compounding an already fragile situation, the drought pushed the region to a tipping point.",
                translation: "Agravando uma situação já frágil, a seca levou a região a um ponto crítico."
            },
            {
                text: "Outpacing every previous forecast, the crisis unfolded faster than anyone expected.",
                translation: "Superando toda previsão anterior, a crise se desenrolou mais rápido do que qualquer um esperava."
            },
            {
                text: "Recognizing the writing on the wall, the company finally abandoned its band-aid solutions.",
                translation: "Reconhecendo que os sinais eram claros, a empresa finalmente abandonou suas soluções paliativas."
            }
        ]),

        dialogue([
            { speaker: "Grace", text: "Have you seen the new report on dwindling water supplies?" },
            { speaker: "Oliver", text: "I have. Faced with numbers like that, it's hard to call any current policy more than a stopgap measure." },
            { speaker: "Grace", text: "Right. And a lot of what's being proposed feels like a band-aid solution, at the mercy of the next budget cycle." },
            { speaker: "Oliver", text: "Compounding the problem, demand is outpacing supply faster than models predicted." },
            { speaker: "Grace", text: "It really is a wake-up call. Left unchecked, we're heading toward an irreversible tipping point." },
            { speaker: "Oliver", text: "Some resilience programs help, but honestly, they're a drop in the ocean compared to what's needed." },
            { speaker: "Grace", text: "Having read the report, do you think the writing's on the wall for current policy?" },
            { speaker: "Oliver", text: "Pretty much. Recognizing that, a few local governments are finally phasing out the worst practices." }
        ]),

        grammar(environmentBlocks[0].title, environmentBlocks[0].text),

        list([

            "present participle clause (-ing) — replaces an active adverbial clause",

            "past participle clause — replaces a passive adverbial clause",

            "unsustainable, dwindling, at a tipping point, irreversibly",

            "a stopgap measure, a drop in the ocean, the writing is on the wall"

        ]),

        tip(
            "Check the Subject",
            "Before using a participle clause, make sure its implied subject matches the main clause's subject. 'Having finished the report, the meeting started' is wrong — the meeting didn't finish the report."
        ),

        culture(
            "Global Reporting Register",
            "International environmental reports (UN, IPCC, NGOs) rely heavily on participle clauses and complex noun phrases precisely because they need to compress large amounts of technical information into readable summaries — recognizing this register helps you read real environmental journalism and reports more fluently."
        ),

        quiz(
            "Choose the correct participle clause.",
            [
                "Face with declining resources, policies are changing.",
                "Faced with declining resources, policies are changing.",
                "Facing with declining resources, policies are changing.",
                "Faced declining resources, policies are changing."
            ],
            1,
            "The passive past participle 'Faced with' correctly replaces 'Because it is faced with'."
        ),

        quiz(
            "What does 'a stopgap measure' mean?",
            ["a permanent solution", "a temporary solution meant to bridge a gap until something better exists", "a policy that fails completely", "a measure that makes things worse"],
            1,
            "'A stopgap measure' is a temporary solution used to address a problem until a better one is found."
        ),

        quiz(
            "Choose the sentence with a correctly matched participle clause subject.",
            [
                "Having read the report, the conclusions were clear to me.",
                "Having read the report, I found the conclusions clear.",
                "Having read the report, the conclusions surprised themselves.",
                "Having read the report, it was clear."
            ],
            1,
            "'I' is the one who read the report and drew the conclusion, so the subjects correctly match."
        )

    ],

    summary: {

        tip:
            "Practice rewriting three full adverbial clauses about an environmental issue as participle clauses.",

        review: [

            "participle clauses (present and past) to condense adverbial clauses",

            "unsustainable, dwindling, at a tipping point, irreversibly",

            "a stopgap measure, a drop in the ocean, the writing is on the wall"

        ]

    }

};
