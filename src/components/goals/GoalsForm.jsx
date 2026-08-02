import { Input } from "../common/Input/Input";
import { Button } from "../common/Button/Button";

import "./GoalsForm.css";

const FIELDS = [
    { key: "dailyLessons", label: "Lições por dia", placeholder: "Ex: 2" },
    { key: "dailyReviews", label: "Revisões por dia", placeholder: "Ex: 20" },
    { key: "dailyVideoMinutes", label: "Minutos de vídeo por dia", placeholder: "Ex: 15" },
    { key: "weeklyMinutes", label: "Minutos de estudo por semana", placeholder: "Ex: 240" },
    { key: "weeklyLessons", label: "Lições por semana", placeholder: "Ex: 10" }
];

export function GoalsForm({ goals, onChange, onSubmit, isSaving }) {

    function handleFieldChange(key, rawValue) {

        if (rawValue === "") {
            onChange({ ...goals, [key]: null });
            return;
        }

        const parsed = Number(rawValue);

        onChange({ ...goals, [key]: Number.isFinite(parsed) ? parsed : null });

    }

    return (

        <form className="goals-form" onSubmit={onSubmit}>

            {FIELDS.map(field => (
                <div className="goals-form__field" key={field.key}>
                    <label className="goals-form__label" htmlFor={`goal-${field.key}`}>{field.label}</label>
                    <Input
                        id={`goal-${field.key}`}
                        type="number"
                        placeholder={field.placeholder}
                        value={goals[field.key] ?? ""}
                        onChange={event => handleFieldChange(field.key, event.target.value)}
                    />
                </div>
            ))}

            <Button type="submit" disabled={isSaving}>
                {isSaving ? "Salvando..." : "Salvar metas"}
            </Button>

        </form>

    );

}
