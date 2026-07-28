const CVC_PATTERN = /[^aeiou][aeiou][^aeiouwxy]$/;

const CONSONANT_Y_PATTERN = /[^aeiou]y$/;

function pluralize(word) {

    if (/[sxz]$|[cs]h$/.test(word)) {
        return `${word}es`;
    }

    if (CONSONANT_Y_PATTERN.test(word)) {
        return `${word.slice(0, -1)}ies`;
    }

    return `${word}s`;

}

function doubleFinalConsonant(word) {
    return `${word}${word[word.length - 1]}`;
}

function addPastTense(word) {

    if (word.endsWith("e")) {
        return `${word}d`;
    }

    if (CONSONANT_Y_PATTERN.test(word)) {
        return `${word.slice(0, -1)}ied`;
    }

    if (CVC_PATTERN.test(word)) {
        return `${doubleFinalConsonant(word)}ed`;
    }

    return `${word}ed`;

}

function addGerund(word) {

    if (word.endsWith("e") && !word.endsWith("ee")) {
        return `${word.slice(0, -1)}ing`;
    }

    if (CVC_PATTERN.test(word)) {
        return `${doubleFinalConsonant(word)}ing`;
    }

    return `${word}ing`;

}

function addComparative(word) {

    if (word.endsWith("e")) {
        return `${word}r`;
    }

    if (CONSONANT_Y_PATTERN.test(word)) {
        return `${word.slice(0, -1)}ier`;
    }

    if (CVC_PATTERN.test(word)) {
        return `${doubleFinalConsonant(word)}er`;
    }

    return `${word}er`;

}

function addSuperlative(word) {

    if (word.endsWith("e")) {
        return `${word}st`;
    }

    if (CONSONANT_Y_PATTERN.test(word)) {
        return `${word.slice(0, -1)}iest`;
    }

    if (CVC_PATTERN.test(word)) {
        return `${doubleFinalConsonant(word)}est`;
    }

    return `${word}est`;

}

export function getInflectedForms(word) {

    if (!word || /[^a-z]/.test(word)) {
        return [];
    }

    const forms = new Set([
        pluralize(word),
        addPastTense(word),
        addGerund(word),
        addComparative(word),
        addSuperlative(word)
    ]);

    forms.delete(word);

    return [...forms];

}
