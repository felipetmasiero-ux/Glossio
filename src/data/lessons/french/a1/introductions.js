import {
  heading,
  paragraph,
  examples,
  dialogue,
  grammar,
  tip,
  culture,
  quote,
  quiz,
  vocabulary
} from "../../../../utils/lessons/builders";

export const introductionsLesson = {
  id: "french-a1-introductions",

  language: "french",
  level: "A1",
  category: "Basics",
  topic: "introductions",
  order: 2,

  title: "Apresentações",
  subtitle: "Apresente-se e pergunte sobre outras pessoas em francês.",
  description:
    "Aprenda a se apresentar, perguntar o nome e de onde alguém é, e reagir educadamente ao conhecer alguém novo.",

  cover: "/covers/introductions.webp",

  estimatedTime: 8,
  difficulty: 1,
  xp: 20,

  tags: ["introductions", "conversation", "beginner"],
  skills: ["reading", "vocabulary", "speaking"],

  objectives: [
    "Ask someone's name informally.",
    "Say where you come from.",
    "React politely when you meet someone.",
    "Introduce another person to someone else.",
    "Keep a short introduction conversation going."
  ],

  vocabulary: vocabulary([
    "comment tu t'appelles ?",
    "je viens de...",
    "tu viens d'où ?",
    "enchanté",
    "moi de même",
    "voici...",
    "je me présente",
    "et toi ?"
  ]),

  blocks: [

    heading("Meeting Someone New"),

    paragraph(
      "When you meet someone in French, it is common to say 'Je m'appelle...' and then ask 'Comment tu t'appelles ?' to learn the other person's name. This lesson focuses on the informal 'tu' form, used with friends and people your own age."
    ),

    examples([
      {
        text: "Bonjour ! Comment tu t'appelles ?",
        translation: "Olá! Qual é o seu nome?"
      },

      {
        text: "Je m'appelle Léa. Et toi ?",
        translation: "Eu me chamo Léa. E você?"
      },

      {
        text: "Je viens de France. Tu viens d'où ?",
        translation: "Eu venho da França. De onde você é?"
      },

      {
        text: "Enchanté ! Moi de même.",
        translation: "Prazer! Igualmente."
      }
    ]),

    dialogue([
      { speaker: "Léa", text: "Salut ! Comment tu t'appelles ?" },
      { speaker: "Marco", text: "Je m'appelle Marco. Et toi ?" },
      { speaker: "Léa", text: "Moi, c'est Léa. Tu viens d'où ?" },
      { speaker: "Marco", text: "Je viens du Brésil. Et toi, tu viens d'où ?" },
      { speaker: "Léa", text: "Je viens de France. Enchantée !" }
    ]),

    grammar(
      "Je m'appelle vs Je suis",
      "Use 'Je m'appelle...' to give your name, literally 'I call myself...'. Use 'Je suis...' for other information, like your nationality or job: 'Je suis Léa.' also works, but 'Je m'appelle Léa' is the most natural way to introduce your name."
    ),

    tip(
      "Learning Tip",
      "Add 'Et toi ?' after answering a question to keep the conversation going and ask the same thing back naturally."
    ),

    culture(
      "Culture",
      "In France, people often shake hands or exchange 'la bise' (a light kiss on the cheek) when meeting, depending on the region and how close they are. Among younger people and in casual settings, a simple 'Salut' with a wave is also common."
    ),

    heading("Introducing Other People"),

    paragraph(
      "Once you know how to introduce yourself, the next step is introducing someone else. Use 'Voici...' followed by the person's name to present them to others."
    ),

    examples([
      {
        text: "Voici mon ami Thomas.",
        translation: "Este é meu amigo Thomas."
      },

      {
        text: "Je me présente : je m'appelle Camille.",
        translation: "Deixe-me me apresentar: eu me chamo Camille."
      },

      {
        text: "Voici ma sœur. Elle vient d'Espagne.",
        translation: "Esta é minha irmã. Ela vem da Espanha."
      }
    ]),

    dialogue([
      { speaker: "Camille", text: "Voici mon amie Sofia." },
      { speaker: "Thomas", text: "Enchanté, Sofia !" },
      { speaker: "Sofia", text: "Enchantée ! Tu viens d'où, Thomas ?" },
      { speaker: "Thomas", text: "Je viens du Japon." }
    ]),

    tip(
      "Formal vs Informal",
      "'Comment tu t'appelles ?' is informal. In formal situations, French speakers say 'Comment vous appelez-vous ?' instead, using the polite 'vous' form."
    ),

    culture(
      "Did you know?",
      "In French, people often introduce themselves by first name only in casual settings, but use both first and last name in professional or formal introductions."
    ),

    quote(
      "On ne fait jamais deux fois une bonne première impression."
    ),

    quiz(
      "How do you say 'What's your name?' informally?",
      ["Je m'appelle...", "Comment tu t'appelles ?", "Tu viens d'où ?", "Enchanté"],
      1,
      "'Comment tu t'appelles ?' is the informal way to ask someone's name."
    ),

    quiz(
      "Which phrase means 'I come from...'?",
      ["Voici...", "Et toi ?", "Je viens de...", "Moi de même"],
      2,
      "'Je viens de...' is used to say where you are from."
    ),

    quiz(
      "What is the natural reply to 'Enchanté' ?",
      ["Bonjour", "Moi de même", "Au revoir", "Comment tu t'appelles ?"],
      1,
      "'Moi de même' (likewise) is the natural reply to 'Enchanté'."
    ),

    quiz(
      "Which word do you use to present someone?",
      ["Voici...", "Et toi ?", "Enchanté", "Je me présente"],
      0,
      "'Voici...' is used to present or point out a person or thing."
    )

  ],

  summary: {

    tip: "Practice introducing yourself and a friend out loud, using 'Je m'appelle...', 'Voici...' and 'Et toi ?'",

    review: [
      "Comment tu t'appelles ? — Je m'appelle...",
      "Je viens de... / Tu viens d'où ?",
      "Enchanté(e) — Moi de même.",
      "Voici... to introduce someone else.",
      "Et toi ? keeps the conversation going."
    ]

  }

};
