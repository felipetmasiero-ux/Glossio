import "./Pronunciation.css";

export function Pronunciation({

    ipa

}){

    if(!ipa){

        return null;

    }

    return(

        <span className="pronunciation">

            /{ipa}/

        </span>

    );

}