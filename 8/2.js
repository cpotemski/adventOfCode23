const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const instructionsMap = {};

    const instructions = data.split("\n").filter(a => !!a);
    const command = instructions.shift();

    instructions.map(instruction => {
        const [source, targetOptions] = instruction.split(' = ');
        const tmp = targetOptions.split(', ')
        const L = tmp[0].replace('(','');
        const R = tmp[1].replace(')','');
        instructionsMap[source] = [L,R]
    })

    const stepsNeededForStartingPosition = (pos) => {
        let targetReached = false;
        let currentPosition = pos;
        let steps = 0;
        while(!targetReached) {
            for(let step of command.split('')) {
                steps++;
                currentPosition = instructionsMap[currentPosition][step === 'L' ? 0 : 1];
                if(currentPosition.endsWith('Z')) {
                    targetReached = true;
                    break;
                }
            }
        }
        return steps;
    }

    const startingPositions = Object.keys(instructionsMap).filter(i => i.endsWith('A'));

    const stepCounts = startingPositions.map(stepsNeededForStartingPosition);
    let ref = stepCounts.shift();

    let step = 0;
    let done = false;
    let maxCommonFound = 0;
    while(!done) {
        step += ref;
        const commonFound = stepCounts.filter(count => step % count === 0).length;
        if(commonFound > maxCommonFound) {
            maxCommonFound = commonFound;
            ref = step;
        }
        done = stepCounts.every(count => step % count === 0);
    }

    console.log(step);
});
