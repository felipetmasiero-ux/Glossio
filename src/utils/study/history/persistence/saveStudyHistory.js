export function saveStudyHistory(
    studyHistory
) {
    localStorage.setItem(
        "studyHistory",
        JSON.stringify(studyHistory)
    );
}