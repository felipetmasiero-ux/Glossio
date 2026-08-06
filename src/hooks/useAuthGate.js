import { useContext } from "react";
import { AuthGateContext } from "../contexts/AuthGateContext";

export function useAuthGate() {
    return useContext(AuthGateContext);
}
