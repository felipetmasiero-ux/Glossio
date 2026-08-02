import { useNavigate } from "react-router-dom";

import { Card } from "../../common/Card/Card";
import { Badge } from "../../common/Badge/Badge";
import { ProgressBar } from "../../common/ProgressBar/ProgressBar";
import { Icon } from "../../common/Icon/Icon";

import "./CourseCard.css";

export function CourseCard({ course }) {

    const navigate = useNavigate();

    if (course.comingSoon) {

        return (
            <Card className="course-card course-card--soon" hoverable={false}>
                <span className="course-card__flag">{course.flag}</span>
                <span className="course-card__title">{course.title}</span>
                <Badge variant="neutral">Em breve</Badge>
            </Card>
        );

    }

    return (

        <Card as="button" type="button" className="course-card" onClick={() => navigate(course.href)}>

            <span className="course-card__top">
                <span className="course-card__flag">{course.flag}</span>
                <span className="course-card__title">{course.title}</span>
                {course.level && (
                    <span className="course-card__level text-mono-label">{course.level}</span>
                )}
            </span>

            <ProgressBar value={course.percentage} />

            <span className="course-card__footer">
                <span className="course-card__meta text-mono-label">
                    {course.percentage}% concluído
                    {course.lastModule && ` · ${course.lastModule}`}
                </span>

                <Icon name="chevron-right" size={16} className="course-card__arrow" />
            </span>

        </Card>

    );

}
