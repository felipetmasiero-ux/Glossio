import { useMemo } from "react";

import { useLanguage } from "./useLanguage";
import { useFlashcards } from "./useFlashcards";
import { useEvents } from "./useEvents";

import { GoalsStorage } from "../utils/goals/goalsStorage";
import { getGoalSummary } from "../utils/goals/getGoalSummary";

export function useGoalsSummary() {

    const { language } = useLanguage();
    const { flashcards } = useFlashcards();
    const { events } = useEvents();

    const goals = GoalsStorage.getGoals();
    const goalsKey = JSON.stringify(goals);

    return useMemo(
        () => getGoalSummary({ language, flashcards, events, goals }),
        // `goalsKey` (a stable JSON string) stands in for `goals` here - a
        // fresh object from GoalsStorage.getGoals() on every render would
        // otherwise defeat the memo entirely.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [language, flashcards, events, goalsKey]
    );

}
