import { economicsC1Blocks } from "../../../grammar/shared/french/economicsC1";
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

export const economicsLesson = {

    id: "french-c1-economics",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "economics",

    order: 10,

    title: "Économie, Entreprise et Prise de Décision",

    subtitle:
        "Décrivez des tendances économiques et évaluez des risques avec des structures nominales complexes.",

    description:
        "Discutez de marchés, de risques et de comportement des consommateurs, en apprenant à construire des expressions comme 'une hausse marquée de' pour décrire des données formellement.",

    cover: "/covers/economics-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "economics",
        "grammar",
        "entreprise"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss economic trends and business decisions with precision",

        "Evaluate risk and interpret data using formal language",

        "Build complex noun phrases for trends and approximation",

        "Explain financial decisions and their trade-offs clearly"

    ],

    vocabulary: vocabulary([
        "un ralentissement économique",
        "diversifier",
        "un risque calculé",
        "instable (marché)",
        "tirer profit de",
        "une marge d'erreur",
        "être en deçà des attentes",
        "un filet de sécurité",
        "être dans le rouge",
        "une option viable",
        "rogner sur",
        "hors de prix",
        "une mesure incitative",
        "un coût caché",
        "florissant",
        "concentrer en début de période",
        "une règle empirique",
        "évaluer les compromis",
        "une décision avisée",
        "atteindre l'équilibre financier"
    ]),

    blocks: [

        heading("Décrire des Tendances avec Précision"),

        paragraph(
            "Le français économique et professionnel privilégie les structures nominales complexes pour résumer des données de façon formelle et précise, plutôt que de simples phrases verbales."
        ),

        examples([
            {
                text: "On observe un ralentissement économique marqué, ce qui met plusieurs petites entreprises dans le rouge.",
                translation: "Observa-se uma desaceleração econômica acentuada, o que está colocando várias pequenas empresas no vermelho."
            },
            {
                text: "Une tendance croissante à diversifier ses investissements a aidé beaucoup d'investisseurs face à un marché instable.",
                translation: "Uma tendência crescente de diversificar investimentos ajudou muitos investidores diante de um mercado instável."
            },
            {
                text: "Près d'un tiers des répondants ont dit que le produit était en deçà des attentes, malgré un lancement florissant.",
                translation: "Cerca de um terço dos entrevistados disse que o produto ficou abaixo do esperado, apesar de um lançamento aquecido."
            },
            {
                text: "Rogner sur le contrôle qualité n'est rarement une décision avisée, même si ça ressemble à un risque calculé au début.",
                translation: "Economizar no controle de qualidade raramente é uma decisão sensata, mesmo que pareça um risco calculado no início."
            },
            {
                text: "Avec une marge d'erreur aussi large, difficile de savoir si on atteindra l'équilibre financier ce trimestre.",
                translation: "Com uma margem de erro tão ampla, é difícil saber se atingiremos o equilíbrio financeiro neste trimestre."
            },
            {
                text: "Une hausse modeste mais constante des mesures incitatives a permis à l'entreprise de tirer profit de la demande.",
                translation: "Um aumento modesto, mas constante, nos incentivos permitiu que a empresa aproveitasse a demanda."
            }
        ]),

        dialogue([
            { speaker: "Charlotte", text: "Comment se porte la nouvelle gamme de produits ?" },
            { speaker: "Guillaume", text: "Il y a eu une hausse marquée des ventes au départ, mais honnêtement, c'est en deçà de certaines prévisions internes." },
            { speaker: "Charlotte", text: "C'est un coût caché, ou autre chose ?" },
            { speaker: "Guillaume", text: "Un peu des deux. On a rogné sur le marketing au lancement, ce qui n'était sans doute pas une décision avisée." },
            { speaker: "Charlotte", text: "Vous aviez évalué les compromis avant ?" },
              { speaker: "Guillaume", text: "Oui, mais la marge d'erreur de nos prévisions était plus large qu'on ne le pensait." },
            { speaker: "Charlotte", text: "Concentrer les dépenses en début de trimestre prochain, c'est une option viable pour rattraper ça ?" },
            { speaker: "Guillaume", text: "C'est le risque calculé qu'on évalue. Si la demande reste florissante, on pourrait atteindre l'équilibre d'ici la fin de l'année." },
            { speaker: "Charlotte", text: "En règle générale, je préfère diversifier plutôt que tout miser sur un seul produit." },
            { speaker: "Guillaume", text: "Justes. On n'est pas dans le rouge encore, mais autant tirer profit de cette fenêtre pendant qu'on le peut." }
        ]),

        grammar(economicsC1Blocks[0].title, economicsC1Blocks[0].text),

        list([

            "déterminant + adjectif + nom + de/à — structure nominale pour les tendances",

            "approximation : près d'un tiers de, la grande majorité de, une baisse modeste mais constante",

            "un ralentissement économique, diversifier, instable, florissant",

            "un filet de sécurité, être dans le rouge, un coût caché, une décision avisée"

        ]),

        tip(
            "Verbe ou Structure Nominale ?",
            "À l'oral courant, 'Les prix ont beaucoup augmenté' est parfaitement naturel. Dans un rapport ou une présentation, 'Il y a eu une hausse marquée des prix' sonne bien plus professionnel — adapte la structure au registre."
        ),

        culture(
            "Lire la Presse Économique Française",
            "Des journaux comme Les Échos ou La Tribune utilisent systématiquement ce registre de structures nominales ('un net ralentissement de', 'une légère progression de') — reconnaître ce schéma est l'un des moyens les plus rapides pour lire la presse économique française avec fluidité."
        ),

        quiz(
            "Choisis la version nominale la plus naturelle de \"Les prix ont beaucoup augmenté.\"",
            [
                "Les prix ont augmenté.",
                "Il y a eu une hausse marquée des prix.",
                "Les prix augmentent beaucoup en ce moment.",
                "Beaucoup de choses sont arrivées aux prix."
            ],
            1,
            "'Il y a eu une hausse marquée des prix' est la structure nominale complexe utilisée en français formel/économique."
        ),

        quiz(
            "Que signifie 'être dans le rouge' ?",
            ["faire un grand profit", "être en situation de perte financière", "avoir des finances très stables", "lancer un nouveau produit"],
            1,
            "'Être dans le rouge' signifie être en situation de perte financière."
        ),

        quiz(
            "Que signifie 'un risque calculé' ?",
            ["un risque pris sans réflexion", "un risque pris après avoir soigneusement évalué les conséquences possibles", "une décision illégale", "un risque garanti de réussir"],
            1,
            "'Un risque calculé' est un risque pris délibérément, après avoir évalué les coûts et bénéfices probables."
        )

    ],

    summary: {

        tip:
            "Pratique en décrivant une tendance économique réelle ou imaginaire avec au moins deux structures nominales complexes.",

        review: [

            "structures nominales complexes pour décrire les tendances et l'approximation",

            "un ralentissement économique, diversifier, instable, florissant",

            "un filet de sécurité, être dans le rouge, un coût caché, une décision avisée"

        ]

    }

};
