import "./Card.css";

export function Card({
  children,
  className = "",
  hoverable = true,
  as: Tag = "div",
  ...rest
}) {

  return (

    <Tag className={`card ${hoverable ? "card--hoverable" : ""} ${className}`} {...rest}>

      {children}

    </Tag>

  );

}