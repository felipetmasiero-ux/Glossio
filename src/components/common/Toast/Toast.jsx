import "./Toast.css";

export function Toast({message}){

    if(!message) return null;

    return(

        <div className="toast animate-slide-up">

            ✅ {message}

        </div>

    );

}