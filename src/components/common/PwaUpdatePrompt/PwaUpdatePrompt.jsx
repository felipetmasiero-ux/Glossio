import { useRegisterSW } from "virtual:pwa-register/react";

import { Button } from "../Button/Button";
import "./PwaUpdatePrompt.css";

export function PwaUpdatePrompt() {

    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker
    } = useRegisterSW();

    if (!needRefresh) {
        return null;
    }

    function dismiss() {
        setNeedRefresh(false);
    }

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
                    onClick={dismiss}
                >
                    ✕
                </button>

            </div>

        </div>

    );

}
