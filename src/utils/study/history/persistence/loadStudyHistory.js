export function loadStudyHistory() {

    const saved =
        localStorage.getItem("studyHistory");

    return saved
        ? JSON.parse(saved)
        : [];
}