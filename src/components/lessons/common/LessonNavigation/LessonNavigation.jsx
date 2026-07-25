import "./LessonNavigation.css";

import { Button } from "../../../common/Button/Button";
import { Icon } from "../../../common/Icon/Icon";

export function LessonNavigation({

    hasPrevious,

    hasNext,

    nextLabel,

    onPrevious,

    onNext

}) {

    return (

        <div className="lesson-navigation">

            <Button

                variant="secondary"

                disabled={!hasPrevious}

                onClick={onPrevious}

            >

                <Icon name="chevron-left" size={16} /> Anterior

            </Button>

            <Button

                disabled={!hasNext}

                onClick={onNext}

            >

                {nextLabel ?? (hasNext ? "Próxima" : "Concluir")} <Icon name="chevron-right" size={16} />

            </Button>

        </div>

    );

}
