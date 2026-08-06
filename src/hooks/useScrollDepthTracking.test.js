import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRef } from "react";

vi.mock("../utils/analytics", () => ({
    trackEvent: vi.fn(),
    ANALYTICS_EVENTS: { LANDING_SCROLL_DEPTH: "landing_scroll_depth" }
}));

import { trackEvent } from "../utils/analytics";
import { useScrollDepthTracking } from "./useScrollDepthTracking";

// jsdom doesn't implement IntersectionObserver - this fake keeps every
// instance reachable so a test can pull the latest one and manually
// trigger its callback with fabricated entries.
class FakeIntersectionObserver {

    constructor(callback) {
        this.callback = callback;
        this.observed = new Set();
        FakeIntersectionObserver.instances.push(this);
    }

    observe(target) {
        this.observed.add(target);
    }

    unobserve(target) {
        this.observed.delete(target);
    }

    disconnect() {
        this.observed.clear();
    }

}
FakeIntersectionObserver.instances = [];

function intersect(target) {
    const observer = FakeIntersectionObserver.instances.at(-1);
    observer.callback([{ target, isIntersecting: true }]);
}

function useMilestoneRefs() {
    const heroRef = useRef(null);
    const midRef = useRef(null);
    return [
        { depth: 25, ref: heroRef },
        { depth: 75, ref: midRef }
    ];
}

describe("useScrollDepthTracking", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        FakeIntersectionObserver.instances = [];
        vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("tracks a scroll depth milestone once its sentinel becomes visible", () => {

        const { result } = renderHook(() => useMilestoneRefs());
        const milestones = result.current;

        milestones[0].ref.current = document.createElement("div");
        milestones[1].ref.current = document.createElement("div");

        renderHook(() => useScrollDepthTracking(milestones));

        intersect(milestones[0].ref.current);

        expect(trackEvent).toHaveBeenCalledWith("landing_scroll_depth", { depth: 25 });
        expect(trackEvent).toHaveBeenCalledTimes(1);

    });

    it("never fires the same depth twice, even if it intersects again", () => {

        const { result } = renderHook(() => useMilestoneRefs());
        const milestones = result.current;
        milestones[0].ref.current = document.createElement("div");
        milestones[1].ref.current = document.createElement("div");

        renderHook(() => useScrollDepthTracking(milestones));

        intersect(milestones[0].ref.current);
        intersect(milestones[0].ref.current);

        expect(trackEvent).toHaveBeenCalledTimes(1);

    });

    it("tracks each distinct milestone independently", () => {

        const { result } = renderHook(() => useMilestoneRefs());
        const milestones = result.current;
        milestones[0].ref.current = document.createElement("div");
        milestones[1].ref.current = document.createElement("div");

        renderHook(() => useScrollDepthTracking(milestones));

        intersect(milestones[0].ref.current);
        intersect(milestones[1].ref.current);

        expect(trackEvent).toHaveBeenCalledWith("landing_scroll_depth", { depth: 25 });
        expect(trackEvent).toHaveBeenCalledWith("landing_scroll_depth", { depth: 75 });
        expect(trackEvent).toHaveBeenCalledTimes(2);

    });

    it("ignores entries that are not intersecting", () => {

        const { result } = renderHook(() => useMilestoneRefs());
        const milestones = result.current;
        milestones[0].ref.current = document.createElement("div");
        milestones[1].ref.current = document.createElement("div");

        renderHook(() => useScrollDepthTracking(milestones));

        const observer = FakeIntersectionObserver.instances.at(-1);
        observer.callback([{ target: milestones[0].ref.current, isIntersecting: false }]);

        expect(trackEvent).not.toHaveBeenCalled();

    });

    it("does not throw when a milestone's ref has no DOM node yet", () => {

        const emptyMilestones = [{ depth: 25, ref: { current: null } }];

        expect(() => renderHook(() => useScrollDepthTracking(emptyMilestones))).not.toThrow();

    });

});
