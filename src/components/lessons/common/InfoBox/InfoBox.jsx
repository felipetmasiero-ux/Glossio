import { Icon } from "../../../common/Icon/Icon";
import "./InfoBox.css";

export function InfoBox({

    icon,

    title,

    children

}) {

    return (

        <div className="info-box">

            <div className="info-box-header">

                {icon && (
                    <span className="info-box-icon">
                        <Icon name={icon} size={17} />
                    </span>
                )}

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
