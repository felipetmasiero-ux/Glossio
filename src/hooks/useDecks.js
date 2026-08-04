import { useContext } from "react";
import { DeckContext } from "../contexts/DeckContext";

export function useDecks() {

    return useContext(DeckContext);

}
