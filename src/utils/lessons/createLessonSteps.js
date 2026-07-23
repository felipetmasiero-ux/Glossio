export function createLessonSteps(blocks){

    const steps=[];

    let current=[];

    let title="";

    for(const block of blocks){

        if(block.type==="step"){

            if(current.length){

                steps.push({

                    title,

                    blocks:current

                });

            }

            title=block.title;

            current=[];

            continue;

        }

        current.push(block);

    }

    if(current.length){

        steps.push({

            title,

            blocks:current

        });

    }

    return steps;

}