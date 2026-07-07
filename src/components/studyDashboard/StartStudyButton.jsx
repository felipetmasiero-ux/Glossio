import "./StartStudyButton.css";

export function StartStudyButton({
    onClick
}) {

    return (

        <button
            className="start-study-button"
            onClick={onClick}
        >

            Start Studying

        </button>

    );

}