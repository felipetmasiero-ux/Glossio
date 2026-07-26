export function adaptEventsToHistory(events, types) {

    return events
        .filter(event => types.includes(event.type))
        .map(event => ({ reviewedAt: event.timestamp }));

}
