// Same reasoning as buildLessonId - matches the "{courseId}-{level}"
// convention every module in src/data/lessons/**/module.js already follows.
export function buildModuleId(courseId, level) {
    return `${courseId}-${level.toLowerCase()}`;
}
