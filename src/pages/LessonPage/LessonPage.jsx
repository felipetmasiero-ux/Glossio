import { LessonReader } from "../../components/lessons/LessonReader/LessonReader";
import { useLessons } from "../../hooks/useLessons";
import { useParams } from "react-router-dom";

export function LessonPage() {

    const { id } = useParams();

    const lessons = useLessons();

    const lesson = lessons.find(

        lesson => lesson.id === id

    );

    if (!lesson) {

        return <h1>Lesson not found.</h1>;

    }

    return (

        <LessonReader

            lesson={lesson}

        />

    );

}