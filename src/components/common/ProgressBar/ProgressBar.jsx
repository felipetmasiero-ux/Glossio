import "./ProgressBar.css";

export function ProgressBar({
  value,
  variant = "primary"
}) {

  const clamped = Math.min(100, Math.max(0, value));

  return (

    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >

      <div
        className={`progress-fill progress-fill--${variant}`}
        style={{ width: `${clamped}%` }}
      />

    </div>

  );

}