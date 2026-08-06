import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

import { Button } from "../Button/Button";
import "./PwaUpdatePrompt.css";

const OFFLINE_READY_AUTO_DISMISS_MS = 5000;

// The one mount point for the whole service-worker lifecycle UI - both "a
// new version is waiting" and "the app just became available offline" come
// from this same useRegisterSW() call, so this stays the only component
// that calls it (calling it a second time elsewhere would register a
// second update listener for the same worker).
export function PwaUpdatePrompt() {

    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker
    } = useRegisterSW();

    useEffect(() => {

        if (!offlineReady) {
            return;
        }

        const timeoutId = setTimeout(() => setOfflineReady(false), OFFLINE_READY_AUTO_DISMISS_MS);

        return () => clearTimeout(timeoutId);

    }, [offlineReady, setOfflineReady]);

    if (needRefresh) {

        return (

            <div className="pwa-update-prompt animate-slide-up" role="status" aria-live="polite">

                <span>Nova versão disponível.</span>

                <div className="pwa-update-prompt__actions">

                    <Button variant="primary" onClick={() => updateServiceWorker(true)}>
                        Atualizar
                    </Button>

                    <button
                        type="button"
                        className="pwa-update-prompt__dismiss"
                        aria-label="Dispensar aviso de atualização"
                        onClick={() => setNeedRefresh(false)}
                    >
                        ✕
                    </button>

                </div>

            </div>

        );

    }

    // Fires once, the first time the service worker finishes precaching
    // (fresh install or a returning visitor whose cache was cleared) - a
    // quiet, self-dismissing confirmation that offline mode is actually
    // ready, not something the user needs to act on.
    if (offlineReady) {

        return (

            <div className="pwa-update-prompt animate-slide-up" role="status" aria-live="polite">

                <span>Aplicativo pronto para uso offline.</span>

                <button
                    type="button"
                    className="pwa-update-prompt__dismiss"
                    aria-label="Dispensar aviso"
                    onClick={() => setOfflineReady(false)}
                >
                    ✕
                </button>

            </div>

        );

    }

    return null;

}
