const {readFile, writeFile} = require('node:fs/promises');


const DIRECTIONS = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
}

const DIRECTIONS_MOVEMENT = {
    UP: {
        x: 0,
        y: -1,
    },
    DOWN: {
        x: 0,
        y: 1,
    },
    LEFT: {
        x: -1,
        y: 0,
    },
    RIGHT: {
        x: 1,
        y: 0,
    },
}

const PIPES = {
    '|': {
        [DIRECTIONS.UP] : DIRECTIONS.UP,
        [DIRECTIONS.DOWN] : DIRECTIONS.DOWN,
    },
    '-': {
        [DIRECTIONS.LEFT] : DIRECTIONS.LEFT,
        [DIRECTIONS.RIGHT] : DIRECTIONS.RIGHT,
    },
    'F': {
        [DIRECTIONS.UP] : DIRECTIONS.RIGHT,
        [DIRECTIONS.LEFT] : DIRECTIONS.DOWN,
    },
    'L': {
        [DIRECTIONS.DOWN] : DIRECTIONS.RIGHT,
        [DIRECTIONS.LEFT] : DIRECTIONS.UP,
    },
    'J': {
        [DIRECTIONS.RIGHT] : DIRECTIONS.UP,
        [DIRECTIONS.DOWN] : DIRECTIONS.LEFT,
    },
    '7': {
        [DIRECTIONS.UP] : DIRECTIONS.LEFT,
        [DIRECTIONS.RIGHT] : DIRECTIONS.DOWN,
    },
}

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);

    const start = lines.map((line, y) => {
        const index = line.indexOf('S');

        if (index === -1) {
            return null;
        }

        return {y, x: index}
    }).filter(a => !!a)[0];

    console.log(start);

    const currentPipes = [];
    const pipeSegements = [`${start.x}-${start.y}`];

    const traverse = (pipe) => {
        const newX = pipe.x + DIRECTIONS_MOVEMENT[pipe.direction].x;
        const newY = pipe.y + DIRECTIONS_MOVEMENT[pipe.direction].y;
        if(newX < 0 || newY < 0 || newX >= lines[0].length || newY >= lines.length) {
            return;
        }
        const pipeType = lines[newY][newX];
        if(Object.keys(PIPES).includes(pipeType) && PIPES[pipeType][DIRECTIONS[pipe.direction]]) {
            currentPipes.push({
                pipeType,
                y: newY,
                x: newX,
                direction: PIPES[pipeType][DIRECTIONS[pipe.direction]]
            })
            pipeSegements.push(`${newX}-${newY}`);
        }
    }

    //findStartPipes
    Object.keys(DIRECTIONS).forEach(direction => {
        traverse({
            pipeType: '',
            ...start,
            direction
        })
    })


    let loopFinished = false;
    let count = 1;
    while (!loopFinished) {
        if(currentPipes[0].x === currentPipes[1].x && currentPipes[0].y === currentPipes[1].y) {
            loopFinished = true
        }

        traverse(currentPipes.shift());
        count++;
        // console.log(currentPipes);
    }

    // console.log(pipeSegements);

    let areaData = '';
    lines.forEach((line, y) => {
        const chars = line.split('');
        chars.forEach((char, x) => {
            if(pipeSegements.find(segment => segment === `${x}-${y}`)) {
                areaData += 'O';
            } else {
                areaData += ' ';
            }
        })
        areaData += '\n';
    })

    await writeFile('area.txt', areaData);

    // console.log(count / 2)
}

main();
