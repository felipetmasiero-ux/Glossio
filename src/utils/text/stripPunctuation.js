const PUNCTUATION_PATTERN = /[.,!?;:()"'’]/g;

export function stripPunctuation(token) {

    return token.replace(PUNCTUATION_PATTERN, "");

}
