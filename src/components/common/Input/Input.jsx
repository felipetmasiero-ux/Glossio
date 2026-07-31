import "./Input.css";

export function Input({
  id,
  value,
  onChange,
  placeholder = "",
  className = "",
  type = "text",
  icon = null,
  disabled = false
}) {

  return (

    <div className={`input-wrapper ${className}`}>

      {icon && <span className="input-icon">{icon}</span>}

      <input
        id={id}
        type={type}
        className={`input ${icon ? "input--with-icon" : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />

    </div>

  );

}