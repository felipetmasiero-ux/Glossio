import { createStudyRecord } from "./records/createStudyRecord";
import { loadStudyHistory } from "./persistence/loadStudyHistory";
import { recordStudy } from "./records/recordStudy";
import { saveStudyHistory } from "./persistence/saveStudyHistory";
import { getStreak } from "./stats/getStreak";  

export {
    createStudyRecord,
    loadStudyHistory,
    recordStudy,
    saveStudyHistory,
    getStreak
};  