import "./Skeleton.css";

export function Skeleton({ className = "", style }) {

    return <span className={`skeleton ${className}`} style={style} aria-hidden="true" />;

}
