import { useContext } from "react";
import { ExerciseProgressContext } from "../contexts/ExerciseProgressContext";

export function useExerciseProgress() {
    return useContext(ExerciseProgressContext);
}
