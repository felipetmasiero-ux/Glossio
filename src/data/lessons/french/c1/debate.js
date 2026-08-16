import { debateC1Blocks } from "../../../grammar/shared/french/debateC1";
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

export const debateLesson = {

    id: "french-c1-debate",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "debate",

    order: 11,

    title: "Argumentation, Débat et Communication Nuancée",

    subtitle:
        "Construisez des arguments sophistiqués et répondez aux contre-arguments avec atténuation et nuance.",

    description:
        "La leçon la plus avancée du module : apprenez à qualifier des affirmations, reconnaître des points valables et exprimer un désaccord diplomatique avec précision.",

    cover: "/covers/debate-c1-fr.webp",

    estimatedTime: 16,

    difficulty: 5,

    xp: 55,

    tags: [
        "debate",
        "grammar",
        "argumentation"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Build complex arguments and respond to counterarguments",

        "Qualify statements and express partial agreement",

        "Disagree diplomatically and reformulate a position",

        "Use nuance and attenuation markers naturally in extended discussion"

    ],

    vocabulary: vocabulary([
        "un argument convaincant",
        "une généralisation hâtive",
        "tout bien considéré",
        "une remarque pertinente",
        "jouer l'avocat du diable",
        "décortiquer un argument",
        "un postulat implicite",
        "concéder un point",
        "un point sans réel enjeu",
        "une analyse nuancée",
        "dans une impasse totale",
        "atteindre un point critique",
        "une fausse piste",
        "tenir sa position",
        "un contre-argument valable",
        "concilier deux points de vue",
        "un raccourci logique",
        "une simplification excessive",
        "convenir de ne pas être d'accord",
        "un raisonnement bien construit"
    ]),

    blocks: [

        heading("Argumenter avec Sophistication"),

        paragraph(
            "Une argumentation sophistiquée ne consiste pas à avoir raison à tout prix — elle consiste à signaler précisément son degré de certitude et à reconnaître les points valables de l'autre côté avant d'exposer son propre raisonnement."
        ),

        examples([
            {
                text: "On pourrait soutenir que cette politique n'a simplement pas eu assez de temps pour fonctionner ; cela dit, les premiers signes ne sont pas encourageants.",
                translation: "Poder-se-ia argumentar que essa política simplesmente não teve tempo suficiente para funcionar; ainda assim, os sinais iniciais não são animadores."
            },
            {
                text: "C'est une remarque pertinente, et je concède ce point, mais cela ne décortique pas vraiment le postulat implicite ici.",
                translation: "Essa é uma observação pertinente, e eu admito esse ponto, mas isso não desmonta realmente a suposição implícita aqui."
            },
            {
                text: "Dans une certaine mesure, je suis d'accord, mais cet argument reste sans doute une simplification excessive.",
                translation: "Até certo ponto, eu concordo, mas esse argumento continua sendo, sem dúvida, uma simplificação exagerada."
            },
            {
                text: "Il convient de souligner qu'il s'agit d'un contre-argument valable, dans la mesure où les données couvrent une période limitée.",
                translation: "Vale destacar que se trata de um contraponto válido, na medida em que os dados cobrem um período limitado."
            },
            {
                text: "Certes, c'est un raisonnement bien construit, mais je pense que c'est une fausse piste dans ce débat précis.",
                translation: "Certamente é um raciocínio bem construído, mas acho que é uma pista falsa nesse debate específico."
            },
            {
                text: "Nous sommes dans une impasse totale sur ce sujet, alors essayons au moins de concilier nos points de vue là où ils se recoupent.",
                translation: "Estamos em um conflito total sobre isso, então vamos pelo menos tentar conciliar nossas visões onde elas se sobrepõem."
            }
        ]),

        dialogue([
            { speaker: "Élise", text: "Je pense que le télétravail a clairement été positif pour la productivité." },
            { speaker: "Baptiste", text: "On pourrait le soutenir, mais n'est-ce pas une généralisation hâtive sans plus de données ?" },
            { speaker: "Élise", text: "Juste — mais il y a un raisonnement bien construit derrière, surtout dans les métiers du savoir." },
            { speaker: "Baptiste", text: "C'est une remarque pertinente. Je concède ce point. Mais dans la mesure où on ne regarde que des sondages auto-déclarés, je resterais prudent." },
              { speaker: "Élise", text: "Certes, c'est un contre-argument valable. J'ai peut-être fait un raccourci logique là-dessus." },
            { speaker: "Baptiste", text: "Dans une certaine mesure, je suis d'accord avec ton argument global — il est vraiment convaincant." },
            { speaker: "Élise", text: "Mais ?" },
            { speaker: "Baptiste", text: "Mais je pense que l'idée sur la créativité est une simplification excessive. Ça reste un point sans réel enjeu sans étude contrôlée." },
            { speaker: "Élise", text: "D'accord, c'est un contre-argument bien amené. Tout bien considéré, on devrait peut-être juste convenir de ne pas être d'accord sur ce point précis." },
            { speaker: "Baptiste", text: "Volontiers. Même si, sur le reste, je crois qu'on a réussi à concilier nos points de vue." }
        ]),

        grammar(debateC1Blocks[0].title, debateC1Blocks[0].text),

        list([

            "'on pourrait soutenir que' / 'il convient de souligner que' — affirmation nuancée",

            "'dans une certaine mesure, je suis d'accord, mais...' — accord partiel",

            "'cela dit' / 'toutefois' — reconnaître un point avant de continuer",

            "'encore faut-il que' + subjonctif — condition nécessaire négligée"

        ]),

        tip(
            "Concède Avant de Contredire",
            "Reconnaître un point valable ('c'est une remarque pertinente', 'certes...') avant d'exprimer un désaccord rend ton contre-argument plus efficace — ça montre que tu as vraiment écouté, pas juste attendu ton tour de parler."
        ),

        culture(
            "La Culture du Débat en France",
            "Le débat argumenté et la dissertation structurée font partie intégrante du système éducatif français dès le lycée, ce qui explique pourquoi ce vocabulaire de nuance et d'atténuation est si profondément ancré dans le français académique et professionnel — il est enseigné explicitement, pas seulement appris par hasard."
        ),

        quiz(
            "Choisis l'expression qui signale un accord partiel avant une objection.",
            ["Je suis complètement d'accord.", "Dans une certaine mesure, je suis d'accord, mais...", "Je ne suis pas du tout d'accord.", "C'est évidemment faux."],
            1,
            "'Dans une certaine mesure, je suis d'accord, mais...' signale un accord partiel avant d'introduire une objection."
        ),

        quiz(
            "Que fait 'encore faut-il que' dans un argument ?",
            ["il rejette complètement l'argument", "il introduit une condition nécessaire souvent négligée", "il renforce fortement la certitude", "il change complètement de sujet"],
            1,
            "'Encore faut-il que' introduit une condition nécessaire souvent négligée : 'ça marche, encore faut-il que ce soit bien appliqué.'"
        ),

        quiz(
            "Que signifie 'une fausse piste' dans un débat ?",
            ["le point le plus fort de l'argument", "une distraction qui éloigne du vrai sujet", "une statistique utilisée comme preuve", "une façon formelle de terminer un débat"],
            1,
            "'Une fausse piste' est une distraction trompeuse qui éloigne du véritable sujet en débat."
        )

    ],

    summary: {

        tip:
            "Pratique en débattant d'un sujet qui te tient à cœur, en utilisant au moins une nuance, un accord partiel et un désaccord diplomatique.",

        review: [

            "nuance : on pourrait soutenir que, il y a des preuves suggérant que",

            "accord partiel : dans une certaine mesure, je suis d'accord, mais...",

            "cela dit, toutefois, encore faut-il que",

            "un argument convaincant, une remarque pertinente, une simplification excessive, convenir de ne pas être d'accord"

        ]

    }

};
