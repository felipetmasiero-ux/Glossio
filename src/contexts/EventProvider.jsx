import { useState, useEffect, useCallback, useMemo } from "react";
import { EventContext } from "./EventContext";
import { createEvent, loadEvents, saveEvents } from "../utils/events";

// Safety valve so the log doesn't grow forever in localStorage.
// Once there's a backend, this becomes a sync/flush point instead of a cap.
const MAX_EVENTS = 2000;

export function EventProvider({ children }) {

    const [events, setEvents] = useState(loadEvents);

    useEffect(() => {
        saveEvents(events);
    }, [events]);

    // Functional update - never needs to read `events` directly, so this
    // reference stays stable across every render regardless of how often
    // events are logged (previously a fresh function every render, which
    // cascaded into every context consumer re-rendering on every log call
    // anywhere in the app, whether or not they cared about events).
    const logEvent = useCallback((type, payload = {}) => {

        setEvents(previous => {

            const next = [...previous, createEvent(type, payload)];

            return next.length > MAX_EVENTS
                ? next.slice(next.length - MAX_EVENTS)
                : next;

        });

    }, []);

    const getEventsByType = useCallback(type => {
        return events.filter(event => event.type === type);
    }, [events]);

    const value = useMemo(() => ({
        events,
        logEvent,
        getEventsByType
    }), [events, logEvent, getEventsByType]);

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    );
}
