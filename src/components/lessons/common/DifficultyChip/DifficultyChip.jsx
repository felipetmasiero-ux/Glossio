import { Badge } from "../../../common/Badge/Badge";

export function DifficultyChip({

    difficulty

}){

    const color={

        Easy:"success",

        Medium:"warning",

        Hard:"primary"

    }[difficulty] ?? "primary";

    return(

        <Badge

            color={color}

        >

            {difficulty}

        </Badge>

    );

}