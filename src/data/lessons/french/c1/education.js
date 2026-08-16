import { educationC1Blocks } from "../../../grammar/shared/french/educationC1";
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

    id: "french-c1-education",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "education",

    order: 2,

    title: "Éducation, Apprentissage et Pensée Critique",

    subtitle:
        "Présentez et nuancez des arguments académiques en utilisant la nominalisation et un style plus formel.",

    description:
        "Explorez le vocabulaire académique et apprenez à transformer des verbes en noms abstraits pour un registre universitaire plus précis.",

    cover: "/covers/education-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "education",
        "grammar",
        "académique"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Present and evaluate academic arguments about education",

        "Qualify statements using a more formal, academic register",

        "Use nominalisation to sound more objective and precise",

        "Discuss expertise, rigor and critical thinking with nuance"

    ],

    vocabulary: vocabulary([
        "fonder",
        "exigence intellectuelle",
        "un discours académique",
        "un exemple révélateur",
        "contre-intuitif",
        "propice à",
        "qualifications",
        "intérioriser",
        "en contradiction avec",
        "solide (argument)",
        "bancal",
        "creuser un sujet",
        "théorie de la connaissance",
        "conditionné par",
        "passer au crible",
        "de grande portée",
        "par cœur",
        "accorder du crédit à",
        "une règle générale",
        "ébranler un argument"
    ]),

    blocks: [

        heading("Argumenter avec Précision Académique"),

        paragraph(
            "Le français académique et analytique repose beaucoup sur la nominalisation — transformer des verbes ou adjectifs en noms abstraits — pour produire un discours plus formel et objectif."
        ),

        examples([
            {
                text: "L'exigence intellectuelle de cette étude est ce qui la distingue d'un exemple plus bancal.",
                translation: "O rigor intelectual deste estudo é o que a diferencia de um exemplo mais frágil."
            },
            {
                text: "Cet argument est conditionné par un postulat qu'il faudrait creuser davantage.",
                translation: "Esse argumento está condicionado a uma premissa que precisaria ser mais aprofundada."
            },
            {
                text: "C'est contre-intuitif, mais apprendre par cœur peut parfois fonder une compréhension plus profonde.",
                translation: "É contraintuitivo, mas aprender de cor às vezes pode servir de base para uma compreensão mais profunda."
            },
            {
                text: "Ses qualifications lui accordent du crédit, mais cela ne les met pas à l'abri d'un examen minutieux.",
                translation: "As qualificações dela dão credibilidade, mas isso não as protege de um exame minucioso."
            },
            {
                text: "Cette approche semble en contradiction avec tout ce qu'on sait sur l'intériorisation des connaissances.",
                translation: "Essa abordagem parece estar em contradição com tudo o que sabemos sobre a internalização do conhecimento."
            },
            {
                text: "En règle générale, toute affirmation qui n'invite pas à être passée au crible devrait elle-même être remise en question.",
                translation: "Como regra geral, qualquer afirmação que não convide a um exame minucioso deveria ela mesma ser questionada."
            }
        ]),

        dialogue([
            { speaker: "Inès", text: "Qu'est-ce que tu as pensé du cours sur la théorie de la connaissance ?" },
            { speaker: "Thomas", text: "Intéressant, mais certains arguments m'ont paru bancals si on les creuse vraiment." },
            { speaker: "Inès", text: "Un exemple révélateur ?" },
            { speaker: "Thomas", text: "L'idée que le par cœur n'est jamais propice à une vraie compréhension. C'est contre-intuitif — ça peut fonder un apprentissage plus profond ensuite." },
            { speaker: "Inès", text: "Juste. Même si ses qualifications accordent un certain crédit à l'argument." },
              { speaker: "Thomas", text: "Bien sûr, mais les qualifications ne devraient pas empêcher de passer le discours au crible." },
            { speaker: "Inès", text: "En règle générale, j'évite d'intérioriser une affirmation sans en questionner le raisonnement." },
            { speaker: "Thomas", text: "Exactement. Même des conclusions de grande portée peuvent être conditionnées par quelque chose d'assez bancal." },
            { speaker: "Inès", text: "C'est ce qui rend ce discours si en contradiction avec l'enseignement traditionnel, je suppose." }
        ]),

        grammar(educationC1Blocks[0].title, educationC1Blocks[0].text),

        list([

            "nominalisation — verbe/adjectif → nom abstrait pour la formalité",

            "fonder, exigence intellectuelle, passer au crible, ébranler un argument",

            "conditionné par, en contradiction avec, propice à",

            "une règle générale, un exemple révélateur"

        ]),

        tip(
            "Ne Nominalise Pas Tout",
            "La nominalisation est puissante à l'écrit académique, mais empiler trop de noms abstraits dans une même phrase la rend lourde. Si une phrase semble dense, reviens à un verbe direct."
        ),

        culture(
            "L'Argumentation à la Française",
            "Le système éducatif français, avec la fameuse dissertation en trois parties (thèse, antithèse, synthèse), forme les étudiants dès le lycée à un style argumentatif structuré et nuancé — ce qui explique en partie pourquoi le français académique valorise autant la nuance et la nominalisation."
        ),

        quiz(
            "Choisis la version nominalisée la plus naturelle de \"On devrait évaluer les étudiants différemment.\"",
            [
                "On évalue les étudiants différemment.",
                "Une évaluation différente des étudiants est sans doute nécessaire.",
                "Évaluer les étudiants différemment est mauvais.",
                "Les étudiants sont évalués différemment."
            ],
            1,
            "Nominaliser 'évaluer' en 'évaluation' produit une phrase plus formelle et académique."
        ),

        quiz(
            "Que signifie un argument 'bancal' ?",
            ["un argument très solide", "un argument mal fondé ou fragile", "un argument très populaire", "un argument neutre"],
            1,
            "'Bancal' décrit un argument mal fondé, fragile, qui ne tient pas bien debout."
        ),

        quiz(
            "Que signifie 'passer un argument au crible' ?",
            ["l'ignorer complètement", "l'examiner minutieusement", "l'accepter sans discussion", "le résumer brièvement"],
            1,
            "'Passer au crible' signifie examiner quelque chose de façon minutieuse et critique."
        )

    ],

    summary: {

        tip:
            "Pratique en transformant trois phrases verbales sur l'éducation en phrases nominalisées, plus académiques.",

        review: [

            "nominalisation pour un registre académique",

            "fonder, exigence intellectuelle, passer au crible, ébranler un argument",

            "conditionné par, en contradiction avec, propice à"

        ]

    }

};
