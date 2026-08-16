import { cultureArtsBlocks } from "../../../grammar/shared/english/c1/cultureArts";
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

export const cultureArtsLesson = {

    id: "english-c1-culture-arts",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "culture-arts",

    order: 8,

    title: "Culture, Literature & Interpretation",

    subtitle:
        "Analise e critique obras culturais usando sentential relative clauses e relative clauses formais com preposição.",

    description:
        "Desenvolva vocabulário analítico e avaliativo, e aprenda a comentar uma ideia inteira com 'which', além de estruturas relativas mais formais.",

    cover: "/covers/culture-arts-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "culture-arts",
        "grammar",
        "criticism"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Analyze and interpret literature, film and art with precision",

        "Justify a critical opinion using evaluative language",

        "Use sentential relative clauses to comment on a whole idea",

        "Apply formal relative clauses with fronted prepositions"

    ],

    vocabulary: vocabulary([
        "evocative",
        "a recurring motif",
        "poignant",
        "self-indulgent",
        "a scathing review",
        "strike a chord with",
        "understated",
        "a tour de force",
        "derivative",
        "an underlying theme",
        "captivating",
        "a cult following",
        "nuanced portrayal",
        "hold up well over time",
        "heavy-handed",
        "an homage to",
        "food for thought",
        "a slow burn",
        "a critical darling",
        "leave its mark on"
    ]),

    blocks: [

        heading("Analyzing With Precision"),

        paragraph(
            "Literary and cultural criticism often uses 'which' to comment on an entire previous idea, not just a noun, and reserves fronted-preposition relative clauses ('the book about which...') for more formal analysis."
        ),

        examples([
            {
                text: "The novel is a slow burn, which is exactly why some readers give up before it strikes a chord.",
                translation: "O romance é de desenvolvimento lento, o que é exatamente o motivo pelo qual alguns leitores desistem antes de se emocionarem com ele."
            },
            {
                text: "It's a tour de force of understated acting, which few critics expected from a debut role.",
                translation: "É um feito extraordinário de atuação sutil, o que poucos críticos esperavam de uma estreia."
            },
            {
                text: "The film about which so much was written turned out to be surprisingly derivative.",
                translation: "O filme sobre o qual tanto se escreveu acabou sendo surpreendentemente pouco original."
            },
            {
                text: "This scathing review calls the ending heavy-handed, which I think is a fair, if harsh, assessment.",
                translation: "Essa crítica contundente chama o final de exagerado, o que acho uma avaliação justa, embora dura."
            },
            {
                text: "It's an evocative, nuanced portrayal of grief, which gives the whole film real staying power.",
                translation: "É um retrato evocativo e cheio de nuances do luto, o que dá ao filme uma verdadeira permanência."
            },
            {
                text: "The album became a critical darling almost overnight, which surprised even the band itself.",
                translation: "O álbum se tornou queridinho da crítica quase da noite para o dia, o que surpreendeu até a própria banda."
            }
        ]),

        dialogue([
            { speaker: "Elena", text: "Did you finish that novel everyone's been calling a tour de force?" },
            { speaker: "Jack", text: "I did. It's a slow burn, which honestly tested my patience at first." },
            { speaker: "Elena", text: "But?" },
            { speaker: "Jack", text: "But it's genuinely evocative, and the recurring motif of the abandoned house really struck a chord with me." },
            { speaker: "Elena", text: "I read a scathing review calling it self-indulgent, though." },
            { speaker: "Jack", text: "I saw that. I think it's a fair point about the middle section, which does drag a bit." },
            { speaker: "Elena", text: "Would you say it holds up well compared to her earlier work?" },
              { speaker: "Jack", text: "Honestly, it's an homage to her debut, but far less derivative than I expected." },
            { speaker: "Elena", text: "That's good to hear. It's already gained a cult following online." },
            { speaker: "Jack", text: "Not surprising — it left its mark on me, and I don't say that about many books." }
        ]),

        grammar(cultureArtsBlocks[0].title, cultureArtsBlocks[0].text),

        list([

            "sentential relative clause: ', which' comments on the whole previous idea",

            "formal relative clause: preposition + which (the book about which...)",

            "evocative, poignant, understated, a tour de force, nuanced portrayal",

            "strike a chord with, hold up well over time, a critical darling"

        ]),

        tip(
            "One Comment, One 'Which'",
            "A sentential relative clause with 'which' should add one clear comment on the whole idea before it — stacking several ideas after a single 'which' makes the sentence hard to follow. Break it into two sentences if needed."
        ),

        culture(
            "The Language of Reviews",
            "Professional English-language film and book reviews have a recognizable register: phrases like 'tour de force', 'a slow burn' and 'derivative' appear constantly in publications like The Guardian or The New York Times — learning this vocabulary makes real reviews far more accessible."
        ),

        quiz(
            "Choose the sentence using a correct sentential relative clause.",
            [
                "The film flopped, what surprised everyone.",
                "The film flopped, which surprised everyone.",
                "The film flopped, that surprised everyone.",
                "The film flopped, who surprised everyone."
            ],
            1,
            "'Which' is used to comment on the whole previous clause ('the film flopped'), not 'what', 'that' or 'who'."
        ),

        quiz(
            "What does 'derivative' mean when describing a work of art?",
            ["completely original", "unoriginal, imitating other works too closely", "extremely popular", "critically acclaimed"],
            1,
            "'Derivative' describes a work that imitates other works too closely, lacking originality."
        ),

        quiz(
            "Choose the more formal version of \"the book she spoke about\".",
            [
                "the book about which she spoke",
                "the book which about she spoke",
                "the book she about spoke",
                "the about book which she spoke"
            ],
            0,
            "In the formal version, the preposition moves before the relative pronoun: 'the book about which she spoke'."
        )

    ],

    summary: {

        tip:
            "Practice reviewing a film or book you know using at least two sentential relative clauses with 'which'.",

        review: [

            "sentential relative clauses with 'which' to comment on a whole idea",

            "formal relative clauses with fronted prepositions",

            "evocative, poignant, a tour de force, nuanced portrayal",

            "strike a chord with, hold up well over time, a critical darling"

        ]

    }

};
