import { useEffect } from "react";

import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";

// milestones: [{ depth: 25, ref }, ...] - each ref points at a DOM node
// placed at a meaningful point in the page (not a mathematically exact
// scroll percentage, which would need measuring full document height and
// breaks with dynamic content). One IntersectionObserver watches all of
// them; each depth fires trackEvent at most once per page visit, then
// stops being observed.
export function useScrollDepthTracking(milestones) {

    useEffect(() => {

        const fired = new Set();

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const milestone = milestones.find(m => m.ref.current === entry.target);
                if (!milestone || fired.has(milestone.depth)) return;

                fired.add(milestone.depth);
                trackEvent(ANALYTICS_EVENTS.LANDING_SCROLL_DEPTH, { depth: milestone.depth });
                observer.unobserve(entry.target);

            });

        });

        milestones.forEach(({ ref }) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();

        // Runs once on mount only - milestones' refs are stable across
        // re-renders (useRef identity), and re-subscribing on every render
        // would risk double-firing an already-crossed depth.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

}
