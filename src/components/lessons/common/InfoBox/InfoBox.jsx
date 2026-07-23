import "./InfoBox.css";

export function InfoBox({

    icon,

    title,

    children,

    variant = "default"

}) {

    return (

        <div className={`info-box ${variant}`}>

            <div className="info-box-header">

                <span className="info-box-icon">

                    {icon}

                </span>

                <h3>

                    {title}

                </h3>

            </div>

            <div className="info-box-content">

                {children}

            </div>

        </div>

    );

}