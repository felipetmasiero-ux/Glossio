import {
    heading,
    paragraph,
    examples,
    dialogue,
    tip,
    culture,
    list,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const c1ReviewLesson = {

    id: "french-c1-review",

    language: "french",

    level: "C1",

    category: "Review",

    topic: "review",

    order: 12,

    title: "Révision C1 et Communication Avancée",

    subtitle:
        "Revise toda a gramática do módulo C1 de francês em situações reais de negociação, debate e análise crítica.",

    description:
        "Uma revisão final combinando inversão do sujeito, nominalização, conditionnel passé, quand bien même, futuro anterior, orações participiais, discurso indireto avançado, relativas com lequel, reprovação atenuada, estruturas nominais complexas e marcadores de nuance.",

    cover: "/covers/c1-review-fr.webp",

    estimatedTime: 17,

    difficulty: 5,

    xp: 60,

    tags: [
        "review",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Review every grammar point from the C1 module",

        "Recognize and combine multiple advanced structures in real conversation",

        "Test yourself with mixed questions from every lesson",

        "Feel ready to communicate with precision, nuance and fluency at C1 level"

    ],

    vocabulary: vocabulary([
        "à un tournant",
        "après coup",
        "ébranler un argument",
        "une règle générale",
        "être sur la même longueur d'onde",
        "une partie prenante",
        "l'ordre établi",
        "un tournant décisif",
        "à la pointe de",
        "une zone grise",
        "un signal d'alarme",
        "les signes ne trompent pas",
        "prendre avec des pincettes",
        "un agenda caché",
        "un tour de force",
        "toucher une corde sensible",
        "faire la paix avec une situation",
        "une insécurité sous-jacente",
        "une décision avisée",
        "évaluer les compromis",
        "une remarque pertinente",
        "convenir de ne pas être d'accord"
    ]),

    blocks: [

        heading("Vous Avez Atteint le Niveau C1 !"),

        paragraph(
            "Félicitations pour avoir terminé le module C1 ! Vous avez appris à discuter d'identité, d'éducation, de leadership, de société, de technologie, d'environnement, de médias, de culture, de psychologie, d'économie et d'argumentation avec précision, nuance et fluidité. Cette leçon réunit toutes les structures ensemble."
        ),

        examples([
            {
                text: "Sans doute avais-je besoin de composer avec mes doutes avant d'arriver à un tournant décisif et de me recentrer.",
                translation: "Sem dúvida eu precisava lidar com minhas dúvidas antes de chegar a um marco decisivo e me recentrar."
            },
            {
                text: "Une évaluation différente est sans doute nécessaire, mais cet argument reste conditionné par un postulat bancal.",
                translation: "Uma avaliação diferente é sem dúvida necessária, mas esse argumento continua condicionado a uma premissa frágil."
            },
            {
                text: "La direction aurait pris cette décision sans consulter les parties prenantes, mais rien n'est encore confirmé.",
                translation: "A diretoria teria tomado essa decisão sem consultar as partes interessadas, mas nada está confirmado ainda."
            },
            {
                text: "Quand bien même l'ordre établi changerait, certains problèmes structurels persisteraient probablement.",
                translation: "Mesmo que a ordem estabelecida mudasse, alguns problemas estruturais provavelmente persistiriam."
            },
            {
                text: "D'ici quelques années, cette innovation à la pointe de son domaine aura sans doute empiété sur une zone grise éthique.",
                translation: "Daqui a alguns anos, essa inovação na vanguarda de sua área provavelmente terá avançado sobre uma zona cinzenta ética."
            },
            {
                text: "Confrontés à un signal d'alarme aussi clair, plusieurs pays ont enfin commencé à endiguer leurs émissions.",
                translation: "Diante de um alerta tão claro, vários países finalmente começaram a conter suas emissões."
            },
            {
                text: "Il a laissé entendre que les chiffres avaient été triés sur le volet, alors je prends tout ça avec des pincettes.",
                translation: "Ele deu a entender que os números tinham sido selecionados de forma conveniente, então estou desconfiando de tudo isso."
            },
            {
                text: "C'est un tour de force tout en retenue, ce qui a vraiment touché une corde sensible chez la critique.",
                translation: "É um feito extraordinário e cheio de sutileza, o que realmente emocionou a crítica."
            },
            {
                text: "Ça n'aurait pas été plus simple de me le dire directement, plutôt que de ruminer une insécurité sous-jacente ?",
                translation: "Não teria sido mais simples me dizer diretamente, em vez de remoer uma insegurança de fundo?"
            },
            {
                text: "Il y a eu une hausse marquée de la demande, même si rester prudent reste une décision avisée pour l'instant.",
                translation: "Houve um aumento acentuado na demanda, mesmo que continuar cauteloso ainda seja uma decisão sensata por ora."
            },
            {
                text: "C'est une remarque pertinente, et dans une certaine mesure je suis d'accord, mais c'est sans doute une simplification excessive.",
                translation: "Essa é uma observação pertinente, e até certo ponto eu concordo, mas é sem dúvida uma simplificação exagerada."
            }
        ]),

        dialogue([
            { speaker: "Camille", text: "Ça faisait longtemps ! Comment ça va depuis ce tournant l'année dernière ?" },
            { speaker: "Julien", text: "Très bien, en fait. Après coup, j'avais sans doute besoin de composer avec pas mal d'insécurités que je ne voyais pas." },
            { speaker: "Camille", text: "Qu'est-ce qui a vraiment changé les choses ?" },
            { speaker: "Julien", text: "Honnêtement, un mentor a souligné que tout mon raisonnement était conditionné par un postulat plutôt bancal. Ça a fait écho immédiatement." },
            { speaker: "Camille", text: "Rares sont les gens qui prennent ce genre de retour aussi bien." },
            { speaker: "Julien", text: "J'avais des réserves au début. Mais si je ne m'étais pas remis en question moi-même, je ne serais pas sur la même longueur d'onde avec mes objectifs aujourd'hui." },
            { speaker: "Camille", text: "C'est une remarque pertinente. J'ai vécu un peu la même chose au travail — on est presque dans une impasse totale sur un nouveau projet." },
            { speaker: "Julien", text: "Confrontée à ce désaccord, quel est ton instinct ?" },
              { speaker: "Camille", text: "Dans une certaine mesure, je suis d'accord avec l'autre camp, mais c'est sans doute une simplification excessive du vrai risque." },
            { speaker: "Julien", text: "Ça ressemble à un raisonnement bien construit. Certes, c'est exactement le genre de nuance que j'avais du mal à exprimer avant." },
            { speaker: "Camille", text: "Pareil pour moi. C'est vraiment un signal d'alarme sur à quel point la précision change une conversation." },
            { speaker: "Julien", text: "Tout à fait d'accord. Tout bien considéré, je pense qu'on a fait du chemin, tous les deux." }
        ]),

        list([

            "L'inversion du sujet après certains adverbes",

            "La nominalisation et le style académique",

            "Le conditionnel passé pour une information non confirmée",

            "Quand bien même + conditionnel et les nuances de la concession",

            "Le futur antérieur et les expressions de probabilité avancée",

            "Les propositions participiales et le gérondif",

            "Le discours rapporté avancé et la concordance des temps",

            "Les relatives avec préposition + lequel/laquelle",

            "Suggestion et reproche atténué",

            "Les structures nominales complexes pour décrire les tendances",

            "Les marqueurs de nuance et l'atténuation avancée"

        ]),

        quiz(
            "Choisis la phrase avec l'inversion correcte après 'peut-être'.",
            ["Peut-être je devrais partir.", "Peut-être devrais-je partir.", "Peut-être je dois partir.", "Peut-être partir je devrais."],
            1,
            "'Peut-être' en début de phrase, à l'écrit soutenu, déclenche l'inversion."
        ),

        quiz(
            "Choisis la version nominalisée la plus naturelle de \"On devrait évaluer les étudiants différemment.\"",
            ["On évalue les étudiants différemment.", "Une évaluation différente des étudiants est sans doute nécessaire.", "Évaluer les étudiants différemment est mauvais.", "Les étudiants sont évalués différemment."],
            1,
            "Nominaliser 'évaluer' en 'évaluation' produit une phrase plus formelle et académique."
        ),

        quiz(
            "Choisis la phrase qui rapporte une information non confirmée.",
            ["Le projet a été annulé.", "Le projet aurait été annulé.", "Le projet est annulé.", "Le projet sera annulé."],
            1,
            "Le conditionnel passé ('aurait été annulé') signale que l'information n'est pas confirmée."
        ),

        quiz(
            "Choisis la phrase correcte avec 'quand bien même'.",
            ["Quand bien même le gouvernement change, rien ne bougera.", "Quand bien même le gouvernement changerait, rien ne bougerait.", "Quand bien même le gouvernement a changé, rien ne bougerait.", "Quand bien même le gouvernement changera, rien ne bougerait."],
            1,
            "'Quand bien même' est suivi du conditionnel dans les deux parties de la phrase."
        ),

        quiz(
            "Choisis la phrase avec le futur antérieur de supposition.",
            ["Elle a oublié notre rendez-vous.", "Elle aura oublié notre rendez-vous.", "Elle oubliera notre rendez-vous.", "Elle oublie notre rendez-vous."],
            1,
            "'Elle aura oublié' exprime une supposition sur un événement récent."
        ),

        quiz(
            "Choisis la proposition participiale correcte.",
            ["Confronté à la pénurie, les politiques changent.", "Confrontés à la pénurie, les politiques changent.", "Confrontant la pénurie, les politiques changent.", "Confronté la pénurie, les politiques changent."],
            1,
            "'Confrontés' doit s'accorder avec le sujet implicite pluriel 'les politiques'."
        ),

        quiz(
            "Discours direct : « Je suis prêt. » Choisis la version correcte au discours indirect (verbe au passé).",
            ["Il a dit qu'il est prêt.", "Il a dit qu'il était prêt.", "Il a dit qu'il a été prêt.", "Il dit qu'il était prêt."],
            1,
            "Le présent devient l'imparfait au discours indirect quand le verbe introducteur est au passé."
        ),

        quiz(
            "Choisis la forme correcte de 'à + lequel'.",
            ["à lequel", "auquel", "au lequel", "alequel"],
            1,
            "'À' se contracte avec 'lequel' pour former 'auquel'."
        ),

        quiz(
            "Choisis la structure correcte pour un reproche atténué.",
            ["Tu dois me prévenir.", "Tu aurais pu au moins me prévenir.", "Préviens-moi !", "Tu ne préviens jamais."],
            1,
            "'Tu aurais pu au moins me prévenir' est un reproche atténué, plus doux qu'un ordre direct."
        ),

        quiz(
            "Choisis la version nominale la plus naturelle de \"Les prix ont beaucoup augmenté.\"",
            ["Les prix ont augmenté.", "Il y a eu une hausse marquée des prix.", "Les prix augmentent beaucoup en ce moment.", "Beaucoup de choses sont arrivées aux prix."],
            1,
            "'Il y a eu une hausse marquée des prix' est la structure nominale complexe du français formel/économique."
        ),

        quiz(
            "Choisis l'expression qui signale un accord partiel avant une objection.",
            ["Je suis complètement d'accord.", "Dans une certaine mesure, je suis d'accord, mais...", "Je ne suis pas du tout d'accord.", "C'est évidemment faux."],
            1,
            "'Dans une certaine mesure, je suis d'accord, mais...' signale un accord partiel avant une objection."
        ),

        tip(
            "Continue à Pratiquer avec de Vraies Conversations",
            "La meilleure façon de consolider la grammaire du C1 est de l'utiliser dans des conversations réelles et prolongées. Essaie de discuter d'un sujet qui te tient vraiment à cœur, et observe combien de ces structures tu arrives à combiner naturellement, avec nuance et précision."
        ),

        culture(
            "Atteindre le Niveau C1 : un Utilisateur Expérimenté",
            "Le CECRL décrit le niveau C1 comme celui d'un utilisateur expérimenté : vous pouvez comprendre une grande gamme de textes longs et exigeants, en saisir le sens implicite, vous exprimer spontanément et couramment, et utiliser la langue de façon flexible pour des besoins sociaux, académiques et professionnels. À partir d'ici, le français devient un véritable outil de communication — pas seulement pour vous faire comprendre, mais pour persuader, analyser et vous connecter avec une vraie nuance."
        )

    ],

    summary: {

        tip:
            "Bravo ! Révise les points de grammaire que tu as trouvés les plus difficiles, puis continue à pratiquer avec de vrais arguments et de vraies conversations en français.",

        review: [

            "Vous avez terminé 11 leçons du module C1.",

            "Vous pouvez argumenter, négocier et analyser avec une vraie précision.",

            "Vous avez combiné inversion, conditionnel passé, quand bien même, discours rapporté avancé et marqueurs de nuance.",

            "Vous avez atteint le niveau C1 — un utilisateur expérimenté du français !"

        ]

    }

};
