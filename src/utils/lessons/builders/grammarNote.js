// One field of a quiz block's optional `feedback` object - see feedback.js.
// Shown for both a correct and a wrong answer ("regra gramatical") - a
// grammar rule is useful context either way.
export function grammarNote(text) {
    return { grammarNote: text };
}
