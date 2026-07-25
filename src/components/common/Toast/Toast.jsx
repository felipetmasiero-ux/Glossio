import { Icon } from "../Icon/Icon";
import "./Toast.css";

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast animate-slide-up">
      <Icon name="check" size={16} />
      <span>{message}</span>
    </div>
  );
}
