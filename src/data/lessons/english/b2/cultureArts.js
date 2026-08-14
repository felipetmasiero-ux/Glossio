import { cultureArtsBlocks } from "../../../grammar/shared/english/b2/cultureArts";
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

    id: "english-b2-culture-arts",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "culture-arts",

    order: 8,

    title: "Culture, Art & Entertainment",

    subtitle:
        "Analise obras de arte, literatura e cinema em inglês usando reduced relative clauses para uma linguagem mais compacta e natural.",

    description:
        "Aprenda vocabulário para analisar e criticar obras culturais, e como reduzir orações relativas para soar mais natural e conciso.",

    cover: "/covers/culture-arts.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "culture",
        "arts",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Analyze and discuss literature, film and art",

        "Give more sophisticated opinions about cultural works",

        "Use reduced relative clauses for more natural, compact sentences",

        "Choose between the -ing form and the past participle correctly"

    ],

    vocabulary: vocabulary([
        "masterpiece",
        "portrayal",
        "depict",
        "narrative",
        "cultural identity",
        "heritage",
        "contemporary",
        "avant-garde",
        "renowned",
        "profound",
        "resonate with",
        "evoke",
        "symbolism",
        "genre",
        "interpretation",
        "critique",
        "aesthetic",
        "artistic license",
        "stand the test of time",
        "leave a lasting impression"
    ]),

    blocks: [

        heading("Talking About Art More Naturally"),

        paragraph(
            "Analytical writing and speech about culture and art often reduces relative clauses to sound more compact and natural — dropping the relative pronoun and 'be', and keeping just the participle."
        ),

        examples([
            {
                text: "The book written in 1980 is still widely read today.",
                translation: "O livro escrito em 1980 ainda é muito lido hoje em dia."
            },
            {
                text: "The director currently filming a new movie used to be an actor.",
                translation: "O diretor que está filmando um novo filme atualmente já foi ator."
            },
            {
                text: "Anyone interested in modern art should visit that gallery.",
                translation: "Qualquer pessoa interessada em arte moderna deveria visitar aquela galeria."
            },
            {
                text: "The novel adapted into a film last year won several awards.",
                translation: "O romance adaptado para um filme no ano passado ganhou vários prêmios."
            },
            {
                text: "People attending the exhibition were given a free guide.",
                translation: "As pessoas que compareceram à exposição receberam um guia grátis."
            },
            {
                text: "The painting displayed at the entrance is worth millions.",
                translation: "O quadro exposto na entrada vale milhões."
            }
        ]),

        dialogue([
            { speaker: "Aiden", text: "Have you seen that exhibition everyone's talking about?" },
            { speaker: "Zoe", text: "Yeah! The paintings displayed there are absolutely stunning. There's one piece created by a local artist that really stood out to me." },
            { speaker: "Aiden", text: "Which one?" },
            { speaker: "Zoe", text: "The one depicting the city skyline at night. It's incredibly detailed." },
            { speaker: "Aiden", text: "I love art that captures a real sense of place. Did you read the reviews written about it?" },
            { speaker: "Zoe", text: "A few. Most critics writing about it agree it's one of the most profound pieces this year." },
            { speaker: "Aiden", text: "That's high praise. I think good art is the kind that resonates with people regardless of background." },
            { speaker: "Zoe", text: "Exactly. Works stuck in a specific moment rarely stand the test of time, but this one feels timeless." },
            { speaker: "Aiden", text: "Well said. I really want to see it in person now." }
        ]),

        grammar(cultureArtsBlocks[0].title, cultureArtsBlocks[0].text),

        list([

            "who/which/that + be → dropped",

            "-ing form — active meaning",

            "past participle — passive meaning",

            "masterpiece, renowned, evoke, resonate with"

        ]),

        tip(
            "Only Works With Defining Clauses",
            "Reduced relative clauses work with defining clauses — essential information, no commas, the same type you learned at B1. Clauses built around a modal verb or a stative meaning generally can't be reduced: 'the man who can speak French' doesn't reduce to 'the man speaking French' without changing the meaning."
        ),

        culture(
            "Art Criticism in English",
            "In English-language art and film criticism, reduced relative clauses are extremely common because they make writing more compact: 'the film praised by critics' instead of the longer 'the film that was praised by critics.'"
        ),

        quiz(
            "Choose the correct reduced form of \"the book that was written in 1980\".",
            ["the book writing in 1980", "the book written in 1980", "the book write in 1980", "the book wrote in 1980"],
            1,
            "The passive meaning ('was written') reduces to the past participle: 'written in 1980'."
        ),

        quiz(
            "Choose the correct reduced form of \"the man who is standing by the door\".",
            ["the man stood by the door", "the man standing by the door", "the man stands by the door", "the man to stand by the door"],
            1,
            "The active meaning ('is standing') reduces to the -ing form: 'standing by the door'."
        ),

        quiz(
            "When does a reduced relative clause use the -ing form?",
            ["When the meaning is passive", "When the meaning is active", "Only with the verb 'be'", "Never"],
            1,
            "The -ing form is used for active meaning; the past participle is used for passive meaning."
        )

    ],

    summary: {

        tip:
            "Practice describing a book, film or artwork you like, reducing at least one relative clause to sound more natural.",

        review: [

            "-ing form — active meaning",

            "past participle — passive meaning",

            "masterpiece, renowned, evoke, symbolism",

            "resonate with, stand the test of time"

        ]

    }

};
