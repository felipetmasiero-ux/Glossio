import "./LessonModuleNav.css";

import { Link } from "react-router-dom";

export function LessonModuleNav({

    module,

    lessonIndex,

    moduleProgress,

    courseProgress

}) {

    if (!module) {
        return null;
    }

    return (

        <div className="lesson-module-nav">

            <Link

                to={`/lessons/module/${module.id}`}

                className="lesson-module-nav-back"

            >
                ← {module.title}
            </Link>

            <div className="lesson-module-nav-stats">

                <span>
                    Lesson {lessonIndex + 1} of {module.lessons.length}
                </span>

                <span>
                    Module {moduleProgress.completed}/{moduleProgress.total}
                </span>

                <span>
                    Course {courseProgress.completed}/{courseProgress.total}
                </span>

            </div>

        </div>

    );

}
