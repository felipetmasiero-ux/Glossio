import { useNavigate } from "react-router-dom";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import "./PlacementTestCard.css";

export function PlacementTestCard({ latestResult }) {

    const navigate = useNavigate();

    return (

        <Card className="placement-test-card" hoverable={false}>

            <div className="placement-test-card__body">

                <span className="placement-test-card__icon">
                    <Icon name="target" size={20} />
                </span>

                <div>
                    <p className="placement-test-card__title text-mono-label">Teste de nivelamento</p>
                    {latestResult ? (
                        <p className="placement-test-card__value">
                            {latestResult.language} · {latestResult.recommendedLevel}
                        </p>
                    ) : (
                        <p className="placement-test-card__value">Descubra seu nível</p>
                    )}
                </div>

            </div>

            <Button variant="secondary" onClick={() => navigate("/placement-test")}>
                {latestResult ? "Refazer teste" : "Fazer teste"}
                <Icon name="chevron-right" size={16} />
            </Button>

        </Card>

    );

}
