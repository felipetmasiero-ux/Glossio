import { useCallback, useEffect, useState } from "react";

const DISMISSED_AT_KEY = "pwa-install-dismissed-at";

const DISMISS_COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000;

// Chrome fires beforeinstallprompt fairly early in a visit; showing our own
// UI the instant that happens would still feel like a pop-up ambush. This
// small extra delay is what keeps the suggestion from being invasive on top
// of whatever engagement heuristic the browser already applies before
// firing the event at all.
const SHOW_DELAY_MS = 4000;

function isDismissedRecently() {

    const dismissedAt = Number(localStorage.getItem(DISMISSED_AT_KEY));

    return Boolean(dismissedAt) && Date.now() - dismissedAt < DISMISS_COOLDOWN_MS;

}

// Wraps the browser's beforeinstallprompt/appinstalled events behind one
// reusable hook - InstallPrompt is the only consumer today, but any other
// future install entry point (e.g. a settings-page "Instalar app" button)
// can reuse this instead of re-listening for the raw events itself.
export function useInstallPrompt() {

    const [deferredEvent, setDeferredEvent] = useState(null);

    const [readyToShow, setReadyToShow] = useState(false);

    const [isInstalled, setIsInstalled] = useState(
        () => window.matchMedia?.("(display-mode: standalone)").matches ?? false
    );

    useEffect(() => {

        function handleBeforeInstallPrompt(event) {
            event.preventDefault();
            setDeferredEvent(event);
        }

        function handleAppInstalled() {
            setIsInstalled(true);
            setDeferredEvent(null);
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };

    }, []);

    useEffect(() => {

        if (!deferredEvent) {
            return;
        }

        const timeoutId = setTimeout(() => setReadyToShow(true), SHOW_DELAY_MS);

        return () => clearTimeout(timeoutId);

    }, [deferredEvent]);

    const promptInstall = useCallback(async () => {

        if (!deferredEvent) {
            return;
        }

        deferredEvent.prompt();

        await deferredEvent.userChoice;

        setDeferredEvent(null);

    }, [deferredEvent]);

    const dismiss = useCallback(() => {
        localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
        setDeferredEvent(null);
    }, []);

    return {
        isInstallable: Boolean(deferredEvent) && readyToShow && !isInstalled && !isDismissedRecently(),
        promptInstall,
        dismiss
    };

}
