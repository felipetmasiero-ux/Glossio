import { scienceTechnologyB2Blocks } from "../../../grammar/shared/french/scienceTechnologyB2";
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

export const scienceTechnologyLesson = {

    id: "french-b2-science-technology",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "science-technology",

    order: 5,

    title: "Science, Technologie et Innovation",

    subtitle:
        "Explore cenários hipotéticos sobre ciência e tecnologia em francês usando 'si' + plus-que-parfait para o passado irreal.",

    description:
        "Aprenda vocabulário sobre inovação e tecnologia, e como usar 'si' + plus-que-parfait, conditionnel passé para imaginar um resultado diferente para algo que já aconteceu.",

    cover: "/covers/science-technology-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "technology",
        "hypothèse",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss scientific discoveries and technological innovation",

        "Use 'si' + plus-que-parfait, conditionnel passé for an unreal past hypothesis",

        "Complete the three-level 'si' system (real, hypothetical, unreal past)",

        "Discuss ethical questions raised by technology"

    ],

    vocabulary: vocabulary([
        "avancée technologique",
        "essor",
        "bouleverser",
        "répercussions",
        "enjeu éthique",
        "algorithme",
        "données personnelles",
        "protection des données",
        "innovation de rupture",
        "recherche scientifique",
        "expérimentation",
        "preuve scientifique",
        "avancée médicale",
        "dilemme éthique",
        "remédier à",
        "anticiper les conséquences",
        "à double tranchant",
        "transformer en profondeur",
        "révolutionner",
        "incontournable"
    ]),

    blocks: [

        heading("Imaginer un Passé Différent"),

        paragraph(
            "Pour discuter des conséquences possibles d'une avancée scientifique ou technologique, on imagine souvent comment les choses auraient pu se passer différemment — avec 'si' + plus-que-parfait, conditionnel passé."
        ),

        examples([
            {
                text: "Si les chercheurs avaient eu plus de temps, ils auraient trouvé une solution.",
                translation: "Se os pesquisadores tivessem tido mais tempo, teriam encontrado uma solução."
            },
            {
                text: "Si cette technologie n'avait pas existé, nous n'aurions jamais fait cette découverte.",
                translation: "Se essa tecnologia não tivesse existido, nunca teríamos feito essa descoberta."
            },
            {
                text: "Si on avait investi davantage dans la recherche, on aurait avancé plus vite.",
                translation: "Se tivéssemos investido mais em pesquisa, teríamos avançado mais rápido."
            },
            {
                text: "Si l'intelligence artificielle n'avait pas évolué aussi vite, on aurait eu plus de temps pour s'adapter.",
                translation: "Se a inteligência artificial não tivesse evoluído tão rápido, teríamos tido mais tempo para nos adaptar."
            },
            {
                text: "Aurait-on pu éviter ce dilemme éthique si on avait anticipé les conséquences ?",
                translation: "Teríamos conseguido evitar esse dilema ético se tivéssemos antecipado as consequências?"
            },
            {
                text: "Si les données personnelles avaient été mieux protégées, cet incident ne serait pas arrivé.",
                translation: "Se os dados pessoais tivessem sido mais bem protegidos, esse incidente não teria acontecido."
            },
            {
                text: "Sans cette avancée médicale, des milliers de vies n'auraient pas été sauvées.",
                translation: "Sem esse avanço médico, milhares de vidas não teriam sido salvas."
            }
        ]),

        dialogue([
            { speaker: "Salomé", text: "Tu as vu cette nouvelle découverte scientifique ?" },
            { speaker: "Victor", text: "Oui, impressionnant. Si les chercheurs n'avaient pas persisté pendant des années, ils n'auraient jamais abouti à ce résultat." },
            { speaker: "Salomé", text: "C'est vrai. Et si le gouvernement avait coupé leur financement, comme prévu au départ, tout ça n'aurait jamais vu le jour." },
            { speaker: "Victor", text: "Exactement. Ça pose quand même un dilemme éthique intéressant, non ?" },
            { speaker: "Salomé", text: "Complètement. Si on avait anticipé toutes les conséquences dès le début, on aurait peut-être encadré ça différemment." },
            { speaker: "Victor", text: "Sans cette avancée, on serait clairement en retard sur beaucoup de choses aujourd'hui." },
            { speaker: "Salomé", text: "C'est vrai que la technologie est à double tranchant. Si elle n'avait pas autant évolué, on aurait moins de risques, mais aussi moins de solutions." },
            { speaker: "Victor", text: "Tout à fait. C'est tout l'enjeu de l'innovation de rupture." }
        ]),

        grammar(scienceTechnologyB2Blocks[0].title, scienceTechnologyB2Blocks[0].text),

        list([

            "si + plus-que-parfait, ... conditionnel passé",

            "imagine un résultat différent pour le passé",

            "sans + nom = si...n'avait pas eu lieu",

            "enjeu éthique, dilemme éthique, à double tranchant"

        ]),

        tip(
            "Jamais de Conditionnel Après Si",
            "Ne mélange jamais les temps dans une phrase avec 'si'. Après 'si', jamais de conditionnel : on ne dit pas 'si j'aurais su'. La bonne structure est toujours 'si' + plus-que-parfait, ... conditionnel passé."
        ),

        culture(
            "Le Débat sur l'Éthique Scientifique",
            "En France, les grandes avancées scientifiques et technologiques font souvent l'objet de débats publics sur leurs implications éthiques, notamment à travers des comités consultatifs nationaux qui rassemblent scientifiques, philosophes et citoyens."
        ),

        quiz(
            "Choisis la bonne phrase.",
            [
                "Si j'aurais su, je serais venu.",
                "Si j'avais su, je serais venu.",
                "Si j'ai su, je serais venu.",
                "Si j'avais su, je serai venu."
            ],
            1,
            "La structure correcte est 'si' + plus-que-parfait, ... conditionnel passé : 'si j'avais su, je serais venu'."
        ),

        quiz(
            "Que décrit la structure \"si\" + plus-que-parfait, conditionnel passé ?",
            [
                "Une situation réelle et probable",
                "Une situation hypothétique dans le futur",
                "Un résultat imaginé différent pour quelque chose de déjà arrivé",
                "Une habitude passée"
            ],
            2,
            "Cette structure imagine un résultat différent pour un événement déjà arrivé, qu'on ne peut plus changer."
        ),

        quiz(
            "Choisis l'équivalent de \"si cette technologie n'avait pas existé\".",
            ["Avec cette technologie", "Sans cette technologie", "Grâce à cette technologie", "Malgré cette technologie"],
            1,
            "'Sans + nom' peut remplacer 'si...n'avait pas eu lieu'."
        )

    ],

    summary: {

        tip:
            "Pratique à imaginer un résultat différent pour un événement scientifique ou technologique du passé, en utilisant 'si' + plus-que-parfait, conditionnel passé.",

        review: [

            "si + plus-que-parfait, ... conditionnel passé",

            "sans + nom = si...n'avait pas eu lieu",

            "enjeu éthique, dilemme éthique, à double tranchant",

            "recherche scientifique, innovation de rupture"

        ]

    }

};
