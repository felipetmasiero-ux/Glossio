import { societyBlocks } from "../../../grammar/shared/english/c1/society";
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

export const societyLesson = {

    id: "english-c1-society",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "society",

    order: 4,

    title: "Society, Politics & Public Discourse",

    subtitle:
        "Discuta estruturas sociais e discurso público com ênfase retórica usando inversão após advérbios negativos.",

    description:
        "Desenvolva vocabulário sobre sociedade e instituições, e aprenda a estrutura de inversão para dar ênfase formal a afirmações sobre questões públicas.",

    cover: "/covers/society-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "society",
        "grammar",
        "public-discourse"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss social structures, institutions and public discourse",

        "Use inversion after negative and restrictive adverbials for emphasis",

        "Compare perspectives on social change with nuance",

        "Recognize rhetorical structures common in formal public discourse"

    ],

    vocabulary: vocabulary([
        "polarized",
        "bottom-up",
        "entrenched",
        "a double-edged sword",
        "checks and balances",
        "systemic",
        "disenfranchised",
        "at the expense of",
        "a slippery slope",
        "backlash",
        "call for",
        "a watershed moment",
        "underrepresented",
        "in the wake of",
        "galvanize",
        "erode",
        "a vested interest",
        "the status quo",
        "advocacy",
        "curb"
    ]),

    blocks: [

        heading("Emphasis in Public Discourse"),

        paragraph(
            "Formal discussions about society and institutions often use inversion after a negative or restrictive adverbial at the start of a sentence, adding rhetorical emphasis that a neutral word order doesn't have."
        ),

        examples([
            {
                text: "Rarely do entrenched systems change without real public backlash.",
                translation: "Raramente sistemas enraizados mudam sem uma reação pública real."
            },
            {
                text: "Not only did the movement galvanize public opinion, but it also began to erode the status quo itself.",
                translation: "O movimento não só mobilizou a opinião pública, como também começou a corroer o status quo."
            },
            {
                text: "Under no circumstances should checks and balances be treated as optional.",
                translation: "Em nenhuma circunstância os controles e contrapesos deveriam ser tratados como opcionais."
            },
            {
                text: "Only in the wake of the scandal did lawmakers finally call for real accountability.",
                translation: "Só após o escândalo os legisladores finalmente exigiram uma responsabilização real."
            },
            {
                text: "This policy risks becoming a slippery slope, curbing rights at the expense of the disenfranchised.",
                translation: "Essa política corre o risco de se tornar uma ladeira escorregadia, restringindo direitos às custas dos marginalizados."
            },
            {
                text: "A polarized public discourse is a double-edged sword: it raises awareness, but it also entrenches division.",
                translation: "Um discurso público polarizado é uma faca de dois gumes: aumenta a conscientização, mas também aprofunda a divisão."
            }
        ]),

        dialogue([
            { speaker: "Amara", text: "What did you think of the panel discussion on institutional reform?" },
            { speaker: "Felix", text: "Interesting. Rarely do you hear panelists admit their own vested interests so openly." },
            { speaker: "Amara", text: "True. The moderator called for more checks and balances, which felt like a watershed moment." },
            { speaker: "Felix", text: "Not only did she call for reform, but she also named who benefits from the status quo." },
              { speaker: "Amara", text: "That takes courage in such a polarized climate." },
            { speaker: "Felix", text: "It does. Under no circumstances should advocacy like that be dismissed as 'just politics'." },
            { speaker: "Amara", text: "I worry the backlash will just entrench the systemic problems further, though." },
            { speaker: "Felix", text: "Only in the wake of real public pressure do institutions usually change — so maybe the backlash is part of the process." },
            { speaker: "Amara", text: "A fair point. Change rarely comes from the top down; it's usually bottom-up." }
        ]),

        grammar(societyBlocks[0].title, societyBlocks[0].text),

        list([

            "negative/restrictive adverbial + auxiliary + subject — inversion",

            "rarely, never, not only, only after, under no circumstances",

            "entrenched, systemic, erode, galvanize, the status quo",

            "checks and balances, a watershed moment, a vested interest"

        ]),

        tip(
            "Formal, Not Casual",
            "Inversion after negative adverbials belongs in speeches, opinion pieces, and formal debate — not everyday conversation. Using it too casually ('Rarely do I eat breakfast') can sound overly formal or even a little theatrical."
        ),

        culture(
            "Public Discourse Norms",
            "English-language political and public discourse often values direct, quotable rhetorical structures — this is one reason inversion and other emphatic structures appear so often in political speeches, op-eds and debate, where a memorable turn of phrase can shape public perception as much as the argument itself."
        ),

        quiz(
            "Choose the correctly inverted sentence.",
            [
                "Rarely institutions admit their mistakes.",
                "Rarely do institutions admit their mistakes.",
                "Rarely institutions do admit their mistakes.",
                "Institutions rarely do admit their mistakes."
            ],
            1,
            "After 'rarely' at the start of a sentence, the auxiliary 'do' comes before the subject: 'Rarely do institutions...'."
        ),

        quiz(
            "What does 'the status quo' mean?",
            ["a sudden change", "the existing state of affairs", "a formal complaint", "a type of public protest"],
            1,
            "'The status quo' refers to the existing state of affairs, especially one that some people want to preserve and others want to change."
        ),

        quiz(
            "Choose the sentence with correct inversion after 'not only'.",
            [
                "Not only the reform passed, but it also gained support.",
                "Not only did the reform pass, but it also gained support.",
                "Not only the reform did pass, but it also gained support.",
                "Not only passed the reform, but it also gained support."
            ],
            1,
            "'Not only' at the start of a sentence requires inversion: 'Not only did the reform pass...'."
        )

    ],

    summary: {

        tip:
            "Practice rewriting three neutral statements about society using inversion for emphasis, starting with 'rarely', 'not only' or 'only after'.",

        review: [

            "inversion after negative/restrictive adverbials for emphasis",

            "entrenched, systemic, erode, galvanize, the status quo",

            "checks and balances, a watershed moment, a vested interest"

        ]

    }

};
