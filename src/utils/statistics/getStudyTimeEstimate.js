import { getStudyMinutes } from "../dashboard/getStudyMinutes";

export function getStudyTimeEstimate({ completedLessons = [], language }) {

    return getStudyMinutes({ language, completedLessons });

}
