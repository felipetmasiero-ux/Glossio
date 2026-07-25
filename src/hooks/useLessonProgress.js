import { useContext } from "react";
import { LessonProgressContext } from "../contexts/LessonProgressContext";

export function useLessonProgress() {
    return useContext(LessonProgressContext);
}
