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

    // console.log(instructionsMap)

    let targetReached = false;
    let currentPosition = 'AAA';
    let steps = 0;
    while(!targetReached) {
        for(let step of command.split('')) {
            steps++;
            currentPosition = instructionsMap[currentPosition][step === 'L' ? 0 : 1];
            if(currentPosition === 'ZZZ') {
                targetReached = true;
                break;
            }
        }
    }

    console.log(steps);
});
