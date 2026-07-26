import { SectionHeader } from "../../common/SectionHeader/SectionHeader";

import "./DashboardSection.css";

export function DashboardSection({ title, subtitle, icon, className = "", children }) {

    return (

        <section className={`dashboard-section animate-fade-in ${className}`}>

            {title && <SectionHeader title={title} subtitle={subtitle} icon={icon} />}

            <div className="dashboard-section__body">
                {children}
            </div>

        </section>

    );

}
