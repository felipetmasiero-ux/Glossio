import "./StudySummary.css"

export function StudySummary({

    stats,
    totalCards,
    onRestart

}){

    return(

        <div className="study-summary">

            <h1>
                🎉 Session Complete
            </h1>

            <p>
                Cards studied:
                {" "}
                {totalCards}
            </p>

            <p>
                🔴 Again:
                {" "}
                {stats.again}
            </p>

            <p>
                🟡 Good:
                {" "}
                {stats.good}
            </p>

            <p>
                🟢 Easy:
                {" "}
                {stats.easy}
            </p>

            <button
                onClick={onRestart}
            >
                Study Again
            </button>

        </div>

    );

}