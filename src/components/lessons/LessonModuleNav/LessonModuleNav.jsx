import "./LessonModuleNav.css";

import { Link } from "react-router-dom";
import { Icon } from "../../common/Icon/Icon";

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

                onClick={() => window.scrollTo(0, 0)}

            >
                <Icon name="chevron-left" size={14} /> {module.title}
            </Link>

            <div className="lesson-module-nav-stats text-mono-label">

                <span>
                    Lição {lessonIndex + 1} de {module.lessons.length}
                </span>

                <span>
                    Módulo {moduleProgress.completed}/{moduleProgress.total}
                </span>

                <span>
                    Curso {courseProgress.completed}/{courseProgress.total}
                </span>

            </div>

        </div>

    );

}
