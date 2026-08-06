import { useInstallPrompt } from "../../../hooks/useInstallPrompt";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import "./InstallPrompt.css";

// Only ever shown when the browser itself has decided the app is
// installable (beforeinstallprompt actually fired) and useInstallPrompt's
// own delay/dismissal-cooldown say it's not too soon to ask again - never a
// blocking modal, always dismissible, never re-triggered by anything this
// component does itself.
export function InstallPrompt() {

    const { isInstallable, promptInstall, dismiss } = useInstallPrompt();

    if (!isInstallable) {
        return null;
    }

    return (

        <div className="install-prompt animate-slide-up" role="status" aria-live="polite">

            <Icon name="download" size={18} />

            <span className="install-prompt__message">
                Instale o Glossio para acesso rápido e uso offline.
            </span>

            <div className="install-prompt__actions">

                <Button variant="primary" onClick={promptInstall}>
                    Instalar
                </Button>

                <button
                    type="button"
                    className="install-prompt__dismiss"
                    aria-label="Dispensar sugestão de instalação"
                    onClick={dismiss}
                >
                    ✕
                </button>

            </div>

        </div>

    );

}
