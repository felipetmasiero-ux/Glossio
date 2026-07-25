import { useState, useEffect } from "react";
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

    function logEvent(type, payload = {}) {

        setEvents(previous => {

            const next = [...previous, createEvent(type, payload)];

            return next.length > MAX_EVENTS
                ? next.slice(next.length - MAX_EVENTS)
                : next;

        });

    }

    function getEventsByType(type) {
        return events.filter(event => event.type === type);
    }

    return (
        <EventContext.Provider value={{
            events,
            logEvent,
            getEventsByType
        }}>
            {children}
        </EventContext.Provider>
    );
}
