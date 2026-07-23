import { Card } from "../../../common/Card/Card";
import { SectionHeader } from "../../../common/SectionHeader/SectionHeader";

export function ListBlock({

    block

}) {

    return (

        <section>

            <SectionHeader

                icon="📋"

                title="Key Points"

            />

            <Card>

                <ul>

                    {

                        block.items.map(

                            (item,index)=>(

                                <li key={index}>

                                    {item}

                                </li>

                            )

                        )

                    }

                </ul>

            </Card>

        </section>

    );

}