import "./Input.css";

export function Input({
  value,
  onChange,
  placeholder = "",
  className = "",
  type = "text",
  icon = null
}) {

  return (

    <div className={`input-wrapper ${className}`}>

      {icon && <span className="input-icon">{icon}</span>}

      <input
        type={type}
        className={`input ${icon ? "input--with-icon" : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

    </div>

  );

}