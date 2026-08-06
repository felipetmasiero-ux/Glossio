// Mirrors defineLesson/defineModule. Courses have no separate id
// convention to derive - every existing course's id is just its language
// (see src/data/courses/*.js) - so `id` defaults to `language` and only
// needs overriding for the rare case where they'd actually differ.
export function defineCourse({

    id,
    language,
    title,
    description = "",
    cover = null,
    modules

}) {

    return {

        id: id ?? language,

        language,

        title,

        description,

        cover,

        modules

    };

}
