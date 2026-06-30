import { useEffect, useState } from "react";

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

    function addStudyRecord(
        cardId,
        quality
    ) {
        setStudyHistory(previous =>
            recordStudy(
                previous,
                cardId,
                quality
            )
        );
    }

    return (
        <StudyHistoryContext.Provider
            value={{
                studyHistory,
                addStudyRecord
            }}
        >
            {children}
        </StudyHistoryContext.Provider>
    );
}