import "./Button.css";

export function Button({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
  disabled = false
}) {

  return (

    <button
      type={type}
      className={`button button--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >

      {children}

    </button>

  );

}