export function getRelatedContent({

    source,

    candidates,

    language,

    completedIds = []

}) {

    const available = candidates.filter(item =>
        item.language === language &&
        !completedIds.includes(item.id)
    );

    const sameTopic = available.filter(item => item.topic === source.topic);

    if (sameTopic.length > 0) {
        return sameTopic.slice(0, 2);
    }

    return available
        .filter(item => item.level === source.level)
        .slice(0, 2);

}
