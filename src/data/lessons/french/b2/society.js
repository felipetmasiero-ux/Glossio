import { societyB2Blocks } from "../../../grammar/shared/french/societyB2";
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

    id: "french-b2-society",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "society",

    order: 4,

    title: "Société, Valeurs et Enjeux Sociaux",

    subtitle:
        "Discuta questões sociais em francês usando 'bien que' e 'quoique' com o subjuntivo para expressar concessão.",

    description:
        "Aprenda vocabulário sobre desigualdade, solidariedade e questões sociais, e como usar 'bien que'/'quoique' + subjuntivo para contrastar ideias.",

    cover: "/covers/society-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "society",
        "subjonctif",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss social issues, inequality and community values",

        "Use 'bien que' and 'quoique' + subjonctif for concession",

        "Distinguish 'bien que'/'quoique' from 'même si'",

        "Present nuanced perspectives on social topics"

    ],

    vocabulary: vocabulary([
        "bien que",
        "quoique",
        "cohésion sociale",
        "tissu social",
        "précarité",
        "solidarité",
        "discrimination",
        "préjugé",
        "intégration",
        "exclusion sociale",
        "diversité culturelle",
        "vivre ensemble",
        "lien social",
        "injustice",
        "engagement citoyen",
        "porter un regard critique sur",
        "sensibiliser à",
        "minorité",
        "cadre légal",
        "équité"
    ]),

    blocks: [

        heading("Nuancer un Point de Vue sur la Société"),

        paragraph(
            "Pour discuter de questions sociales avec nuance, 'bien que' et 'quoique' permettent d'accepter un fait tout en le contrastant avec une autre idée — toujours suivis du subjonctif."
        ),

        examples([
            {
                text: "Bien que la précarité touche beaucoup de familles, on en parle encore trop peu.",
                translation: "Embora a precariedade afete muitas famílias, ainda se fala pouco sobre isso."
            },
            {
                text: "Quoiqu'il soit difficile de changer les mentalités, des progrès sont possibles.",
                translation: "Ainda que seja difícil mudar mentalidades, avanços são possíveis."
            },
            {
                text: "Bien que ce quartier soit stigmatisé, il a un vrai tissu social solidaire.",
                translation: "Embora esse bairro seja estigmatizado, ele tem um verdadeiro tecido social solidário."
            },
            {
                text: "Quoique la loi ait évolué, les préjugés persistent encore.",
                translation: "Ainda que a lei tenha evoluído, os preconceitos ainda persistem."
            },
            {
                text: "Bien que je comprenne les deux points de vue, je penche pour plus de solidarité.",
                translation: "Embora eu entenda os dois pontos de vista, eu me inclino para mais solidariedade."
            },
            {
                text: "Bien que l'intégration ait progressé, il reste beaucoup à faire pour l'équité.",
                translation: "Embora a integração tenha progredido, ainda há muito a fazer pela equidade."
            },
            {
                text: "Quoique le sujet soit sensible, il faut en discuter ouvertement.",
                translation: "Ainda que o assunto seja sensível, é preciso discuti-lo abertamente."
            }
        ]),

        dialogue([
            { speaker: "Yasmine", text: "Tu as vu le reportage sur la précarité dans certains quartiers ?" },
            { speaker: "Paul", text: "Oui, c'était marquant. Bien que ce sujet soit connu, on ne réalise pas toujours son ampleur." },
            { speaker: "Yasmine", text: "Exactement. Quoique la solidarité existe dans ces quartiers, elle est souvent invisible dans les médias." },
            { speaker: "Paul", text: "C'est vrai. Bien que la situation soit difficile, les habitants s'organisent beaucoup entre eux." },
            { speaker: "Yasmine", text: "Ça montre une vraie cohésion sociale, malgré tout. Quoiqu'on en dise, les préjugés ont la vie dure." },
            { speaker: "Paul", text: "Complètement d'accord. Bien qu'on ait fait des progrès sur l'intégration, il reste beaucoup de chemin." },
            { speaker: "Yasmine", text: "J'espère qu'on va continuer à sensibiliser les gens à ces questions." },
            { speaker: "Paul", text: "Moi aussi. C'est en discutant de tout ça qu'on avance, même si le sujet est sensible." }
        ]),

        grammar(societyB2Blocks[0].title, societyB2Blocks[0].text),

        list([

            "bien que / quoique + subjonctif — concession",

            "même si + indicatif — condition",

            "précarité, solidarité, cohésion sociale",

            "intégration, préjugé, équité"

        ]),

        tip(
            "Quoique vs Quoi Que",
            "'Bien que' et 'quoique' sont interchangeables dans la plupart des contextes, mais 'quoique' est un peu plus littéraire. Attention à ne pas confondre 'quoique' (une seule idée, subjonctif) avec 'quoi que' (deux mots, 'quoi que tu fasses' = quelle que soit ton action)."
        ),

        culture(
            "Débattre des Enjeux Sociaux",
            "En France, les questions de précarité, d'inégalité et d'intégration sont régulièrement débattues dans les médias et à l'école — apprendre à en discuter avec nuance, en reconnaissant la complexité du sujet, fait partie de l'éducation civique."
        ),

        quiz(
            "Choisis la bonne phrase.",
            [
                "Bien qu'il est fatigué, il continue.",
                "Bien qu'il soit fatigué, il continue.",
                "Bien qu'il a été fatigué, il continue.",
                "Bien qu'il sera fatigué, il continue."
            ],
            1,
            "'Bien que' est toujours suivi du subjonctif : 'bien qu'il soit fatigué'."
        ),

        quiz(
            "Quel mode suit \"quoique\" ?",
            ["l'indicatif", "le conditionnel", "le subjonctif", "l'infinitif"],
            2,
            "'Quoique' est toujours suivi du subjonctif, comme 'bien que'."
        ),

        quiz(
            "Quelle phrase utilise correctement \"même si\" ?",
            [
                "Même si il soit tard, je viens.",
                "Même s'il est tard, je viens.",
                "Même s'il soit tard, je viens.",
                "Même si il est tard, je viens."
            ],
            1,
            "'Même si' est suivi de l'indicatif, pas du subjonctif : 'même s'il est tard'."
        )

    ],

    summary: {

        tip:
            "Pratique à exprimer une opinion nuancée sur un sujet de société en utilisant 'bien que' ou 'quoique' + subjonctif.",

        review: [

            "bien que / quoique + subjonctif",

            "même si + indicatif",

            "précarité, solidarité, cohésion sociale",

            "intégration, préjugé, équité"

        ]

    }

};
