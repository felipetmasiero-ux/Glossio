import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";

import { AnalyticsRouteTracker } from "./AnalyticsRouteTracker";

vi.mock("../../../utils/analytics", () => ({
    initAnalytics: vi.fn(),
    trackEvent: vi.fn(),
    trackPageView: vi.fn(),
    ANALYTICS_EVENTS: { APP_OPEN: "app_open" }
}));

import { initAnalytics, trackEvent, trackPageView } from "../../../utils/analytics";

function renderAt(initialEntry) {
    return render(
        <MemoryRouter initialEntries={[initialEntry]}>
            <AnalyticsRouteTracker />
            <Link to="/lessons">Go to lessons</Link>
            <Routes>
                <Route path="/home" element={<div>Home</div>} />
                <Route path="/lessons" element={<div>Lessons</div>} />
            </Routes>
        </MemoryRouter>
    );
}

describe("AnalyticsRouteTracker", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("initializes analytics and fires app_open once on mount", () => {

        renderAt("/home");

        expect(initAnalytics).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledWith("app_open");

    });

    it("tracks a page view for the initial route", () => {

        renderAt("/home");

        expect(trackPageView).toHaveBeenCalledWith("/home");

    });

    it("tracks exactly one page view per route change, without duplicating it", () => {

        renderAt("/home");

        expect(trackPageView).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByText("Go to lessons"));

        expect(trackPageView).toHaveBeenCalledWith("/lessons");
        expect(trackPageView).toHaveBeenCalledTimes(2);

    });

    it("does not fire app_open again on a route change - only once per app load", () => {

        renderAt("/home");

        fireEvent.click(screen.getByText("Go to lessons"));

        expect(initAnalytics).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledTimes(1);

    });

});
