import { Card } from "../../../common/Card/Card";
import { SectionHeader } from "../../../common/SectionHeader/SectionHeader";
import "./ListBLock.css";

export function ListBlock({

    block

}) {

    return (

        <section>

            <SectionHeader

                icon="list"

                title="Pontos-chave"

            />

            <Card>

                <ul className="lesson-list">

                    {

                        block.items.map(
                            (item, index) => (

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
