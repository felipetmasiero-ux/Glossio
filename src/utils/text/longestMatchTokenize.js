import { tokenizeText } from "./tokenizeText";

const MAX_PHRASE_WORDS = 6;

const WORD_PATTERN = /^[\p{L}\p{N}'’]+$/u;

const WHITESPACE_PATTERN = /^\s+$/;

function isWordToken(token) {
    return WORD_PATTERN.test(token);
}

function collectWordSpan(tokens, start, wordCount) {

    const words = [];

    let index = start;

    for (let w = 0; w < wordCount; w++) {

        if (index >= tokens.length || !isWordToken(tokens[index])) {
            return null;
        }

        words.push(tokens[index]);
        index += 1;

        const isLastWord = w === wordCount - 1;

        if (!isLastWord) {

            if (index >= tokens.length || !WHITESPACE_PATTERN.test(tokens[index])) {
                return null;
            }

            index += 1;

        }

    }

    return {
        phrase: words.join(" "),
        raw: tokens.slice(start, index).join(""),
        endIndex: index
    };

}

/**
 * Tokenizes text into chunks, always preferring the longest run of words
 * (up to MAX_PHRASE_WORDS) that satisfies `hasMatch`. Whitespace, punctuation
 * and unmatched words fall through as plain, non-clickable chunks.
 */
export function longestMatchTokenize(text, hasMatch) {

    const tokens = tokenizeText(text);

    const chunks = [];

    let i = 0;

    while (i < tokens.length) {

        if (!isWordToken(tokens[i])) {
            chunks.push({ text: tokens[i], isMatch: false });
            i += 1;
            continue;
        }

        let matchedSpan = null;

        for (let wordCount = Math.min(MAX_PHRASE_WORDS, tokens.length); wordCount >= 1; wordCount--) {

            const span = collectWordSpan(tokens, i, wordCount);

            if (span && hasMatch(span.phrase)) {
                matchedSpan = span;
                break;
            }

        }

        if (matchedSpan) {
            chunks.push({ text: matchedSpan.raw, isMatch: true });
            i = matchedSpan.endIndex;
        } else {
            chunks.push({ text: tokens[i], isMatch: false });
            i += 1;
        }

    }

    return chunks;

}
