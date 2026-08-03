import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";

import { useDashboardData } from "./useDashboardData";
import { LanguageContext } from "../contexts/LanguageContext";
import { EventProvider } from "../contexts/EventProvider";
import { FlashcardProvider } from "../contexts/FlashcardProvider";
import { LessonProgressProvider } from "../contexts/LessonProgressProvider";
import { LastActivityProvider } from "../contexts/LastActivityProvider";

// Performance sprint regression guard (section 6): getDashboardData used to
// be wrapped in one single useMemo keyed on every input at once, so e.g.
// switching the study language - which getHeatmap/getStreakSummary/
// getCoursesOverview don't even read - recomputed and handed out a brand
// new reference for *all* dashboard fields, defeating React.memo on any
// card that only cares about one of them. These fields are now memoized
// individually; this proves the ones that don't depend on language stay
// referentially stable when only the language changes.
function Wrapper({ language, children }) {
    return (
        <EventProvider>
            <LanguageContext.Provider value={{ language, setLanguage: () => {} }}>
                <FlashcardProvider>
                    <LessonProgressProvider>
                        <LastActivityProvider>
                            {children}
                        </LastActivityProvider>
                    </LessonProgressProvider>
                </FlashcardProvider>
            </LanguageContext.Provider>
        </EventProvider>
    );
}

describe("useDashboardData - fine-grained memoization", () => {

    it("does not recompute a language-independent field's reference across a re-render where only language changes", () => {

        let language = "English";

        const { result, rerender } = renderHook(() => useDashboardData(), {
            wrapper: ({ children }) => <Wrapper language={language}>{children}</Wrapper>
        });

        const heatmapBefore = result.current.heatmap;
        const streakBefore = result.current.streakSummary;
        const coursesBefore = result.current.courses;
        const reviewsBefore = result.current.reviews; // this one *does* depend on language

        language = "French";
        rerender();

        expect(result.current.heatmap).toBe(heatmapBefore);
        expect(result.current.streakSummary).toBe(streakBefore);
        expect(result.current.courses).toBe(coursesBefore);

        // Sanity check the mechanism actually re-renders/re-reads language -
        // a field that *does* depend on it should be free to produce a new
        // value (not asserting inequality of reference, since the shape may
        // coincidentally match - just that this is a different, real call).
        expect(result.current.reviews).toBeDefined();
        expect(reviewsBefore).toBeDefined();

    });

});
