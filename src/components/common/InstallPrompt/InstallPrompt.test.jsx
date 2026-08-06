import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { InstallPrompt } from "./InstallPrompt";

vi.mock("../../../hooks/useInstallPrompt", () => ({ useInstallPrompt: vi.fn() }));

import { useInstallPrompt } from "../../../hooks/useInstallPrompt";

describe("InstallPrompt", () => {

    it("renders nothing when not installable", () => {

        useInstallPrompt.mockReturnValue({
            isInstallable: false,
            promptInstall: vi.fn(),
            dismiss: vi.fn()
        });

        const { container } = render(<InstallPrompt />);

        expect(container.firstChild).toBeNull();

    });

    it("shows the suggestion and triggers the native prompt on click", () => {

        const promptInstall = vi.fn();

        useInstallPrompt.mockReturnValue({
            isInstallable: true,
            promptInstall,
            dismiss: vi.fn()
        });

        render(<InstallPrompt />);

        fireEvent.click(screen.getByText("Instalar"));

        expect(promptInstall).toHaveBeenCalled();

    });

    it("dismisses without prompting install", () => {

        const promptInstall = vi.fn();
        const dismiss = vi.fn();

        useInstallPrompt.mockReturnValue({
            isInstallable: true,
            promptInstall,
            dismiss
        });

        render(<InstallPrompt />);

        fireEvent.click(screen.getByLabelText("Dispensar sugestão de instalação"));

        expect(dismiss).toHaveBeenCalled();
        expect(promptInstall).not.toHaveBeenCalled();

    });

});
