import { environmentB1Blocks } from "../../../grammar/shared/french/environmentB1";
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

export const environmentLesson = {

    id: "french-b1-environment",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "environment",

    order: 9,

    title: "Environnement et Choix Quotidiens",

    subtitle:
        "Fale sobre meio ambiente e escolhas do dia a dia em francês usando frases com 'si' (real ou hipotética).",

    description:
        "Aprenda vocabulário sobre meio ambiente e sustentabilidade, e a diferença entre frases com 'si' realistas e hipotéticas.",

    cover: "/covers/environment-fr.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "environment",
        "conditionnel",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss environmental issues and sustainable choices",

        "Use 'si' + présent, futur simple for a realistic situation",

        "Use 'si' + imparfait, conditionnel présent for a hypothetical situation",

        "Discuss causes and consequences related to the environment"

    ],

    vocabulary: vocabulary([
        "changement climatique",
        "réchauffement climatique",
        "pollution",
        "recycler",
        "réduire le gaspillage",
        "énergie renouvelable",
        "empreinte carbone",
        "durable",
        "écologique",
        "plastique à usage unique",
        "espèce en voie de disparition",
        "déforestation",
        "gaz à effet de serre",
        "réutilisable",
        "éteindre les lumières",
        "économiser l'énergie",
        "transports en commun",
        "prendre des douches plus courtes",
        "environnement",
        "ressources naturelles"
    ]),

    blocks: [

        heading("Choix Réels et Choix Hypothétiques"),

        paragraph(
            "Pour parler des choix environnementaux, le français distingue les phrases avec 'si' réalistes ('si' + présent, futur simple) des phrases hypothétiques ('si' + imparfait, conditionnel présent)."
        ),

        examples([
            {
                text: "Si nous réduisons notre consommation de plastique, nous protégerons les océans.",
                translation: "Se reduzirmos nosso consumo de plástico, vamos proteger os oceanos."
            },
            {
                text: "Si tout le monde utilisait les transports en commun, il y aurait moins de pollution.",
                translation: "Se todo mundo usasse transporte público, haveria menos poluição."
            },
            {
                text: "Si on n'agit pas maintenant, le changement climatique va empirer.",
                translation: "Se não agirmos agora, a mudança climática vai piorar."
            },
            {
                text: "Si j'avais plus de temps, je participerais à plus d'actions écologiques.",
                translation: "Se eu tivesse mais tempo, participaria de mais ações ecológicas."
            },
            {
                text: "Si chacun économisait un peu d'énergie, cela ferait une vraie différence.",
                translation: "Se cada um economizasse um pouco de energia, isso faria uma diferença real."
            },
            {
                text: "Nous recyclerons plus si la ville installe plus de poubelles de tri.",
                translation: "Vamos reciclar mais se a cidade instalar mais lixeiras de separação."
            },
            {
                text: "Si les entreprises étaient plus responsables, l'environnement en profiterait.",
                translation: "Se as empresas fossem mais responsáveis, o meio ambiente se beneficiaria."
            }
        ]),

        dialogue([
            { speaker: "Zoé", text: "Tu as pensé à réduire tes déchets récemment ?" },
            { speaker: "Adam", text: "Un peu. Si j'achetais moins de plastique à usage unique, ce serait déjà un bon début." },
            { speaker: "Zoé", text: "Exactement. Et si on utilisait plus les transports en commun, on réduirait aussi notre empreinte carbone." },
            { speaker: "Adam", text: "C'est vrai, mais ce n'est pas toujours pratique. Si les transports étaient plus fréquents dans mon quartier, je les utiliserais plus souvent." },
            { speaker: "Zoé", text: "Ça se comprend. Si chacun faisait de petits efforts, ça ferait une vraie différence à long terme." },
            { speaker: "Adam", text: "Je suis d'accord. Si je commençais dès maintenant, je pourrais changer pas mal d'habitudes cette année." },
            { speaker: "Zoé", text: "Bonne idée ! Et si on recyclait davantage, on gaspillerait beaucoup moins de ressources." },
            { speaker: "Adam", text: "Tu as raison. Je vais essayer de faire des choix plus durables à partir d'aujourd'hui." }
        ]),

        grammar(environmentB1Blocks[0].title, environmentB1Blocks[0].text),

        list([

            "si + présent, ... futur simple — situation réelle",

            "si + imparfait, ... conditionnel présent — situation hypothétique",

            "durable, écologique, énergie renouvelable",

            "empreinte carbone, gaspillage, recycler"

        ]),

        tip(
            "Jamais de Futur ou Conditionnel Après Si",
            "Ne mélange jamais 'si' avec le futur ou le conditionnel juste après. On ne dit jamais 'si je serai' ou 'si j'aurais' — après 'si', on utilise seulement le présent ou l'imparfait."
        ),

        culture(
            "L'Écologie au Quotidien",
            "Dans de nombreux pays francophones, des gestes comme le tri sélectif, l'utilisation de sacs réutilisables et la réduction du gaspillage alimentaire sont devenus des habitudes quotidiennes largement encouragées, notamment par des campagnes municipales."
        ),

        quiz(
            "Choisis la bonne phrase.",
            ["Si je serai riche, je voyagerai.", "Si je suis riche, je voyagerai.", "Si je sois riche, je voyagerai.", "Si j'étais riche, je voyagerai."],
            1,
            "Après 'si' pour une situation réelle, on utilise le présent : 'Si je suis riche...'"
        ),

        quiz(
            "Quelle phrase exprime une situation hypothétique ?",
            [
                "Si nous recyclons, nous réduirons les déchets.",
                "Si nous recyclions, nous réduirions les déchets.",
                "Si nous recyclerons, nous réduirons les déchets.",
                "Si nous avons recyclé, nous réduirons les déchets."
            ],
            1,
            "'Si' + imparfait, ... conditionnel présent exprime une situation hypothétique."
        ),

        quiz(
            "Après \"si\" + imparfait, quel temps utilise-t-on ?",
            ["le futur simple", "le conditionnel présent", "le présent", "le passé composé"],
            1,
            "'Si' + imparfait est suivi du conditionnel présent."
        )

    ],

    summary: {

        tip:
            "Pratique à faire des phrases avec 'si' sur tes propres choix écologiques — d'abord réalistes, puis hypothétiques.",

        review: [

            "si + présent, ... futur simple — réel",

            "si + imparfait, ... conditionnel présent — hypothétique",

            "durable, écologique, énergie renouvelable",

            "recycler, empreinte carbone, gaspillage"

        ]

    }

};
