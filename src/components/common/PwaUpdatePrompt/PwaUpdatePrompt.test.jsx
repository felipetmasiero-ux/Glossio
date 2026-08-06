import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { PwaUpdatePrompt } from "./PwaUpdatePrompt";

vi.mock("virtual:pwa-register/react", () => ({ useRegisterSW: vi.fn() }));

import { useRegisterSW } from "virtual:pwa-register/react";

function mockRegisterSW({ needRefresh = false, offlineReady = false, updateServiceWorker = vi.fn() } = {}) {

    const setNeedRefresh = vi.fn();
    const setOfflineReady = vi.fn();

    useRegisterSW.mockReturnValue({
        needRefresh: [needRefresh, setNeedRefresh],
        offlineReady: [offlineReady, setOfflineReady],
        updateServiceWorker
    });

    return { setNeedRefresh, setOfflineReady };

}

describe("PwaUpdatePrompt", () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders nothing when there is no update and offline readiness hasn't fired", () => {

        mockRegisterSW();

        const { container } = render(<PwaUpdatePrompt />);

        expect(container.firstChild).toBeNull();

    });

    it("shows the update banner and applies the update on click", () => {

        const updateServiceWorker = vi.fn();

        mockRegisterSW({ needRefresh: true, updateServiceWorker });

        render(<PwaUpdatePrompt />);

        fireEvent.click(screen.getByText("Atualizar"));

        expect(updateServiceWorker).toHaveBeenCalledWith(true);

    });

    it("dismisses the update banner without applying the update", () => {

        const updateServiceWorker = vi.fn();

        const { setNeedRefresh } = mockRegisterSW({ needRefresh: true, updateServiceWorker });

        render(<PwaUpdatePrompt />);

        fireEvent.click(screen.getByLabelText("Dispensar aviso de atualização"));

        expect(setNeedRefresh).toHaveBeenCalledWith(false);
        expect(updateServiceWorker).not.toHaveBeenCalled();

    });

    it("shows the offline-ready toast and auto-dismisses it", () => {

        const { setOfflineReady } = mockRegisterSW({ offlineReady: true });

        render(<PwaUpdatePrompt />);

        expect(screen.getByText("Aplicativo pronto para uso offline.")).not.toBeNull();

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(setOfflineReady).toHaveBeenCalledWith(false);

    });

    it("prioritizes the update banner over the offline-ready toast if both are pending", () => {

        mockRegisterSW({ needRefresh: true, offlineReady: true });

        render(<PwaUpdatePrompt />);

        expect(screen.getByText("Nova versão disponível.")).not.toBeNull();
        expect(screen.queryByText("Aplicativo pronto para uso offline.")).toBeNull();

    });

});
