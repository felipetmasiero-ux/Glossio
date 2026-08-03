import { useEffect, useState, useCallback, useMemo } from "react";

import { StudyHistoryContext } from "./StudyHistoryContext";

import {
    loadStudyHistory,
    saveStudyHistory,
    recordStudy
} from "../utils/study/history/index";

export function StudyHistoryProvider({
    children
}) {

    const [studyHistory, setStudyHistory] =
        useState(loadStudyHistory);

    useEffect(() => {
        saveStudyHistory(studyHistory);
    }, [studyHistory]);

    const addStudyRecord = useCallback((cardId, quality) => {
        setStudyHistory(previous =>
            recordStudy(
                previous,
                cardId,
                quality
            )
        );
    }, []);

    const value = useMemo(() => ({
        studyHistory,
        addStudyRecord
    }), [studyHistory, addStudyRecord]);

    return (
        <StudyHistoryContext.Provider value={value}>
            {children}
        </StudyHistoryContext.Provider>
    );
}
