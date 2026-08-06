import { useContext } from "react";
import { StudyHistoryContext } from "../contexts/StudyHistoryContext";

export function useStudyHistory() {
    return useContext(StudyHistoryContext);
}
