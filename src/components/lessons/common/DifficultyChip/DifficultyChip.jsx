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

            variant={color}

        >

            {difficulty}

        </Badge>

    );

}