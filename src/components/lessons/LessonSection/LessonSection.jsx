import "./LessonSection.css";

export function LessonSection({
    children,
    className = ""
}) {
    return (
        <section className={`lesson-section ${className}`}>
            {children}
        </section>
    );
}