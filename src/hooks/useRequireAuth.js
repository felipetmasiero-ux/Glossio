import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { useAuthGate } from "./useAuthGate";

export const DEFAULT_AUTH_GATE_MESSAGE = "Crie uma conta grátis para salvar seu progresso.";

// The one place every restricted action in the app goes through - wraps a
// real handler so it only ever runs for an authenticated user; for a
// visitor, it shows the global CTA (AuthGateBanner) instead of running the
// action or redirecting. Callers never write `if (isAuthenticated)`
// themselves - see LessonReader.jsx/WordPopup.jsx for the two places this
// is actually used today.
export function useRequireAuth() {

    const { isAuthenticated } = useAuth();
    const { requestAuth } = useAuthGate();

    return useCallback((action, message = DEFAULT_AUTH_GATE_MESSAGE) => {

        return (...args) => {

            if (!isAuthenticated) {
                requestAuth(message);
                return;
            }

            return action(...args);

        };

    }, [isAuthenticated, requestAuth]);

}
