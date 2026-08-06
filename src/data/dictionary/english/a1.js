import { normalizeWord } from "../../../repositories/normalizeWord";

const rawEntries = [

    // Greetings
    { word: "hello", translation: "olá", examples: ["Hello! Welcome to Glossio."], note: "The most common greeting.", topic: "greetings" },
    { word: "hi", translation: "oi", examples: ["Hi, Emma!"], note: "Informal greeting.", topic: "greetings" },
    { word: "good morning", translation: "bom dia", examples: ["Good morning, teacher."], topic: "greetings" },
    { word: "good afternoon", translation: "boa tarde", examples: ["Good afternoon, everyone."], topic: "greetings" },
    { word: "good evening", translation: "boa noite (ao chegar)", examples: ["Good evening, sir."], topic: "greetings" },
    { word: "good night", translation: "boa noite (ao sair ou dormir)", examples: ["Good night! See you tomorrow."], topic: "greetings" },
    { word: "goodbye", translation: "adeus", examples: ["Goodbye! Have a nice day."], topic: "greetings" },
    { word: "bye", translation: "tchau", examples: ["Bye! See you soon."], topic: "greetings" },
    { word: "thanks", translation: "obrigado", examples: ["Thanks for your help."], topic: "greetings" },
    { word: "please", translation: "por favor", examples: ["Please, come in."], topic: "greetings" },
    { word: "welcome", translation: "bem-vindo", examples: ["Welcome to our school."], topic: "greetings" },
    { word: "see you", translation: "até mais", examples: ["See you tomorrow."], topic: "greetings" },

    // Introductions
    { word: "My name is", translation: "Meu nome é", examples: ["My name is Sofia."], topic: "introductions" },
    { word: "What's your name?", translation: "Qual é o seu nome?", topic: "introductions" },
    { word: "I'm from Brazil.", translation: "Eu sou do Brasil.", topic: "introductions" },
    { word: "Where are you from?", translation: "De onde você é?", topic: "introductions" },
    { word: "Nice to meet you.", translation: "Prazer em conhecer você.", topic: "introductions" },
    { word: "Likewise.", translation: "Igualmente.", note: "A short, polite reply to 'Nice to meet you.'", topic: "introductions" },
    { word: "This is...", translation: "Este é / Esta é...", examples: ["This is my friend, Marco."], topic: "introductions" },
    { word: "Let me introduce myself.", translation: "Deixe-me me apresentar.", topic: "introductions" },

    // Countries & Nationalities
    { word: "Brazil", translation: "Brasil", partOfSpeech: "noun", topic: "countries" },
    { word: "Brazilian", translation: "Brasileiro(a)", partOfSpeech: "adjective", topic: "countries" },
    { word: "United States", translation: "Estados Unidos", partOfSpeech: "noun", topic: "countries" },
    { word: "American", translation: "Americano(a)", partOfSpeech: "adjective", topic: "countries" },
    { word: "France", translation: "França", partOfSpeech: "noun", topic: "countries" },
    { word: "French", translation: "Francês / Francesa", partOfSpeech: "adjective", topic: "countries" },
    { word: "Japan", translation: "Japão", partOfSpeech: "noun", topic: "countries" },
    { word: "Japanese", translation: "Japonês(a)", partOfSpeech: "adjective", topic: "countries" },
    { word: "Spain", translation: "Espanha", partOfSpeech: "noun", topic: "countries" },
    { word: "Spanish", translation: "Espanhol(a)", partOfSpeech: "adjective", topic: "countries" },

    // Numbers
    { word: "zero", translation: "zero", topic: "numbers" },
    { word: "one", translation: "um", topic: "numbers" },
    { word: "two", translation: "dois", topic: "numbers" },
    { word: "three", translation: "três", topic: "numbers" },
    { word: "four", translation: "quatro", topic: "numbers" },
    { word: "five", translation: "cinco", topic: "numbers" },
    { word: "ten", translation: "dez", topic: "numbers" },
    { word: "twenty", translation: "vinte", topic: "numbers" },
    { word: "hundred", translation: "cem", topic: "numbers" },
    { word: "how many", translation: "quantos(as)", examples: ["How many brothers do you have?"], topic: "numbers" },
    { word: "how old", translation: "quantos anos", examples: ["How old are you?"], topic: "numbers" },

    // Days & Months
    { word: "Monday", translation: "segunda-feira", partOfSpeech: "noun", topic: "days" },
    { word: "Friday", translation: "sexta-feira", partOfSpeech: "noun", topic: "days" },
    { word: "weekend", translation: "fim de semana", partOfSpeech: "noun", topic: "days" },
    { word: "January", translation: "janeiro", partOfSpeech: "noun", topic: "days" },
    { word: "December", translation: "dezembro", partOfSpeech: "noun", topic: "days" },
    { word: "today", translation: "hoje", partOfSpeech: "noun", topic: "days" },
    { word: "tomorrow", translation: "amanhã", partOfSpeech: "noun", topic: "days" },
    { word: "yesterday", translation: "ontem", partOfSpeech: "noun", topic: "days" },
    { word: "What day is it?", translation: "Que dia é hoje?", topic: "days" },

    // Family
    { word: "mother", translation: "mãe", partOfSpeech: "noun", topic: "family" },
    { word: "father", translation: "pai", partOfSpeech: "noun", topic: "family" },
    { word: "parents", translation: "pais", partOfSpeech: "noun", topic: "family" },
    { word: "brother", translation: "irmão", partOfSpeech: "noun", topic: "family" },
    { word: "sister", translation: "irmã", partOfSpeech: "noun", topic: "family" },
    { word: "sibling", translation: "irmão(ã)", note: "A gender-neutral word for brother or sister.", partOfSpeech: "noun", topic: "family" },
    { word: "son", translation: "filho", partOfSpeech: "noun", topic: "family" },
    { word: "daughter", translation: "filha", partOfSpeech: "noun", topic: "family" },
    { word: "grandmother", translation: "avó", partOfSpeech: "noun", topic: "family" },
    { word: "grandfather", translation: "avô", partOfSpeech: "noun", topic: "family" },

    // Jobs
    { word: "teacher", translation: "professor(a)", partOfSpeech: "noun", topic: "jobs" },
    { word: "doctor", translation: "médico(a)", partOfSpeech: "noun", topic: "jobs" },
    { word: "engineer", translation: "engenheiro(a)", partOfSpeech: "noun", topic: "jobs" },
    { word: "nurse", translation: "enfermeiro(a)", partOfSpeech: "noun", topic: "jobs" },
    { word: "manager", translation: "gerente", partOfSpeech: "noun", topic: "jobs" },
    { word: "student", translation: "estudante", partOfSpeech: "noun", topic: "jobs" },
    { word: "police officer", translation: "policial", partOfSpeech: "noun", topic: "jobs" },
    { word: "What do you do?", translation: "O que você faz (da vida)?", topic: "jobs" },
    { word: "I work as a...", translation: "Eu trabalho como...", topic: "jobs" },

    // Present Simple
    { word: "work", translation: "trabalhar", partOfSpeech: "verb", topic: "present-simple" },
    { word: "live", translation: "morar", partOfSpeech: "verb", topic: "present-simple" },
    { word: "study", translation: "estudar", partOfSpeech: "verb", topic: "present-simple" },
    { word: "like", translation: "gostar", partOfSpeech: "verb", topic: "present-simple" },
    { word: "go", translation: "ir", aliases: ["goes", "went", "gone", "going"], partOfSpeech: "verb", topic: "present-simple" },
    { word: "have", translation: "ter", aliases: ["has", "had", "having"], partOfSpeech: "verb", topic: "present-simple" },
    { word: "every day", translation: "todo dia", topic: "present-simple" },
    { word: "usually", translation: "normalmente", partOfSpeech: "adverb", topic: "present-simple" },
    { word: "always", translation: "sempre", partOfSpeech: "adverb", topic: "present-simple" },
    { word: "never", translation: "nunca", partOfSpeech: "adverb", topic: "present-simple" },

    // Daily Routine
    { word: "wake up", translation: "acordar", topic: "daily-routine" },
    { word: "get up", translation: "levantar da cama", topic: "daily-routine" },
    { word: "have breakfast", translation: "tomar café da manhã", topic: "daily-routine" },
    { word: "go to work", translation: "ir trabalhar", topic: "daily-routine" },
    { word: "have lunch", translation: "almoçar", topic: "daily-routine" },
    { word: "go home", translation: "ir para casa", topic: "daily-routine" },
    { word: "have dinner", translation: "jantar", topic: "daily-routine" },
    { word: "go to bed", translation: "ir para a cama", topic: "daily-routine" },
    { word: "in the morning", translation: "de manhã", topic: "daily-routine" },
    { word: "at night", translation: "à noite", topic: "daily-routine" },

    // Food
    { word: "bread", translation: "pão", partOfSpeech: "noun", topic: "food" },
    { word: "rice", translation: "arroz", partOfSpeech: "noun", topic: "food" },
    { word: "chicken", translation: "frango", partOfSpeech: "noun", topic: "food" },
    { word: "fish", translation: "peixe", partOfSpeech: "noun", topic: "food" },
    { word: "vegetables", translation: "vegetais", partOfSpeech: "noun", topic: "food" },
    { word: "fruit", translation: "fruta", partOfSpeech: "noun", topic: "food" },
    { word: "water", translation: "água", partOfSpeech: "noun", topic: "food" },
    { word: "coffee", translation: "café", partOfSpeech: "noun", topic: "food" },
    { word: "I'm hungry.", translation: "Estou com fome.", topic: "food" },
    { word: "I'm thirsty.", translation: "Estou com sede.", topic: "food" },

    // Restaurant
    { word: "menu", translation: "cardápio", partOfSpeech: "noun", topic: "restaurant" },
    { word: "table", translation: "mesa", partOfSpeech: "noun", topic: "restaurant" },
    { word: "waiter", translation: "garçom", partOfSpeech: "noun", topic: "restaurant" },
    { word: "order", translation: "pedido / pedir", topic: "restaurant" },
    { word: "Can I have...?", translation: "Posso pedir...?", topic: "restaurant" },
    { word: "I'd like...", translation: "Eu gostaria de...", topic: "restaurant" },
    { word: "The bill, please.", translation: "A conta, por favor.", topic: "restaurant" },
    { word: "reservation", translation: "reserva", partOfSpeech: "noun", topic: "restaurant" },
    { word: "tip", translation: "gorjeta", partOfSpeech: "noun", topic: "restaurant" }

];

export const englishA1Dictionary = rawEntries.map(entry => ({
    id: normalizeWord(entry.word),
    language: "english",
    level: "A1",
    pronunciation: null,
    audio: null,
    partOfSpeech: null,
    topic: null,
    ...entry
}));
