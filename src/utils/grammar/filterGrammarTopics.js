// Independent from the universal search (utils/search/) by design - the
// Grammar Hub's own search is a simple substring filter over its own fields,
// not the ranked, multi-source engine built for Sprint 35.
function includesQuery(text, query) {
    return typeof text === "string" && text.toLowerCase().includes(query);
}

export function filterGrammarTopics(topics, query) {

    const trimmed = query?.trim().toLowerCase() ?? "";

    if (!trimmed) {
        return topics;
    }

    return topics.filter(topic =>
        includesQuery(topic.title, trimmed)
        || includesQuery(topic.topic, trimmed)
        || (topic.rules ?? []).some(rule => includesQuery(rule, trimmed))
        || (topic.examples ?? []).some(example => includesQuery(example, trimmed))
    );

}
