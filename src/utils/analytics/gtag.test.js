import { describe, expect, it, afterEach } from "vitest";

import { loadGtagScript, pushToDataLayer } from "./gtag";

afterEach(() => {
    document.getElementById("ga4-gtag-script")?.remove();
    delete window.gtag;
    delete window.dataLayer;
});

describe("loadGtagScript", () => {

    it("defines window.gtag as a real function - the official snippet's bootstrap, not a stub the app skips", () => {

        loadGtagScript("G-ABC123");

        expect(typeof window.gtag).toBe("function");

    });

    it("creates window.dataLayer as an array", () => {

        loadGtagScript("G-ABC123");

        expect(Array.isArray(window.dataLayer)).toBe(true);

    });

    it("injects a script tag pointed at the GA4 gtag.js bundle for the given measurement id", () => {

        loadGtagScript("G-ABC123");

        const script = document.getElementById("ga4-gtag-script");
        expect(script).not.toBeNull();
        expect(script.async).toBe(true);
        expect(script.src).toBe("https://www.googletagmanager.com/gtag/js?id=G-ABC123");

    });

    it("does not inject a second script tag on a repeated call", () => {

        loadGtagScript("G-ABC123");
        loadGtagScript("G-ABC123");

        expect(document.querySelectorAll("#ga4-gtag-script").length).toBe(1);

    });

});

describe("pushToDataLayer", () => {

    it("bootstraps window.gtag itself if pushToDataLayer runs before loadGtagScript", () => {

        pushToDataLayer("js", new Date());

        expect(typeof window.gtag).toBe("function");

    });

    // The regression test for the actual incident: every command MUST be
    // routed through window.gtag(...), never a raw dataLayer.push() -
    // otherwise the real gtag.js script (once it loads) has nothing to
    // attach its live implementation to, and silently never sends a single
    // hit despite dataLayer looking completely normal. See gtag.js's
    // ensureGtagBootstrap comment and docs/ANALYTICS_INCIDENT.md.
    it("routes every command through window.gtag(...) rather than pushing to dataLayer directly", () => {

        loadGtagScript("G-ABC123");

        const calls = [];
        window.gtag = (...args) => calls.push(args);

        pushToDataLayer("config", "G-ABC123", { send_page_view: false });

        expect(calls).toEqual([["config", "G-ABC123", { send_page_view: false }]]);

    });

    it("ends up queueing a properly-shaped command in dataLayer via the real gtag stub", () => {

        pushToDataLayer("event", "lesson_started", { lessonId: "a1" });

        expect(window.dataLayer.length).toBe(1);
        expect(Array.from(window.dataLayer[0])).toEqual(["event", "lesson_started", { lessonId: "a1" }]);

    });

    it("never overwrites an existing window.gtag - once the real SDK has taken over, our stub must not replace it again", () => {

        const realGtag = () => {};
        window.gtag = realGtag;

        pushToDataLayer("event", "lesson_started", {});

        expect(window.gtag).toBe(realGtag);

    });

});
