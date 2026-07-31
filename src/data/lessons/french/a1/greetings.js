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

export const greetingsLesson = {
  id: "french-a1-greetings",

  language: "french",
  level: "A1",
  category: "Basics",
  topic: "greetings",
  order: 1,

  title: "Greetings",
  subtitle: "Learn how to greet people and start simple conversations.",
  description:
    "Learn how French speakers greet each other, formally and informally, and how to say goodbye politely.",

  cover: "/covers/greetings.webp",

  estimatedTime: 8,
  difficulty: 1,
  xp: 20,

  tags: ["greetings", "conversation", "beginner"],
  skills: ["reading", "vocabulary", "speaking"],

  objectives: [
    "Greet people in formal and informal situations.",
    "Say goodbye in different ways.",
    "Use common courtesy expressions.",
    "Understand the difference between Bonjour and Salut.",
    "Wish someone a good day or evening."
  ],

  vocabulary: vocabulary([
    "salut",
    "bonne nuit",
    "au revoir",
    "à plus tard",
    "à demain",
    "à tout à l'heure",
    "bienvenue",
    "merci",
    "de rien",
    "bonne journée",
    "bonne soirée",
    "s'il te plaît"
  ]),

  blocks: [

    heading("Meeting People"),

    paragraph(
      "When you meet someone in French, the most common greeting is Bonjour, which works both formally and informally during the day. Salut is more casual and is used with friends and classmates. In the evening, people usually say Bonsoir instead."
    ),

    examples([
      {
        text: "Bonjour ! Bienvenue dans notre école.",
        translation: "Olá! Bem-vindo à nossa escola."
      },

      {
        text: "Salut, Camille ! Comment ça va ?",
        translation: "Oi, Camille! Como você está?"
      },

      {
        text: "Bonsoir, tout le monde.",
        translation: "Boa noite, pessoal (ao chegar)."
      },

      {
        text: "Merci beaucoup pour ton aide.",
        translation: "Muito obrigado pela sua ajuda."
      },

      {
        text: "Excusez-moi, où est la sortie ?",
        translation: "Com licença, onde fica a saída?"
      }
    ]),

    dialogue([
      { speaker: "Emma", text: "Bonjour ! Je m'appelle Emma." },
      { speaker: "Lucas", text: "Salut ! Moi, c'est Lucas." },
      { speaker: "Emma", text: "Enchantée !" },
      { speaker: "Lucas", text: "Enchanté aussi !" }
    ]),

    grammar(
      "Bonjour vs Salut",
      "Bonjour can be used in almost every situation, formal or informal. Salut is more casual and is usually used with friends, classmates and family members, never with strangers or in professional settings."
    ),

    tip(
      "Learning Tip",
      "If you are not sure which greeting to use, choose Bonjour. It is always a safe option, day or night before the evening."
    ),

    culture(
      "Culture",
      "In France, it is considered polite to say Bonjour before asking anything, even a simple question to a shopkeeper or a stranger. Skipping the greeting can come across as rude."
    ),

    heading("Saying Goodbye"),

    paragraph(
      "There are many ways to say goodbye in French. Some are neutral and others are more casual. Learning the difference helps your conversations sound more natural."
    ),

    examples([
      {
        text: "Au revoir ! Bonne journée.",
        translation: "Adeus! Tenha um bom dia."
      },

      {
        text: "À plus tard ! À demain peut-être.",
        translation: "Até mais tarde! Até amanhã, talvez."
      },

      {
        text: "Bonne nuit ! Fais de beaux rêves.",
        translation: "Boa noite! Tenha bons sonhos."
      }
    ]),

    dialogue([
      { speaker: "Emma", text: "Je dois y aller maintenant." },
      { speaker: "Lucas", text: "Au revoir ! À demain." },
      { speaker: "Emma", text: "À tout à l'heure ! Bonne soirée." }
    ]),

    grammar(
      "Bonsoir × Bonne nuit",
      "Bonsoir is used when you arrive somewhere in the evening. Bonne nuit is used when you leave for the night or before going to sleep — never as a greeting when you arrive."
    ),

    tip(
      "Common Mistake",
      "Don't say 'Bonne nuit' when you arrive at a restaurant or a party in the evening. Say 'Bonsoir' instead."
    ),

    culture(
      "Did you know?",
      "French speakers often say 'Bonjour' or 'Bonsoir' to cashiers, neighbors and even strangers in elevators. A smile while greeting someone is also very common."
    ),

    heading("Putting It All Together"),

    dialogue([
      { speaker: "Emma", text: "Bonjour ! Comment ça va ?" },
      { speaker: "Lucas", text: "Ça va bien, merci ! Et toi ?" },
      { speaker: "Emma", text: "Très bien, merci beaucoup !" },
      { speaker: "Lucas", text: "À plus tard !" },
      { speaker: "Emma", text: "Au revoir !" }
    ]),

    tip(
      "Practice Speaking",
      "Read the dialogue above aloud and practice saying each greeting naturally, paying attention to the time of day and the level of formality."
    ),

    quote(
      "Le plus important dans la communication est d'entendre ce qui n'est pas dit."
    ),

    quiz(
      "Which greeting is safe to use at any time of day?",
      ["Bonsoir", "Bonne nuit", "Bonjour", "Bonne soirée"],
      2,
      "'Bonjour' works in almost every situation during the day."
    ),

    quiz(
      "Which greeting is more informal?",
      ["Bonsoir", "Salut", "Bonjour", "Au revoir"],
      1,
      "'Salut' is the most informal greeting on the list."
    ),

    quiz(
      "You are leaving your friend's house at 11 PM. What should you say?",
      ["Bonjour", "Bonsoir", "Bonne nuit", "Bienvenue"],
      2,
      "Use 'Bonne nuit' when leaving late at night or before sleeping."
    ),

    quiz(
      "Someone helps you carry your books. What do you say?",
      ["Au revoir", "S'il te plaît", "Bonjour", "Merci"],
      3,
      "'Merci' is the natural way to show gratitude."
    ),

    quiz(
      "Which sentence is correct when arriving somewhere at 8 PM?",
      ["Bonsoir !", "Bonjour !", "Bonne nuit !", "Au revoir !"],
      0,
      "When arriving somewhere in the evening, use 'Bonsoir'."
    )

  ],

  summary: {

    tip: "Bonjour is always a safe choice during the day, but matching your greeting to the time of day and the situation makes you sound more natural.",

    review: [
      "Bonjour is the safest greeting in French.",
      "Salut is informal and commonly used with friends.",
      "Use Bonsoir when arriving somewhere in the evening.",
      "Use Bonne nuit when leaving or before sleeping.",
      "Au revoir, à plus tard and à demain are common ways to say farewell.",
      "Merci and s'il te plaît are essential polite expressions."
    ]

  }

};
