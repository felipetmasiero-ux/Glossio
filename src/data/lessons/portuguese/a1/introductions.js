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
  id: "portuguese-a1-introductions",

  language: "portuguese",
  level: "A1",
  category: "Basics",
  topic: "introductions",
  order: 2,

  title: "Introductions",
  subtitle: "Introduce yourself and ask about other people.",
  description:
    "Learn how to introduce yourself, ask someone's name and where they are from, and react politely when you meet someone new.",

  cover: "/covers/introductions.webp",

  estimatedTime: 8,
  difficulty: 1,
  xp: 20,

  tags: ["introductions", "conversation", "beginner"],
  skills: ["reading", "vocabulary", "speaking"],

  objectives: [
    "Give and ask for someone's name.",
    "Say where you come from.",
    "React politely when you meet someone.",
    "Introduce another person to someone else.",
    "Keep a short introduction conversation going."
  ],

  vocabulary: vocabulary([
    "meu nome é",
    "qual é o seu nome",
    "de onde você é",
    "eu sou de",
    "igualmente",
    "este é",
    "deixe-me me apresentar",
    "e você"
  ]),

  blocks: [

    heading("Meeting Someone New"),

    paragraph(
      "When you meet someone in Portuguese, it is common to say 'Meu nome é...' and then ask 'Qual é o seu nome?' to learn the other person's name."
    ),

    examples([
      {
        text: "Olá! Qual é o seu nome?",
        translation: "Hello! What's your name?"
      },

      {
        text: "Meu nome é Léa. E você?",
        translation: "My name is Léa. And you?"
      },

      {
        text: "Eu sou de Portugal. De onde você é?",
        translation: "I'm from Portugal. Where are you from?"
      },

      {
        text: "Muito prazer! Igualmente.",
        translation: "Nice to meet you! Likewise."
      }
    ]),

    dialogue([
      { speaker: "Léa", text: "Oi! Qual é o seu nome?" },
      { speaker: "Marco", text: "Meu nome é Marco. E você?" },
      { speaker: "Léa", text: "Eu sou a Léa. De onde você é?" },
      { speaker: "Marco", text: "Eu sou do Brasil. E você, de onde é?" },
      { speaker: "Léa", text: "Eu sou de Portugal. Muito prazer!" }
    ]),

    grammar(
      "Meu Nome É vs Eu Sou",
      "Use 'Meu nome é...' to give your name, literally 'my name is...'. Use 'Eu sou...' for other information, like your nationality or job: 'Eu sou a Léa' also works, but 'Meu nome é Léa' is the most natural way to introduce your name."
    ),

    tip(
      "Learning Tip",
      "Add 'E você?' after answering a question to keep the conversation going and ask the same thing back naturally."
    ),

    culture(
      "Culture",
      "In Brazil, people often shake hands or exchange a light kiss on the cheek when meeting, depending on the region and how close they are. Among younger people, a simple 'oi' with a wave is also common."
    ),

    heading("Introducing Other People"),

    paragraph(
      "Once you know how to introduce yourself, the next step is introducing someone else. Use 'Este é...' or 'Esta é...' followed by the person's name to present them to others."
    ),

    examples([
      {
        text: "Este é o meu amigo Thomas.",
        translation: "This is my friend Thomas."
      },

      {
        text: "Deixe-me me apresentar: meu nome é Camila.",
        translation: "Let me introduce myself: my name is Camila."
      },

      {
        text: "Esta é a minha irmã. Ela é da Espanha.",
        translation: "This is my sister. She's from Spain."
      }
    ]),

    dialogue([
      { speaker: "Camila", text: "Esta é a minha amiga Sofia." },
      { speaker: "Thomas", text: "Muito prazer, Sofia!" },
      { speaker: "Sofia", text: "Igualmente! De onde você é, Thomas?" },
      { speaker: "Thomas", text: "Eu sou do Japão." }
    ]),

    tip(
      "Este vs Esta",
      "'Este' is used to introduce a man ('Este é o Thomas'), and 'Esta' is used for a woman ('Esta é a Sofia'). The ending changes to match the gender of the person."
    ),

    culture(
      "Did you know?",
      "In Portuguese, people often introduce themselves by first name only in casual settings, but use both first and last name in professional or formal introductions."
    ),

    quote(
      "You never get a second chance to make a good first impression."
    ),

    quiz(
      "How do you ask someone's name?",
      ["Meu nome é...", "Qual é o seu nome?", "De onde você é?", "Muito prazer"],
      1,
      "'Qual é o seu nome?' is how you ask someone's name."
    ),

    quiz(
      "Which phrase means 'I'm from...'?",
      ["Este é...", "E você?", "Eu sou de...", "Igualmente"],
      2,
      "'Eu sou de...' is used to say where you are from."
    ),

    quiz(
      "What is the natural reply to 'Muito prazer'?",
      ["Olá", "Igualmente", "Tchau", "Qual é o seu nome?"],
      1,
      "'Igualmente' (likewise) is the natural reply to 'Muito prazer'."
    ),

    quiz(
      "Which word do you use to present a woman?",
      ["Este é...", "Esta é...", "Igualmente", "Deixe-me me apresentar"],
      1,
      "'Esta é...' is used to present or point out a woman."
    )

  ],

  summary: {

    tip: "Practice introducing yourself and a friend out loud, using 'Meu nome é...', 'Este é/Esta é...' and 'E você?'",

    review: [
      "Qual é o seu nome? — Meu nome é...",
      "Eu sou de... / De onde você é?",
      "Muito prazer — Igualmente.",
      "Este é.../Esta é... to introduce someone else.",
      "E você? keeps the conversation going."
    ]

  }

};
