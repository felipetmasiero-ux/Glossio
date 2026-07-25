import "../../../data/lessons/lesson.css";

import { SectionHeader } from "../../common/SectionHeader/SectionHeader";

export function LessonSection({

    icon,

    title,

    subtitle,

    className = "",

    children

}) {

    return (

        <section className={`lesson-section animate-fade-in ${className}`.trim()}>

            {

                title && (

                    <SectionHeader

                        icon={icon}

                        title={title}

                        subtitle={subtitle}

                    />

                )

            }

            {children}

        </section>

    );

}
