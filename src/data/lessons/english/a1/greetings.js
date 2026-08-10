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
  id: "english-a1-greetings",

  language: "english",
  level: "A1",
  category: "Basics",
  topic: "greetings",
  order: 1,

  title: "Cumprimentos",
  subtitle: "Aprenda a cumprimentar pessoas e iniciar conversas simples em inglês.",
  description:
    "Aprenda como os falantes de inglês se cumprimentam, formal e informalmente, e como se despedir educadamente.",

  cover: "/covers/greetings.webp",

  estimatedTime: 8,
  difficulty: 1,
  xp: 20,

  tags: ["greetings", "conversation", "beginner"],
  skills: ["reading", "vocabulary", "speaking"],

  objectives: [
    "Greet people in formal and informal situations.",
    "Say good morning, good afternoon and good evening.",
    "Say goodbye politely.",
    "Use common courtesy expressions.",
    "Understand the difference between Hello and Hi."
  ],

  vocabulary: vocabulary([
    "hello",
    "hi",
    "good morning",
    "good afternoon",
    "good evening",
    "good night",
    "goodbye",
    "bye",
    "thanks",
    "please",
    "welcome",
    "see you"
  ]),

  blocks: [

    heading("Meeting People"),

    paragraph(
      "When you meet someone in English, the most common greetings are Hello and Hi. In more formal situations, people usually say Good morning, Good afternoon or Good evening depending on the time of the day."
    ),

    examples([
      {
        text: "Hello! Welcome to our school.",
        translation: "Olá! Bem-vindo à nossa escola."
      },

      {
        text: "Hi, Anna! How are you?",
        translation: "Oi, Anna! Como você está?"
      },

      {
        text: "Good morning, everyone.",
        translation: "Bom dia, pessoal."
      },

      {
        text: "Good afternoon, class.",
        translation: "Boa tarde, turma."
      },

      {
        text: "Good evening, Mr. Brown.",
        translation: "Boa noite, Sr. Brown."
      }
    ]),

    dialogue([
      { speaker: "Emma", text: "Hello! My name is Emma." },
      { speaker: "Lucas", text: "Hi! I'm Lucas." },
      { speaker: "Emma", text: "Nice to meet you!" },
      { speaker: "Lucas", text: "Nice to meet you too!" }
    ]),

    grammar(
      "Hello vs Hi",
      "Hello can be used in almost every situation. Hi is more informal and is usually used with friends, classmates and family members."
    ),

    tip(
      "Learning Tip",
      "If you are not sure which greeting to use, choose Hello. It is always a safe option."
    ),

    culture(
      "Culture",
      "In many English-speaking countries, it is common to greet strangers with a smile and a simple 'Hi' or 'Hello' in places like parks, elevators or stores."
    ),

    heading("Saying Goodbye"),

    paragraph(
      "There are many ways to say goodbye in English. Some are formal and others are more casual. Learning the difference helps your conversations sound more natural."
    ),

    examples([
      {
        text: "Goodbye! Have a nice day.",
        translation: "Adeus! Tenha um bom dia."
      },

      {
        text: "Bye! See you tomorrow.",
        translation: "Tchau! Até amanhã."
      },

      {
        text: "Good night! Sleep well.",
        translation: "Boa noite! Durma bem."
      }
    ]),

    dialogue([
      { speaker: "Emma", text: "I have to go now." },
      { speaker: "Lucas", text: "Bye! See you tomorrow." },
      { speaker: "Emma", text: "See you! Good night." }
    ]),

    grammar(
      "Good evening × Good night",
      "Good evening is used when you arrive somewhere in the evening. Good night is used when you leave or before going to sleep."
    ),

    tip(
      "Common Mistake",
      "Don't say 'Good night' when you arrive at a restaurant or a party. Say 'Good evening' instead."
    ),

    culture(
      "Did you know?",
      "People in English-speaking countries often greet cashiers, neighbors and even strangers with a friendly 'Hi' or 'Hello'. Smiling while greeting someone is also very common."
    ),

    heading("Putting It All Together"),

    dialogue([
      { speaker: "Emma", text: "Hello! Good morning." },
      { speaker: "Lucas", text: "Hi! How are you?" },
      { speaker: "Emma", text: "I'm great, thanks!" },
      { speaker: "Lucas", text: "See you later!" },
      { speaker: "Emma", text: "Bye!" }
    ]),

    tip(
      "Practice Speaking",
      "Read the dialogue above aloud and practice saying each greeting naturally, paying attention to the time of day."
    ),

    quote(
      "The most important thing in communication is hearing what isn't said."
    ),

    quiz(
      "What do you usually say at 8:00 AM?",
      ["Good morning", "Good night", "Bye", "Good evening"],
      0,
      "'Good morning' is used from early morning until around noon."
    ),

    quiz(
      "Which greeting is more informal?",
      ["Good afternoon", "Hi", "Hello", "Good evening"],
      1,
      "'Hi' is the most informal greeting on the list."
    ),

    quiz(
      "You are leaving your friend's house at 10 PM. What should you say?",
      ["Good morning", "Good evening", "Good night", "Welcome"],
      2,
      "Use 'Good night' when leaving late at night or before sleeping."
    ),

    quiz(
      "Someone helps you carry your books. What do you say?",
      ["Goodbye", "Please", "Hello", "Thanks"],
      3,
      "'Thanks' is the natural way to show gratitude."
    ),

    quiz(
      "Which sentence is correct when meeting someone at 7 PM?",
      ["Good evening!", "Good morning!", "Good night!", "Bye!"],
      0,
      "When arriving somewhere in the evening, use 'Good evening'."
    )

  ],

  summary: {

    tip: "Hello is always a safe choice, but matching your greeting to the time of day and the situation makes you sound more natural.",

    review: [
      "Hello is the safest greeting in English.",
      "Hi is informal and commonly used with friends.",
      "Use Good morning before noon.",
      "Use Good afternoon during the afternoon.",
      "Use Good evening when arriving somewhere at night.",
      "Use Good night when leaving or before sleeping.",
      "Goodbye, Bye and See you are common ways to say farewell.",
      "Thanks and Please are essential polite expressions."
    ]

  }

};
