import { normalizeWord } from "../../../repositories/normalizeWord";

const rawEntries = [

    // Daily Routine
    { word: "souvent", translation: "frequentemente", partOfSpeech: "adverb", topic: "daily-routine" },
    { word: "rarement", translation: "raramente", partOfSpeech: "adverb", topic: "daily-routine" },
    { word: "presque jamais", translation: "quase nunca", topic: "daily-routine" },
    { word: "s'habiller", translation: "vestir-se", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "se brosser les dents", translation: "escovar os dentes", topic: "daily-routine" },
    { word: "prendre une douche", translation: "tomar banho", topic: "daily-routine" },
    { word: "faire la navette", translation: "ir e vir do trabalho", topic: "daily-routine" },
    { word: "tâches ménagères", translation: "tarefas domésticas", partOfSpeech: "noun", topic: "daily-routine" },
    { word: "ménage", translation: "faxina / afazeres domésticos", partOfSpeech: "noun", topic: "daily-routine" },
    { word: "routine", translation: "rotina", partOfSpeech: "noun", topic: "daily-routine" },

    // Shopping
    { word: "caissier", translation: "caixa (pessoa)", aliases: ["caissière"], partOfSpeech: "noun", topic: "shopping" },
    { word: "reçu", translation: "recibo / nota fiscal", partOfSpeech: "noun", topic: "shopping" },
    { word: "réduction", translation: "desconto", partOfSpeech: "noun", topic: "shopping" },
    { word: "cabine d'essayage", translation: "provador", partOfSpeech: "noun", topic: "shopping" },
    { word: "taille", translation: "tamanho", partOfSpeech: "noun", topic: "shopping" },
    { word: "remboursement", translation: "reembolso", partOfSpeech: "noun", topic: "shopping" },
    { word: "échanger", translation: "trocar", partOfSpeech: "verb", topic: "shopping" },
    { word: "client", translation: "cliente", aliases: ["cliente"], partOfSpeech: "noun", topic: "shopping" },
    { word: "vitrine", translation: "vitrine (loja)", partOfSpeech: "noun", topic: "shopping" },
    { word: "soldes", translation: "liquidação / promoção", partOfSpeech: "noun", topic: "shopping" },

    // Health
    { word: "mal de tête", translation: "dor de cabeça", topic: "health" },
    { word: "mal de ventre", translation: "dor de estômago", topic: "health" },
    { word: "fièvre", translation: "febre", partOfSpeech: "noun", topic: "health" },
    { word: "toux", translation: "tosse", partOfSpeech: "noun", topic: "health" },
    { word: "mal de gorge", translation: "dor de garganta", topic: "health" },
    { word: "vertiges", translation: "tontura", partOfSpeech: "noun", topic: "health" },
    { word: "médicament", translation: "remédio", partOfSpeech: "noun", topic: "health" },
    { word: "pharmacie", translation: "farmácia", partOfSpeech: "noun", topic: "health" },
    { word: "rendez-vous", translation: "consulta / compromisso", partOfSpeech: "noun", topic: "health" },
    { word: "symptôme", translation: "sintoma", partOfSpeech: "noun", topic: "health" },

    // Weather
    { word: "ensoleillé", translation: "ensolarado", aliases: ["ensoleillée"], partOfSpeech: "adjective", topic: "weather" },
    { word: "nuageux", translation: "nublado", aliases: ["nuageuse"], partOfSpeech: "adjective", topic: "weather" },
    { word: "pluvieux", translation: "chuvoso", aliases: ["pluvieuse"], partOfSpeech: "adjective", topic: "weather" },
    { word: "venteux", translation: "ventoso", aliases: ["venteuse"], partOfSpeech: "adjective", topic: "weather" },
    { word: "enneigé", translation: "coberto de neve / nevado", aliases: ["enneigée"], partOfSpeech: "adjective", topic: "weather" },
    { word: "brumeux", translation: "com neblina", aliases: ["brumeuse"], partOfSpeech: "adjective", topic: "weather" },
    { word: "température", translation: "temperatura", partOfSpeech: "noun", topic: "weather" },
    { word: "prévisions", translation: "previsão do tempo", partOfSpeech: "noun", topic: "weather" },
    { word: "orage", translation: "tempestade", partOfSpeech: "noun", topic: "weather" },
    { word: "glacial", translation: "congelante", aliases: ["glaciale"], partOfSpeech: "adjective", topic: "weather" },

    // Transportation
    { word: "arrêt de bus", translation: "ponto de ônibus", topic: "transportation" },
    { word: "métro", translation: "metrô", partOfSpeech: "noun", topic: "transportation" },
    { word: "quai", translation: "plataforma", partOfSpeech: "noun", topic: "transportation" },
    { word: "circulation", translation: "trânsito", partOfSpeech: "noun", topic: "transportation" },
    { word: "embouteillage", translation: "engarrafamento", partOfSpeech: "noun", topic: "transportation" },
    { word: "tarif", translation: "tarifa / passagem", partOfSpeech: "noun", topic: "transportation" },
    { word: "embarquer", translation: "embarcar", partOfSpeech: "verb", topic: "transportation" },
    { word: "retard", translation: "atraso", partOfSpeech: "noun", topic: "transportation" },
    { word: "passager", translation: "passageiro(a)", aliases: ["passagère"], partOfSpeech: "noun", topic: "transportation" },
    { word: "conducteur", translation: "motorista", aliases: ["conductrice"], partOfSpeech: "noun", topic: "transportation" },

    // Technology
    { word: "smartphone", translation: "smartphone", partOfSpeech: "noun", topic: "technology" },
    { word: "ordinateur portable", translation: "notebook / laptop", partOfSpeech: "noun", topic: "technology" },
    { word: "mot de passe", translation: "senha", topic: "technology" },
    { word: "télécharger", translation: "baixar", partOfSpeech: "verb", topic: "technology" },
    { word: "mettre en ligne", translation: "enviar / fazer upload", topic: "technology" },
    { word: "wifi", translation: "wifi", partOfSpeech: "noun", topic: "technology" },
    { word: "batterie", translation: "bateria", partOfSpeech: "noun", topic: "technology" },
    { word: "chargeur", translation: "carregador", partOfSpeech: "noun", topic: "technology" },
    { word: "écran", translation: "tela", partOfSpeech: "noun", topic: "technology" },
    { word: "application", translation: "aplicativo", partOfSpeech: "noun", topic: "technology" },

    // Hobbies
    { word: "passe-temps", translation: "hobby / passatempo", partOfSpeech: "noun", topic: "hobbies" },
    { word: "peindre", translation: "pintar", partOfSpeech: "verb", topic: "hobbies" },
    { word: "dessiner", translation: "desenhar", partOfSpeech: "verb", topic: "hobbies" },
    { word: "collectionner", translation: "colecionar", partOfSpeech: "verb", topic: "hobbies" },
    { word: "photographie", translation: "fotografia", partOfSpeech: "noun", topic: "hobbies" },
    { word: "casse-tête", translation: "quebra-cabeça", partOfSpeech: "noun", topic: "hobbies" },
    { word: "échecs", translation: "xadrez", partOfSpeech: "noun", topic: "hobbies" },
    { word: "tricoter", translation: "tricotar", partOfSpeech: "verb", topic: "hobbies" },
    { word: "pêche", translation: "pesca", partOfSpeech: "noun", topic: "hobbies" },
    { word: "temps libre", translation: "tempo livre", topic: "hobbies" },

    // Feelings
    { word: "ennuyé", translation: "entediado", aliases: ["ennuyée"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "ennuyeux", translation: "chato / entediante", aliases: ["ennuyeuse"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "énervé", translation: "irritado", aliases: ["énervée"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "énervant", translation: "irritante", aliases: ["énervante"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "surpris", translation: "surpreso", aliases: ["surprise"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "surprenant", translation: "surpreendente", aliases: ["surprenante"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "intéressé", translation: "interessado", aliases: ["intéressée"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "intéressant", translation: "interessante", aliases: ["intéressante"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "déçu", translation: "decepcionado", aliases: ["déçue"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "décevant", translation: "decepcionante", aliases: ["décevante"], partOfSpeech: "adjective", topic: "feelings" },

    // At the Restaurant (A2)
    { word: "entrée", translation: "entrada (prato)", partOfSpeech: "noun", topic: "restaurant" },
    { word: "plat principal", translation: "prato principal", partOfSpeech: "noun", topic: "restaurant" },
    { word: "dessert", translation: "sobremesa", partOfSpeech: "noun", topic: "restaurant" },
    { word: "accompagnement", translation: "acompanhamento", partOfSpeech: "noun", topic: "restaurant" },
    { word: "végétarien", translation: "vegetariano(a)", aliases: ["végétarienne"], partOfSpeech: "adjective", topic: "restaurant" },
    { word: "allergique", translation: "alérgico(a)", partOfSpeech: "adjective", topic: "restaurant" },
    { word: "recommander", translation: "recomendar", partOfSpeech: "verb", topic: "restaurant" },
    { word: "plainte", translation: "reclamação", partOfSpeech: "noun", topic: "restaurant" },
    { word: "frais de service", translation: "taxa de serviço", topic: "restaurant" },
    { word: "réservation", translation: "reserva", partOfSpeech: "noun", topic: "restaurant" },

    // At the Hotel
    { word: "réception", translation: "recepção", partOfSpeech: "noun", topic: "hotel" },
    { word: "réceptionniste", translation: "recepcionista", partOfSpeech: "noun", topic: "hotel" },
    { word: "carte-clé", translation: "cartão-chave", partOfSpeech: "noun", topic: "hotel" },
    { word: "service en chambre", translation: "serviço de quarto", topic: "hotel" },
    { word: "appel de réveil", translation: "chamada para acordar", topic: "hotel" },
    { word: "chambre simple", translation: "quarto individual", partOfSpeech: "noun", topic: "hotel" },
    { word: "chambre double", translation: "quarto de casal / duplo", partOfSpeech: "noun", topic: "hotel" },
    { word: "hall", translation: "saguão / lobby", partOfSpeech: "noun", topic: "hotel" },
    { word: "bagages", translation: "bagagem", partOfSpeech: "noun", topic: "hotel" },
    { word: "équipements", translation: "comodidades", partOfSpeech: "noun", topic: "hotel" },

    // Making Plans
    { word: "plan", translation: "plano", partOfSpeech: "noun", topic: "plans" },
    { word: "emploi du temps", translation: "agenda / cronograma", topic: "plans" },
    { word: "disponible", translation: "disponível", partOfSpeech: "adjective", topic: "plans" },
    { word: "occupé", translation: "ocupado(a)", aliases: ["occupée"], partOfSpeech: "adjective", topic: "plans" },
    { word: "annuler", translation: "cancelar", partOfSpeech: "verb", topic: "plans" },
    { word: "reporter", translation: "adiar", partOfSpeech: "verb", topic: "plans" },
    { word: "confirmer", translation: "confirmar", partOfSpeech: "verb", topic: "plans" },
    { word: "inviter", translation: "convidar", partOfSpeech: "verb", topic: "plans" },
    { word: "se retrouver", translation: "se reunir / se encontrar", partOfSpeech: "verb", topic: "plans" },
    { word: "traîner", translation: "sair com amigos / passar tempo junto", partOfSpeech: "verb", topic: "plans" },

    // Life Experiences
    { word: "expérience", translation: "experiência", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "réussite", translation: "conquista", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "étranger", translation: "exterior / estrangeiro", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "aventure", translation: "aventura", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "défi", translation: "desafio", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "accomplir", translation: "realizar / alcançar", partOfSpeech: "verb", topic: "life-experiences" },
    { word: "carrière", translation: "carreira", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "jalon", translation: "marco (importante)", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "déjà", translation: "já", partOfSpeech: "adverb", topic: "life-experiences" },
    { word: "jamais", translation: "nunca / alguma vez", partOfSpeech: "adverb", topic: "life-experiences" }

];

export const frenchA2Dictionary = rawEntries.map(entry => ({
    id: normalizeWord(entry.word),
    language: "french",
    level: "A2",
    pronunciation: null,
    partOfSpeech: null,
    topic: null,
    ...entry
}));
