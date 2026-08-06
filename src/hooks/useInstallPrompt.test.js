import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useInstallPrompt } from "./useInstallPrompt";

function fireBeforeInstallPrompt(overrides = {}) {

    const event = new Event("beforeinstallprompt", { cancelable: true });

    event.prompt = overrides.prompt ?? vi.fn();
    event.userChoice = overrides.userChoice ?? Promise.resolve({ outcome: "accepted" });

    window.dispatchEvent(event);

    return event;

}

describe("useInstallPrompt", () => {

    beforeEach(() => {
        vi.useFakeTimers();
        localStorage.clear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("is not installable until beforeinstallprompt fires and the show delay elapses", () => {

        const { result } = renderHook(() => useInstallPrompt());

        expect(result.current.isInstallable).toBe(false);

        act(() => {
            fireBeforeInstallPrompt();
        });

        // Event captured, but the anti-invasiveness delay hasn't elapsed yet.
        expect(result.current.isInstallable).toBe(false);

        act(() => {
            vi.advanceTimersByTime(4000);
        });

        expect(result.current.isInstallable).toBe(true);

    });

    it("prompts the deferred event and hides afterwards", async () => {

        const promptSpy = vi.fn();

        const { result } = renderHook(() => useInstallPrompt());

        act(() => {
            fireBeforeInstallPrompt({ prompt: promptSpy });
        });

        act(() => {
            vi.advanceTimersByTime(4000);
        });

        expect(result.current.isInstallable).toBe(true);

        await act(async () => {
            await result.current.promptInstall();
        });

        expect(promptSpy).toHaveBeenCalled();
        expect(result.current.isInstallable).toBe(false);

    });

    it("hides on dismiss and remembers it across a fresh hook instance", () => {

        const { result, unmount } = renderHook(() => useInstallPrompt());

        act(() => {
            fireBeforeInstallPrompt();
        });

        act(() => {
            vi.advanceTimersByTime(4000);
        });

        expect(result.current.isInstallable).toBe(true);

        act(() => {
            result.current.dismiss();
        });

        expect(result.current.isInstallable).toBe(false);

        unmount();

        // A brand new mount (e.g. the next page load) re-fires
        // beforeinstallprompt, but the recent dismissal should still
        // suppress the suggestion.
        const { result: secondResult } = renderHook(() => useInstallPrompt());

        act(() => {
            fireBeforeInstallPrompt();
        });

        act(() => {
            vi.advanceTimersByTime(4000);
        });

        expect(secondResult.current.isInstallable).toBe(false);

    });

    it("marks the app installed on appinstalled and stops being installable", () => {

        const { result } = renderHook(() => useInstallPrompt());

        act(() => {
            fireBeforeInstallPrompt();
        });

        act(() => {
            vi.advanceTimersByTime(4000);
        });

        expect(result.current.isInstallable).toBe(true);

        act(() => {
            window.dispatchEvent(new Event("appinstalled"));
        });

        expect(result.current.isInstallable).toBe(false);

    });

});
