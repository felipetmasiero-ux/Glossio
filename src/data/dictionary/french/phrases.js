import { normalizeWord } from "../../../repositories/normalizeWord";

const rawEntries = [

    { word: "bonjour", translation: "olá / bom dia" },
    { word: "bonsoir", translation: "boa noite (ao chegar)" },
    { word: "à bientôt", translation: "até breve" },
    { word: "comment ça va", translation: "como vai / tudo bem (informal)" },
    { word: "ça va", translation: "vou bem / tudo bem", note: "Usado como pergunta ('Ça va ?') ou resposta ('Ça va bien')." },
    { word: "comment allez-vous", translation: "como você está (formal)" },
    { word: "je m'appelle", translation: "eu me chamo" },
    { word: "j'ai", translation: "eu tenho" },
    { word: "il y a", translation: "há / tem" },
    { word: "s'il vous plaît", translation: "por favor (formal)", note: "Usado com 'vous'. A versão informal é 's'il te plaît'." },
    { word: "merci beaucoup", translation: "muito obrigado(a)" },
    { word: "excusez-moi", translation: "com licença / desculpe (formal)" },
    { word: "je voudrais", translation: "eu gostaria (de)" },
    { word: "où est", translation: "onde fica / onde está" },
    { word: "qu'est-ce que c'est", translation: "o que é isso" },
    { word: "comment dit-on", translation: "como se diz" },
    { word: "je ne comprends pas", translation: "eu não entendo" },
    { word: "pouvez-vous répéter", translation: "você pode repetir (formal)" },
    { word: "parlez-vous anglais", translation: "você fala inglês" },
    { word: "je ne sais pas", translation: "eu não sei" },
    { word: "bien sûr", translation: "claro" },
    { word: "d'accord", translation: "combinado / de acordo" },
    { word: "avec plaisir", translation: "com prazer" },
    { word: "pas de problème", translation: "sem problema" },
    { word: "à droite", translation: "à direita" },
    { word: "à gauche", translation: "à esquerda" },
    { word: "tout droit", translation: "em frente / reto" },
    { word: "à côté de", translation: "ao lado de" },
    { word: "en face de", translation: "em frente a" },
    { word: "quelle heure est-il", translation: "que horas são" },
    { word: "beaucoup de", translation: "muito(a)(s) de" }

];

export const frenchPhrasesDictionary = rawEntries.map(entry => ({
    id: normalizeWord(entry.word),
    language: "french",
    level: "A1",
    pronunciation: null,
    partOfSpeech: null,
    topic: null,
    ...entry
}));
