// Splits `text` into plain/highlighted segments around the first
// case-insensitive occurrence of `query` - a search result can only ever
// have one highlighted span, so the first match is the right (and only) one.
export function highlightMatch(text, query) {

    if (!text) {
        return [{ text: "", highlighted: false }];
    }

    if (!query) {
        return [{ text, highlighted: false }];
    }

    const index = text.toLowerCase().indexOf(query.toLowerCase());

    if (index === -1) {
        return [{ text, highlighted: false }];
    }

    return [
        { text: text.slice(0, index), highlighted: false },
        { text: text.slice(index, index + query.length), highlighted: true },
        { text: text.slice(index + query.length), highlighted: false }
    ].filter(segment => segment.text.length > 0);

}
