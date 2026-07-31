import { useState } from "react";
import { getInitials } from "../../../utils/user/getInitials";

import "./Avatar.css";

export function Avatar({ name, avatarUrl, size = 32 }) {

    const [failedUrl, setFailedUrl] = useState(null);

    const showImage = Boolean(avatarUrl) && avatarUrl !== failedUrl;

    return (
        <span
            className="avatar"
            style={{ width: size, height: size, fontSize: size * 0.4 }}
        >
            {showImage ? (
                <img
                    src={avatarUrl}
                    alt=""
                    className="avatar__image"
                    onError={() => setFailedUrl(avatarUrl)}
                />
            ) : (
                <span className="avatar__initials">{getInitials(name)}</span>
            )}
        </span>
    );

}
