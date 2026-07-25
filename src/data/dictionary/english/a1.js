import { normalizeWord } from "../../../repositories/normalizeWord";

const rawEntries = [

    // Greetings
    { word: "hello", translation: "olá", examples: ["Hello! Welcome to Glossio."], note: "The most common greeting." },
    { word: "hi", translation: "oi", examples: ["Hi, Emma!"], note: "Informal greeting." },
    { word: "good morning", translation: "bom dia", examples: ["Good morning, teacher."] },
    { word: "good afternoon", translation: "boa tarde", examples: ["Good afternoon, everyone."] },
    { word: "good evening", translation: "boa noite (ao chegar)", examples: ["Good evening, sir."] },
    { word: "good night", translation: "boa noite (ao sair ou dormir)", examples: ["Good night! See you tomorrow."] },
    { word: "goodbye", translation: "adeus", examples: ["Goodbye! Have a nice day."] },
    { word: "bye", translation: "tchau", examples: ["Bye! See you soon."] },
    { word: "thanks", translation: "obrigado", examples: ["Thanks for your help."] },
    { word: "please", translation: "por favor", examples: ["Please, come in."] },
    { word: "welcome", translation: "bem-vindo", examples: ["Welcome to our school."] },
    { word: "see you", translation: "até mais", examples: ["See you tomorrow."] },

    // Introductions
    { word: "My name is", translation: "Meu nome é", examples: ["My name is Sofia."] },
    { word: "What's your name?", translation: "Qual é o seu nome?" },
    { word: "I'm from Brazil.", translation: "Eu sou do Brasil." },
    { word: "Where are you from?", translation: "De onde você é?" },
    { word: "Nice to meet you.", translation: "Prazer em conhecer você." },
    { word: "Likewise.", translation: "Igualmente.", note: "A short, polite reply to 'Nice to meet you.'" },
    { word: "This is...", translation: "Este é / Esta é...", examples: ["This is my friend, Marco."] },
    { word: "Let me introduce myself.", translation: "Deixe-me me apresentar." },

    // Countries & Nationalities
    { word: "Brazil", translation: "Brasil" },
    { word: "Brazilian", translation: "Brasileiro(a)" },
    { word: "United States", translation: "Estados Unidos" },
    { word: "American", translation: "Americano(a)" },
    { word: "France", translation: "França" },
    { word: "French", translation: "Francês / Francesa" },
    { word: "Japan", translation: "Japão" },
    { word: "Japanese", translation: "Japonês(a)" },
    { word: "Spain", translation: "Espanha" },
    { word: "Spanish", translation: "Espanhol(a)" },

    // Numbers
    { word: "zero", translation: "zero" },
    { word: "one", translation: "um" },
    { word: "two", translation: "dois" },
    { word: "three", translation: "três" },
    { word: "four", translation: "quatro" },
    { word: "five", translation: "cinco" },
    { word: "ten", translation: "dez" },
    { word: "twenty", translation: "vinte" },
    { word: "hundred", translation: "cem" },
    { word: "how many", translation: "quantos(as)", examples: ["How many brothers do you have?"] },
    { word: "how old", translation: "quantos anos", examples: ["How old are you?"] },

    // Days & Months
    { word: "Monday", translation: "segunda-feira" },
    { word: "Friday", translation: "sexta-feira" },
    { word: "weekend", translation: "fim de semana" },
    { word: "January", translation: "janeiro" },
    { word: "December", translation: "dezembro" },
    { word: "today", translation: "hoje" },
    { word: "tomorrow", translation: "amanhã" },
    { word: "yesterday", translation: "ontem" },
    { word: "What day is it?", translation: "Que dia é hoje?" },

    // Family
    { word: "mother", translation: "mãe" },
    { word: "father", translation: "pai" },
    { word: "parents", translation: "pais" },
    { word: "brother", translation: "irmão" },
    { word: "sister", translation: "irmã" },
    { word: "sibling", translation: "irmão(ã)", note: "A gender-neutral word for brother or sister." },
    { word: "son", translation: "filho" },
    { word: "daughter", translation: "filha" },
    { word: "grandmother", translation: "avó" },
    { word: "grandfather", translation: "avô" },

    // Jobs
    { word: "teacher", translation: "professor(a)" },
    { word: "doctor", translation: "médico(a)" },
    { word: "engineer", translation: "engenheiro(a)" },
    { word: "nurse", translation: "enfermeiro(a)" },
    { word: "manager", translation: "gerente" },
    { word: "student", translation: "estudante" },
    { word: "police officer", translation: "policial" },
    { word: "What do you do?", translation: "O que você faz (da vida)?" },
    { word: "I work as a...", translation: "Eu trabalho como..." },

    // Present Simple
    { word: "work", translation: "trabalhar" },
    { word: "live", translation: "morar" },
    { word: "study", translation: "estudar" },
    { word: "like", translation: "gostar" },
    { word: "go", translation: "ir" },
    { word: "have", translation: "ter" },
    { word: "every day", translation: "todo dia" },
    { word: "usually", translation: "normalmente" },
    { word: "always", translation: "sempre" },
    { word: "never", translation: "nunca" },

    // Daily Routine
    { word: "wake up", translation: "acordar" },
    { word: "get up", translation: "levantar da cama" },
    { word: "have breakfast", translation: "tomar café da manhã" },
    { word: "go to work", translation: "ir trabalhar" },
    { word: "have lunch", translation: "almoçar" },
    { word: "go home", translation: "ir para casa" },
    { word: "have dinner", translation: "jantar" },
    { word: "go to bed", translation: "ir para a cama" },
    { word: "in the morning", translation: "de manhã" },
    { word: "at night", translation: "à noite" },

    // Food
    { word: "bread", translation: "pão" },
    { word: "rice", translation: "arroz" },
    { word: "chicken", translation: "frango" },
    { word: "fish", translation: "peixe" },
    { word: "vegetables", translation: "vegetais" },
    { word: "fruit", translation: "fruta" },
    { word: "water", translation: "água" },
    { word: "coffee", translation: "café" },
    { word: "I'm hungry.", translation: "Estou com fome." },
    { word: "I'm thirsty.", translation: "Estou com sede." },

    // Restaurant
    { word: "menu", translation: "cardápio" },
    { word: "table", translation: "mesa" },
    { word: "waiter", translation: "garçom" },
    { word: "order", translation: "pedido / pedir" },
    { word: "Can I have...?", translation: "Posso pedir...?" },
    { word: "I'd like...", translation: "Eu gostaria de..." },
    { word: "The bill, please.", translation: "A conta, por favor." },
    { word: "reservation", translation: "reserva" },
    { word: "tip", translation: "gorjeta" }

];

export const englishA1Dictionary = rawEntries.map(entry => ({
    id: normalizeWord(entry.word),
    language: "english",
    level: "A1",
    pronunciation: null,
    partOfSpeech: null,
    ...entry
}));
