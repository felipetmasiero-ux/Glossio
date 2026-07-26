import { useNavigate } from "react-router-dom";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import "./ContinueLearningCard.css";

export function ContinueLearningCard({ continueLearning }) {

    const navigate = useNavigate();

    if (continueLearning.status === "empty") {

        return (
            <Card className="continue-learning-card" hoverable={false}>
                <p className="continue-learning-card__eyebrow text-mono-label">Continue aprendendo</p>
                <p className="continue-learning-card__empty">
                    Ainda não há lições disponíveis para este idioma.
                </p>
            </Card>
        );

    }

    if (continueLearning.status === "finished") {

        return (
            <Card className="continue-learning-card" hoverable={false}>
                <p className="continue-learning-card__eyebrow text-mono-label">Continue aprendendo</p>
                <h2 className="continue-learning-card__title">
                    Você concluiu todo o conteúdo disponível!
                </h2>
                <Button onClick={() => navigate("/lessons")}>
                    Revisar lições
                </Button>
            </Card>
        );

    }

    return (

        <Card className="continue-learning-card" hoverable={false}>

            <p className="continue-learning-card__eyebrow text-mono-label">Continue aprendendo</p>

            <div className="continue-learning-card__meta">
                {continueLearning.moduleLevel && (
                    <span className="continue-learning-card__level text-mono-label">
                        {continueLearning.moduleLevel}
                    </span>
                )}
                <span className="continue-learning-card__module">
                    {continueLearning.moduleTitle}
                </span>
            </div>

            <h2 className="continue-learning-card__title">
                {continueLearning.lessonTitle}
            </h2>

            {continueLearning.lessonCategory && (
                <p className="continue-learning-card__category">
                    {continueLearning.lessonCategory}
                </p>
            )}

            <Button onClick={() => navigate(continueLearning.href)}>
                Continuar
                <Icon name="chevron-right" size={16} />
            </Button>

        </Card>

    );

}
