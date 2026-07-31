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
  id: "portuguese-a1-greetings",

  language: "portuguese",
  level: "A1",
  category: "Basics",
  topic: "greetings",
  order: 1,

  title: "Greetings",
  subtitle: "Learn how to greet people and start simple conversations.",
  description:
    "Learn how Portuguese speakers greet each other, formally and informally, and how to say goodbye politely.",

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
    "Understand that 'boa noite' covers both evening and night.",
    "Wish someone a good day."
  ],

  vocabulary: vocabulary([
    "oi",
    "olá",
    "tchau",
    "adeus",
    "até mais",
    "até breve",
    "bem-vindo",
    "valeu",
    "prazer",
    "tenha um bom dia"
  ]),

  blocks: [

    heading("Meeting People"),

    paragraph(
      "In Portuguese, the most common greeting is 'Olá', which works both formally and informally at any time of day. 'Oi' is more casual and is used with friends and classmates."
    ),

    examples([
      {
        text: "Olá! Bem-vindo à nossa escola.",
        translation: "Hello! Welcome to our school."
      },

      {
        text: "Oi, Camila! Como vai?",
        translation: "Hi, Camila! How are you?"
      },

      {
        text: "Bom dia, pessoal!",
        translation: "Good morning, everyone!"
      },

      {
        text: "Muito obrigado pela sua ajuda.",
        translation: "Thank you very much for your help."
      },

      {
        text: "Com licença, onde fica a saída?",
        translation: "Excuse me, where is the exit?"
      }
    ]),

    dialogue([
      { speaker: "Emma", text: "Olá! Meu nome é Emma." },
      { speaker: "Lucas", text: "Oi! Eu sou o Lucas." },
      { speaker: "Emma", text: "Prazer!" },
      { speaker: "Lucas", text: "Prazer também!" }
    ]),

    grammar(
      "Olá vs Oi",
      "'Olá' can be used in almost every situation, formal or informal. 'Oi' is more casual and is usually used with friends, classmates and family members, rarely with strangers in professional settings."
    ),

    tip(
      "Learning Tip",
      "If you are not sure which greeting to use, choose 'Olá'. It is always a safe option, at any time of day."
    ),

    culture(
      "Culture",
      "In Brazil, it is common to greet people with a smile, and close friends often greet each other with a kiss on the cheek or a hug, even in casual daily encounters."
    ),

    heading("Saying Goodbye"),

    paragraph(
      "There are many ways to say goodbye in Portuguese. Some are neutral and others are more casual. Learning the difference helps your conversations sound more natural."
    ),

    examples([
      {
        text: "Adeus! Tenha um bom dia.",
        translation: "Goodbye! Have a nice day."
      },

      {
        text: "Até mais! Até amanhã.",
        translation: "See you later! See you tomorrow."
      },

      {
        text: "Boa noite! Durma bem.",
        translation: "Good night! Sleep well."
      }
    ]),

    dialogue([
      { speaker: "Emma", text: "Eu preciso ir agora." },
      { speaker: "Lucas", text: "Tchau! Até amanhã." },
      { speaker: "Emma", text: "Até breve! Boa noite." }
    ]),

    grammar(
      "One Word for Two Meanings",
      "Unlike English, Portuguese uses 'boa noite' both when arriving somewhere at night and when leaving or going to sleep — there isn't a separate word like 'good evening' vs 'good night'."
    ),

    tip(
      "Common Mistake",
      "Don't say 'boa tarde' after dark. Once the sun sets, switch to 'boa noite', even if it's still early evening."
    ),

    culture(
      "Did you know?",
      "Brazilians often greet cashiers, neighbors and even strangers in elevators with a friendly 'oi' or 'olá'. A smile while greeting someone is also very common."
    ),

    heading("Putting It All Together"),

    dialogue([
      { speaker: "Emma", text: "Oi! Bom dia." },
      { speaker: "Lucas", text: "Oi! Como vai?" },
      { speaker: "Emma", text: "Vou bem, obrigada!" },
      { speaker: "Lucas", text: "Até mais!" },
      { speaker: "Emma", text: "Tchau!" }
    ]),

    tip(
      "Practice Speaking",
      "Read the dialogue above aloud and practice saying each greeting naturally, paying attention to the level of formality."
    ),

    quote(
      "The most important thing in communication is hearing what isn't said."
    ),

    quiz(
      "Which greeting works at any time of day?",
      ["Boa noite", "Tchau", "Olá", "Até breve"],
      2,
      "'Olá' works in almost every situation, day or night."
    ),

    quiz(
      "Which greeting is more informal?",
      ["Boa tarde", "Oi", "Olá", "Adeus"],
      1,
      "'Oi' is the most informal greeting on the list."
    ),

    quiz(
      "You are leaving your friend's house at 11 PM. What should you say?",
      ["Bom dia", "Boa tarde", "Boa noite", "Bem-vindo"],
      2,
      "Use 'boa noite' when leaving late at night, just like when arriving at night."
    ),

    quiz(
      "Someone helps you carry your books. What do you say?",
      ["Tchau", "Por favor", "Olá", "Obrigado"],
      3,
      "'Obrigado' is the natural way to show gratitude."
    ),

    quiz(
      "Which word means 'welcome'?",
      ["Bem-vindo", "Prazer", "Valeu", "Adeus"],
      0,
      "'Bem-vindo' means 'welcome' in Portuguese."
    )

  ],

  summary: {

    tip: "'Olá' is always a safe choice, and remember that 'boa noite' covers both 'good evening' and 'good night' in Portuguese.",

    review: [
      "Olá is the safest greeting in Portuguese.",
      "Oi is informal and commonly used with friends.",
      "Boa noite covers both arriving at night and going to sleep.",
      "Tchau, adeus and até mais are common ways to say farewell.",
      "Obrigado and por favor are essential polite expressions."
    ]

  }

};
