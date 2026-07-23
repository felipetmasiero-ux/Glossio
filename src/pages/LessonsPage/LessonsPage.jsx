import "./LessonsPage.css";

import { useLessons } from "../../hooks/useLessons";

import { LessonCard } from "../../components/lessons/LessonCard/LessonCard";

import { useNavigate } from "react-router-dom";

export function LessonsPage() {

    const navigate = useNavigate();

    const lessons = useLessons();

    return (

        <div className="lessons-page">

            <h1>Lessons</h1>

            <div className="lessons-grid">

                {

                    lessons.map((lesson) => (

                        <LessonCard

                            key={lesson.id}

                            lesson={lesson}

                            onOpen={() =>
                                navigate(`/lessons/${lesson.id}`)
                            }

                        />

                    ))

                }

            </div>

        </div>

    );

}