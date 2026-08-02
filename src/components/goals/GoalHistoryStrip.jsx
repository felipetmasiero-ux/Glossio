import { Icon } from "../common/Icon/Icon";

import "./GoalHistoryStrip.css";

export function GoalHistoryStrip({ history }) {

    return (

        <ul className="goal-history-strip">
            {history.map(day => (
                <li
                    key={day.date}
                    className={`goal-history-strip__day ${day.completed ? "goal-history-strip__day--completed" : "goal-history-strip__day--missed"}`}
                    aria-label={`${day.label}: meta ${day.completed ? "concluída" : "não concluída"}`}
                >
                    <Icon name={day.completed ? "check" : "x"} size={14} />
                    <span className="goal-history-strip__label text-mono-label">{day.label}</span>
                </li>
            ))}
        </ul>

    );

}
