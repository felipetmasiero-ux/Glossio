import { describe, it, expect } from "vitest";
import { useEffect } from "react";
import { render, act } from "@testing-library/react";

import { EventProvider } from "./EventProvider.jsx";
import { FlashcardProvider } from "./FlashcardProvider.jsx";
import { LessonProgressProvider } from "./LessonProgressProvider.jsx";
import { useEvents } from "../hooks/useEvents.js";
import { useFlashcards } from "../hooks/useFlashcards.js";
import { useLessonProgress } from "../hooks/useLessonProgress.js";

// Performance sprint regression guard: every provider that also consumes
// another context (FlashcardProvider and LessonProgressProvider both read
// useEvents() for logEvent) used to build a brand-new value object and a
// fresh set of action functions on *every* render - which meant logging an
// event anywhere in the app (word views, video progress, anything) forced
// every flashcard/lesson-progress consumer in the whole tree to re-render,
// even though neither flashcards nor completed lessons actually changed.
// Wrapping each provider's functions in useCallback and its value in
// useMemo fixes this; these tests prove it stays fixed.
function CountingConsumer({ hook, renderCountRef }) {
    hook();
    renderCountRef.current += 1;
    return null;
}

function EventLogger({ triggerRef }) {
    const { logEvent } = useEvents();
    useEffect(() => {
        triggerRef.current = () => logEvent("WORD_VIEWED", { word: "test" });
    });
    return null;
}

describe("provider render stability under unrelated context changes", () => {

    it("a FlashcardContext consumer does not re-render when an unrelated event is logged", async () => {
        const renderCountRef = { current: 0 };
        const triggerRef = { current: null };

        render(
            <EventProvider>
                <EventLogger triggerRef={triggerRef} />
                <FlashcardProvider>
                    <CountingConsumer hook={useFlashcards} renderCountRef={renderCountRef} />
                </FlashcardProvider>
            </EventProvider>
        );

        const initialRenders = renderCountRef.current;

        await act(async () => {
            triggerRef.current();
            triggerRef.current();
            triggerRef.current();
        });

        expect(renderCountRef.current).toBe(initialRenders);
    });

    it("a LessonProgressContext consumer does not re-render when an unrelated event is logged", async () => {
        const renderCountRef = { current: 0 };
        const triggerRef = { current: null };

        render(
            <EventProvider>
                <EventLogger triggerRef={triggerRef} />
                <LessonProgressProvider>
                    <CountingConsumer hook={useLessonProgress} renderCountRef={renderCountRef} />
                </LessonProgressProvider>
            </EventProvider>
        );

        const initialRenders = renderCountRef.current;

        await act(async () => {
            triggerRef.current();
            triggerRef.current();
            triggerRef.current();
        });

        expect(renderCountRef.current).toBe(initialRenders);
    });

});
