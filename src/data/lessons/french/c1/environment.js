import { environmentC1Blocks } from "../../../grammar/shared/french/environmentC1";
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

export const environmentC1Lesson = {

    id: "french-c1-environment",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "environment",

    order: 6,

    title: "Environnement, Climat et Défis Mondiaux",

    subtitle:
        "Argumentez sur les défis environnementaux mondiaux en condensant vos idées avec des propositions participiales.",

    description:
        "Discutez de durabilité et de défis mondiaux, en apprenant à remplacer des propositions causales complètes par le gérondif ou des propositions participiales.",

    cover: "/covers/environment-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "environment",
        "grammar",
        "durabilité"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss complex environmental problems and global challenges",

        "Evaluate solutions and compare perspectives with nuance",

        "Use participial clauses and the gérondif to condense causal clauses",

        "Build formal arguments about sustainability and resources"

    ],

    vocabulary: vocabulary([
        "intenable",
        "en voie de raréfaction",
        "à un point de rupture",
        "endiguer les émissions",
        "une mesure provisoire",
        "des répercussions considérables",
        "compenser",
        "l'empiétement",
        "une goutte d'eau dans l'océan",
        "supprimer progressivement",
        "à la merci de",
        "la résilience (environnementale)",
        "se déployer",
        "un signal d'alarme",
        "irrémédiablement",
        "une solution à double tranchant",
        "qui s'aggrave",
        "un cautère sur une jambe de bois",
        "dépasser (en rythme)",
        "les signes ne trompent pas"
    ]),

    blocks: [

        heading("Condenser un Argument avec des Propositions Participiales"),

        paragraph(
            "Pour argumenter sur des enjeux environnementaux sans répéter constamment 'parce que' ou 'si', le français utilise des propositions participiales et le gérondif, qui condensent la cause dans une phrase plus fluide."
        ),

        examples([
            {
                text: "Confrontés à des ressources en voie de raréfaction, plusieurs pays revoient leur politique énergétique.",
                translation: "Diante de recursos cada vez mais escassos, vários países estão revendo sua política energética."
            },
            {
                text: "En endiguant les émissions dès maintenant, nous éviterons d'atteindre un point de rupture irrémédiable.",
                translation: "Ao conter as emissões agora, evitaremos atingir um ponto de ruptura irreversível."
            },
            {
                text: "Laissé sans solution durable, ce problème ne fera que s'aggraver au fil des années.",
                translation: "Se deixado sem solução duradoura, esse problema só vai se agravar com os anos."
            },
            {
                text: "Ayant étudié les données, le comité a conclu que cette mesure provisoire n'était qu'un cautère sur une jambe de bois.",
                translation: "Tendo estudado os dados, o comitê concluiu que aquela medida provisória era só um paliativo insuficiente."
            },
            {
                text: "Dépassant largement les prévisions, la crise s'est déployée plus vite que prévu.",
                translation: "Superando em muito as previsões, a crise se desenrolou mais rápido do que o esperado."
            },
            {
                text: "À la merci des décisions politiques, la résilience de cet écosystème reste fragile.",
                translation: "À mercê das decisões políticas, a resiliência desse ecossistema continua frágil."
            }
        ]),

        dialogue([
            { speaker: "Manon", text: "Tu as vu le dernier rapport sur les ressources en eau ?" },
            { speaker: "Hugo", text: "Oui. Confrontés à une raréfaction pareille, difficile d'appeler la politique actuelle autre chose qu'une mesure provisoire." },
            { speaker: "Manon", text: "Vraiment. Et beaucoup de propositions ressemblent à un cautère sur une jambe de bois, à la merci du prochain budget." },
            { speaker: "Hugo", text: "En ne changeant rien maintenant, on aggrave le problème pour rien." },
            { speaker: "Manon", text: "C'est un vrai signal d'alarme. Laissée sans solution, la situation atteindra un point de rupture irrémédiable." },
            { speaker: "Hugo", text: "Certains programmes de résilience aident, mais restent une goutte d'eau dans l'océan face à l'ampleur du problème." },
            { speaker: "Manon", text: "Ayant lu le rapport, tu penses que les signes ne trompent pas sur la politique actuelle ?" },
            { speaker: "Hugo", text: "À peu près. En reconnaissant cela, quelques régions commencent enfin à supprimer progressivement les pires pratiques." }
        ]),

        grammar(environmentC1Blocks[0].title, environmentC1Blocks[0].text),

        list([

            "gérondif (en + participe présent) — cause ou simultanéité",

            "proposition participiale (participe présent/passé) — cause condensée",

            "intenable, en voie de raréfaction, à un point de rupture, irrémédiablement",

            "une mesure provisoire, une goutte d'eau dans l'océan, un signal d'alarme"

        ]),

        tip(
            "Vérifie le Sujet",
            "Avant d'utiliser une proposition participiale, vérifie que son sujet implicite correspond bien au sujet de la phrase principale. 'Ayant terminé le rapport, la réunion a commencé' est incorrect — la réunion n'a pas terminé le rapport."
        ),

        culture(
            "Le Registre des Rapports Internationaux",
            "Les rapports environnementaux internationaux (GIEC, ONU) rédigés en français utilisent énormément de propositions participiales et de structures nominales complexes, précisément parce qu'elles permettent de condenser une grande quantité d'information technique dans un texte lisible."
        ),

        quiz(
            "Choisis la proposition participiale correcte.",
            [
                "Confronté à la pénurie, les politiques changent.",
                "Confrontés à la pénurie, les politiques changent.",
                "Confrontant la pénurie, les politiques changent.",
                "Confronté la pénurie, les politiques changent."
            ],
            1,
            "'Confrontés' doit s'accorder avec 'les politiques' (pluriel) — le participe passé s'accorde avec le sujet implicite."
        ),

        quiz(
            "Que signifie 'un cautère sur une jambe de bois' ?",
            ["une solution parfaite", "une solution totalement inutile ou insuffisante", "un remède médical réel", "un problème résolu"],
            1,
            "'Un cautère sur une jambe de bois' est une expression imagée pour une solution totalement inutile ou clairement insuffisante face à un problème."
        ),

        quiz(
            "Choisis la phrase avec un sujet correctement aligné dans la proposition participiale.",
            [
                "Ayant lu le rapport, les conclusions m'ont semblé claires.",
                "Ayant lu le rapport, j'ai trouvé les conclusions claires.",
                "Ayant lu le rapport, les conclusions se sont lues elles-mêmes.",
                "Ayant lu le rapport, c'était clair."
            ],
            1,
            "'J'ai lu le rapport' — je suis bien le sujet qui a lu et qui tire la conclusion, donc les sujets correspondent."
        )

    ],

    summary: {

        tip:
            "Pratique en réécrivant trois propositions causales complètes sur l'environnement sous forme de propositions participiales.",

        review: [

            "gérondif et propositions participiales pour condenser la cause",

            "intenable, en voie de raréfaction, à un point de rupture, irrémédiablement",

            "une mesure provisoire, une goutte d'eau dans l'océan, un signal d'alarme"

        ]

    }

};
