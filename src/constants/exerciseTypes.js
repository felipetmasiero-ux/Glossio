export const EXERCISE_TYPES = {

    MULTIPLE_CHOICE: "multiple-choice",

    SELECT_WORD: "select-word",

    FILL_BLANK: "fill-blank",

    MATCH_TRANSLATION: "match-translation",

    ORDER_SENTENCE: "order-sentence",

    LISTENING: "listening"

};

export const EXERCISE_TYPE_META = {

    [EXERCISE_TYPES.MULTIPLE_CHOICE]: {
        icon: "check",
        label: "Múltipla escolha"
    },

    [EXERCISE_TYPES.SELECT_WORD]: {
        icon: "target",
        label: "Escolha a palavra"
    },

    [EXERCISE_TYPES.FILL_BLANK]: {
        icon: "pencil",
        label: "Complete a frase"
    },

    [EXERCISE_TYPES.MATCH_TRANSLATION]: {
        icon: "link",
        label: "Associe as traduções"
    },

    [EXERCISE_TYPES.ORDER_SENTENCE]: {
        icon: "shuffle",
        label: "Ordene a frase"
    },

    [EXERCISE_TYPES.LISTENING]: {
        icon: "volume",
        label: "Compreensão auditiva"
    }

};
