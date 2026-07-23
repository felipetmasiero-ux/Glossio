import { useContext } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";

export function useFlashcards() {

    return useContext(FlashcardContext);

}