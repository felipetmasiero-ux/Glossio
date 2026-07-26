import { useContext } from "react";
import { LastActivityContext } from "../contexts/LastActivityContext";

export function useLastActivity() {
    return useContext(LastActivityContext);
}
