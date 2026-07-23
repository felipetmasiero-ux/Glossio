import { useState } from "react";

import { Button } from "../../common/Button/Button";

import { InteractiveTextCard } from "../InteractiveTextCard/InteractiveTextCard";

export function ExampleCard({

    example,

    lesson

}){

    const[show,setShow]=useState(false);

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="💬"

            title="Example"

            subtitle="Read and understand"

            text={example.text}

        >

            {

                show && (

                    <p>

                        {example.translation}

                    </p>

                )

            }

            <Button

                variant="secondary"

                onClick={()=>setShow(!show)}

            >

                {

                    show ?

                    "Hide translation"

                    :

                    "Show translation"

                }

            </Button>

        </InteractiveTextCard>

    );

}