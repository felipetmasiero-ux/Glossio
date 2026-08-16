import { educationBlocks } from "../../../grammar/shared/english/c1/education";
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

export const educationLesson = {

    id: "english-c1-education",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "education",

    order: 2,

    title: "Education, Knowledge & Critical Thinking",

    subtitle:
        "Apresente e qualifique argumentos acadêmicos usando nominalização e hedging language.",

    description:
        "Explore vocabulário acadêmico e desenvolva a habilidade de nominalizar verbos e adjetivos, além de suavizar afirmações com hedging.",

    cover: "/covers/education-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "education",
        "grammar",
        "academic"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Present and evaluate arguments about education and knowledge",

        "Qualify statements using academic hedging language",

        "Use nominalisation for a more formal, academic register",

        "Discuss expertise, rigor and critical thinking with precision"

    ],

    vocabulary: vocabulary([
        "underpin",
        "rigor",
        "discourse",
        "a case in point",
        "counterintuitive",
        "conducive to",
        "credentials",
        "internalize",
        "at odds with",
        "sound (adjective)",
        "shaky (argument)",
        "delve into",
        "epistemology",
        "predicated on",
        "scrutinize",
        "far-reaching",
        "rote",
        "give credence to",
        "a rule of thumb",
        "call into question"
    ]),

    blocks: [

        heading("Arguing With Academic Precision"),

        paragraph(
            "Academic and analytical English relies heavily on nominalisation — turning verbs and adjectives into abstract nouns — and on hedging language that qualifies claims rather than overstating them."
        ),

        examples([
            {
                text: "The rigor of this study is arguably what sets it apart from a case in point like the previous one.",
                translation: "O rigor deste estudo é, sem dúvida, o que o diferencia de um exemplo como o anterior."
            },
            {
                text: "This claim is predicated on a rather shaky assumption, if you delve into the data.",
                translation: "Essa afirmação está baseada numa suposição bastante frágil, se você se aprofundar nos dados."
            },
            {
                text: "It's counterintuitive, but rote learning can sometimes underpin genuine understanding later on.",
                translation: "É contraintuitivo, mas o aprendizado decorado às vezes pode servir de base para uma compreensão genuína mais tarde."
            },
            {
                text: "Her credentials give credence to the argument, but that doesn't mean it's beyond scrutiny.",
                translation: "As credenciais dela dão credibilidade ao argumento, mas isso não significa que ele esteja acima de qualquer questionamento."
            },
            {
                text: "This approach seems at odds with everything we know about how internalizing knowledge actually works.",
                translation: "Essa abordagem parece estar em desacordo com tudo o que sabemos sobre como a internalização do conhecimento realmente funciona."
            },
            {
                text: "As a rule of thumb, any claim that isn't conducive to further questioning should be called into question itself.",
                translation: "Como regra geral, qualquer afirmação que não seja propícia a mais questionamentos deveria ela mesma ser questionada."
            }
        ]),

        dialogue([
            { speaker: "Priya", text: "What did you think of the lecture on epistemology?" },
            { speaker: "Daniel", text: "Interesting, but a few of the claims felt shaky if you really delve into them." },
            { speaker: "Priya", text: "A case in point being...?" },
            { speaker: "Daniel", text: "The idea that rote learning is never conducive to real understanding. That's a bit counterintuitive, actually — it can underpin deeper learning later." },
            { speaker: "Priya", text: "Fair point. Though her credentials do give some credence to the argument." },
            { speaker: "Daniel", text: "Sure, but credentials alone shouldn't stop us from scrutinizing the discourse itself." },
            { speaker: "Priya", text: "As a rule of thumb, I try not to internalize any claim without questioning the reasoning first." },
              { speaker: "Daniel", text: "Exactly. Even far-reaching conclusions can be predicated on something surprisingly shaky." },
            { speaker: "Priya", text: "That's what makes this discourse so at odds with a lot of mainstream teaching, I guess." }
        ]),

        grammar(educationBlocks[0].title, educationBlocks[0].text),

        list([

            "nominalisation — turning verbs/adjectives into abstract nouns for formality",

            "hedging: arguably, tends to, it could be said that, to some extent",

            "underpin, rigor, discourse, scrutinize, call into question",

            "predicated on, at odds with, conducive to, a rule of thumb"

        ]),

        tip(
            "Don't Overdo Nominalisation",
            "Nominalisation is powerful in academic writing, but stacking too many nominalised phrases in one sentence sounds stiff and hard to follow. If a sentence feels dense, try switching one nominalised phrase back into a direct verb."
        ),

        culture(
            "Hedging in Academic English",
            "Native academic writers in English hedge constantly — phrases like 'tends to suggest' or 'it could be argued' are not signs of weakness, but a professional norm that shows awareness of the limits of one's own evidence. Overly confident claims without hedging can actually seem less credible in academic contexts."
        ),

        quiz(
            "Choose the most natural nominalised version of \"They should assess students less rigidly.\"",
            [
                "They assess students less rigidly.",
                "A less rigid assessment of students is arguably overdue.",
                "Assessing students rigidly is bad.",
                "Students are assessed less rigidly by them."
            ],
            1,
            "Nominalising 'assess' into 'assessment' produces a more formal, academic-sounding sentence."
        ),

        quiz(
            "Which phrase is an example of hedging?",
            ["This definitely proves the theory.", "This tends to support the theory.", "This obviously confirms the theory.", "This absolutely proves the theory."],
            1,
            "'Tends to support' hedges the claim, avoiding an overly strong assertion."
        ),

        quiz(
            "What does it mean if an argument is 'predicated on' something?",
            ["it ignores that thing completely", "it is based on / depends on that thing", "it contradicts that thing", "it was written before that thing existed"],
            1,
            "'Predicated on' means based on or dependent on a particular assumption or condition."
        )

    ],

    summary: {

        tip:
            "Practice turning three verb-based sentences into nominalised, more academic versions, then add a hedging phrase to each.",

        review: [

            "nominalisation for formal, academic tone",

            "hedging: arguably, tends to, to some extent",

            "underpin, rigor, scrutinize, call into question",

            "predicated on, at odds with, conducive to"

        ]

    }

};
