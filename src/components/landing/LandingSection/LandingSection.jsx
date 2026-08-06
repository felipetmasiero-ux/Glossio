import "./LandingSection.css";

// The landing's equivalent of DashboardSection (src/components/home/
// DashboardSection) - every section below the hero goes through this for a
// consistent eyebrow/title/subtitle hierarchy and alternating surface/
// background tone (the page itself has no max-width so tone can run edge to
// edge; content stays centered at --content-width-lg via __inner).
export function LandingSection({
    eyebrow,
    title,
    subtitle,
    tone = "surface",
    id,
    sectionRef,
    className = "",
    children
}) {

    return (

        <section
            id={id}
            ref={sectionRef}
            className={`landing-section landing-section--${tone} animate-slide-up ${className}`}
        >

            <div className="landing-section__inner">

                {(eyebrow || title || subtitle) && (
                    <header className="landing-section__header">
                        {eyebrow && <p className="landing-section__eyebrow text-mono-label">{eyebrow}</p>}
                        {title && <h2 className="landing-section__title">{title}</h2>}
                        {subtitle && <p className="landing-section__subtitle">{subtitle}</p>}
                    </header>
                )}

                <div className="landing-section__body">
                    {children}
                </div>

            </div>

        </section>

    );

}
