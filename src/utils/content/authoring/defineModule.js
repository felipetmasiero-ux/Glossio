import { buildModuleId } from "./buildModuleId";

// Mirrors defineLesson: derives `id` (buildModuleId) instead of requiring
// it to be typed out and kept in sync with courseId/level by hand. Every
// existing src/data/lessons/**/module.js file is already this same shape
// as a plain object literal - this is an optional, additive way to build a
// new one with less to remember.
export function defineModule({

    courseId,
    language,
    level,
    order,
    title,
    description = "",
    lessons

}) {

    return {

        id: buildModuleId(courseId, level),

        courseId,

        language,

        level,

        order,

        title,

        description,

        lessons

    };

}
